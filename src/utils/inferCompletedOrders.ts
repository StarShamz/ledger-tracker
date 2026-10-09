import { orders } from '@/data/orders'
import type { Order, PlayerStats } from '@/types'
import { parseQuantity } from './parseQuantity'
import { actionPlayerValue, ACTION_STAT_LABEL } from '@/utils/actions'

const orderMap = new Map(orders.map(o => [o.id, o]))

/**
 * Recursively collect all prerequisite order IDs for a given order (requiredOrderIds only).
 * minOrders is a count requirement, not a pointer to specific orders, so it is not followed.
 */
export function getAllPrerequisites(orderId: number): Set<number> {
  const result = new Set<number>()
  const queue = [orderId]
  while (queue.length > 0) {
    const id = queue.pop()!
    const order = orderMap.get(id)
    if (!order) continue
    for (const prereqId of order.requiredOrderIds) {
      if (!result.has(prereqId)) {
        result.add(prereqId)
        queue.push(prereqId)
      }
    }
  }
  return result
}

/**
 * Recursively collect all orders that transitively depend on a given order (via requiredOrderIds).
 * minOrders dependencies are not followed for the same reason as above.
 */
export function getAllDependents(orderId: number): Set<number> {
  const result = new Set<number>()
  const queue = [orderId]
  while (queue.length > 0) {
    const id = queue.pop()!
    for (const order of orders) {
      if (order.requiredOrderIds.includes(id) && !result.has(order.id)) {
        result.add(order.id)
        queue.push(order.id)
      }
    }
  }
  return result
}

/**
 * Returns true if the order can be attempted given the current completed set and stats.
 * Lenient: a missing stat is treated as "unknown → assume ok" to avoid under-inferring.
 * Only blocks if a stat is explicitly entered and falls below the requirement.
 * Checks both unlock requirements (resources/actions) and completion requirements.
 */
function isUnlockable(order: Order, completed: Set<number>, stats: PlayerStats): boolean {
  if (completed.size < order.minOrders) return false
  if (!order.requiredOrderIds.every(id => completed.has(id))) return false

  for (const r of order.resources) {
    const amt = stats.resources[r.item]
    if (!amt?.trim()) continue
    const player = parseQuantity(amt)
    if (player === null) continue
    if (r.quantityDisplay === null) {
      if (player <= 0n) return false
    } else {
      const req = parseQuantity(r.quantityDisplay)
      if (req !== null && player < req) return false
    }
  }

  for (const a of order.actions) {
    const playerStr = actionPlayerValue(a, stats)
    if (!playerStr?.trim()) continue
    const player = parseQuantity(playerStr)
    if (player !== null && player < BigInt(a.quantity)) return false
  }

  if (order.completion) {
    for (const r of order.completion.resources) {
      const amt = stats.resources[r.item]
      if (!amt?.trim()) continue
      const player = parseQuantity(amt)
      if (player === null) continue
      if (r.quantityDisplay === null) {
        if (player <= 0n) return false
      } else {
        const req = parseQuantity(r.quantityDisplay)
        if (req !== null && player < req) return false
      }
    }

    for (const a of order.completion.actions) {
      const playerStr = actionPlayerValue(a, stats)
      if (!playerStr?.trim()) continue
      const player = parseQuantity(playerStr)
      if (player !== null && player < BigInt(a.quantity)) return false
    }
  }

  return true
}

export interface InferenceResult {
  /** Order IDs confidently inferred as completed. */
  inferred: number[]
  /** How many of the target could not be inferred before the simulation stalled. */
  unresolved: number
  /**
   * Resource/action stat names that were missing on orders whose order/count prerequisites
   * were already met — entering these would allow the engine to infer more completions.
   */
  missingStats: string[]
}

/**
 * Simulate a playthrough to infer which `targetCount` orders a player most likely completed.
 *
 * Algorithm:
 *   Loop:
 *     1. Find all currently-unlockable orders not yet in `completed`.
 *     2. Sort by (minOrders ASC, id ASC) — prioritise orders that become available earliest.
 *     3. Add as many as needed to reach `targetCount`.
 *     4. Stop when target reached or nothing new unlocked.
 *
 * After the loop, if unresolved > 0, scan remaining orders to report which specific stats
 * are missing on orders that are otherwise structurally reachable.
 */
export function inferCompletedOrders(
  targetCount: number,
  stats: PlayerStats
): InferenceResult {
  if (targetCount <= 0) return { inferred: [], unresolved: 0, missingStats: [] }

  const completed = new Set<number>()

  while (completed.size < targetCount) {
    const available = orders.filter(
      o => !completed.has(o.id) && isUnlockable(o, completed, stats)
    )

    if (available.length === 0) break

    available.sort((a, b) =>
      a.minOrders !== b.minOrders ? a.minOrders - b.minOrders : a.id - b.id
    )

    const before = completed.size
    for (const order of available) {
      if (completed.size >= targetCount) break
      completed.add(order.id)
    }

    if (completed.size === before) break
  }

  // Find which missing stats are blocking structurally-reachable orders
  const missingStats = new Set<string>()
  if (completed.size < targetCount) {
    for (const order of orders) {
      if (completed.has(order.id)) continue
      if (completed.size < order.minOrders) continue
      if (!order.requiredOrderIds.every(id => completed.has(id))) continue
      for (const r of order.resources) {
        if (!stats.resources[r.item]?.trim()) missingStats.add(r.item)
      }
      for (const a of order.actions) {
        const playerStr = actionPlayerValue(a, stats)
        if (!playerStr?.trim()) {
          missingStats.add(ACTION_STAT_LABEL[a.type])
        }
      }
      if (order.completion) {
        for (const r of order.completion.resources) {
          if (!stats.resources[r.item]?.trim()) missingStats.add(r.item)
        }
        for (const a of order.completion.actions) {
          const playerStr = actionPlayerValue(a, stats)
          if (!playerStr?.trim()) {
            missingStats.add(ACTION_STAT_LABEL[a.type])
          }
        }
      }
    }
  }

  return {
    inferred: [...completed].sort((a, b) => a - b),
    unresolved: Math.max(0, targetCount - completed.size),
    missingStats: [...missingStats],
  }
}
