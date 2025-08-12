'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { ArrowLeft, Mail, Lock, User, Heart, CheckCircle } from 'lucide-react'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import { signIn, signUp, resetPassword } from '../../lib/auth'
import Button from '../../components/ui/Button'
import Card from '../../components/ui/Card'

export default function AuthPage() {
  const [isSignUp, setIsSignUp] = useState(false)
  const [isForgotPassword, setIsForgotPassword] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [verificationSent, setVerificationSent] = useState(false)
  const [resetLinkSent, setResetLinkSent] = useState(false)
  const router = useRouter()
  const searchParams = useSearchParams()

  // Handle Supabase auth callback when component mounts
  useEffect(() => {
    const handleAuthCallback = async () => {
      // Check if this is a Supabase auth callback
      const accessToken = searchParams.get('access_token')
      const refreshToken = searchParams.get('refresh_token')
      const type = searchParams.get('type')
      
      if ((accessToken || refreshToken) && type) {
        // The URL parameters indicate this is a callback from Supabase auth
        // Supabase client will automatically handle the token exchange
        // Just redirect the user to the dashboard
        router.push('/dashboard')
      }
    }

    handleAuthCallback()
  }, [searchParams, router])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')

    try {
      if (isForgotPassword) {
        // Handle forgot password flow
        const { error } = await resetPassword(email)
        if (error) {
          setError(error.message)
        } else {
          setResetLinkSent(true)
        }
      } else {
        // Normal sign in/sign up flow
        const { error } = isSignUp 
          ? await signUp(email, password)
          : await signIn(email, password)

        if (error) {
          setError(error.message)
        } else if (isSignUp) {
          setVerificationSent(true)
          // Don't redirect yet - wait for email verification
        } else {
          router.push('/dashboard')
        }
      }
    } catch (err) {
      setError('Something went wrong. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  // If password reset link was sent
  if (resetLinkSent) {
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
              <h1 className="text-2xl font-bold mb-4">Check Your Email</h1>
              <p className="text-gray-600 mb-6">
                We've sent a password reset link to <strong>{email}</strong>. 
                Click the link in the email to reset your password.
              </p>
              <p className="text-sm text-gray-500 mb-6">
                Don't see it? Check your spam folder or try again in a few minutes.
              </p>
              <div className="flex flex-col space-y-3">
                <Button 
                  variant="secondary" 
                  onClick={() => {
                    setIsForgotPassword(false)
                    setResetLinkSent(false)
                  }}
                  className="w-full"
                >
                  Back to Sign In
                </Button>
              </div>
            </Card>
          </motion.div>
        </div>
      </div>
    )
  }

  // If verification email was sent, show a different UI
  if (verificationSent) {
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
              <h1 className="text-2xl font-bold mb-4">Check Your Email</h1>
              <p className="text-gray-600 mb-6">
                We've sent a verification link to <strong>{email}</strong>. 
                Please check your inbox and click the link to verify your account.
              </p>
              <p className="text-sm text-gray-500 mb-6">
                Don't see it? Check your spam folder or try again in a few minutes.
              </p>
              <div className="flex flex-col space-y-3">
                <Button 
                  variant="secondary" 
                  onClick={() => setVerificationSent(false)}
                  className="w-full"
                >
                  Back to Sign In
                </Button>
                <Button 
                  variant="outline" 
                  onClick={() => window.location.reload()}
                  className="w-full"
                >
                  I've Verified My Email
                </Button>
              </div>
            </Card>
          </motion.div>
        </div>
      </div>
    )
  }

  // Forgot password form
  if (isForgotPassword) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 px-4 py-8">
        <div className="max-w-md mx-auto">
          {/* Header */}
          <div className="mb-8">
            <Button 
              variant="ghost" 
              className="mb-6"
              onClick={() => setIsForgotPassword(false)}
            >
              <ArrowLeft size={20} />
              Back to Sign In
            </Button>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center"
            >
              <h1 className="text-3xl font-bold gradient-text mb-2">
                Reset Your Password
              </h1>
              <p className="text-gray-600">
                Enter your email and we'll send you a link to reset your password
              </p>
            </motion.div>
          </div>

          {/* Forgot Password Form */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
          >
            <Card variant="default">
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Email Field */}
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-[var(--border-radius-button)] focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                      placeholder="your@email.com"
                      required
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
                  <Mail size={20} />
                  Send Reset Link
                </Button>
              </form>
            </Card>
          </motion.div>
        </div>
      </div>
    )
  }

  // Main sign in/sign up form
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 px-4 py-8">
      <div className="max-w-md mx-auto">
        {/* Header */}
        <div className="mb-8">
          <Link href="/">
            <Button variant="ghost" className="mb-6">
              <ArrowLeft size={20} />
              Back Home
            </Button>
          </Link>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <motion.div
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity, delay: 1 }}
              className="inline-block mb-4"
            >
              <Heart size={48} fill="currentColor" className="text-purple-500" />
            </motion.div>
            <h1 className="text-3xl font-bold gradient-text mb-2">
              {isSignUp ? 'Start Your Healing Journey' : 'Welcome Back'}
            </h1>
            <p className="text-gray-600">
              {isSignUp 
                ? 'Create an account to track your progress and access all features'
                : 'Sign in to continue your growth journey'
              }
            </p>
          </motion.div>
        </div>

        {/* Auth Form */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
        >
          <Card variant="default">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Email Field */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <Mail size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-[var(--border-radius-button)] focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                    placeholder="your@email.com"
                    required
                  />
                </div>
              </div>

              {/* Password Field */}
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                  Password
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
                <User size={20} />
                {isSignUp ? 'Create Account' : 'Sign In'}
              </Button>

              {/* Forgot Password Link - Only show on sign in */}
              {!isSignUp && (
                <div className="text-center">
                  <button
                    type="button"
                    onClick={() => {
                      setIsForgotPassword(true)
                      setError('')
                    }}
                    className="text-purple-600 hover:text-purple-500 text-sm font-medium transition-colors"
                  >
                    Forgot your password?
                  </button>
                </div>
              )}

              {/* Toggle Mode */}
              <div className="text-center">
                <button
                  type="button"
                  onClick={() => {
                    setIsSignUp(!isSignUp)
                    setError('')
                  }}
                  className="text-purple-600 hover:text-purple-500 text-sm font-medium transition-colors"
                >
                  {isSignUp 
                    ? 'Already have an account? Sign in'
                    : "Don't have an account? Sign up"
                  }
                </button>
              </div>
            </form>
          </Card>
        </motion.div>

        {/* Supportive Message */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-8 text-center"
        >
          <Card variant="mint">
            <p className="text-gray-600">
              <strong>Remember:</strong> You're taking steps toward healthier relationships. 
              Every small action matters on your healing journey. 💙
            </p>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}