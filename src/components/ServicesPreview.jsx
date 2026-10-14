import React from 'react';

const services = [
  {
    num: '01',
    title: 'Web Development',
    blurb: 'Modern, fast, scalable web solutions.',
    items: ['Portfolio Websites', 'Business Websites', 'Landing Pages', 'Eâ€‘Commerce Stores', 'Web Apps (React / Next.js / Node.js)'],
    tag: 'Engineering',
  },
  {
    num: '02',
    title: 'UI / UX & Design',
    blurb: 'Human-centered, conversion-minded visuals.',
    items: ['Wireframing & Prototyping', 'Website & App UI/UX', 'Branding & Logo Design', 'Graphic Design Assets'],
    tag: 'Design',
  },
  {
    num: '03',
    title: 'Automation & AI',
    blurb: 'Scale operations with smart systems.',
    items: ['Workflow Automation (Zapier / n8n)', 'AI Chatbots (Web / WhatsApp)', 'Custom AI Integrations'],
    tag: 'Intelligence',
  },
  {
    num: '04',
    title: 'Digital Marketing',
    blurb: 'Acquisition & brand growth strategies.',
    items: ['SEO Optimization', 'Social Media Marketing', 'Content Marketing', 'Paid Advertising (Google / Meta)'],
    tag: 'Growth',
  },
  {
    num: '05',
    title: 'Digital Maintenance',
    blurb: 'Keep digital products secure & healthy.',
    items: ['Site Maintenance & Updates', 'Bug Fixes & Performance', 'Security & Backups'],
    tag: 'Support',
  },
  {
    num: '06',
    title: 'Photography',
    blurb: 'Visual narratives that elevate brands.',
    items: ['Corporate & Product Shoots', 'Event Coverage', 'Lifestyle & Branding Shoots'],
    tag: 'Visual',
  },
  {
    num: '07',
    title: 'Video Production',
    blurb: 'High-impact motion for engagement.',
    items: ['Promotional & Explainer Videos', 'Event Highlights & Aftermovies', 'Social Media Reels & Ads'],
    tag: 'Motion',
  },
];

function ServiceRow({ svc }) {
  const [open, setOpen] = React.useState(false);
  return (
    <div
      className="group border-b cursor-pointer"
      style={{ borderColor: 'rgba(255,255,255,0.07)' }}
      onClick={() => setOpen(o => !o)}
    >
      <div className="grid grid-cols-[40px_1fr_auto] sm:grid-cols-[56px_1fr_auto] items-center gap-4 sm:gap-8 py-6 sm:py-7 transition-all duration-300">
        <span className="service-row-num">{svc.num}</span>
        <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-5">
          <h3
            className="service-row-title transition-colors duration-300"
            style={{ color: open ? '#c8f752' : '#f0ede8' }}
          >
            {svc.title}
          </h3>
          <span className="text-sm hidden sm:block" style={{ color: '#57534e' }}>{svc.blurb}</span>
        </div>
        <div className="flex items-center gap-3 shrink-0">
          <span className="hidden sm:inline-flex items-center px-3 py-1 rounded-full text-[10px] font-semibold tracking-widest uppercase"
            style={{ border: '1px solid rgba(255,255,255,0.08)', color: '#57534e' }}>
            {svc.tag}
          </span>
          <span
            className="flex h-7 w-7 items-center justify-center rounded-full transition-all duration-300"
            style={{
              border: '1px solid rgba(255,255,255,0.12)',
              color: open ? '#0c0c0c' : '#a8a29e',
              background: open ? '#c8f752' : 'transparent',
              transform: open ? 'rotate(45deg)' : 'rotate(0deg)',
            }}
          >
            <svg className="w-3 h-3" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M8 3v10M3 8h10"/>
            </svg>
          </span>
        </div>
      </div>
      {/* Expanded content */}
      <div
        className="overflow-hidden transition-all duration-400 ease-in-out"
        style={{ maxHeight: open ? '300px' : '0', opacity: open ? 1 : 0 }}
      >
        <div className="pb-6 pl-10 sm:pl-16 pr-4">
          <ul className="flex flex-wrap gap-2">
            {svc.items.map(item => (
              <li key={item} className="inline-flex items-center gap-2 text-sm px-3 py-1.5 rounded-full"
                style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', color: '#a8a29e' }}>
                <span className="w-1 h-1 rounded-full shrink-0" style={{ background: '#c8f752' }}></span>
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default function ServicesPreview() {
  return (
    <section id="services" className="relative w-full overflow-hidden" style={{ background: '#111111', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
      {/* Decorative section number */}
      <div className="absolute top-0 right-0 section-number pointer-events-none select-none pr-8 pt-4" aria-hidden="true">02</div>

      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10 py-24 sm:py-28 lg:py-36 relative">
        {/* Section header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-14 sm:mb-18 pb-8"
          style={{ borderBottom: '1px solid rgba(255,255,255,0.07)' }}>
          <div>
            <p className="label-tag mb-4">Services</p>
            <h2 className="editorial-heading text-4xl sm:text-5xl lg:text-6xl" style={{ color: '#f0ede8' }}>
              What we<br />
              <span style={{ color: '#c8f752' }}>deliver</span>
            </h2>
          </div>
          <p className="text-sm sm:text-base leading-relaxed max-w-sm" style={{ color: '#a8a29e' }}>
            A multi-disciplinary stack designed to launch, grow, and sustain digital products. Start focused or plug in end-to-end.
          </p>
        </div>

        {/* Service rows */}
        <div style={{ borderTop: '1px solid rgba(255,255,255,0.07)' }}>
          {services.map(svc => <ServiceRow key={svc.num} svc={svc} />)}
        </div>

        {/* Bottom CTA */}
        <div className="mt-12 flex flex-col sm:flex-row sm:items-center gap-5 justify-between">
          <p className="text-sm max-w-md" style={{ color: '#57534e' }}>
            Need a tailored bundle? We combine design, engineering, automation, and growth into one engagement.
          </p>
          <a href="/quote" className="btn-primary shrink-0">
            Start a project
            <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="M12 5l7 7-7 7"/></svg>
          </a>
        </div>
      </div>
    </section>
  );
}
