'use client'

import { motion } from 'framer-motion'
import { LifeBuoy, Mail, MessageCircle, Phone, ExternalLink, Heart } from 'lucide-react'
import Card from '../../components/ui/Card'
import Button from '../../components/ui/Button'
import Navbar from '../../components/Navbar'
import BuyMeCoffee from '../../components/ui/BuyMeCoffee'

export default function SupportPage() {
  const supportOptions = [
    {
      icon: MessageCircle,
      title: "FAQ & Guides",
      description: "Find answers to common questions about using No Chase",
      action: "Browse FAQ",
      variant: "blue",
      available: false
    },
    {
      icon: Mail,
      title: "Email Support",
      description: "Get help with technical issues or general questions",
      action: "Contact Us",
      variant: "purple",
      available: false
    },
    {
      icon: LifeBuoy,
      title: "Community Support",
      description: "Connect with others who understand your journey",
      action: "Join Community",
      variant: "mint",
      available: false
    }
  ]

  const crisisResources = [
    {
      name: "National Suicide Prevention Lifeline",
      number: "988",
      description: "24/7 crisis support",
      country: "US"
    },
    {
      name: "Crisis Text Line",
      number: "Text HOME to 741741",
      description: "24/7 text-based crisis support",
      country: "US"
    },
    {
      name: "Samaritans",
      number: "116 123",
      description: "24/7 emotional support",
      country: "UK"
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
            className="text-center mb-12"
          >
            <LifeBuoy size={64} className="mx-auto mb-6 text-blue-500 animate-gentle-bounce" />
            <h1 className="text-4xl font-bold gradient-text mb-4">
              We're Here to Help
            </h1>
            <p className="text-xl text-gray-600">
              Get support for your No Chase journey
            </p>
          </motion.div>

          {/* Support Options */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mb-12"
          >
            <h2 className="text-2xl font-bold text-center mb-8">Get Help</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {supportOptions.map((option, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                >
                  <Card variant={option.variant as any} className={`text-center h-full ${!option.available ? 'opacity-60' : ''}`}>
                    <option.icon size={48} className="mx-auto mb-4" />
                    <h3 className="text-xl font-bold mb-3">{option.title}</h3>
                    <p className="text-gray-600 mb-6">{option.description}</p>
                    <Button variant={option.available ? "primary" : "outline"} size="sm" disabled={!option.available}>
                      {option.available && <ExternalLink size={16} />}
                      {option.available ? option.action : "Coming Soon"}
                    </Button>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Immediate Help */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="mb-12"
          >
            <Card variant="pink" className="text-center">
              <Heart size={48} className="mx-auto mb-4 text-pink-500 animate-heartbeat" />
              <h3 className="text-2xl font-bold mb-4">Need Support Right Now?</h3>
              <p className="text-gray-600 mb-6">
                If you're feeling overwhelmed or having a difficult moment, these tools can help immediately.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button variant="primary" onClick={() => window.location.href = '/breathe'}>
                  Breathing Exercise
                </Button>
                <Button variant="outline" onClick={() => window.location.href = '/goals'}>
                  Set a Support Goal
                </Button>
              </div>
            </Card>
          </motion.div>

          {/* Crisis Resources */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="mb-12"
          >
            <Card variant="blue" className="border-l-4 border-red-500">
              <div className="flex items-center gap-3 mb-4">
                <Phone size={32} className="text-red-500" />
                <h3 className="text-2xl font-bold">Crisis Support</h3>
              </div>
              <p className="text-gray-600 mb-6">
                If you're in crisis or having thoughts of self-harm, please reach out to these professional resources immediately:
              </p>
              <div className="space-y-4">
                {crisisResources.map((resource, index) => (
                  <div key={index} className="bg-white/50 p-4 rounded-lg">
                    <div className="flex items-start justify-between">
                      <div>
                        <h4 className="font-bold">{resource.name} ({resource.country})</h4>
                        <p className="text-gray-600 text-sm">{resource.description}</p>
                      </div>
                      <div className="text-right">
                        <a 
                          href={resource.number.startsWith('Text') ? 'sms:741741?body=HOME' : `tel:${resource.number.replace(/\D/g, '')}`}
                          className="text-lg font-bold text-blue-600 hover:text-blue-500"
                        >
                          {resource.number}
                        </a>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <p className="text-sm text-gray-500 mt-4 italic">
                These resources are staffed by trained professionals who can provide immediate support.
              </p>
            </Card>
          </motion.div>

          {/* App Issues */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
            className="mb-12"
          >
            <Card variant="mint">
              <h3 className="text-2xl font-bold mb-4">Technical Issues?</h3>
              <p className="text-gray-600 mb-4">
                If you're experiencing problems with the app, here are some quick fixes:
              </p>
              <div className="grid md:grid-cols-2 gap-4 text-sm">
                <div>
                  <h4 className="font-bold mb-2">Common Solutions:</h4>
                  <ul className="space-y-1 text-gray-600">
                    <li>• Refresh the page</li>
                    <li>• Clear browser cache</li>
                    <li>• Try a different browser</li>
                    <li>• Check internet connection</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-bold mb-2">Still Having Issues?</h4>
                  <p className="text-gray-600">
                    Contact support (coming soon) with details about:
                  </p>
                  <ul className="space-y-1 text-gray-600 mt-2">
                    <li>• What you were trying to do</li>
                    <li>• What happened instead</li>
                    <li>• Your browser and device</li>
                  </ul>
                </div>
              </div>
            </Card>
          </motion.div>

          {/* Feedback */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2 }}
          >
            <Card variant="purple" className="text-center">
              <h3 className="text-2xl font-bold mb-4">Help Us Improve</h3>
              <p className="text-gray-600 mb-6">
                Your feedback helps us create better tools for the anxious attachment healing community. 
                Share your ideas, suggestions, or experiences with No Chase.
              </p>
              <Button variant="primary" disabled>
                <Heart size={20} fill="currentColor" />
                Share Feedback (Coming Soon)
              </Button>
            </Card>
          </motion.div>
        </div>
      </div>
      
      <BuyMeCoffee />
    </>
  )
}