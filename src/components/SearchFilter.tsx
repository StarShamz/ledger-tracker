'use client'

import { useRef, useEffect, useState } from 'react'
import type { ResourceFilter, StatusFilter } from '@/types'

interface SearchFilterProps {
  searchQuery: string
  onSearchChange: (v: string) => void
  statusFilter: StatusFilter
  onStatusChange: (v: StatusFilter) => void
  resourceFilter: ResourceFilter
  onResourceChange: (v: ResourceFilter) => void
  completedFlash?: number
}

const STATUS_TABS: { value: StatusFilter; label: string }[] = [
  { value: 'recommended', label: 'Priority' },
  { value: 'in_progress', label: 'In Progress' },
  { value: 'all', label: 'All' },
  { value: 'locked', label: 'Locked' },
  { value: 'completed', label: 'Completed' },
]

const RESOURCE_CHIPS: { value: ResourceFilter; label: string }[] = [
  { value: 'all', label: 'All' },
  { value: 'jade', label: 'Jade' },
  { value: 'vespium', label: 'Vespium' },
  { value: 'silicate', label: 'Silicate' },
  { value: 'industrial', label: 'Ind. Bits' },
  { value: 'hydracite', label: 'Hydracite' },
  { value: 'scorchium', label: 'Scorchium' },
  { value: 'gel', label: 'Gel' },
  { value: 'rocks', label: 'Rocks' },
  { value: 'actions', label: 'Actions' },
]

const FOCUS_RING = 'focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-cyan-500/50 focus-visible:ring-offset-1 focus-visible:ring-offset-black'

function tabActiveClass(value: StatusFilter): string {
  if (value === 'recommended') return 'bg-cyan-500/10 border-cyan-600/40 text-cyan-300 shadow-[0_0_10px_rgba(0,200,255,0.10)]'
  if (value === 'in_progress') return 'bg-amber-500/10 border-amber-600/40 text-amber-300 shadow-[0_0_10px_rgba(245,158,11,0.12)]'
  if (value === 'available')   return 'bg-cyan-500/10 border-cyan-600/35 text-cyan-300 shadow-[0_0_10px_rgba(0,200,255,0.10)]'
  if (value === 'needs_resources') return 'bg-orange-500/10 border-orange-600/30 text-orange-300'
  if (value === 'locked')      return 'bg-slate-800/50 border-slate-700/40 text-slate-400'
  if (value === 'completed')   return 'bg-emerald-500/8 border-emerald-700/30 text-emerald-400'
  return 'bg-slate-700/60 border-slate-600/60 text-white'
}

export default function SearchFilter({
  searchQuery,
  onSearchChange,
  statusFilter,
  onStatusChange,
  resourceFilter,
  onResourceChange,
  completedFlash = 0,
}: SearchFilterProps) {
  const [resourceOpen, setResourceOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!resourceOpen) return
    function handleOutsideClick(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setResourceOpen(false)
      }
    }
    function handleEscape(e: KeyboardEvent) {
      if (e.key === 'Escape') setResourceOpen(false)
    }
    document.addEventListener('mousedown', handleOutsideClick)
    document.addEventListener('keydown', handleEscape)
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick)
      document.removeEventListener('keydown', handleEscape)
    }
  }, [resourceOpen])

  const activeResource = RESOURCE_CHIPS.find(c => c.value === resourceFilter)
  const resourceLabel = resourceFilter === 'all' ? 'Resource' : activeResource?.label ?? 'Resource'
  const resourceActive = resourceFilter !== 'all'

  return (
    <div className="bg-black/98 backdrop-blur-xl border-b border-cyan-600/25 px-4 py-3 space-y-2.5 sticky top-0 z-10">
      <div className="max-w-2xl mx-auto space-y-2.5">

        {/* Search */}
        <div className="relative">
          <input
            type="text"
            value={searchQuery}
            onChange={e => onSearchChange(e.target.value)}
            placeholder="Search orders, resources…"
            aria-label="Search orders"
            className="w-full bg-slate-900/70 border border-slate-700/70 rounded-sm px-3 py-2 text-sm text-slate-100 placeholder-slate-500 transition-all focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-cyan-500/50 focus-visible:border-cyan-600/60 font-spacemono"
          />
          {searchQuery && (
            <div className="absolute right-2.5 top-1/2 -translate-y-1/2 w-1 h-1 rounded-full bg-cyan-400 animate-pulse" />
          )}
        </div>

        {/* Status tabs + Resource dropdown */}
        <div className="flex gap-1 items-stretch">
          <div role="group" aria-label="Filter by status" className="flex gap-1 flex-1 min-w-0">
            {STATUS_TABS.map(tab => (
              <button
                key={tab.value}
                onClick={() => onStatusChange(tab.value === 'recommended' ? 'recommended' : tab.value)}
                aria-pressed={statusFilter === tab.value}
                className={`relative overflow-hidden flex-1 font-orbitron text-[9px] tracking-[0.06em] py-2 min-h-[44px] rounded-sm border transition-all duration-150 cursor-pointer [touch-action:manipulation] ${FOCUS_RING} ${
                  statusFilter === tab.value
                    ? tabActiveClass(tab.value)
                    : tab.value === 'recommended'
                    ? 'bg-cyan-500/[0.04] border-cyan-800/30 text-slate-400 hover:text-slate-200 hover:bg-cyan-500/[0.08]'
                    : tab.value === 'in_progress'
                    ? 'bg-amber-500/[0.04] border-amber-800/30 text-slate-400 hover:text-slate-200 hover:bg-amber-500/[0.08]'
                    : 'bg-slate-900/40 border-slate-700/40 text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
                }`}
              >
                {tab.value === 'completed' && completedFlash > 0 && (
                  <span key={completedFlash} className="completed-tab-flash absolute inset-0 rounded-sm pointer-events-none" />
                )}
                {tab.label}
              </button>
            ))}
          </div>

          {/* Resource dropdown */}
          <div ref={dropdownRef} className="relative flex-shrink-0">
            <button
              onClick={() => setResourceOpen(v => !v)}
              aria-expanded={resourceOpen}
              aria-haspopup="listbox"
              className={`h-full font-orbitron text-[9px] tracking-[0.06em] px-3 min-h-[44px] rounded-sm border transition-all duration-150 cursor-pointer [touch-action:manipulation] whitespace-nowrap ${FOCUS_RING} ${
                resourceActive
                  ? 'bg-cyan-500/10 border-cyan-600/40 text-cyan-300 shadow-[0_0_10px_rgba(0,200,255,0.10)]'
                  : resourceOpen
                  ? 'bg-slate-800/60 border-slate-600/60 text-slate-200'
                  : 'bg-slate-900/40 border-slate-700/40 text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
              }`}
            >
              {resourceLabel}
              <span className={`ml-1.5 inline-block transition-transform duration-150 ${resourceOpen ? 'rotate-180' : ''}`}>▾</span>
            </button>

            {resourceOpen && (
              <div
                role="listbox"
                aria-label="Filter by resource"
                className="absolute right-0 top-full mt-1 z-50 bg-[#0a0b14] border border-slate-700/60 shadow-xl shadow-black/80 py-1 min-w-[150px]"
              >
                {RESOURCE_CHIPS.map(chip => (
                  <button
                    key={chip.value}
                    role="option"
                    aria-selected={resourceFilter === chip.value}
                    onClick={() => { onResourceChange(chip.value); setResourceOpen(false) }}
                    className={`w-full text-left font-orbitron text-[9px] tracking-[0.05em] py-2.5 transition-all duration-150 cursor-pointer [touch-action:manipulation] ${FOCUS_RING} ${
                      resourceFilter === chip.value
                        ? 'text-cyan-300 bg-cyan-500/[0.08] border-l-2 border-l-cyan-500/60 pl-[10px] pr-3'
                        : 'text-slate-400 hover:text-slate-200 hover:bg-white/[0.04] border-l-2 border-l-transparent pl-[10px] pr-3'
                    }`}
                  >
                    {chip.label}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  )
}
