import React, { useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight, Eye, BookOpen, Github } from 'lucide-react'
import { PROJECTS, type Project } from '@/lib/constants'

/* Real preview screenshots using Unsplash themed images */
const PREVIEW_IMAGES: Record<number, string> = {
  1: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=800&auto=format&fit=crop',
  2: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?q=80&w=800&auto=format&fit=crop',
  3: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=800&auto=format&fit=crop',
  4: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?q=80&w=800&auto=format&fit=crop',
  5: 'https://images.unsplash.com/photo-1563986768494-4dee2763ff3f?q=80&w=800&auto=format&fit=crop',
  6: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=800&auto=format&fit=crop',
}

function ProjectPreview({ p, isThumb = false }: { p: Project; isThumb?: boolean }) {
  const img = PREVIEW_IMAGES[p.id]
  return (
    <div
      className={`relative w-full h-full rounded-xl overflow-hidden ${isThumb ? '' : 'shadow-xl'}`}
      style={{ background: p.previewBg }}
    >
      {img ? (
        <img
          src={img}
          alt={p.title}
          className="w-full h-full object-cover opacity-80"
          style={{ mixBlendMode: 'luminosity' }}
          loading="lazy"
        />
      ) : (
        <div className="w-full h-full flex items-center justify-center">
          <span className="text-white/20 text-xs font-bold uppercase tracking-widest">{p.tag}</span>
        </div>
      )}
      {/* Overlay */}
      <div className="absolute inset-0" style={{ background:`linear-gradient(135deg, ${p.previewBg}cc 0%, ${p.previewBg}44 100%)` }}/>
      {!isThumb && (
        <div
          className="absolute top-3 left-3 text-[10px] font-bold px-2.5 py-1 rounded-full"
          style={{
            background: p.previewAccent + '30',
            border: `1px solid ${p.previewAccent}50`,
            color: '#fff',
          }}
        >
          {p.tag}
        </div>
      )}
    </div>
  )
}

export default function Projects() {
  const [cur, setCur] = useState(0)
  const total = PROJECTS.length
  const go = useCallback((idx: number) => setCur(Math.max(0, Math.min(idx, total-1))), [total])
  const p = PROJECTS[cur]

  return (
    <section id="projects" className="bg-[#f0f4f8] py-20 relative overflow-hidden">
      {/* Grid bg — matches screenshot exactly */}
      <div className="absolute inset-0"
        style={{
          backgroundImage:
            'linear-gradient(rgba(37,99,235,0.06) 1px,transparent 1px),' +
            'linear-gradient(90deg,rgba(37,99,235,0.06) 1px,transparent 1px)',
          backgroundSize: '52px 52px',
        }}
      />

      <div className="site-container relative">

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between mb-12 gap-3">
          <motion.div
            initial={{ opacity:0, y:20 }}
            whileInView={{ opacity:1, y:0 }}
            viewport={{ once:true }}
            transition={{ duration:0.6, ease:[0.16,1,0.3,1] }}
          >
            <div className="flex items-center gap-2.5 mb-3">
              <div className="w-7 h-0.5 bg-blue-600 rounded"/>
              <span className="text-[11px] font-bold tracking-[0.1em] text-blue-600 uppercase">Portfolio</span>
            </div>
            <h2 className="text-[clamp(26px,3.8vw,42px)] font-bold text-gray-900 leading-tight">
              My Projects &amp;{' '}
              <span className="text-blue-500">Case Studies</span>
            </h2>
          </motion.div>
          <motion.p
            initial={{ opacity:0 }}
            whileInView={{ opacity:1 }}
            viewport={{ once:true }}
            transition={{ duration:0.5, delay:0.2 }}
            className="text-gray-400 text-sm whitespace-nowrap"
          >
            See what I can build for you •{' '}
            <span className="text-blue-600 font-semibold">{cur+1}</span> / {total}
          </motion.p>
        </div>

        {/* Main card */}
        <div className="relative">
          {/* Left arrow */}
          <button
            onClick={() => go(cur-1)} disabled={cur===0}
            className="absolute -left-14 top-1/2 -translate-y-1/2 z-20
                       w-11 h-11 rounded-full bg-white border border-gray-200
                       shadow-md flex items-center justify-center text-gray-600
                       hover:bg-gray-900 hover:text-white hover:border-gray-900
                       disabled:opacity-20 disabled:cursor-not-allowed
                       transition-all duration-200 hidden lg:flex"
          >
            <ChevronLeft className="w-5 h-5"/>
          </button>

          <AnimatePresence mode="wait">
            <motion.div
              key={p.id}
              initial={{ opacity:0, x:30 }}
              animate={{ opacity:1, x:0  }}
              exit={{    opacity:0, x:-30 }}
              transition={{ duration:0.35, ease:[0.16,1,0.3,1] }}
              className="bg-white rounded-3xl border border-gray-100
                         shadow-sm overflow-hidden"
            >
              <div className="grid md:grid-cols-[1.1fr_1fr] gap-0">

                {/* Preview image */}
                <div className="relative min-h-[280px] md:min-h-[360px]">
                  <ProjectPreview p={p}/>
                </div>

                {/* Info */}
                <div className="p-8 md:p-10 flex flex-col justify-center">
                  <p className="text-sm text-gray-400 font-medium mb-2">
                    {p.category} · {p.subcategory}
                  </p>
                  <h3 className="text-[clamp(20px,2.5vw,28px)] font-bold text-gray-900
                                 leading-snug mb-3">
                    {p.title}
                  </h3>
                  <p className="text-gray-500 text-sm leading-relaxed mb-5 line-clamp-3">
                    {p.description}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-7">
                    {p.techStack.map(tech => (
                      <span key={tech}
                        className="bg-gray-50 border border-gray-200 text-gray-600
                                   text-[11px] font-medium px-3 py-1.5 rounded-lg">
                        {tech}
                      </span>
                    ))}
                  </div>
                  <div className="flex gap-3 flex-wrap">
                    <a href={p.liveUrl}
                      className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700
                                 text-white text-sm font-semibold px-5 py-2.5 rounded-lg
                                 transition-all duration-200"
                    >
                      <Eye className="w-4 h-4"/> Live Demo
                    </a>
                    <a href={p.caseStudyUrl}
                      className="inline-flex items-center gap-2 border border-gray-300
                                 hover:border-gray-800 text-gray-700 hover:text-gray-900
                                 text-sm font-medium px-5 py-2.5 rounded-lg
                                 transition-all duration-200"
                    >
                      <BookOpen className="w-4 h-4"/> Case Study
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Right arrow */}
          <button
            onClick={() => go(cur+1)} disabled={cur===total-1}
            className="absolute -right-14 top-1/2 -translate-y-1/2 z-20
                       w-11 h-11 rounded-full bg-white border border-gray-200
                       shadow-md flex items-center justify-center text-gray-600
                       hover:bg-gray-900 hover:text-white hover:border-gray-900
                       disabled:opacity-20 disabled:cursor-not-allowed
                       transition-all duration-200 hidden lg:flex"
          >
            <ChevronRight className="w-5 h-5"/>
          </button>

          {/* Mobile arrows */}
          <div className="flex justify-center gap-4 mt-5 lg:hidden">
            <button onClick={() => go(cur-1)} disabled={cur===0}
              className="w-10 h-10 rounded-full bg-white border border-gray-200 shadow
                         flex items-center justify-center text-gray-600 disabled:opacity-25">
              <ChevronLeft className="w-4 h-4"/>
            </button>
            <button onClick={() => go(cur+1)} disabled={cur===total-1}
              className="w-10 h-10 rounded-full bg-white border border-gray-200 shadow
                         flex items-center justify-center text-gray-600 disabled:opacity-25">
              <ChevronRight className="w-4 h-4"/>
            </button>
          </div>
        </div>

        {/* Thumbnail strip */}
        <div className="flex justify-center gap-2.5 mt-7 overflow-x-auto no-scrollbar pb-1">
          {PROJECTS.map((proj, i) => (
            <button
              key={proj.id}
              onClick={() => go(i)}
              className={`flex-shrink-0 rounded-xl overflow-hidden transition-all duration-200
                ${i===cur
                  ? 'ring-2 ring-blue-500 ring-offset-2 ring-offset-[#f0f4f8] scale-[1.06]'
                  : 'opacity-45 hover:opacity-70'}`}
              style={{ width:74, height:54 }}
            >
              <ProjectPreview p={proj} isThumb/>
            </button>
          ))}
        </div>

        {/* View more on GitHub */}
        <motion.div
          initial={{ opacity:0, y:12 }}
          whileInView={{ opacity:1, y:0 }}
          viewport={{ once:true }}
          transition={{ duration:0.5, delay:0.3 }}
          className="flex justify-center mt-8"
        >
          <a href="https://github.com" target="_blank" rel="noreferrer"
            className="inline-flex items-center gap-2 text-gray-500 hover:text-gray-800
                       text-sm font-medium transition-colors group"
          >
            <Github className="w-4 h-4"/>
            View more projects on GitHub
            <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform"/>
          </a>
        </motion.div>

      </div>
    </section>
  )
}
