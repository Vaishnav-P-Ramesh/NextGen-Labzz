import { Link } from 'react-router-dom'
import Magnetic from './Magnetic'

function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="aw-footer">
      <div className="aw-footer-top">
        <Link to="/" className="aw-logo">
          nextgen<span>.</span>
        </Link>
        <div className="aw-footer-actions">
          <Magnetic strength={0.35}>
            <Link to="/contact" className="aw-pill aw-pill-ghost">
              get in touch.
            </Link>
          </Magnetic>
          <Magnetic strength={0.35}>
            <Link to="/quote" className="aw-pill aw-pill-dark">
              get a quote.
            </Link>
          </Magnetic>
        </div>
      </div>

      <div className="aw-footer-grid">
        <nav className="aw-footer-nav" aria-label="Footer">
          <Link to="/">Home</Link>
          <Link to="/services">Services</Link>
          <Link to="/#works">Projects</Link>
          <Link to="/contact">Contacts</Link>
        </nav>

        <nav className="aw-footer-social" aria-label="Social">
          <a href="https://www.instagram.com/nextgen.labz/" target="_blank" rel="noopener noreferrer">
            Instagram
          </a>
        </nav>

        <div className="aw-footer-contact">
          <p>
            Contact us
            <a href="mailto:hello@nextgenlabz.com">hello@nextgenlabz.com</a>
          </p>
          <p>
            Based in
            <strong>India</strong>
          </p>
        </div>
      </div>

      <div className="aw-footer-bottom">
        <p>© NextGen Labz {year}. All rights reserved.</p>
        <nav className="aw-footer-legal" aria-label="Legal">
          <a href="#">Privacy</a>
          <a href="#">Cookies</a>
          <a href="#">Terms</a>
        </nav>
        <button
          type="button"
          className="aw-back-top"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        >
          Back to top
        </button>
      </div>
    </footer>
  )
}

export default Footer
