import { Inter } from 'next/font/google'
import '../styles/globals.css'
import Navbar from '@/components/Navbar'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'HackAura - Waste Exchange Platform',
  description: 'Connect waste generators with recyclers',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Navbar />
        {children}
      </body>
    </html>
  )
}