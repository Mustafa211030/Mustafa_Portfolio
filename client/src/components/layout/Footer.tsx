import React, { useContext } from 'react'
import { motion } from 'framer-motion'
import { Github, Linkedin, Mail, MessageCircle, FileText } from 'lucide-react'
import { NAV_LINKS, OWNER } from '@/lib/constants'
import { ResumeCtx } from '@/App'

const SOCIALS = [
  { label: 'GitHub',   href: '#', Icon: Github        },
  { label: 'LinkedIn', href: '#', Icon: Linkedin      },
  { label: 'WhatsApp', href: '#', Icon: MessageCircle },
  { label: 'Email',    href: `mailto:${OWNER.email}`, Icon: Mail },
  {
    label: 'Upwork', href: '#',
    Icon: () => <span className="text-[11px] font-extrabold" style={{ color: '#6fda44' }}>UP</span>,
  },
  {
    label: 'Fiverr', href: '#',
    Icon: () => <span className="text-[12px] font-extrabold">fi</span>,
  },
]

const VP = { once: true } as const

export default function Footer() {
  const resumeCtx = useContext(ResumeCtx)

  const nav = (href: string) =>
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth', block: 'start' })

  return (
    // Footer always stays dark
    <footer style={{ background: '#111827' }}>

      {/* Main bar */}
      <div className="site-container py-10
                      flex flex-col md:flex-row items-start md:items-center
                      justify-between gap-8"
           style={{ borderBottom: '1px solid rgba(255,255,255,0.07)' }}>

        {/* Brand */}
        <motion.div
          initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }}
          viewport={VP} transition={{ duration: 0.6 }}
          className="flex-shrink-0"
        >
          <div className="text-xl font-bold tracking-tight mb-1">
            <span className="text-blue-400">{OWNER.firstName}</span>
            <span className="text-white">{OWNER.lastName}</span>
          </div>
          <p className="text-[13px] max-w-[220px] leading-relaxed mb-3"
             style={{ color: 'rgba(255,255,255,0.45)' }}>
            Building high-impact digital solutions that drive growth and efficiency.
          </p>
          {/* Resume button */}
          <button
            onClick={() => resumeCtx.open()}
            className="inline-flex items-center gap-1.5 text-[11px] font-semibold
                       px-3 py-1.5 rounded-lg transition-all duration-200"
            style={{
              color: 'rgba(255,255,255,0.55)',
              border: '1px solid rgba(255,255,255,0.12)',
            }}
            onMouseEnter={e => {
              (e.currentTarget as HTMLButtonElement).style.color = '#ffffff'
              ;(e.currentTarget as HTMLButtonElement).style.borderColor = 'rgba(255,255,255,0.28)'
              ;(e.currentTarget as HTMLButtonElement).style.background = 'rgba(255,255,255,0.06)'
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLButtonElement).style.color = 'rgba(255,255,255,0.55)'
              ;(e.currentTarget as HTMLButtonElement).style.borderColor = 'rgba(255,255,255,0.12)'
              ;(e.currentTarget as HTMLButtonElement).style.background = 'transparent'
            }}
          >
            <FileText className="w-3 h-3" />
            View Resume
          </button>
        </motion.div>

        {/* Nav */}
        <motion.nav
          initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={VP} transition={{ duration: 0.5, delay: 0.1 }}
          className="flex flex-wrap gap-x-1 gap-y-1"
        >
          {NAV_LINKS.map(link => (
            <button key={link.href} onClick={() => nav(link.href)}
              className="text-xs px-3 py-1.5 rounded-lg transition-all duration-200 footer-nav-link"
              style={{ color: 'rgba(255,255,255,0.5)' }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLButtonElement).style.color = '#ffffff'
                ;(e.currentTarget as HTMLButtonElement).style.background = 'rgba(255,255,255,0.06)'
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLButtonElement).style.color = 'rgba(255,255,255,0.5)'
                ;(e.currentTarget as HTMLButtonElement).style.background = 'transparent'
              }}
            >
              {link.label}
            </button>
          ))}
        </motion.nav>

        {/* Socials */}
        <motion.div
          initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }}
          viewport={VP} transition={{ duration: 0.6, delay: 0.15 }}
          className="flex items-center gap-2"
        >
          {SOCIALS.map(({ label, href, Icon }) => (
            <motion.a key={label} href={href} aria-label={label}
              whileHover={{ y: -2 }}
              className="w-9 h-9 rounded-full flex items-center justify-center transition-all duration-200 footer-social-icon"
              style={{
                background: 'rgba(255,255,255,0.04)',
                border: '1px solid rgba(255,255,255,0.09)',
                color: 'rgba(255,255,255,0.5)',
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLAnchorElement).style.color = '#60a5fa'
                ;(e.currentTarget as HTMLAnchorElement).style.borderColor = 'rgba(96,165,250,0.3)'
                ;(e.currentTarget as HTMLAnchorElement).style.background = 'rgba(59,130,246,0.1)'
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLAnchorElement).style.color = 'rgba(255,255,255,0.5)'
                ;(e.currentTarget as HTMLAnchorElement).style.borderColor = 'rgba(255,255,255,0.09)'
                ;(e.currentTarget as HTMLAnchorElement).style.background = 'rgba(255,255,255,0.04)'
              }}
            >
              <Icon className="w-4 h-4" />
            </motion.a>
          ))}
        </motion.div>
      </div>

      {/* Bottom bar */}
      <div className="site-container py-5
                      flex flex-col sm:flex-row items-center justify-between gap-2">
        <p className="text-xs" style={{ color: 'rgba(255,255,255,0.28)' }}>
          © {new Date().getFullYear()} {OWNER.fullName}. All rights reserved.
        </p>
        <p className="text-xs" style={{ color: 'rgba(255,255,255,0.28)' }}>
          Designed &amp; Developed with precision
        </p>
      </div>
    </footer>
  )
}