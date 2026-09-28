import React, { useEffect, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

export default function CustomCursor() {
  const cursorX = useMotionValue(-100)
  const cursorY = useMotionValue(-100)
  const [variant, setVariant] = useState<'default' | 'hover' | 'click'>('default')
  const [visible, setVisible] = useState(false)

  const springCfg = { damping: 28, stiffness: 500, mass: 0.4 }
  const dotCfg = { damping: 38, stiffness: 700, mass: 0.2 }

  const x = useSpring(cursorX, springCfg)
  const y = useSpring(cursorY, springCfg)
  const dx = useSpring(cursorX, dotCfg)
  const dy = useSpring(cursorY, dotCfg)

  useEffect(() => {
    const move = (e: MouseEvent) => {
      cursorX.set(e.clientX)
      cursorY.set(e.clientY)
      if (!visible) setVisible(true)
    }
    const down = () => setVariant('click')
    const up = () => setVariant('default')
    const leave = () => setVisible(false)
    const enter = () => setVisible(true)

    const checkHover = (e: MouseEvent) => {
      const el = e.target as HTMLElement
      if (!el) return
      const isHoverable = el.closest('a, button, [data-cursor="pointer"], input, textarea, select')
      setVariant(isHoverable ? 'hover' : 'default')
    }

    window.addEventListener('mousemove', move, { passive: true })
    window.addEventListener('mousemove', checkHover, { passive: true })
    window.addEventListener('mousedown', down, { passive: true })
    window.addEventListener('mouseup', up, { passive: true })
    window.document.body.addEventListener('mouseleave', leave)
    window.document.body.addEventListener('mouseenter', enter)

    return () => {
      window.removeEventListener('mousemove', move)
      window.removeEventListener('mousemove', checkHover)
      window.removeEventListener('mousedown', down)
      window.removeEventListener('mouseup', up)
      window.document.body.removeEventListener('mouseleave', leave)
      window.document.body.removeEventListener('mouseenter', enter)
    }
  }, [visible, cursorX, cursorY])

  // Hide on touch devices safely
  if (typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches) return null

  const ringSize = variant === 'hover' ? 42 : variant === 'click' ? 20 : 32
  const dotSize = variant === 'hover' ? 0 : variant === 'click' ? 6 : 6
  const ringOpacity = variant === 'hover' ? 0.6 : 0.35

  return (
    <div
      className="pointer-events-none fixed inset-0 z-[9999]"
      style={{ opacity: visible ? 1 : 0, transition: 'opacity 0.3s' }}
    >
      {/* Outer ring */}
      <motion.div
        animate={{ width: ringSize, height: ringSize, opacity: ringOpacity }}
        transition={{ duration: 0.2 }}
        className="fixed top-0 left-0 rounded-full border border-blue-400"
        style={{
          x,
          y,
          width: ringSize,
          height: ringSize,
          translateX: '-50%',
          translateY: '-50%',
        } as any}
      />

      {/* Inner dot */}
      <motion.div
        animate={{ width: dotSize, height: dotSize }}
        transition={{ duration: 0.15 }}
        className="fixed top-0 left-0 rounded-full bg-blue-400"
        style={{
          x: dx,
          y: dy,
          width: dotSize,
          height: dotSize,
          translateX: '-50%',
          translateY: '-50%',
        } as any}
      />

      {/* Hover label ring */}
      {variant === 'hover' && (
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0, opacity: 0 }}
          style={{ x, y, translateX: '-50%', translateY: '-50%' } as any}
          className="fixed top-0 left-0 w-[42px] h-[42px] rounded-full bg-blue-500/15 backdrop-blur-sm"
        />
      )}
    </div>
  )
}