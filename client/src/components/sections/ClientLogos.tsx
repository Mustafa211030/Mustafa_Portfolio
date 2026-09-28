import React from 'react'
import { motion } from 'framer-motion'

const LOGOS = [
  { name: 'CloudScale',          abbr: 'CS',  color: '#3b82f6' },
  { name: 'TextileBridge',       abbr: 'TB',  color: '#22c55e' },
  { name: 'Boctrust Bank',       abbr: 'BB',  color: '#f59e0b' },
  { name: 'PakFin Solutions',    abbr: 'PF',  color: '#a855f7' },
  { name: 'EduLearn',            abbr: 'EL',  color: '#ec4899' },
  { name: 'Horizon AI',          abbr: 'HA',  color: '#06b6d4' },
  { name: 'Royal Devs',          abbr: 'RD',  color: '#f97316' },
  { name: 'Designer District',   abbr: 'DD',  color: '#8b5cf6' },
]

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.07 } },
}
const item = {
  hidden:  { opacity: 0, y: 16, scale: 0.9 },
  visible: { opacity: 1, y: 0,  scale: 1,  transition: { duration: 0.5, ease: [0.16,1,0.3,1] as const } },
}

export default function ClientLogos() {
  return (
    <section className="bg-[#0d1525] py-14 border-y border-white/[0.05]">
      <div className="site-container">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center text-[11px] font-bold tracking-[0.18em] text-gray-600
                     uppercase mb-9"
        >
          Trusted by teams from
        </motion.p>

        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-40px' }}
          className="flex flex-wrap items-center justify-center gap-4"
        >
          {LOGOS.map(logo => (
            <motion.div
              key={logo.name}
              variants={item}
              whileHover={{ y: -3, scale: 1.04 }}
              className="flex items-center gap-2.5 bg-white/[0.03] border border-white/[0.07]
                         rounded-xl px-5 py-3 cursor-default group
                         hover:border-white/15 transition-all duration-200"
            >
              <div
                className="w-7 h-7 rounded-lg flex items-center justify-center
                           text-[11px] font-black text-white flex-shrink-0"
                style={{ background: logo.color + '25', border: `1px solid ${logo.color}35` }}
              >
                <span style={{ color: logo.color }}>{logo.abbr}</span>
              </div>
              <span className="text-gray-400 group-hover:text-white text-sm font-medium
                               transition-colors whitespace-nowrap">
                {logo.name}
              </span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
