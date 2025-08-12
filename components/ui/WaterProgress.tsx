'use client'

import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'

interface WaterProgressProps {
  progress: number // 0-100
  height?: number
  className?: string
  showRipples?: boolean
  showBubbles?: boolean
  animated?: boolean
}

export default function WaterProgress({ 
  progress, 
  height = 200, 
  className = '',
  showRipples = true,
  showBubbles = true,
  animated = true
}: WaterProgressProps) {
  // Clamp progress between 0-100
  const clampedProgress = Math.min(100, Math.max(0, progress))
  const [animatedProgress, setAnimatedProgress] = useState(0)

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimatedProgress(clampedProgress)
    }, animated ? 100 : 0)
    return () => clearTimeout(timer)
  }, [clampedProgress, animated])

  return (
    <div 
      className={`relative overflow-hidden rounded-2xl ${className}`}
      style={{ 
        height: `${height}px`,
        background: 'linear-gradient(180deg, rgba(219, 234, 254, 0.3) 0%, rgba(147, 197, 253, 0.5) 100%)',
        border: '2px solid rgba(147, 197, 253, 0.5)',
        boxShadow: 'inset 0 2px 10px rgba(59, 130, 246, 0.1), 0 8px 25px rgba(59, 130, 246, 0.15)'
      }}
    >
      {/* Water Fill - using the same approach that works in debug */}
      <motion.div
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          width: '100%',
          background: `linear-gradient(
            180deg,
            rgba(59, 130, 246, 0.6) 0%,
            rgba(37, 99, 235, 0.7) 30%,
            rgba(29, 78, 216, 0.8) 70%,
            rgba(30, 64, 175, 0.9) 100%
          )`,
          boxShadow: '0 -2px 15px rgba(59, 130, 246, 0.4)'
        }}
        initial={{ height: "0%" }}
        animate={{ height: `${animatedProgress}%` }}
        transition={{ 
          duration: animated ? 2.5 : 0, 
          ease: "easeOut"
        }}
      >
        {/* Surface Waves - only show when there's enough water */}
        {showRipples && animatedProgress > 5 && (
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '8px',
            overflow: 'hidden'
          }}>
            <motion.div
              style={{
                position: 'absolute',
                top: 0,
                width: '200%',
                height: '12px',
                background: `repeating-linear-gradient(
                  90deg,
                  rgba(255, 255, 255, 0.2) 0px,
                  transparent 10px,
                  rgba(255, 255, 255, 0.2) 20px
                )`
              }}
              animate={{ 
                x: ['-50%', '0%']
              }}
              transition={{ 
                duration: 3, 
                repeat: Infinity, 
                ease: 'linear' 
              }}
            />
          </div>
        )}

        {/* Simple floating bubbles */}
        {showBubbles && animatedProgress > 15 && (
          <>
            <motion.div
              style={{
                position: 'absolute',
                left: '20%',
                bottom: '10%',
                width: '6px',
                height: '6px',
                backgroundColor: 'rgba(255, 255, 255, 0.4)',
                borderRadius: '50%'
              }}
              animate={{ 
                y: [0, -height * 0.3],
                opacity: [0, 0.8, 0]
              }}
              transition={{ 
                duration: 3, 
                repeat: Infinity,
                delay: 0.5 
              }}
            />
            <motion.div
              style={{
                position: 'absolute',
                left: '70%',
                bottom: '20%',
                width: '4px',
                height: '4px',
                backgroundColor: 'rgba(255, 255, 255, 0.5)',
                borderRadius: '50%'
              }}
              animate={{ 
                y: [0, -height * 0.4],
                opacity: [0, 1, 0]
              }}
              transition={{ 
                duration: 4, 
                repeat: Infinity,
                delay: 1.5 
              }}
            />
          </>
        )}
      </motion.div>

      {/* Glass effects */}
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
        {/* Top highlight */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '30%',
          background: 'linear-gradient(180deg, rgba(255, 255, 255, 0.15) 0%, transparent 100%)',
          borderTopLeftRadius: '16px',
          borderTopRightRadius: '16px'
        }} />
        
        {/* Left highlight */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '15%',
          height: '100%',
          background: 'linear-gradient(90deg, rgba(255, 255, 255, 0.1) 0%, transparent 100%)'
        }} />
      </div>

      {/* Progress Text */}
      <div style={{
        position: 'absolute',
        inset: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 20
      }}>
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ 
            delay: animated ? 1.5 : 0, 
            type: 'spring'
          }}
          style={{
            color: 'white',
            fontWeight: 'bold',
            fontSize: '24px',
            textShadow: '2px 2px 4px rgba(0,0,0,0.5)',
            fontFamily: 'system-ui, -apple-system, sans-serif'
          }}
        >
          {Math.round(animatedProgress)}%
        </motion.div>
      </div>

      {/* Scale markers */}
      <div style={{
        position: 'absolute',
        right: '8px',
        top: '8px',
        bottom: '8px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between'
      }}>
        {[100, 75, 50, 25, 0].map((mark) => (
          <div key={mark} style={{
            display: 'flex',
            alignItems: 'center',
            fontSize: '11px',
            color: 'rgba(255, 255, 255, 0.7)',
            fontWeight: '500'
          }}>
            <div style={{
              width: '8px',
              height: '1px',
              backgroundColor: 'rgba(255, 255, 255, 0.4)',
              marginRight: '4px'
            }} />
            {mark}
          </div>
        ))}
      </div>
    </div>
  )
}
