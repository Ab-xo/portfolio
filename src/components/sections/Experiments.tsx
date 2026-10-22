import { useRef } from 'react'
import { gsap } from '../../lib/gsap'
import { useIsomorphicLayoutEffect } from '../../hooks/useIsomorphicLayoutEffect'
import { experiments } from '../../data/site'
import { SectionHeader } from '../ui/SectionHeader'

// Proposed products are separated from the shipped-project portfolio.
export function Experiments() {
  const rootRef = useRef<HTMLElement>(null)

  useIsomorphicLayoutEffect(() => {
    const root = rootRef.current
    if (!root) return
    const mm = gsap.matchMedia()
    mm.add('(prefers-reduced-motion: no-preference)', () => {
      const ctx = gsap.context(() => {
        gsap.utils.toArray<HTMLElement>('[data-exp-row]').forEach((row) => {
          gsap.from(row, {
            y: 28,
            autoAlpha: 0,
            duration: 0.8,
            ease: 'expo.out',
            scrollTrigger: { trigger: row, start: 'top 90%', once: true },
          })
        })
      }, root)
      return () => ctx.revert()
    })
    return () => mm.revert()
  }, [])

  return (
    <section
      id="experiments"
      ref={rootRef}
      className="relative mx-auto max-w-[1400px] px-6 py-36 md:px-10 md:py-56"
    >
      <SectionHeader index="06" eyebrow={experiments.eyebrow} title={experiments.title} />

      <p className="mt-12 max-w-2xl text-lead text-muted">{experiments.body}</p>

      <div className="mt-16 grid gap-8 border-t border-line pt-8 md:grid-cols-3">
        {experiments.items.map((item, index) => (
          <article key={item.name} data-exp-row className="flex flex-col border-b border-line pb-8 md:border-b-0 md:border-r md:pr-8 last:border-r-0">
            <span className="mono-label uppercase">0{index + 1} <span className="px-2 text-faint">/</span> Proposed concept</span>
            <h3 className="mt-6 text-h3 font-display">{item.name}</h3>
            <p className="mt-3 text-sm text-accent">For {item.audience}</p>
            <p className="mt-4 text-muted">{item.description}</p>
          </article>
        ))}
      </div>
    </section>
  )
}
