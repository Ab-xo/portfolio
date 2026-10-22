import { useEffect, useRef, useState } from 'react'
import { gsap } from '../../lib/gsap'
import { site } from '../../data/site'
import { useReducedMotion } from '../../hooks/useReducedMotion'

// The one orchestrated opening moment: a HUD boot sequence.
// Counter 00 → 100 with an amber progress line, then the whole panel wipes up
// to reveal the hero. Calls onDone when finished so the hero can time its own
// entrance. Under reduced motion it resolves near-instantly.
export function Preloader({ onDone }: { onDone: () => void }) {
  const rootRef = useRef<HTMLDivElement>(null)
  const barRef = useRef<HTMLSpanElement>(null)
  const [count, setCount] = useState(0)
  const reduced = useReducedMotion()

  useEffect(() => {
    // Lock scroll while the preloader is up.
    document.documentElement.style.overflow = 'hidden'

    const finish = () => {
      document.documentElement.style.overflow = ''
      onDone()
    }

    if (reduced) {
      setCount(100)
      const t = window.setTimeout(finish, 200)
      return () => window.clearTimeout(t)
    }

    const counter = { v: 0 }
    const tl = gsap.timeline()

    tl.to(counter, {
      v: 100,
      duration: 1.6,
      ease: 'power2.inOut',
      onUpdate: () => setCount(Math.round(counter.v)),
    })
      .to(barRef.current, { scaleX: 1, duration: 1.6, ease: 'power2.inOut' }, 0)
      // Brief hold, then wipe the panel up.
      .to(rootRef.current, {
        yPercent: -100,
        duration: 1,
        ease: 'expo.inOut',
        delay: 0.15,
        onComplete: finish,
      })

    return () => {
      tl.kill()
      document.documentElement.style.overflow = ''
    }
  }, [onDone, reduced])

  return (
    <div
      ref={rootRef}
      className="fixed inset-0 z-[90] flex flex-col justify-between bg-bg px-6 py-8 md:px-10 md:py-10"
      role="status"
      aria-label="Loading"
    >
      <div className="flex items-center justify-between">
        <span className="mono-label uppercase">{site.role}</span>
        <span className="mono-label uppercase">{site.location}</span>
      </div>

      <div className="flex items-end justify-between">
        <span className="font-display text-[18vw] italic leading-none tracking-tight md:text-[12vw]">
          {site.name}
        </span>
        <span className="font-mono text-2xl tabular-nums text-accent md:text-4xl">
          {String(count).padStart(3, '0')}
        </span>
      </div>

      <div className="relative h-px w-full bg-line">
        <span
          ref={barRef}
          className="absolute inset-y-0 left-0 w-full origin-left scale-x-0 bg-accent"
        />
      </div>
    </div>
  )
}
