import { useEffect, useRef } from 'react'
import { gsap } from '../lib/gsap'
import { useReducedMotion } from './useReducedMotion'

// Magnetic hover: the element eases toward the cursor within its bounds,
// then springs back on leave. Only on fine pointers, never under reduced motion.
export function useMagnetic<T extends HTMLElement>(strength = 0.4) {
  const ref = useRef<T>(null)
  const reduced = useReducedMotion()

  useEffect(() => {
    const el = ref.current
    if (!el || reduced) return
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return

    const xTo = gsap.quickTo(el, 'x', { duration: 0.6, ease: 'expo.out' })
    const yTo = gsap.quickTo(el, 'y', { duration: 0.6, ease: 'expo.out' })

    const onMove = (e: MouseEvent) => {
      const r = el.getBoundingClientRect()
      const relX = e.clientX - (r.left + r.width / 2)
      const relY = e.clientY - (r.top + r.height / 2)
      xTo(relX * strength)
      yTo(relY * strength)
    }

    const onLeave = () => {
      xTo(0)
      yTo(0)
    }

    el.addEventListener('mousemove', onMove)
    el.addEventListener('mouseleave', onLeave)
    return () => {
      el.removeEventListener('mousemove', onMove)
      el.removeEventListener('mouseleave', onLeave)
    }
  }, [reduced, strength])

  return ref
}
