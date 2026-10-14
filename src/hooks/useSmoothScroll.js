import { useEffect } from 'react'
import Lenis from 'lenis'
import 'lenis/dist/lenis.css'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

/** Shared Lenis instance for route resets / programmatic scroll */
let lenisInstance = null

export function getLenis() {
  return lenisInstance
}

export function scrollToTop(immediate = true) {
  const lenis = lenisInstance
  if (lenis) {
    lenis.scrollTo(0, { immediate, force: true })
  } else {
    window.scrollTo({ top: 0, left: 0, behavior: immediate ? 'instant' : 'smooth' })
  }
  document.documentElement.scrollTop = 0
  document.body.scrollTop = 0
  ScrollTrigger.refresh()
}

export default function useSmoothScroll(enabled = true) {
  useEffect(() => {
    if (!enabled) return undefined
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined
    // Native scroll feels better on phones / touch devices
    if (window.matchMedia('(pointer: coarse)').matches) return undefined
    if (window.matchMedia('(max-width: 900px)').matches) return undefined

    const lenis = new Lenis({
      duration: 1.15,
      smoothWheel: true,
      touchMultiplier: 1.4,
      autoRaf: false,
    })

    lenisInstance = lenis
    lenis.on('scroll', ScrollTrigger.update)

    const ticker = (time) => {
      lenis.raf(time * 1000)
    }
    gsap.ticker.add(ticker)
    gsap.ticker.lagSmoothing(0)

    return () => {
      gsap.ticker.remove(ticker)
      lenis.destroy()
      if (lenisInstance === lenis) lenisInstance = null
      ScrollTrigger.refresh()
    }
  }, [enabled])
}
