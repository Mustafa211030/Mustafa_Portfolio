import React, { useEffect, useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const LETTERS = ['M','U','S','T','A','F','A',' ','S','A','E','E','D']
const ROLES   = ['MERN STACK DEVELOPER','AUTOMATION ENGINEER','AI SOLUTIONS ARCHITECT']

export default function Preloader({ onDone }: { onDone: () => void }) {
  const [progress,     setProgress]     = useState(0)
  const [roleIndex,    setRoleIndex]    = useState(0)
  const [litLetters,   setLitLetters]   = useState(0)
  const [phase,        setPhase]        = useState<'loading'|'reveal'|'exit'>('loading')
  const raf = useRef<ReturnType<typeof setTimeout>>()

  /* ── Phase 1: progress bar 0→100 in ~1.8s ── */
  useEffect(() => {
    let current = 0
    const tick = () => {
      current += Math.random() * 4 + 1.5
      if (current >= 100) {
        setProgress(100)
        setTimeout(() => setPhase('reveal'), 200)
        return
      }
      setProgress(Math.min(current, 100))
      raf.current = setTimeout(tick, 28)
    }
    raf.current = setTimeout(tick, 60)
    return () => { if (raf.current) clearTimeout(raf.current) }
  }, [])

  /* ── Phase 1b: cycle role text ── */
  useEffect(() => {
    if (phase !== 'loading') return
    const id = setInterval(() => setRoleIndex(i => (i + 1) % ROLES.length), 600)
    return () => clearInterval(id)
  }, [phase])

  /* ── Phase 2: light up letters one by one ── */
  useEffect(() => {
    if (phase !== 'reveal') return
    let i = 0
    const step = () => {
      i += 1
      setLitLetters(i)
      if (i < LETTERS.length) {
        raf.current = setTimeout(step, 80)
      } else {
        setTimeout(() => setPhase('exit'), 500)
      }
    }
    raf.current = setTimeout(step, 100)
    return () => { if (raf.current) clearTimeout(raf.current) }
  }, [phase])

  /* ── Phase 3: exit calls onDone ── */
  useEffect(() => {
    if (phase === 'exit') {
      setTimeout(onDone, 900)
    }
  }, [phase, onDone])

  return (
    <AnimatePresence>
      {phase !== 'exit' ? (
        <motion.div
          key="preloader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.04, filter: 'blur(12px)' }}
          transition={{ duration: 0.85, ease: [0.76, 0, 0.24, 1] }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center overflow-hidden"
          style={{ background: '#060a12' }}
        >
          {/* ── Ambient glows ── */}
          <div className="absolute inset-0 pointer-events-none">
            <motion.div
              animate={{ scale:[1,1.15,1], opacity:[0.12,0.22,0.12] }}
              transition={{ duration:4, repeat:Infinity, ease:'easeInOut' }}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
                         w-[600px] h-[600px] rounded-full"
              style={{ background:'radial-gradient(circle, rgba(37,99,235,0.35) 0%, transparent 70%)' }}
            />
            <motion.div
              animate={{ scale:[1.1,1,1.1], opacity:[0.08,0.16,0.08] }}
              transition={{ duration:5, repeat:Infinity, ease:'easeInOut', delay:1 }}
              className="absolute top-1/3 right-1/4 w-[300px] h-[300px] rounded-full"
              style={{ background:'radial-gradient(circle, rgba(139,92,246,0.3) 0%, transparent 70%)' }}
            />
          </div>

          {/* ── Grid lines ── */}
          <div className="absolute inset-0 pointer-events-none opacity-[0.03]"
            style={{
              backgroundImage:
                'linear-gradient(rgba(255,255,255,1) 1px, transparent 1px),' +
                'linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)',
              backgroundSize: '60px 60px',
            }}
          />

          {/* ── Content ── */}
          <div className="relative z-10 flex flex-col items-center select-none">

            {/* Logo mark */}
            <motion.div
              initial={{ scale:0, opacity:0, rotate:-180 }}
              animate={{ scale:1, opacity:1, rotate:0 }}
              transition={{ duration:0.7, ease:[0.34,1.56,0.64,1] }}
              className="w-16 h-16 rounded-2xl bg-blue-600 flex items-center justify-center
                         mb-10 shadow-2xl shadow-blue-600/40"
            >
              <span className="text-white font-black text-xl tracking-tight">MS</span>
            </motion.div>

            {/* Phase 1: loading state */}
            {phase === 'loading' && (
              <motion.div
                initial={{ opacity:0, y:16 }}
                animate={{ opacity:1, y:0 }}
                transition={{ duration:0.5, delay:0.3 }}
                className="flex flex-col items-center gap-5"
              >
                {/* Name static */}
                <div className="text-[clamp(36px,6vw,72px)] font-black tracking-tight leading-none">
                  <span className="text-blue-400">Mustafa</span>
                  <span className="text-white"> Saeed</span>
                </div>

                {/* Cycling role */}
                <AnimatePresence mode="wait">
                  <motion.p
                    key={roleIndex}
                    initial={{ opacity:0, y:8 }}
                    animate={{ opacity:1, y:0 }}
                    exit={{ opacity:0, y:-8 }}
                    transition={{ duration:0.3 }}
                    className="text-[11px] font-bold tracking-[0.3em] text-blue-400/80 uppercase"
                  >
                    {ROLES[roleIndex]}
                  </motion.p>
                </AnimatePresence>

                {/* Progress bar */}
                <div className="w-64 mt-4">
                  <div className="flex justify-between text-[10px] text-gray-600 mb-2 font-mono">
                    <span>LOADING</span>
                    <span>{Math.round(progress)}%</span>
                  </div>
                  <div className="h-[2px] bg-white/[0.06] rounded-full overflow-hidden">
                    <motion.div
                      className="h-full rounded-full"
                      style={{
                        background: 'linear-gradient(90deg, #2563EB, #8b5cf6)',
                        width: `${progress}%`,
                      }}
                      transition={{ ease:'linear' }}
                    />
                  </div>
                </div>

                {/* Dots */}
                <div className="flex gap-1.5 mt-2">
                  {[0,1,2].map(i => (
                    <motion.div
                      key={i}
                      animate={{ opacity:[0.2,1,0.2], scale:[0.8,1.2,0.8] }}
                      transition={{ duration:1, repeat:Infinity, delay:i*0.2 }}
                      className="w-1.5 h-1.5 rounded-full bg-blue-500"
                    />
                  ))}
                </div>
              </motion.div>
            )}

            {/* Phase 2: letter reveal */}
            {phase === 'reveal' && (
              <motion.div
                initial={{ opacity:0 }}
                animate={{ opacity:1 }}
                className="flex flex-col items-center gap-4"
              >
                <div className="flex items-center gap-1.5">
                  {LETTERS.map((letter, i) => (
                    <motion.span
                      key={i}
                      initial={{ opacity:0, y:30, rotateX:-90 }}
                      animate={i < litLetters
                        ? { opacity:1, y:0, rotateX:0 }
                        : { opacity:0.06, y:0, rotateX:0 }}
                      transition={{ duration:0.4, ease:[0.16,1,0.3,1] }}
                      className={`
                        font-black leading-none
                        ${letter === ' ' ? 'w-4' : 'text-[clamp(32px,5vw,64px)]'}
                        ${i < 7 ? 'text-blue-400' : 'text-white'}
                      `}
                      style={{ display:'inline-block', perspective:400 }}
                    >
                      {letter}
                    </motion.span>
                  ))}
                </div>

                <motion.p
                  initial={{ opacity:0 }}
                  animate={{ opacity: litLetters >= LETTERS.length ? 1 : 0 }}
                  transition={{ duration:0.5 }}
                  className="text-[11px] tracking-[0.3em] text-blue-400/70 uppercase font-bold"
                >
                  MERN Stack Developer
                </motion.p>

                {/* Horizontal line that expands */}
                <motion.div
                  initial={{ scaleX:0 }}
                  animate={{ scaleX: litLetters >= LETTERS.length ? 1 : 0 }}
                  transition={{ duration:0.6, ease:[0.16,1,0.3,1] }}
                  className="h-px w-48 bg-gradient-to-r from-transparent via-blue-500 to-transparent mt-2"
                  style={{ transformOrigin:'center' }}
                />
              </motion.div>
            )}
          </div>

          {/* Corner decorations */}
          {['top-6 left-6','top-6 right-6','bottom-6 left-6','bottom-6 right-6'].map((pos,i) => (
            <motion.div
              key={i}
              initial={{ opacity:0 }}
              animate={{ opacity:0.3 }}
              transition={{ delay:0.5+i*0.1 }}
              className={`absolute ${pos} w-6 h-6`}
            >
              <div className={`absolute w-6 h-px bg-blue-500/60 ${pos.includes('top') ? 'top-0' : 'bottom-0'}`}/>
              <div className={`absolute h-6 w-px bg-blue-500/60 ${pos.includes('left') ? 'left-0' : 'right-0'}`}/>
            </motion.div>
          ))}

          {/* Version tag */}
          <motion.div
            initial={{ opacity:0 }}
            animate={{ opacity:0.35 }}
            transition={{ delay:0.8 }}
            className="absolute bottom-8 right-10 text-[10px] font-mono text-gray-600 tracking-widest"
          >
            v2.0.26
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  )
}
