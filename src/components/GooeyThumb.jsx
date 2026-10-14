import { useRef } from 'react'
import gsap from 'gsap'

/** Lightweight gooey hover on project thumbs — inspired by Awake GooeyThumb */
export default function GooeyThumb({ src, alt, className = '' }) {
  const wrapRef = useRef(null)
  const imgRef = useRef(null)
  const blobRef = useRef(null)

  const onEnter = () => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const img = imgRef.current
    const blob = blobRef.current
    if (!img || !blob) return
    gsap.to(img, { scale: 1.08, duration: 0.7, ease: 'power3.out' })
    gsap.fromTo(
      blob,
      { scale: 0.4, opacity: 0.55 },
      { scale: 1.35, opacity: 0, duration: 0.85, ease: 'power2.out' }
    )
  }

  const onLeave = () => {
    const img = imgRef.current
    if (!img) return
    gsap.to(img, { scale: 1.08, duration: 0.55, ease: 'power3.out' })
  }

  const onMove = (e) => {
    const wrap = wrapRef.current
    const img = imgRef.current
    if (!wrap || !img) return
    const r = wrap.getBoundingClientRect()
    const x = ((e.clientX - r.left) / r.width - 0.5) * 14
    const y = ((e.clientY - r.top) / r.height - 0.5) * 10
    gsap.to(img, { x, y, duration: 0.55, ease: 'power3.out', overwrite: 'auto' })
  }

  const onOut = () => {
    const img = imgRef.current
    if (!img) return
    gsap.to(img, { x: 0, y: 0, duration: 0.6, ease: 'power3.out' })
    onLeave()
  }

  return (
    <div
      className={`aw-gooey ${className}`}
      ref={wrapRef}
      onMouseEnter={onEnter}
      onMouseLeave={onOut}
      onMouseMove={onMove}
    >
      <div className="aw-gooey-media">
        <img ref={imgRef} src={src} alt={alt} loading="lazy" />
        <span className="aw-gooey-blob" ref={blobRef} aria-hidden="true" />
      </div>
    </div>
  )
}
