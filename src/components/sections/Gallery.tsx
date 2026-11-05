import { useEffect, useLayoutEffect, useRef, useState, type ReactNode } from 'react'
import { motion, useReducedMotion, useScroll, useSpring, useTransform } from 'motion/react'
import { useMediaQuery } from '../../hooks/useMediaQuery'
import { ChevronLeft, ChevronRight, Expand, X } from 'lucide-react'
import { gallery } from '../../data/content'
import { Reveal } from '../ui/Reveal'
import { SectionHeading } from '../ui/SectionHeading'

/** Galeria do salão: sequência antes → depois em destaque e fotos do dia a dia, com ampliação em lightbox. */
export function Gallery() {
  const [index, setIndex] = useState<number | null>(null)
  const dialog = useRef<HTMLDialogElement>(null)
  const photos = gallery.photos
  const tall = photos.filter((p) => p.tall)
  const wide = photos.filter((p) => !p.tall)
  const reduce = useReducedMotion()
  // no desktop, a galeria fica presa na tela e as fotos deslizam para o lado conforme a rolagem
  const horizontal = useMediaQuery('(min-width: 1024px)') && !reduce

  useEffect(() => {
    const d = dialog.current
    if (!d) return
    if (index !== null && !d.open) d.showModal()
    if (index === null && d.open) d.close()
  }, [index])

  const go = (dir: 1 | -1) => setIndex((i) => (i === null ? i : (i + dir + photos.length) % photos.length))
  const open = (src: string) => setIndex(photos.findIndex((p) => p.src === src))

  const Thumb = ({ p, className = '' }: { p: (typeof photos)[number]; className?: string }) => (
    <button
      type="button"
      onClick={() => open(p.src)}
      aria-label={`Ampliar foto: ${p.alt}`}
      className={`group relative block w-full cursor-zoom-in overflow-hidden rounded-[20px] ring-1 ring-fg/10 ${className}`}
    >
      <img src={p.src} alt={p.alt} loading="lazy" className="size-full object-cover transition-transform duration-[1600ms] ease-(--ease-out-soft) group-hover:scale-[1.04]" />
      <span className="absolute bottom-3 left-3 rounded-full bg-black/65 px-3 py-1.5 text-[10px] font-semibold tracking-[0.16em] whitespace-nowrap text-white uppercase backdrop-blur-sm max-sm:left-2 max-sm:px-2 max-sm:tracking-[0.08em]">{p.caption}</span>
      <span className="glass glass-photo absolute top-3 right-3 grid size-10 place-items-center rounded-full opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100">
        <Expand className="size-4" strokeWidth={1.6} aria-hidden />
      </span>
    </button>
  )

  const current = index === null ? null : photos[index]

  const heading = <SectionHeading eyebrow={gallery.eyebrow} title={gallery.title} accent={gallery.titleAccent} inline />

  return (
    <section id="galeria" className={horizontal ? 'relative' : 'mx-auto max-w-[1320px] px-5 py-[clamp(48px,6vw,80px)] md:px-[clamp(20px,5vw,72px)]'}>
      {horizontal ? (
        <HorizontalTrack
          heading={
            // no modo preso à tela, título e texto ficam lado a lado para sobrar altura para as fotos
            <SectionHeading eyebrow={gallery.eyebrow} title={gallery.title} accent={gallery.titleAccent} inline />
          }
        >
          {photos.map((p) => (
            <li key={p.src} className={`h-[min(46vh,520px)] shrink-0 ${p.tall ? 'aspect-[2/3]' : 'aspect-[3/2]'}`}>
              <Thumb p={p} className="size-full" />
            </li>
          ))}
        </HorizontalTrack>
      ) : (
        <>
          {heading}
          {/* sequência da cliente: antes, depois e liso pronto */}
          <ul className="mt-14 grid grid-cols-3 gap-3 md:gap-5">
            {tall.map((p, i) => (
              <Reveal as="li" key={p.src} delay={i}>
                <Thumb p={p} className="aspect-[2/3]" />
              </Reveal>
            ))}
          </ul>
          {/* o salão em ação */}
          <ul className="mt-3 grid grid-cols-2 gap-3 md:mt-5 md:grid-cols-6 md:gap-5">
            {wide.map((p, i) => (
              <Reveal as="li" key={p.src} delay={i % 3} className={`${i < 2 ? 'md:col-span-3' : 'md:col-span-2'} ${i === wide.length - 1 ? 'col-span-2 md:col-span-2' : ''}`}>
                <Thumb p={p} className="aspect-[3/2]" />
              </Reveal>
            ))}
          </ul>
        </>
      )}

      <dialog
        ref={dialog}
        onClose={() => setIndex(null)}
        onClick={(e) => e.target === e.currentTarget && setIndex(null)}
        onKeyDown={(e) => {
          if (e.key === 'ArrowRight') go(1)
          if (e.key === 'ArrowLeft') go(-1)
        }}
        aria-label="Foto ampliada da galeria"
        className="m-auto max-h-none max-w-none bg-transparent p-0 backdrop:bg-black/85 backdrop:backdrop-blur-sm"
      >
        {current && (
          <figure className="relative grid place-items-center">
            <img src={current.src} alt={current.alt} className="max-h-[86svh] max-w-[92vw] rounded-[18px] object-contain" />
            <figcaption className="mt-4 text-center text-sm text-white/85">
              {current.caption} · {index! + 1} de {photos.length}
            </figcaption>
            <button type="button" onClick={() => setIndex(null)} aria-label="Fechar" className="glass glass-photo absolute top-3 right-3 grid size-11 cursor-pointer place-items-center rounded-full">
              <X className="size-5" strokeWidth={1.6} />
            </button>
            <button type="button" onClick={() => go(-1)} aria-label="Foto anterior" className="glass glass-photo absolute top-1/2 left-3 grid size-11 -translate-y-1/2 cursor-pointer place-items-center rounded-full">
              <ChevronLeft className="size-5" strokeWidth={1.6} />
            </button>
            <button type="button" onClick={() => go(1)} aria-label="Próxima foto" className="glass glass-photo absolute top-1/2 right-3 grid size-11 -translate-y-1/2 cursor-pointer place-items-center rounded-full">
              <ChevronRight className="size-5" strokeWidth={1.6} />
            </button>
          </figure>
        )}
      </dialog>
    </section>
  )
}

/** Trilho horizontal preso à tela: a altura extra da seção vira deslocamento lateral das fotos. */
function HorizontalTrack({ heading, children }: { heading: ReactNode; children: ReactNode }) {
  const outer = useRef<HTMLDivElement>(null)
  const track = useRef<HTMLUListElement>(null)
  const [dist, setDist] = useState(0)

  useLayoutEffect(() => {
    const measure = () => track.current && setDist(Math.max(0, track.current.scrollWidth - window.innerWidth))
    measure()
    const ro = new ResizeObserver(measure)
    if (track.current) ro.observe(track.current)
    window.addEventListener('resize', measure)
    return () => {
      ro.disconnect()
      window.removeEventListener('resize', measure)
    }
  }, [])

  const { scrollYProgress } = useScroll({ target: outer, offset: ['start start', 'end end'] })
  const x = useTransform(scrollYProgress, (v) => -v * dist)
  const bar = useSpring(scrollYProgress, { stiffness: 140, damping: 30 })

  return (
    <div ref={outer} style={{ height: `calc(100vh + ${dist}px)` }} className="relative">
      <div className="sticky top-0 flex h-screen flex-col justify-center overflow-hidden pt-20">
        <div className="mx-auto w-full max-w-[1320px] px-[clamp(20px,5vw,72px)]">{heading}</div>
        <motion.ul
          ref={track}
          style={{ x }}
          className="mt-10 flex w-max gap-5 px-(--gutter) [--gutter:max(clamp(20px,5vw,72px),calc((100vw-1320px)/2+clamp(20px,5vw,72px)))]"
        >
          {children}
        </motion.ul>
        <div className="mx-auto mt-8 h-px w-full max-w-[1320px] px-[clamp(20px,5vw,72px)]">
          <div className="h-px w-full bg-fg/12">
            <motion.div style={{ scaleX: bar }} className="h-px origin-left bg-accent" />
          </div>
        </div>
      </div>
    </div>
  )
}
