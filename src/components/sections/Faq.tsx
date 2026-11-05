import { Plus } from 'lucide-react'
import { faq } from '../../data/content'
import { Reveal } from '../ui/Reveal'
import { SectionHeading } from '../ui/SectionHeading'

/** Dúvidas frequentes, em acordeão nativo (<details>): funciona com teclado e sem JavaScript. */
export function Faq() {
  return (
    <section id="duvidas" className="mx-auto grid max-w-[1320px] gap-12 px-5 py-[clamp(48px,6vw,80px)] md:px-[clamp(20px,5vw,72px)] lg:grid-cols-[5fr_7fr] lg:gap-24">
      <SectionHeading eyebrow={faq.eyebrow} title={faq.title} accent={faq.titleAccent} className="lg:sticky lg:top-28 lg:self-start" />
      <div className="grid gap-12">
        {faq.groups.map((g) => (
          <div key={g.label}>
            <Reveal>
              <p className="eyebrow mb-3">{g.label}</p>
            </Reveal>
            {g.items.map((item) => (
              <Reveal key={item.q}>
                <details className="group border-b border-fg/10">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-5 text-[17px] font-medium text-fg [&::-webkit-details-marker]:hidden">
                    {item.q}
                    <Plus className="size-5 shrink-0 text-accent transition-transform duration-500 ease-(--ease-glass) group-open:rotate-45" strokeWidth={1.6} aria-hidden />
                  </summary>
                  <p className="max-w-[62ch] pb-6 text-text/72">{item.a}</p>
                </details>
              </Reveal>
            ))}
          </div>
        ))}
      </div>
    </section>
  )
}
