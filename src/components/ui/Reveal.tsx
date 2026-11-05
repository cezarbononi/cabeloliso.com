import type { ReactNode } from 'react'
import { motion } from 'motion/react'

type Props = {
  children: ReactNode
  /** posição na sequência de entrada (cada passo atrasa ~90 ms) */
  delay?: number
  className?: string
  as?: 'div' | 'li' | 'figure' | 'p' | 'header'
  /** quando definido, anima ao virar true (ex.: depois da abertura) em vez de ao entrar na tela */
  play?: boolean
}

/** Entrada suave ao rolar. Respeita prefers-reduced-motion via MotionConfig no App. */
export function Reveal({ children, delay = 0, className, as = 'div', play }: Props) {
  const Tag = motion[as]
  return (
    <Tag
      className={className}
      initial={{ opacity: 0, y: 28 }}
      {...(play === undefined
        ? { whileInView: { opacity: 1, y: 0 }, viewport: { once: true, margin: '0px 0px -6% 0px' } }
        : { animate: play ? { opacity: 1, y: 0 } : { opacity: 0, y: 28 } })}
      transition={{ duration: 1.05, ease: [0.2, 0.7, 0.2, 1], delay: delay * 0.09 }}
    >
      {children}
    </Tag>
  )
}
