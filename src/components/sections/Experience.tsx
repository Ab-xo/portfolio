import { useRef } from 'react'
import { gsap } from '../../lib/gsap'
import { useIsomorphicLayoutEffect } from '../../hooks/useIsomorphicLayoutEffect'
import { journey } from '../../data/experience'
import { SectionHeader } from '../ui/SectionHeader'

// Experience / learning journey. This IS a real sequence, so numbered markers
// and a drawn timeline spine are justified. The spine scales in as the section
// enters, and each milestone fades up in order.
export function Experience() {
  const rootRef = useRef<HTMLElement>(null)

  useIsomorphicLayoutEffect(() => {
    const root = rootRef.current
    if (!root) return

    const mm = gsap.matchMedia()
    mm.add('(prefers-reduced-motion: no-preference)', () => {
      const ctx = gsap.context(() => {
        gsap.from('[data-spine]', {
          scaleY: 0,
          transformOrigin: 'top',
          ease: 'none',
          scrollTrigger: {
            trigger: '[data-timeline]',
            start: 'top 70%',
            end: 'bottom 80%',
            scrub: true,
          },
        })

        gsap.utils.toArray<HTMLElement>('[data-milestone]').forEach((m) => {
          gsap.from(m, {
            y: 40,
            autoAlpha: 0,
            duration: 0.9,
            ease: 'expo.out',
            scrollTrigger: { trigger: m, start: 'top 85%', once: true },
          })
        })
      }, root)
      return () => ctx.revert()
    })
    return () => mm.revert()
  }, [])

  return (
    <section
      id="journey"
      ref={rootRef}
      className="relative mx-auto max-w-[1400px] px-6 py-36 md:px-10 md:py-56"
    >
      <SectionHeader index="04" eyebrow={journey.eyebrow} title={journey.title} />

      <div data-timeline className="relative mt-20 pl-8 md:pl-0">
        {/* Spine */}
        <span
          data-spine
          aria-hidden
          className="absolute left-0 top-2 h-full w-px bg-line-strong md:left-[calc(16.666%-0.5px)]"
        />

        <ol className="flex flex-col gap-16">
          {journey.milestones.map((m) => (
            <li
              key={m.index}
              data-milestone
              className="relative grid gap-4 md:grid-cols-[1fr_2fr] md:gap-12"
            >
              {/* Node */}
              <span
                aria-hidden
                className="absolute -left-8 top-2 h-2.5 w-2.5 -translate-x-1/2 rounded-full bg-accent md:left-[16.666%]"
              />
              <div className="flex items-baseline gap-4 md:flex-col md:gap-1">
                <span className="font-mono text-sm text-accent tabular-nums">{m.index}</span>
                <span className="font-mono text-sm text-muted">{m.period}</span>
              </div>
              <div>
                <h3 className="text-h3 font-display">{m.title}</h3>
                <p className="mt-1 mono-label uppercase">{m.org}</p>
                <p className="mt-4 max-w-xl text-muted">{m.detail}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
