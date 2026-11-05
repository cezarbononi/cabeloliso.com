import { courses } from '../../data/content'
import { useGlassPointer } from '../../hooks/useGlassPointer'
import { Button } from '../ui/Button'
import { Reveal } from '../ui/Reveal'
import { SectionHeading } from '../ui/SectionHeading'

export function Courses() {
  const glass = useGlassPointer()
  return (
    <section id="cursos" className="bg-[radial-gradient(80%_60%_at_50%_0%,color-mix(in_srgb,var(--c-accent)_8%,transparent),transparent_70%)] py-[clamp(48px,6vw,80px)]">
      <SectionHeading
        eyebrow={courses.eyebrow}
        title={courses.title}
        accent={courses.titleAccent}
        lead={courses.lead}
        align="center"
        className="mx-auto max-w-[1320px] px-5 md:px-[clamp(20px,5vw,72px)]"
      />

      <div className="mx-auto mt-16 grid max-w-[1320px] gap-5 px-5 md:px-[clamp(20px,5vw,72px)] lg:grid-cols-3">
        {courses.items.map((c, i) => {
          const open = c.status === 'open'
          return (
            <Reveal key={c.n} delay={i}>
              <article
                {...glass}
                className={`glass flex h-full min-h-[500px] flex-col rounded-[28px] px-8 py-10 shadow-none! transition-transform duration-700 ease-(--ease-glass) hover:-translate-y-1.5 [--glass-edge:color-mix(in_srgb,var(--c-fg)_28%,transparent)] ${open ? '[--glass-tint:color-mix(in_srgb,var(--c-fg)_5%,transparent)]' : '[--glass-tint:color-mix(in_srgb,var(--c-fg)_2.5%,transparent)]'}`}
              >
                <span
                  className={`self-start rounded-full px-3 py-2 text-[10px] font-semibold tracking-[0.2em] uppercase ${open ? 'bg-accent text-bg' : 'text-accent ring-1 ring-accent/40'}`}
                >
                  {c.tag}
                </span>
                <span className="numeral mt-8 mb-4 text-[64px] font-light text-fg/90">{c.n}</span>
                <h3 className="font-display text-[32px] leading-[1.05] font-bold tracking-[-0.03em] text-fg">{c.title}</h3>
                <p className="mt-2.5 mb-6 text-xs tracking-[0.14em] text-muted uppercase">{c.meta}</p>
                {c.topics ? (
                  <ul className="grid gap-2.5">
                    {c.topics.map((t) => (
                      <li key={t} className="relative pl-4.5 text-sm text-text/75 before:absolute before:top-[0.8em] before:left-0 before:h-px before:w-2 before:bg-accent">
                        {t}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-text/66">{c.text}</p>
                )}
                <div className="mt-auto pt-8">
                  <Button href={c.href} variant={open ? 'metal' : 'glass'}>
                    {c.cta}
                  </Button>
                </div>
              </article>
            </Reveal>
          )
        })}
      </div>
    </section>
  )
}
