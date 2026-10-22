// -----------------------------------------------------------------------------
// Portfolio content, grounded in Abraham's CV and public project work.
// -----------------------------------------------------------------------------

export const site = {
  name: 'Abraham',
  fullName: 'Abraham Gebeyehu',
  role: 'Computer Scientist · Full-Stack Software Engineer · AI / ML Engineer',
  location: 'Addis Ababa, ET',
  timezone: 'EAT',
  email: 'gebeyehuabraham19@gmail.com',
  phone: '+251984876850',
  availability: 'Open to full-time roles and freelance projects',

  // Hero headline is intentionally split into lines for the staggered reveal.
  heroLines: ['Full-stack', 'software,', 'built to ship.'],
  heroStatement:
    'I build useful web products end to end, and bring data and AI into the parts of a product where they make a real difference.',

  socials: [
    { label: 'GitHub', href: 'https://github.com/Ab-xo' },
    { label: 'LinkedIn', href: 'https://linkedin.com/in/abraham-gebeyehu-builds' },
    { label: 'Hugging Face', href: 'https://huggingface.co/Ab-xodev' },
    { label: 'Email', href: 'mailto:gebeyehuabraham19@gmail.com' },
  ],
} as const

export const nav = [
  { label: 'Work', target: '#work' },
  { label: 'Capabilities', target: '#capabilities' },
  { label: 'Experience', target: '#journey' },
  { label: 'About', target: '#about' },
  { label: 'Contact', target: '#contact' },
] as const

// Short manifesto shown in the Intro section — line-by-line reveal on scroll.
export const introStatement = {
  eyebrow: 'Introduction',
  lines: [
    'I work from the data layer',
    'through the API and interface,',
    'to a product people can use.',
  ],
  body: 'Since 2022, I have built full-stack applications as a freelance developer and student project developer. My recent work spans React and Node.js products, Python data workflows, demand forecasting, computer vision, and AI-assisted resume analysis.',
}

// AI + Software Engineering feature block
export const aiFocus = {
  eyebrow: 'AI Engineering',
  title: 'From model to product',
  body: 'I build practical AI and data features around real product needs: forecasting, computer vision, resume analysis, and the full-stack interfaces that make those systems usable.',
  pillars: [
    {
      k: 'Applied ML',
      v: 'Forecasting, deep learning, computer vision, and model evaluation using Python and PyTorch.',
    },
    {
      k: 'AI applications',
      v: 'Resume analysis, role-focused feedback, retrieval-augmented generation, and LLM integration for focused user workflows.',
    },
    {
      k: 'Product surface',
      v: 'React and Next.js interfaces connected to APIs, databases, and deployed data applications.',
    },
  ],
}

// Proposed products are explicitly separated from shipped work.
export const experiments = {
  eyebrow: 'Proposed work',
  title: 'Ideas worth building next',
  body: 'These are product concepts, not shipped projects. Each grows from work already represented in my portfolio and targets a practical user need.',
  items: [
    {
      name: 'Siramap Career Workspace',
      audience: 'Job seekers',
      description: 'Extend resume-to-role feedback into a private application tracker with tailored resume versions, interview preparation, and clear next steps for each opportunity.',
    },
    {
      name: 'Freelance Project Desk',
      audience: 'Independent developers',
      description: 'A lightweight client workspace for intake, project scope, proposals, milestones, approvals, and invoice status, designed to reduce coordination overhead.',
    },
    {
      name: 'RetailPulse Stock Planner',
      audience: 'Small retailers',
      description: 'Build on demand forecasting with explainable reorder suggestions, simple sales imports, and inventory alerts for small businesses with limited analytics support.',
    },
  ],
}

export const about = {
  eyebrow: 'About',
  title: 'Abraham',
  paragraphs: [
    'I am a computer scientist, full-stack software engineer, and AI / ML engineer based in Addis Ababa, Ethiopia. I graduated with a BSc in Computer Science from Admas University in March 2026.',
    'My work combines TypeScript, React, Next.js, Node.js, Python, and databases. I enjoy carrying a project from data preparation and API design to a responsive, usable interface.',
    'I am currently taking the Advanced Digital Skills program in Intelligent Data & AI Engineering at Addis Ababa University through Qiyas.',
  ],
  stats: [
    { k: 'Computer Science', v: 'BSc' },
    { k: 'CGPA', v: '3.87 / 4.00' },
    { k: 'Based in', v: 'Addis Ababa' },
  ],
  education: [
    {
      qualification: 'BSc in Computer Science',
      institution: 'Admas University · Addis Ababa',
      detail: 'Graduated March 2026 · CGPA 3.87 / 4.00',
    },
    {
      qualification: 'Intelligent Data & AI Engineering',
      institution: 'Qiyas Advanced Digital Skills · Addis Ababa University',
      detail: 'May 2026 – Present',
    },
  ],
  tools: ['Claude Code', 'Cursor', 'ChatGPT', 'Gemini', 'Postman', 'OpenAPI / Swagger', 'Docker', 'Git & GitHub', 'Linux', 'Bash', 'CI/CD'],
  languages: ['Amharic', 'English'],
  interests: ['Video games', 'AI research', 'Travel', 'Hackathons', 'Open source'],
}

export const contact = {
  eyebrow: 'Contact',
  title: "Let's build something",
  body: 'I am interested in full-time software engineering opportunities and freelance work across full-stack development, AI applications, and data products.',
  cta: 'Discuss a project',
}
