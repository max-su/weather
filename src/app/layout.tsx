import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Navbar from "./components/Navbar";


const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Pace Adjustment',
  description: 'Pace adjustment recommendations for runners',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Navbar />
        {children}
      </body>
    </html>
  )
}
