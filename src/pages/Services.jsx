import { useRef } from 'react'
import { Link } from 'react-router-dom'
import useSEO from '../hooks/useSEO'
import useReveal from '../hooks/useReveal'
import Magnetic from '../components/Magnetic'
import NeedSection from '../components/NeedSection'
import { SERVICES } from '../data/services'

export default function Services() {
  const rootRef = useRef(null)
  useReveal(rootRef)

  useSEO({
    title: 'Services · NextGen Labz',
    description:
      'Website design & development, UX/UI, branding, and digital marketing from NextGen Labz.',
    keywords: 'NextGen Labz services, website design, UX UI, branding, digital marketing',
    canonical: 'https://www.nextgenlabz.studio/services',
  })

  return (
    <main className="aw-page" ref={rootRef}>
      <section className="aw-svc-hero aw-panel aw-panel-white" data-reveal>
        <p className="aw-svc-kicker">What we offer</p>
        <h1>Services</h1>
        <p className="aw-svc-lead">
          One team for strategy, design, build, and growth — so your product looks sharp and works
          harder after launch.
        </p>
      </section>

      <section className="aw-svc-index aw-panel aw-panel-paper" data-reveal>
        <ul className="aw-svc-index-list" data-reveal-stagger>
          {SERVICES.map((service, i) => (
            <li key={service.slug}>
              <Link to={`/services/${service.slug}`}>
                <span>{String(i + 1).padStart(2, '0')}</span>
                <div>
                  <strong>{service.title}</strong>
                  <p>{service.description}</p>
                </div>
                <em>{service.timeline}</em>
              </Link>
            </li>
          ))}
        </ul>

        <div className="aw-svc-index-cta">
          <Magnetic strength={0.35}>
            <Link to="/quote" className="aw-pill aw-pill-dark">
              get a quote.
            </Link>
          </Magnetic>
          <Magnetic strength={0.35}>
            <Link to="/contact" className="aw-pill aw-pill-outline">
              get in touch.
            </Link>
          </Magnetic>
        </div>
      </section>

      <NeedSection />
    </main>
  )
}
