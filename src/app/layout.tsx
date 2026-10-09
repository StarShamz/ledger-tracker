import type { Metadata, Viewport } from 'next'
import { Orbitron, Space_Mono, Geist, Geist_Mono } from 'next/font/google'
import './globals.css'
import UpdateBanner from '@/components/UpdateBanner'
import { orders } from '@/data/orders'

const orbitron = Orbitron({
  variable: '--font-orbitron',
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
})
const spaceMono = Space_Mono({
  variable: '--font-space-mono',
  subsets: ['latin'],
  weight: ['400', '700'],
  display: 'swap',
})
const geistSans = Geist({ variable: '--font-geist-sans', subsets: ['latin'] })
const geistMono = Geist_Mono({ variable: '--font-geist-mono', subsets: ['latin'] })

const title = "StarShamz's Ledger Tracker"
const description = `v1.2 orders are now live! Plan resource costs, prerequisite chains, and your completion progress across all ${orders.length} ledger orders in Chad's Galactic Mining Empire — saved automatically in your browser.`

// openGraph/twitter drive the link preview shown when the site is posted in Discord, Slack, etc.
export const metadata: Metadata = {
  metadataBase: new URL('https://ledger-hub-psi.vercel.app'),
  title,
  description,
  openGraph: {
    type: 'website',
    url: '/',
    siteName: "Chad's Galactic Mining Empire",
    title,
    description,
  },
  twitter: {
    card: 'summary_large_image',
    title,
    description,
  },
}

// Accent color for the embed's side bar (Discord) and mobile browser chrome.
export const viewport: Viewport = {
  themeColor: '#00d4ff',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <body className={`${orbitron.variable} ${spaceMono.variable} ${geistSans.variable} ${geistMono.variable} antialiased text-gray-100 min-h-dvh`}>
        <UpdateBanner />
        {children}
      </body>
    </html>
  )
}
