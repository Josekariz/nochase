'use client'

import { motion } from 'framer-motion'
import { Heart, Target, Users, Shield, Sparkles } from 'lucide-react'
import Card from '../../components/ui/Card'
import Navbar from '../../components/Navbar'
import BuyMeCoffee from '../../components/ui/BuyMeCoffee'

export default function AboutPage() {
  const values = [
    {
      icon: Heart,
      title: "Compassionate Healing",
      description: "We believe healing happens through self-compassion, not self-judgment",
      variant: "pink"
    },
    {
      icon: Shield,
      title: "Safe Space",
      description: "Creating a judgment-free environment where you can be vulnerable and grow",
      variant: "blue"
    },
    {
      icon: Target,
      title: "Evidence-Based",
      description: "Our approach is grounded in attachment theory and proven therapeutic methods",
      variant: "purple"
    },
    {
      icon: Sparkles,
      title: "Growth Focused",
      description: "Every feature is designed to celebrate progress, not perfection",
      variant: "mint"
    }
  ]

  return (
    <>
      <Navbar />
      <div className="min-h-screen pt-20 px-4 pb-20">
        <div className="max-w-page mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <motion.div
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 3, repeat: Infinity }}
              className="text-6xl mb-6"
            >
              💙
            </motion.div>
            <h1 className="text-4xl font-bold gradient-text mb-6">
              About No Chase
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              A supportive companion for anyone healing from anxious attachment patterns 
              and learning to love themselves first.
            </p>
          </motion.div>

          {/* Mission Statement */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mb-16"
          >
            <Card variant="default" className="text-center py-12">
              <h2 className="text-3xl font-bold mb-6">Our Mission</h2>
              <p className="text-lg text-gray-700 leading-relaxed max-w-4xl mx-auto">
                We understand how painful it feels to have the urge to chase, check, or seek 
                constant reassurance in relationships. No Chase was created by someone who lived 
                this experience and found healing through mindful awareness, self-compassion, and 
                small, consistent steps toward change. Our mission is to provide you with gentle, 
                non-judgmental tools that support your journey toward more secure attachment patterns.
              </p>
            </Card>
          </motion.div>

          {/* Our Approach */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mb-16"
          >
            <h2 className="text-3xl font-bold text-center mb-12">How We Support You</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <Card variant="blue">
                <h3 className="text-2xl font-bold mb-4 flex items-center gap-3">
                  🌬️ In Crisis Moments
                </h3>
                <p className="text-gray-600 mb-4">
                  When you feel the overwhelming urge to reach out, our breathing exercises 
                  provide immediate, accessible relief. No login required—just instant support 
                  when you need it most.
                </p>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Interactive breathing guides</li>
                  <li>• Calming animations</li>
                  <li>• Validating, supportive messages</li>
                  <li>• Available 24/7</li>
                </ul>
              </Card>

              <Card variant="purple">
                <h3 className="text-2xl font-bold mb-4 flex items-center gap-3">
                  🎯 For Long-term Growth
                </h3>
                <p className="text-gray-600 mb-4">
                  Set personal "no chase" goals and watch your progress with beautiful, motivating 
                  animations. Every moment you resist the urge is celebrated as growth.
                </p>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Flexible goal duration (minutes to months)</li>
                  <li>• Beautiful progress visualizations</li>
                  <li>• Motivational reminders</li>
                  <li>• Privacy-focused (personal notes stay local)</li>
                </ul>
              </Card>
            </div>
          </motion.div>

          {/* Core Values */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mb-16"
          >
            <h2 className="text-3xl font-bold text-center mb-12">What We Believe</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {values.map((value, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 + index * 0.1 }}
                >
                  <Card variant={value.variant as any} className="h-full text-center">
                    <value.icon size={48} className="mx-auto mb-4 animate-gentle-bounce" />
                    <h3 className="text-xl font-bold mb-3">{value.title}</h3>
                    <p className="text-gray-600">{value.description}</p>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Privacy & Safety */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="mb-16"
          >
            <Card variant="mint">
              <h3 className="text-2xl font-bold mb-4 flex items-center gap-3">
                <Shield size={32} />
                Your Privacy Matters
              </h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-bold mb-2">What We Store Online:</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Goal titles and durations</li>
                    <li>• Progress tracking data</li>
                    <li>• Account information (email only)</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-bold mb-2">What Stays Private:</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Personal motivations and notes</li>
                    <li>• Journaling entries</li>
                    <li>• Any deeply personal content</li>
                  </ul>
                </div>
              </div>
              <p className="text-sm text-gray-600 mt-4 italic">
                We believe healing requires safety, so we've designed No Chase to protect your privacy 
                while still allowing you to track your progress across devices.
              </p>
            </Card>
          </motion.div>

          {/* Professional Note */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
          >
            <Card variant="pink" className="text-center border-l-4 border-pink-500">
              <h4 className="text-xl font-bold mb-4">A Note on Professional Support</h4>
              <p className="text-gray-600 leading-relaxed">
                No Chase is designed to complement, not replace, professional mental health care. 
                While our tools can support your daily healing practice, working with a therapist 
                who specializes in attachment styles can provide deeper, personalized guidance. 
                We encourage you to seek professional support if anxious attachment patterns are 
                significantly impacting your relationships or mental health.
              </p>
            </Card>
          </motion.div>

          {/* Call to Action */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2 }}
            className="mt-16 text-center"
          >
            <Card variant="default">
              <h3 className="text-2xl font-bold mb-4">Ready to Begin?</h3>
              <p className="text-gray-600 mb-6">
                Your healing journey can start right now, in this moment.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button 
                  onClick={() => window.location.href = '/breathe'}
                  className="bg-[var(--color-brand-primary)] text-white px-6 py-3 rounded-[var(--border-radius-button)] hover:opacity-90 transition-opacity"
                >
                  Try Breathing Exercise
                </button>
                <button 
                  onClick={() => window.location.href = '/auth'}
                  className="border-2 border-[var(--color-brand-primary)] text-[var(--color-brand-primary)] px-6 py-3 rounded-[var(--border-radius-button)] hover:bg-[var(--color-brand-primary)] hover:text-white transition-colors"
                >
                  Create Account
                </button>
              </div>
            </Card>
          </motion.div>
        </div>
      </div>
      
      <BuyMeCoffee />
    </>
  )
}