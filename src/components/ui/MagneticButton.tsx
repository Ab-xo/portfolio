import { useMagnetic } from '../../hooks/useMagnetic'

type Props = {
  href?: string
  onClick?: () => void
  children: React.ReactNode
  variant?: 'solid' | 'outline'
  className?: string
  ariaLabel?: string
}

// A magnetic CTA. Renders as <a> when href is given, else <button>.
// The inner span holds the label so the magnetic transform and text can be
// decoupled if needed later.
export function MagneticButton({
  href,
  onClick,
  children,
  variant = 'solid',
  className = '',
  ariaLabel,
}: Props) {
  const ref = useMagnetic<HTMLAnchorElement & HTMLButtonElement>(0.35)

  const base =
    'group relative inline-flex min-h-11 items-center gap-3 overflow-hidden rounded-full px-8 py-3.5 text-sm font-medium tracking-wide transition-all duration-300 will-change-transform focus-visible:outline-2'
  const styles =
    variant === 'solid'
      ? 'shimmer bg-accent text-bg shadow-[0_0_0_1px_rgba(83,224,194,0.35),0_8px_32px_-8px_rgba(83,224,194,0.25)] hover:bg-accent-press hover:shadow-[0_0_40px_-8px_rgba(83,224,194,0.45),0_12px_48px_-8px_rgba(83,224,194,0.35)]'
      : 'accent-border border border-line-strong text-text hover:border-accent hover:text-accent hover:bg-white/[0.03]'

  const content = (
    <>
      <span className="relative z-10">{children}</span>
      <span
        aria-hidden
        className="relative z-10 h-1.5 w-1.5 rounded-full bg-current transition-transform duration-300 group-hover:scale-150"
      />
    </>
  )

  if (href) {
    return (
      <a
        ref={ref}
        href={href}
        aria-label={ariaLabel}
        className={`${base} ${styles} ${className}`}
      >
        {content}
      </a>
    )
  }

  return (
    <button
      ref={ref}
      onClick={onClick}
      aria-label={ariaLabel}
      className={`${base} ${styles} ${className}`}
    >
      {content}
    </button>
  )
}
