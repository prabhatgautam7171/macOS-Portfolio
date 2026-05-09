import type { Metadata } from 'next'
import './globals.css'
import { Analytics } from "@vercel/analytics/react"

export const metadata: Metadata = {
  title: "Prabhat's macOS Portfolio",
  description: 'Personal portfolio of Prabhat, showcasing web development projects and skills',
  icons: {
    icon: '/favicon.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>{children} <Analytics /></body>
    </html>
  )
}
