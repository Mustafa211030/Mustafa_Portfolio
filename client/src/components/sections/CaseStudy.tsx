import React from 'react'
import { motion } from 'framer-motion'
import { Github } from 'lucide-react'

const VP = { once: true, margin: '-60px' } as const
const BAR_H = [18,32,28,52,44,68,60,88,78,95,90,82]

function LiveBadge() {
  return (
    <motion.div
      initial={{ opacity:0, scale:0.85, y:14 }}
      whileInView={{ opacity:1, scale:1, y:0 }}
      viewport={{ once:true }}
      transition={{ duration:0.5, delay:0.5 }}
      className="absolute -top-5 -right-4 z-20 bg-[#111827] border border-white/10
                 rounded-xl p-4 min-w-[150px] shadow-2xl shadow-black/60"
    >
      <div className="flex items-center gap-1.5 mb-2">
        <span className="w-1.5 h-1.5 rounded-full bg-green-500 pulse-dot"/>
        <span className="text-[10px] font-bold text-green-400 tracking-wider uppercase">Live</span>
      </div>
      <span className="text-[26px] font-bold text-white leading-none block mb-1">99.86%</span>
      <div className="text-[10px] text-gray-500 uppercase tracking-wider leading-snug">
        Accuracy<br/>Near-Perfect Precision
      </div>
      <div className="flex justify-between mt-3 pt-3 border-t border-white/[0.07]">
        <div><div className="text-[9px] text-gray-500">Response</div><div className="text-sm font-bold text-blue-400">2.3s</div></div>
        <div><div className="text-[9px] text-gray-500">Features</div><div className="text-sm font-bold text-blue-400">37</div></div>
      </div>
    </motion.div>
  )
}

function Dashboard() {
  return (
    <div className="relative">
      <LiveBadge/>
      <motion.div
        initial={{ opacity:0, y:28 }} whileInView={{ opacity:1, y:0 }}
        viewport={{ once:true }} transition={{ duration:0.7, delay:0.2 }}
        className="bg-white/[0.03] border border-white/10 rounded-2xl overflow-hidden"
      >
        <div className="flex items-center gap-2 px-5 py-3.5 border-b border-white/[0.07] bg-white/[0.02]">
          <span className="w-2.5 h-2.5 rounded-full bg-red-500/75"/>
          <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/75"/>
          <span className="w-2.5 h-2.5 rounded-full bg-green-500/75"/>
          <span className="text-[11px] text-gray-500 ml-3 font-medium">Lead Scoring Agent — Dashboard</span>
        </div>
        <div className="p-5">
          <div className="grid grid-cols-3 gap-3 mb-4">
            {[['7,039','Leads Scored'],['3,007','Converted'],['0.141s','To Score']].map(([v,l])=>(
              <div key={l} className="bg-black/30 rounded-lg p-3">
                <div className="text-lg font-bold text-white">{v}</div>
                <div className="text-[10px] text-gray-500 mt-0.5">{l}</div>
              </div>
            ))}
          </div>
          <div className="bg-black/20 rounded-lg p-4 mb-3">
            <div className="text-[9px] text-gray-500 mb-3 uppercase tracking-wider">Conversion Score Distribution</div>
            <div className="flex items-end gap-1 h-[56px]">
              {BAR_H.map((h,i)=>(
                <motion.div key={i}
                  initial={{ scaleY:0 }} whileInView={{ scaleY:1 }}
                  viewport={{ once:true }}
                  transition={{ duration:0.5, delay:0.4+i*0.04, ease:'easeOut' }}
                  style={{ height:`${h}%`, transformOrigin:'bottom' }}
                  className="flex-1 bg-blue-500/50 hover:bg-blue-400/70 rounded-sm transition-colors"
                />
              ))}
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3 mb-3">
            <div className="bg-black/20 rounded-lg p-3">
              <div className="text-[9px] text-gray-500 mb-2">Model Performance</div>
              <div className="relative w-12 h-12 mx-auto">
                <svg viewBox="0 0 36 36" className="w-full h-full -rotate-90">
                  <circle cx="18" cy="18" r="14" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="3.5"/>
                  <motion.circle cx="18" cy="18" r="14" fill="none" stroke="#3B82F6"
                    strokeWidth="3.5" strokeLinecap="round" strokeDasharray="87.96"
                    initial={{ strokeDashoffset:87.96 }}
                    whileInView={{ strokeDashoffset:87.96*0.25 }}
                    viewport={{ once:true }}
                    transition={{ duration:1.2, delay:0.6, ease:'easeOut' }}
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-[10px] font-bold text-white">75%</span>
                </div>
              </div>
            </div>
            <div className="bg-black/20 rounded-lg p-3">
              <div className="text-[9px] text-gray-500 mb-2">Feature Importance</div>
              {[['recency',78],['frequency',65],['spend',54]].map(([lbl,w])=>(
                <div key={lbl as string} className="flex items-center gap-1.5 mb-1.5">
                  <span className="text-[8px] text-gray-500 w-12">{lbl as string}</span>
                  <div className="flex-1 bg-white/[0.06] rounded-full h-1.5">
                    <motion.div
                      initial={{ width:0 }} whileInView={{ width:`${w}%` }}
                      viewport={{ once:true }} transition={{ duration:0.8, delay:0.7 }}
                      className="h-full bg-blue-500 rounded-full"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="bg-black/20 rounded-lg p-3">
            <div className="text-[9px] text-gray-500 mb-2 uppercase tracking-wider">Real-time Lead Feed</div>
            {[
              { id:'L0017065', email:'david@corp...',  score:'0.9986', status:'Review' },
              { id:'L0017064', email:'alisha@pix...',  score:'0.8832', status:'Review' },
              { id:'L0017062', email:'tobi@kita...',   score:'0.3104', status:'Skip'   },
            ].map(row=>(
              <div key={row.id} className="flex items-center justify-between py-1.5 border-b border-white/[0.04] last:border-0">
                <span className="text-[9px] text-gray-500 font-mono">{row.id}</span>
                <span className="text-[9px] text-gray-400">{row.email}</span>
                <span className="text-[9px] font-bold text-white">{row.score}</span>
                <span className={`text-[8px] font-semibold px-1.5 py-0.5 rounded ${row.status==='Review'?'bg-blue-500/20 text-blue-400':'bg-red-500/15 text-red-400'}`}>
                  {row.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  )
}

export default function CaseStudy() {
  return (
    <section id="case-studies" className="bg-[#080c14] py-20">
      <div className="site-container">
        <div className="grid md:grid-cols-2 gap-8 mb-14 items-end">
          <motion.div initial={{opacity:0,x:-32}} whileInView={{opacity:1,x:0}} viewport={VP} transition={{duration:0.7}}>
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-7 h-0.5 bg-blue-400 rounded"/>
              <span className="text-[11px] font-bold tracking-[0.1em] text-blue-400 uppercase">Case Study</span>
            </div>
            <h2 className="text-[clamp(26px,3.6vw,46px)] font-bold leading-[1.1]">
              Turning Cold Leads <span className="text-white/20">Into Predictable Revenue</span>
            </h2>
          </motion.div>
          <motion.p initial={{opacity:0,x:32}} whileInView={{opacity:1,x:0}} viewport={VP} transition={{duration:0.7,delay:0.1}}
            className="text-gray-400 text-[14px] leading-relaxed md:text-right">
            How I built an AI system that predicts which leads will convert—with near-perfect accuracy.
          </motion.p>
        </div>
        <div className="grid lg:grid-cols-[1fr_1.45fr] gap-14 items-start">
          <motion.div initial={{opacity:0,x:-32}} whileInView={{opacity:1,x:0}} viewport={VP} transition={{duration:0.7}} className="space-y-7">
            <div>
              <p className="text-[10px] font-bold text-red-400 tracking-[0.15em] uppercase mb-3">The Challenge</p>
              <p className="text-white/78 text-[15px] leading-relaxed">
                Sales teams waste <strong className="text-white font-bold">50% of their time</strong> chasing leads that will never convert.
              </p>
            </div>
            <div>
              <p className="text-[10px] font-bold text-green-400 tracking-[0.15em] uppercase mb-3">The Solution</p>
              <p className="text-white/68 text-[15px] leading-relaxed mb-5">
                An autonomous AI agent that scores every incoming lead instantly, so your sales team focuses <strong className="text-white">only on high-value prospects</strong>.
              </p>
              <ul className="space-y-0">
                {[
                  { b:'Instant Scoring',  r:'— 2.3 second response time per lead' },
                  { b:'Self-Improving',   r:'— Model gets smarter with every interaction' },
                  { b:'Production Ready', r:'— Deployed and live on Railway' },
                ].map((item,i)=>(
                  <motion.li key={i}
                    initial={{opacity:0,x:-16}} whileInView={{opacity:1,x:0}} viewport={{ once:true }}
                    transition={{duration:0.5,delay:0.1+i*0.1}}
                    className="flex items-start gap-3 py-3 border-b border-white/[0.06] last:border-0 text-white/62 text-sm"
                  >
                    <span className="text-blue-400 text-xs mt-0.5 flex-shrink-0">→</span>
                    <span><strong className="text-white font-semibold">{item.b}</strong>{item.r}</span>
                  </motion.li>
                ))}
              </ul>
            </div>
            <motion.a href="#" whileHover={{scale:1.03}} whileTap={{scale:0.97}}
              className="inline-flex items-center gap-3 border border-white/20 hover:border-white/40
                         text-white px-7 py-3.5 rounded-lg text-sm font-medium transition-all">
              <Github className="w-4 h-4"/> See How It Works →
            </motion.a>
          </motion.div>
          <motion.div initial={{opacity:0,x:32}} whileInView={{opacity:1,x:0}} viewport={VP} transition={{duration:0.7,delay:0.1}}>
            <Dashboard/>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
