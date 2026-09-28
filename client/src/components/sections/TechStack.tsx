import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

type Category = 'All' | 'Frontend' | 'Backend' | 'Database' | 'DevOps' | 'AI/ML'

interface Tech {
  name: string
  icon: string
  category: Exclude<Category, 'All'>
  level: number // 1-5
  color: string
}

const TECHS: Tech[] = [
  // Frontend
  { name:'React',        icon:'⚛️',  category:'Frontend', level:5, color:'#61DAFB' },
  { name:'Next.js',      icon:'▲',   category:'Frontend', level:5, color:'#ffffff' },
  { name:'TypeScript',   icon:'TS',  category:'Frontend', level:4, color:'#3178C6' },
  { name:'Tailwind CSS', icon:'🌊',  category:'Frontend', level:5, color:'#06B6D4' },
  { name:'Framer Motion',icon:'🎭',  category:'Frontend', level:4, color:'#BB4B96' },
  { name:'GSAP',         icon:'🟢',  category:'Frontend', level:4, color:'#88CE02' },
  { name:'Vite',         icon:'⚡',  category:'Frontend', level:4, color:'#646CFF' },
  { name:'Redux',        icon:'🔮',  category:'Frontend', level:3, color:'#764ABC' },
  // Backend
  { name:'Node.js',      icon:'🟩',  category:'Backend',  level:5, color:'#339933' },
  { name:'Express.js',   icon:'🚂',  category:'Backend',  level:5, color:'#ffffff' },
  { name:'FastAPI',      icon:'⚡',  category:'Backend',  level:4, color:'#009688' },
  { name:'Python',       icon:'🐍',  category:'Backend',  level:4, color:'#3776AB' },
  { name:'GraphQL',      icon:'◈',   category:'Backend',  level:3, color:'#E10098' },
  { name:'REST APIs',    icon:'🔗',  category:'Backend',  level:5, color:'#4CAF50' },
  // Database
  { name:'MongoDB',      icon:'🍃',  category:'Database', level:5, color:'#47A248' },
  { name:'PostgreSQL',   icon:'🐘',  category:'Database', level:4, color:'#336791' },
  { name:'Redis',        icon:'🔴',  category:'Database', level:4, color:'#DC382D' },
  { name:'Supabase',     icon:'⚡',  category:'Database', level:4, color:'#3ECF8E' },
  { name:'Prisma',       icon:'◆',   category:'Database', level:4, color:'#2D3748' },
  { name:'MySQL',        icon:'🐬',  category:'Database', level:3, color:'#4479A1' },
  // DevOps
  { name:'Docker',       icon:'🐳',  category:'DevOps',   level:4, color:'#2496ED' },
  { name:'AWS',          icon:'☁️',  category:'DevOps',   level:3, color:'#FF9900' },
  { name:'CI/CD',        icon:'♾️',  category:'DevOps',   level:4, color:'#F05032' },
  { name:'Kubernetes',   icon:'☸️',  category:'DevOps',   level:3, color:'#326CE5' },
  { name:'Nginx',        icon:'🟩',  category:'DevOps',   level:3, color:'#009639' },
  { name:'Railway',      icon:'🚂',  category:'DevOps',   level:4, color:'#0B0D0E' },
  // AI/ML
  { name:'TensorFlow',   icon:'🧠',  category:'AI/ML',    level:3, color:'#FF6F00' },
  { name:'OpenAI API',   icon:'🤖',  category:'AI/ML',    level:4, color:'#412991' },
  { name:'LangChain',    icon:'🔗',  category:'AI/ML',    level:3, color:'#1C3C3C' },
  { name:'Pandas',       icon:'🐼',  category:'AI/ML',    level:4, color:'#150458' },
]

const CATEGORIES: Category[] = ['All','Frontend','Backend','Database','DevOps','AI/ML']

const LEVEL_LABELS = ['','Beginner','Learning','Intermediate','Advanced','Expert']

const stagger = {
  hidden:  {},
  visible: { transition: { staggerChildren: 0.04 } },
}
const card = {
  hidden:  { opacity: 0, y: 20, scale: 0.92 },
  visible: { opacity: 1, y: 0,  scale: 1, transition: { duration: 0.5, ease: [0.16,1,0.3,1] as const } },
}

export default function TechStack() {
  const [active, setActive] = useState<Category>('All')
  const [hovered, setHovered] = useState<string | null>(null)

  const filtered = active === 'All' ? TECHS : TECHS.filter(t => t.category === active)

  return (
    <section id="tech-stack" className="bg-[#0d1525] py-20">
      <div className="site-container">

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
          <motion.div
            initial={{ opacity:0, x:-28 }}
            whileInView={{ opacity:1, x:0 }}
            viewport={{ once:true }}
            transition={{ duration:0.7, ease:[0.16,1,0.3,1] }}
          >
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-7 h-0.5 bg-blue-400 rounded"/>
              <span className="text-[11px] font-bold tracking-[0.1em] text-blue-400 uppercase">Tech Stack</span>
            </div>
            <h2 className="text-[clamp(26px,3.6vw,46px)] font-bold leading-[1.1]">
              Tools &amp; <span className="text-white/22">Technologies</span>
            </h2>
          </motion.div>

          {/* Category filter */}
          <motion.div
            initial={{ opacity:0, y:12 }}
            whileInView={{ opacity:1, y:0 }}
            viewport={{ once:true }}
            transition={{ duration:0.6, delay:0.1 }}
            className="flex flex-wrap gap-2"
          >
            {CATEGORIES.map(cat => (
              <button
                key={cat}
                onClick={() => setActive(cat)}
                className={`px-4 py-1.5 rounded-full text-xs font-semibold border transition-all duration-200
                  ${active === cat
                    ? 'bg-blue-600 border-blue-600 text-white'
                    : 'bg-white/[0.04] border-white/[0.1] text-gray-400 hover:border-white/20 hover:text-white'}`}
              >
                {cat}
              </button>
            ))}
          </motion.div>
        </div>

        {/* Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            variants={stagger}
            initial="hidden"
            animate="visible"
            exit={{ opacity:0, transition:{ duration:0.15 } }}
            className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3"
          >
            {filtered.map(tech => (
              <motion.div
                key={tech.name}
                variants={card}
                onHoverStart={() => setHovered(tech.name)}
                onHoverEnd={() => setHovered(null)}
                whileHover={{ y:-4, scale:1.03 }}
                className="relative bg-white/[0.03] border border-white/[0.07] rounded-2xl
                           p-5 flex flex-col items-center gap-2.5 cursor-default
                           hover:border-blue-500/30 transition-colors duration-200 group"
              >
                {/* Glow */}
                <div
                  className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{ background:`radial-gradient(circle at 50% 0%, ${tech.color}15 0%, transparent 70%)` }}
                />

                {/* Icon */}
                <div className="text-2xl leading-none select-none" style={{ filter:'drop-shadow(0 0 8px ' + tech.color + '60)' }}>
                  {tech.icon.length <= 2 && !tech.icon.includes('️')
                    ? <span className="font-black text-lg" style={{ color:tech.color }}>{tech.icon}</span>
                    : tech.icon}
                </div>

                {/* Name */}
                <span className="text-white text-[13px] font-semibold text-center leading-tight">
                  {tech.name}
                </span>

                {/* Level dots */}
                <div className="flex gap-1">
                  {[1,2,3,4,5].map(i => (
                    <div
                      key={i}
                      className="w-1.5 h-1.5 rounded-full transition-all duration-200"
                      style={{ background: i <= tech.level ? tech.color : 'rgba(255,255,255,0.1)' }}
                    />
                  ))}
                </div>

                {/* Tooltip */}
                <AnimatePresence>
                  {hovered === tech.name && (
                    <motion.div
                      initial={{ opacity:0, y:4, scale:0.95 }}
                      animate={{ opacity:1, y:0, scale:1 }}
                      exit={{ opacity:0, y:4, scale:0.95 }}
                      transition={{ duration:0.15 }}
                      className="absolute -top-10 left-1/2 -translate-x-1/2 z-20
                                 bg-[#111827] border border-white/10 rounded-lg px-3 py-1.5
                                 text-[11px] font-semibold text-white whitespace-nowrap shadow-xl"
                    >
                      {LEVEL_LABELS[tech.level]}
                      <div className="absolute top-full left-1/2 -translate-x-1/2 w-0 h-0
                                      border-l-[4px] border-l-transparent
                                      border-r-[4px] border-r-transparent
                                      border-t-[4px] border-t-[#111827]"/>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  )
}
