import React from 'react'
import { motion } from 'framer-motion'
import { TESTIMONIALS } from '@/lib/constants'

const VP  = { once: true, margin: '-50px' } as const
const con = { hidden:{}, visible:{ transition:{ staggerChildren:0.12 } } }
const itm = { hidden:{opacity:0,y:32}, visible:{opacity:1,y:0,transition:{duration:0.65,ease:[0.16,1,0.3,1] as const}} }

function highlight(text: string, words: string[]) {
  let result = text
  const parts: React.ReactNode[] = []
  let remaining = text
  words.forEach(w => {
    const idx = remaining.indexOf(w)
    if (idx === -1) return
    parts.push(remaining.slice(0, idx))
    parts.push(<span key={w} className="text-white/90 font-medium">{w}</span>)
    remaining = remaining.slice(idx + w.length)
  })
  parts.push(remaining)
  return parts.length > 1 ? <>{parts}</> : <>{text}</>
}

export default function Testimonials() {
  return (
    <section id="testimonials" className="bg-[#080c14] py-20">
      <div className="site-container">
        <div className="grid md:grid-cols-2 gap-8 mb-12 items-end">
          <motion.div initial={{opacity:0,x:-32}} whileInView={{opacity:1,x:0}} viewport={VP} transition={{duration:0.7}}>
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-7 h-0.5 bg-blue-400 rounded"/>
              <span className="text-[11px] font-bold tracking-[0.1em] text-blue-400 uppercase">Testimonials</span>
            </div>
            <h2 className="text-[clamp(26px,3.6vw,46px)] font-bold leading-[1.1]">
              Trusted by <span className="text-white/20">Teams Worldwide</span>
            </h2>
          </motion.div>
          <motion.p initial={{opacity:0,x:32}} whileInView={{opacity:1,x:0}} viewport={VP} transition={{duration:0.7,delay:0.1}}
            className="text-gray-400 text-[14px] leading-relaxed md:text-right">
            Elite engineering solutions trusted by industry leaders from Pakistan to San Francisco.
          </motion.p>
        </div>

        <motion.div variants={con} initial="hidden" whileInView="visible" viewport={VP}
          className="grid md:grid-cols-3 gap-4">
          {TESTIMONIALS.map(t => (
            <motion.div key={t.name} variants={itm}
              whileHover={{ y:-6, borderColor:'rgba(37,99,235,0.26)', transition:{duration:0.2} }}
              className="bg-white/[0.03] border border-white/[0.07] rounded-2xl p-7
                         flex flex-col gap-4 transition-colors duration-300"
            >
              <div className="flex items-center gap-3.5">
                <div className="w-11 h-11 rounded-full flex items-center justify-center
                               flex-shrink-0 text-sm font-bold text-white border border-white/10"
                  style={{ background: t.avatarColor }}>
                  {t.initials}
                </div>
                <div>
                  <p className="text-white text-sm font-semibold leading-tight">{t.name}</p>
                  <p className="text-gray-500 text-[11px] mt-0.5 leading-snug">{t.title} · {t.location}</p>
                </div>
              </div>
              <div className="w-10 h-px bg-blue-500/50 rounded"/>
              <p className="text-gray-400 text-[13px] leading-[1.75] flex-1">
                {highlight(t.text, t.highlights)}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
