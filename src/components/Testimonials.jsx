import React from 'react'
import arcwaveLogo from '../assets/clients/arcwave.svg'
import fluxgridLogo from '../assets/clients/fluxgrid.svg'
import nimbusLogo from '../assets/clients/nimbus.svg'

const testimonials = [
  {
    quote: 'They moved from concept to polished MVP in weeksâ€”communication and craftsmanship were stellar the whole way.',
    author: 'Sarah Mitchell',
    role: 'Product Lead',
    company: 'ArcWave',
    logo: arcwaveLogo,
    photo: 'https://images.unsplash.com/photo-1550525811-e5869dd03032?auto=format&fit=crop&w=256&q=60'
  },
  {
    quote: 'Rare mix of design sensitivity and deep engineering rigor. Our performance metrics jumped without redesign compromises.',
    author: 'Leon Ortega',
    role: 'CTO',
    company: 'FluxGrid',
    logo: fluxgridLogo,
    photo: 'https://images.unsplash.com/photo-1527980965255-d3b416303d12?auto=format&fit=crop&w=256&q=60'
  },
  {
    quote: 'Felt like an extension of our internal team. Fast iterations, proactive problem solving, zero drama.',
    author: 'Emily Zhao',
    role: 'Founder',
    company: 'Nimbus Labs',
    logo: nimbusLogo,
    photo: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=256&q=60'
  }
]

const clientLogos = [
  { name: 'ArcWave', logo: arcwaveLogo },
  { name: 'FluxGrid', logo: fluxgridLogo },
  { name: 'Nimbus Labs', logo: nimbusLogo }
]

function Testimonials() {
  return (
    <section id="testimonials" className="relative w-full overflow-hidden" style={{ background: '#111111', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
      {/* Decorative section number */}
      <div className="absolute top-0 right-0 section-number pointer-events-none select-none pr-8 pt-4" aria-hidden="true">04</div>

      <div className="px-5 sm:px-8 lg:px-10 max-w-7xl mx-auto relative py-24 sm:py-28 lg:py-36">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-14 sm:mb-16 pb-8" style={{ borderBottom: '1px solid rgba(255,255,255,0.07)' }}>
          <div>
            <p className="label-tag mb-4">Testimonials</p>
            <h2 className="editorial-heading text-4xl sm:text-5xl lg:text-6xl" style={{ color: '#f0ede8' }}>
              Client{' '}
              <span style={{ color: '#c8f752' }}>Feedback</span>
            </h2>
          </div>
          <p className="text-sm sm:text-base leading-relaxed max-w-sm" style={{ color: '#a8a29e' }}>
            A few words from teams who trusted us to design, build, and refine their products.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid gap-5 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 w-full">
          {testimonials.map((t, i) => (
            <figure
              key={i}
              className="hover-card p-6 flex flex-col gap-5"
            >
              {/* Quote mark */}
              <span className="text-3xl font-bold leading-none" style={{ color: '#c8f752', fontFamily: 'var(--font-display)', lineHeight: 1 }}>"</span>

              {/* Quote text */}
              <blockquote className="text-sm sm:text-base leading-relaxed flex-1" style={{ color: '#a8a29e' }}>
                {t.quote}
              </blockquote>

              {/* Author */}
              <figcaption className="flex items-center gap-3 pt-4" style={{ borderTop: '1px solid rgba(255,255,255,0.07)' }}>
                <div className="relative h-10 w-10 shrink-0">
                  <div className="h-10 w-10 rounded-full overflow-hidden" style={{ border: '1px solid rgba(255,255,255,0.1)' }}>
                    <img src={t.photo} alt={t.author} className="h-full w-full object-cover" loading="lazy" />
                  </div>
                  <img src={t.logo} alt={t.company + ' logo'} className="h-5 w-5 object-contain absolute -bottom-0.5 -right-0.5 rounded-md p-0.5"
                    style={{ background: '#1a1a1a', border: '1px solid rgba(255,255,255,0.1)' }} />
                </div>
                <div>
                  <p className="text-sm font-semibold" style={{ color: '#f0ede8' }}>{t.author}</p>
                  <p className="text-xs" style={{ color: '#57534e' }}>{t.role} Â· {t.company}</p>
                </div>
              </figcaption>
            </figure>
          ))}
        </div>

        {/* Partner Logos Row */}
        <div className="mt-16 sm:mt-20">
          <p className="label-tag mb-6">Featured partners</p>
          <div className="flex flex-wrap gap-3">
            {clientLogos.map((c, i) => (
              <div key={i} className="inline-flex items-center gap-2.5 px-4 py-2.5 rounded-full transition-all duration-300"
                style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)' }}>
                <img src={c.logo} alt={c.name + ' logo'} className="h-6 w-6 rounded object-contain" loading="lazy" />
                <span className="text-sm font-medium" style={{ color: '#a8a29e' }}>{c.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Testimonials

