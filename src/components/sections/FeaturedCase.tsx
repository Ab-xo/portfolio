import { useRef } from 'react'
import { gsap } from '../../lib/gsap'
import { useIsomorphicLayoutEffect } from '../../hooks/useIsomorphicLayoutEffect'
import { featuredProject } from '../../data/projects'
import { MagneticButton } from '../ui/MagneticButton'
import { SectionHeader } from '../ui/SectionHeader'

// Featured case study for the team's Addis Ride forecasting project.

export function FeaturedCase() {
  const rootRef = useRef<HTMLElement>(null)

  useIsomorphicLayoutEffect(() => {
    const root = rootRef.current
    if (!root) return

    const mm = gsap.matchMedia()

    mm.add('(prefers-reduced-motion: no-preference)', () => {
      const ctx = gsap.context(() => {
        // Clip-path reveal for the visual.
        gsap.from('[data-case-visual]', {
          clipPath: 'inset(0 0 100% 0)',
          duration: 1.4,
          ease: 'expo.out',
          scrollTrigger: { trigger: '[data-case-visual]', start: 'top 80%', once: true },
        })

      }, root)

      return () => ctx.revert()
    })

    return () => mm.revert()
  }, [])

  const p = featuredProject

  return (
    <section
      ref={rootRef}
      className="relative mx-auto max-w-[1400px] px-6 py-36 md:px-10 md:py-56"
    >
      <SectionHeader index="FC" eyebrow="Team project · Qiyas AI Hackathon" title={`${p.title} — forecasting demand across Addis Ababa`} />

      <div className="mt-16 grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
        {/* Visual */}
        <div
          data-case-visual
          className="relative aspect-[4/3] overflow-hidden rounded-sm border border-line bg-surface shadow-[var(--shadow-card)]"
        >
          <div className="absolute inset-0" aria-hidden>
            <div
              className="absolute inset-0 opacity-20"
              style={{
                background: `radial-gradient(120% 120% at 20% 0%, var(--color-accent), transparent 45%)`,
              }}
            />
            <div className="absolute inset-5 border border-line-strong bg-bg/90 sm:inset-8">
              <div className="flex items-center gap-1.5 border-b border-line px-4 py-3">
                <span className="h-2 w-2 rounded-full bg-faint" />
                <span className="h-2 w-2 rounded-full bg-faint" />
                <span className="h-2 w-2 rounded-full bg-faint" />
                <span className="ml-3 font-mono text-[10px] text-faint">
                  addis-ride / forecast dashboard
                </span>
              </div>
              <div className="grid h-[calc(100%-44px)] grid-cols-[1.2fr_0.8fr] gap-3 p-4 sm:gap-5 sm:p-6">
                <div className="relative overflow-hidden border border-line bg-surface p-3 sm:p-4">
                  <p className="mono-label text-[9px] uppercase">12 forecast zones</p>
                  <div className="relative mt-3 h-[62%] min-h-28 overflow-hidden border border-line bg-[#142323]">
                    <div className="absolute inset-0 opacity-30" style={{ backgroundImage: 'linear-gradient(rgba(83,224,194,.18) 1px, transparent 1px), linear-gradient(90deg, rgba(83,224,194,.18) 1px, transparent 1px)', backgroundSize: '22px 22px' }} />
                    {['left-[20%] top-[25%]', 'left-[54%] top-[18%]', 'left-[68%] top-[52%]', 'left-[34%] top-[63%]', 'left-[80%] top-[28%]', 'left-[45%] top-[42%]'].map((position, index) => (
                      <span key={position} className={`absolute ${position} h-2.5 w-2.5 rounded-full border border-[#11201e] ${index % 2 ? 'bg-[#e6a77a]' : 'bg-[#53e0c2]'}`} />
                    ))}
                  </div>
                  <div className="mt-3 flex items-end gap-1.5" aria-hidden="true">
                    {[34, 51, 43, 68, 57, 84, 62, 94, 70, 76, 55, 88].map((height, index) => (
                      <span key={index} className="flex-1 bg-[#53e0c2]/75" style={{ height: `${height}%` }} />
                    ))}
                  </div>
                </div>
                <div className="flex flex-col gap-3 sm:gap-5">
                  <div className="border border-line bg-surface p-3 sm:p-4">
                    <p className="mono-label text-[9px] uppercase">Validation RMSE</p>
                    <p className="mt-2 font-display text-3xl text-[#53e0c2] sm:text-4xl">8.09</p>
                    <p className="text-[10px] text-muted">trips / zone-hour</p>
                  </div>
                  <div className="flex-1 border border-line bg-surface p-3 sm:p-4">
                    <p className="mono-label text-[9px] uppercase">Model</p>
                    <p className="mt-2 text-sm text-text">LightGBM</p>
                    <p className="mt-1 text-[10px] text-muted">36 forecast-time features</p>
                    <div className="mt-4 h-px bg-line" />
                    <p className="mt-3 text-[10px] leading-relaxed text-muted">Hourly demand · weather · city events</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Narrative */}
        <div className="flex flex-col justify-center">
          <p className="mono-label uppercase">{p.category}</p>
          <p className="mt-6 text-lead text-text">{p.description}</p>
          <p className="mt-4 text-muted">{p.outcome} The work was completed with a six-person team; the dataset is synthetic and was supplied for the hackathon.</p>

          <dl className="mt-10 grid grid-cols-2 gap-6 border-t border-line pt-8">
            {[
              { value: '8.09', label: 'Held-out validation RMSE' },
              { value: '19%', label: 'Better than seasonal baseline' },
            ].map((m) => (
              <div key={m.label}>
                <dd className="font-display text-[clamp(2rem,4vw,3rem)] text-accent tabular-nums">
                  {m.value}
                </dd>
                <dt className="mt-2 text-xs text-muted">{m.label}</dt>
              </div>
            ))}
          </dl>

          <div className="mt-10">
            <MagneticButton href={p.href} variant="outline">
              View repository
            </MagneticButton>
          </div>
        </div>
      </div>
    </section>
  )
}
