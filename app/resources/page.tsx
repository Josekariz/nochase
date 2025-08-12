'use client'

import { motion } from 'framer-motion'
import { Book, ExternalLink, Heart, Brain, Users, Target } from 'lucide-react'
import Card from '../../components/ui/Card'
import Button from '../../components/ui/Button'
import Navbar from '../../components/Navbar'
import BuyMeCoffee from '../../components/ui/BuyMeCoffee'

export default function ResourcesPage() {
  const resources = [
    {
      category: "Understanding Anxious Attachment",
      icon: Brain,
      items: [
        {
          title: "What is Anxious Attachment?",
          description: "Learn about the origins and patterns of anxious attachment style",
          type: "article"
        },
        {
          title: "Why We Chase in Relationships",
          description: "Understanding the psychology behind pursuing behaviors",
          type: "guide"
        },
        {
          title: "The Protest Behaviors Cycle",
          description: "Recognizing how anxiety manifests in relationship behaviors",
          type: "infographic"
        }
      ]
    },
    {
      category: "Healing Strategies",
      icon: Heart,
      items: [
        {
          title: "Building Self-Soothing Skills",
          description: "Techniques to calm yourself without seeking external validation",
          type: "video"
        },
        {
          title: "The No Chase Method",
          description: "Step-by-step guide to breaking the chase cycle",
          type: "guide"
        },
        {
          title: "Mindfulness for Anxious Attachment",
          description: "Using present-moment awareness to interrupt patterns",
          type: "meditation"
        }
      ]
    },
    {
      category: "Relationship Skills",
      icon: Users,
      items: [
        {
          title: "Communicating Your Needs",
          description: "How to express needs without chasing or demanding",
          type: "article"
        },
        {
          title: "Creating Secure Relationships",
          description: "Building healthier dynamics with partners",
          type: "course"
        },
        {
          title: "Setting Healthy Boundaries",
          description: "Learning when and how to step back",
          type: "worksheet"
        }
      ]
    }
  ]

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'article': return 'text-blue-600 bg-blue-100'
      case 'guide': return 'text-green-600 bg-green-100'
      case 'video': return 'text-purple-600 bg-purple-100'
      case 'course': return 'text-orange-600 bg-orange-100'
      case 'worksheet': return 'text-pink-600 bg-pink-100'
      case 'meditation': return 'text-indigo-600 bg-indigo-100'
      case 'infographic': return 'text-teal-600 bg-teal-100'
      default: return 'text-gray-600 bg-gray-100'
    }
  }

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
            <Book size={64} className="mx-auto mb-6 text-purple-500 animate-gentle-bounce" />
            <h1 className="text-4xl font-bold gradient-text mb-4">
              Healing Resources
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Curated content to support your anxious attachment healing journey
            </p>
          </motion.div>

          {/* Coming Soon Notice */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mb-12"
          >
            <Card variant="blue" className="text-center">
              <h3 className="text-2xl font-bold mb-4">🌟 Content Coming Soon!</h3>
              <p className="text-gray-600 mb-4">
                We're carefully curating evidence-based resources specifically for anxious attachment healing. 
                Each piece of content will be reviewed by mental health professionals to ensure it's 
                supportive and accurate.
              </p>
              <Button variant="primary">
                <Heart size={20} fill="currentColor" />
                Get Notified When Ready
              </Button>
            </Card>
          </motion.div>

          {/* Resource Categories Preview */}
          {resources.map((category, categoryIndex) => (
            <motion.div
              key={categoryIndex}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + categoryIndex * 0.1 }}
              className="mb-12"
            >
              <div className="flex items-center gap-3 mb-6">
                <category.icon size={32} className="text-purple-600" />
                <h2 className="text-2xl font-bold">{category.category}</h2>
              </div>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {category.items.map((item, itemIndex) => (
                  <motion.div
                    key={itemIndex}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 + categoryIndex * 0.1 + itemIndex * 0.05 }}
                  >
                    <Card variant="default" className="h-full relative opacity-60">
                      <div className="absolute top-4 right-4">
                        <span className={`text-xs px-2 py-1 rounded-full ${getTypeColor(item.type)}`}>
                          {item.type}
                        </span>
                      </div>
                      
                      <h3 className="text-lg font-bold mb-3 pr-8">{item.title}</h3>
                      <p className="text-gray-600 mb-4 text-sm">{item.description}</p>
                      
                      <div className="text-center">
                        <Button variant="outline" size="sm" disabled>
                          <ExternalLink size={16} />
                          Coming Soon
                        </Button>
                      </div>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}

          {/* Interim Support */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
          >
            <Card variant="mint" className="text-center">
              <Target size={48} className="mx-auto mb-4 text-green-500" />
              <h3 className="text-2xl font-bold mb-4">Start Your Healing Now</h3>
              <p className="text-gray-600 mb-6">
                While we prepare these resources, you can begin your healing journey with our 
                breathing exercises and goal-setting tools.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button variant="primary" onClick={() => window.location.href = '/breathe'}>
                  Try Breathing Exercise
                </Button>
                <Button variant="outline" onClick={() => window.location.href = '/goals'}>
                  Create a Goal
                </Button>
              </div>
            </Card>
          </motion.div>

          {/* Professional Help Notice */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
            className="mt-12"
          >
            <Card variant="pink" className="border-l-4 border-pink-500">
              <h4 className="font-bold mb-2">💝 Important Note</h4>
              <p className="text-sm text-gray-600">
                While No Chase provides supportive tools and resources, it's not a replacement for 
                professional mental health care. If you're struggling with relationship patterns that 
                significantly impact your wellbeing, consider reaching out to a licensed therapist who 
                specializes in attachment styles.
              </p>
            </Card>
          </motion.div>
        </div>
      </div>
      
      <BuyMeCoffee />
    </>
  )
}