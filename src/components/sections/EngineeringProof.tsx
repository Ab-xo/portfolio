import { Activity, Boxes, GitBranch, Gauge, ShieldCheck, Workflow } from 'lucide-react'

const cards = [
  { icon: Boxes, label: 'Architecture', title: 'Product systems', body: 'UI, APIs, data, and AI features designed as one connected product surface.' },
  { icon: Workflow, label: 'Delivery', title: 'End to end', body: 'From discovery and data preparation to implementation, testing, and deployment.' },
  { icon: ShieldCheck, label: 'Trust', title: 'Built responsibly', body: 'Clear limitations, validation notes, fallback states, and honest project status.' },
]

export function EngineeringProof() {
  return (
    <section id="proof" className="relative mx-auto max-w-[1400px] px-6 py-32 md:px-10 md:py-48">
      <div className="mb-12 grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
        <div>
          <p className="mono-label mb-4 flex items-center gap-3 text-accent"><Activity size={13} aria-hidden /> Engineering proof</p>
          <h2 className="max-w-2xl text-h2">Not just interfaces. <span className="italic-accent text-accent">Systems.</span></h2>
        </div>
        <p className="max-w-xl text-lead text-muted">The strongest work sits where product thinking, reliable engineering, and applied AI meet.</p>
      </div>
      <div className="grid gap-4 md:grid-cols-3">
        {cards.map(({ icon: Icon, label, title, body }) => (
          <article key={label} className="accent-border rounded-2xl border border-line bg-surface/60 p-6 transition-transform duration-500 hover:-translate-y-1 md:p-8">
            <Icon size={19} className="mb-10 text-accent" aria-hidden />
            <p className="mono-label mb-3">{label}</p>
            <h3 className="mb-4 text-h3">{title}</h3>
            <p className="text-sm leading-7 text-muted">{body}</p>
          </article>
        ))}
      </div>
      <div className="mt-4 grid gap-4 rounded-2xl border border-line bg-surface/40 p-6 md:p-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
        <div>
          <p className="mono-label mb-4 flex items-center gap-3"><GitBranch size={13} aria-hidden /> Working signal</p>
          <p className="max-w-md text-sm leading-7 text-muted">A recruiter should see both the stack and the engineering judgement behind it.</p>
        </div>
        <div className="space-y-5">
          {[['Frontend systems', 'React · Next.js · TypeScript', '92%'], ['Backend interfaces', 'FastAPI · Node.js · REST', '84%'], ['AI productisation', 'PyTorch · LLMs · RAG', '78%']].map(([label, value, width]) => (
            <div key={label}><div className="mb-2 flex items-center justify-between gap-4 text-xs"><span className="text-text">{label}</span><span className="font-mono text-[10px] text-faint">{value}</span></div><div className="h-1 overflow-hidden rounded-full bg-surface-2"><div className="h-full rounded-full bg-gradient-to-r from-accent to-coral" style={{ width }} /></div></div>
          ))}
        </div>
      </div>
      <div className="mt-4 flex items-center gap-3 border-t border-line pt-6 text-xs text-faint"><Gauge size={14} className="text-accent" aria-hidden /> Portfolio signal: practical, measurable, and ready to discuss in an interview.</div>
    </section>
  )
}
