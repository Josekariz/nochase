'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus, Target, Clock, Heart, Trash2, Edit3 } from 'lucide-react'
import { createGoal, getUserGoals, updateGoal, deleteGoal } from '../../lib/goals'
import { type Goal } from '../../types/database'
import Card from '../../components/ui/Card'
import Button from '../../components/ui/Button'
import WaterProgress from '../../components/ui/WaterProgress'
import Navbar from '../../components/Navbar'
import BuyMeCoffee from '../../components/ui/BuyMeCoffee'

export default function GoalsPage() {
  const [goals, setGoals] = useState<Goal[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [showCreateForm, setShowCreateForm] = useState(false)
  const [editingGoal, setEditingGoal] = useState<Goal | null>(null)
  const [formData, setFormData] = useState({
    title: '',
    motivation: '',
    target_days: 3
  })

  useEffect(() => {
    loadGoals()
  }, [])

  const loadGoals = async () => {
    try {
      const { data } = await getUserGoals()
      if (data) setGoals(data)
    } catch (error) {
      console.error('Error loading goals:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleCreateGoal = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const { data, error } = await createGoal({
        title: formData.title,
        motivation: formData.motivation,
        target_days: formData.target_days,
        start_date: new Date().toISOString(),
        completed: false
      })

      if (error) throw error
      
      if (data) {
        setGoals([data, ...goals])
        setFormData({ title: '', motivation: '', target_days: 3 })
        setShowCreateForm(false)
      }
    } catch (error) {
      console.error('Error creating goal:', error)
    }
  }

  const handleCompleteGoal = async (goalId: string) => {
    try {
      const { data, error } = await updateGoal(goalId, { completed: true })
      if (error) throw error
      
      if (data) {
        setGoals(goals.map(goal => 
          goal.id === goalId ? { ...goal, completed: true } : goal
        ))
      }
    } catch (error) {
      console.error('Error completing goal:', error)
    }
  }

  const handleDeleteGoal = async (goalId: string) => {
    if (!confirm('Are you sure you want to delete this goal?')) return
    
    try {
      const { error } = await deleteGoal(goalId)
      if (error) throw error
      
      setGoals(goals.filter(goal => goal.id !== goalId))
    } catch (error) {
      console.error('Error deleting goal:', error)
    }
  }

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

  const activeGoals = goals.filter(goal => !goal.completed)
  const completedGoals = goals.filter(goal => goal.completed)

  return (
    <>
      <Navbar />
      <div className="min-h-screen pt-20 px-4 pb-20">
        <div className="max-w-page mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl font-bold gradient-text mb-4">
              Your No Chase Goals 🎯
            </h1>
            <p className="text-xl text-gray-600">
              Build healthier patterns, one goal at a time
            </p>
          </motion.div>

          {/* Create Goal Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mb-8 text-center"
          >
            <Button
              variant="primary"
              size="lg"
              onClick={() => setShowCreateForm(true)}
              className="animate-gentle-bounce"
            >
              <Plus size={24} />
              Create New Goal
            </Button>
          </motion.div>

          {/* Create Goal Form */}
          <AnimatePresence>
            {showCreateForm && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="mb-8"
              >
                <Card variant="blue">
                  <h3 className="text-2xl font-bold mb-6 text-center">Create Your Goal 💙</h3>
                  <form onSubmit={handleCreateGoal} className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        What do you want to avoid? *
                      </label>
                      <input
                        type="text"
                        value={formData.title}
                        onChange={(e) => setFormData({...formData, title: e.target.value})}
                        className="w-full px-4 py-3 border border-gray-200 rounded-[var(--border-radius-button)] focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                        placeholder="e.g., No texting my ex for 1 day"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Your motivation (optional)
                      </label>
                      <textarea
                        value={formData.motivation}
                        onChange={(e) => setFormData({...formData, motivation: e.target.value})}
                        className="w-full px-4 py-3 border border-gray-200 rounded-[var(--border-radius-button)] focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                        placeholder="e.g., I want to give them space to miss me and focus on loving myself"
                        rows={3}
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Duration (days)
                      </label>
                      <select
                        value={formData.target_days}
                        onChange={(e) => setFormData({...formData, target_days: parseInt(e.target.value)})}
                        className="w-full px-4 py-3 border border-gray-200 rounded-[var(--border-radius-button)] focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      >
                        <option value={1}>1 day</option>
                        <option value={3}>3 days</option>
                        <option value={7}>1 week</option>
                        <option value={14}>2 weeks</option>
                        <option value={30}>1 month</option>
                        <option value={90}>3 months</option>
                      </select>
                    </div>

                    <div className="flex gap-4 justify-center">
                      <Button type="submit" variant="primary">
                        <Target size={20} />
                        Create Goal
                      </Button>
                      <Button 
                        type="button" 
                        variant="outline"
                        onClick={() => {
                          setShowCreateForm(false)
                          setFormData({ title: '', motivation: '', target_days: 3 })
                        }}
                      >
                        Cancel
                      </Button>
                    </div>
                  </form>
                </Card>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Active Goals */}
          {activeGoals.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="mb-12"
            >
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                <Clock className="text-blue-500" />
                Active Goals ({activeGoals.length})
              </h2>
              <div className="grid lg:grid-cols-2 gap-6">
                {activeGoals.map((goal, index) => (
                  <motion.div
                    key={goal.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Card variant="default" className="relative overflow-hidden">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                          <h3 className="text-xl font-bold mb-2">{goal.title}</h3>
                          {goal.motivation && (
                            <p className="text-gray-600 text-sm mb-3 italic">
                              "{goal.motivation}"
                            </p>
                          )}
                          <p className="text-sm text-gray-500 mb-2">
                            Started {new Date(goal.start_date).toLocaleDateString()}
                          </p>
                          <p className="text-sm font-medium text-blue-600">
                            {getTimeRemaining(goal)}
                          </p>
                        </div>
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleDeleteGoal(goal.id)}
                            className="text-gray-400 hover:text-red-500 transition-colors p-2"
                          >
                            <Trash2 size={16} />
                          </button>
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
                        {!goal.completed && getProgressPercentage(goal) >= 100 && (
                          <Button
                            variant="primary"
                            onClick={() => handleCompleteGoal(goal.id)}
                            className="animate-gentle-bounce"
                          >
                            <Heart size={20} fill="currentColor" />
                            Mark Complete!
                          </Button>
                        )}
                      </div>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Completed Goals */}
          {completedGoals.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="mb-12"
            >
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                🏆 Completed Goals ({completedGoals.length})
              </h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {completedGoals.map((goal) => (
                  <Card key={goal.id} variant="mint" className="text-center">
                    <div className="text-4xl mb-3">🎉</div>
                    <h4 className="font-bold mb-2">{goal.title}</h4>
                    <p className="text-sm text-gray-600 mb-2">
                      {goal.target_days} day{goal.target_days !== 1 ? 's' : ''}
                    </p>
                    <p className="text-xs text-gray-500">
                      Completed {new Date(goal.updated_at).toLocaleDateString()}
                    </p>
                  </Card>
                ))}
              </div>
            </motion.div>
          )}

          {/* Empty State */}
          {goals.length === 0 && !isLoading && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center"
            >
              <Card variant="default" className="py-16">
                <Target size={64} className="mx-auto mb-6 text-gray-400" />
                <h3 className="text-2xl font-bold mb-4">Start Your Healing Journey</h3>
                <p className="text-gray-600 mb-6 max-w-md mx-auto">
                  Create your first "No Chase" goal and begin building healthier relationship patterns. 
                  Every small step matters! 💙
                </p>
                <Button
                  variant="primary"
                  size="lg"
                  onClick={() => setShowCreateForm(true)}
                >
                  <Plus size={24} />
                  Create Your First Goal
                </Button>
              </Card>
            </motion.div>
          )}
        </div>
      </div>
      
      <BuyMeCoffee />
    </>
  )
}