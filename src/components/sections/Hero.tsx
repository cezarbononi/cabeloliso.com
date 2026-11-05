import { useRef } from 'react'
import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react'
import { business, hero } from '../../data/content'
import { WordReveal } from '../motion/WordReveal'
import { ChromeLogo } from '../ui/ChromeLogo'
import { Button } from '../ui/Button'
import { Reveal } from '../ui/Reveal'
import { HeroVideo } from '../features/HeroVideo'
import { InstagramProof } from '../features/InstagramProof'
import { useIntroReady } from '../motion/IntroLoader'

export function Hero() {
  const ref = useRef<HTMLElement>(null)
  const reduce = useReducedMotion()
  const ready = useIntroReady()
  // ao sair da primeira tela, o conteúdo sobe, encolhe levemente e esmaece (transição para o Método)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], [0, -120])
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.92])
  const opacity = useTransform(scrollYProgress, [0, 0.85], [1, 0])
  const exit = reduce ? undefined : { y, scale, opacity }
  return (
    <section ref={ref} id="topo" className="relative mx-auto grid min-h-svh max-w-[1320px] items-center gap-12 px-5 pt-24 pb-20 md:px-[clamp(20px,5vw,72px)] lg:grid-cols-[1.1fr_0.9fr] lg:gap-18 lg:pt-36">
      <div aria-hidden className="pointer-events-none absolute top-[-10%] right-[-20%] size-[70vw] bg-[radial-gradient(closest-side,color-mix(in_srgb,var(--c-accent)_12%,transparent),transparent_70%)] blur-xl" />

      <motion.div style={exit}>
        <ChromeLogo variant="full" className="mb-6 w-[min(78vw,300px)] lg:mb-10 lg:w-[clamp(260px,30vw,460px)]" label="Logomarca Cabeloliso.com — a maior definição em cabelos lisos" />
        <Reveal play={ready}>
          <p className="eyebrow">{hero.eyebrow}</p>
        </Reveal>
        <h1 className="mt-6 font-display text-[clamp(40px,4.9vw,72px)] leading-[0.95] font-bold tracking-[-0.045em] text-fg">
          <WordReveal text={hero.title} delay={0.2} play={ready} />
          <br />
          <WordReveal text={hero.titleAccent} chrome delay={0.4} className="pr-[0.04em]" play={ready} />
        </h1>
        <Reveal delay={2} play={ready}>
          <p className="mt-8 max-w-[44ch] text-[clamp(16px,1.35vw,19px)] text-text/75">{hero.lead}</p>
        </Reveal>
        <Reveal delay={3} play={ready} className="mt-10 flex flex-wrap gap-3 max-md:[&>a]:flex-[1_1_100%]">
          <Button href={business.links.booking} arrow>
            Agendar avaliação
          </Button>
          <Button href="#metodo" variant="glass">
            Conheça o método
          </Button>
        </Reveal>
      </motion.div>

      <motion.div style={exit} className="relative -order-1 w-[86%] justify-self-center lg:order-none lg:w-[min(100%,440px,52svh)]">
      <Reveal delay={2} play={ready} as="figure" className="relative">
        <HeroVideo />
        <InstagramProof className="absolute bottom-4 left-3 lg:bottom-3.5 lg:-left-9" />
        <figcaption className="absolute top-7 -right-3.5 hidden text-[10px] font-medium tracking-[0.36em] text-muted uppercase [writing-mode:vertical-rl] lg:block">
          {hero.caption}
        </figcaption>
      </Reveal>
      </motion.div>

      <a href="#metodo" aria-label="Rolar para o método" className="absolute bottom-6 left-1/2 hidden h-14 w-px overflow-hidden bg-fg/15 md:block">
        <span className="absolute inset-0 bg-accent [animation:drip_2.4s_var(--ease-out-soft)_infinite]" />
      </a>
    </section>
  )
}
