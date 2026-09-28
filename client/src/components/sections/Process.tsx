import React from 'react'
import { motion } from 'framer-motion'
import { PROCESS_STEPS } from '@/lib/constants'

const VP  = { once: true, margin: '-50px' } as const
const con = { hidden:{}, visible:{ transition:{ staggerChildren:0.12 } } }
const itm = { hidden:{opacity:0,y:32}, visible:{opacity:1,y:0,transition:{duration:0.65,ease:[0.16,1,0.3,1] as const}} }

export default function Process() {
  return (
    <section id="process" className="bg-[#111827] py-20">
      <div className="site-container">
        <div className="grid md:grid-cols-2 gap-8 mb-14 items-end">
          <motion.div initial={{opacity:0,x:-32}} whileInView={{opacity:1,x:0}} viewport={VP} transition={{duration:0.7}}>
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-7 h-0.5 bg-blue-400 rounded"/>
              <span className="text-[11px] font-bold tracking-[0.1em] text-blue-400 uppercase">How I Work</span>
            </div>
            <h2 className="text-[clamp(26px,3.6vw,46px)] font-bold leading-[1.1] text-white">
              From Concept to Scale
            </h2>
          </motion.div>
          <motion.p initial={{opacity:0,x:32}} whileInView={{opacity:1,x:0}} viewport={VP} transition={{duration:0.7,delay:0.1}}
            className="text-gray-400 text-[14px] leading-relaxed md:text-right">
            A predictable, transparent development process designed to minimise risk and maximise ROI.
          </motion.p>
        </div>

        <motion.div variants={con} initial="hidden" whileInView="visible" viewport={VP}
          className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {PROCESS_STEPS.map((step, i) => (
            <motion.div key={step.num} variants={itm}
              whileHover={{ y:-7, borderColor:'rgba(37,99,235,0.35)', transition:{duration:0.2} }}
              className="relative bg-white/[0.03] border border-white/[0.07] rounded-2xl p-7 overflow-hidden transition-colors duration-300"
            >
              <span className="absolute top-4 right-5 text-[64px] font-bold text-white/[0.04] leading-none select-none pointer-events-none">
                {step.num}
              </span>
              <div className="w-7 h-0.5 bg-blue-500 rounded mb-5"/>
              <h3 className="text-[20px] font-bold text-white mb-2">{step.title}</h3>
              <p className="text-gray-400 text-[13px] leading-relaxed">{step.desc}</p>
            </motion.div>
          ))}
        </motion.div>

        <motion.div initial={{opacity:0,y:18}} whileInView={{opacity:1,y:0}} viewport={{ once:true }} transition={{duration:0.6,delay:0.5}}
          className="text-center mt-12">
          <a href="#contact"
            className="inline-flex items-center gap-2 border border-white/20 hover:border-white/40
                       hover:bg-white/[0.04] text-white text-sm font-medium px-8 py-3.5 rounded-lg transition-all">
            Let's Start Your Project →
          </a>
        </motion.div>
      </div>
    </section>
  )
}
