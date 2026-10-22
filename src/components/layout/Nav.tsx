import { useEffect, useState } from 'react'
import { nav, site } from '../../data/site'

// Fixed top nav. Stays out of the way: transparent over the hero, then gains a
// hairline + blur once the user scrolls. Anchor links use native smooth scroll
// (Lenis intercepts wheel, and CSS scroll-behavior handles anchor jumps).
export function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,backdrop-filter] duration-500 ${
        scrolled ? 'border-b border-line bg-bg/75 backdrop-blur-xl' : 'border-b border-transparent'
      }`}
    >
      <nav
        aria-label="Primary"
        className="mx-auto flex max-w-[1400px] items-center justify-between px-6 py-4 md:px-10"
      >
        <a
          href="#top"
          className="flex min-h-11 items-center gap-2 font-display text-xl italic tracking-tight"
        >
          {site.name}
          <span className="h-1.5 w-1.5 rounded-full bg-accent" aria-hidden />
        </a>

        <ul className="hidden items-center gap-6 lg:gap-9 lg:flex">
          {nav.map((item, i) => (
            <li key={item.target}>
              <a
                href={item.target}
                className="group relative inline-flex min-h-11 items-center text-sm text-muted transition-colors duration-300 hover:text-text"
              >
                <span className="mr-2 font-mono text-[10px] text-faint tabular-nums">
                  {String(i + 1).padStart(2, '0')}
                </span>
                {item.label}
                <span className="absolute bottom-3 left-7 h-px w-0 bg-accent transition-all duration-300 group-hover:w-[calc(100%-1.75rem)]" />
              </a>
            </li>
          ))}
        </ul>

        <a
          href="#contact"
          className="accent-border hidden min-h-11 items-center gap-2 rounded-sm border border-line px-4 text-xs tracking-wide text-muted transition-colors duration-300 hover:border-accent hover:text-accent lg:inline-flex"
        >
          <span aria-hidden className="relative z-10 h-1.5 w-1.5 rounded-full bg-accent" />
          <span className="relative z-10">{site.availability}</span>
        </a>

        {/* Mobile toggle */}
        <button
          className="flex min-h-11 min-w-11 items-center justify-center lg:hidden"
          aria-expanded={open}
          aria-label={open ? 'Close menu' : 'Open menu'}
          onClick={() => setOpen((v) => !v)}
        >
          <span className="flex h-5 w-6 flex-col justify-between">
            <span
              className={`h-px w-full bg-text transition-transform duration-300 ${open ? 'translate-y-[9px] rotate-45' : ''}`}
            />
            <span
              className={`h-px w-full bg-text transition-opacity duration-300 ${open ? 'opacity-0' : ''}`}
            />
            <span
              className={`h-px w-full bg-text transition-transform duration-300 ${open ? '-translate-y-[9px] -rotate-45' : ''}`}
            />
          </span>
        </button>
      </nav>

      {/* Mobile menu */}
      <div
        className={`overflow-hidden border-t border-line bg-bg/95 backdrop-blur-md transition-[max-height] duration-500 lg:hidden ${
          open ? 'max-h-96' : 'max-h-0 border-t-transparent'
        }`}
      >
        <ul className="flex flex-col gap-1 px-6 py-4">
          {nav.map((item) => (
            <li key={item.target}>
              <a
                href={item.target}
                onClick={() => setOpen(false)}
                className="block py-3 text-lg text-muted transition-colors hover:text-text"
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </header>
  )
}
