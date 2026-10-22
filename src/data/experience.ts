// Experience and education timeline, based on Abraham's CV.

export type Milestone = {
  index: string
  period: string
  title: string
  org: string
  detail: string
}

export const journey = {
  eyebrow: 'Journey',
  title: 'Experience & education',
  milestones: [
    {
      index: '01',
      period: '2022 – Present',
      title: 'Freelance Full-Stack Developer',
      org: 'Self-employed · Addis Ababa, Ethiopia',
      detail:
        'Build full-stack web applications with React, Next.js, TypeScript, Node.js, Express, MongoDB, and MySQL. Recent work includes commerce, publishing, and business systems.',
    },
    {
      index: '02',
      period: '2022 – March 2026',
      title: 'BSc Computer Science',
      org: 'Admas University · Addis Ababa, Ethiopia',
      detail:
        'Graduated with a 3.87 / 4.00 CGPA. Final-year project: a collaborative platform for improving university communication.',
    },
    {
      index: '03',
      period: 'May 2026 – Present',
      title: 'Intelligent Data & AI Engineering',
      org: 'Qiyas Advanced Digital Skills · Addis Ababa University',
      detail:
        'Advanced training in data and AI engineering, including supervised learning, time-series forecasting, deep learning, LLMs, retrieval-augmented generation, and agentic AI.',
    },
  ] satisfies Milestone[],
}
