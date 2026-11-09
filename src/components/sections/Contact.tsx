import { Clock, MapPin, MessageCircle } from 'lucide-react'
import { business, contact } from '../../data/content'
import { useGlassPointer } from '../../hooks/useGlassPointer'
import { Button } from '../ui/Button'
import { ChromeLogo } from '../ui/ChromeLogo'
import { Reveal } from '../ui/Reveal'

export function Contact() {
  const glass = useGlassPointer()
  const { address, phones } = business
  const items = [
    {
      Icon: MapPin,
      body: (
        <>
          {address.street} — {address.district}
          <br />
          {address.city} · CEP {address.zip}
        </>
      ),
    },
    { Icon: Clock, body: business.hours },
    {
      Icon: MessageCircle,
      body: (
        <>
          WhatsApp {phones.booking}
          <br />
          <small className="text-xs text-muted">Cursos: {phones.courses}</small>
        </>
      ),
    },
  ]

  return (
    <section id="contato" className="scroll-mt-24 mx-auto max-w-[1400px] px-5 py-[clamp(48px,6vw,80px)] md:px-[clamp(20px,5vw,72px)]">
      {/* card de informações à esquerda (lido primeiro) e mapa ao lado, sem sobreposição */}
      <div className="grid gap-4 lg:grid-cols-[minmax(360px,5fr)_7fr] lg:gap-5">
        <Reveal className="flex">
          <div
            {...glass}
            className="glass flex w-full flex-col rounded-[28px] px-6 py-8 [--glass-tint:color-mix(in_srgb,var(--c-bg2)_70%,transparent)] md:px-9 md:py-10"
          >
          <p className="eyebrow">{contact.eyebrow}</p>
          <h2 className="mt-3 mb-7 font-display text-[clamp(26px,2.4vw,32px)] leading-tight font-bold tracking-[-0.03em] text-fg">{business.name}</h2>
          <ul className="grid gap-5.5">
            {items.map(({ Icon, body }, i) => (
              <li key={i} className="flex gap-3.5 text-[15px] text-text">
                <Icon className="mt-1 size-[18px] shrink-0 text-accent" strokeWidth={1.5} aria-hidden />
                <span>{body}</span>
              </li>
            ))}
          </ul>
          <div className="mt-auto flex flex-wrap gap-2.5 pt-9">
            <Button href={address.directions}>Como chegar</Button>
            <Button href={business.links.whatsapp}>
              WhatsApp
            </Button>
          </div>
          </div>
        </Reveal>
        <Reveal delay={1} className="overflow-hidden rounded-[28px] ring-1 ring-fg/10">
          <iframe
            title={`Mapa — ${business.name}`}
            src={address.mapEmbed}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="block h-80 w-full border-0 md:h-[460px] lg:h-full lg:min-h-[520px]"
          />
        </Reveal>
      </div>

      <div className="flex flex-col items-center pt-[clamp(80px,10vw,140px)] pb-5 text-center">
        <ChromeLogo variant="mark" className="mb-10 w-30 opacity-85" />
        <Reveal>
          <h2 className="font-display text-[clamp(36px,5.4vw,80px)] leading-[1] font-bold tracking-[-0.04em] text-fg">
            {contact.finalTitle}
            <br />
            <span className="chrome-text">{contact.finalAccent}</span>
          </h2>
        </Reveal>
        <Reveal delay={1}>
          <p className="mx-auto mt-6 max-w-none text-[17px] text-text/72">{contact.finalLead}</p>
        </Reveal>
        <Reveal delay={2} className="mt-10">
          <Button href={business.links.booking} size="lg" arrow>
            Agendar avaliação
          </Button>
        </Reveal>
      </div>
    </section>
  )
}
