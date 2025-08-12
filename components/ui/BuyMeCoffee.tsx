'use client'

import { motion } from 'framer-motion'
import { Coffee, Heart } from 'lucide-react'

export default function BuyMeCoffee() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 2, type: 'spring' }}
      className="fixed bottom-6 right-6 z-50"
    >
      <motion.a
        href="https://buymeacoffee.com/nochase"
        target='_blank'
        className="bg-black/80 text-white px-4 py-3 rounded-full shadow-lg flex items-center gap-2 text-sm font-medium hover:bg-black transition-colors"
        whileHover={{ scale: 1.1 }}
        animate={{ scale: [1, 1.05, 1] }}
        transition={{ duration: 1.5, repeat: Infinity }}
      >
        <Coffee size={18} />
        <span className="hidden sm:inline">Buy me a coffee</span>
        <motion.div
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 1, repeat: Infinity, delay: 0.5 }}
        >
          <Heart size={16} fill="currentColor" />
        </motion.div>
      </motion.a>
    </motion.div>
  )
}