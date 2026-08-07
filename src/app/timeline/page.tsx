'use client'

import { useMemo, useState } from 'react'
import Link from 'next/link'
import { orders } from '@/data/orders'
import { getOrderNpc } from '@/data/npcs'
import { useLocalStorage } from '@/hooks/useLocalStorage'
import { parseQuantity } from '@/utils/parseQuantity'
import { DEFAULT_STATS } from '@/types'
import type { Order, OrderStatus, PlayerStats } from '@/types'

function getStatus(order: Order, completedIds: Set<number>, stats: PlayerStats): OrderStatus {
  if (completedIds.has(order.id)) return 'completed'
  const countMet = completedIds.size >= order.minOrders
  const prereqsMet = order.requiredOrderIds.every(id => completedIds.has(id))
  if (!countMet || !prereqsMet) return 'locked'
  for (const r of order.resources) {
    const amt = stats.resources[r.item]
    if (!amt?.trim()) continue
    const player = parseQuantity(amt)
    if (player === null) continue
    if (r.quantityDisplay === null) {
      if (player <= 0n) return 'needs_resources'
    } else {
      const req = parseQuantity(r.quantityDisplay)
      if (req !== null && player < req) return 'needs_resources'
    }
  }
  for (const a of order.actions) {
    const playerStr = a.type === 'chad_infusion' ? stats.tiLevel : a.type === 'chad_level' ? stats.chadLevel : stats.potionsCrafted
    if (!playerStr?.trim()) continue
    const player = parseQuantity(playerStr)
    if (player !== null && player < BigInt(a.quantity)) return 'needs_resources'
  }
  return 'available'
}

const STATUS_BORDER: Record<OrderStatus, string> = {
  completed:       'border-emerald-600/50',
  available:       'border-cyan-400',
  needs_resources: 'border-amber-400',
  locked:          'border-slate-700/60',
}

const STATUS_BG: Record<OrderStatus, string> = {
  completed:       'bg-emerald-900/5',
  available:       'bg-cyan-900/10',
  needs_resources: 'bg-amber-900/10',
  locked:          'bg-transparent',
}

function getCompletionSummary(order: Order): string {
  const resources = order.completion?.resources ?? []
  const actions = order.completion?.actions ?? []
  const items: string[] = [
    ...resources.map(r => r.quantityDisplay ? `${r.quantityDisplay} ${r.item}` : r.item),
    ...actions.map(a => {
      if (a.type === 'endurance_synthesizer_potion') return `${a.quantity}× Potion`
      if (a.type === 'chad_infusion') return `${a.quantity} TIs`
      if (a.type === 'chad_level') return `Chad Lvl ${a.quantity}`
      return ''
    }).filter(Boolean),
  ]
  if (items.length === 0) return '—'
  if (items.length <= 2) return items.join(', ')
  return `${items[0]}, ${items[1]} +${items.length - 2} more`
}

export default function TimelinePage() {
  const [completedArray,, isLoaded] = useLocalStorage<number[]>('ledger-completed', [])
  const [stats] = useLocalStorage<PlayerStats>('ledger-stats', DEFAULT_STATS)
  const [jumpValue, setJumpValue] = useState('')

  const completedIds = useMemo(() => new Set(completedArray), [completedArray])

  const grouped = useMemo(() => {
    const map = new Map<number, Order[]>()
    for (const order of orders) {
      const key = order.minOrders
      if (!map.has(key)) map.set(key, [])
      map.get(key)!.push(order)
    }
    for (const group of map.values()) {
      group.sort((a, b) => a.id - b.id)
    }
    return [...map.entries()].sort((a, b) => a[0] - b[0])
  }, [])

  function handleJump() {
    const n = parseInt(jumpValue, 10)
    if (isNaN(n)) return
    const target = grouped.find(([minOrders]) => minOrders >= n) ?? grouped[grouped.length - 1]
    if (target) {
      document.getElementById(`group-${target[0]}`)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  const completedCount = completedIds.size
  const prefillCount = stats.totalOrdersCompleted

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200">
      {/* Sticky top bar */}
      <div className="sticky top-0 z-10 bg-black/95 backdrop-blur-xl border-b border-cyan-700/30 px-4 py-3">
        <div className="max-w-2xl mx-auto flex items-center gap-3">
          <Link
            href="/"
            className="font-orbitron text-[10px] tracking-[0.08em] text-slate-500 hover:text-cyan-400 transition-colors shrink-0"
          >
            ← Back
          </Link>
          <span className="font-orbitron text-[11px] tracking-[0.12em] text-cyan-300 flex-1 uppercase">
            Order Timeline
          </span>
          <span className="font-spacemono text-[10px] text-slate-500 shrink-0">
            {isLoaded ? `${completedCount} completed` : '…'}
          </span>
          <label className="font-spacemono text-[10px] text-slate-400 shrink-0">Jump to:</label>
          <input
            type="number"
            value={jumpValue}
            onChange={e => setJumpValue(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleJump()}
            placeholder={prefillCount || '0'}
            className="w-16 bg-slate-900 border border-slate-700 rounded-sm px-2 py-1 font-spacemono text-xs text-slate-200 focus:outline-none focus:border-cyan-600 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
          />
          <button
            onClick={handleJump}
            className="font-orbitron text-[10px] tracking-[0.08em] px-3 py-2 min-h-[34px] rounded-sm border border-cyan-700/50 text-cyan-400 hover:bg-cyan-500/10 transition-colors cursor-pointer shrink-0 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-cyan-500/50"
          >
            Jump
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-2xl mx-auto py-2">
        {grouped.map(([minOrders, group]) => {
          const groupCompleted = group.filter(o => completedIds.has(o.id)).length
          return (
            <div key={minOrders}>
              {/* Group header */}
              <div
                id={`group-${minOrders}`}
                className="flex items-center justify-between px-4 py-2 mt-4 border-b border-slate-800/60 scroll-mt-[56px]"
              >
                <span className="font-orbitron text-[10px] tracking-[0.15em] text-slate-400 uppercase">
                  {minOrders === 0 ? 'No order requirement' : `${minOrders}+ orders`}
                </span>
                <span className="font-spacemono text-[10px] text-slate-600">
                  {groupCompleted}/{group.length}
                </span>
              </div>

              {/* Order rows */}
              {group.map(order => {
                const status = isLoaded ? getStatus(order, completedIds, stats) : 'locked'
                const npc = getOrderNpc(order)
                const completionSummary = getCompletionSummary(order)
                const firstReward = order.rewards?.[0] ?? '—'
                const isCompleted = status === 'completed'

                return (
                  <div
                    key={order.id}
                    className={`flex items-start gap-0 border-l-2 ${STATUS_BORDER[status]} ${STATUS_BG[status]} ${isCompleted ? 'opacity-40' : ''} transition-opacity`}
                  >
                    {/* Order ID */}
                    <span className="font-spacemono text-[10px] text-slate-500 w-[64px] shrink-0 px-3 py-2.5 tabular-nums">
                      #{order.id}
                    </span>

                    {/* NPC */}
                    <span className="font-spacemono text-[10px] text-slate-400 w-[108px] shrink-0 py-2.5 truncate pr-2">
                      {npc ?? <span className="text-slate-700">—</span>}
                    </span>

                    {/* Completion cost */}
                    <span className="font-spacemono text-[10px] text-slate-300 flex-1 py-2.5 truncate pr-3 min-w-0">
                      {completionSummary}
                    </span>

                    {/* First reward */}
                    <span className="font-spacemono text-[10px] text-emerald-400/70 shrink-0 py-2.5 px-3 text-right max-w-[140px] truncate">
                      {firstReward}
                    </span>
                  </div>
                )
              })}
            </div>
          )
        })}

        <div className="px-4 py-8 text-center font-spacemono text-[10px] text-slate-700">
          — end of timeline —
        </div>
      </div>
    </div>
  )
}
