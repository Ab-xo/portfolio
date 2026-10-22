import { lazy, Suspense, useRef } from 'react'
import { gsap } from '../../lib/gsap'
import { useIsomorphicLayoutEffect } from '../../hooks/useIsomorphicLayoutEffect'
import { site } from '../../data/site'
import { HudGrid } from '../ui/HudGrid'
import { MagneticButton } from '../ui/MagneticButton'
import { ScrollIndicator } from '../ui/ScrollIndicator'

const AvatarScene = lazy(() =>
  import('../ui/AvatarScene').then(({ AvatarScene: Scene }) => ({ default: Scene })),
)
const HeroAtmosphere = lazy(() =>
  import('../ui/HeroAtmosphere').then(({ HeroAtmosphere: Atmosphere }) => ({ default: Atmosphere })),
)

// Hero: the payoff of the opening timeline. Large display headline reveals
// line-by-line (masked), supporting copy and CTAs fade up after, and the grid
// drifts subtly with scroll for depth. `ready` gates the entrance so it starts
// right as the preloader clears.
export function Hero({ ready }: { ready: boolean }) {
  const rootRef = useRef<HTMLElement>(null)
  const gridRef = useRef<HTMLDivElement>(null)

  useIsomorphicLayoutEffect(() => {
    if (!ready) return
    const root = rootRef.current
    if (!root) return

    const mm = gsap.matchMedia()

    mm.add('(prefers-reduced-motion: no-preference)', () => {
      const ctx = gsap.context(() => {
        const lines = gsap.utils.toArray<HTMLElement>('[data-hero-line]')
        gsap.set(lines, { yPercent: 120 })

        const tl = gsap.timeline({ defaults: { ease: 'expo.out' } })
        tl.to(lines, { yPercent: 0, duration: 1.2, stagger: 0.12 })
          .from(
            '[data-hero-fade]',
            { y: 24, autoAlpha: 0, duration: 1, stagger: 0.12 },
            '-=0.6',
          )

        // Subtle parallax on the HUD grid as the hero scrolls away.
        gsap.to(gridRef.current, {
          yPercent: 18,
          ease: 'none',
          scrollTrigger: {
            trigger: root,
            start: 'top top',
            end: 'bottom top',
            scrub: true,
          },
        })
      }, root)

      return () => ctx.revert()
    })

    return () => mm.revert()
  }, [ready])

  return (
    <section
      ref={rootRef}
      id="top"
      className="relative flex min-h-dvh flex-col justify-center overflow-hidden px-6 pb-16 pt-28 md:px-10 md:pb-20 md:pt-32"
    >
      <div ref={gridRef} className="absolute inset-0 -z-10">
        <HudGrid />
      </div>

      <Suspense fallback={null}>
        <HeroAtmosphere />
      </Suspense>

      {/* Ambient light — one warm source low in the frame, behind the grid */}
      <div
        aria-hidden
        className="aurora left-1/2 top-auto -z-10 h-[38vh] w-[60vw] -translate-x-1/2 bottom-[-10vh]"
        style={{ background: 'radial-gradient(ellipse, rgba(83,224,194,0.10), transparent 70%)' }}
      />

      {/* Corner HUD readouts */}
      <div className="pointer-events-none absolute inset-x-6 top-28 z-20 flex justify-between md:inset-x-10">
        <span className="mono-label uppercase">{site.availability}</span>
        <span className="mono-label uppercase">
          {site.location} · {site.timezone}
        </span>
      </div>

      <div className="mx-auto grid w-full max-w-[1400px] items-center gap-2 md:grid-cols-[1.1fr_0.9fr] lg:gap-2">
        <div className="relative z-10 order-last md:order-first">
          <p data-hero-fade className="mono-label mb-5 uppercase text-accent md:mb-8">
            {site.fullName} <span className="px-2 text-faint">/</span> Addis Ababa, Ethiopia
          </p>

          <h1 className="max-w-[12ch] font-display text-5xl font-normal leading-[0.98] md:text-6xl lg:text-8xl">
            {['Full-stack', 'products.', 'Practical AI.'].map((line, i) => (
              <span key={line} className="reveal-mask">
                <span
                  data-hero-line
                  className={`block ${i === 2 ? 'italic-accent text-gradient-accent' : ''}`}
                >
                  {line}
                </span>
              </span>
            ))}
          </h1>

          <p data-hero-fade className="mt-6 max-w-xl text-base text-muted md:mt-8 md:text-lead">
            {site.heroStatement}
          </p>

          <div data-hero-fade className="mt-7 flex flex-wrap items-center gap-3 md:mt-10 md:gap-4">
            <MagneticButton href="#work">Explore my work</MagneticButton>
            <MagneticButton href="#contact" variant="outline">
              Contact me
            </MagneticButton>
            <a
              href="/Abraham_Gebeyehu_CV.pdf"
              download
              className="inline-flex min-h-11 items-center px-3 text-sm text-muted underline decoration-line-strong underline-offset-4 transition-colors hover:text-accent"
            >
              Download CV
            </a>
          </div>

          <div data-hero-fade className="mt-7 flex flex-wrap gap-x-6 gap-y-2 border-t border-line pt-4 md:mt-12 md:gap-x-8 md:gap-y-3 md:pt-6">
            <span className="mono-label uppercase">BSc Computer Science</span>
            <span className="mono-label uppercase">CGPA 3.87 / 4.00</span>
            <span className="mono-label uppercase">Freelance since 2022</span>
          </div>
        </div>

        <div data-hero-fade className="relative z-10 mx-auto order-first w-full max-w-[176px] md:order-last md:max-w-[380px] lg:-mr-4 lg:max-w-[560px]">
          <Suspense fallback={<div className="aspect-square w-full" aria-hidden="true" />}>
            <AvatarScene />
          </Suspense>
          <div className="absolute bottom-[9%] left-[2%] hidden border-l border-accent pl-3 sm:block">
            <p className="mono-label uppercase text-text">Build · measure · improve</p>
            <p className="mt-1 text-xs text-muted">From data to a useful product</p>
          </div>
        </div>
      </div>

      <ScrollIndicator className="absolute bottom-8 left-1/2 -translate-x-1/2 md:left-auto md:right-10 md:translate-x-0" />
    </section>
  )
}
