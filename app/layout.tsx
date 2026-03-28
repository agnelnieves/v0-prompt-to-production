import React from "react"
import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { GeistPixelSquare } from 'geist/font/pixel'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const _geist = Geist({ subsets: ["latin"] });
const _geistMono = Geist_Mono({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: 'v0 IRL Miami - Zero to Agent',
  description: 'Zero to Agent is a global build week where we ship real AI agents with v0 and Vercel. Join us on April 18, 2026 at THE LAB Miami.',
  generator: 'v0.app',
  openGraph: {
    title: 'v0 IRL Miami - Zero to Agent',
    description: 'Zero to Agent is a global build week where we ship real AI agents with v0 and Vercel. Join us on April 18, 2026 at THE LAB Miami.',
    type: 'website',
    images: [
      {
        url: '/opengraph-image.png',
        width: 2400,
        height: 1256,
        alt: 'Zero to Agent - Global Build Week - Miami/FL',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'v0 IRL Miami - Zero to Agent',
    description: 'Zero to Agent is a global build week where we ship real AI agents with v0 and Vercel. Join us on April 18, 2026 at THE LAB Miami.',
    images: ['/opengraph-image.png'],
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
