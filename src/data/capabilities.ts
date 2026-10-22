// Skills and tools listed in Abraham's CV.

export type Capability = {
  index: string
  area: string
  summary: string
  stack: string[]
}

export const capabilities = {
  eyebrow: 'Capabilities',
  title: 'Technical capabilities',
  groups: [
    {
      index: '01',
      area: 'Languages & full-stack',
      summary:
        'Build responsive web products across frontend, backend, and database layers using a broad software engineering foundation.',
      stack: ['TypeScript', 'JavaScript', 'Python', 'Java', 'C++', 'PHP / Laravel', 'React', 'Next.js', 'Node.js', 'Express', 'Tailwind CSS'],
    },
    {
      index: '02',
      area: 'APIs & databases',
      summary:
        'Design and integrate APIs, authentication, and database-backed services with clear interfaces and practical documentation.',
      stack: ['REST', 'FastAPI', 'OpenAPI / Swagger', 'Postman', 'MongoDB', 'MySQL', 'JWT / OAuth'],
    },
    {
      index: '03',
      area: 'AI & data',
      summary:
        'Applied ML for forecasting, computer vision, and AI-assisted workflows, supported by data preparation and evaluation.',
      stack: ['PyTorch', 'scikit-learn', 'pandas', 'NumPy', 'SciPy', 'Statsmodels', 'RAG', 'LLM integration', 'Computer vision'],
    },
    {
      index: '04',
      area: 'Engineering & delivery',
      summary:
        'Prepare, automate, test, and debug applications with collaborative development and delivery practices.',
      stack: ['Docker', 'CI/CD', 'Git & GitHub', 'Linux', 'Bash', 'Cloud infrastructure', 'Testing', 'Web scraping & ETL', 'Streamlit', 'Agile / Scrum'],
    },
  ] satisfies Capability[],
}
