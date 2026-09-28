import { useEffect, useRef, useState } from 'react'

export function useTypewriter(
  phrases: string[],
  typingSpeed = 85,
  deletingSpeed = 55,
  pauseMs = 2400
) {
  const [displayed,   setDisplayed]   = useState('')
  const [phraseIdx,   setPhraseIdx]   = useState(0)
  const [isDeleting,  setIsDeleting]  = useState(false)
  const charRef = useRef(0)

  useEffect(() => {
    const current = phrases[phraseIdx]
    let timeout: ReturnType<typeof setTimeout>

    if (!isDeleting) {
      if (charRef.current < current.length) {
        timeout = setTimeout(() => {
          charRef.current++
          setDisplayed(current.slice(0, charRef.current))
        }, typingSpeed)
      } else {
        timeout = setTimeout(() => setIsDeleting(true), pauseMs)
      }
    } else {
      if (charRef.current > 0) {
        timeout = setTimeout(() => {
          charRef.current--
          setDisplayed(current.slice(0, charRef.current))
        }, deletingSpeed)
      } else {
        setIsDeleting(false)
        setPhraseIdx(i => (i + 1) % phrases.length)
      }
    }

    return () => clearTimeout(timeout)
  }, [displayed, isDeleting, phraseIdx, phrases, typingSpeed, deletingSpeed, pauseMs])

  return displayed
}
