import React, { useState, useEffect, useContext } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, FileText } from 'lucide-react'
import { NAV_LINKS, OWNER } from '@/lib/constants'
import { ResumeCtx } from '@/App'
import DarkModeToggle from '../ui/DarkModeToggle'

export default function Navbar() {
  const [active, setActive] = useState('home')
  const [mobileOpen, setMobileOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const resumeCtx = useContext(ResumeCtx)

  useEffect(() => {
    const ids = NAV_LINKS.map(l => l.href.slice(1))
    const onScroll = () => {
      setScrolled(window.scrollY > 72)
      let cur = 'home'
      ids.forEach(id => {
        const el = document.getElementById(id)
        if (el && el.getBoundingClientRect().top < window.innerHeight * 0.45) cur = id
      })
      setActive(cur)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const navigate = (href: string) => {
    setMobileOpen(false)
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <>
      {/* ── Desktop nav ── full viewport width, content inside site-container */}
      <div
        className={`fixed top-0 left-0 right-0 z-50 hidden md:block w-full
                    transition-all duration-500
                    ${scrolled
                      ? 'bg-[#080c14]/85 backdrop-blur-2xl border-b border-white/[0.08] shadow-[0_8px_32px_rgba(0,0,0,0.4)]'
                      : 'bg-transparent border-b border-white/[0.04]'
                    }`}
      >
        {/* Inner content limited to site-container (1024px) */}
        <div className="site-container flex items-center justify-between h-[68px] gap-6">

          {/* Brand */}
          <button
            onClick={() => navigate('#home')}
            className="text-white font-black tracking-wider text-sm bg-transparent border-none cursor-pointer flex items-center gap-1.5 shrink-0 navbar-brand"
          >
            <span className="text-blue-400">{OWNER.firstName.toUpperCase()}</span>
            <span>{OWNER.lastName.toUpperCase()}</span>
          </button>

          {/* Nav links — center */}
          <div className="flex items-center gap-0.5 flex-1 justify-center">
            {NAV_LINKS.map(link => (
              <button
                key={link.href}
                onClick={() => navigate(link.href)}
                className={`relative px-3 py-2 rounded-full text-[12.5px] font-medium
                            transition-colors duration-200 whitespace-nowrap nav-link
                            ${active === link.href.slice(1) ? 'nav-link-active text-white' : 'text-white/60 hover:text-white'}`}
              >
                {active === link.href.slice(1) && (
                  <motion.span
                    layoutId="nav-active-desktop"
                    className="absolute inset-0 rounded-full bg-white/10"
                    transition={{ type: 'spring', stiffness: 400, damping: 36 }}
                  />
                )}
                <span className="relative">{link.label}</span>
              </button>
            ))}
          </div>

          {/* Right: Resume (conditional) + DarkModeToggle */}
          <div className="flex items-center gap-3 shrink-0">
            <AnimatePresence>
              {scrolled && (
                <motion.button
                  initial={{ opacity: 0, scale: 0.8, x: 8 }}
                  animate={{ opacity: 1, scale: 1, x: 0 }}
                  exit={{ opacity: 0, scale: 0.8, x: 8 }}
                  transition={{ duration: 0.2 }}
                  onClick={() => resumeCtx.open()}
                  className="flex items-center gap-1.5 bg-blue-600/25 hover:bg-blue-600/40
                             border border-blue-500/30 text-blue-300 hover:text-white
                             text-[11px] font-semibold px-3.5 py-1.5 rounded-full
                             transition-all duration-200 whitespace-nowrap"
                >
                  <FileText className="w-3 h-3" />
                  Resume
                </motion.button>
              )}
            </AnimatePresence>

            {/* Divider + DarkModeToggle inline */}
            <div className="flex items-center gap-3 pl-3 border-l border-white/[0.12]">
              <DarkModeToggle />
            </div>
          </div>

        </div>
      </div>

      {/* ── Mobile Top Header ── */}
      <div className="fixed top-0 left-0 right-0 h-16 bg-[#080c14]/90 backdrop-blur-xl border-b border-white/[0.06] z-50 flex items-center justify-between px-5 md:hidden mobile-header">
        <button
          onClick={() => navigate('#home')}
          className="text-white font-black tracking-wider text-xs flex items-center gap-1 navbar-brand"
        >
          <span className="text-blue-400">{OWNER.firstName.toUpperCase()}</span>
          <span>{OWNER.lastName.toUpperCase()}</span>
        </button>

        <div className="flex items-center gap-3">
          <DarkModeToggle />
          <button
            onClick={() => setMobileOpen(o => !o)}
            className="w-9 h-9 rounded-full bg-white/[0.05] border border-white/10
                       flex items-center justify-center text-white active:scale-95 transition-transform"
            aria-label="Toggle Navigation Menu"
          >
            {mobileOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* ── Mobile Dropdown Panel ── */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.22 }}
            className="fixed top-20 left-4 right-4 z-40 bg-[#0d1525]/96
                       backdrop-blur-xl border border-white/10 rounded-2xl
                       p-3 shadow-2xl md:hidden mobile-menu"
          >
            {NAV_LINKS.map(link => (
              <button
                key={link.href}
                onClick={() => navigate(link.href)}
                className={`w-full text-left px-4 py-3 rounded-xl text-sm font-medium transition-colors
                  ${active === link.href.slice(1)
                    ? 'bg-blue-600/20 text-blue-400'
                    : 'text-white/60 hover:text-white hover:bg-white/5'}`}
              >
                {link.label}
              </button>
            ))}
            <button
              onClick={() => { setMobileOpen(false); resumeCtx.open() }}
              className="w-full text-left px-4 py-3 rounded-xl text-sm font-medium
                         text-white/60 hover:text-white hover:bg-white/5 transition-colors
                         flex items-center gap-2"
            >
              <FileText className="w-4 h-4" />
              View Resume
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}