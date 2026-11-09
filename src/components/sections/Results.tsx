import { useRef } from 'react'
import { ArrowUpRight, ChevronLeft, ChevronRight } from 'lucide-react'
import { business, results } from '../../data/content'
import { BeforeAfterSlider } from '../features/BeforeAfterSlider'
import { VideoCard } from '../features/VideoCard'
import { Reveal } from '../ui/Reveal'
import { SectionHeading } from '../ui/SectionHeading'

const img = (id: string, side: 'antes' | 'depois') => `images/resultado-${id}-${side}.webp`

export function Results() {
  const track = useRef<HTMLDivElement>(null)
  const [feature, ...others] = results.videos

  const scroll = (dir: 1 | -1) => {
    const el = track.current
    const card = el?.firstElementChild as HTMLElement | null
    el?.scrollBy({ left: dir * ((card?.offsetWidth ?? 320) + 24), behavior: 'smooth' })
  }

  return (
    <section id="resultados" className="bg-[linear-gradient(180deg,transparent,color-mix(in_srgb,var(--c-bg2)_55%,transparent)_40%,transparent)] py-[clamp(48px,6vw,80px)]">
      <div className="mx-auto max-w-[1320px] px-5 md:px-[clamp(20px,5vw,72px)]">
        <SectionHeading eyebrow={results.eyebrow} title={results.title} accent={results.titleAccent} lead={results.lead} inline />
      </div>

      <div className="mx-auto mt-8 flex max-w-[1320px] justify-end gap-2.5 px-5 md:px-[clamp(20px,5vw,72px)]">
        {([-1, 1] as const).map((d) => (
          <button
            key={d}
            type="button"
            onClick={() => scroll(d)}
            aria-label={d < 0 ? 'Resultado anterior' : 'Próximo resultado'}
            className="button-control size-13 cursor-pointer transition-transform duration-300 active:scale-95"
          >
            {d < 0 ? <ChevronLeft className="size-5" strokeWidth={1.5} /> : <ChevronRight className="size-5" strokeWidth={1.5} />}
          </button>
        ))}
      </div>

      <div ref={track} className="mt-3 flex snap-x snap-mandatory scroll-px-(--gutter) gap-6 overflow-x-auto px-(--gutter) pt-2.5 pb-8 [--gutter:max(clamp(20px,5vw,72px),calc((100%-1320px)/2+clamp(20px,5vw,72px)))] [scrollbar-width:none] max-md:[--gutter:20px] [&::-webkit-scrollbar]:hidden">
        {results.gallery.map((g, i) => (
          <Reveal key={g.id} delay={Math.min(i, 3)} className="aspect-[3/4] flex-[0_0_clamp(270px,30vw,380px)] snap-start">
            <BeforeAfterSlider before={img(g.id, 'antes')} after={img(g.id, 'depois')} caption={g.caption} className="size-full" />
          </Reveal>
        ))}
      </div>
      <div className="mx-auto mt-24 grid max-w-[1320px] gap-6 px-5 md:px-[clamp(20px,5vw,72px)] lg:grid-cols-[1.6fr_1fr]">
        <Reveal className="min-h-[300px]">
          <VideoCard {...feature} feature className="size-full min-h-[300px]" />
        </Reveal>
        <ul className="grid gap-4">
          {others.map((v, i) => (
            <Reveal as="li" key={v.id} delay={i + 1}>
              <VideoCard {...v} className="aspect-video" />
            </Reveal>
          ))}
        </ul>
        <ul className="grid gap-4 sm:grid-cols-3 lg:col-span-2">
          {results.moreVideos.map((v, i) => (
            <Reveal as="li" key={v.id} delay={i}>
              <VideoCard {...v} className="aspect-video" />
            </Reveal>
          ))}
        </ul>
        <div className="flex justify-end lg:col-span-2">
          <a href={business.links.youtube} target="_blank" rel="noopener" className="inline-flex items-center gap-2 text-[11px] font-medium tracking-[0.22em] text-text/70 uppercase transition-colors hover:text-fg">
            Mais vídeos no YouTube <ArrowUpRight className="size-4" strokeWidth={1.6} aria-hidden />
          </a>
        </div>
        <Reveal as="div" className="mt-16 text-center lg:col-span-2">
          <blockquote>
            <p className="mx-auto max-w-[30ch] font-display text-[clamp(26px,3vw,42px)] leading-tight font-semibold tracking-[-0.025em] text-fg">“{results.quote.text}”</p>
            <cite className="mt-6 block text-[10px] font-medium tracking-[0.3em] text-muted uppercase not-italic">{results.quote.author}</cite>
          </blockquote>
        </Reveal>
      </div>
    </section>
  )
}
