import { useEffect, useRef, useState } from 'react'

export function useScrollProgress<T extends HTMLElement>() {
  const ref = useRef<T>(null)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const calc = () => {
      const { top, height } = el.getBoundingClientRect()
      const vh = window.innerHeight
      setProgress(Math.max(0, Math.min(1, (vh - top) / (vh + height * 0.3))))
    }

    calc()
    window.addEventListener('scroll', calc, { passive: true })
    window.addEventListener('resize', calc, { passive: true })
    return () => {
      window.removeEventListener('scroll', calc)
      window.removeEventListener('resize', calc)
    }
  }, [])

  return [ref, progress] as const
}
