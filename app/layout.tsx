import React from "react"
import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { GeistPixelSquare } from 'geist/font/pixel'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const _geist = Geist({ subsets: ["latin"] });
const _geistMono = Geist_Mono({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: 'Zero to Agent | Global Build Week by v0 & Vercel',
  description: 'Ship real AI agents in one week. $6,000+ in prizes. Build with v0, deploy on Vercel. April 24 - May 3, 2026.',
  generator: 'v0.app',
  keywords: ['AI agents', 'v0', 'Vercel', 'hackathon', 'build week', 'competition', 'AI development'],
  openGraph: {
    title: 'Zero to Agent | Global Build Week',
    description: 'Ship real AI agents in one week. $6,000+ in prizes. Build with v0, deploy on Vercel. April 24 - May 3, 2026.',
    type: 'website',
    siteName: 'Zero to Agent',
    images: [
      {
        url: '/opengraph-image.png',
        width: 2400,
        height: 1256,
        alt: 'Zero to Agent - Global Build Week - Ship AI Agents with v0 & Vercel',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Zero to Agent | Global Build Week',
    description: 'Ship real AI agents in one week. $6,000+ in prizes. Build with v0, deploy on Vercel. April 24 - May 3, 2026.',
    images: ['/opengraph-image.png'],
    creator: '@v0',
  },
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`font-sans antialiased dark ${GeistPixelSquare.variable}`}>
        {children}
        <Analytics />
        <script id="luma-checkout" src="https://embed.lu.ma/checkout-button.js" async />
      </body>
    </html>
  )
}
