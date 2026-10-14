import { useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

/** Scroll-triggered fade/slide for [data-reveal] and [data-reveal-stagger] children */
export default function useReveal(rootRef, deps = []) {
  useEffect(() => {
    const root = rootRef?.current
    if (!root) return undefined
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined

    const ctx = gsap.context(() => {
      gsap.utils.toArray('[data-reveal]', root).forEach((el) => {
        gsap.from(el, {
          y: 48,
          opacity: 0,
          duration: 0.85,
          ease: 'power3.out',
          scrollTrigger: { trigger: el, start: 'top 88%' },
        })
      })

      gsap.utils.toArray('[data-reveal-stagger]', root).forEach((group) => {
        const kids = group.children
        gsap.from(kids, {
          y: 36,
          opacity: 0,
          duration: 0.7,
          stagger: 0.08,
          ease: 'power3.out',
          scrollTrigger: { trigger: group, start: 'top 85%' },
        })
      })
    }, root)

    return () => ctx.revert()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps)
}
