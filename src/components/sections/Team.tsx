import { Camera } from 'lucide-react'
import { team } from '../../data/content'
import { Reveal } from '../ui/Reveal'
import { SectionHeading } from '../ui/SectionHeading'

/** Equipe do salão. Sem `photo`, o card mostra um espaço reservado para a foto. */
export function Team() {
  return (
    <section id="equipe" className="mx-auto max-w-[1320px] px-5 py-[clamp(48px,6vw,80px)] md:px-[clamp(20px,5vw,72px)]">
      <div className="grid gap-12 lg:grid-cols-[5fr_7fr] lg:gap-24">
        <SectionHeading eyebrow={team.eyebrow} title={team.title} accent={team.titleAccent} lead={team.lead} className="lg:self-center" />

        <ul className="grid gap-5 sm:grid-cols-2">
          {team.members.map((m, i) => (
            <Reveal as="li" key={m.name} delay={i}>
              <figure>
                <div className="relative aspect-[4/5] overflow-hidden rounded-[200px_200px_24px_24px] ring-1 ring-fg/12">
                  {m.photo ? (
                    <img src={m.photo} alt={`${m.name}, ${m.role} do Cabeloliso.com`} loading="lazy" className="size-full object-cover" />
                  ) : (
                    <div className="grid size-full place-content-center justify-items-center gap-3 bg-[repeating-linear-gradient(135deg,color-mix(in_srgb,var(--c-fg)_3%,transparent)_0_1px,transparent_1px_14px)] text-center">
                      <Camera className="size-8 text-muted" strokeWidth={1.4} aria-hidden />
                      <span className="text-[10px] font-semibold tracking-[0.24em] text-muted uppercase">Foto em breve</span>
                    </div>
                  )}
                </div>
                <figcaption className="mt-5">
                  <p className="font-display text-[28px] leading-none font-bold tracking-[-0.03em] text-fg">{m.name}</p>
                  <p className="mt-2 text-[11px] font-medium tracking-[0.22em] text-accent uppercase">{m.role}</p>
                  <p className="mt-3 text-[15px] text-text/70">{m.text}</p>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  )
}
