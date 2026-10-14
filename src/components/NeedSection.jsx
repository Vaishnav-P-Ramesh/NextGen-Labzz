import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import gsap from 'gsap'
import Magnetic from './Magnetic'

const needOptions = ['development', 'web design', 'branding', 'marketing']
const ITEM_H = 56 // px — keep in sync with CSS --need-item-h

export default function NeedSection() {
  const [index, setIndex] = useState(0)
  const current = needOptions[index]
  const wheelRef = useRef(null)
  const trackRef = useRef(null)
  const lockRef = useRef(false)

  useLayoutEffect(() => {
    const track = trackRef.current
    if (!track) return

    const y = -index * ITEM_H
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (reduced) {
      gsap.set(track, { y })
      return
    }

    gsap.to(track, {
      y,
      duration: 0.55,
      ease: 'power3.out',
      overwrite: 'auto',
    })
  }, [index])

  useEffect(() => {
    const el = wheelRef.current
    if (!el) return undefined

    const step = (dir) => {
      if (lockRef.current) return
      lockRef.current = true
      window.setTimeout(() => {
        lockRef.current = false
      }, 320)
      setIndex((i) => {
        if (dir > 0) return Math.min(needOptions.length - 1, i + 1)
        return Math.max(0, i - 1)
      })
    }

    const onWheel = (e) => {
      if (Math.abs(e.deltaY) < 8) return
      e.preventDefault()
      step(e.deltaY > 0 ? 1 : -1)
    }

    let startY = 0
    const onTouchStart = (e) => {
      startY = e.touches[0].clientY
    }
    const onTouchEnd = (e) => {
      const dy = e.changedTouches[0].clientY - startY
      if (Math.abs(dy) < 36) return
      step(dy < 0 ? 1 : -1)
    }

    el.addEventListener('wheel', onWheel, { passive: false })
    el.addEventListener('touchstart', onTouchStart, { passive: true })
    el.addEventListener('touchend', onTouchEnd, { passive: true })
    return () => {
      el.removeEventListener('wheel', onWheel)
      el.removeEventListener('touchstart', onTouchStart)
      el.removeEventListener('touchend', onTouchEnd)
    }
  }, [])

  return (
    <section className="aw-need aw-panel">
      <div className="aw-need-inner">
        <p className="aw-need-label">I need</p>

        <div className="aw-need-picker" ref={wheelRef}>
          <div className="aw-need-window" aria-hidden={false}>
            <div className="aw-need-track" ref={trackRef} role="listbox" aria-label="What do you need?">
              {needOptions.map((option, i) => (
                <button
                  key={option}
                  type="button"
                  role="option"
                  aria-selected={i === index}
                  className={`aw-need-option ${i === index ? 'is-active' : ''}`}
                  onClick={() => setIndex(i)}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>

          <Magnetic strength={0.4}>
            <button
              type="button"
              className="aw-pill aw-need-next"
              onClick={() => setIndex((i) => (i + 1) % needOptions.length)}
            >
              next
              <span aria-hidden="true">→</span>
            </button>
          </Magnetic>
        </div>

        <div className="aw-need-controls">
          <p className="aw-need-current">
            I need <strong>{current}</strong>
          </p>
          <Magnetic strength={0.4}>
            <Link to={`/quote?need=${encodeURIComponent(current)}`} className="aw-pill aw-need-continue">
              Continue
            </Link>
          </Magnetic>
        </div>
      </div>
    </section>
  )
}
