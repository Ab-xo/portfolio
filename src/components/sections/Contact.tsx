import { contact, site } from '../../data/site'
import { MagneticButton } from '../ui/MagneticButton'
import { SplitReveal } from '../ui/SplitReveal'

// Contact: the closing statement. Oversized display type as the final
// impression, a magnetic CTA, and the email spelled out for directness.
export function Contact() {
  return (
    <section
      id="contact"
      className="relative mx-auto max-w-[1400px] px-6 py-36 md:px-10 md:py-64"
    >
      <div className="flex items-center gap-4">
        <span className="font-mono text-xs text-accent">08</span>
        <span className="mono-label uppercase">{contact.eyebrow}</span>
        <span aria-hidden className="h-px flex-1 bg-line" />
      </div>

      <SplitReveal
        as="h2"
        onScroll
        type="words"
        stagger={0.08}
        className="mt-12 max-w-[14ch] text-display font-display italic"
      >
        {contact.title}
      </SplitReveal>

      <p className="mt-10 max-w-xl text-lead text-muted">{contact.body}</p>

      <div className="mt-12 flex flex-wrap items-center gap-6">
        <MagneticButton href={`mailto:${site.email}`}>{contact.cta}</MagneticButton>
        <a
          href={`mailto:${site.email}`}
          className="group font-mono text-sm text-muted transition-colors hover:text-accent"
        >
          {site.email}
          <span className="block h-px w-0 bg-accent transition-all duration-300 group-hover:w-full" />
        </a>
        <a
          href={`tel:${site.phone}`}
          className="group font-mono text-sm text-muted transition-colors hover:text-accent"
        >
          {site.phone}
          <span className="block h-px w-0 bg-accent transition-all duration-300 group-hover:w-full" />
        </a>
      </div>
    </section>
  )
}
