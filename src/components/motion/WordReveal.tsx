import { motion } from 'motion/react'

type Props = {
  text: string
  /** aplica o acabamento cromado em cada palavra */
  chrome?: boolean
  /** atraso inicial em segundos */
  delay?: number
  className?: string
  /** quando definido, anima ao virar true em vez de ao entrar na tela */
  play?: boolean
}

/**
 * Título que surge palavra por palavra, subindo de dentro de uma máscara.
 * O texto continua sendo texto normal para leitores de tela e buscadores.
 */
export function WordReveal({ text, chrome = false, delay = 0, className = '', play }: Props) {
  const words = text.split(' ')
  return (
    <motion.span
      className={`inline ${className}`}
      initial="hidden"
      {...(play === undefined ? { whileInView: 'show', viewport: { once: true, margin: '0px 0px -10% 0px' } } : { animate: play ? 'show' : 'hidden' })}
      transition={{ staggerChildren: 0.07, delayChildren: delay }}
    >
      {words.map((w, i) => (
        <span key={i} className="inline-block overflow-hidden pb-[0.08em] align-bottom">
          <motion.span
            className={`inline-block ${chrome ? 'chrome-text' : ''}`}
            variants={{
              hidden: { y: '110%', rotate: 4 },
              show: { y: '0%', rotate: 0, transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] } },
            }}
          >
            {w}
          </motion.span>
          {i < words.length - 1 && ' '}
        </span>
      ))}
    </motion.span>
  )
}
