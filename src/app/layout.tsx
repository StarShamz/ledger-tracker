import type { Metadata } from 'next'
import { Orbitron, Space_Mono, Geist, Geist_Mono } from 'next/font/google'
import './globals.css'

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

export const metadata: Metadata = {
  title: "Chad's Galactic Mining Empire — Order Registry",
  description: 'Track unlock requirements for all 118 orders in the Galactic Mining Empire',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <body className={`${orbitron.variable} ${spaceMono.variable} ${geistSans.variable} ${geistMono.variable} antialiased text-gray-100 min-h-dvh`}>
        {children}
      </body>
    </html>
  )
}
