import { useState } from 'react'
import { BookOpen } from 'lucide-react'
import { expert, media, story } from '../../data/content'
import { StoryModal } from '../features/StoryModal'
import { ParallaxImage } from '../motion/ParallaxImage'
import { CountStat } from '../motion/CountStat'
import { Reveal } from '../ui/Reveal'

export function Expert() {
  const [open, setOpen] = useState(false)
  return (
    <section id="especialista" className="mx-auto grid max-w-[1320px] items-center gap-14 px-5 py-[clamp(48px,6vw,80px)] md:px-[clamp(20px,5vw,72px)] lg:grid-cols-[5fr_6fr] lg:gap-28">
      <Reveal as="figure" className="w-full max-w-[500px] justify-self-center">
        <div className="relative aspect-[4/5] overflow-hidden rounded-[320px_320px_24px_24px] shadow-[0_0_0_1px_color-mix(in_srgb,var(--c-accent)_25%,transparent),0_60px_120px_-40px_color-mix(in_srgb,var(--c-accent)_18%,transparent)]">
          <ParallaxImage src={media.founder} alt="Renildo Ferreira, fundador do Cabeloliso.com" strength={0.06} imgClassName="object-[50%_20%]" className="absolute inset-0" />
          <span className="pointer-events-none absolute inset-0 bg-[linear-gradient(120deg,rgb(255_255_255/0.14),transparent_32%)]" />
        </div>
      </Reveal>

      <div>
        <Reveal>
          <p className="eyebrow">{expert.eyebrow}</p>
        </Reveal>
        <Reveal delay={1}>
          <h2 className="mt-5 font-display font-bold tracking-[-0.035em]">
            <span className="chrome-text block text-[clamp(40px,5vw,76px)] leading-[0.98]">{expert.name}</span>
            <span className="mt-3 block text-[clamp(18px,1.8vw,26px)] font-semibold tracking-[-0.01em] text-accent">{expert.role}</span>
          </h2>
        </Reveal>
        {expert.paragraphs.map((p, i) => (
          <Reveal key={i} delay={i + 2}>
            <p className="mt-6 max-w-[54ch] text-[17px] text-text/72">
              {p}
            </p>
          </Reveal>
        ))}
        <Reveal as="div" className="mt-12">
          <dl className="grid grid-cols-2 overflow-hidden rounded-[18px] border border-fg/10">
            {expert.stats.map((s) => (
              <div key={s.value} className="border-fg/10 px-4 py-6 odd:border-r sm:px-6 sm:py-7 [&:nth-child(-n+2)]:border-b">
                <dt className="numeral text-[clamp(30px,2.8vw,40px)] font-semibold text-fg"><CountStat value={s.value} /></dt>
                <dd className="mt-2.5 text-[13px] leading-snug text-text/75">{s.label}</dd>
              </div>
            ))}
          </dl>
        </Reveal>
        <Reveal className="mt-10 flex flex-wrap items-center justify-between gap-6">
          <p className="font-display text-[clamp(20px,2vw,26px)] font-semibold tracking-[-0.02em] text-accent">{expert.signature}</p>
          <button type="button" onClick={() => setOpen(true)} aria-haspopup="dialog" className="btn btn-metal cursor-pointer">
            <BookOpen className="size-4" strokeWidth={1.6} aria-hidden />
            {story.button}
          </button>
        </Reveal>
      </div>
      <StoryModal open={open} onClose={() => setOpen(false)} />
    </section>
  )
}
