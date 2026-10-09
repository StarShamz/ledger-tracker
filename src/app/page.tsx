'use client'

import { useMemo, useState, useEffect, useDeferredValue, useCallback } from 'react'
import { orders } from '@/data/orders'
import { getOrderNpc } from '@/data/npcs'
import { useLocalStorage } from '@/hooks/useLocalStorage'
import ProgressHeader from '@/components/ProgressHeader'
import SearchFilter from '@/components/SearchFilter'
import OrderCard from '@/components/OrderCard'
import StatsPanel from '@/components/StatsPanel'
import CreditsPanel from '@/components/CreditsPanel'
import BottomSheet from '@/components/BottomSheet'
import { parseQuantity } from '@/utils/parseQuantity'
import { getAllPrerequisites, getAllDependents } from '@/utils/inferCompletedOrders'
import type { CharacterFilter, Order, OrderStatus, PlayerStats, ResourceFilter, RewardFilter, StatusFilter } from '@/types'
import { DEFAULT_STATS, RESOURCE_GROUP_MAP } from '@/types'
import { actionPlayerValue } from '@/utils/actions'

function getStatus(
  order: Order,
  completedIds: Set<number>,
  stats: PlayerStats
): OrderStatus {
  if (completedIds.has(order.id)) return 'completed'

  const countMet = completedIds.size >= order.minOrders
  const prereqsMet = order.requiredOrderIds.every(id => completedIds.has(id))
  if (!countMet || !prereqsMet) return 'locked'

  // Order prerequisites met — now check resource/action stats if entered.
  // Only fail if we have a value AND it's below the requirement.
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
    const playerStr = actionPlayerValue(a, stats)
    if (!playerStr?.trim()) continue
    const player = parseQuantity(playerStr)
    if (player !== null && player < BigInt(a.quantity)) return 'needs_resources'
  }

  return 'available'
}

// Resource chips match items needed to unlock or to complete the order.
function matchesResource(order: Order, filter: ResourceFilter): boolean {
  if (filter === 'all') return true
  const resources = [...order.resources, ...(order.completion?.resources ?? [])]
  const items = resources.map(r => r.item.toLowerCase())
  switch (filter) {
    case 'ether':     return items.some(i => i === 'ether')
    case 'jade':      return items.some(i => i === 'jade')
    case 'vespium':   return items.some(i => i.includes('vespium'))
    case 'silicate':  return resources.some(r => RESOURCE_GROUP_MAP[r.item] === 'Silicate')
    case 'industrial': return items.some(i => i === 'industrial bit')
    case 'hydracite': return items.some(i => i === 'hydracite')
    case 'scorchium': return items.some(i => i === 'scorchium')
    case 'ardranite': return items.some(i => i === 'ardranite')
    case 'azvelite':  return items.some(i => i === 'azvelite')
    case 'gel':       return items.some(i => i === 'low grade gel')
    case 'rocks':     return items.some(i => i === 'worthless rock')
    case 'actions':   return order.actions.length > 0
    default:          return true
  }
}

function matchesReward(order: Order, filter: RewardFilter): boolean {
  if (filter === 'all') return true
  const rewards = order.rewards ?? []
  switch (filter) {
    case 'ether':               return rewards.some(r => r.includes('Ether'))
    case 'credits':             return rewards.some(r => r.includes('Credit'))
    case 'exp':                 return rewards.some(r => r.includes('EXP'))
    case 'core':                return rewards.some(r => r.includes('Core'))
    case 'crafting_speed':      return rewards.some(r => r.includes('Crafting Speed'))
    case 'vespium':             return rewards.some(r => r.includes('Vespium'))
    case 'jade':                return rewards.some(r => r.includes('Jade'))
    case 'worthless_rock':      return rewards.some(r => r.includes('Worthless Rock'))
    case 'ardranite':           return rewards.some(r => r.includes('Ardranite'))
    case 'azvelite':            return rewards.some(r => r.includes('Azvelite'))
    case 'tokenium':            return rewards.some(r => r.includes('Tokenium'))
    case 'craftable_sell_price': return rewards.some(r => r.includes('Craftable Sell Price'))
    case 'rig':                 return rewards.some(r => r.includes('Rig'))
    case 'crafter':             return rewards.some(r => r.includes('Crafter'))
    case 'max_stamina':         return rewards.some(r => r.includes('Max Stamina'))
    case 'attribute_points':    return rewards.some(r => r.includes('Attribute Point'))
    default:                    return true
  }
}

function matchesCharacter(order: Order, filter: CharacterFilter): boolean {
  if (filter === 'all') return true
  return getOrderNpc(order) === filter
}

// One-time migration: item names used to be plural in `stats.resources`.
// Carries over any values saved under the old keys to their new singular keys.
const RESOURCE_KEY_MIGRATIONS: Record<string, string> = {
  'Industrial Bits': 'Industrial Bit',
  'Silicate Bricks': 'Silicate Brick',
  'Tokenium Canisters': 'Tokenium Canister',
  'Vespium Frames': 'Vespium Frame',
  'Vespium Ingots': 'Vespium Ingot',
  'Vespium Plates': 'Vespium Plate',
  'Vespium Rods': 'Vespium Rod',
  'Worthless Rocks': 'Worthless Rock',
}

function matchesSearch(order: Order, query: string): boolean {
  if (!query.trim()) return true
  const q = query.toLowerCase()
  if (`order ${order.id}`.includes(q) || String(order.id) === q) return true
  if (order.resources.some(r => r.item.toLowerCase().includes(q))) return true
  if (order.requiredOrderIds.some(id => `order ${id}`.includes(q))) return true
  return false
}

export default function Page() {
  const [completedArray, setCompletedArray, isLoaded] = useLocalStorage<number[]>(
    'ledger-completed',
    []
  )
  const [inProgressArray, setInProgressArray] = useLocalStorage<number[]>(
    'ledger-inprogress',
    []
  )
  const [stats, setStats, statsLoaded] = useLocalStorage<PlayerStats>(
    'ledger-stats',
    DEFAULT_STATS
  )

  useEffect(() => {
    if (!statsLoaded) return
    setStats(prev => {
      let changed = false
      const resources = { ...prev.resources }
      for (const [oldKey, newKey] of Object.entries(RESOURCE_KEY_MIGRATIONS)) {
        if (oldKey in resources) {
          if (!resources[newKey]?.trim()) resources[newKey] = resources[oldKey]
          delete resources[oldKey]
          changed = true
        }
      }
      return changed ? { ...prev, resources } : prev
    })
  }, [statsLoaded, setStats])
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('all')
  const [resourceFilter, setResourceFilter] = useState<ResourceFilter>('all')
  const [rewardFilter, setRewardFilter] = useState<RewardFilter>('all')
  const [characterFilter, setCharacterFilter] = useState<CharacterFilter>('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [statsOpen, setStatsOpen] = useState(false)
  const [creditsOpen, setCreditsOpen] = useState(false)
  const [completedFlash, setCompletedFlash] = useState(0)
  const deferredSearch = useDeferredValue(searchQuery)

  const completedIds = useMemo(() => new Set(completedArray), [completedArray])
  const inProgressIds = useMemo(() => new Set(inProgressArray), [inProgressArray])

  const toggleCompleted = useCallback(
    (id: number) => {
      if (!completedIds.has(id)) {
        setCompletedFlash(n => n + 1)
        setInProgressArray(prev => prev.filter(x => x !== id))
      }
      setCompletedArray(prev => {
        const prevSet = new Set(prev)
        if (prevSet.has(id)) {
          const dependents = getAllDependents(id)
          return prev.filter(x => x !== id && !dependents.has(x))
        } else {
          const prereqs = getAllPrerequisites(id)
          const toAdd = [id, ...[...prereqs].filter(p => !prevSet.has(p))]
          return [...prev, ...toAdd]
        }
      })
    },
    [setCompletedArray, setInProgressArray, completedIds]
  )

  const toggleInProgress = useCallback(
    (id: number) => {
      setInProgressArray(prev =>
        prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
      )
    },
    [setInProgressArray]
  )

  const handleReset = useCallback(() => {
    setCompletedArray([])
  }, [setCompletedArray])

  const scrollToOrder = useCallback((id: number) => {
    const el = document.getElementById(`order-${id}`)
    el?.scrollIntoView({ behavior: 'smooth', block: 'center' })
  }, [])

  const statuses = useMemo(
    () => new Map(orders.map(o => [o.id, getStatus(o, completedIds, stats)])),
    [completedIds, stats]
  )

  // For each order: count how many currently-locked orders list it as a direct prerequisite.
  const unlockPotential = useMemo(() => {
    const map = new Map<number, number>()
    for (const order of orders) {
      if (statuses.get(order.id) === 'locked') {
        for (const prereqId of order.requiredOrderIds) {
          map.set(prereqId, (map.get(prereqId) ?? 0) + 1)
        }
      }
    }
    return map
  }, [statuses])

  const filteredOrders = useMemo(() => {
    if (statusFilter === 'recommended') {
      return orders
        .filter(order => {
          const status = statuses.get(order.id)!
          return (
            (status === 'available' || status === 'needs_resources') &&
            matchesResource(order, resourceFilter) &&
            matchesReward(order, rewardFilter) &&
            matchesCharacter(order, characterFilter) &&
            matchesSearch(order, deferredSearch)
          )
        })
        .sort((a, b) => {
          const potA = unlockPotential.get(a.id) ?? 0
          const potB = unlockPotential.get(b.id) ?? 0
          if (potB !== potA) return potB - potA
          // available before needs_resources within same unlock count
          const sA = statuses.get(a.id)!
          const sB = statuses.get(b.id)!
          if (sA !== sB) return sA === 'available' ? -1 : 1
          return a.id - b.id
        })
    }

    if (statusFilter === 'in_progress') {
      return orders.filter(order =>
        inProgressIds.has(order.id) &&
        matchesResource(order, resourceFilter) &&
        matchesReward(order, rewardFilter) &&
        matchesCharacter(order, characterFilter) &&
        matchesSearch(order, deferredSearch)
      )
    }

    if (statusFilter === 'locked') {
      return orders
        .filter(order =>
          statuses.get(order.id) === 'locked' &&
          matchesResource(order, resourceFilter) &&
          matchesReward(order, rewardFilter) &&
          matchesCharacter(order, characterFilter) &&
          matchesSearch(order, deferredSearch)
        )
        .sort((a, b) => {
          const awayA = Math.max(0, a.minOrders - completedIds.size)
          const awayB = Math.max(0, b.minOrders - completedIds.size)
          if (awayA !== awayB) return awayA - awayB
          const unmetA = a.requiredOrderIds.filter(id => !completedIds.has(id)).length
          const unmetB = b.requiredOrderIds.filter(id => !completedIds.has(id)).length
          if (unmetA !== unmetB) return unmetA - unmetB
          return a.id - b.id
        })
    }

    return orders.filter(order => {
      const status = statuses.get(order.id)!
      const matchStatus = statusFilter === 'all' ? status !== 'completed' : status === statusFilter
      const matchResource = matchesResource(order, resourceFilter)
      const matchReward = matchesReward(order, rewardFilter)
      const matchCharacter = matchesCharacter(order, characterFilter)
      const matchSearch = matchesSearch(order, deferredSearch)
      return matchStatus && matchResource && matchReward && matchCharacter && matchSearch
    })
  }, [statuses, statusFilter, resourceFilter, rewardFilter, characterFilter, deferredSearch, unlockPotential, inProgressIds, completedIds])

  const inProgressOrders = useMemo(
    () => inProgressArray
      .map(id => orders.find(o => o.id === id))
      .filter((o): o is typeof orders[0] => o !== undefined && !completedIds.has(o.id)),
    [inProgressArray, completedIds]
  )

  if (!isLoaded || !statsLoaded) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <p className="text-slate-700 text-[10px] font-spacemono tracking-[0.3em] uppercase">Initializing…</p>
      </div>
    )
  }

  return (
    <div className="flex flex-col min-h-screen">
      <ProgressHeader
        completedCount={completedArray.length}
        totalCount={orders.length}
        statsOpen={statsOpen}
        onStatsToggle={() => setStatsOpen(v => !v)}
        creditsOpen={creditsOpen}
        onCreditsToggle={() => setCreditsOpen(v => !v)}
        onReset={handleReset}
      />
      <BottomSheet open={statsOpen} onClose={() => setStatsOpen(false)}>
        <StatsPanel
          stats={stats}
          onChange={setStats}
          onApplyInference={ids => {
            setCompletedArray(ids)
            setStatsOpen(false)
          }}
          completedArray={completedArray}
          inProgressArray={inProgressArray}
          onImportOrders={(completed, inProgress) => {
            setCompletedArray(completed)
            setInProgressArray(inProgress)
          }}
        />
      </BottomSheet>
      {creditsOpen && <CreditsPanel />}
      <SearchFilter
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        statusFilter={statusFilter}
        onStatusChange={setStatusFilter}
        resourceFilter={resourceFilter}
        onResourceChange={setResourceFilter}
        rewardFilter={rewardFilter}
        onRewardChange={setRewardFilter}
        characterFilter={characterFilter}
        onCharacterChange={setCharacterFilter}
        completedFlash={completedFlash}
      />
      <main className="flex-1 px-4 py-4">
        <div className="max-w-2xl mx-auto space-y-1.5">

          {/* In-progress section */}
          {statusFilter !== 'in_progress' && inProgressOrders.length > 0 && (
            <div className="mb-2 bg-amber-950/20 border border-amber-500/10 px-2 pt-2 pb-2 -mx-1 rounded-sm">
              <div className="flex items-center gap-2 mb-2 px-0.5">
                <span className="font-orbitron text-[8px] tracking-[0.3em] text-amber-400/80 uppercase">In Progress</span>
                <div className="h-px flex-1 bg-amber-500/20" />
                <button
                  onClick={() => setInProgressArray([])}
                  className="font-spacemono text-[9px] text-slate-600 hover:text-amber-400/70 transition-colors cursor-pointer"
                >
                  Clear all
                </button>
                <span className="font-spacemono text-[9px] text-amber-500/40">{inProgressOrders.length}</span>
              </div>
              <div className="space-y-1.5">
                {inProgressOrders.map(order => (
                  <OrderCard
                    key={order.id}
                    order={order}
                    status={statuses.get(order.id)!}
                    completedCount={completedArray.length}
                    completedIds={completedIds}
                    stats={stats}
                    inProgress
                    onToggle={toggleCompleted}
                    onScrollToOrder={scrollToOrder}
                    onToggleInProgress={toggleInProgress}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Main order list */}
          {(() => {
            const mainOrders = statusFilter === 'in_progress'
              ? filteredOrders
              : filteredOrders.filter(o => !inProgressIds.has(o.id))

            if (mainOrders.length === 0) {
              if (statusFilter === 'in_progress' && inProgressOrders.length === 0) {
                return (
                  <div className="text-center py-20 space-y-2">
                    <p className="font-orbitron text-[9px] tracking-[0.3em] text-slate-600 uppercase">No pinned orders</p>
                    <p className="font-spacemono text-[10px] text-slate-700">Tap the bookmark icon on a card to track it here</p>
                  </div>
                )
              }
              if (statusFilter !== 'in_progress' && inProgressOrders.length > 0) {
                return null
              }
              return (
                <div className="text-center py-20 space-y-2">
                  <p className="font-orbitron text-[9px] tracking-[0.3em] text-slate-600 uppercase">No orders found</p>
                  <p className="font-spacemono text-[10px] text-slate-700">Adjust filters or search query</p>
                </div>
              )
            }

            return mainOrders.map(order => (
              <OrderCard
                key={order.id}
                order={order}
                status={statuses.get(order.id)!}
                completedCount={completedArray.length}
                completedIds={completedIds}
                stats={stats}
                unlockCount={statusFilter === 'recommended' ? (unlockPotential.get(order.id) ?? 0) : undefined}
                inProgress={statusFilter === 'in_progress'}
                onToggle={toggleCompleted}
                onScrollToOrder={scrollToOrder}
                onToggleInProgress={toggleInProgress}
              />
            ))
          })()}

        </div>
      </main>
    </div>
  )
}
