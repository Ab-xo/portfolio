import { about } from '../../data/site'
import { SectionHeader } from '../ui/SectionHeader'
import { SplitReveal } from '../ui/SplitReveal'

// About. Two-column editorial: narrative on the left, a compact stat readout on
// the right in HUD/mono language.
export function About() {
  return (
    <section
      id="about"
      className="relative mx-auto max-w-[1400px] px-6 py-36 md:px-10 md:py-56"
    >
      <SectionHeader index="07" eyebrow={about.eyebrow} title={about.title} />

      <div className="mt-16 grid gap-12 lg:grid-cols-[1.4fr_0.6fr] lg:gap-20">
        <div className="max-w-2xl">
          {about.paragraphs.map((para, i) => (
            <SplitReveal
              key={i}
              as="p"
              onScroll
              type="lines"
              delay={i * 0.05}
              className="mb-6 text-lead text-muted"
            >
              {para}
            </SplitReveal>
          ))}
        </div>

        <dl className="grid grid-cols-2 gap-px self-start overflow-hidden rounded-sm border border-line bg-line lg:grid-cols-1">
          {about.stats.map((s) => (
            <div key={s.k} className="bg-bg p-6">
              <dd className="font-display text-[clamp(1.75rem,3vw,2.5rem)] text-accent tabular-nums">
                {s.v}
              </dd>
              <dt className="mt-1 mono-label uppercase">{s.k}</dt>
            </div>
          ))}
        </dl>
      </div>

      <div className="mt-20 grid gap-14 border-t border-line pt-10 lg:grid-cols-[1.2fr_0.8fr]">
        <div>
          <h3 className="mono-label uppercase text-accent">Education</h3>
          <ol className="mt-6 divide-y divide-line">
            {about.education.map((item) => (
              <li key={item.qualification} className="py-6 first:pt-0 last:pb-0">
                <h4 className="font-display text-2xl">{item.qualification}</h4>
                <p className="mt-2 text-sm text-text">{item.institution}</p>
                <p className="mt-1 text-sm text-muted">{item.detail}</p>
              </li>
            ))}
          </ol>
        </div>

        <div className="grid content-start gap-10 sm:grid-cols-2 lg:grid-cols-1">
          <div>
            <h3 className="mono-label uppercase text-accent">Languages</h3>
            <p className="mt-4 text-text">{about.languages.join(' · ')}</p>
          </div>
          <div>
            <h3 className="mono-label uppercase text-accent">Tools</h3>
            <ul className="mt-4 flex flex-wrap gap-x-4 gap-y-2">
              {about.tools.map((tool) => (
                <li key={tool} className="text-sm text-muted">{tool}</li>
              ))}
            </ul>
          </div>
          <div className="sm:col-span-2 lg:col-span-1">
            <h3 className="mono-label uppercase text-accent">Outside work</h3>
            <p className="mt-4 text-sm text-muted">{about.interests.join(' · ')}</p>
          </div>
        </div>
      </div>
    </section>
  )
}
