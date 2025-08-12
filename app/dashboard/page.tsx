'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Target, TrendingUp, Calendar, Award, Heart, Users, BookOpen } from 'lucide-react'
import { getUserGoals } from '../../lib/goals'
import { getCurrentUser } from '../../lib/auth'
import { type Goal } from '../../types/database'
import Card from '../../components/ui/Card'
import Button from '../../components/ui/Button'
import WaterProgress from '../../components/ui/WaterProgress'
import Navbar from '../../components/Navbar'
import BuyMeCoffee from '../../components/ui/BuyMeCoffee'
import Link from 'next/link'

export default function DashboardPage() {
  const [goals, setGoals] = useState<Goal[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [user, setUser] = useState<any>(null)

  useEffect(() => {
    loadUserData()
  }, [])

  const loadUserData = async () => {
    try {
      const [userData, goalsData] = await Promise.all([
        getCurrentUser(),
        getUserGoals()
      ])
      
      setUser(userData)
      if (goalsData.data) {
        setGoals(goalsData.data)
      }
    } catch (error) {
      console.error('Error loading user data:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const completedGoals = goals.filter(goal => goal.completed).length
  const activeGoals = goals.filter(goal => !goal.completed).length
  const totalGoals = goals.length

  const upcomingFeatures = [
    {
      icon: Users,
      title: 'Supportive Community',
      description: 'Connect with others in a safe space for shared experiences and discussions.',
      variant: 'blue',
    },
    {
      icon: BookOpen,
      title: 'Guided Journaling',
      description: 'Daily prompts to help you reflect, understand your patterns, and track your progress.',
      variant: 'purple',
    },
  ]

  const getProgressPercentage = (goal: Goal) => {
    const now = new Date()
    const start = new Date(goal.start_date)
    const targetEnd = new Date(start.getTime() + goal.target_days * 24 * 60 * 60 * 1000)
    
    if (goal.completed) return 100
    if (now >= targetEnd) return 100
    
    const totalDuration = targetEnd.getTime() - start.getTime()
    const elapsed = now.getTime() - start.getTime()
    
    return Math.max(0, Math.min(100, (elapsed / totalDuration) * 100))
  }

  if (isLoading) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen pt-20 px-4">
          <div className="max-w-page mx-auto flex items-center justify-center">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
              className="w-8 h-8 border-2 border-purple-500 border-t-transparent rounded-full"
            />
          </div>
        </div>
      </>
    )
  }

  return (
    <>
      <Navbar />
      <div className="min-h-screen pt-20 px-4 pb-20">
        <div className="max-w-page mx-auto">
          {/* Welcome Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl font-bold gradient-text mb-4">
              Welcome Back! 🌟
            </h1>
            <p className="text-xl text-gray-600">
              Here's your healing journey at a glance
            </p>
          </motion.div>

          {/* Stats Overview */}
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
            >
              <Card variant="blue" className="text-center">
                <Award size={48} className="mx-auto mb-4 text-blue-500 animate-gentle-bounce" />
                <h3 className="text-3xl font-bold text-blue-600 mb-2">{completedGoals}</h3>
                <p className="text-gray-600">Goals Completed</p>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 0 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Card variant="purple" className="text-center">
                <Target size={48} className="mx-auto mb-4 text-purple-500 animate-gentle-bounce" />
                <h3 className="text-3xl font-bold text-purple-600 mb-2">{activeGoals}</h3>
                <p className="text-gray-600">Active Goals</p>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              <Card variant="mint" className="text-center">
                <TrendingUp size={48} className="mx-auto mb-4 text-green-500 animate-gentle-bounce" />
                <h3 className="text-3xl font-bold text-green-600 mb-2">{totalGoals}</h3>
                <p className="text-gray-600">Total Goals</p>
              </Card>
            </motion.div>
          </div>

          {/* Active Goals */}
          {activeGoals > 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="mb-12"
            >
              <h2 className="text-2xl font-bold mb-6">Your Active Goals</h2>
              <div className="grid lg:grid-cols-2 gap-6">
                {goals.filter(goal => !goal.completed).map((goal, index) => (
                  <Card key={goal.id} variant="default" className="relative overflow-hidden">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-xl font-bold mb-2">{goal.title}</h3>
                        {goal.motivation && (
                          <p className="text-gray-600 text-sm mb-3">"{goal.motivation}"</p>
                        )}
                        <div className="flex items-center gap-2 text-sm text-gray-500">
                          <Calendar size={16} />
                          Started {new Date(goal.start_date).toLocaleDateString()}
                        </div>
                      </div>
                    </div>

                    <div className="mb-4">
                      <WaterProgress 
                        progress={getProgressPercentage(goal)} 
                        height={120}
                        className="w-full"
                      />
                    </div>

                    <div className="text-center">
                      <p className="text-sm text-gray-600 mb-2">
                        {goal.target_days} day{goal.target_days !== 1 ? 's' : ''} goal
                      </p>
                      <Link href={`/goals/${goal.id}`}>
                        <Button variant="outline" size="sm">
                          View Details
                        </Button>
                      </Link>
                    </div>
                  </Card>
                ))}
              </div>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="mb-12"
            >
              <Card variant="default" className="text-center py-12">
              <div className="text-6xl mb-6">🚧</div>
              <h2 className="text-3xl font-bold mb-4">Coming Soon!</h2>
              <p className="text-lg text-gray-600 mb-6 max-w-2xl mx-auto">
                We're building a safe, supportive community space where you can connect with others 
                on their anxious attachment healing journey. This will be a place for topic-based 
                discussions, shared experiences, and mutual support.
              </p>
              <div className="bg-purple-50 border-l-4 border-purple-500 p-4 rounded-lg max-w-md mx-auto mb-6">
                <p className="text-purple-700 text-sm">
                  <strong>Why the wait?</strong> We want to ensure our community guidelines 
                  and moderation tools are perfect for creating a truly healing-focused environment.
                </p>
              </div>
              <Button variant="primary">
                <Heart size={20} fill="currentColor" />
                Get Notified When Ready
              </Button>
            </Card>
          </motion.div>
          )}

          {/* Upcoming Features */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <h2 className="text-2xl font-bold text-center mb-8">What to Expect</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {upcomingFeatures.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 + index * 0.1 }}
                >
                  <Card variant={feature.variant as any} className="text-center h-full">
                    <feature.icon size={48} className="mx-auto mb-4 animate-gentle-bounce" />
                    <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                    <p className="text-gray-600">{feature.description}</p>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Interim Support */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="mt-12"
          >
            <Card variant="pink" className="text-center">
              <h3 className="text-2xl font-bold mb-4">Need Support Right Now?</h3>
              <p className="text-gray-600 mb-6">
                While we build our community, remember that you can always use our breathing exercises 
                and create supportive goals for yourself.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button variant="primary" onClick={() => window.location.href = '/breathe'}>
                  Breathing Exercise
                </Button>
                <Button variant="outline" onClick={() => window.location.href = '/goals'}>
                  Set a Goal
                </Button>
              </div>
            </Card>
          </motion.div>
        </div>
      </div>
      
      <BuyMeCoffee />
    </>
  )
}