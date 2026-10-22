import { SplitReveal } from './SplitReveal'

type Props = {
  index?: string // mono readout, e.g. "02"
  eyebrow: string
  title: string
  className?: string
}

// Consistent section header: a mono index + eyebrow readout (HUD language),
// then a large display title that reveals on scroll. The eyebrow is a real
// wayfinding label, not decoration.
export function SectionHeader({ index, eyebrow, title, className = '' }: Props) {
  return (
    <header className={`flex flex-col gap-6 ${className}`}>
      <div className="flex items-center gap-4">
        {index && (
          <span className="font-mono text-xs text-accent tabular-nums">{index}</span>
        )}
        <span className="mono-label uppercase">{eyebrow}</span>
        <span aria-hidden className="h-px flex-1 bg-line" />
      </div>
      <SplitReveal
        as="h2"
        onScroll
        type="words"
        className="max-w-[16ch] text-h2"
        stagger={0.06}
      >
        {title}
      </SplitReveal>
    </header>
  )
}
