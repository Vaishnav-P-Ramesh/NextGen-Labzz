import { useEffect, useRef, useState } from 'react'
import { useLocation } from 'react-router-dom'
import gsap from 'gsap'
import { scrollToTop } from '../hooks/useSmoothScroll'

const TITLE_MAP = {
  '/': 'NextGen Labz',
  '/about': 'About',
  '/contact': 'Contact',
  '/quote': 'Quote',
  '/services': 'Services',
  '/services/website-design-development': 'Website Design',
  '/services/ux-ui-design': 'UX/UI Design',
  '/services/branding': 'Branding',
  '/services/digital-marketing': 'Marketing',
}

function titleFor(path) {
  if (TITLE_MAP[path]) return TITLE_MAP[path]
  if (path.startsWith('/services/')) {
    return path
      .replace('/services/', '')
      .split('-')
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
      .join(' ')
  }
  return 'NextGen Labz'
}

/** Awake-style purple curtain wipe on route change */
export default function PageTransition() {
  const location = useLocation()
  const curtainRef = useRef(null)
  const titleRef = useRef(null)
  const first = useRef(true)
  const [label, setLabel] = useState(() => titleFor(location.pathname))

  useEffect(() => {
    if (first.current) {
      first.current = false
      return undefined
    }
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      scrollToTop(true)
      return undefined
    }

    const curtain = curtainRef.current
    const title = titleRef.current
    if (!curtain || !title) return undefined

    const next = titleFor(location.pathname)
    setLabel(next)

    // Shorter wipe on small screens so navigation feels snappier
    const compact = window.matchMedia('(max-width: 700px)').matches
    const up = compact ? 0.38 : 0.55
    const hold = compact ? 0.22 : 0.4
    const down = compact ? 0.38 : 0.55

    const tl = gsap.timeline({
      onComplete: () => {
        gsap.set(curtain, { autoAlpha: 0, yPercent: 100 })
      },
    })
    tl.set(curtain, { yPercent: 100, autoAlpha: 1 })
      .set(title, { yPercent: 40, opacity: 0 })
      .to(curtain, { yPercent: 0, duration: up, ease: 'power3.inOut' })
      // While curtain covers the viewport, jump to top of the new page
      .add(() => scrollToTop(true))
      .to(title, { yPercent: 0, opacity: 1, duration: hold, ease: 'power3.out' }, '-=0.15')
      .to(title, { yPercent: -30, opacity: 0, duration: compact ? 0.22 : 0.35, ease: 'power2.in' }, compact ? '+=0.08' : '+=0.18')
      .to(curtain, { yPercent: -100, duration: down, ease: 'power3.inOut' }, '-=0.08')
      .set(curtain, { autoAlpha: 0, yPercent: 100 })

    return () => {
      tl.kill()
      gsap.set(curtain, { autoAlpha: 0, yPercent: 100, clearProps: 'transform' })
      gsap.set(title, { clearProps: 'all' })
    }
  }, [location.pathname])

  return (
    <div className="aw-curtain" ref={curtainRef} aria-hidden="true">
      <span className="aw-curtain-title" ref={titleRef}>
        {label}
      </span>
    </div>
  )
}
