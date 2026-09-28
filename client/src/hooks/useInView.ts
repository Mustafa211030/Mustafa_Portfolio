import { useEffect, useRef, useState } from 'react'

export function useInView<T extends Element>(
  options: IntersectionObserverInit & { freezeOnceVisible?: boolean } = {}
) {
  const { threshold = 0.12, root = null, rootMargin = '0px', freezeOnceVisible = true } = options
  const ref     = useRef<T>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el || (freezeOnceVisible && visible)) return

    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          if (freezeOnceVisible) obs.disconnect()
        } else if (!freezeOnceVisible) {
          setVisible(false)
        }
      },
      { threshold, root, rootMargin }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [threshold, root, rootMargin, freezeOnceVisible, visible])

  return [ref, visible] as const
}
