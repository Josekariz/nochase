'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { ArrowLeft, Calendar, Target, Heart } from 'lucide-react'
import { getUserGoals, updateGoal } from '../../../lib/goals'
import { type Goal } from '../../../types/database'
import Card from '../../../components/ui/Card'
import Button from '../../../components/ui/Button'
import WaterProgress from '../../../components/ui/WaterProgress'
import Navbar from '../../../components/Navbar'
import BuyMeCoffee from '../../../components/ui/BuyMeCoffee'
import Link from 'next/link'

export default function GoalDetailsPage() {
  const params = useParams()
  const router = useRouter()
  const [goal, setGoal] = useState<Goal | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchGoalDetails = async () => {
      try {
        const { data } = await getUserGoals()
        if (data) {
          const foundGoal = data.find(g => g.id === params.id)
          setGoal(foundGoal || null)
        }
      } catch (error) {
        console.error('Error fetching goal details:', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchGoalDetails()
  }, [params.id])

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

  const getTimeRemaining = (goal: Goal) => {
    if (goal.completed) return 'Completed! 🎉'
    
    const now = new Date()
    const start = new Date(goal.start_date)
    const targetEnd = new Date(start.getTime() + goal.target_days * 24 * 60 * 60 * 1000)
    
    if (now >= targetEnd) return 'Goal Complete! 🏆'
    
    const remaining = targetEnd.getTime() - now.getTime()
    const hours = Math.floor(remaining / (1000 * 60 * 60))
    const minutes = Math.floor((remaining % (1000 * 60 * 60)) / (1000 * 60))
    
    if (hours > 24) {
      const days = Math.floor(hours / 24)
      return `${days} day${days !== 1 ? 's' : ''} remaining`
    } else if (hours > 0) {
      return `${hours}h ${minutes}m remaining`
    } else {
      return `${minutes}m remaining`
    }
  }

  const handleCompleteGoal = async (goalId: string) => {
    try {
      const { data, error } = await updateGoal(goalId, { completed: true })
      if (error) throw error
      
      if (data) {
        setGoal({ ...goal!, completed: true })
      }
    } catch (error) {
      console.error('Error completing goal:', error)
    }
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

  if (!goal) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen pt-20 px-4">
          <div className="max-w-page mx-auto">
            <Card variant="default" className="text-center py-12">
              <h3 className="text-2xl font-bold mb-4">Goal Not Found</h3>
              <p className="text-gray-600 mb-6">
                We couldn't find the goal you're looking for.
              </p>
              <Link href="/goals">
                <Button variant="primary">
                  <ArrowLeft size={20} />
                  Back to Goals
                </Button>
              </Link>
            </Card>
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
          {/* Back Button */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="mb-6"
          >
            <Link href="/dashboard">
              <Button variant="outline" size="sm">
                <ArrowLeft size={16} />
                Back to Dashboard
              </Button>
            </Link>
          </motion.div>

          {/* Goal Detail Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <Card variant="default" className="mb-8">
              <div className="text-center mb-6">
                <h1 className="text-3xl font-bold gradient-text mb-2">
                  {goal.title}
                </h1>
                {goal.completed && (
                  <div className="inline-block bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                    Completed 🎉
                  </div>
                )}
              </div>

              <div className="mb-8">
                <WaterProgress 
                  progress={getProgressPercentage(goal)} 
                  height={180}
                  className="w-full"
                />
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xl font-bold mb-4">Goal Details</h3>
                  
                  {goal.motivation && (
                    <div className="mb-4">
                      <h4 className="text-sm font-medium text-gray-500 mb-1">Motivation</h4>
                      <p className="text-gray-800 p-4 bg-gray-50 rounded-lg italic">
                        "{goal.motivation}"
                      </p>
                    </div>
                  )}
                  
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div>
                      <h4 className="text-sm font-medium text-gray-500 mb-1">Start Date</h4>
                      <div className="flex items-center gap-2">
                        <Calendar size={16} className="text-blue-500" />
                        <p>{new Date(goal.start_date).toLocaleDateString()}</p>
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="text-sm font-medium text-gray-500 mb-1">Duration</h4>
                      <div className="flex items-center gap-2">
                        <Target size={16} className="text-purple-500" />
                        <p>{goal.target_days} day{goal.target_days !== 1 ? 's' : ''}</p>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-medium text-gray-500 mb-1">Status</h4>
                    <p className="text-lg font-medium text-blue-600">
                      {getTimeRemaining(goal)}
                    </p>
                  </div>
                </div>
                
                <div className="flex flex-col justify-center items-center">
                  {!goal.completed && getProgressPercentage(goal) >= 100 ? (
                    <div className="text-center">
                      <div className="mb-4">
                        <span className="block text-4xl mb-2">🏆</span>
                        <h3 className="text-xl font-bold mb-2">Congratulations!</h3>
                        <p className="text-gray-600 mb-4">
                          You've reached your goal. How does it feel?
                        </p>
                      </div>
                      
                      <Button
                        variant="primary"
                        size="lg"
                        onClick={() => handleCompleteGoal(goal.id)}
                        className="animate-gentle-bounce"
                      >
                        <Heart size={20} fill="currentColor" />
                        Mark Complete!
                      </Button>
                    </div>
                  ) : goal.completed ? (
                    <div className="text-center">
                      <div className="mb-4">
                        <span className="block text-6xl mb-4">🎉</span>
                        <h3 className="text-xl font-bold mb-2">Goal Completed!</h3>
                        <p className="text-gray-600">
                          You should be proud of yourself.
                        </p>
                      </div>
                    </div>
                  ) : (
                    <div className="text-center">
                      <div className="mb-4">
                        <span className="block text-4xl mb-2">💪</span>
                        <h3 className="text-xl font-bold mb-2">Keep Going!</h3>
                        <p className="text-gray-600 mb-4">
                          You're making progress toward your goal.
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </Card>
          </motion.div>

          {/* Tips Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card variant="purple" className="mb-8">
              <h3 className="text-xl font-bold mb-4">Tips for Success</h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <span className="text-purple-500 font-bold">•</span>
                  <p>Remember why you started this goal - your future self will thank you.</p>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-purple-500 font-bold">•</span>
                  <p>When tempted to break your goal, try the 5-minute breathing exercise.</p>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-purple-500 font-bold">•</span>
                  <p>Focus on the growth you're experiencing, not just the outcome.</p>
                </li>
              </ul>
            </Card>
          </motion.div>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link href="/goals">
              <Button variant="outline">
                View All Goals
              </Button>
            </Link>
            
            <Link href="/breathe">
              <Button variant="primary">
                5-Min Breathing Exercise
              </Button>
            </Link>
          </motion.div>
        </div>
      </div>
      
      <BuyMeCoffee />
    </>
  )
}