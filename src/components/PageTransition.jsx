import { useEffect, useRef, useState } from 'react'
import { useLocation } from 'react-router-dom'
import gsap from 'gsap'

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
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined

    const curtain = curtainRef.current
    const title = titleRef.current
    if (!curtain || !title) return undefined

    const next = titleFor(location.pathname)
    setLabel(next)

    const tl = gsap.timeline()
    tl.set(curtain, { yPercent: 100, autoAlpha: 1 })
      .set(title, { yPercent: 40, opacity: 0 })
      .to(curtain, { yPercent: 0, duration: 0.55, ease: 'power3.inOut' })
      .to(title, { yPercent: 0, opacity: 1, duration: 0.4, ease: 'power3.out' }, '-=0.2')
      .to(title, { yPercent: -30, opacity: 0, duration: 0.35, ease: 'power2.in' }, '+=0.18')
      .to(curtain, { yPercent: -100, duration: 0.55, ease: 'power3.inOut' }, '-=0.1')
      .set(curtain, { autoAlpha: 0, yPercent: 100 })

    return () => tl.kill()
  }, [location.pathname])

  return (
    <div className="aw-curtain" ref={curtainRef} aria-hidden="true">
      <span className="aw-curtain-title" ref={titleRef}>
        {label}
      </span>
    </div>
  )
}
