import type { ReactNode } from 'react'
import { Reveal } from './Reveal'
import { WordReveal } from '../motion/WordReveal'

type Props = {
  eyebrow: string
  title: ReactNode
  accent?: ReactNode
  lead?: ReactNode
  align?: 'left' | 'center'
  className?: string
  /** título e destaque na mesma linha (sem quebra) */
  inline?: boolean
}

/** Cabeçalho editorial: rótulo, título em Syne com a segunda linha cromada e texto de apoio. */
export function SectionHeading({ eyebrow, title, accent, lead, align = 'left', className = '', inline = false }: Props) {
  const center = align === 'center'
  return (
    <header className={`${center ? 'text-center' : ''} ${className}`}>
      <Reveal>
        <p className="eyebrow">{eyebrow}</p>
      </Reveal>
      <h2 className="mt-5 font-display text-[clamp(38px,5.2vw,80px)] leading-[0.98] font-bold tracking-[-0.035em] text-fg">
        {typeof title === 'string' ? <WordReveal text={title} delay={0.1} /> : title}
        {accent && (
          <>
            {inline ? ' ' : <br />}
            {typeof accent === 'string' ? <WordReveal text={accent} chrome delay={0.25} /> : <span className="chrome-text">{accent}</span>}
          </>
        )}
      </h2>
      {lead && (
        <Reveal delay={2}>
          <p className={`mt-6 max-w-[46ch] text-[17px] text-text/75 ${center ? 'mx-auto' : ''}`}>{lead}</p>
        </Reveal>
      )}
    </header>
  )
}
