'use client'

import { useMemo, useState, useCallback } from 'react'
import Link from 'next/link'
import { orders } from '@/data/orders'
import { getOrderNpc } from '@/data/npcs'
import { useLocalStorage } from '@/hooks/useLocalStorage'
import { parseQuantity, formatQuantity } from '@/utils/parseQuantity'
import { DEFAULT_STATS, RESOURCE_GROUP_MAP, RESOURCE_GROUP_ORDER } from '@/types'
import type { Order, OrderStatus, PlayerStats } from '@/types'
import OrderCard from '@/components/OrderCard'
import { getAllPrerequisites, getAllDependents } from '@/utils/inferCompletedOrders'

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

type PlannerStatusFilter = 'all' | 'locked' | 'available' | 'needs_resources' | 'completed'

const STATUS_COLORS: Record<OrderStatus, string> = {
  completed:       'text-emerald-400',
  available:       'text-cyan-400',
  needs_resources: 'text-amber-400',
  locked:          'text-slate-500',
}

const STATUS_LABEL: Record<OrderStatus, string> = {
  completed:       'done',
  available:       'available',
  needs_resources: 'needs res.',
  locked:          'locked',
}

const NAV_LINK = 'font-orbitron text-[10px] tracking-[0.08em] px-3 py-2 min-h-[44px] rounded-sm border border-slate-700/60 text-slate-400 hover:text-slate-200 hover:border-slate-500 transition-all duration-150 flex items-center focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-cyan-500/50 focus-visible:ring-offset-1 focus-visible:ring-offset-black'

export default function PlannerPage() {
  const [completedArray, setCompletedArray, isLoaded] = useLocalStorage<number[]>('ledger-completed', [])
  const [inProgressArray, setInProgressArray] = useLocalStorage<number[]>('ledger-inprogress', [])
  const [stats, , statsLoaded] = useLocalStorage<PlayerStats>('ledger-stats', DEFAULT_STATS)
  const [plannerStockpile, setPlannerStockpile] = useLocalStorage<Record<string, string>>('ledger-planner-stockpile', {})
  const [selectedIds, setSelectedIds] = useState<Set<number>>(new Set())
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState<PlannerStatusFilter>('all')

  const completedIds = useMemo(() => new Set(completedArray), [completedArray])
  const statuses = useMemo(
    () => new Map(orders.map(o => [o.id, getStatus(o, completedIds, stats)])),
    [completedIds, stats]
  )

  const filteredOrders = useMemo(() => {
    return orders.filter(o => {
      if (statusFilter !== 'all' && statuses.get(o.id) !== statusFilter) return false
      if (search.trim()) {
        const q = search.toLowerCase()
        const npc = getOrderNpc(o) ?? ''
        if (!`${o.id}`.includes(q) && !npc.toLowerCase().includes(q)) return false
      }
      return true
    })
  }, [statuses, statusFilter, search])

  const { resourceMap, unknownItems, actionTotals } = useMemo(() => {
    const resourceMap = new Map<string, bigint>()
    const unknownItems = new Set<string>()
    const actionTotals: Record<string, number> = {
      chad_infusion: 0,
      chad_level: 0,
      endurance_synthesizer_potion: 0,
    }

    for (const order of orders) {
      if (!selectedIds.has(order.id)) continue

      for (const r of [...order.resources, ...(order.completion?.resources ?? [])]) {
        if (r.quantityDisplay === null) {
          unknownItems.add(r.item)
        } else {
          const qty = parseQuantity(r.quantityDisplay)
          if (qty !== null) resourceMap.set(r.item, (resourceMap.get(r.item) ?? 0n) + qty)
        }
      }

      for (const a of [...order.actions, ...(order.completion?.actions ?? [])]) {
        actionTotals[a.type] = Math.max(actionTotals[a.type] ?? 0, a.quantity)
      }
    }

    return { resourceMap, unknownItems, actionTotals }
  }, [selectedIds])

  const groupedResources = useMemo(() => {
    const groups: Record<string, Array<{ item: string; qty: bigint }>> = {}
    for (const [item, qty] of resourceMap) {
      const group = RESOURCE_GROUP_MAP[item] ?? 'Other'
      if (!groups[group]) groups[group] = []
      groups[group].push({ item, qty })
    }
    return groups
  }, [resourceMap])

  const hasStockpileData = Object.values(plannerStockpile).some(v => v?.trim())

  const stillNeededMap = useMemo(() => {
    const map = new Map<string, bigint | null>()
    for (const [item, totalQty] of resourceMap) {
      const playerStr = plannerStockpile[item]
      if (!playerStr?.trim()) {
        map.set(item, null)
      } else {
        const playerQty = parseQuantity(playerStr)
        map.set(item, playerQty !== null && playerQty >= totalQty ? 0n : playerQty !== null ? totalQty - playerQty : null)
      }
    }
    return map
  }, [resourceMap, plannerStockpile])

  const inProgressIds = useMemo(() => new Set(inProgressArray), [inProgressArray])

  const suggestedOrders = useMemo(() => {
    const unlockPotential = new Map<number, number>()
    for (const order of orders) {
      if (statuses.get(order.id) === 'locked') {
        for (const prereqId of order.requiredOrderIds) {
          unlockPotential.set(prereqId, (unlockPotential.get(prereqId) ?? 0) + 1)
        }
      }
    }
    return orders
      .filter(o => {
        const s = statuses.get(o.id)
        return s === 'available' || s === 'needs_resources'
      })
      .sort((a, b) => {
        const sa = statuses.get(a.id)!
        const sb = statuses.get(b.id)!
        if (sa !== sb) return sa === 'available' ? -1 : 1
        const potA = unlockPotential.get(a.id) ?? 0
        const potB = unlockPotential.get(b.id) ?? 0
        if (potB !== potA) return potB - potA
        return a.id - b.id
      })
  }, [statuses])

  const toggleCompleted = useCallback((id: number) => {
    setInProgressArray(prev => prev.filter(x => x !== id))
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
  }, [setCompletedArray, setInProgressArray])

  const toggleInProgress = useCallback((id: number) => {
    setInProgressArray(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id])
  }, [setInProgressArray])

  const toggleOrder = (id: number) => {
    setSelectedIds(prev => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  if (!isLoaded || !statsLoaded) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <p className="text-slate-700 text-[10px] font-spacemono tracking-[0.3em] uppercase">Initializing…</p>
      </div>
    )
  }

  const hasResults =
    resourceMap.size > 0 ||
    unknownItems.size > 0 ||
    Object.values(actionTotals).some(v => v > 0)

  return (
    <div className="flex flex-col min-h-screen bg-black">
      <header className="bg-black/95 backdrop-blur-xl border-b border-cyan-700/30 px-4 pt-5 pb-4">
        <div className="max-w-6xl mx-auto flex items-start justify-between gap-4">
          <div>
            <p className="font-spacemono text-[9px] tracking-[0.2em] text-slate-400 uppercase mb-1.5">
              Chad&apos;s Galactic Mining Empire
            </p>
            <h1 className="font-orbitron text-3xl font-bold tracking-[0.12em] text-cyan-200 uppercase leading-snug [text-shadow:0_0_18px_rgba(0,212,255,0.45)]">
              Resource Planner
            </h1>
          </div>
          <div className="flex items-center gap-2 pt-1 flex-shrink-0">
            <Link href="/" className={NAV_LINK}>Orders</Link>
            <Link href="/timeline" className={NAV_LINK}>Timeline</Link>
          </div>
        </div>
      </header>

      <main className="flex-1 px-4 py-4">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-6">

          {/* Left: Order selector */}
          <div className="md:w-[360px] flex-shrink-0">
            <div className="mb-3 space-y-2">
              <input
                type="text"
                placeholder="Search by order # or NPC…"
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="w-full bg-slate-900/60 border border-slate-700/60 rounded-sm px-3 py-2 text-[11px] font-spacemono text-slate-300 placeholder-slate-600 focus:outline-none focus:border-cyan-700/60 transition-colors"
              />
              <div className="flex gap-1 flex-wrap">
                {(['all', 'locked', 'available', 'needs_resources', 'completed'] as PlannerStatusFilter[]).map(f => (
                  <button
                    key={f}
                    onClick={() => setStatusFilter(f)}
                    className={`font-orbitron text-[9px] tracking-[0.06em] px-2 py-1 rounded-sm border transition-all cursor-pointer ${
                      statusFilter === f
                        ? 'border-cyan-600/50 text-cyan-300 bg-cyan-900/20'
                        : 'border-slate-700/40 text-slate-500 hover:text-slate-300 hover:border-slate-600'
                    }`}
                  >
                    {f === 'needs_resources' ? 'needs res.' : f}
                  </button>
                ))}
              </div>
              <div className="flex justify-between items-center">
                <span className="font-spacemono text-[10px] text-slate-500">
                  {filteredOrders.length} shown · <span className="text-cyan-500">{selectedIds.size}</span> selected
                </span>
                <div className="flex gap-3">
                  <button
                    onClick={() => setSelectedIds(new Set(filteredOrders.map(o => o.id)))}
                    className="font-spacemono text-[10px] text-slate-500 hover:text-cyan-400 transition-colors cursor-pointer"
                  >
                    Select all
                  </button>
                  <button
                    onClick={() => setSelectedIds(new Set())}
                    className="font-spacemono text-[10px] text-slate-500 hover:text-red-400 transition-colors cursor-pointer"
                  >
                    Clear
                  </button>
                </div>
              </div>
            </div>

            <div className="space-y-px max-h-[calc(100vh-300px)] overflow-y-auto pr-0.5">
              {filteredOrders.map(order => {
                const status = statuses.get(order.id)!
                const selected = selectedIds.has(order.id)
                const npc = getOrderNpc(order)
                return (
                  <button
                    key={order.id}
                    onClick={() => toggleOrder(order.id)}
                    className={`w-full text-left px-3 py-2 border transition-all duration-100 cursor-pointer flex items-center gap-3 rounded-sm ${
                      selected
                        ? 'bg-cyan-950/30 border-cyan-700/40'
                        : 'bg-slate-900/20 border-slate-800/40 hover:bg-slate-900/40 hover:border-slate-700/40'
                    }`}
                  >
                    <span className={`w-3.5 h-3.5 flex-shrink-0 border rounded-sm flex items-center justify-center transition-colors ${
                      selected ? 'border-cyan-500 bg-cyan-500/20' : 'border-slate-600'
                    }`}>
                      {selected && (
                        <svg className="w-2.5 h-2.5 text-cyan-400" fill="none" viewBox="0 0 10 10">
                          <path d="M1.5 5L4 7.5L8.5 2.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      )}
                    </span>
                    <span className="flex-1 min-w-0 flex items-baseline gap-2">
                      <span className="font-orbitron text-[10px] tracking-[0.05em] text-slate-400 flex-shrink-0">
                        #{order.id}
                      </span>
                      {npc && (
                        <span className="font-spacemono text-[10px] text-slate-500 truncate">
                          {npc}
                        </span>
                      )}
                    </span>
                    <span className={`font-spacemono text-[9px] flex-shrink-0 ${STATUS_COLORS[status]}`}>
                      {STATUS_LABEL[status]}
                    </span>
                  </button>
                )
              })}
              {filteredOrders.length === 0 && (
                <p className="font-spacemono text-[10px] text-slate-700 text-center py-8">No orders match</p>
              )}
            </div>
          </div>

          {/* Right: Totals */}
          <div className="flex-1 min-w-0 space-y-4">

            {/* Stockpile prompt banner */}
            {!hasStockpileData && selectedIds.size > 0 && hasResults && (
              <div className="border border-amber-500/30 bg-amber-950/20 rounded-sm px-4 py-3 flex items-start gap-3">
                <span className="text-amber-400 text-sm mt-0.5 flex-shrink-0">✦</span>
                <div className="min-w-0">
                  <p className="font-orbitron text-[10px] tracking-[0.1em] text-amber-300 uppercase mb-1">
                    Track what you still need
                  </p>
                  <p className="font-spacemono text-[11px] leading-relaxed text-amber-200/70">
                    Enter your current stockpile in the <span className="text-amber-300">Have</span> fields below to see exactly what you still need to gather.
                  </p>
                </div>
              </div>
            )}

            {selectedIds.size === 0 ? (
              <div>
                {suggestedOrders.length > 0 ? (
                  <>
                    <div className="flex items-center gap-2 mb-3">
                      <h2 className="font-orbitron text-[11px] tracking-[0.15em] text-slate-300 uppercase">Up Next</h2>
                      <span className="font-spacemono text-[10px] text-slate-600">ledgers you can do now</span>
                      <div className="h-px flex-1 bg-slate-800" />
                    </div>
                    <div className="space-y-1.5">
                      {suggestedOrders.map(order => (
                        <OrderCard
                          key={order.id}
                          order={order}
                          status={statuses.get(order.id)!}
                          completedCount={completedArray.length}
                          completedIds={completedIds}
                          stats={stats}
                          inProgress={inProgressIds.has(order.id)}
                          onToggle={toggleCompleted}
                          onScrollToOrder={() => {}}
                          onToggleInProgress={toggleInProgress}
                        />
                      ))}
                    </div>
                  </>
                ) : (
                  <div className="flex flex-col items-center justify-center h-48 text-center space-y-2">
                    <p className="font-orbitron text-[9px] tracking-[0.3em] text-slate-600 uppercase">All caught up</p>
                    <p className="font-spacemono text-[10px] text-slate-700">No orders available right now</p>
                  </div>
                )}
              </div>
            ) : !hasResults ? (
              <div className="flex flex-col items-center justify-center h-48 text-center space-y-2">
                <p className="font-orbitron text-[9px] tracking-[0.3em] text-slate-600 uppercase">No resource data</p>
                <p className="font-spacemono text-[10px] text-slate-700">Selected orders have no known requirements</p>
              </div>
            ) : (
              <div className="space-y-5">
                <div className="flex items-center gap-3">
                  <h2 className="font-orbitron text-[11px] tracking-[0.15em] text-slate-300 uppercase">
                    Total Requirements
                  </h2>
                  <span className="font-spacemono text-[10px] text-slate-600">
                    across {selectedIds.size} order{selectedIds.size !== 1 ? 's' : ''}
                  </span>
                </div>

                {RESOURCE_GROUP_ORDER.filter(g => groupedResources[g]).map(group => (
                  <div key={group}>
                    <div className="flex items-center gap-2 mb-1.5">
                      <span className="font-orbitron text-[8px] tracking-[0.25em] text-slate-600 uppercase">{group}</span>
                      <div className="h-px flex-1 bg-slate-800" />
                    </div>
                    <div className="space-y-px">
                      {groupedResources[group].map(({ item, qty }) => {
                        const stillNeeded = stillNeededMap.get(item)
                        const met = stillNeeded === 0n
                        return (
                          <div key={item} className={`flex items-center px-3 py-1.5 border rounded-sm gap-2 transition-colors ${met ? 'bg-emerald-950/10 border-emerald-900/30' : 'bg-slate-900/30 border-slate-800/50'}`}>
                            <span className={`font-spacemono text-[11px] flex-1 min-w-0 truncate ${met ? 'text-slate-500 line-through' : 'text-slate-300'}`}>{item}</span>
                            <div className="flex items-center gap-1 flex-shrink-0">
                              <span className="font-spacemono text-[9px] text-slate-600">have</span>
                              <input
                                type="text"
                                value={plannerStockpile[item] ?? ''}
                                onChange={e => setPlannerStockpile(prev => ({ ...prev, [item]: e.target.value }))}
                                placeholder="0"
                                className="w-20 bg-slate-800/60 border border-slate-700/40 rounded-sm px-2 py-0.5 font-spacemono text-[10px] text-slate-300 placeholder-slate-700 focus:outline-none focus:border-cyan-700/50 tabular-nums text-right transition-colors"
                              />
                            </div>
                            <div className="flex items-center gap-1.5 flex-shrink-0 min-w-[90px] justify-end">
                              {met ? (
                                <span className="font-spacemono text-[11px] text-emerald-400">✓ enough</span>
                              ) : (
                                <span className="font-spacemono text-[11px] text-amber-300 tabular-nums">
                                  {stillNeeded != null ? `need ${formatQuantity(stillNeeded)}` : formatQuantity(qty)}
                                </span>
                              )}
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  </div>
                ))}

                {unknownItems.size > 0 && (
                  <div>
                    <div className="flex items-center gap-2 mb-1.5">
                      <span className="font-orbitron text-[8px] tracking-[0.25em] text-slate-600 uppercase">Unknown Amount</span>
                      <div className="h-px flex-1 bg-slate-800" />
                    </div>
                    <div className="space-y-px">
                      {[...unknownItems].map(item => (
                        <div key={item} className="flex items-center justify-between px-3 py-2 bg-slate-900/30 border border-slate-800/50 rounded-sm">
                          <span className="font-spacemono text-[11px] text-slate-300">{item}</span>
                          <span className="font-spacemono text-[10px] text-slate-500 italic">any amount</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {Object.values(actionTotals).some(v => v > 0) && (
                  <div>
                    <div className="flex items-center gap-2 mb-1.5">
                      <span className="font-orbitron text-[8px] tracking-[0.25em] text-slate-600 uppercase">Actions</span>
                      <div className="h-px flex-1 bg-slate-800" />
                    </div>
                    <p className="font-spacemono text-[9px] text-slate-600 mb-1.5">minimum thresholds required (not additional costs)</p>
                    <div className="space-y-px">
                      {actionTotals.chad_infusion > 0 && (
                        <div className="flex items-center justify-between px-3 py-2 bg-slate-900/30 border border-slate-800/50 rounded-sm">
                          <span className="font-spacemono text-[11px] text-slate-300">TI (Chad Infusions)</span>
                          <span className="font-spacemono text-[11px] text-violet-300 tabular-nums">{actionTotals.chad_infusion.toLocaleString()}</span>
                        </div>
                      )}
                      {actionTotals.chad_level > 0 && (
                        <div className="flex items-center justify-between px-3 py-2 bg-slate-900/30 border border-slate-800/50 rounded-sm">
                          <span className="font-spacemono text-[11px] text-slate-300">Chad Level</span>
                          <span className="font-spacemono text-[11px] text-violet-300 tabular-nums">{actionTotals.chad_level.toLocaleString()}</span>
                        </div>
                      )}
                      {actionTotals.endurance_synthesizer_potion > 0 && (
                        <div className="flex items-center justify-between px-3 py-2 bg-slate-900/30 border border-slate-800/50 rounded-sm">
                          <span className="font-spacemono text-[11px] text-slate-300">Endurance Synthesizer Potions</span>
                          <span className="font-spacemono text-[11px] text-violet-300 tabular-nums">{actionTotals.endurance_synthesizer_potion.toLocaleString()}</span>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

        </div>
      </main>
    </div>
  )
}
