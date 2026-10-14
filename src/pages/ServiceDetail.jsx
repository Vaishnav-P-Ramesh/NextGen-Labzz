import { useEffect, useRef, useState } from 'react'
import { Link, useParams, Navigate } from 'react-router-dom'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import useSEO from '../hooks/useSEO'
import useReveal from '../hooks/useReveal'
import Magnetic from '../components/Magnetic'
import NeedSection from '../components/NeedSection'
import { getServiceBySlug, HOW_WE_WORK, SERVICES } from '../data/services'

gsap.registerPlugin(ScrollTrigger)

export default function ServiceDetail() {
  const { slug } = useParams()
  const service = getServiceBySlug(slug)
  const [activeStep, setActiveStep] = useState(0)
  const rootRef = useRef(null)
  const stepPanelRef = useRef(null)
  const howRef = useRef(null)

  useSEO({
    title: service
      ? `${service.title} · NextGen Labz`
      : 'Service · NextGen Labz',
    description: service?.description || 'NextGen Labz services',
    canonical: service
      ? `https://www.nextgenlabz.studio/services/${service.slug}`
      : 'https://www.nextgenlabz.studio/services',
  })

  useReveal(rootRef, [slug])

  useEffect(() => {
    setActiveStep(0)
  }, [slug])

  useEffect(() => {
    const panel = stepPanelRef.current
    if (!panel) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    gsap.fromTo(
      panel.children,
      { y: 22, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.45, stagger: 0.06, ease: 'power3.out' }
    )
  }, [activeStep, slug])

  useEffect(() => {
    const root = howRef.current
    if (!root) return undefined
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined

    const cards = root.querySelectorAll('.aw-svc-how-card')
    const ctx = gsap.context(() => {
      gsap.fromTo(
        cards,
        {
          y: 80,
          rotate: (i) => (i % 2 === 0 ? -4 : 5),
          opacity: 0,
        },
        {
          y: (i) => (i % 2 === 0 ? 18 : -10) + i * 6,
          rotate: (i) => [-2.5, 1.8, -1.2, 3.2][i] ?? 0,
          opacity: 1,
          duration: 0.9,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: root,
            start: 'top 72%',
          },
        }
      )
    }, root)

    return () => ctx.revert()
  }, [slug])

  if (!service) return <Navigate to="/services" replace />

  const step = service.steps[activeStep]
  const stepCount = service.steps.length

  return (
    <main className="aw-page" ref={rootRef}>
      <section className="aw-svc-hero aw-panel aw-panel-white" data-reveal>
        <p className="aw-svc-kicker">
          <Link to="/services">Services</Link>
          <span>/</span>
          {service.shortTitle}
        </p>
        <div className="aw-svc-hero-grid">
          <div>
            <h1>{service.title}</h1>
            <p className="aw-svc-lead">{service.description}</p>
          </div>
          <div className="aw-svc-hero-aside">
            <div className="aw-svc-hero-art" aria-hidden="true">
              <span />
              <span />
              <span />
            </div>
            <p className="aw-svc-meta">Timeline: {service.timeline}</p>
          </div>
        </div>
      </section>

      <section className="aw-svc-process aw-panel aw-panel-paper" aria-label="What you get">
        <div
          className="aw-svc-track"
          role="tablist"
          style={{ '--steps': stepCount }}
        >
          {service.steps.map((item, i) => (
            <button
              key={item.title}
              type="button"
              role="tab"
              aria-selected={i === activeStep}
              className={`aw-svc-node ${i === activeStep ? 'is-active' : ''}`}
              onClick={() => setActiveStep(i)}
              onMouseEnter={() => setActiveStep(i)}
            >
              <i className="aw-svc-node-dot" aria-hidden="true" />
              <span className="aw-svc-node-num">{String(i + 1).padStart(2, '0')}</span>
              <strong className="aw-svc-node-label">{item.title}</strong>
            </button>
          ))}
        </div>

        <div className="aw-svc-step" role="tabpanel" ref={stepPanelRef}>
          <h2>{step.title}</h2>
          <p>{step.text}</p>
        </div>
      </section>

      <section className="aw-svc-how aw-panel aw-panel-black" ref={howRef}>
        <h2 className="aw-section-title aw-section-title-light" data-reveal>How we work</h2>
        <ol className="aw-svc-how-fan">
          {HOW_WE_WORK.map((item, i) => (
            <li key={item.number} className="aw-svc-how-card" style={{ '--i': i }}>
              <span>{item.number}</span>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
              <svg className="aw-svc-how-deco" viewBox="0 0 120 120" aria-hidden="true">
                <circle cx="60" cy="60" r="38" fill="none" stroke="currentColor" strokeWidth="1" />
                <path d="M22 78 C48 28, 72 28, 98 78" fill="none" stroke="currentColor" strokeWidth="1" />
              </svg>
            </li>
          ))}
        </ol>
      </section>

      <section className="aw-svc-featured aw-panel aw-panel-white" data-reveal>
        <a
          href={service.featured.url}
          target="_blank"
          rel="noopener noreferrer"
          className="aw-svc-case"
        >
          <div className="aw-svc-case-media">
            <img src={service.featured.image} alt={service.featured.title} />
          </div>
          <div className="aw-svc-case-body">
            <p className="aw-svc-kicker">Featured project</p>
            <h2>{service.featured.title}</h2>
            <p className="aw-svc-case-meta">
              {service.featured.type} · {service.featured.year}
            </p>
            <p>{service.featured.blurb}</p>
            <span className="aw-link-draw">read the case</span>
          </div>
        </a>
      </section>

      <section className="aw-svc-more aw-panel aw-panel-paper" data-reveal>
        <h2>More services</h2>
        <ul>
          {SERVICES.filter((s) => s.slug !== service.slug).map((s) => (
            <li key={s.slug}>
              <Link to={`/services/${s.slug}`}>
                <strong>{s.title}</strong>
                <span>{s.timeline}</span>
              </Link>
            </li>
          ))}
        </ul>
        <Magnetic strength={0.35}>
          <Link to="/quote" className="aw-pill aw-pill-dark">
            Start a project
          </Link>
        </Magnetic>
      </section>

      <NeedSection />
    </main>
  )
}
