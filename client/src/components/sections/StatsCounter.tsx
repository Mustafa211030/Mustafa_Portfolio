import React, { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'

interface Stat {
  value: number
  suffix: string
  prefix?: string
  label: string
  description: string
  color: string
}

const STATS: Stat[] = [
  { value:2847, suffix:'+', label:'Tasks Automated',        description:'Business processes running on autopilot', color:'#3b82f6' },
  { value:500,  suffix:'+', label:'Hours Saved Annually',   description:'Returned to clients through automation',  color:'#22c55e' },
  { value:99,   suffix:'%', label:'Uptime Guarantee',       description:'Across all deployed production systems',  color:'#a855f7' },
  { value:120,  suffix:'k+', prefix:'$', label:'Revenue Generated', description:'For clients through digital products',    color:'#f59e0b' },
  { value:10,   suffix:'+', label:'Companies Served',       description:'From startups to enterprise clients',     color:'#ec4899' },
  { value:2,    suffix:'.3s', label:'Avg Lead Score Time',  description:'Response time per lead in AI system',     color:'#06b6d4' },
]

function useCountUp(target: number, duration = 1800, start = false) {
  const [count, setCount] = useState(0)
  const rafRef = useRef<ReturnType<typeof setTimeout>>()

  useEffect(() => {
    if (!start) return
    const startTime = performance.now()
    const step = (now: number) => {
      const elapsed = now - startTime
      const progress = Math.min(elapsed / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setCount(Math.round(eased * target))
      if (progress < 1) rafRef.current = requestAnimationFrame(step) as unknown as ReturnType<typeof setTimeout>
    }
    rafRef.current = requestAnimationFrame(step) as unknown as ReturnType<typeof setTimeout>
    return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current as unknown as number) }
  }, [target, duration, start])

  return count
}

function StatCard({ stat, index }: { stat: Stat; index: number }) {
  const [visible, setVisible] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  const count = useCountUp(stat.value, 1600, visible)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true) }, { threshold: 0.5 })
    io.observe(el)
    return () => io.disconnect()
  }, [])

  return (
    <motion.div
      ref={ref}
      initial={{ opacity:0, y:28 }}
      whileInView={{ opacity:1, y:0 }}
      viewport={{ once:true, margin:'-40px' }}
      transition={{ duration:0.6, delay:index*0.08, ease:[0.16,1,0.3,1] }}
      whileHover={{ y:-4, scale:1.02 }}
      className="relative bg-white/[0.03] border border-white/[0.07] rounded-2xl p-7
                 overflow-hidden group cursor-default transition-colors duration-300
                 hover:border-opacity-50"
      style={{ '--hover-color': stat.color } as React.CSSProperties}
    >
      {/* Glow bg */}
      <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-400"
        style={{ background:`radial-gradient(circle at 0% 0%, ${stat.color}12 0%, transparent 65%)` }}/>

      {/* Color accent line */}
      <div className="w-10 h-0.5 rounded-full mb-5 transition-all duration-300 group-hover:w-16"
        style={{ background: stat.color }}/>

      {/* Number */}
      <div className="flex items-baseline gap-0.5 mb-2">
        {stat.prefix && (
          <span className="text-[22px] font-bold" style={{ color: stat.color }}>{stat.prefix}</span>
        )}
        <span className="text-[clamp(32px,4vw,48px)] font-black text-white leading-none tabular-nums">
          {count.toLocaleString()}
        </span>
        <span className="text-[20px] font-bold" style={{ color: stat.color }}>{stat.suffix}</span>
      </div>

      <p className="text-white text-[15px] font-semibold mb-1">{stat.label}</p>
      <p className="text-gray-500 text-[12px] leading-relaxed">{stat.description}</p>
    </motion.div>
  )
}

export default function StatsCounter() {
  return (
    <section id="stats" className="bg-[#080c14] py-20">
      <div className="site-container">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
          <motion.div
            initial={{ opacity:0, x:-28 }}
            whileInView={{ opacity:1, x:0 }}
            viewport={{ once:true }}
            transition={{ duration:0.7 }}
          >
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-7 h-0.5 bg-blue-400 rounded"/>
              <span className="text-[11px] font-bold tracking-[0.1em] text-blue-400 uppercase">By The Numbers</span>
            </div>
            <h2 className="text-[clamp(26px,3.6vw,46px)] font-bold leading-[1.1]">
              Real Impact, <span className="text-white/22">Real Results</span>
            </h2>
          </motion.div>
          <motion.p
            initial={{ opacity:0 }}
            whileInView={{ opacity:1 }}
            viewport={{ once:true }}
            transition={{ duration:0.5, delay:0.2 }}
            className="text-gray-400 text-[14px] leading-relaxed md:text-right max-w-xs"
          >
            Numbers that reflect the actual outcomes delivered for real businesses.
          </motion.p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {STATS.map((stat, i) => (
            <StatCard key={stat.label} stat={stat} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
