import { useRef } from 'react'
import { Link } from 'react-router-dom'
import useSEO from '../hooks/useSEO'
import useReveal from '../hooks/useReveal'
import Magnetic from '../components/Magnetic'
import NeedSection from '../components/NeedSection'

const values = [
  {
    number: '01',
    title: 'Clarity first',
    text: 'We cut noise until the product, message, and roadmap are obvious to everyone in the room.',
  },
  {
    number: '02',
    title: 'Craft that ships',
    text: 'Beautiful work that never leaves Figma is unfinished. We design for launch.',
  },
  {
    number: '03',
    title: 'Honest partnership',
    text: 'Transparent scope, clear updates, and recommendations rooted in outcomes — not vanity.',
  },
]

export default function About() {
  const rootRef = useRef(null)
  useReveal(rootRef)

  useSEO({
    title: 'About · NextGen Labz',
    description:
      'NextGen Labz is a creative digital studio founded in 2025. Learn how we work and what we value.',
    canonical: 'https://www.nextgenlabz.studio/about',
  })

  return (
    <main className="aw-page" ref={rootRef}>
      <section className="aw-svc-hero aw-panel aw-panel-white" data-reveal>
        <p className="aw-svc-kicker">About</p>
        <h1>We turn ideas into digital reality.</h1>
        <p className="aw-svc-lead">
          NextGen Labz is a creative digital studio founded in 2025. We bridge sharp design and
          solid engineering so brands look memorable — and perform.
        </p>
        <div className="aw-page-actions">
          <Magnetic strength={0.35}>
            <Link to="/contact" className="aw-pill aw-pill-dark">
              get in touch.
            </Link>
          </Magnetic>
          <Magnetic strength={0.35}>
            <Link to="/services" className="aw-pill aw-pill-outline">
              see services.
            </Link>
          </Magnetic>
        </div>
      </section>

      <section className="aw-about-story aw-panel aw-panel-paper" data-reveal>
        <h2>The studio</h2>
        <p>
          Born from the need to close the gap between stunning interfaces and reliable builds,
          NextGen Labz partners with founders and product teams who need to stand out. One team
          takes work from sketch to live — strategy, design, engineering, and growth.
        </p>
      </section>

      <section className="aw-about-values aw-panel aw-panel-black">
        <h2 className="aw-section-title aw-section-title-light">Values</h2>
        <div className="aw-about-value-grid">
          {values.map((v) => (
            <article key={v.number}>
              <span>{v.number}</span>
              <h3>{v.title}</h3>
              <p>{v.text}</p>
            </article>
          ))}
        </div>
      </section>

      <NeedSection />
    </main>
  )
}
