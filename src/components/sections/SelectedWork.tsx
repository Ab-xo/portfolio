import { ArrowUpRight, Github } from 'lucide-react'
import { projects } from '../../data/projects'
import { HudGrid } from '../ui/HudGrid'

export function SelectedWork() {
  return (
    <section id="work" className="relative overflow-hidden">
      <HudGrid className="opacity-60" />

      <div className="mx-auto flex max-w-[1400px] items-end justify-between px-6 pt-24 md:px-10">
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-4">
            <span className="font-mono text-xs text-accent">SW</span>
            <span className="mono-label uppercase">Selected Work</span>
          </div>
          <h2 className="max-w-[14ch] text-h2 font-display">Selected projects</h2>
        </div>
        <a
          href="https://github.com/Ab-xo?tab=repositories"
          target="_blank"
          rel="noreferrer"
          className="hidden min-h-11 items-center gap-2 text-sm text-muted transition-colors hover:text-accent md:inline-flex"
        >
          <Github className="h-4 w-4" aria-hidden="true" /> All repositories
          <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
        </a>
      </div>

      <div className="mx-auto grid max-w-[1400px] gap-px border-y border-line bg-line px-6 py-12 md:grid-cols-2 md:px-10 md:py-16">
        {projects.map((p) => (
          <article key={p.id} className="group flex min-h-[360px] flex-col justify-between bg-bg p-7 transition-colors duration-300 hover:bg-surface md:min-h-[400px] md:p-9">
            <div>
              <div className="flex items-start justify-between gap-6">
                <p className="mono-label uppercase">{p.index} <span className="px-2 text-faint">/</span> {p.category}</p>
                <span className="font-mono text-xs text-faint">{p.year}</span>
              </div>
              <h3 className="mt-8 max-w-[16ch] font-display text-4xl leading-[1.02] md:text-5xl">
                {p.title}
              </h3>
              <p className="mt-5 max-w-xl text-muted">{p.description}</p>
              <p className="mt-5 text-sm text-muted">
                <span className="mono-label mr-3 uppercase">Role</span>{p.role}
              </p>
            </div>

            <div className="mt-10">
              <p className="border-l border-accent pl-3 text-sm text-text">{p.outcome}</p>
              <div className="mt-6 flex flex-wrap gap-x-4 gap-y-2">
                {p.tech.map((t) => (
                  <span key={t} className="font-mono text-[10px] uppercase text-faint">{t}</span>
                ))}
              </div>
              <div className="mt-7 flex flex-wrap gap-x-6 gap-y-2 border-t border-line pt-4">
                <a href={p.href} target="_blank" rel="noreferrer" className="inline-flex min-h-11 items-center gap-2 text-sm text-muted transition-colors hover:text-accent">
                  <Github className="h-4 w-4" aria-hidden="true" /> Source code
                  <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                </a>
                {p.demoHref && (
                  <a href={p.demoHref} target="_blank" rel="noreferrer" className="inline-flex min-h-11 items-center gap-2 text-sm text-muted transition-colors hover:text-accent">
                    Live demo <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                  </a>
                )}
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
