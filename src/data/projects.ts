// Public portfolio projects. Descriptions and outcomes are grounded in the CV
// and the linked repositories; no client or production claims are implied.

export type Project = {
  id: string
  index: string // shown as mono readout, e.g. "01"
  title: string
  category: string
  year: string
  role: string
  description: string
  tech: string[]
  outcome: string
  href: string
  demoHref?: string
  featured?: boolean
  hue: number
}

export const projects: Project[] = [
  {
    id: 'addis-ride',
    index: '01',
    title: 'Addis Ride Forecast',
    category: 'Data · Forecasting · Team project',
    year: '2026',
    role: 'Hackathon team member · 6-person team',
    description:
      'Hourly ride-demand forecasting across 12 Addis Ababa zones, with a LightGBM model and an interactive map-based demo.',
    tech: ['Python', 'LightGBM', 'FastAPI', 'Next.js'],
    outcome: 'Validation RMSE 8.09; 19% better than the seasonal-naive baseline.',
    href: 'https://github.com/Ab-xo/addis_ride_forecast',
    demoHref: 'https://teamdev-addisride.vercel.app/',
    featured: true,
    hue: 42,
  },
  {
    id: 'ak-drop',
    index: '02',
    title: 'AK Drop Commerce',
    category: 'Full-stack · Commerce',
    year: '2026',
    role: 'Full-stack developer',
    description:
      'A multi-category storefront with product discovery, persistent cart, accounts, order history, and an admin dashboard.',
    tech: ['Next.js', 'TypeScript', 'Supabase', 'PostgreSQL', 'Stripe test mode'],
    outcome: 'Checkout uses test payments; shipping and fulfillment are not connected.',
    href: 'https://github.com/Ab-xo/Ak-drop-Commerce-Platform',
    demoHref: 'https://ak-drop-commerce.vercel.app/',
    featured: true,
    hue: 166,
  },
  {
    id: 'coffee-guard',
    index: '03',
    title: 'CoffeeGuard AI',
    category: 'Applied ML · Computer vision · Team project',
    year: '2026',
    role: 'AI / ML engineer · team project',
    description:
      'Coffee-leaf disease classification with confidence scores, visual explanations, robustness checks, and a deliberate uncertain-answer path.',
    tech: ['Python', 'PyTorch', 'EfficientNetV2', 'FastAPI', 'Streamlit'],
    outcome: 'Held-out macro-F1 0.974 (379 images); accuracy on the external BRACOL set is 0.63, so field performance needs more validation.',
    href: 'https://github.com/Ab-xo/coffee-guard-ai',
    hue: 158,
  },
  {
    id: 'etflix',
    index: '04',
    title: 'EtFlix',
    category: 'Frontend · Media discovery',
    year: '2026',
    role: 'Frontend developer',
    description:
      'A responsive movie and series discovery interface with catalog search, genre and year filters, pagination, and a video-player UI.',
    tech: ['React', 'JavaScript', 'GSAP', 'TMDB API'],
    outcome: 'Authentication and streaming are currently interface-level features.',
    href: 'https://github.com/Ab-xo/EtFlix',
    hue: 202,
  },
  {
    id: 'siramap',
    index: '05',
    title: 'Siramap',
    category: 'AI application · Career tools',
    year: '2026',
    role: 'Full-stack project developer',
    description:
      'A resume-analysis project designed to help candidates understand how clearly their resume communicates fit for a specific role.',
    tech: ['React', 'JavaScript', 'AI / LLM integration'],
    outcome: 'A practical job-seeker workflow, with role-specific resume feedback.',
    href: 'https://github.com/Ab-xo/ai-resume-analyzer',
    hue: 24,
  },
  {
    id: 'web-scraper-toolkit',
    index: '06',
    title: 'Web Scraper Toolkit',
    category: 'Full-stack · Automation',
    year: '2026',
    role: 'Full-stack developer',
    description:
      'A web-scraping platform combining an API backend and a browser-based interface for configurable extraction workflows.',
    tech: ['Python', 'FastAPI', 'Playwright', 'React', 'Tailwind CSS'],
    outcome: 'Built as a portfolio project; review the repository for implementation details.',
    href: 'https://github.com/Ab-xo/web-scraper-toolkit',
    hue: 192,
  },
  {
    id: 'admas-blog',
    index: '07',
    title: 'Admas Collaborative Blog',
    category: 'Full-stack · Collaboration',
    year: '2026',
    role: 'Student project developer',
    description:
      'A collaborative publishing platform for the university community, built to improve communication and shared publishing.',
    tech: ['React', 'Node.js', 'MongoDB', 'AI-assisted writing'],
    outcome: 'Final-year project at Admas University.',
    href: 'https://github.com/Ab-xo/Fullstack-Collaborative-Blogging-Platform-for-Admas-Univeristy',
    hue: 340,
  },
]

export const featuredProject = projects.find((p) => p.featured) as Project
