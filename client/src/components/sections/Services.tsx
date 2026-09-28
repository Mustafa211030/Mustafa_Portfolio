import React from 'react'
import { motion } from 'framer-motion'
import { CheckCircle } from 'lucide-react'
import {
  AUTOMATION_FEATURES, AUTOMATION_METRICS,
  REVENUE_FEATURES, FORTRESS_FEATURES,
} from '@/lib/constants'

const VP = { once: true, margin: '-60px' } as const
const slideL = (d=0) => ({ initial:{opacity:0,x:-32}, whileInView:{opacity:1,x:0}, viewport:VP, transition:{duration:0.7,delay:d,ease:[0.16,1,0.3,1] as const} })
const slideR = (d=0) => ({ initial:{opacity:0,x:32},  whileInView:{opacity:1,x:0}, viewport:VP, transition:{duration:0.7,delay:d,ease:[0.16,1,0.3,1] as const} })
const fadeU  = (d=0) => ({ initial:{opacity:0,y:28},  whileInView:{opacity:1,y:0}, viewport:VP, transition:{duration:0.65,delay:d,ease:[0.16,1,0.3,1] as const} })

function AutomationVisual() {
  return (
    <div className="bg-black/25 rounded-xl p-4 flex flex-col gap-3 mt-4">
      <div className="bg-white/[0.04] border border-white/[0.07] rounded-lg p-3">
        <div className="flex justify-between items-start">
          <div>
            <div className="text-[9px] text-gray-500 mb-0.5">Tasks Automated</div>
            <div className="text-xl font-bold text-blue-400">2,847</div>
          </div>
          <div className="text-right">
            <div className="text-[9px] text-gray-500 mb-0.5">System Uptime</div>
            <div className="text-xl font-bold text-green-400">99.9%</div>
          </div>
        </div>
      </div>
      <div className="relative h-[100px] flex items-center justify-center">
        {[
          { bg:'#3b82f6', s:16, t:'50%',  l:'50%',  tr:'translate(-50%,-50%)', glow:'0 0 14px rgba(59,130,246,0.7)' },
          { bg:'#22c55e', s:11, t:'8%',   l:'50%',  tr:'translateX(-50%)' },
          { bg:'#a855f7', s:11, t:'50%',  l:'8%',   tr:'translateY(-50%)' },
          { bg:'#f59e0b', s:11, t:'50%',  l:'84%',  tr:'translateY(-50%)' },
          { bg:'#22c55e', s:11, t:'84%',  l:'38%',  tr:'translateX(-50%)' },
        ].map((n,i) => (
          <div key={i} className="absolute rounded-full border-2"
            style={{ background:n.bg, borderColor:n.bg, width:n.s, height:n.s,
                     top:n.t, left:n.l, transform:n.tr, boxShadow:n.glow||'' }} />
        ))}
        <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-20">
          {[['50%','50%','50%','8%'],['50%','50%','8%','50%'],['50%','50%','84%','50%'],['50%','50%','38%','84%']].map(([x1,y1,x2,y2],i)=>(
            <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="rgba(255,255,255,0.4)" strokeWidth="1" strokeDasharray="3 3"/>
          ))}
        </svg>
      </div>
    </div>
  )
}

function RevenueVisual() {
  return (
    <div className="bg-black/20 rounded-xl p-3 mb-4">
      <div className="flex gap-2">
        <div className="flex-1 bg-white/[0.04] rounded-md p-2">
          <div className="text-[9px] text-gray-500 mb-1">Revenue</div>
          <div className="flex items-end gap-0.5 h-7">
            {[30,45,38,62,55,80,72,95].map((h,i)=>(
              <div key={i} className="flex-1 bg-blue-500/40 rounded-sm" style={{height:`${h}%`}}/>
            ))}
          </div>
        </div>
        <div className="flex-1 bg-white/[0.04] rounded-md p-2">
          <div className="text-[9px] text-gray-500 mb-0.5">MRR</div>
          <div className="text-sm font-bold text-blue-300">+$12,400</div>
          <div className="text-[9px] text-green-400">↑ 3.8%</div>
        </div>
      </div>
    </div>
  )
}

function FortressVisual() {
  return (
    <div className="bg-black/20 rounded-xl h-[72px] flex items-center justify-center relative overflow-hidden mb-4">
      <div className="text-center relative z-10">
        <div className="text-[9px] text-gray-400 tracking-wider">Request Traffic</div>
        <div className="text-2xl font-bold text-white/80">7M</div>
        <div className="text-[9px] text-gray-400">requests/sec</div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 flex items-end gap-px h-8 px-2 opacity-20">
        {[20,35,55,45,70,60,85,75,90,80,95,88].map((h,i)=>(
          <div key={i} className="flex-1 bg-blue-400 rounded-t" style={{height:`${h}%`}}/>
        ))}
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-blue-900/20 to-transparent"/>
    </div>
  )
}

export default function Services() {
  return (
    <section id="services" className="bg-[#0d1525] py-20">
      <div className="site-container">

        {/* Header */}
        <div className="grid md:grid-cols-2 gap-8 mb-12 items-end">
          <motion.div {...slideL()}>
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-7 h-0.5 bg-blue-400 rounded"/>
              <span className="text-[11px] font-bold tracking-[0.1em] text-blue-400 uppercase">What I Do</span>
            </div>
            <h2 className="text-[clamp(26px,3.6vw,46px)] font-bold leading-[1.1]">
              Turn Technology into Your{' '}
              <span className="text-white/20">Competitive Unfair Advantage</span>
            </h2>
          </motion.div>
          <motion.p {...slideR(0.1)} className="text-gray-400 text-[14px] leading-relaxed md:text-right">
            I don't just build software; I engineer automated revenue systems that scale your business while you sleep.
          </motion.p>
        </div>

        {/* Two-column cards */}
        <div className="grid md:grid-cols-2 gap-4">

          {/* Card 1 — Automation */}
          <motion.div {...fadeU(0)}
            whileHover={{ y:-5, borderColor:'rgba(37,99,235,0.32)' }}
            className="bg-white/[0.03] border border-white/[0.07] rounded-2xl p-7 transition-all duration-300"
          >
            <h3 className="text-[21px] font-bold mb-4 leading-snug">
              Smart Automation Ecosystems
            </h3>
            <ul className="mb-5 space-y-0">
              {AUTOMATION_FEATURES.map(item => (
                <li key={item} className="flex items-center gap-3 py-2.5 border-b border-white/[0.05] last:border-0 text-white/62 text-sm">
                  <span className="text-blue-400 text-xs flex-shrink-0">→</span>{item}
                </li>
              ))}
            </ul>
            <div className="flex flex-wrap gap-2 mb-2">
              {AUTOMATION_METRICS.map(tag => (
                <span key={tag} className="bg-blue-500/10 text-blue-400 border border-blue-500/20 text-[11px] font-semibold px-3 py-1 rounded-full">
                  {tag}
                </span>
              ))}
            </div>
            <AutomationVisual/>
          </motion.div>

          {/* Right stacked */}
          <div className="flex flex-col gap-4">
            <motion.div {...fadeU(0.1)}
              whileHover={{ y:-4, borderColor:'rgba(37,99,235,0.28)' }}
              className="bg-white/[0.03] border border-white/[0.07] rounded-2xl p-7 flex-1 transition-all duration-300"
            >
              <RevenueVisual/>
              <h3 className="text-[19px] font-bold mb-2">Revenue-Ready Digital Products</h3>
              <p className="text-gray-400 text-[13px] leading-relaxed mb-3">
                Don't just write code; ship businesses. Rapid, scalable application development focused on user acquisition and monetization.
              </p>
              <ul className="space-y-1.5">
                {REVENUE_FEATURES.map(item => (
                  <li key={item} className="flex items-center gap-2 text-white/60 text-[13px]">
                    <CheckCircle className="w-3.5 h-3.5 text-blue-400 flex-shrink-0"/>{item}
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div {...fadeU(0.2)}
              whileHover={{ y:-4, borderColor:'rgba(37,99,235,0.28)' }}
              className="bg-white/[0.03] border border-white/[0.07] rounded-2xl p-7 flex-1 transition-all duration-300"
            >
              <FortressVisual/>
              <h3 className="text-[19px] font-bold mb-2">Fortress-Grade Architecture</h3>
              <p className="text-gray-400 text-[13px] leading-relaxed mb-3">
                Sleep soundly knowing your platform handles millions of users with bank-grade security and zero-downtime architecture.
              </p>
              <div className="grid grid-cols-2 gap-2">
                {FORTRESS_FEATURES.map(item => (
                  <div key={item} className="flex items-center gap-2 text-white/60 text-[13px]">
                    <span className="text-blue-400 text-xs flex-shrink-0">→</span>{item}
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
