import React from 'react'

function FinalCTA() {
  return (
    <section className="relative w-full overflow-hidden" style={{ background: '#0c0c0c', borderTop: '1px solid rgba(255,255,255,0.06)' }} aria-labelledby="final-cta-heading">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10 py-28 sm:py-32 lg:py-40">
        <div className="grid gap-12 lg:gap-16 lg:grid-cols-2 items-center">
          {/* Left: Big headline */}
          <div>
            <p className="label-tag mb-6">Let's collaborate</p>
            <h2 id="final-cta-heading" className="editorial-heading" style={{ fontSize: 'clamp(44px, 7vw, 96px)', color: '#f0ede8' }}>
              Let's Build<br />
              <span style={{ color: '#c8f752' }}>Something</span><br />
              Great
            </h2>
          </div>

          {/* Right: Description + CTAs */}
          <div className="flex flex-col gap-8">
            <p className="text-base sm:text-lg leading-relaxed" style={{ color: '#a8a29e' }}>
              Have a product to launch, modernize, or scale? We partner with founders & teams to design, engineer, and iterate with momentum â€” shipping work users actually feel.
            </p>
            <p className="text-sm" style={{ color: '#57534e' }}>
              No bloated handoffs. Senior execution, tight feedback loops, measurable progress.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <a
                href="/contact"
                className="btn-primary"
              >
                Contact Us
                <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="M12 5l7 7-7 7"/></svg>
              </a>
              <a href="/quote" className="btn-ghost">
                Get a Quote
              </a>
            </div>
            {/* Stat pills */}
            <div className="flex flex-wrap gap-3 pt-2">
              {[
                { val: '9+', label: 'Projects shipped' },
                { val: '100%', label: 'Client satisfaction' },
                { val: '2024', label: 'Founded' },
              ].map(({ val, label }) => (
                <div key={label} className="flex flex-col px-4 py-3 rounded-xl" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)' }}>
                  <span className="text-xl font-bold" style={{ color: '#f0ede8', fontFamily: 'var(--font-display)', letterSpacing: '-0.03em' }}>{val}</span>
                  <span className="text-xs" style={{ color: '#57534e' }}>{label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default FinalCTA

