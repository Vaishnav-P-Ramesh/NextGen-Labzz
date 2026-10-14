import { useMemo, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import useSEO from '../hooks/useSEO'
import Magnetic from '../components/Magnetic'
import NeedSection from '../components/NeedSection'

const SERVICE_OPTIONS = [
  'Website design & development',
  'UX / UI design',
  'Branding',
  'Digital marketing',
]

export default function Quote() {
  const [params] = useSearchParams()
  const need = params.get('need') || ''

  const initialServices = useMemo(() => {
    const map = {
      development: 'Website design & development',
      'web design': 'Website design & development',
      branding: 'Branding',
      marketing: 'Digital marketing',
    }
    const matched = map[need.toLowerCase()]
    return matched ? [matched] : []
  }, [need])

  const [form, setForm] = useState({
    name: '',
    email: '',
    company: '',
    budget: '',
    timeline: '',
    services: initialServices,
    description: '',
  })
  const [sent, setSent] = useState(false)

  useSEO({
    title: 'Request a quote · NextGen Labz',
    description: 'Get a custom quote for web, branding, UX/UI or growth work from NextGen Labz.',
    canonical: 'https://www.nextgenlabz.studio/quote',
  })

  const toggleService = (label) => {
    setForm((f) => ({
      ...f,
      services: f.services.includes(label)
        ? f.services.filter((s) => s !== label)
        : [...f.services, label],
    }))
  }

  const onSubmit = (e) => {
    e.preventDefault()
    const body = [
      `Name: ${form.name}`,
      `Email: ${form.email}`,
      `Company: ${form.company}`,
      `Budget: ${form.budget}`,
      `Timeline: ${form.timeline}`,
      `Services: ${form.services.join(', ')}`,
      '',
      form.description,
    ].join('\n')

    window.location.href = `mailto:hello@nextgenlabz.com?subject=${encodeURIComponent(
      'Quote request'
    )}&body=${encodeURIComponent(body)}`
    setSent(true)
  }

  return (
    <main className="aw-page">
      <section className="aw-svc-hero aw-panel aw-panel-white">
        <p className="aw-svc-kicker">Quote</p>
        <h1>Tell us what you need.</h1>
        <p className="aw-svc-lead">
          Share goals, timeline, and scope. We will come back with a clear estimate — usually within
          24 hours.
        </p>
      </section>

      <section className="aw-quote aw-panel aw-panel-paper">
        {sent ? (
          <div className="aw-quote-done">
            <h2>Thanks — check your mail client.</h2>
            <p>If nothing opened, email us directly at hello@nextgenlabz.com.</p>
            <Link to="/" className="aw-pill aw-pill-dark">
              Back home
            </Link>
          </div>
        ) : (
          <form className="aw-quote-form" onSubmit={onSubmit}>
            <div className="aw-quote-grid">
              <label>
                Name
                <input
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="Your name"
                />
              </label>
              <label>
                Email
                <input
                  type="email"
                  required
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  placeholder="you@company.com"
                />
              </label>
              <label>
                Company
                <input
                  value={form.company}
                  onChange={(e) => setForm({ ...form, company: e.target.value })}
                  placeholder="Optional"
                />
              </label>
              <label>
                Budget
                <select
                  value={form.budget}
                  onChange={(e) => setForm({ ...form, budget: e.target.value })}
                  required
                >
                  <option value="">Select</option>
                  <option value="Under $3k">Under $3k</option>
                  <option value="$3k – $8k">$3k – $8k</option>
                  <option value="$8k – $20k">$8k – $20k</option>
                  <option value="$20k+">$20k+</option>
                </select>
              </label>
              <label>
                Timeline
                <select
                  value={form.timeline}
                  onChange={(e) => setForm({ ...form, timeline: e.target.value })}
                  required
                >
                  <option value="">Select</option>
                  <option value="ASAP">ASAP</option>
                  <option value="1–2 months">1–2 months</option>
                  <option value="3–6 months">3–6 months</option>
                  <option value="Flexible">Flexible</option>
                </select>
              </label>
            </div>

            <fieldset>
              <legend>Services</legend>
              <div className="aw-quote-chips">
                {SERVICE_OPTIONS.map((label) => (
                  <button
                    key={label}
                    type="button"
                    className={`aw-chip ${form.services.includes(label) ? 'is-active' : ''}`}
                    onClick={() => toggleService(label)}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </fieldset>

            <label>
              Project details
              <textarea
                required
                rows={6}
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
                placeholder="Goals, audience, links, constraints…"
              />
            </label>

            <Magnetic strength={0.35}>
              <button type="submit" className="aw-pill aw-pill-dark">
                Request quote
              </button>
            </Magnetic>
          </form>
        )}
      </section>

      <NeedSection />
    </main>
  )
}
