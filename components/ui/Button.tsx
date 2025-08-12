'use client'

import { motion, type HTMLMotionProps } from 'framer-motion'
import { type ReactNode } from 'react'

interface ButtonProps extends HTMLMotionProps<'button'> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  children: ReactNode
  isLoading?: boolean
}

export default function Button({
  variant = 'primary',
  size = 'md',
  children,
  isLoading = false,
  className = '',
  ...props
}: ButtonProps) {
  const baseClasses = 'font-medium rounded-[var(--border-radius-button)] transition-all duration-200 flex items-center justify-center gap-2'
  
  const variantClasses = {
    primary: 'bg-[var(--color-brand-primary)] text-white hover:opacity-90 shadow-lg hover:shadow-xl',
    secondary: 'bg-[var(--color-brand-soft)] text-white hover:opacity-90',
    outline: 'border-2 border-[var(--color-brand-primary)] text-[var(--color-brand-primary)] hover:bg-[var(--color-brand-primary)] hover:text-white',
    ghost: 'text-[var(--color-brand-primary)] hover:bg-[var(--color-card-blue)]'
  }
  
  const sizeClasses = {
    sm: 'px-3 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg'
  }

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
      disabled={isLoading}
      {...props}
    >
      {isLoading && (
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
          className="w-4 h-4 border-2 border-current border-t-transparent rounded-full"
        />
      )}
      {children}
    </motion.button>
  )
}