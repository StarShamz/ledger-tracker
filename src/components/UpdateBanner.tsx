'use client'

import { useEffect, useState } from 'react'

export default function UpdateBanner() {
  const [show, setShow] = useState(false)

  useEffect(() => {
    let knownId: string | null = null

    async function check() {
      try {
        const res = await fetch('/api/version', { cache: 'no-store' })
        if (!res.ok) return
        const { id } = await res.json()
        if (id === 'dev') return
        if (knownId === null) {
          knownId = id
        } else if (id !== knownId) {
          setShow(true)
        }
      } catch {}
    }

    check()
    const interval = setInterval(check, 2 * 60 * 1000)
    return () => clearInterval(interval)
  }, [])

  if (!show) return null

  return (
    <div className="fixed top-0 inset-x-0 z-50 flex items-center justify-between gap-4 bg-orange-500 px-4 py-2.5 shadow-lg">
      <p className="font-spacemono text-[11px] text-black leading-snug">
        <span className="font-bold">Update available.</span>{' '}
        Refresh to get the latest version — your saved data will not be lost.
      </p>
      <div className="flex items-center gap-2 flex-shrink-0">
        <button
          onClick={() => window.location.reload()}
          className="font-orbitron text-[10px] tracking-[0.08em] bg-black text-orange-400 px-3 py-1.5 rounded-sm hover:bg-orange-950 transition-colors cursor-pointer"
        >
          Refresh
        </button>
        <button
          onClick={() => setShow(false)}
          className="font-spacemono text-[13px] text-black/60 hover:text-black transition-colors cursor-pointer leading-none px-1"
          aria-label="Dismiss"
        >
          ✕
        </button>
      </div>
    </div>
  )
}
