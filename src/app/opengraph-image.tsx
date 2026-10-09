import { ImageResponse } from 'next/og'
import { orders } from '@/data/orders'

// Preview card shown when the site link is posted in Discord, Slack, X, etc.
export const alt = "StarShamz's Ledger Tracker — v1.2 orders are now live"
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: '0 96px',
          background: 'radial-gradient(circle at 80% 20%, #06303a 0%, #000000 60%)',
          color: '#e2e8f0',
          fontFamily: 'sans-serif',
        }}
      >
        <div style={{ fontSize: 30, letterSpacing: 8, textTransform: 'uppercase', color: '#64748b' }}>
          Chad&apos;s Galactic Mining Empire
        </div>
        <div
          style={{
            fontSize: 84,
            fontWeight: 700,
            letterSpacing: 4,
            color: '#a5f3fc',
            textShadow: '0 0 36px rgba(0, 212, 255, 0.55)',
            marginTop: 12,
          }}
        >
          StarShamz&apos;s Ledger Tracker
        </div>
        <div style={{ display: 'flex', alignItems: 'center', marginTop: 48 }}>
          <div
            style={{
              fontSize: 36,
              fontWeight: 700,
              color: '#000000',
              background: '#00d4ff',
              padding: '12px 28px',
              borderRadius: 6,
            }}
          >
            v1.2 orders are now live!
          </div>
          <div style={{ fontSize: 34, color: '#94a3b8', marginLeft: 32 }}>
            {`${orders.length} ledger orders tracked`}
          </div>
        </div>
      </div>
    ),
    size,
  )
}
