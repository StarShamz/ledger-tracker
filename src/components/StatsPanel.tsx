'use client'

import { useRef, useState } from 'react'
import type { Order, PlayerStats } from '@/types'
import { inferCompletedOrders, type InferenceResult } from '@/utils/inferCompletedOrders'
import { orders as allOrders } from '@/data/orders'
import { parseQuantity, formatQuantity } from '@/utils/parseQuantity'
import { RESOURCE_ICONS, ACTION_ICONS } from '@/data/icons'

interface StatsPanelProps {
  stats: PlayerStats
  onChange: (stats: PlayerStats) => void
  onApplyInference: (ids: number[]) => void
}

const RESOURCE_GROUPS: { label: string; items: string[] }[] = [
  { label: 'Worthless Rocks', items: ['Worthless Rocks'] },
  { label: 'Silicate', items: ['Industrial Bits', 'Silicate Glass', 'Silicate Bricks', 'Silicate Concrete'] },
  {
    label: 'Vespium',
    items: ['Vespium', 'Vespium Ingots', 'Vespium Plates', 'Vespium Rods', 'Vespium Frames', 'Vespium Wire'],
  },
  { label: 'Jade', items: ['Jade'] },
  { label: 'Potions', items: ['Hydracite', 'Scorchium'] },
  { label: 'Tokenium', items: ['Tokenium', 'Tokenium Canisters'] },
  { label: 'Other', items: ['Low Grade Gel'] },
]

const INPUT_CLASSES =
  'w-full bg-slate-950/60 border border-slate-800/55 rounded-sm px-2 py-1 text-xs text-slate-200 placeholder-slate-700 font-spacemono focus:outline-none focus:border-cyan-700/40 focus:ring-1 focus:ring-cyan-600/20 transition-colors'

const orderById = new Map(allOrders.map(o => [o.id, o]))

type RiskyResource = { item: string; pct: number; reqDisplay: string; haveDisplay: string }

function getRiskyResources(order: Order, stats: PlayerStats): RiskyResource[] {
  const risky: RiskyResource[] = []
  for (const r of order.resources) {
    if (r.quantityDisplay === null) continue
    const playerStr = stats.resources[r.item]
    if (!playerStr?.trim()) continue
    const player = parseQuantity(playerStr)
    const req = parseQuantity(r.quantityDisplay)
    if (!player || !req || player === 0n) continue
    const pct = Math.round(Number(req * 10000n / player) / 100)
    if (pct >= 80) risky.push({ item: r.item, pct, reqDisplay: formatQuantity(req), haveDisplay: formatQuantity(player) })
  }
  return risky
}

function orderSummary(order: Order): { reqs: string[]; prereqs: string } {
  const reqs: string[] = []

  for (const r of order.resources) {
    const n = r.quantityDisplay !== null ? parseQuantity(r.quantityDisplay) : null
    const qty = n !== null ? `${formatQuantity(n)}+` : r.quantityDisplay !== null ? `${r.quantityDisplay}+` : 'any'
    reqs.push(`Gain ${qty} ${r.item}`)
  }

  for (const a of order.actions) {
    if (a.type === 'chad_infusion') reqs.push(`TI ${a.quantity}+`)
    else reqs.push(`${a.quantity}+ Potions`)
  }

  const prereqs = [
    order.minOrders > 0 ? `${order.minOrders}+ orders` : '',
    ...order.requiredOrderIds.map(id => `Order ${id}`),
  ].filter(Boolean).join(', ')

  return { reqs, prereqs }
}

function setResource(stats: PlayerStats, item: string, value: string): PlayerStats {
  return { ...stats, resources: { ...stats.resources, [item]: value } }
}

export default function StatsPanel({ stats, onChange, onApplyInference }: StatsPanelProps) {
  const [result, setResult] = useState<InferenceResult | null>(null)
  const [checkedIds, setCheckedIds] = useState<Set<number>>(new Set())
  const [flaggedOrders, setFlaggedOrders] = useState<Map<number, RiskyResource[]>>(new Map())
  const [importError, setImportError] = useState<string | null>(null)
  const [collapsedGroups, setCollapsedGroups] = useState<Set<string>>(new Set())
  const fileInputRef = useRef<HTMLInputElement>(null)

  function toggleGroup(label: string) {
    setCollapsedGroups(prev => {
      const next = new Set(prev)
      if (next.has(label)) next.delete(label); else next.add(label)
      return next
    })
  }

  const targetCount = parseInt(stats.totalOrdersCompleted ?? '', 10)
  const hasResources = Object.values(stats.resources).some(v => v?.trim())
  const hasTiLevel = !!stats.tiLevel?.trim()
  const canCalculate =
    !isNaN(targetCount) && targetCount > 0 && hasTiLevel && hasResources

  function handleCalculate() {
    if (!canCalculate) return
    const r = inferCompletedOrders(targetCount, stats)

    const flagged = new Map<number, RiskyResource[]>()
    for (const id of r.inferred) {
      const order = orderById.get(id)
      if (!order) continue
      const risky = getRiskyResources(order, stats)
      if (risky.length > 0) flagged.set(id, risky)
    }

    setResult(r)
    setFlaggedOrders(flagged)
    // Pre-uncheck flagged orders — they need explicit confirmation
    setCheckedIds(new Set(r.inferred.filter(id => !flagged.has(id))))
  }

  function toggleChecked(id: number) {
    setCheckedIds(prev => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id); else next.add(id)
      return next
    })
  }

  function handleApply() {
    if (!result) return
    onApplyInference([...checkedIds].sort((a, b) => a - b))
    setResult(null)
    setCheckedIds(new Set())
    setFlaggedOrders(new Map())
  }

  function dismissResult() {
    setResult(null)
    setCheckedIds(new Set())
    setFlaggedOrders(new Map())
  }

  function handleExport() {
    const json = JSON.stringify(stats, null, 2)
    const blob = new Blob([json], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'ledger-stats.json'
    a.click()
    URL.revokeObjectURL(url)
  }

  function handleImportFile(e: React.ChangeEvent<HTMLInputElement>) {
    setImportError(null)
    const file = e.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = ev => {
      try {
        const data = JSON.parse(ev.target?.result as string)
        if (typeof data !== 'object' || data === null) throw new Error()
        onChange({
          tiLevel: typeof data.tiLevel === 'string' ? data.tiLevel : '',
          potionsCrafted: typeof data.potionsCrafted === 'string' ? data.potionsCrafted : '',
          resources: typeof data.resources === 'object' && data.resources !== null ? data.resources : {},
          totalOrdersCompleted: typeof data.totalOrdersCompleted === 'string' ? data.totalOrdersCompleted : '',
        })
      } catch {
        setImportError('Invalid file — make sure it is a stats JSON exported from this tool.')
      }
    }
    reader.readAsText(file)
    e.target.value = ''
  }

  return (
    <div className="bg-black/88 backdrop-blur-md border-b border-cyan-600/25 px-4 py-4">
      <div className="max-w-2xl mx-auto space-y-4">
        <div className="border-l-[2px] border-l-cyan-600/50 border border-l-0 border-cyan-800/30 bg-cyan-500/[0.04] px-3 py-2.5 space-y-1">
          <p className="text-xs font-semibold text-slate-200">Where to find your stats in-game</p>
          <p className="text-xs text-slate-400">
            <span className="text-slate-200">Stats</span>
            <span className="text-slate-500"> → </span>
            <span className="text-slate-200">Resource &amp; Trading</span>
            <span className="text-slate-500"> → </span>
            <span className="text-slate-400">scroll to the bottom of each resource to see <span className="text-slate-200">Resource Gained All Time</span></span>
          </p>
        </div>
        <p className="text-xs text-slate-400">
          Enter your stats to unlock ✓/✗ indicators on each requirement, and use{' '}
          <span className="text-slate-200">Calculate Completions</span> to auto-fill your order history.
          Numbers accept shorthand: <span className="text-slate-200">1.5b · 500m · 1e22 · 1q</span>
        </p>

        {/* ── Inference section ── */}
        <div className="border-l-[2px] border-l-cyan-600/35 border border-l-0 border-cyan-800/12 bg-cyan-500/[0.025] px-3 py-3 space-y-3">
          <p className="font-orbitron text-[9px] font-semibold text-cyan-400/80 uppercase tracking-[0.2em]">
            Calculate Completions
          </p>
          <p className="text-xs text-slate-400">
            This will automatically calculate what orders you may have realistically completed, given the stats you have provided below. Some orders may be flagged for your manual approval in an effort to prevent incomplete orders from being automatically completed.
          </p>
          <ul className="text-xs space-y-0.5">
            <li className={hasTiLevel ? 'text-emerald-400' : 'text-amber-500/70'}>
              {hasTiLevel ? '✓' : '✗'} Infusions Done (TIs) — required
            </li>
            <li className={hasResources ? 'text-emerald-400' : 'text-amber-500/70'}>
              {hasResources ? '✓' : '✗'} At least one resource amount — required
            </li>
            <li className={(!isNaN(targetCount) && targetCount > 0) ? 'text-emerald-400' : 'text-amber-500/70'}>
              {(!isNaN(targetCount) && targetCount > 0) ? '✓' : '✗'} Total orders completed — required
            </li>
          </ul>

          <div className="flex gap-2 items-end">
            <div className="flex-1">
              <label className="block text-xs text-slate-300 mb-0.5">
                Total orders completed in-game
              </label>
              <input
                type="text"
                inputMode="numeric"
                value={stats.totalOrdersCompleted ?? ''}
                onChange={e => {
                  onChange({ ...stats, totalOrdersCompleted: e.target.value })
                  setResult(null)
                  setCheckedIds(new Set())
                }}
                placeholder="e.g. 50"
                className={INPUT_CLASSES}
              />
            </div>
            <button
              onClick={handleCalculate}
              disabled={!canCalculate}
              className="flex-shrink-0 font-orbitron text-[9px] tracking-[0.06em] px-3 py-1.5 rounded-sm border border-cyan-600/35 bg-cyan-600/10 text-cyan-300 hover:bg-cyan-600/20 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
            >
              Calculate
            </button>
          </div>

          {result && (
            <div className="border border-slate-700/40 bg-black/60 px-3 py-2 space-y-2">
              <p className="text-xs text-slate-200">
                <span className="text-emerald-400 font-semibold">{result.inferred.length}</span>
                {' / '}
                <span className="font-semibold">{targetCount}</span>
                {' orders inferred — uncheck any you haven\'t completed'}
              </p>

              {flaggedOrders.size > 0 && (
                <div className="border border-amber-600/40 bg-amber-950/40 px-2.5 py-2 space-y-1">
                  <p className="font-orbitron text-[9px] text-amber-300 tracking-[0.08em] uppercase">
                    {flaggedOrders.size} order{flaggedOrders.size > 1 ? 's' : ''} flagged for review
                  </p>
                  <p className="text-xs text-slate-400">
                    Resource requirements are ≥80% of your all-time earnings. These have been left
                    unchecked — only confirm them if you&apos;re certain they&apos;re done.
                  </p>
                </div>
              )}

              {result.unresolved > 0 && (
                <div className="space-y-1">
                  <p className="text-xs text-amber-400/80">
                    {result.unresolved} order{result.unresolved > 1 ? 's' : ''} could not be inferred.
                  </p>
                  {result.missingStats.length > 0 && (
                    <p className="text-xs text-slate-400">
                      Enter your{' '}
                      <span className="text-amber-300">
                        {result.missingStats.slice(0, 3).join(', ')}
                        {result.missingStats.length > 3 ? ` + ${result.missingStats.length - 3} more` : ''}
                      </span>
                      {' '}amounts below to resolve more.
                    </p>
                  )}
                </div>
              )}

              {result.inferred.length > 0 && (
                <>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-slate-400">
                      {checkedIds.size} of {result.inferred.length} selected
                    </span>
                    <div className="flex gap-2">
                      <button
                        onClick={() => setCheckedIds(new Set(result.inferred))}
                        className="text-xs text-slate-400 hover:text-slate-100 transition-colors"
                      >
                        All
                      </button>
                      <span className="text-slate-600">·</span>
                      <button
                        onClick={() => setCheckedIds(new Set())}
                        className="text-xs text-slate-400 hover:text-slate-100 transition-colors"
                      >
                        None
                      </button>
                    </div>
                  </div>

                  <div className="max-h-56 overflow-y-auto space-y-px pr-1">
                    {[...result.inferred].sort((a, b) => {
                      const aFlagged = flaggedOrders.has(a) ? 0 : 1
                      const bFlagged = flaggedOrders.has(b) ? 0 : 1
                      return aFlagged !== bFlagged ? aFlagged - bFlagged : a - b
                    }).map(id => {
                      const order = orderById.get(id)
                      const { reqs, prereqs } = order ? orderSummary(order) : { reqs: [], prereqs: '' }
                      const risky = flaggedOrders.get(id)
                      return (
                        <label
                          key={id}
                          className={`flex items-start gap-2 text-xs cursor-pointer py-1 select-none group px-1 transition-colors ${
                            risky
                              ? 'border-l-2 border-amber-500/50 pl-2 hover:bg-amber-500/[0.06]'
                              : 'rounded-sm hover:bg-white/[0.03]'
                          }`}
                        >
                          <input
                            type="checkbox"
                            checked={checkedIds.has(id)}
                            onChange={() => toggleChecked(id)}
                            className="mt-0.5 flex-shrink-0 accent-emerald-500"
                          />
                          <div className="min-w-0">
                            <span className={`font-medium font-spacemono ${checkedIds.has(id) ? 'text-slate-100' : 'text-slate-400'}`}>
                              Order {id}
                            </span>
                            {risky && (
                              <div className="mt-0.5 space-y-0.5">
                                {risky.map(r => (
                                  <div key={r.item} className="text-[10px] font-spacemono text-amber-400/90">
                                    ⚠ {r.item}: need {r.reqDisplay}, you have {r.haveDisplay} ({r.pct}%)
                                  </div>
                                ))}
                              </div>
                            )}
                            {reqs.length > 0 && (
                              <div className="text-slate-500 leading-relaxed">
                                {reqs.join(' · ')}
                              </div>
                            )}
                            {prereqs && (
                              <div className="text-slate-600">
                                needs {prereqs}
                              </div>
                            )}
                          </div>
                        </label>
                      )
                    })}
                  </div>
                </>
              )}

              <div className="flex gap-2 pt-1">
                <button
                  onClick={handleApply}
                  disabled={checkedIds.size === 0}
                  className="text-xs px-3 py-1 rounded-sm border border-emerald-600/30 bg-emerald-600/10 text-emerald-300 hover:bg-emerald-600/20 disabled:opacity-40 disabled:cursor-not-allowed transition-colors font-spacemono"
                >
                  Apply {checkedIds.size} completions
                </button>
                <button
                  onClick={dismissResult}
                  className="text-xs px-3 py-1 rounded-sm border border-slate-700 bg-slate-900/50 text-slate-300 hover:text-white hover:border-slate-500 hover:bg-slate-800/60 transition-colors font-spacemono"
                >
                  Dismiss
                </button>
              </div>
            </div>
          )}
        </div>

        {/* ── Actions ── */}
        <div>
          <button
            onClick={() => toggleGroup('actions')}
            className="flex items-center justify-between w-full font-orbitron text-[9px] font-semibold text-slate-300 uppercase tracking-[0.2em] mb-2 border-l-2 border-cyan-600/45 pl-2 hover:text-slate-100 transition-colors cursor-pointer"
          >
            Actions
            <span className={`mr-0.5 text-slate-500 transition-transform duration-150 ${collapsedGroups.has('actions') ? '-rotate-90' : 'rotate-0'}`}>▾</span>
          </button>
          {!collapsedGroups.has('actions') && (
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="flex items-center gap-1 text-xs text-slate-300 mb-0.5">
                  {ACTION_ICONS.chad_infusion && (
                    <img src={ACTION_ICONS.chad_infusion} alt="" aria-hidden="true" className="w-3.5 h-3.5 object-contain flex-shrink-0" />
                  )}
                  Infusions Done (TIs)
                </label>
                <input
                  type="text"
                  inputMode="numeric"
                  value={stats.tiLevel}
                  onChange={e => onChange({ ...stats, tiLevel: e.target.value })}
                  placeholder="e.g. 47"
                  className={INPUT_CLASSES}
                />
              </div>
              <div>
                <label className="flex items-center gap-1 text-xs text-slate-300 mb-0.5">
                  {ACTION_ICONS.endurance_synthesizer_potion && (
                    <img src={ACTION_ICONS.endurance_synthesizer_potion} alt="" aria-hidden="true" className="w-3.5 h-3.5 object-contain flex-shrink-0" />
                  )}
                  Potions Crafted
                </label>
                <input
                  type="text"
                  inputMode="numeric"
                  value={stats.potionsCrafted}
                  onChange={e => onChange({ ...stats, potionsCrafted: e.target.value })}
                  placeholder="e.g. 21"
                  className={INPUT_CLASSES}
                />
              </div>
            </div>
          )}
        </div>

        {/* ── Ether ── */}
        <div>
          <button
            onClick={() => toggleGroup('ether')}
            className="flex items-center justify-between w-full font-orbitron text-[9px] font-semibold text-slate-300 uppercase tracking-[0.2em] mb-2 border-l-2 border-cyan-600/45 pl-2 hover:text-slate-100 transition-colors cursor-pointer"
          >
            Ether
            <span className={`mr-0.5 text-slate-500 transition-transform duration-150 ${collapsedGroups.has('ether') ? '-rotate-90' : 'rotate-0'}`}>▾</span>
          </button>
          {!collapsedGroups.has('ether') && (
            <div>
              <label className="flex items-center gap-1 text-xs text-slate-300 mb-0.5">
                {RESOURCE_ICONS['Ether'] && (
                  <img src={RESOURCE_ICONS['Ether']} alt="" aria-hidden="true" className="w-3.5 h-3.5 object-contain flex-shrink-0" />
                )}
                Current Ether
              </label>
              <input
                type="text"
                inputMode="decimal"
                value={stats.resources['Ether'] ?? ''}
                onChange={e => onChange(setResource(stats, 'Ether', e.target.value))}
                placeholder="current balance"
                className={INPUT_CLASSES}
              />
              <p className="text-[10px] text-slate-500 mt-1">
                Unlike other resources, enter what you currently have on hand — Ether is spent to complete orders, so this goes down over time, not up.
              </p>
            </div>
          )}
        </div>

        {/* ── Resources ── */}
        {RESOURCE_GROUPS.map(group => (
          <div key={group.label}>
            <button
              onClick={() => toggleGroup(group.label)}
              className="flex items-center justify-between w-full font-orbitron text-[9px] font-semibold text-slate-300 uppercase tracking-[0.2em] mb-2 border-l-2 border-cyan-600/45 pl-2 hover:text-slate-100 transition-colors cursor-pointer"
            >
              {group.label}
              <span className={`mr-0.5 text-slate-500 transition-transform duration-150 ${collapsedGroups.has(group.label) ? '-rotate-90' : 'rotate-0'}`}>▾</span>
            </button>
            {!collapsedGroups.has(group.label) && (
              <div className="grid grid-cols-2 gap-2">
                {group.items.map(item => (
                  <div key={item}>
                    <label className="flex items-center gap-1 text-xs text-slate-300 mb-0.5">
                      {RESOURCE_ICONS[item] && (
                        <img src={RESOURCE_ICONS[item]} alt="" aria-hidden="true" className="w-3.5 h-3.5 object-contain flex-shrink-0" />
                      )}
                      {item}
                    </label>
                    <input
                      type="text"
                      inputMode="decimal"
                      value={stats.resources[item] ?? ''}
                      onChange={e => onChange(setResource(stats, item, e.target.value))}
                      placeholder="all-time gained"
                      className={INPUT_CLASSES}
                    />
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}

        <div className="flex items-center gap-3 pt-1 flex-wrap">
          <button
            onClick={handleExport}
            className="text-xs px-3 py-1.5 rounded-sm border border-slate-700 bg-slate-900/50 text-slate-300 hover:text-white hover:border-slate-500 hover:bg-slate-800/60 transition-colors font-spacemono"
          >
            Export JSON
          </button>
          <button
            onClick={() => fileInputRef.current?.click()}
            className="text-xs px-3 py-1.5 rounded-sm border border-slate-700 bg-slate-900/50 text-slate-300 hover:text-white hover:border-slate-500 hover:bg-slate-800/60 transition-colors font-spacemono"
          >
            Import JSON
          </button>
          <input
            ref={fileInputRef}
            type="file"
            accept=".json,application/json"
            onChange={handleImportFile}
            className="hidden"
          />
          <button
            onClick={() => {
              onChange({ tiLevel: '', potionsCrafted: '', resources: {}, totalOrdersCompleted: '' })
              setResult(null)
              setCheckedIds(new Set())
              setImportError(null)
            }}
            className="text-xs text-slate-500 hover:text-red-400 transition-colors"
          >
            Clear stats
          </button>
        </div>
        {importError && (
          <p className="text-xs text-red-400">{importError}</p>
        )}
      </div>
    </div>
  )
}
