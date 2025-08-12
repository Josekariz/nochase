'use client'

import { motion } from 'framer-motion'
import { type ReactNode } from 'react'

interface CardProps {
  children: ReactNode
  className?: string
  variant?: 'default' | 'blue' | 'purple' | 'pink' | 'mint'
  hover?: boolean
}

export default function Card({ 
  children, 
  className = '', 
  variant = 'default',
  hover = true 
}: CardProps) {
  const variantClasses = {
    default: 'bg-white/80',
    blue: 'bg-[var(--color-card-blue)]/80',
    purple: 'bg-[var(--color-card-purple)]/80',
    pink: 'bg-[var(--color-card-pink)]/80',
    mint: 'bg-[var(--color-card-mint)]/80'
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      whileHover={hover ? { y: -5, scale: 1.02 } : {}}
      className={`
        ${variantClasses[variant]} 
        m-4
        max-w-[95%]
        backdrop-blur-sm 
        border border-white/20 
        rounded-[var(--border-radius-card)] 
        p-6 
        shadow-lg 
        hover:shadow-xl 
        transition-all 
        duration-300
        ${className}
      `}
    >
      {children}
    </motion.div>
  )
}