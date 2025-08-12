'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Heart, Menu, X, User as UserIcon, LogOut } from 'lucide-react'
import { getCurrentUser, signOut } from '../lib/auth'
import { type User } from '@supabase/supabase-js'
import Button from './ui/Button'

export default function Navbar() {
  const [user, setUser] = useState<User | null>(null)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    getCurrentUser().then((user) => {
      setUser(user)
      setIsLoading(false)
    })
  }, [])

  const handleSignOut = async () => {
    await signOut()
    setUser(null)
  }

  const publicLinks = [
    { href: '/', label: 'Home' },
    { href: '/resources', label: 'Resources' },
    { href: '/about', label: 'About' },
  ]

  const privateLinks = [
    { href: '/dashboard', label: 'Dashboard' },
    { href: '/goals', label: 'Goals' },
    { href: '/community', label: 'Community' },
    { href: '/support', label: 'Support' },
  ]

  const links = user ? privateLinks : publicLinks

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="glass fixed top-0 left-0 right-0 z-40 px-4 py-3"
    >
      <div className="max-w-[var(--max-width-page)] mx-auto flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 text-xl font-bold gradient-text">
          <motion.div
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity, delay: 1 }}
          >
            <Heart size={24} fill="currentColor" />
          </motion.div>
          No Chase
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-6">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-gray-700 hover:text-[var(--color-brand-primary)] transition-colors"
            >
              {link.label}
            </Link>
          ))}

          {!isLoading && (
            user ? (
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <UserIcon size={16} />
                  {user.email?.split("@")[0] ?? 'User'} {/* shows only before @ */}
                </div>
                <Button variant="outline" size="sm" onClick={handleSignOut}>
                  <LogOut size={16} />
                  Sign Out
                </Button>
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <Link href="/auth">
                  <Button variant="outline" size="sm">Sign In</Button>
                </Link>
              </div>
            )
          )}

        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden p-2"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          className="md:hidden bg-white/95 backdrop-blur-sm border-t border-white/20 mt-3 py-4"
        >
          <div className="flex flex-col gap-4 px-4">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-gray-700 hover:text-[var(--color-brand-primary)] transition-colors py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}

            {!isLoading && (
              user ? (
                <div className="flex flex-col gap-3 pt-3 border-t border-gray-200">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <UserIcon size={16} />
                    {user.email ?? 'User'}
                  </div>
                  <Button variant="outline" size="sm" onClick={handleSignOut}>
                    <LogOut size={16} />
                    Sign Out
                  </Button>
                </div>
              ) : (
                <div className="pt-3 border-t border-gray-200">
                  <Link href="/auth">
                    <Button variant="primary" size="sm" className="w-full">
                      Sign In
                    </Button>
                  </Link>
                </div>
              )
            )}
          </div>
        </motion.div>
      )}
    </motion.nav>
  )
}