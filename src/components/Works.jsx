import { useState } from 'react';

// Local high-resolution hero screenshots
import thewlpensImg from '../assets/works/thewlpens.png';
import westernStoreImg from '../assets/works/western-store.png';
import rjenterprisesImg from '../assets/works/rjenterprises.png';
import muskanRoyalImg from '../assets/works/google-project.png';
import healthcareImg from '../assets/works/healthcare.png';
import leadxImg from '../assets/works/leadx.png';
import codepunkImg from '../assets/works/codepunk.png';
import codepunkV1Img from '../assets/works/codepunk-v1.png';
import talenthuntImg from '../assets/works/talenthunt.png';

const categories = ['All', 'E-Commerce & Retail', 'SaaS & Tech', 'Services & Media'];

const websiteProjects = [
  {
    title: 'The WL Pens',
    domain: 'thewlpens.com',
    url: 'https://www.thewlpens.com',
    image: thewlpensImg,
    category: 'E-Commerce & Retail',
    description: 'Bespoke fountain pen atelier and luxury writing instruments boutique featuring custom engraving, refined typography, and smooth shopping experience.',
    tags: ['E-Commerce', 'Luxury Atelier', 'Branding'],
    color: 'from-amber-500/25 via-orange-400/10 to-yellow-900/10',
    accent: '#f59e0b',
  },
  {
    title: 'The Western Store',
    domain: 'western-store.vercel.app',
    url: 'https://western-store.vercel.app',
    image: westernStoreImg,
    category: 'E-Commerce & Retail',
    description: 'Vibrant ethnic and western apparel storefront featuring curated festive collections, modern lehengas, and a responsive catalog interface.',
    tags: ['Fashion Retail', 'Ethnic Wear', 'Storefront'],
    color: 'from-pink-500/25 via-rose-400/10 to-purple-900/10',
    accent: '#ec4899',
  },
  {
    title: 'RJ Enterprises',
    domain: 'rjenterprisesinpune.services',
    url: 'https://www.rjenterprisesinpune.services/',
    image: rjenterprisesImg,
    category: 'Services & Media',
    description: 'Leading facility management and corporate housekeeping portal in Pune with verified personnel booking, service audits, and instant quote requests.',
    tags: ['Facility AMC', 'Corporate Services', 'Lead Gen'],
    color: 'from-emerald-500/25 via-teal-400/10 to-emerald-900/10',
    accent: '#10b981',
  },
  {
    title: 'Muskan Royal Studio',
    domain: 'muskanroyalstudio.com',
    url: 'https://share.google/UUy8wmIBT5jgztJWr',
    image: muskanRoyalImg,
    category: 'Services & Media',
    description: 'Luxury wedding photography and cinematic film studio portfolio highlighting regal royal portraits, emotional storytelling, and client booking.',
    tags: ['Cinematography', 'Wedding Studio', 'Portfolio'],
    color: 'from-amber-600/25 via-yellow-400/10 to-stone-900/10',
    accent: '#d97706',
  },
  {
    title: 'Health Care Services',
    domain: 'health-care-services-three.vercel.app',
    url: 'https://health-care-services-three.vercel.app/',
    image: healthcareImg,
    category: 'Services & Media',
    description: '24/7 ISO-certified home nursing and clinical bedside healthcare portal connecting families with certified caregivers and emergency assistance.',
    tags: ['Healthcare', 'Home Nursing', '24/7 Helpline'],
    color: 'from-teal-500/25 via-cyan-400/10 to-emerald-900/10',
    accent: '#06b6d4',
  },
  {
    title: 'Lead-X',
    domain: 'lead-x-three.vercel.app',
    url: 'https://lead-x-three.vercel.app',
    image: leadxImg,
    category: 'SaaS & Tech',
    description: 'Modern neo-brutalist B2B lead generation and competitive scoring engine engineered for marketing agility and pipeline velocity.',
    tags: ['B2B SaaS', 'Lead Scoring', 'Conversion'],
    color: 'from-yellow-500/25 via-amber-400/10 to-yellow-900/10',
    accent: '#eab308',
  },
  {
    title: 'CodePunk 2.0',
    domain: 'codepunk.droidclub.in',
    url: 'https://codepunk.droidclub.in',
    image: codepunkImg,
    category: 'SaaS & Tech',
    description: 'Cinematic Spider-Verse themed hackathon experience built for DroidClub featuring interactive timeline, sponsor tiers, and hacker registration.',
    tags: ['Spider-Verse', 'Hackathon', 'Community'],
    color: 'from-red-500/25 via-rose-400/10 to-red-900/10',
    accent: '#ef4444',
  },
  {
    title: 'CodePunk v1.0',
    domain: 'code-punk-v1-0.vercel.app',
    url: 'https://code-punk-v1-0.vercel.app',
    image: codepunkV1Img,
    category: 'SaaS & Tech',
    description: 'Genesis cyberpunk developer hackathon platform featuring interactive neon aesthetics, matrix circuitry, and rapid team challenge tracks.',
    tags: ['Cyberpunk', 'Developer Hub', 'v1.0 Edition'],
    color: 'from-purple-500/25 via-fuchsia-400/10 to-indigo-900/10',
    accent: '#a855f7',
  },
  {
    title: 'Eye Winn',
    domain: 'talenthunt-navy.vercel.app',
    url: 'https://talenthunt-navy.vercel.app',
    image: talenthuntImg,
    category: 'Services & Media',
    description: 'Cinematic platform bridging books to screenplays and feature films, featuring manuscript previews, screenplay access, and casting auditions.',
    tags: ['Film & Media', 'Screenplay', 'Auditions'],
    color: 'from-orange-500/25 via-amber-400/10 to-stone-900/10',
    accent: '#f97316',
  },
];

function ProjectCard({ project, index }) {
  const [imgError, setImgError] = useState(false);

  return (
    <article className="group relative rounded-2xl p-[1px] bg-gradient-to-br from-white/10 via-neutral-800/20 to-neutral-900/50 hover:from-purple-500/50 hover:via-purple-500/20 hover:to-pink-500/30 transition-all duration-500 flex flex-col h-full shadow-lg shadow-black/40">
      <div className="relative h-full rounded-2xl bg-neutral-950/90 backdrop-blur-md overflow-hidden flex flex-col">

        {/* Browser Mockup Window */}
        <div className="relative bg-neutral-900/90 border-b border-white/5 px-3 py-2 flex items-center gap-2 select-none">
          {/* macOS window dots */}
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80 inline-block" />
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80 inline-block" />
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80 inline-block" />
          </div>

          {/* Mini address bar */}
          <div className="flex-1 max-w-[200px] mx-auto bg-black/40 rounded px-2.5 py-0.5 text-[10px] text-neutral-400 truncate text-center font-mono border border-white/5">
            {project.domain}
          </div>

          {/* Live badge */}
          <div className="flex items-center gap-1 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-[9px] font-semibold text-emerald-400 uppercase tracking-wider">Live</span>
          </div>
        </div>

        {/* Website Preview Hero Image Container */}
        <a
          href={project.url}
          target="_blank"
          rel="noopener noreferrer"
          className="relative overflow-hidden aspect-[16/10] bg-neutral-900 block cursor-pointer group/preview"
          aria-label={`Visit live site of ${project.title}`}
        >
          {/* Ambient colored spotlight */}
          <div
            className={`absolute -top-16 -right-16 w-52 h-52 rounded-full bg-gradient-to-br ${project.color} opacity-0 group-hover:opacity-100 blur-3xl transition-opacity duration-700 pointer-events-none`}
          />

          {!imgError ? (
            <img
              src={project.image}
              alt={`${project.title} Hero Page Preview`}
              className="w-full h-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105"
              loading="lazy"
              onError={() => setImgError(true)}
            />
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center gap-3 bg-neutral-900 p-4">
              <div className="h-12 w-12 rounded-xl bg-purple-600/20 ring-1 ring-purple-400/30 flex items-center justify-center">
                <svg className="w-6 h-6 text-purple-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                </svg>
              </div>
              <span className="text-[11px] text-neutral-400 font-mono text-center break-all">{project.url}</span>
            </div>
          )}

          {/* Gentle vignette / gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/20 to-transparent opacity-60 group-hover:opacity-30 transition-opacity duration-300 pointer-events-none" />

          {/* Floating Hover Action Badge */}
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover/preview:opacity-100 transition-opacity duration-300 pointer-events-none">
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-purple-600/90 text-white text-xs font-semibold shadow-lg shadow-purple-900/60 backdrop-blur-md transform translate-y-2 group-hover/preview:translate-y-0 transition-transform duration-300">
              Visit Live Site
              <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </span>
          </div>
        </a>

        {/* Card Content */}
        <div className="relative p-5 sm:p-6 flex flex-col flex-1">
          {/* Background subtle glow */}
          <div className={`absolute -bottom-16 -right-16 w-44 h-44 rounded-full bg-gradient-to-br ${project.color} opacity-0 group-hover:opacity-40 blur-2xl transition-opacity duration-700 pointer-events-none`} />

          {/* Tags */}
          <div className="flex flex-wrap gap-1.5 mb-3.5">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="text-[10px] font-medium tracking-wide uppercase px-2.5 py-0.5 rounded-full bg-neutral-900/90 text-neutral-300 border border-white/5"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Title */}
          <h3 className="text-base sm:text-lg font-semibold text-white tracking-tight leading-snug mb-2 flex items-center justify-between group-hover:text-purple-200 transition-colors">
            <span className="flex items-center gap-2">
              {project.title}
              <span className="h-1.5 w-1.5 rounded-full bg-purple-400 inline-block flex-shrink-0" />
            </span>
            <span className="text-[11px] font-mono text-neutral-600 font-normal">
              {('0' + (index + 1)).slice(-2)}
            </span>
          </h3>

          {/* Description */}
          <p className="text-xs sm:text-[13px] text-neutral-400 leading-relaxed flex-1 line-clamp-3 mb-5">
            {project.description}
          </p>

          {/* Card Footer */}
          <div className="relative pt-4 border-t border-white/5 flex items-center justify-between mt-auto">
            <a
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center text-xs font-semibold text-purple-300 hover:text-purple-100 transition-colors group/link"
            >
              <span>Explore website</span>
              <svg
                className="ml-1.5 h-3.5 w-3.5 transition-transform duration-300 group-hover/link:translate-x-1"
                viewBox="0 0 16 16"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.75"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M3 8h10M9 4l4 4-4 4" />
              </svg>
            </a>

            <span className="text-[10px] uppercase font-mono tracking-wider text-neutral-500">
              {project.category.split(' ')[0]}
            </span>
          </div>

          {/* Border focus ring */}
          <div className="pointer-events-none absolute inset-px rounded-[15px] ring-1 ring-white/5 group-hover:ring-purple-400/40 transition duration-500" />
        </div>
      </div>
    </article>
  );
}

export default function Works() {
  const [activeTab, setActiveTab] = useState('All');

  const filteredProjects = activeTab === 'All'
    ? websiteProjects
    : websiteProjects.filter((p) => p.category === activeTab);

  return (
    <section id="works" className="relative py-24 sm:py-28 lg:py-36 w-full overflow-hidden" style={{ background: '#0c0c0c', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
      {/* Decorative section number */}
      <div className="absolute top-0 right-0 section-number pointer-events-none select-none pr-8 pt-4" aria-hidden="true">03</div>

      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10 w-full">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-14 sm:mb-16 pb-8" style={{ borderBottom: '1px solid rgba(255,255,255,0.07)' }}>
          <div>
            <p className="label-tag mb-4">Our Works & Case Studies</p>
            <h2 className="editorial-heading text-4xl sm:text-5xl lg:text-6xl" style={{ color: '#f0ede8' }}>
              Built &{' '}
              <span style={{ color: '#c8f752' }}>Delivered</span>
            </h2>
          </div>
          <p className="text-sm sm:text-base leading-relaxed max-w-sm" style={{ color: '#a8a29e' }}>
            Websites, web applications, and digital platforms crafted for forward-thinking brands and founders.
          </p>
        </div>

        {/* Category Filter Navigation */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 mb-8" style={{ borderBottom: '1px solid rgba(255,255,255,0.07)' }}>
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 rounded-lg flex items-center justify-center text-base select-none" style={{ background: 'rgba(200,247,82,0.1)', border: '1px solid rgba(200,247,82,0.2)' }}>
              🌐
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-bold tracking-tight" style={{ color: '#f0ede8', fontFamily: 'var(--font-display)' }}>Website Development</h3>
                <span className="text-[11px] font-mono px-2 py-0.5 rounded-full" style={{ color: '#c8f752', background: 'rgba(200,247,82,0.08)', border: '1px solid rgba(200,247,82,0.2)' }}>
                  {websiteProjects.length} sites
                </span>
              </div>
              <p className="text-xs" style={{ color: '#57534e' }}>Production-grade storefronts, SaaS platforms, enterprise solutions</p>
            </div>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap items-center gap-2">
            {categories.map((cat) => {
              const count = cat === 'All'
                ? websiteProjects.length
                : websiteProjects.filter((p) => p.category === cat).length;
              return (
                <button
                  key={cat}
                  onClick={() => setActiveTab(cat)}
                  className="px-3.5 py-1.5 rounded-full text-xs font-medium transition-all duration-300 flex items-center gap-1.5"
                  style={activeTab === cat
                    ? { background: '#c8f752', color: '#0c0c0c' }
                    : { background: 'rgba(255,255,255,0.04)', color: '#a8a29e', border: '1px solid rgba(255,255,255,0.07)' }
                  }
                >
                  <span>{cat}</span>
                  <span className="text-[10px] px-1.5 rounded-full" style={activeTab === cat ? { background: 'rgba(0,0,0,0.2)' } : { background: 'rgba(255,255,255,0.06)', color: '#57534e' }}>
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Projects Grid */}
        <div className="grid gap-6 sm:gap-6 md:gap-7 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 w-full">
          {filteredProjects.map((project, i) => (
            <ProjectCard key={project.url} project={project} index={i} />
          ))}
        </div>

        {/* Bottom Call to Action */}
        <div className="mt-16 sm:mt-24 p-8 sm:p-12 rounded-2xl relative overflow-hidden" style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.07)' }}>
          <div className="relative flex flex-col lg:flex-row lg:items-center justify-between gap-8">
            <div className="max-w-2xl">
              <p className="label-tag mb-3">Ready to transform your digital presence?</p>
              <h3 className="editorial-heading text-2xl sm:text-3xl lg:text-4xl" style={{ color: '#f0ede8' }}>
                Let's build your brand's next digital benchmark.
              </h3>
              <p className="mt-3 text-sm leading-relaxed" style={{ color: '#a8a29e' }}>
                From high-converting landing pages to full-scale web apps — concept to launch with velocity and precision.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 flex-shrink-0">
              <a href="/quote" className="btn-primary">
                Start a Project
                <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M12 5l7 7-7 7" /></svg>
              </a>
              <a href="/services" className="btn-ghost">
                Explore Services
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
