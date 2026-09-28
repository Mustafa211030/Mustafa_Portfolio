import type { Variants } from 'framer-motion'

export const EASE = [0.16, 1, 0.3, 1] as const

export const fadeUp = (delay = 0, y = 28): Variants => ({
  hidden:  { opacity: 0, y },
  visible: { opacity: 1, y: 0, transition: { duration: 0.65, delay, ease: EASE } },
})

export const slideLeft = (delay = 0): Variants => ({
  hidden:  { opacity: 0, x: -40 },
  visible: { opacity: 1, x: 0,  transition: { duration: 0.7, delay, ease: EASE } },
})

export const slideRight = (delay = 0): Variants => ({
  hidden:  { opacity: 0, x: 40 },
  visible: { opacity: 1, x: 0,  transition: { duration: 0.7, delay, ease: EASE } },
})

export const scaleIn = (delay = 0): Variants => ({
  hidden:  { opacity: 0, scale: 0.88 },
  visible: { opacity: 1, scale: 1,   transition: { duration: 0.55, delay, ease: EASE } },
})

export const staggerContainer = (stagger = 0.13): Variants => ({
  hidden:  {},
  visible: { transition: { staggerChildren: stagger } },
})

export const staggerItem: Variants = {
  hidden:  { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: EASE } },
}
