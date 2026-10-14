import thewlpensImg from '../assets/works/thewlpens.png'
import leadxImg from '../assets/works/leadx.png'
import codepunkImg from '../assets/works/codepunk.png'
import westernStoreImg from '../assets/works/western-store.png'

export const HOW_WE_WORK = [
  {
    number: '01',
    title: 'Discovery call',
    text: '30 free minutes to scope your goals, timeline, and what done looks like.',
  },
  {
    number: '02',
    title: 'Design',
    text: 'Concepts, wireframes and a design system that tells your story.',
  },
  {
    number: '03',
    title: 'Build',
    text: 'Production build with motion, CMS where needed, and responsive polish.',
  },
  {
    number: '04',
    title: 'Launch',
    text: 'Go-live, handoff, training and support when you need it.',
  },
]

export const SERVICES = [
  {
    slug: 'website-design-development',
    title: 'Website design & development',
    shortTitle: 'Web development',
    description:
      'Pixel-perfect sites and web apps with custom motion, clean structure, and a build your team can own.',
    timeline: '4–8 weeks',
    steps: [
      {
        title: 'Project discovery & strategy',
        text: 'One call, one document. What the site has to do, who it is for, and what done means — in writing within days.',
      },
      {
        title: 'UX structure and wireframes',
        text: 'Information architecture and flows that make every page earn its place before visuals lock in.',
      },
      {
        title: 'Custom design in Figma',
        text: 'High-fidelity screens, component states, and a visual system aligned to your brand.',
      },
      {
        title: 'Production build with animations',
        text: 'Fast React / Vite builds with intentional motion, accessibility, and responsive polish.',
      },
      {
        title: 'CMS setup and team training',
        text: 'Editable content where you need it, plus a walkthrough so your team can ship updates confidently.',
      },
    ],
    featured: {
      title: 'The WL Pens',
      type: 'Development',
      year: '2025',
      image: thewlpensImg,
      url: 'https://www.thewlpens.com',
      blurb:
        'A luxury fountain-pen atelier needed a storefront that felt as precise as the product. We designed and built a calm, conversion-focused experience from homepage to checkout.',
    },
  },
  {
    slug: 'ux-ui-design',
    title: 'UX/UI design',
    shortTitle: 'UX/UI design',
    description:
      'Research-led interface design. Structure, flows and a component system your team can build from.',
    timeline: '3–6 weeks',
    steps: [
      {
        title: 'Stakeholder and user research',
        text: 'We talk to the people who run the product and the people who use it, and write down where the interface gets in the way.',
      },
      {
        title: 'Information architecture',
        text: 'Clear structure for navigation, content hierarchy, and the paths users actually take.',
      },
      {
        title: 'Wireframes and user flows',
        text: 'Low-fidelity maps of every critical journey so decisions stay cheap before pixels get expensive.',
      },
      {
        title: 'High-fidelity UI design',
        text: 'Polished screens, states, and micro-interactions that feel intentional on every device.',
      },
      {
        title: 'Component library and handover',
        text: 'A documented component library your developers can build from — tokens, variants, and usage notes included.',
      },
    ],
    featured: {
      title: 'Lead-X',
      type: 'Product design',
      year: '2025',
      image: leadxImg,
      url: 'https://lead-x-three.vercel.app',
      blurb:
        'A B2B lead engine needed an interface as sharp as its scoring model. We designed a neo-brutalist product UI that made complex pipeline data feel immediate.',
    },
  },
  {
    slug: 'branding',
    title: 'Branding',
    shortTitle: 'Branding',
    description:
      'A brand identity built to work everywhere it lands: on the site, in the deck, and in the product.',
    timeline: '4–6 weeks',
    steps: [
      {
        title: 'Brand discovery workshop',
        text: 'One structured session on where the company is going and what it should feel like. The brief writes itself from the answers.',
      },
      {
        title: 'Positioning and messaging',
        text: 'Clear language for who you serve, why you win, and how you show up across channels.',
      },
      {
        title: 'Logo and visual identity',
        text: 'Mark, lockups, and a visual system that stays recognizable at every size.',
      },
      {
        title: 'Type, colour and imagery system',
        text: 'Rules for typography, palette, photography, and illustration so every asset feels like one brand.',
      },
      {
        title: 'Brand guidelines',
        text: 'A practical guide your team can open and use — not a PDF that gathers dust.',
      },
    ],
    featured: {
      title: 'CodePunk 2.0',
      type: 'Branding · Event',
      year: '2025',
      image: codepunkImg,
      url: 'https://codepunk.droidclub.in',
      blurb:
        'A Spider-Verse themed hackathon needed a brand as electric as the community. We shaped identity, motion language, and a site that drove registrations.',
    },
  },
  {
    slug: 'digital-marketing',
    title: 'Digital marketing & growth',
    shortTitle: 'Digital marketing',
    description:
      'Campaigns, media planning, and reporting that compound reach — search, social, email, and paid.',
    timeline: 'Ongoing · 4+ weeks',
    steps: [
      {
        title: 'Growth audit and baseline',
        text: 'We map channels, tracking, and conversion paths so every recommendation starts from real numbers.',
      },
      {
        title: 'Channel strategy and messaging',
        text: 'Where to show up, what to say, and which offers move the dial for your audience.',
      },
      {
        title: 'Creative and landing systems',
        text: 'Ads, emails, and landing pages built as a system — tested, tracked, and easy to iterate.',
      },
      {
        title: 'Launch and media buying',
        text: 'Careful spend across paid social and search with clear KPIs from day one.',
      },
      {
        title: 'Optimize and report',
        text: 'Weekly learning loops, budget shifts, and transparent reporting your team can act on.',
      },
    ],
    featured: {
      title: 'Western Store',
      type: 'Web design · Growth',
      year: '2025',
      image: westernStoreImg,
      url: 'https://western-store.vercel.app',
      blurb:
        'A festive apparel storefront needed more than a pretty catalog. We paired design with conversion-minded structure so browsing felt effortless on mobile.',
    },
  },
]

export function getServiceBySlug(slug) {
  return SERVICES.find((s) => s.slug === slug)
}
