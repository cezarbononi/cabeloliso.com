import { useRef } from 'react'
import { motion, useReducedMotion, useScroll, useTransform, type MotionValue } from 'motion/react'

type Props = { text: string; eyebrow?: string }

/**
 * Frase de transição entre seções: as palavras "acendem" uma a uma conforme a rolagem avança.
 */
export function ScrollStatement({ text, eyebrow }: Props) {
  const ref = useRef<HTMLParagraphElement>(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 85%', 'end 45%'] })
  const words = text.split(' ')

  return (
    <section aria-label={text} className="mx-auto max-w-[1320px] px-5 py-[clamp(48px,6vw,80px)] md:px-[clamp(20px,5vw,72px)]">
      {eyebrow && <p className="eyebrow mb-6">{eyebrow}</p>}
      <p ref={ref} aria-hidden className="max-w-[22ch] font-display text-[clamp(32px,5.4vw,84px)] leading-[1.02] font-bold tracking-[-0.04em] text-fg">
        {words.map((w, i) => (
          <Word key={i} progress={scrollYProgress} range={[i / words.length, (i + 1) / words.length]} still={!!reduce}>
            {w}
          </Word>
        ))}
      </p>
    </section>
  )
}

function Word({ children, progress, range, still }: { children: string; progress: MotionValue<number>; range: [number, number]; still: boolean }) {
  const opacity = useTransform(progress, range, [0.55, 1])
  return (
    <motion.span style={still ? undefined : { opacity }} className="mr-[0.24em] inline-block">
      {children}
    </motion.span>
  )
}
