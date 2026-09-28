import React, { useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Download, ExternalLink, Briefcase, GraduationCap, Code2, Award } from 'lucide-react'

interface Props {
  open: boolean
  onClose: () => void
}

const EXPERIENCE = [
  { role:'Full Stack MERN Developer', company:'Freelance — Upwork & Fiverr', period:'2023 – Present', points:['Delivered 10+ production apps for clients across Pakistan, UAE, US, and Nigeria','Built AI-powered automation systems saving clients 500+ hours annually','Maintained 98% job success rate across all freelance platforms'] },
  { role:'Frontend Developer', company:'Remote Contract', period:'2022 – 2023', points:['Built responsive React applications for e-commerce and SaaS clients','Integrated REST APIs and third-party payment gateways (Stripe, Razorpay)','Optimised web performance achieving 90+ Lighthouse scores'] },
]

const SKILLS_BRIEF = ['React / Next.js','Node.js / Express','MongoDB / PostgreSQL','TypeScript','Python / FastAPI','Docker / AWS','Framer Motion / GSAP','AI & Automation']

export default function ResumeModal({ open, onClose }: Props) {
  useEffect(() => {
    if (open) document.body.style.overflow = 'hidden'
    else document.body.style.overflow = ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose])

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={onClose}
            className="fixed inset-0 z-[70] bg-black/70 backdrop-blur-md"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 24 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-4 md:inset-auto md:top-1/2 md:left-1/2
                       md:-translate-x-1/2 md:-translate-y-1/2
                       md:w-full md:max-w-2xl md:max-h-[88vh]
                       z-[75] flex flex-col bg-[#111827] border border-white/10
                       rounded-2xl shadow-2xl overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-7 py-5
                            border-b border-white/[0.08] flex-shrink-0">
              <div>
                <h2 className="text-white font-bold text-lg">Mustafa Saeed</h2>
                <p className="text-gray-400 text-xs mt-0.5">MERN Stack Developer & Automation Engineer</p>
              </div>
              <div className="flex items-center gap-2">
                <a
                  href="/resume-mustafa-saeed.pdf"
                  download
                  className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700
                             text-white text-xs font-semibold px-4 py-2 rounded-lg
                             transition-all"
                >
                  <Download className="w-3.5 h-3.5"/>
                  Download PDF
                </a>
                <button onClick={onClose}
                  className="w-8 h-8 rounded-lg bg-white/[0.06] hover:bg-white/[0.12]
                             flex items-center justify-center text-gray-400 hover:text-white
                             transition-colors">
                  <X className="w-4 h-4"/>
                </button>
              </div>
            </div>

            {/* Scrollable content */}
            <div className="overflow-y-auto flex-1 px-7 py-6 space-y-7">

              {/* Summary */}
              <div className="bg-blue-600/10 border border-blue-500/20 rounded-xl p-5">
                <p className="text-white/80 text-sm leading-relaxed">
                  Full Stack MERN Developer with 2+ years of experience building scalable web applications and AI-powered automation systems. Delivered 10+ production projects for clients across Pakistan, UAE, USA, and Nigeria. Specialising in React, Node.js, MongoDB, and Python-based automation.
                </p>
              </div>

              {/* Experience */}
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <Briefcase className="w-4 h-4 text-blue-400"/>
                  <h3 className="text-white font-bold text-sm uppercase tracking-wider">Experience</h3>
                </div>
                <div className="space-y-5">
                  {EXPERIENCE.map((exp, i) => (
                    <div key={i} className="pl-4 border-l border-white/[0.08]">
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 mb-2">
                        <div>
                          <p className="text-white font-semibold text-sm">{exp.role}</p>
                          <p className="text-blue-400 text-xs">{exp.company}</p>
                        </div>
                        <span className="text-gray-500 text-xs flex-shrink-0">{exp.period}</span>
                      </div>
                      <ul className="space-y-1">
                        {exp.points.map((pt, j) => (
                          <li key={j} className="text-gray-400 text-[13px] flex items-start gap-2">
                            <span className="text-blue-400 mt-1 flex-shrink-0">→</span>
                            {pt}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>

              {/* Skills */}
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <Code2 className="w-4 h-4 text-blue-400"/>
                  <h3 className="text-white font-bold text-sm uppercase tracking-wider">Core Skills</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {SKILLS_BRIEF.map(s => (
                    <span key={s}
                      className="bg-white/[0.05] border border-white/[0.08]
                                 text-gray-300 text-[12px] font-medium px-3 py-1.5 rounded-lg">
                      {s}
                    </span>
                  ))}
                </div>
              </div>

              {/* Education */}
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <GraduationCap className="w-4 h-4 text-blue-400"/>
                  <h3 className="text-white font-bold text-sm uppercase tracking-wider">Education</h3>
                </div>
                <div className="pl-4 border-l border-white/[0.08]">
                  <p className="text-white font-semibold text-sm">Bachelor of Science in Computer Science</p>
                  <p className="text-blue-400 text-xs mt-0.5">University · Pakistan</p>
                  <p className="text-gray-500 text-xs mt-0.5">2020 – 2024</p>
                </div>
              </div>

              {/* Achievements */}
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <Award className="w-4 h-4 text-blue-400"/>
                  <h3 className="text-white font-bold text-sm uppercase tracking-wider">Highlights</h3>
                </div>
                <div className="grid sm:grid-cols-2 gap-3">
                  {[
                    { val:'98%',   lbl:'Job Success Rate on Upwork'        },
                    { val:'10+',   lbl:'Projects delivered in 2 years'     },
                    { val:'500+',  lbl:'Hours saved for clients via AI'     },
                    { val:'$120k+',lbl:'Revenue generated for clients'     },
                  ].map(h => (
                    <div key={h.lbl}
                      className="bg-white/[0.03] border border-white/[0.07] rounded-xl p-4">
                      <div className="text-2xl font-black text-blue-400">{h.val}</div>
                      <div className="text-gray-400 text-[12px] mt-1">{h.lbl}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between px-7 py-4
                            border-t border-white/[0.08] flex-shrink-0">
              <p className="text-gray-500 text-xs">cmustafasaeed665@gmail.com</p>
              <a href="/book-call"
                className="text-blue-400 hover:underline text-xs font-medium">
                Book a free call →
              </a>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
