import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Color Palette Library',
  description: 'Manage your color palette library with folders and images',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  )
}
