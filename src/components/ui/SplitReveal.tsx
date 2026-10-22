import { useRef, type ElementType, type ReactNode } from 'react'
import { gsap, SplitText } from '../../lib/gsap'
import { useIsomorphicLayoutEffect } from '../../hooks/useIsomorphicLayoutEffect'

type Props = {
  children: ReactNode
  as?: ElementType
  className?: string
  // 'lines' | 'words' | 'chars' — what to split into masked reveal units.
  type?: 'lines' | 'words'
  // Delay before the reveal (used to sequence after the preloader/hero).
  delay?: number
  // If true, animates on scroll into view; otherwise on mount.
  onScroll?: boolean
  stagger?: number
}

// Masked reveal built on GSAP SplitText. Each unit sits in an overflow-hidden
// wrapper and slides up from below. Reduced-motion users get the final state
// immediately (handled by matchMedia — no animation registered).
export function SplitReveal({
  children,
  as: Tag = 'div',
  className = '',
  type = 'lines',
  delay = 0,
  onScroll = false,
  stagger = 0.08,
}: Props) {
  const ref = useRef<HTMLElement>(null)

  useIsomorphicLayoutEffect(() => {
    const el = ref.current
    if (!el) return

    const mm = gsap.matchMedia()

    mm.add('(prefers-reduced-motion: no-preference)', () => {
      const split = new SplitText(el, {
        type: type === 'lines' ? 'lines' : 'words',
        linesClass: 'reveal-mask',
      })
      const targets = type === 'lines' ? split.lines : split.words

      gsap.set(targets, { yPercent: 120 })

      const tween = gsap.to(targets, {
        yPercent: 0,
        duration: 1.1,
        ease: 'expo.out',
        stagger,
        delay,
        ...(onScroll
          ? {
              scrollTrigger: {
                trigger: el,
                start: 'top 82%',
                once: true,
              },
            }
          : {}),
      })

      return () => {
        tween.scrollTrigger?.kill()
        tween.kill()
        split.revert()
      }
    })

    return () => mm.revert()
  }, [delay, onScroll, stagger, type])

  return (
    <Tag ref={ref as never} className={className}>
      {children}
    </Tag>
  )
}
