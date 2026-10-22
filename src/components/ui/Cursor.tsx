import { useEffect, useRef } from 'react'
import { gsap } from '../../lib/gsap'
import { useReducedMotion } from '../../hooks/useReducedMotion'

// A minimal HUD-style cursor: a small dot that tracks precisely, and a ring
// that trails with easing and expands over interactive elements. Fine pointers
// only; falls back to the native cursor otherwise.
export function Cursor() {
  const dotRef = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)
  const reduced = useReducedMotion()

  useEffect(() => {
    if (reduced) return
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return

    const dot = dotRef.current
    const ring = ringRef.current
    if (!dot || !ring) return

    document.body.classList.add('has-custom-cursor')

    const dotX = gsap.quickTo(dot, 'x', { duration: 0.15, ease: 'power3.out' })
    const dotY = gsap.quickTo(dot, 'y', { duration: 0.15, ease: 'power3.out' })
    const ringX = gsap.quickTo(ring, 'x', { duration: 0.45, ease: 'power3.out' })
    const ringY = gsap.quickTo(ring, 'y', { duration: 0.45, ease: 'power3.out' })

    const onMove = (e: MouseEvent) => {
      dotX(e.clientX)
      dotY(e.clientY)
      ringX(e.clientX)
      ringY(e.clientY)
    }

    // Grow the ring over anything interactive.
    const interactiveSel = 'a, button, [data-cursor="hover"], input, textarea'
    const onOver = (e: MouseEvent) => {
      if ((e.target as HTMLElement).closest(interactiveSel)) {
        gsap.to(ring, { scale: 1.8, borderColor: 'var(--color-accent)', duration: 0.3 })
      }
    }
    const onOut = (e: MouseEvent) => {
      if ((e.target as HTMLElement).closest(interactiveSel)) {
        gsap.to(ring, { scale: 1, borderColor: 'var(--color-line-strong)', duration: 0.3 })
      }
    }

    window.addEventListener('mousemove', onMove)
    document.addEventListener('mouseover', onOver)
    document.addEventListener('mouseout', onOut)

    return () => {
      document.body.classList.remove('has-custom-cursor')
      window.removeEventListener('mousemove', onMove)
      document.removeEventListener('mouseover', onOver)
      document.removeEventListener('mouseout', onOut)
    }
  }, [reduced])

  if (reduced) return null

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-[100] hidden md:block">
      <div
        ref={ringRef}
        className="absolute left-0 top-0 h-8 w-8 -translate-x-1/2 -translate-y-1/2 rounded-full border"
        style={{ borderColor: 'var(--color-line-strong)' }}
      />
      <div
        ref={dotRef}
        className="absolute left-0 top-0 h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{ background: 'var(--color-accent)' }}
      />
    </div>
  )
}
