import { motion } from 'motion/react'
import { business } from '../../data/content'
import { useCountUp } from '../../hooks/useCountUp'
import { formatFollowers, useInstagramFollowers } from '../../hooks/useInstagramFollowers'
import { useGlassPointer } from '../../hooks/useGlassPointer'
import { InstagramIcon } from '../ui/icons'
import { useIntroReady } from '../motion/IntroLoader'

type Props = { className?: string }

/**
 * Prova social do Instagram em destaque: entra ao carregar, conta até o número de seguidores
 * e pulsa um halo três vezes. O valor vem de useInstagramFollowers (pronto para API).
 */
export function InstagramProof({ className = '' }: Props) {
  const followers = useInstagramFollowers()
  const ready = useIntroReady()
  const { ref, current } = useCountUp<HTMLSpanElement>(followers, { delay: 650, enabled: ready })
  const glass = useGlassPointer()

  return (
    <motion.a
      href={business.links.instagram}
      target="_blank"
      rel="noopener"
      {...glass}
      initial={{ opacity: 0, y: 14, scale: 0.92, filter: 'blur(6px)' }}
      animate={ready ? { opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' } : undefined}
      transition={{ duration: 1.1, ease: [0.32, 0.72, 0, 1], delay: 0.45 }}
      className={`glass glass-photo grid grid-cols-[auto_1fr] items-center gap-x-3.5 rounded-[22px] py-4 pr-6 pl-5 md:py-5 ${className}`}
      aria-label={`${formatFollowers(followers)} de seguidores no Instagram ${business.instagram.handle}`}
    >
      <span
        aria-hidden
        className="pointer-events-none absolute! inset-[-1px] z-0! rounded-[inherit] border border-white/55 opacity-0 [animation:ig-ring_1.8s_var(--ease-out-soft)_1.5s_3]"
      />
      <InstagramIcon className="row-span-2 size-6 text-white/80 md:size-7" />
      <span ref={ref} className="numeral text-[32px] font-semibold text-white md:text-[40px]">
        {formatFollowers(current)}
      </span>
      <span className="text-[11px] leading-snug tracking-[0.04em] text-white/90">
        seguidores acompanham
        <br />
        os resultados no Instagram
      </span>
    </motion.a>
  )
}
