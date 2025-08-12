'use client'

import { motion } from 'framer-motion'
import { Users, Heart, MessageCircle, Calendar } from 'lucide-react'
import Card from '../../components/ui/Card'
import Button from '../../components/ui/Button'
import Navbar from '../../components/Navbar'
import BuyMeCoffee from '../../components/ui/BuyMeCoffee'
import Link from 'next/link'

export default function CommunityPage() {
  const upcomingFeatures = [
    {
      icon: MessageCircle,
      title: "Topic-Based Discussions",
      description: "Join conversations about specific attachment healing topics",
      variant: "blue"
    },
    {
      icon: Users,
      title: "Support Circles",
      description: "Connect with others on similar healing journeys",
      variant: "purple"
    },
    {
      icon: Calendar,
      title: "Group Challenges",
      description: "Participate in community-wide no-chase challenges",
      variant: "pink"
    },
    {
      icon: Heart,
      title: "Success Stories",
      description: "Share and celebrate your healing victories",
      variant: "mint"
    }
  ] as const

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
            <motion.div
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="text-6xl mb-6"
            >
              🤝
            </motion.div>
            <h1 className="text-4xl font-bold gradient-text mb-4">
              Healing Community
            </h1>
            <p className="text-xl text-gray-600">
              Connect, support, and grow together
            </p>
          </motion.div>

          {/* Coming Soon Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mb-12"
          >
            <Card variant="default" className="text-center py-10 px-6">
              <h2 className="text-2xl font-bold mb-4">Community Features Coming Soon</h2>
              <p className="text-gray-600 mb-6">
                We're building a supportive space for your healing journey.
                Join our waitlist to be the first to know when these features launch.
              </p>
              <Button variant="primary" size="lg" className="mx-auto">
                <Link href={"https://forms.gle/m198ky8Cn9kARy7L7"} target='_blank'>
                  Join Waitlist
                </Link>
              </Button>
            </Card>

          </motion.div>

          {/* Upcoming Features */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <h2 className="text-2xl font-bold mb-6 text-center">What's Coming</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {upcomingFeatures.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 + index * 0.1 }}
                >
                  <Card variant={feature.variant} className="h-full">
                    <div className="flex items-start gap-4 p-6">
                      <div className={`p-3 rounded-full bg-${feature.variant}-100`}>
                        <feature.icon size={24} className={`text-${feature.variant}-500`} />
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                        <p className="text-gray-600">{feature.description}</p>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Community Values */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="mt-16 text-center"
          >
            <h2 className="text-2xl font-bold mb-6">Our Community Values</h2>
            <div className="max-w-2xl mx-auto">
              <ul className="text-left space-y-4">
                <li className="flex items-center gap-3">
                  <div className="bg-green-100 p-2 rounded-full">
                    <Heart size={18} className="text-green-600" />
                  </div>
                  <span><strong>Compassion:</strong> We approach each other with kindness and understanding.</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="bg-blue-100 p-2 rounded-full">
                    <Users size={18} className="text-blue-600" />
                  </div>
                  <span><strong>Support:</strong> We're here to lift each other up, not tear down.</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="bg-purple-100 p-2 rounded-full">
                    <MessageCircle size={18} className="text-purple-600" />
                  </div>
                  <span><strong>Growth:</strong> We embrace learning and personal development.</span>
                </li>
              </ul>
            </div>
          </motion.div>

          {/* Support Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="mt-16 text-center"
          >
            <h2 className="text-2xl font-bold mb-4">Support Our Community</h2>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              Help us build the best possible healing community by supporting the development of these features.
            </p>
            <div className="flex justify-center">
              <BuyMeCoffee />
            </div>
          </motion.div>
        </div>
      </div>
    </>
  )
}