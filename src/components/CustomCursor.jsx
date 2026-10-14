import { useEffect, useRef } from 'react'
import gsap from 'gsap'

/** Soft trailing dot that grows over interactive targets — Awake-adjacent feel */
export default function CustomCursor() {
  const dotRef = useRef(null)
  const ringRef = useRef(null)

  useEffect(() => {
    const dot = dotRef.current
    const ring = ringRef.current
    if (!dot || !ring) return undefined
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined
    if (window.matchMedia('(pointer: coarse)').matches) return undefined

    document.documentElement.classList.add('aw-has-cursor')

    const xDot = gsap.quickTo(dot, 'x', { duration: 0.12, ease: 'power3' })
    const yDot = gsap.quickTo(dot, 'y', { duration: 0.12, ease: 'power3' })
    const xRing = gsap.quickTo(ring, 'x', { duration: 0.35, ease: 'power3' })
    const yRing = gsap.quickTo(ring, 'y', { duration: 0.35, ease: 'power3' })

    const onMove = (e) => {
      xDot(e.clientX)
      yDot(e.clientY)
      xRing(e.clientX)
      yRing(e.clientY)
    }

    const onOver = (e) => {
      const t = e.target.closest('a, button, [data-cursor], .aw-pill, .aw-need-option, .aw-svc-tab, .aw-project-card')
      if (t) {
        document.documentElement.classList.add('aw-cursor-hot')
      }
    }
    const onOut = (e) => {
      const t = e.target.closest('a, button, [data-cursor], .aw-pill, .aw-need-option, .aw-svc-tab, .aw-project-card')
      if (t) {
        document.documentElement.classList.remove('aw-cursor-hot')
      }
    }

    window.addEventListener('mousemove', onMove)
    document.addEventListener('mouseover', onOver)
    document.addEventListener('mouseout', onOut)

    return () => {
      document.documentElement.classList.remove('aw-has-cursor', 'aw-cursor-hot')
      window.removeEventListener('mousemove', onMove)
      document.removeEventListener('mouseover', onOver)
      document.removeEventListener('mouseout', onOut)
    }
  }, [])

  return (
    <>
      <div className="aw-cursor-dot" ref={dotRef} aria-hidden="true" />
      <div className="aw-cursor-ring" ref={ringRef} aria-hidden="true" />
    </>
  )
}
