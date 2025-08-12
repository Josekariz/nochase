'use client'

import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Heart, Wind, Sparkles, Shield, Sun } from 'lucide-react'
import Button from '../components/ui/Button'
import Card from '../components/ui/Card'
import Navbar from '../components/Navbar'
import BuyMeCoffee from '../components/ui/BuyMeCoffee'

const slides = [
  {
    title: "You Are Enough 💙",
    subtitle: "Your worth isn't determined by someone else's response",
    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    icon: Heart
  },
  {
    title: "Breathe Through the Urge 🌸",
    subtitle: "Every moment of not chasing is a moment of self-love",
    background: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
    icon: Wind
  },
  {
    title: "You're Growing Stronger ✨",
    subtitle: "Healing isn't linear, but you're making progress",
    background: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
    icon: Sparkles
  },
  {
    title: "Your Peace Matters 🌿",
    subtitle: "Protecting your space is an act of self-respect",
    background: "linear-gradient(135deg, #86d4acff 0%, #faffd1 100%)",
    icon: Shield 
  },
  {
    title: "Choose Yourself Every Time 🌞",
    subtitle: "Your happiness starts with honoring your needs",
    background: "linear-gradient(135deg, #f6d365 0%, #fda085 100%)",
    icon: Sun
  }
];

export default function HomePage() {
  const [currentSlide, setCurrentSlide] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length)
    }, 3000)
    return () => clearInterval(timer)
  }, [])

  return (
    <>
      <Navbar />
      <div className="min-h-screen">
        {/* Hero Section with Slideshow */}
        <section className="relative h-screen flex items-center justify-center overflow-hidden">
          {slides.map((slide, index) => (
            <motion.div
              key={index}
              className="absolute inset-0 flex items-center justify-center"
              initial={{ opacity: 0, scale: 1.1 }}
              animate={{ 
                opacity: currentSlide === index ? 1 : 0,
                scale: currentSlide === index ? 1 : 1.1
              }}
              transition={{ duration: 1.5, ease: 'easeInOut' }}
              style={{ background: slide.background }}
            >
              <div className="text-center text-white px-4">
                <motion.div
                  initial={{ y: 30, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.5, duration: 0.8 }}
                  className="mb-6"
                >
                  <slide.icon size={80} className="mx-auto mb-4 animate-gentle-bounce" />
                </motion.div>
                
                <motion.h1
                  initial={{ y: 30, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.7, duration: 0.8 }}
                  className="text-5xl md:text-7xl font-bold mb-6 animate-fade-in"
                >
                  {slide.title}
                </motion.h1>
                
                <motion.p
                  initial={{ y: 30, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.9, duration: 0.8 }}
                  className="text-xl md:text-2xl mb-8 opacity-90"
                >
                  {slide.subtitle}
                </motion.p>
              </div>

              {/* Floating Elements */}
              <motion.div
                className="absolute top-20 left-20 w-4 h-4 bg-white/30 rounded-full"
                animate={{ y: [0, -20, 0], x: [0, 10, 0] }}
                transition={{ duration: 4, repeat: Infinity, delay: index * 0.5 }}
              />
              <motion.div
                className="absolute bottom-32 right-32 w-6 h-6 bg-white/20 rounded-full"
                animate={{ y: [0, -15, 0], x: [0, -10, 0] }}
                transition={{ duration: 5, repeat: Infinity, delay: index * 0.3 }}
              />
            </motion.div>
          ))}

          {/* Urge Button */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 1.5, type: 'spring' }}
            className="absolute bottom-20 left-1/2 transform -translate-x-1/2"
          >
            <Link href="/breathe">
              <Button 
                variant="primary" 
                size="lg" 
                className="bg-red-500 hover:bg-red-600 text-white text-xl px-8 py-4 animate-heartbeat shadow-2xl"
              >
                I Feel the Urge 💔
              </Button>
            </Link>
          </motion.div>

          {/* Slide Indicators */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex gap-2">
            {slides.map((_, index) => (
              <button
                key={index}
                className={`w-3 h-3 rounded-full transition-all ${
                  currentSlide === index ? 'bg-white' : 'bg-white/40'
                }`}
                onClick={() => setCurrentSlide(index)}
              />
            ))}
          </div>
        </section>

        {/* About Section */}
        <section className="py-section px-4 bg-white/50">
          <div className="max-w-page mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl font-bold gradient-text mb-6">
                You're Not Alone in This Journey
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                Anxious attachment can make us want to chase, check, and seek constant reassurance. 
                No Chase is here to support you through those difficult moments with breathing exercises, 
                goal setting, and gentle reminders of your worth.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-8">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 }}
              >
                <Card variant="blue" className="text-center h-full">
                  <Wind size={48} className="mx-auto mb-4 text-blue-500 animate-float" />
                  <h3 className="text-2xl font-bold mb-4">Instant Calm</h3>
                  <p className="text-gray-600">
                    When you feel the urge to reach out, our breathing exercises 
                    help you pause and find peace in the moment.
                  </p>
                </Card>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <Card variant="purple" className="text-center h-full">
                  <Heart size={48} className="mx-auto mb-4 text-purple-500 animate-float" />
                  <h3 className="text-2xl font-bold mb-4">Self-Love Goals</h3>
                  <p className="text-gray-600">
                    Set gentle goals for yourself and watch your progress grow 
                    with beautiful, motivating animations.
                  </p>
                </Card>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                <Card variant="pink" className="text-center h-full">
                  <Sparkles size={48} className="mx-auto mb-4 text-pink-500 animate-float" />
                  <h3 className="text-2xl font-bold mb-4">Healing Community</h3>
                  <p className="text-gray-600">
                    Connect with others on similar journeys in our supportive, 
                    topic-focused discussions. (Coming Soon)
                  </p>
                </Card>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Affirmations Section */}
        <section className="py-section px-4 bg-gradient-to-r from-purple-100 to-pink-100">
          <div className="max-w-page mx-auto text-center">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="mb-12"
            >
              <h2 className="text-4xl font-bold gradient-text mb-6">Daily Reminders</h2>
              <p className="text-xl text-gray-600">Gentle truths for your healing journey</p>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-6">
              {[
                "Your partner needs space to miss you too 💝",
                "Anxious feelings are temporary, but your growth is permanent 🌱",
                "Every moment you don't chase is a moment of self-respect 👑",
                "You deserve love that doesn't require chasing ✨"
              ].map((affirmation, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Card variant={['mint', 'blue', 'purple', 'pink'][index] as any} className="text-lg font-medium">
                    {affirmation}
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </div>
      
      <BuyMeCoffee />
    </>
  )
} 