import { Link } from 'react-router-dom'
import useSEO from '../hooks/useSEO'
import Magnetic from '../components/Magnetic'
import NeedSection from '../components/NeedSection'

export default function Contact() {
  useSEO({
    title: 'Contact · NextGen Labz',
    description:
      'Contact NextGen Labz to discuss websites, branding, UX/UI or growth. We reply within 24 hours.',
    canonical: 'https://www.nextgenlabz.studio/contact',
  })

  return (
    <main className="aw-page">
      <section className="aw-svc-hero aw-panel aw-panel-white">
        <p className="aw-svc-kicker">Contact</p>
        <h1>Say hello.</h1>
        <p className="aw-svc-lead">
          Have a project in mind? Need a second opinion? Drop a line — we usually reply within a
          day.
        </p>
      </section>

      <section className="aw-contact aw-panel aw-panel-paper">
        <div className="aw-contact-grid">
          <div>
            <h2>Reach us</h2>
            <ul className="aw-contact-list">
              <li>
                <span>Email</span>
                <a href="mailto:hello@nextgenlabz.com">hello@nextgenlabz.com</a>
              </li>
              <li>
                <span>Instagram</span>
                <a
                  href="https://www.instagram.com/nextgen.labz/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  @nextgen.labz
                </a>
              </li>
              <li>
                <span>Based in</span>
                <strong>India</strong>
              </li>
            </ul>
            <Magnetic strength={0.35}>
              <Link to="/quote" className="aw-pill aw-pill-dark">
                get a quote.
              </Link>
            </Magnetic>
          </div>

          <form
            className="aw-contact-form"
            onSubmit={(e) => {
              e.preventDefault()
              window.location.href = `mailto:hello@nextgenlabz.com?subject=${encodeURIComponent('Project enquiry')}`
            }}
          >
            <label>
              Name
              <input name="name" required placeholder="Your name" />
            </label>
            <label>
              Email
              <input type="email" name="email" required placeholder="you@company.com" />
            </label>
            <label>
              Message
              <textarea name="message" rows={5} required placeholder="Tell us about the project" />
            </label>
            <Magnetic strength={0.35}>
              <button type="submit" className="aw-pill aw-pill-dark">
                Send message
              </button>
            </Magnetic>
          </form>
        </div>
      </section>

      <NeedSection />
    </main>
  )
}
