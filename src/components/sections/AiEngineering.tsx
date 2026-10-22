import { aiFocus } from '../../data/site'
import { SectionHeader } from '../ui/SectionHeader'
import { HudGrid } from '../ui/HudGrid'

// AI + Software Engineering feature block. Sits on a raised surface to signal
// it's the thematic core of the site. Three pillars, no icon soup.
export function AiEngineering() {
  return (
    <section id="ai" className="relative overflow-hidden border-y border-line bg-surface">
      <HudGrid className="opacity-40" />
      <div className="relative mx-auto max-w-[1400px] px-6 py-36 md:px-10 md:py-56">
        <SectionHeader index="05" eyebrow={aiFocus.eyebrow} title={aiFocus.title} />

        <p className="mt-12 max-w-2xl text-lead text-muted">{aiFocus.body}</p>

        <div className="mt-20 grid gap-px overflow-hidden rounded-sm border border-line bg-line md:grid-cols-3">
          {aiFocus.pillars.map((pillar, i) => (
            <div
              key={pillar.k}
              className="group relative flex flex-col justify-between gap-12 bg-surface p-8 transition-colors duration-500 hover:bg-surface-2 md:p-10"
            >
              <span className="font-mono text-sm text-accent tabular-nums">
                {String(i + 1).padStart(2, '0')}
              </span>
              <div>
                <h3 className="text-h3 font-display">{pillar.k}</h3>
                <p className="mt-4 text-muted">{pillar.v}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
