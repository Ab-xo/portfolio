import { useEffect } from 'react'
import Lenis from 'lenis'
import { gsap, ScrollTrigger } from '../lib/gsap'
import { useReducedMotion } from './useReducedMotion'

// Smooth scroll driven by Lenis, synced to GSAP's ticker so ScrollTrigger
// stays in lockstep. Disabled entirely under reduced-motion.
export function useLenis(): void {
  const reduced = useReducedMotion()

  useEffect(() => {
    if (reduced) return

    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    })

    lenis.on('scroll', ScrollTrigger.update)

    const onTick = (time: number) => lenis.raf(time * 1000)
    gsap.ticker.add(onTick)
    gsap.ticker.lagSmoothing(0)

    return () => {
      gsap.ticker.remove(onTick)
      lenis.destroy()
    }
  }, [reduced])
}
