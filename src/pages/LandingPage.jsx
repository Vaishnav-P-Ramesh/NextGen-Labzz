import { useEffect, useRef, useState, useCallback } from 'react'
import { Link } from 'react-router-dom'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import useSEO from '../hooks/useSEO'
import Magnetic from '../components/Magnetic'
import PhysicsTokens from '../components/PhysicsTokens'
import NeedSection from '../components/NeedSection'
import GooeyThumb from '../components/GooeyThumb'
import OrbitIcon from '../components/OrbitIcon'
import { SERVICES as SERVICE_DATA } from '../data/services'

import thewlpensImg from '../assets/works/thewlpens.png'
import westernStoreImg from '../assets/works/western-store.png'
import leadxImg from '../assets/works/leadx.png'
import codepunkImg from '../assets/works/codepunk.png'
import rjenterprisesImg from '../assets/works/rjenterprises.png'
import muskanRoyalImg from '../assets/works/google-project.png'

gsap.registerPlugin(ScrollTrigger)

const featuredProjects = [
  { title: 'The WL Pens', type: 'Development', image: thewlpensImg, url: 'https://www.thewlpens.com' },
  { title: 'Lead-X', type: 'Development', image: leadxImg, url: 'https://lead-x-three.vercel.app' },
  { title: 'Western Store', type: 'Web design', image: westernStoreImg, url: 'https://western-store.vercel.app' },
  { title: 'CodePunk 2.0', type: 'Development', image: codepunkImg, url: 'https://codepunk.droidclub.in' },
  { title: 'RJ Enterprises', type: 'Development', image: rjenterprisesImg, url: 'https://www.rjenterprisesinpune.services/' },
  { title: 'Muskan Royal Studio', type: 'Web design', image: muskanRoyalImg, url: 'https://share.google/UUy8wmIBT5jgztJWr' },
]

const projectList = [
  { title: 'RJ Enterprises', type: 'Development', year: '2025', url: 'https://www.rjenterprisesinpune.services/' },
  { title: 'Muskan Royal Studio', type: 'Web design', year: '2025', url: 'https://share.google/UUy8wmIBT5jgztJWr' },
  { title: 'Health Care Services', type: 'Development', year: '2025', url: 'https://health-care-services-three.vercel.app/' },
  { title: 'CodePunk v1.0', type: 'Development', year: '2024', url: 'https://code-punk-v1-0.vercel.app' },
  { title: 'Eye Winn', type: 'Web design', year: '2024', url: 'https://talenthunt-navy.vercel.app' },
]

const services = SERVICE_DATA.map((s, i) => ({
  number: String(i + 1).padStart(2, '0'),
  title: s.title,
  text: s.description,
  slug: s.slug,
}))

const HERO_WORDS = ['websites', 'social media', 'design', 'automation']

const MANIFESTO_A = [
  'We design and build',
  'websites, brand systems,',
  'and digital products that',
  'work as hard as they look.',
]

const MANIFESTO_B = [
  "Whether you're launching a",
  'product, rebuilding a brand, or',
  'replacing a tired site, one team',
  'takes it from sketch to live build.',
]

function fitWord(el, maxWidth) {
  if (!el || !maxWidth) return
  // Measure at full size, then shrink via --fit (font-size) so GSAP transforms stay free
  el.style.setProperty('--fit', '1')
  const natural = el.scrollWidth
  if (natural > maxWidth + 1) {
    el.style.setProperty('--fit', String(Math.max(0.52, (maxWidth / natural) * 0.98)))
  }
}

function HeroRotator({ ready }) {
  const [index, setIndex] = useState(0)
  const slotRef = useRef(null)
  const wordRefs = useRef([])
  const indexRef = useRef(0)
  const bootedRef = useRef(false)

  useEffect(() => {
    indexRef.current = index
  }, [index])

  const fitAll = useCallback(() => {
    const slot = slotRef.current
    if (!slot) return
    const max = slot.clientWidth
    wordRefs.current.forEach((el) => fitWord(el, max))
  }, [])

  useEffect(() => {
    fitAll()
    window.addEventListener('resize', fitAll)
    return () => window.removeEventListener('resize', fitAll)
  }, [fitAll])

  useEffect(() => {
    if (!ready) return undefined
    const words = wordRefs.current.filter(Boolean)
    if (!words.length) return undefined

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    fitAll()

    words.forEach((el, i) => {
      gsap.set(el, {
        yPercent: i === 0 ? 0 : 110,
        opacity: i === 0 ? 1 : 0,
        force3D: true,
      })
    })

    if (!reduced && !bootedRef.current) {
      bootedRef.current = true
      gsap.fromTo(
        words[0],
        { yPercent: 110, opacity: 0 },
        { yPercent: 0, opacity: 1, duration: 0.9, ease: 'power3.out', delay: 0.18 }
      )
    }

    return undefined
  }, [ready, fitAll])

  useEffect(() => {
    if (!ready) return undefined

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const id = window.setInterval(() => {
      const prev = indexRef.current
      const next = (prev + 1) % HERO_WORDS.length
      const prevEl = wordRefs.current[prev]
      const nextEl = wordRefs.current[next]
      if (!prevEl || !nextEl) {
        setIndex(next)
        return
      }

      if (reduced) {
        gsap.set(prevEl, { opacity: 0, yPercent: -110 })
        gsap.set(nextEl, { opacity: 1, yPercent: 0 })
        setIndex(next)
        return
      }

      const tl = gsap.timeline({
        onComplete: () => setIndex(next),
      })
      tl.to(prevEl, { yPercent: -110, opacity: 0, duration: 0.48, ease: 'power2.in' }, 0)
        .fromTo(
          nextEl,
          { yPercent: 110, opacity: 0 },
          { yPercent: 0, opacity: 1, duration: 0.55, ease: 'power3.out' },
          0.12
        )
    }, 3000)

    return () => window.clearInterval(id)
  }, [ready])

  return (
    <span className="aw-hero-cell aw-hero-rotate" ref={slotRef} aria-hidden="true">
      {HERO_WORDS.map((word, i) => (
        <em
          key={word}
          ref={(el) => {
            wordRefs.current[i] = el
          }}
          className={i === index ? 'is-active' : ''}
          data-long={word.includes(' ') || word.length > 9 ? 'true' : 'false'}
        >
          {word}
        </em>
      ))}
    </span>
  )
}

function useLocalClock() {
  const [now, setNow] = useState(() => new Date())
  useEffect(() => {
    const id = window.setInterval(() => setNow(new Date()), 30000)
    return () => window.clearInterval(id)
  }, [])
  const time = now.toLocaleTimeString('en-IN', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
    timeZone: 'Asia/Kolkata',
  })
  return time
}

function Preloader({ done }) {
  const [pct, setPct] = useState(0)
  const barRef = useRef(null)

  useEffect(() => {
    let frame = 0
    const id = window.setInterval(() => {
      frame += 1
      setPct((p) => {
        const next = Math.min(100, p + (p < 70 ? 5 : p < 92 ? 2 : 1))
        if (next >= 100) window.clearInterval(id)
        return next
      })
      if (frame > 70) window.clearInterval(id)
    }, 24)
    return () => window.clearInterval(id)
  }, [])

  useEffect(() => {
    if (barRef.current) {
      gsap.to(barRef.current, { scaleX: pct / 100, duration: 0.2, ease: 'power1.out' })
    }
  }, [pct])

  useEffect(() => {
    if (pct < 100) return undefined
    const t = window.setTimeout(done, 320)
    return () => window.clearTimeout(t)
  }, [pct, done])

  return (
    <div className={`aw-preloader ${pct >= 100 ? 'aw-preloader-exit' : ''}`} aria-hidden={pct >= 100}>
      <div className="aw-preloader-bar" ref={barRef} />
      <span>{pct}%</span>
    </div>
  )
}

/** Awake deck poses — past cards peek above with fan tilts; next slides up from below */
function cardPose(offset) {
  // offset = index - active
  if (offset === 0) {
    return { x: 0, y: 0, rotate: -1.4, scale: 1, opacity: 1, zIndex: 60 }
  }

  // Future cards — waiting below the stack
  if (offset > 0) {
    const step = Math.min(offset, 3)
    return {
      x: step % 2 === 0 ? 6 : -4,
      y: 72 + step * 48,
      rotate: 3.5 + step * 1.2,
      scale: 0.97,
      opacity: step === 1 ? 1 : 0,
      zIndex: 20 - step,
    }
  }

  // Past cards — stacked behind, top strip peeking above (Awake deck)
  const step = Math.min(Math.abs(offset), 4)
  const tilts = [-6.5, 5.2, -4.8, 7]
  const xs = [-22, 24, -16, 28]
  return {
    x: xs[step - 1] ?? (step % 2 ? 18 : -18),
    y: -(28 + step * 20),
    rotate: tilts[step - 1] ?? (step % 2 ? 5 : -5),
    scale: 1 - step * 0.01,
    opacity: step > 3 ? 0 : 1,
    zIndex: 60 - step,
  }
}

const CARD_EASE = 'power3.out'
const CARD_LOCK_MS = 720

function ServiceStack() {
  const [active, setActive] = useState(0)
  const stackRef = useRef(null)
  const cardsRef = useRef([])
  const lockRef = useRef(false)
  const activeRef = useRef(0)
  const wheelAcc = useRef(0)
  const primed = useRef(false)
  const last = services.length - 1

  useEffect(() => {
    activeRef.current = active
  }, [active])

  const goTo = useCallback((next) => {
    const clamped = Math.max(0, Math.min(last, next))
    if (clamped === activeRef.current || lockRef.current) return false
    lockRef.current = true
    setActive(clamped)
    window.setTimeout(() => {
      lockRef.current = false
    }, CARD_LOCK_MS)
    return true
  }, [last])

  useEffect(() => {
    const el = stackRef.current
    if (!el) return undefined

    const onWheel = (e) => {
      if (Math.abs(e.deltaY) < 4) return
      const dir = e.deltaY > 0 ? 1 : -1
      const atStart = activeRef.current === 0 && dir < 0
      const atEnd = activeRef.current === last && dir > 0
      // Release page scroll at the ends of the deck
      if (atStart || atEnd) return
      if (lockRef.current) {
        e.preventDefault()
        return
      }

      e.preventDefault()
      wheelAcc.current += e.deltaY
      if (Math.abs(wheelAcc.current) < 28) return
      wheelAcc.current = 0
      goTo(activeRef.current + dir)
    }

    let startY = 0
    const onTouchStart = (e) => {
      startY = e.touches[0].clientY
    }
    const onTouchEnd = (e) => {
      const dy = e.changedTouches[0].clientY - startY
      if (Math.abs(dy) < 42) return
      const dir = dy < 0 ? 1 : -1
      const atStart = activeRef.current === 0 && dir < 0
      const atEnd = activeRef.current === last && dir > 0
      if (atStart || atEnd) return
      goTo(activeRef.current + dir)
    }

    el.addEventListener('wheel', onWheel, { passive: false })
    el.addEventListener('touchstart', onTouchStart, { passive: true })
    el.addEventListener('touchend', onTouchEnd, { passive: true })
    return () => {
      el.removeEventListener('wheel', onWheel)
      el.removeEventListener('touchstart', onTouchStart)
      el.removeEventListener('touchend', onTouchEnd)
    }
  }, [goTo, last])

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const instant = !primed.current
    primed.current = true

    cardsRef.current.forEach((card, i) => {
      if (!card) return
      const offset = i - active
      const pose = cardPose(offset)
      const dist = Math.abs(offset)
      const props = {
        x: pose.x,
        y: pose.y,
        rotate: pose.rotate,
        scale: pose.scale,
        opacity: pose.opacity,
        zIndex: pose.zIndex,
        transformOrigin: '50% 100%',
      }

      if (reduced || instant) {
        gsap.set(card, props)
        return
      }

      // Incoming card rises from below; past cards settle into fan peek
      const duration = offset === 0 ? 0.78 : 0.7 + dist * 0.05
      gsap.to(card, {
        ...props,
        duration,
        ease: CARD_EASE,
        overwrite: 'auto',
      })
    })
  }, [active])

  return (
    <div className="aw-service-stack" ref={stackRef}>
      <div className="aw-service-deck" aria-live="polite">
        {services.map((service, i) => (
          <article
            key={service.number}
            ref={(el) => {
              cardsRef.current[i] = el
            }}
            className={`aw-service-card ${i === active ? 'is-active' : ''}`}
            style={{ pointerEvents: i === active ? 'auto' : 'none' }}
            aria-hidden={i !== active}
            onClick={() => goTo(i)}
          >
            <span>{service.number}</span>
            <h3>{service.title}</h3>
            <p>{service.text}</p>
            <div className="aw-service-card-foot">
              <Magnetic strength={0.3}>
                <Link to={`/services/${service.slug}`} className="aw-pill aw-pill-dark">
                  more information
                </Link>
              </Magnetic>
              <OrbitIcon />
            </div>
          </article>
        ))}
      </div>
      <div className="aw-service-dots" role="tablist" aria-label="Services">
        {services.map((s, i) => (
          <button
            key={s.number}
            type="button"
            role="tab"
            aria-selected={i === active}
            className={i === active ? 'is-active' : ''}
            aria-label={`Show ${s.title}`}
            onClick={() => goTo(i)}
          />
        ))}
      </div>
    </div>
  )
}

function LandingPage() {
  const [booted, setBooted] = useState(false)
  const rootRef = useRef(null)
  const swirlRef = useRef(null)
  const manifestoRef = useRef(null)
  const onBooted = useCallback(() => setBooted(true), [])
  const clock = useLocalClock()

  useSEO({
    title: 'NextGen Labz | Creative digital studio',
    description:
      'NextGen Labz designs and builds premium websites, brand systems, and growth products for founders and teams who need to stand out.',
    keywords: 'NextGen Labz, website design, branding, digital marketing, creative studio',
    canonical: 'https://www.nextgenlabz.studio/',
  })

  useEffect(() => {
    if (!booted) document.body.style.overflow = 'hidden'
    else document.body.style.overflow = ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [booted])

  useEffect(() => {
    if (!booted || !rootRef.current) return undefined
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const root = rootRef.current
    const staticWords = [
      ...root.querySelectorAll('.aw-hero-we em, .aw-hero-build em, .aw-hero-people em, .aw-hero-remember em'),
    ]
    const meta = root.querySelectorAll('.aw-hero-copy, .aw-hero-bar span, .aw-hero-bar a')

    if (reduced) return undefined

    const ctx = gsap.context(() => {
      gsap.set(staticWords, { yPercent: 110, opacity: 0 })
      gsap.set(meta, { y: 18, opacity: 0 })
      gsap
        .timeline({ defaults: { ease: 'power3.out' } })
        .to(staticWords, { yPercent: 0, opacity: 1, duration: 0.9, stagger: 0.07 })
        .to(meta, { y: 0, opacity: 1, duration: 0.55, stagger: 0.06 }, '-=0.35')
    }, root)

    return () => ctx.revert()
  }, [booted])

  useEffect(() => {
    if (!booted || !rootRef.current) return undefined
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined

    const root = rootRef.current
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

      gsap.utils.toArray('.aw-project-card', root).forEach((card, i) => {
        gsap.from(card, {
          y: 64,
          opacity: 0,
          duration: 0.8,
          delay: (i % 2) * 0.06,
          ease: 'power3.out',
          scrollTrigger: { trigger: card, start: 'top 90%' },
        })
      })

      // Swirl rings parallax
      if (swirlRef.current) {
        gsap.to(swirlRef.current, {
          yPercent: -18,
          rotate: 12,
          ease: 'none',
          scrollTrigger: {
            trigger: '.aw-projects',
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          },
        })
      }

      // Awake Statement — sticky scrub: text break / reform + shape morph
      if (manifestoRef.current) {
        const blockA = manifestoRef.current.querySelector('.aw-mani-a')
        const blockB = manifestoRef.current.querySelector('.aw-mani-b')
        const wordsA = manifestoRef.current.querySelectorAll('.aw-mani-a .aw-mani-word')
        const wordsB = manifestoRef.current.querySelectorAll('.aw-mani-b .aw-mani-word')
        const art = manifestoRef.current.querySelector('.aw-manifesto-art')
        const circle = manifestoRef.current.querySelector('.aw-mani-circle')
        const glass = manifestoRef.current.querySelector('.aw-mani-glass')
        const outline = manifestoRef.current.querySelector('.aw-mani-outline')
        const handles = manifestoRef.current.querySelectorAll('.aw-mani-handle')

        gsap.set(blockA, { transformOrigin: '50% 50%' })
        gsap.set(blockB, {
          opacity: 0,
          xPercent: 55,
          scale: 1.35,
          rotateY: -28,
          transformOrigin: '50% 50%',
        })
        gsap.set(wordsB, { opacity: 0 })
        gsap.set(art, { xPercent: 18, scale: 0.92, opacity: 0.55 })
        gsap.set(circle, { scale: 0.85, opacity: 0.35 })
        gsap.set(glass, { opacity: 0.25, scaleY: 1.1 })
        gsap.set(outline, { opacity: 0.4, scale: 0.96 })
        gsap.set(handles, { opacity: 0.7 })

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: manifestoRef.current,
            start: 'top top',
            end: 'bottom bottom',
            scrub: 0.55,
            invalidateOnRefresh: true,
          },
        })

        // Hold first statement
        tl.to({}, { duration: 0.12 })
          // A collapses left / scatters while B floods in from the right
          .to(
            blockA,
            {
              xPercent: -42,
              scale: 0.42,
              opacity: 0,
              rotateY: 18,
              ease: 'none',
              duration: 0.42,
            },
            0.14
          )
          .to(
            wordsA,
            {
              x: (i) => (i % 3 === 0 ? -28 : i % 3 === 1 ? 12 : -8),
              y: (i) => (i % 2 === 0 ? -10 : 14),
              opacity: 0,
              stagger: 0.008,
              ease: 'none',
              duration: 0.36,
            },
            0.16
          )
          .to(
            blockB,
            {
              opacity: 1,
              xPercent: 0,
              scale: 1,
              rotateY: 0,
              ease: 'none',
              duration: 0.48,
            },
            0.22
          )
          .to(
            wordsB,
            {
              opacity: 1,
              stagger: 0.012,
              ease: 'none',
              duration: 0.28,
            },
            0.26
          )
          // Shapes settle left under reformed copy
          .to(
            art,
            { xPercent: -28, scale: 1, opacity: 1, ease: 'none', duration: 0.55 },
            0.18
          )
          .to(
            circle,
            { scale: 1, opacity: 0.55, xPercent: -8, ease: 'none', duration: 0.55 },
            0.18
          )
          .to(
            glass,
            {
              opacity: 0.45,
              scaleY: 1,
              xPercent: -6,
              borderRadius: 2,
              ease: 'none',
              duration: 0.55,
            },
            0.18
          )
          .to(outline, { opacity: 0.75, scale: 1, ease: 'none', duration: 0.45 }, 0.28)
          .to(handles, { opacity: 1, ease: 'none', duration: 0.3 }, 0.3)
          .to({}, { duration: 0.18 })
      }

      // Panel soft scale on enter (skip pinned manifesto)
      gsap.utils.toArray('.aw-panel', root).forEach((panel) => {
        if (panel.classList.contains('aw-manifesto')) return
        gsap.from(panel, {
          scale: 0.985,
          duration: 0.9,
          ease: 'power2.out',
          scrollTrigger: { trigger: panel, start: 'top 92%' },
        })
      })
    }, root)

    return () => ctx.revert()
  }, [booted])

  return (
    <>
      {!booted && <Preloader done={onBooted} />}

      <main ref={rootRef} className={`aw-home ${booted ? 'aw-home-ready' : ''}`}>
        <section className="aw-hero aw-panel aw-panel-purple">
          {booted && <PhysicsTokens />}

          <h1 className="aw-hero-title" aria-label="We build websites, social media, design, and automation people remember.">
            <span className="aw-hero-cell aw-hero-we">
              <span className="aw-hero-line"><em>We</em></span>
            </span>
            <span className="aw-hero-cell aw-hero-build">
              <span className="aw-hero-line"><em>build</em></span>
            </span>
            <HeroRotator ready={booted} />
            <span className="aw-hero-cell aw-hero-people">
              <span className="aw-hero-line"><em>people</em></span>
            </span>
            <span className="aw-hero-cell aw-hero-remember">
              <span className="aw-hero-line"><em>remember.</em></span>
            </span>
          </h1>

          <p className="aw-hero-copy">
            NextGen Labz is a creative digital studio. We design and build premium websites and web
            products for founders and product teams who need to stand out.
          </p>

          <div className="aw-hero-bar">
            <span>Based in: India {clock}</span>
            <a href="mailto:hello@nextgenlabz.com">Say hello: hello@nextgenlabz.com</a>
          </div>
        </section>

        <section
          className="aw-manifesto aw-panel"
          ref={manifestoRef}
          aria-label="We design and build websites, brand systems, and digital products that work as hard as they look. Whether you're launching a product, rebuilding a brand, or replacing a tired site, one team takes it from sketch to live build."
        >
          <div className="aw-manifesto-sticky">
            <div className="aw-manifesto-mark" aria-hidden="true">
              <span />
            </div>

            <div className="aw-manifesto-art" aria-hidden="true">
              <div className="aw-mani-circle" />
              <div className="aw-mani-glass">
                <i className="aw-mani-handle aw-h-tl" />
                <i className="aw-mani-handle aw-h-tm" />
                <i className="aw-mani-handle aw-h-tr" />
                <i className="aw-mani-handle aw-h-ml" />
                <i className="aw-mani-handle aw-h-mr" />
                <i className="aw-mani-handle aw-h-bl" />
                <i className="aw-mani-handle aw-h-bm" />
                <i className="aw-mani-handle aw-h-br" />
              </div>
              <div className="aw-mani-outline">
                <i className="aw-mani-handle aw-h-tl" />
                <i className="aw-mani-handle aw-h-tr" />
                <i className="aw-mani-handle aw-h-bl" />
                <i className="aw-mani-handle aw-h-br" />
              </div>
              <i className="aw-mani-handle aw-h-float-a" />
              <i className="aw-mani-handle aw-h-float-b" />
              <i className="aw-mani-handle aw-h-float-c" />
            </div>

            <div className="aw-manifesto-copy" aria-hidden="true">
              <div className="aw-mani-block aw-mani-a">
                {MANIFESTO_A.map((line) => (
                  <p className="aw-mani-line" key={line}>
                    {line.split(' ').map((word, wi, arr) => (
                      <span className="aw-mani-word" key={`${line}-${wi}`}>
                        {word}
                        {wi < arr.length - 1 ? '\u00A0' : ''}
                      </span>
                    ))}
                  </p>
                ))}
              </div>
              <div className="aw-mani-block aw-mani-b">
                {MANIFESTO_B.map((line) => (
                  <p className="aw-mani-line" key={line}>
                    {line.split(' ').map((word, wi, arr) => (
                      <span className="aw-mani-word" key={`${line}-${wi}`}>
                        {word}
                        {wi < arr.length - 1 ? '\u00A0' : ''}
                      </span>
                    ))}
                  </p>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="aw-projects aw-panel aw-panel-white" id="works">
          <div className="aw-projects-swirl" ref={swirlRef} aria-hidden="true">
            <svg viewBox="0 0 800 500" fill="none">
              <ellipse className="aw-swirl-ring" cx="220" cy="240" rx="190" ry="170" />
              <ellipse className="aw-swirl-ring" cx="520" cy="260" rx="230" ry="200" />
              <ellipse className="aw-swirl-ring aw-swirl-ring-sm" cx="400" cy="200" rx="120" ry="100" />
            </svg>
          </div>
          <h2 className="aw-section-title" data-reveal>Our projects</h2>

          <div className="aw-project-gallery">
            {featuredProjects.slice(0, 4).map((project, i) => (
              <a
                key={project.title}
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`aw-project-card aw-project-card-${i + 1}`}
              >
                <GooeyThumb src={project.image} alt={`${project.title} preview`} />
                <div className="aw-project-caption">
                  <span>{project.type}</span>
                  <strong>{project.title}</strong>
                </div>
              </a>
            ))}
          </div>

          <div className="aw-project-list-wrap" data-reveal>
            <ul className="aw-project-list">
              {projectList.map((project) => (
                <li key={project.title}>
                  <a href={project.url} target="_blank" rel="noopener noreferrer">
                    <strong>{project.title}</strong>
                    <span>
                      {project.type} · {project.year}
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="aw-projects-cta" data-reveal>
            <Magnetic strength={0.38}>
              <Link to="/services" className="aw-pill aw-pill-dark">
                View all
              </Link>
            </Magnetic>
          </div>
        </section>

        <section className="aw-services aw-panel aw-panel-black" id="services">
          <h2 className="aw-section-title aw-section-title-light" data-reveal>Services</h2>
          <ServiceStack />
        </section>

        <NeedSection />
      </main>
    </>
  )
}

export default LandingPage
