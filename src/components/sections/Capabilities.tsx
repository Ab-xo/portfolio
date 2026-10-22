import { useRef } from 'react'
import { gsap } from '../../lib/gsap'
import { useIsomorphicLayoutEffect } from '../../hooks/useIsomorphicLayoutEffect'
import { capabilities } from '../../data/capabilities'
import { SectionHeader } from '../ui/SectionHeader'

// Capabilities as an editorial index (not a logo grid). Each row reveals on
// scroll with a hairline draw, reinforcing the HUD language.
export function Capabilities() {
  const rootRef = useRef<HTMLElement>(null)

  useIsomorphicLayoutEffect(() => {
    const root = rootRef.current
    if (!root) return

    const mm = gsap.matchMedia()
    mm.add('(prefers-reduced-motion: no-preference)', () => {
      const ctx = gsap.context(() => {
        gsap.utils.toArray<HTMLElement>('[data-cap-row]').forEach((row) => {
          gsap.from(row, {
            y: 32,
            autoAlpha: 0,
            duration: 0.9,
            ease: 'expo.out',
            scrollTrigger: { trigger: row, start: 'top 88%', once: true },
          })
        })
      }, root)
      return () => ctx.revert()
    })
    return () => mm.revert()
  }, [])

  return (
    <section
      id="capabilities"
      ref={rootRef}
      className="relative mx-auto max-w-[1400px] px-6 py-36 md:px-10 md:py-56"
    >
      <SectionHeader index="03" eyebrow={capabilities.eyebrow} title={capabilities.title} />

      <div className="mt-16 border-t border-line">
        {capabilities.groups.map((g) => (
          <div
            key={g.index}
            data-cap-row
            className="group grid gap-6 border-b border-line py-12 transition-colors duration-500 hover:bg-white/[0.015] md:grid-cols-[auto_1fr_1.2fr] md:items-start md:gap-16"
          >
            <span className="font-mono text-sm text-accent tabular-nums">{g.index}</span>

            <h3 className="text-h3 font-display transition-colors duration-300 group-hover:text-accent">
              {g.area}
            </h3>

            <div>
              <p className="max-w-xl text-muted">{g.summary}</p>
              <ul className="mt-5 flex flex-wrap gap-2">
                {g.stack.map((s) => (
                  <li
                    key={s}
                    className="rounded-sm border border-line px-3 py-1 font-mono text-[10px] uppercase tracking-wider text-faint transition-colors duration-300 group-hover:border-accent/40"
                  >
                    {s}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
