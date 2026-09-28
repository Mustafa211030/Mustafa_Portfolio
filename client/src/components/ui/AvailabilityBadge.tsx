import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Calendar, Zap, X } from 'lucide-react'

export default function AvailabilityBadge() {
  const [dismissed, setDismissed] = useState(false)

  return (
    <AnimatePresence>
      {!dismissed && (
        <motion.div
          initial={{ opacity: 0, y: -60 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -60 }}
          transition={{ duration: 0.5, delay: 3.2, ease: [0.16, 1, 0.3, 1] }}
          className="fixed top-0 left-0 right-0 z-[60] flex justify-center pointer-events-none"
        >
          <div className="pointer-events-auto flex items-center gap-3 bg-green-500/10
                          border border-green-500/25 backdrop-blur-xl
                          px-5 py-2.5 text-sm font-medium text-white
                          shadow-lg shadow-green-500/10"
            style={{ borderRadius: '0 0 14px 14px' }}
          >
            {/* Pulse dot */}
            <span className="relative flex h-2 w-2 flex-shrink-0">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"/>
              <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500"/>
            </span>

            <Zap className="w-3.5 h-3.5 text-green-400 flex-shrink-0"/>

            <span className="text-green-300 font-semibold">Available for new projects</span>
            <span className="text-white/50 text-xs hidden sm:inline">—</span>
            <span className="text-white/60 text-xs hidden sm:inline">
              Next slot: <strong className="text-white/90">July 2026</strong>
            </span>

            <a href="/book-call"
              className="ml-1 flex items-center gap-1.5 bg-green-500 hover:bg-green-400
                         text-white text-[11px] font-bold px-3 py-1 rounded-full
                         transition-colors whitespace-nowrap">
              <Calendar className="w-3 h-3"/>
              Book Now
            </a>

            <button
              onClick={() => setDismissed(true)}
              className="ml-1 text-white/30 hover:text-white/70 transition-colors p-0.5"
              aria-label="Dismiss"
            >
              <X className="w-3.5 h-3.5"/>
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
