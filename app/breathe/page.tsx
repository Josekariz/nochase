'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowLeft, Heart } from 'lucide-react'
import Link from 'next/link'
import BreathingCircle from '../../components/BreathingCircle'
import Card from '../../components/ui/Card'
import Button from '../../components/ui/Button'

const supportiveMessages = [
  {
    title: "You're Doing Something Beautiful 💙",
    message: "Instead of chasing, you chose to pause. This is how healing happens - one breath at a time.",
    variant: "blue"
  },
  {
    title: "This Feeling Will Pass 🌸", 
    message: "The urge to reach out is temporary, but the strength you're building right now is permanent.",
    variant: "pink"
  },
  {
    title: "You Are Worthy of Secure Love 💜",
    message: "Love that requires chasing isn't the love you deserve. You're learning to love yourself first.",
    variant: "purple"
  },
  {
    title: "Your Growth is Beautiful ✨",
    message: "Each time you resist the urge to chase, you're rewiring your brain for healthier relationships.",
    variant: "mint"
  }
]

export default function BreathePage() {
  const [currentMessage, setCurrentMessage] = useState(0)

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 px-4 py-8">
      {/* Header */}
      <div className="max-w-4xl mx-auto mb-8">
        <Link href="/">
          <Button variant="ghost" className="mb-4">
            <ArrowLeft size={20} />
            Back Home
          </Button>
        </Link>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <h1 className="text-4xl font-bold gradient-text mb-4">
            Take a Moment to Breathe
          </h1>
          <p className="text-xl text-gray-600">
            You felt the urge, but you came here instead. That's already a victory. 💝
          </p>
        </motion.div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Breathing Exercise */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="order-2 lg:order-1"
          >
            <BreathingCircle className="w-full" />
          </motion.div>

          {/* Supportive Messages */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
            className="order-1 lg:order-2"
          >
            <Card variant={supportiveMessages[currentMessage].variant as any} className="mb-6">
              <div className="text-center">
                <h3 className="text-2xl font-bold mb-4">
                  {supportiveMessages[currentMessage].title}
                </h3>
                <p className="text-lg text-gray-700 leading-relaxed">
                  {supportiveMessages[currentMessage].message}
                </p>
              </div>
            </Card>

            {/* Message Navigation */}
            <div className="flex justify-center gap-2 mb-6">
              {supportiveMessages.map((_, index) => (
                <button
                  key={index}
                  className={`w-3 h-3 rounded-full transition-all ${
                    currentMessage === index ? 'bg-purple-500' : 'bg-purple-200'
                  }`}
                  onClick={() => setCurrentMessage(index)}
                />
              ))}
            </div>

            <div className="text-center">
              <Button
                variant="secondary"
                onClick={() => setCurrentMessage((prev) => (prev + 1) % supportiveMessages.length)}
                className="mb-4"
              >
                <Heart size={20} />
                Another Reminder
              </Button>
            </div>
          </motion.div>
        </div>

        {/* Additional Support */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="mt-16 text-center"
        >
          <Card variant="default" className="max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold mb-4">Ready for More Support?</h3>
            <p className="text-gray-600 mb-6">
              Create an account to set personal goals, track your progress, and join our healing community.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/auth">
                <Button variant="primary">Create Account</Button>
              </Link>
              <Link href="/resources">
                <Button variant="outline">Browse Resources</Button>
              </Link>
            </div>
          </Card>
        </motion.div>
      </div>

      {/* Floating Animations */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          className="fixed pointer-events-none"
          style={{
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -20, 0],
            opacity: [0.3, 0.7, 0.3],
          }}
          transition={{
            duration: 3 + Math.random() * 2,
            repeat: Infinity,
            delay: Math.random() * 2,
          }}
        >
          <Heart 
            size={16 + Math.random() * 8} 
            className="text-purple-300" 
            fill="currentColor" 
          />
        </motion.div>
      ))}
    </div>
  )
}