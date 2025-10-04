'use client'
import Link from 'next/link'
import { useState } from 'react'
import { Menu, X, User, LogOut } from 'lucide-react'

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  const navLinks = [
    { href: '/dashboard', label: 'Dashboard' },
    { href: '/marketplace', label: 'Marketplace' },
    { href: '/add-waste', label: 'Add Waste' },
    { href: '/leaderboard', label: 'Leaderboard' },
    { href: '/profile', label: 'Profile' }
  ]

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 text-2xl font-bold text-green-600">
            ♻️ <span>HackAura</span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-gray-700 hover:text-green-600 font-medium transition-colors"
              >
                {link.label}
              </Link>
            ))}
            
            {/* User Menu */}
            <div className="flex items-center gap-2 ml-4">
              <button className="p-2 hover:bg-gray-100 rounded-full transition">
                <User className="w-5 h-5" />
              </button>
              <button className="p-2 hover:bg-gray-100 rounded-full transition text-red-600">
                <LogOut className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden py-4 border-t">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="block py-2 text-gray-700 hover:text-green-600 hover:bg-gray-50 px-4 rounded transition"
                onClick={() => setIsOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <div className="flex gap-2 px-4 mt-4 pt-4 border-t">
              <button className="flex-1 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition">
                Profile
              </button>
              <button className="flex-1 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition">
                Logout
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}