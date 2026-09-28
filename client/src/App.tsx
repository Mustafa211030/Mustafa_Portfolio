import React, { useState } from 'react'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'

import Preloader        from './components/ui/Preloader'
import CustomCursor     from './components/ui/CustomCursor'
import AvailabilityBadge from './components/ui/AvailabilityBadge'
import ChatWidget       from './components/ui/ChatWidget'
import ResumeModal      from './components/ui/ResumeModal'
import ScrollToTop      from './components/ui/ScrollToTop'
import PageTransition   from './components/ui/PageTransition'

import Navbar           from './components/layout/Navbar'
import Footer           from './components/layout/Footer'

import Hero             from './components/sections/Hero'
import Marquee          from './components/sections/Marquee'
import Services         from './components/sections/Services'
import StatsCounter     from './components/sections/StatsCounter'
import Philosophy       from './components/sections/Philosophy'
import CaseStudy        from './components/sections/CaseStudy'
import Projects         from './components/sections/Projects'
import TechStack        from './components/sections/TechStack'
import Process          from './components/sections/Process'
import Pricing          from './components/sections/Pricing'
import ClientLogos      from './components/sections/ClientLogos'
import Testimonials     from './components/sections/Testimonials'
import FAQ              from './components/sections/FAQ'
import GetStarted       from './components/sections/GetStarted'
import BookCall         from './components/sections/BookCall'

// ── Context for resume modal ────────────────────────────────
export const ResumeCtx = React.createContext<{ open: () => void }>({ open: () => {} })

function AnimatedRoutes() {
  const location = useLocation()

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/"          element={<PortfolioHome />} />
        <Route path="/book-call" element={<BookCallPage  />} />
        <Route path="*"          element={<NotFound />} />
      </Routes>
    </AnimatePresence>
  )
}

function PortfolioHome() {
  React.useEffect(() => {
    fetch('/api/analytics/track', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ page: '/' }),
    }).catch(() => {})
  }, [])

  return (
    <PageTransition>
      <Navbar />
      <main>
        <Hero />
        <Marquee />
        <ClientLogos />
        <Services />
        <StatsCounter />
        <Philosophy />
        <CaseStudy />
        <Projects />
        <TechStack />
        <Process />
        <Pricing />
        <Testimonials />
        <FAQ />
        <GetStarted />
      </main>
      <Footer />
      <ScrollToTop />
    </PageTransition>
  )
}

function BookCallPage() {
  React.useEffect(() => {
    window.scrollTo(0, 0)
    fetch('/api/analytics/track', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ page: '/book-call' }),
    }).catch(() => {})
  }, [])

  return (
    <PageTransition>
      <BookCall />
    </PageTransition>
  )
}

function NotFound() {
  return (
    <div className="min-h-screen bg-[#080c14] flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-7xl font-black text-white mb-4">404</h1>
        <p className="text-gray-400 mb-8 text-lg">Page not found</p>
        <a href="/"
          className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700
                     text-white font-semibold px-6 py-3 rounded-lg transition-all">
          ← Back to Portfolio
        </a>
      </div>
    </div>
  )
}

export default function App() {
  const [loaded,       setLoaded]       = useState(false)
  const [resumeOpen,   setResumeOpen]   = useState(false)

  return (
    <ResumeCtx.Provider value={{ open: () => setResumeOpen(true) }}>
      <BrowserRouter>
        {/* Preloader */}
        {!loaded && (
          <Preloader onDone={() => setLoaded(true)} />
        )}

        {/* Global UI layers */}
        <CustomCursor />
        <AvailabilityBadge />
        <ChatWidget />
        <ResumeModal open={resumeOpen} onClose={() => setResumeOpen(false)} />

        {/* Main content — hidden until preloader done */}
        <div
          className="overflow-x-hidden"
          style={{
            opacity:    loaded ? 1 : 0,
            transition: 'opacity 0.6s ease',
          }}
        >
          <AnimatedRoutes />
        </div>
      </BrowserRouter>
    </ResumeCtx.Provider>
  )
}
