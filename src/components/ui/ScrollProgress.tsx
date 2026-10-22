import { useEffect, useRef } from 'react'

// Reading progress for the scroll-story. Transform-only so it never causes layout shift.
export function ScrollProgress() {
  const barRef = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const bar = barRef.current
    if (!bar) return

    let ticking = false
    const update = () => {
      ticking = false
      const doc = document.documentElement
      const max = doc.scrollHeight - doc.clientHeight
      const p = max > 0 ? doc.scrollTop / max : 0
      bar.style.transform = `scaleX(${p})`
    }

    const onScroll = () => {
      if (ticking) return
      ticking = true
      requestAnimationFrame(update)
    }

    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [])

  return (
    <div
      className="pointer-events-none fixed inset-x-0 top-0 z-[60] h-[2px] bg-transparent"
      role="progressbar"
      aria-label="Reading progress"
      aria-valuemin={0}
      aria-valuemax={100}
    >
      <span
        ref={barRef}
        className="block h-full origin-left scale-x-0 bg-accent"
      />
    </div>
  )
}
