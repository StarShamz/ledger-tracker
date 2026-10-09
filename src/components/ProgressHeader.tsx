'use client'

import { useState } from 'react'
import Link from 'next/link'

interface ProgressHeaderProps {
  completedCount: number
  totalCount: number
  statsOpen: boolean
  onStatsToggle: () => void
  creditsOpen: boolean
  onCreditsToggle: () => void
  onReset: () => void
}

export default function ProgressHeader({
  completedCount,
  totalCount,
  statsOpen,
  onStatsToggle,
  creditsOpen,
  onCreditsToggle,
  onReset,
}: ProgressHeaderProps) {
  const [confirmReset, setConfirmReset] = useState(false)
  const pct = totalCount > 0 ? (completedCount / totalCount) * 100 : 0

  return (
    <header className="bg-black/95 backdrop-blur-xl border-b border-cyan-700/30 px-4 pt-5 pb-4">
      <div className="max-w-2xl mx-auto">
        {/* Top bar: title + buttons */}
        <div className="flex items-start justify-between gap-4 mb-3">
          <div>
            <p className="font-spacemono text-[9px] tracking-[0.2em] text-slate-400 uppercase mb-1.5">
              Chad&apos;s Galactic Mining Empire
            </p>
            <h1 className="font-orbitron text-3xl font-bold tracking-[0.12em] text-cyan-200 uppercase leading-snug [text-shadow:0_0_18px_rgba(0,212,255,0.45)]">
              StarShamz&apos;s Ledger Tracker
            </h1>
            <div className="flex items-center gap-2 mt-2">
              <div className="flex items-center gap-1.5 text-xs font-spacemono tabular-nums">
                <span className="text-emerald-400 font-bold">{completedCount}</span>
                <span className="text-slate-500">/</span>
                <span className="text-slate-400">{totalCount}</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 pt-1 flex-shrink-0">
            <Link
              href="/timeline"
              className="font-orbitron text-[10px] tracking-[0.08em] px-3 py-2 min-h-[44px] rounded-sm border border-slate-700/60 text-slate-400 hover:text-slate-200 hover:border-slate-500 transition-all duration-150 flex items-center cursor-pointer focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-cyan-500/50 focus-visible:ring-offset-1 focus-visible:ring-offset-black"
            >
              Timeline
            </Link>
            <Link
              href="/planner"
              className="font-orbitron text-[10px] tracking-[0.08em] px-3 py-2 min-h-[44px] rounded-sm border border-slate-700/60 text-slate-400 hover:text-slate-200 hover:border-slate-500 transition-all duration-150 flex items-center cursor-pointer focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-cyan-500/50 focus-visible:ring-offset-1 focus-visible:ring-offset-black"
            >
              Planner
            </Link>

            <button
              onClick={onStatsToggle}
              className={`font-orbitron text-[10px] tracking-[0.08em] px-3 py-2 min-h-[44px] rounded-sm border transition-all duration-150 cursor-pointer [touch-action:manipulation] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-cyan-500/50 focus-visible:ring-offset-1 focus-visible:ring-offset-black ${
                statsOpen
                  ? 'bg-cyan-500/10 border-cyan-600/35 text-cyan-300 shadow-[0_0_12px_rgba(0,200,255,0.12)]'
                  : 'border-slate-700/60 text-slate-400 hover:text-slate-200 hover:border-slate-500'
              }`}
            >
              Stats / Calc
            </button>

            <button
              onClick={onCreditsToggle}
              className={`font-orbitron text-[10px] tracking-[0.08em] px-3 py-2 min-h-[44px] rounded-sm border transition-all duration-150 cursor-pointer [touch-action:manipulation] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-fuchsia-500/50 focus-visible:ring-offset-1 focus-visible:ring-offset-black ${
                creditsOpen
                  ? 'bg-fuchsia-500/10 border-fuchsia-600/35 text-fuchsia-300 shadow-[0_0_12px_rgba(232,121,249,0.12)]'
                  : 'border-slate-700/60 text-slate-400 hover:text-slate-200 hover:border-slate-500'
              }`}
            >
              Credits
            </button>

            {!confirmReset ? (
              <button
                onClick={() => setConfirmReset(true)}
                className="font-orbitron text-[10px] tracking-[0.08em] text-slate-500 hover:text-red-400 transition-colors px-3 py-2 min-h-[44px] rounded-sm border border-slate-700/40 hover:border-red-900/50 cursor-pointer [touch-action:manipulation] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-red-700/50 focus-visible:ring-offset-1 focus-visible:ring-offset-black"
              >
                Wipe
              </button>
            ) : (
              <div className="flex items-center gap-2 text-xs">
                <span className="text-slate-500 font-spacemono text-[10px]">Reset all?</span>
                <button
                  onClick={() => { onReset(); setConfirmReset(false) }}
                  className="px-3 py-2 min-h-[44px] rounded-sm bg-red-950/50 text-red-300 border border-red-800/40 hover:bg-red-950/80 cursor-pointer [touch-action:manipulation] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-red-500/50 focus-visible:ring-offset-1 focus-visible:ring-offset-black font-spacemono text-[10px]"
                >
                  Yes
                </button>
                <button
                  onClick={() => setConfirmReset(false)}
                  className="px-3 py-2 min-h-[44px] rounded-sm bg-slate-900/40 text-slate-400 border border-slate-800 hover:bg-slate-900 cursor-pointer [touch-action:manipulation] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-slate-600/50 focus-visible:ring-offset-1 focus-visible:ring-offset-black font-spacemono text-[10px]"
                >
                  No
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Description + feedback link */}
        <p className="font-spacemono text-[11px] leading-relaxed text-slate-400 mb-3">
          Plan resource costs, prerequisite chains, and your completion progress across all {totalCount} orders — saved automatically in your browser.{' '}
          <a
            href="https://github.com/StarShamz/ledger-tracker/issues/new/choose"
            target="_blank"
            rel="noopener noreferrer"
            className="text-cyan-400 hover:text-cyan-200 underline underline-offset-2 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-cyan-400/50 rounded-sm"
          >
            Report a bug or request a feature
          </a>
        </p>

        {/* Energy bar */}
        <div
          role="progressbar"
          aria-label={`${completedCount} of ${totalCount} orders completed`}
          aria-valuenow={completedCount}
          aria-valuemin={0}
          aria-valuemax={totalCount}
          className="relative w-full h-1.5 bg-white/12"
        >
          {/* Track tick marks */}
          <div className="absolute inset-0 flex">
            {Array.from({ length: 9 }, (_, i) => (
              <div key={i} className="flex-1 border-r border-slate-800/40 last:border-0" />
            ))}
          </div>
          {/* Fill */}
          <div
            className="absolute inset-y-0 left-0 bg-gradient-to-r from-cyan-700 via-cyan-400 to-cyan-200 transition-all duration-700 ease-out"
            style={{
              width: `${pct}%`,
              boxShadow: pct > 1
                ? '0 0 8px rgba(0,212,255,0.85), 0 0 22px rgba(0,200,255,0.30)'
                : 'none',
            }}
          />
        </div>
        <div className="flex justify-between mt-1">
          <span className="text-[10px] text-slate-400 font-spacemono tabular-nums">{pct.toFixed(1)}% COMPLETE</span>
          <span className="text-[10px] text-slate-400 font-spacemono tabular-nums">{totalCount} ORDERS</span>
        </div>
        <button
          onClick={onStatsToggle}
          className="mt-2 text-[10px] font-spacemono text-slate-500 hover:text-cyan-400 transition-colors cursor-pointer text-left"
        >
          ✦ Enter your stats to auto-fill your completed orders
        </button>
      </div>
    </header>
  )
}
