'use client'

import { useState, useEffect, Suspense } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { Lock, CheckCircle, ArrowLeft } from 'lucide-react'
import { createClient } from '../../../lib/supabase'
import Button from '../../../components/ui/Button'
import Card from '../../../components/ui/Card'
import Link from 'next/link'

// Separate component that uses searchParams
function AuthParamsHandler() {
  const router = useRouter()
  
  // This will be properly handled by Next.js since the component will only be 
  // rendered on the client side within a Suspense boundary
  const handleUpdatePassword = async (password: string) => {
    try {
      const supabase = createClient()
      return await supabase.auth.updateUser({ password })
    } catch (err) {
      console.error('Error updating password:', err)
      return { error: { message: 'Failed to update password' } }
    }
  }
  
  return { handleUpdatePassword }
}

export default function ResetPasswordPage() {
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')

    // Validate passwords match
    if (password !== confirmPassword) {
      setError('Passwords do not match')
      setIsLoading(false)
      return
    }

    try {
      // This component will be lazily loaded within the Suspense boundary
      const AuthParams = () => {
        const { handleUpdatePassword } = AuthParamsHandler()
        
        useEffect(() => {
          const updatePassword = async () => {
            const { error } = await handleUpdatePassword(password)
            
            if (error) {
              setError(error.message)
            } else {
              setSuccess(true)
              // Redirect to dashboard after 2 seconds
              setTimeout(() => {
                router.push('/dashboard')
              }, 2000)
            }
            setIsLoading(false)
          }
          
          updatePassword()
        }, [])
        
        return null
      }
      
      // Render the component that uses searchParams
      return (
        <Suspense fallback={null}>
          <AuthParams />
        </Suspense>
      )
    } catch (err) {
      setError('Something went wrong. Please try again.')
      setIsLoading(false)
    }
  }

  if (success) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 px-4 py-8">
        <div className="max-w-md mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center"
          >
            <Card variant="default" className="p-8">
              <CheckCircle size={64} className="mx-auto mb-4 text-green-500" />
              <h1 className="text-2xl font-bold mb-4">Password Updated!</h1>
              <p className="text-gray-600 mb-6">
                Your password has been successfully updated. You'll be redirected to the dashboard.
              </p>
            </Card>
          </motion.div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 px-4 py-8">
      <div className="max-w-md mx-auto">
        <div className="mb-8">
          <Link href="/auth">
            <Button variant="ghost" className="mb-6">
              <ArrowLeft size={20} />
              Back to Sign In
            </Button>
          </Link>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <h1 className="text-3xl font-bold gradient-text mb-2">
              Reset Your Password
            </h1>
            <p className="text-gray-600">
              Please enter your new password below
            </p>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
        >
          <Card variant="default">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* New Password Field */}
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                  New Password
                </label>
                <div className="relative">
                  <Lock size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-[var(--border-radius-button)] focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                    placeholder="••••••••"
                    required
                    minLength={6}
                  />
                </div>
              </div>

              {/* Confirm Password Field */}
              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-2">
                  Confirm Password
                </label>
                <div className="relative">
                  <Lock size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    id="confirmPassword"
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-[var(--border-radius-button)] focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                    placeholder="••••••••"
                    required
                    minLength={6}
                  />
                </div>
              </div>

              {/* Error Message */}
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-red-500 text-sm text-center bg-red-50 p-3 rounded-[var(--border-radius-button)]"
                >
                  {error}
                </motion.div>
              )}

              {/* Submit Button */}
              <Button
                type="submit"
                variant="primary"
                size="lg"
                isLoading={isLoading}
                className="w-full"
              >
                <Lock size={20} />
                Update Password
              </Button>
            </form>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}