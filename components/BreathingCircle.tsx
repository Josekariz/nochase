'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Play, Pause } from 'lucide-react'
import Button from './ui/Button'

interface BreathingCircleProps {
  className?: string
}

export default function BreathingCircle({ className = '' }: BreathingCircleProps) {
  const [isActive, setIsActive] = useState(false)
  const [phase, setPhase] = useState<'inhale' | 'hold' | 'exhale' | 'rest'>('inhale')
  const [count, setCount] = useState(4)

  useEffect(() => {
    if (!isActive) return

    const phases = {
      inhale: { duration: 4000, next: 'hold', count: 4 },
      hold: { duration: 1000, next: 'exhale', count: 1 },
      exhale: { duration: 6000, next: 'rest', count: 6 },
      rest: { duration: 1000, next: 'inhale', count: 1 }
    }

    const currentPhase = phases[phase]
    setCount(currentPhase.count)

    const interval = setInterval(() => {
      setCount((prev) => {
        if (prev <= 1) {
          setPhase(currentPhase.next as any)
          return currentPhase.count
        }
        return prev - 1
      })
    }, currentPhase.duration / currentPhase.count)

    const timer = setTimeout(() => {
      setPhase(currentPhase.next as any)
    }, currentPhase.duration)

    return () => {
      clearTimeout(timer)
      clearInterval(interval)
    }
  }, [isActive, phase])

  const getInstructions = () => {
    switch (phase) {
      case 'inhale': return 'Breathe In'
      case 'hold': return 'Hold'
      case 'exhale': return 'Breathe Out'
      case 'rest': return 'Rest'
    }
  }

  const getCircleScale = () => {
    switch (phase) {
      case 'inhale': return 1.4
      case 'hold': return 1.4
      case 'exhale': return 0.8
      case 'rest': return 1
    }
  }

  return (
    <div className={`flex flex-col items-center gap-8 ${className}`}>
      {/* Breathing Circle */}
      <div className="relative">
        {/* Outer Glow */}
        <motion.div
          className="absolute inset-0 rounded-full"
          style={{
            background: `radial-gradient(circle, ${
              phase === 'inhale' ? 'rgba(99, 102, 241, 0.3)' :
              phase === 'exhale' ? 'rgba(245, 158, 11, 0.3)' :
              'rgba(167, 139, 250, 0.2)'
            } 0%, transparent 70%)`
          }}
          animate={{ scale: getCircleScale() }}
          transition={{ duration: phase === 'inhale' ? 4 : phase === 'exhale' ? 6 : 1, ease: 'easeInOut' }}
        />
        
        {/* Main Circle */}
        <motion.div
          className="w-64 h-64 rounded-full flex items-center justify-center relative"
          style={{
            background: `linear-gradient(135deg, ${
              phase === 'inhale' ? 'var(--color-brand-primary)' :
              phase === 'exhale' ? 'var(--color-brand-accent)' :
              'var(--color-brand-soft)'
            }, rgba(255, 255, 255, 0.1))`
          }}
          animate={{ scale: getCircleScale() }}
          transition={{ duration: phase === 'inhale' ? 4 : phase === 'exhale' ? 6 : 1, ease: 'easeInOut' }}
        >
          {/* Inner Pattern */}
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-white/40 rounded-full"
              style={{
                top: '50%',
                left: '50%',
                transformOrigin: '0 0',
                transform: `rotate(${i * 45}deg) translateX(80px) translateY(-4px)`
              }}
              animate={{ 
                scale: [1, 1.5, 1],
                opacity: [0.4, 0.8, 0.4]
              }}
              transition={{ 
                duration: 2, 
                repeat: Infinity, 
                delay: i * 0.1,
                ease: 'easeInOut'
              }}
            />
          ))}
          
          {/* Center Content */}
          <div className="text-center text-white">
            <motion.div
              key={phase}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-2xl font-bold mb-2"
            >
              {getInstructions()}
            </motion.div>
            <motion.div
              key={count}
              initial={{ scale: 1.5 }}
              animate={{ scale: 1 }}
              className="text-4xl font-bold"
            >
              {count}
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Controls */}
      <Button
        onClick={() => setIsActive(!isActive)}
        variant="primary"
        size="lg"
        className="min-w-32"
      >
        {isActive ? (
          <>
            <Pause size={20} />
            Pause
          </>
        ) : (
          <>
            <Play size={20} />
            Start
          </>
        )}
      </Button>

      {/* Instructions */}
      {!isActive && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center max-w-md text-gray-600"
        >
          <p className="mb-4">
            Find a comfortable position and breathe with the circle. This 4-7-8 breathing technique helps calm your nervous system.
          </p>
          <p className="text-sm text-gray-500">
            Inhale for 4 seconds, hold for 1 second, exhale for 6 seconds
          </p>
        </motion.div>
      )}
    </div>
  )
}