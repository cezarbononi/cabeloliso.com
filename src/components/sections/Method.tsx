import { Check } from 'lucide-react'
import { business, media, method } from '../../data/content'
import { useGlassPointer } from '../../hooks/useGlassPointer'
import { Button } from '../ui/Button'
import { Reveal } from '../ui/Reveal'
import { ParallaxImage } from '../motion/ParallaxImage'
import { SectionHeading } from '../ui/SectionHeading'

export function Method() {
  const glass = useGlassPointer()
  return (
    <section id="metodo" className="mx-auto max-w-[1320px] px-5 py-[clamp(48px,6vw,80px)] md:px-[clamp(20px,5vw,72px)]">
      <div className="grid gap-16 lg:grid-cols-[5fr_7fr] lg:gap-24">
        {/* coluna fixa durante a rolagem; fica contida neste grid e para antes da foto de evolução */}
        <div className="lg:sticky lg:top-28 lg:self-start">
          <SectionHeading eyebrow={method.eyebrow} title={method.title} accent={method.titleAccent} lead={method.lead} leadClassName="max-w-none" />
          <ParallaxImage src={media.salon} alt="Interior do salão Cabeloliso.com com espelhos e cadeiras pretas" className="mt-10 aspect-[4/3] rounded-[18px]" />
          <Reveal className="mt-8">
            <Button href={business.links.bookingMethod}>
              Agendar minha avaliação
            </Button>
          </Reveal>
        </div>

        <div>
          <ol className="grid divide-y divide-fg/10 border-y border-fg/10">
            {method.pillars.map((p, i) => (
              <Reveal as="li" key={p.n} delay={i} className="grid grid-cols-[64px_1fr] gap-x-5 py-9 md:grid-cols-[84px_1fr] md:gap-x-6">
                <span className="numeral row-span-2 pt-1 text-[26px] font-medium text-accent md:text-[32px]">{p.n}</span>
                <h3 className="font-display text-[clamp(22px,2vw,28px)] leading-tight font-semibold tracking-[-0.02em] text-fg">{p.title}</h3>
                <p className="mt-2.5 max-w-[52ch] text-text/65">{p.text}</p>
              </Reveal>
            ))}
          </ol>

          <div className="mt-20">
            <Reveal>
              <h3 className="mb-7 font-display text-[clamp(24px,2.4vw,30px)] font-semibold tracking-[-0.02em] text-accent">Passo a passo da aplicação</h3>
            </Reveal>
            {/* preenche por coluna: 01–03 à esquerda, 04–06 à direita */}
            <ol className="grid md:grid-flow-col md:grid-cols-2 md:grid-rows-3 md:gap-x-10">
              {method.steps.map((s) => (
                <Reveal as="li" key={s.n} className="flex gap-5 border-t border-fg/10 py-5.5 transition-[padding] duration-500 ease-(--ease-glass) hover:pl-2">
                  <span className="numeral pt-1 text-[13px] font-semibold tracking-normal text-accent">{s.n}</span>
                  <div>
                    <h4 className="text-[15px] font-medium text-fg">{s.title}</h4>
                    <p className="text-sm text-text/75">{s.text}</p>
                  </div>
                </Reveal>
              ))}
            </ol>
          </div>

          <Reveal as="div" className="mt-12 flex flex-wrap gap-2.5">
            {method.benefits.map((b) => (
              <span key={b} {...glass} className="glass rounded-full px-4.5 py-3 text-[13px] text-text [--glass-tint:color-mix(in_srgb,var(--c-fg)_3%,transparent)]">
                {b}
              </span>
            ))}
          </Reveal>
        </div>
      </div>

      <Reveal as="div" className="mt-[clamp(56px,7vw,96px)] grid gap-8 border-t border-fg/10 pt-12 lg:grid-cols-[5fr_7fr] lg:gap-24">
        <div>
          <h3 className="font-display text-[clamp(24px,2.4vw,32px)] leading-tight font-bold tracking-[-0.03em] text-fg">{method.aftercare.title}</h3>
          <p className="mt-4 max-w-[40ch] text-text/70">{method.aftercare.lead}</p>
        </div>
        <ul className="grid gap-x-10 gap-y-4 sm:grid-cols-2">
          {method.aftercare.items.map((item) => (
            <li key={item} className="flex gap-3 text-[15px] text-text/80">
              <Check className="mt-1 size-4 shrink-0 text-accent" strokeWidth={2} aria-hidden />
              {item}
            </li>
          ))}
        </ul>
      </Reveal>

      <Reveal as="figure" className="mt-[clamp(56px,7vw,96px)]">
        <ParallaxImage src={media.evolution} alt={method.evolution.alt} strength={0.04} className="aspect-[931/475] rounded-[18px] ring-1 ring-fg/10" />
        <figcaption className="mt-4.5 text-[13px] text-muted">
          <span className="mr-3.5 text-[10px] tracking-[0.24em] text-accent uppercase">{method.evolution.label}</span>
          {method.evolution.text}
        </figcaption>
      </Reveal>
    </section>
  )
}
