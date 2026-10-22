import { ArrowUpRight, BrainCircuit, Database, Layers3, Radar, ShieldCheck, Sparkles } from 'lucide-react'

const architecture = [
  { icon: BrainCircuit, label: 'AI layer', detail: 'Role-aware resume analysis, evidence extraction, and grounded recommendations.' },
  { icon: Database, label: 'Data layer', detail: 'Structured profile, applications, feedback history, and reusable resume versions.' },
  { icon: Layers3, label: 'Product layer', detail: 'A focused workspace that turns insight into the next application action.' },
]

const workflow = ['Upload profile', 'Map to a role', 'Strengthen evidence', 'Track the next move']

export function SiraMapCase() {
  return (
    <section id="siramap" className="siramap-case section-pad relative overflow-hidden">
      <div className="siramap-orb siramap-orb-one" aria-hidden />
      <div className="siramap-orb siramap-orb-two" aria-hidden />
      <div className="mx-auto max-w-[1400px] px-5 md:px-10">
        <div className="mb-12 flex flex-wrap items-end justify-between gap-6 md:mb-16">
          <div><p className="mono-label mb-4 flex items-center gap-3 text-accent"><Sparkles size={13} aria-hidden /> Concept case study / 01</p><h2 className="max-w-3xl text-h2 text-gradient-accent">SiraMap turns job search into a product.</h2></div>
          <span className="rounded-full border border-accent/30 bg-accent/5 px-4 py-2 font-mono text-[10px] uppercase tracking-[0.18em] text-accent">Proposed · actively exploring</span>
        </div>
        <div className="siramap-shell accent-border">
          <div className="grid gap-10 p-6 md:p-10 lg:grid-cols-[0.9fr_1.1fr] lg:p-14">
            <div className="flex flex-col justify-between gap-10"><div><p className="mb-5 max-w-xl text-xl leading-relaxed text-text md:text-2xl">A private AI-powered career workspace for people who need better evidence, not generic advice.</p><p className="max-w-lg text-sm leading-7 text-muted">This is a product direction—not a shipped-result claim. It shows how I would turn resume analysis into a trustworthy workflow with clear boundaries, useful data, and a measurable user outcome.</p></div><div className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-line bg-line"><div className="bg-surface/80 p-5"><p className="mono-label mb-2">Core problem</p><p className="text-sm text-text">Scattered applications and vague feedback.</p></div><div className="bg-surface/80 p-5"><p className="mono-label mb-2">Design principle</p><p className="text-sm text-text">Every insight ends with an action.</p></div></div></div>
            <div className="siramap-dashboard rounded-2xl border border-line-strong bg-bg/70 p-4 md:p-6"><div className="mb-6 flex items-center justify-between border-b border-line pb-4"><div className="flex items-center gap-3"><span className="siramap-pulse" aria-hidden /><span className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted">Role fit workspace</span></div><span className="font-mono text-[10px] text-faint">LIVE CONCEPT</span></div><div className="mb-6 grid grid-cols-[1fr_auto] items-end gap-4"><div><p className="mono-label mb-2">Target role</p><p className="text-lg text-text">Full-stack engineer</p></div><div className="text-right"><p className="font-display text-5xl text-accent">82<span className="text-xl">%</span></p><p className="font-mono text-[9px] uppercase tracking-widest text-muted">evidence match</p></div></div><div className="mb-6 h-2 overflow-hidden rounded-full bg-surface-2"><div className="h-full w-[82%] rounded-full bg-gradient-to-r from-accent to-coral" /></div><div className="space-y-3">{['TypeScript + React evidence', 'API design proof', 'Add one measurable outcome'].map((item, index) => <div key={item} className="flex items-center justify-between rounded-xl border border-line bg-surface/60 px-4 py-3"><span className="text-sm text-text">{item}</span><span className={`font-mono text-[10px] uppercase tracking-widest ${index === 2 ? 'text-coral' : 'text-accent'}`}>{index === 2 ? 'next' : 'ready'}</span></div>)}</div></div>
          </div>
          <div className="grid border-t border-line lg:grid-cols-[0.8fr_1.2fr]"><div className="border-b border-line p-6 md:p-10 lg:border-b-0 lg:border-r"><p className="mono-label mb-6 flex items-center gap-2"><Radar size={13} aria-hidden /> Product loop</p><div className="space-y-4">{workflow.map((step, index) => <div key={step} className="flex items-center gap-4"><span className="font-mono text-[10px] text-accent">0{index + 1}</span><span className="text-sm text-text">{step}</span>{index < workflow.length - 1 && <span className="ml-auto h-px w-8 bg-line-strong" aria-hidden />}</div>)}</div></div><div className="p-6 md:p-10"><p className="mono-label mb-6 flex items-center gap-2"><ShieldCheck size={13} aria-hidden /> How I would build it</p><div className="grid gap-4 md:grid-cols-3">{architecture.map(({ icon: Icon, label, detail }) => <div key={label} className="siramap-arch-card"><Icon size={18} className="mb-5 text-accent" aria-hidden /><h3 className="mb-2 text-lg text-text">{label}</h3><p className="text-xs leading-6 text-muted">{detail}</p></div>)}</div></div></div>
        </div>
        <div className="mt-8 flex flex-wrap items-center justify-between gap-4"><p className="max-w-2xl text-sm text-muted">A strong portfolio case study should make the problem, product thinking, architecture, and honest status visible in one scan.</p><a href="https://github.com/Ab-xo/ai-resume-analyzer" target="_blank" rel="noreferrer" className="group inline-flex items-center gap-2 text-sm text-accent transition-colors hover:text-text">See the starting point <ArrowUpRight size={15} aria-hidden /></a></div>
      </div>
    </section>
  )
}
