import { useState, useEffect, useRef } from 'react'
import { Link, useLocation } from 'react-router-dom'
import gsap from 'gsap'
import Magnetic from './Magnetic'

function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const location = useLocation()
  const isHome = location.pathname === '/'
  const menuRef = useRef(null)

  useEffect(() => {
    setOpen(false)
  }, [location.pathname, location.hash])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  useEffect(() => {
    const update = () => {
      if (!isHome) {
        setScrolled(true)
        return
      }
      const hero = document.querySelector('.aw-hero')
      if (!hero) {
        setScrolled(window.scrollY > 40)
        return
      }
      setScrolled(hero.getBoundingClientRect().bottom < 100)
    }

    update()
    window.addEventListener('scroll', update, { passive: true })
    window.addEventListener('resize', update)
    return () => {
      window.removeEventListener('scroll', update)
      window.removeEventListener('resize', update)
    }
  }, [isHome, location.pathname])

  useEffect(() => {
    const menu = menuRef.current
    if (!menu) return undefined
    const links = menu.querySelectorAll('.aw-menu-nav a')
    const foot = menu.querySelector('.aw-menu-foot')

    if (open) {
      gsap.set(menu, { autoAlpha: 1 })
      gsap.fromTo(
        links,
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.55, stagger: 0.06, ease: 'power3.out', delay: 0.05 }
      )
      if (foot) {
        gsap.fromTo(foot, { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.45, delay: 0.28 })
      }
    } else {
      gsap.set(menu, { autoAlpha: 0 })
    }
  }, [open])

  const handleHashClick = (e, hash) => {
    setOpen(false)
    if (location.pathname === '/') {
      e.preventDefault()
      const el = document.querySelector(hash)
      if (el) el.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const navItems = [
    { label: '00 Home', to: '/' },
    { label: '01 Services', to: '/#services', hash: '#services' },
    { label: '02 Projects', to: '/#works', hash: '#works' },
    { label: '03 About', to: '/about' },
    { label: '04 Contacts', to: '/contact' },
  ]

  return (
    <>
      <header className={`aw-nav ${scrolled ? 'aw-nav-scrolled' : ''}`}>
        <div className="aw-nav-shell">
          <Link to="/" className="aw-logo" aria-label="NextGen Labz, home">
            nextgen<span>.</span>
          </Link>

          <div className="aw-nav-actions">
            <Magnetic strength={0.35}>
              <Link to="/contact" className="aw-pill aw-pill-ghost">
                get in touch.
              </Link>
            </Magnetic>
            <Magnetic strength={0.35}>
              <button
                type="button"
                className="aw-pill aw-pill-menu"
                onClick={() => setOpen(true)}
                aria-expanded={open}
                aria-controls="aw-menu"
              >
                menu.
                <span className="aw-burger" aria-hidden="true">
                  <i /><i />
                </span>
              </button>
            </Magnetic>
          </div>
        </div>
      </header>

      <div
        id="aw-menu"
        ref={menuRef}
        className={`aw-menu ${open ? 'aw-menu-open' : ''}`}
        aria-hidden={!open}
      >
        <div className="aw-menu-top">
          <Link to="/" className="aw-logo" onClick={() => setOpen(false)}>
            nextgen<span>.</span>
          </Link>
          <Magnetic strength={0.35}>
            <button
              type="button"
              className="aw-pill aw-pill-menu"
              onClick={() => setOpen(false)}
              aria-label="Close menu"
            >
              close.
            </button>
          </Magnetic>
        </div>

        <nav className="aw-menu-nav" aria-label="Site">
          <ul>
            {navItems.map(({ label, to, hash }) => (
              <li key={label}>
                {hash ? (
                  <Link to={to} onClick={(e) => handleHashClick(e, hash)}>
                    {label}
                  </Link>
                ) : (
                  <Link to={to} onClick={() => setOpen(false)}>
                    {label}
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </nav>

        <div className="aw-menu-foot">
          <a href="mailto:hello@nextgenlabz.com">Say hello: hello@nextgenlabz.com</a>
          <div className="aw-menu-socials">
            <a href="https://www.instagram.com/nextgen.labz/" target="_blank" rel="noopener noreferrer">
              Instagram
            </a>
          </div>
        </div>
      </div>
    </>
  )
}

export default Navbar
