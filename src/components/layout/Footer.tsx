import { useRef } from 'react'
import { gsap } from '../../lib/gsap'
import { useIsomorphicLayoutEffect } from '../../hooks/useIsomorphicLayoutEffect'
import { site } from '../../data/site'

// Footer: a large wordmark reveal on enter, plus socials and meta in HUD
// language. The oversized name wipes up as the section is reached.
export function Footer() {
  const rootRef = useRef<HTMLElement>(null)

  useIsomorphicLayoutEffect(() => {
    const root = rootRef.current
    if (!root) return
    const mm = gsap.matchMedia()
    mm.add('(prefers-reduced-motion: no-preference)', () => {
      const ctx = gsap.context(() => {
        gsap.set('[data-foot-line]', { yPercent: 110 })
        gsap.to('[data-foot-line]', {
          yPercent: 0,
          duration: 1.2,
          ease: 'expo.out',
          scrollTrigger: { trigger: root, start: 'top 85%', once: true },
        })
      }, root)
      return () => ctx.revert()
    })
    return () => mm.revert()
  }, [])

  const year = new Date().getFullYear()

  return (
    <footer ref={rootRef} className="relative overflow-hidden border-t border-line px-6 pt-24 md:px-10">
      <div className="mx-auto max-w-[1400px]">
        <div className="flex flex-col gap-10 pb-16 md:flex-row md:items-start md:justify-between">
          <div className="max-w-sm">
            <p className="mono-label uppercase">Available</p>
            <p className="mt-3 text-lead text-text">{site.availability}</p>
          </div>

          <nav aria-label="Social" className="flex flex-col gap-3">
            {site.socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
          className="group flex min-h-11 items-center gap-3 text-muted transition-colors duration-300 hover:text-accent"
              >
                <span className="font-mono text-xs text-faint">↗</span>
                {s.label}
                <span className="h-px w-0 bg-accent transition-all duration-300 group-hover:w-8" />
              </a>
            ))}
          </nav>
        </div>

        {/* Oversized wordmark */}
        <div className="reveal-mask border-t border-line pt-8">
          <span
            data-foot-line
            className="block font-display text-[22vw] italic leading-[0.8] tracking-tight text-text md:text-[19vw]"
          >
            {site.name}
          </span>
        </div>

        <div className="flex flex-col gap-4 border-t border-line py-8 md:flex-row md:items-center md:justify-between">
          <span className="mono-label">
            © {year} {site.fullName}. All rights reserved.
          </span>
          <span className="mono-label uppercase">
            {site.location} · {site.timezone}
          </span>
          <a href="#top" className="mono-label inline-flex min-h-11 items-center uppercase transition-colors hover:text-accent">
            Back to top ↑
          </a>
        </div>
      </div>
    </footer>
  )
}
