import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'
import { useEffect, useRef } from 'react'
import LandingPage from './pages/LandingPage'
import About from './pages/About'
import Contact from './pages/Contact'
import Quote from './pages/Quote'
import Services from './pages/Services'
import ServiceDetail from './pages/ServiceDetail'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import PageTransition from './components/PageTransition'
import CustomCursor from './components/CustomCursor'
import useSmoothScroll from './hooks/useSmoothScroll'
import './App.css'

function ScrollToTop() {
  const { pathname, hash } = useLocation()
  useEffect(() => {
    if (hash) {
      const el = document.querySelector(hash)
      if (el) {
        el.scrollIntoView({ behavior: 'instant', block: 'start' })
        return
      }
    }
    window.scrollTo({ top: 0, behavior: 'instant' })
  }, [pathname, hash])
  return null
}

function AnimatedRoutes() {
  const location = useLocation()
  const mainRef = useRef(null)
  const prevPathRef = useRef(location.pathname)

  useEffect(() => {
    if (prevPathRef.current !== location.pathname) {
      const el = mainRef.current
      if (el) {
        el.classList.remove('page-enter-active', 'page-enter-done')
        el.classList.add('page-enter')
        void el.offsetWidth
        el.classList.remove('page-enter')
        el.classList.add('page-enter-active')
        const t = window.setTimeout(() => {
          el.classList.add('page-enter-done')
          el.style.transform = 'none'
        }, 480)
        prevPathRef.current = location.pathname
        return () => window.clearTimeout(t)
      }
      prevPathRef.current = location.pathname
    }
    return undefined
  }, [location.pathname])

  return (
    <div ref={mainRef} className="page-enter-active page-enter-done">
      <Routes location={location}>
        <Route path="/" element={<LandingPage />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/quote" element={<Quote />} />
        <Route path="/services" element={<Services />} />
        <Route path="/services/:slug" element={<ServiceDetail />} />
      </Routes>
    </div>
  )
}

function SmoothScroll() {
  useSmoothScroll(true)
  return null
}

function App() {
  return (
    <Router>
      <SmoothScroll />
      <ScrollToTop />
      <CustomCursor />
      <PageTransition />
      <Navbar />
      <AnimatedRoutes />
      <Footer />
    </Router>
  )
}

export default App
