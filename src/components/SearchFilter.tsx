'use client'

import { useRef, useEffect, useState } from 'react'
import { NPC_IMAGES } from '@/data/npcs'
import type { CharacterFilter, ResourceFilter, RewardFilter, StatusFilter } from '@/types'

interface SearchFilterProps {
  searchQuery: string
  onSearchChange: (v: string) => void
  statusFilter: StatusFilter
  onStatusChange: (v: StatusFilter) => void
  resourceFilter: ResourceFilter
  onResourceChange: (v: ResourceFilter) => void
  rewardFilter: RewardFilter
  onRewardChange: (v: RewardFilter) => void
  characterFilter: CharacterFilter
  onCharacterChange: (v: CharacterFilter) => void
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
  { value: 'ether', label: 'Ether' },
  { value: 'jade', label: 'Jade' },
  { value: 'vespium', label: 'Vespium' },
  { value: 'silicate', label: 'Silicate' },
  { value: 'industrial', label: 'Ind. Bits' },
  { value: 'hydracite', label: 'Hydracite' },
  { value: 'scorchium', label: 'Scorchium' },
  { value: 'ardranite', label: 'Ardranite' },
  { value: 'azvelite', label: 'Azvelite' },
  { value: 'gel', label: 'Gel' },
  { value: 'rocks', label: 'Rocks' },
  { value: 'actions', label: 'Actions' },
]

const REWARD_CHIPS: { value: RewardFilter; label: string }[] = [
  { value: 'all', label: 'All' },
  { value: 'ether', label: 'Ether' },
  { value: 'credits', label: 'Credits' },
  { value: 'exp', label: 'EXP' },
  { value: 'core', label: 'Core' },
  { value: 'crafting_speed', label: 'Crafting Speed' },
  { value: 'vespium', label: 'Vespium' },
  { value: 'jade', label: 'Jade' },
  { value: 'worthless_rock', label: 'Worthless Rock' },
  { value: 'ardranite', label: 'Ardranite' },
  { value: 'azvelite', label: 'Azvelite' },
  { value: 'tokenium', label: 'Tokenium' },
  { value: 'craftable_sell_price', label: 'Sell Price' },
  { value: 'rig', label: 'Rig' },
  { value: 'crafter', label: 'Crafter' },
  { value: 'max_stamina', label: 'Max Stamina' },
  { value: 'attribute_points', label: 'Attr. Points' },
]

const CHARACTER_NAMES = [
  'Bertha',
  'Bhramari',
  'Caylris En Divalone',
  'Clank',
  'Donathan Creel',
  'Eidelaine Eeko',
  'Gama Kamalon',
  'Gerbo',
  'Meepa Torani',
  'Minalima Lin',
  'Nyra Voss',
  'Puri Puri',
  'Samos Sula',
  'Tank Timmerson',
  'The Ether Hoarder',
  'The Twins',
  'Wrecket',
]

const CHARACTER_CHIPS: { value: CharacterFilter; label: string; image?: string }[] = [
  { value: 'all', label: 'All' },
  ...CHARACTER_NAMES.map(name => ({ value: name, label: name, image: NPC_IMAGES[name] })),
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
  rewardFilter,
  onRewardChange,
  characterFilter,
  onCharacterChange,
  completedFlash = 0,
}: SearchFilterProps) {
  const hasActiveFilters = resourceFilter !== 'all' || rewardFilter !== 'all' || characterFilter !== 'all'

  function clearFilters() {
    onResourceChange('all')
    onRewardChange('all')
    onCharacterChange('all')
  }

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

        {/* Status tabs */}
        <div role="group" aria-label="Filter by status" className="flex gap-1">
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

        {/* Resource + Reward + Character dropdowns */}
        <div className="flex gap-1 items-center flex-wrap">
          {hasActiveFilters && (
            <button
              onClick={clearFilters}
              className={`font-orbitron text-[9px] tracking-[0.06em] px-3 min-h-[44px] rounded-sm border border-slate-700/40 bg-slate-900/40 text-slate-400 transition-all duration-150 cursor-pointer [touch-action:manipulation] whitespace-nowrap hover:text-rose-300 hover:border-rose-700/40 hover:bg-rose-500/[0.06] ${FOCUS_RING}`}
            >
              ✕ Clear filters
            </button>
          )}
          <div className="flex gap-1 justify-end flex-wrap ml-auto">
            <FilterDropdown
              label="Resource"
              ariaLabel="Filter by resource"
              chips={RESOURCE_CHIPS}
              value={resourceFilter}
              onChange={onResourceChange}
            />
            <FilterDropdown
              label="Reward"
              ariaLabel="Filter by reward"
              chips={REWARD_CHIPS}
              value={rewardFilter}
              onChange={onRewardChange}
            />
            <FilterDropdown
              label="Character"
              ariaLabel="Filter by character"
              chips={CHARACTER_CHIPS}
              value={characterFilter}
              onChange={onCharacterChange}
            />
          </div>
        </div>

      </div>
    </div>
  )
}

function FilterDropdown<T extends string>({
  label,
  ariaLabel,
  chips,
  value,
  onChange,
}: {
  label: string
  ariaLabel: string
  chips: { value: T; label: string; image?: string }[]
  value: T
  onChange: (v: T) => void
}) {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!open) return
    function handleOutsideClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    function handleEscape(e: KeyboardEvent) {
      if (e.key === 'Escape') setOpen(false)
    }
    document.addEventListener('mousedown', handleOutsideClick)
    document.addEventListener('keydown', handleEscape)
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick)
      document.removeEventListener('keydown', handleEscape)
    }
  }, [open])

  const active = chips.find(c => c.value === value)
  const buttonLabel = value === 'all' ? label : active?.label ?? label
  const isActive = value !== 'all'
  const hasImages = chips.some(c => c.image)

  return (
    <div ref={ref} className="relative flex-shrink-0">
      <button
        onClick={() => setOpen(v => !v)}
        aria-expanded={open}
        aria-haspopup="listbox"
        className={`h-full inline-flex items-center gap-1.5 font-orbitron text-[9px] tracking-[0.06em] px-3 min-h-[44px] rounded-sm border transition-all duration-150 cursor-pointer [touch-action:manipulation] whitespace-nowrap ${FOCUS_RING} ${
          isActive
            ? 'bg-cyan-500/10 border-cyan-600/40 text-cyan-300 shadow-[0_0_10px_rgba(0,200,255,0.10)]'
            : open
            ? 'bg-slate-800/60 border-slate-600/60 text-slate-200'
            : 'bg-slate-900/40 border-slate-700/40 text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
        }`}
      >
        {isActive && active?.image && (
          <img src={active.image} alt="" className="w-5 h-5 -ml-0.5 rounded-full object-cover ring-1 ring-cyan-500/40 flex-shrink-0" />
        )}
        {buttonLabel}
        <span className={`inline-block transition-transform duration-150 ${open ? 'rotate-180' : ''}`}>▾</span>
      </button>

      {open && (
        <div
          role="listbox"
          aria-label={ariaLabel}
          className="absolute right-0 top-full mt-1 z-50 bg-[#0a0b14] border border-slate-700/60 shadow-xl shadow-black/80 py-1 min-w-[160px] max-h-[60vh] overflow-y-auto"
        >
          {chips.map(chip => (
            <button
              key={chip.value}
              role="option"
              aria-selected={value === chip.value}
              onClick={() => { onChange(chip.value); setOpen(false) }}
              className={`w-full flex items-center gap-2 text-left font-orbitron text-[9px] tracking-[0.05em] py-2 transition-all duration-150 cursor-pointer [touch-action:manipulation] ${FOCUS_RING} ${
                value === chip.value
                  ? 'text-cyan-300 bg-cyan-500/[0.08] border-l-2 border-l-cyan-500/60 pl-[10px] pr-3'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-white/[0.04] border-l-2 border-l-transparent pl-[10px] pr-3'
              }`}
            >
              {hasImages && (
                chip.image
                  ? <img src={chip.image} alt="" className="w-6 h-6 rounded-full object-cover flex-shrink-0" />
                  : <span className="w-6 h-6 rounded-full bg-slate-800 border border-slate-700/60 flex-shrink-0" />
              )}
              <span className="truncate">{chip.label}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
