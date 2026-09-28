import React, { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { OWNER } from '@/lib/constants'

const QUOTE = "I don't just write code—I architect solutions that transform how businesses operate, automate what others do manually, and build systems that scale."
const WORDS = QUOTE.split(' ')

export default function Philosophy() {
  const sectionRef  = useRef<HTMLElement>(null)
  const [litCount,  setLitCount]  = useState(0)
  const [locked,    setLocked]    = useState(false)
  const [complete,  setComplete]  = useState(false)
  const savedScrollY = useRef(0)
  const rafRef       = useRef<number>()
  const litRef       = useRef(0)

  /* When section hits viewport → lock scroll, highlight on scroll gesture */
  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !complete) {
          savedScrollY.current = window.scrollY
          setLocked(true)
        }
      },
      { threshold: 0.85 }
    )
    io.observe(section)
    return () => io.disconnect()
  }, [complete])

  /* Apply / remove body scroll lock */
  useEffect(() => {
    if (!locked) return

    /* Freeze page at exact pixel */
    document.body.style.overflow   = 'hidden'
    document.body.style.position   = 'fixed'
    document.body.style.top        = `-${savedScrollY.current}px`
    document.body.style.width      = '100%'
    document.body.style.left       = '0'

    return () => {
      document.body.style.overflow  = ''
      document.body.style.position  = ''
      document.body.style.top       = ''
      document.body.style.width     = ''
      document.body.style.left      = ''
      window.scrollTo({ top: savedScrollY.current, behavior: 'instant' as ScrollBehavior })
    }
  }, [locked])

  /* On scroll wheel / touch while locked → advance words */
  useEffect(() => {
    if (!locked) return

    let pending = 0          // accumulated scroll delta

    const advance = () => {
      if (litRef.current >= WORDS.length) return
      litRef.current += 1
      setLitCount(litRef.current)

      if (litRef.current >= WORDS.length) {
        /* All highlighted — unlock after short pause */
        setTimeout(() => {
          setLocked(false)
          setComplete(true)
          /* Resume scroll just past the section */
          const section = sectionRef.current
          if (section) {
            const rect = section.getBoundingClientRect()
            window.scrollTo({ top: savedScrollY.current + rect.height - window.innerHeight + 1, behavior: 'smooth' })
          }
        }, 500)
      }
    }

    const onWheel = (e: WheelEvent) => {
      e.preventDefault()
      pending += e.deltaY
      /* Highlight one word per ~18px of scroll */
      const steps = Math.floor(Math.abs(pending) / 18)
      if (steps > 0) {
        for (let i = 0; i < steps; i++) advance()
        pending = pending % 18
      }
    }

    /* Touch support */
    let touchStartY = 0
    const onTouchStart = (e: TouchEvent) => { touchStartY = e.touches[0].clientY }
    const onTouchMove  = (e: TouchEvent) => {
      e.preventDefault()
      const dy = touchStartY - e.touches[0].clientY
      pending += dy
      touchStartY = e.touches[0].clientY
      const steps = Math.floor(Math.abs(pending) / 12)
      if (steps > 0) {
        for (let i = 0; i < steps; i++) advance()
        pending = pending % 12
      }
    }

    window.addEventListener('wheel',      onWheel,      { passive: false })
    window.addEventListener('touchstart', onTouchStart, { passive: false })
    window.addEventListener('touchmove',  onTouchMove,  { passive: false })
    return () => {
      window.removeEventListener('wheel',      onWheel)
      window.removeEventListener('touchstart', onTouchStart)
      window.removeEventListener('touchmove',  onTouchMove)
    }
  }, [locked])

  /* Reset lit count if section leaves viewport before completion */
  useEffect(() => {
    if (!locked && !complete) {
      litRef.current = 0
      setLitCount(0)
    }
  }, [locked, complete])

  return (
    <section
      id="philosophy"
      ref={sectionRef}
      className="min-h-screen flex items-center justify-center bg-[#e8eaed] px-6 py-24"
    >
      <div className="max-w-[860px] mx-auto text-center">

        {/* Giant decorative quote mark */}
        <motion.span
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.8 }}
          className="block select-none mb-3"
          style={{
            fontFamily: 'Georgia, serif',
            fontStyle:  'italic',
            fontSize:   '140px',
            lineHeight: '0.5',
            color:      'rgba(0,0,0,0.07)',
          }}
        >
          "
        </motion.span>

        {/* Quote — word by word */}
        <p
          className="leading-[1.55]"
          style={{
            fontFamily: "'Instrument Serif', Georgia, serif",
            fontStyle:  'italic',
            fontSize:   'clamp(22px,3.4vw,46px)',
          }}
        >
          {WORDS.map((word, i) => (
            <React.Fragment key={i}>
              <span
                style={{
                  display:          'inline-block',
                  color:            i < litCount ? '#111111' : 'rgba(0,0,0,0.15)',
                  transform:        i < litCount ? 'translateY(0px) scale(1)' : 'translateY(2px) scale(0.99)',
                  transition:       'color 0.25s ease, transform 0.25s ease',
                  fontWeight:       i < litCount ? 600 : 400,
                }}
              >
                {word}
              </span>
              {i < WORDS.length - 1 && (
                <span style={{ display: 'inline-block', width: '0.28em' }} />
              )}
            </React.Fragment>
          ))}
        </p>

        {/* Scroll hint — only while locked and not started */}
        {locked && litCount === 0 && (
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1,  y: 0 }}
            className="mt-8 text-[11px] tracking-[0.2em] text-gray-400 uppercase font-medium"
          >
            Scroll to reveal
          </motion.p>
        )}

        {/* Progress bar while highlighting */}
        {locked && litCount > 0 && (
          <div className="mt-8 w-48 mx-auto h-px bg-black/10 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gray-900 rounded-full"
              style={{ width: `${(litCount / WORDS.length) * 100}%` }}
              transition={{ ease: 'linear' }}
            />
          </div>
        )}

        {/* Author attribution */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.7, delay: 1.3 }}
          className="mt-12"
        >
          <p
            className="font-bold text-[15px] text-[#111]"
            style={{ fontFamily: "'DM Sans', sans-serif" }}
          >
            {OWNER.fullName}
          </p>
          <p
            className="text-[11px] tracking-[0.13em] text-gray-500 uppercase mt-1"
            style={{ fontFamily: "'DM Sans', sans-serif" }}
          >
            MERN Stack Developer &amp; Automation Engineer
          </p>
        </motion.div>
      </div>
    </section>
  )
}
