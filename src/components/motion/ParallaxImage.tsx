import { useRef } from 'react'
import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react'

type Props = {
  src: string
  alt: string
  className?: string
  imgClassName?: string
  /** intensidade do parallax (fração da altura) */
  strength?: number
  loading?: 'lazy' | 'eager'
}

/**
 * Foto que se revela com uma "cortina" ao entrar na tela e depois se desloca levemente
 * na rolagem (parallax), dando profundidade entre as seções.
 */
export function ParallaxImage({ src, alt, className = '', imgClassName = '', strength = 0.08, loading = 'lazy' }: Props) {
  const ref = useRef<HTMLDivElement>(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], [`${-strength * 100}%`, `${strength * 100}%`])

  return (
    <motion.div
      ref={ref}
      className={`relative overflow-hidden ${className}`}
      initial={{ clipPath: 'inset(18% 8% 18% 8%)', opacity: 0 }}
      whileInView={{ clipPath: 'inset(0% 0% 0% 0%)', opacity: 1 }}
      viewport={{ once: true, margin: '0px 0px -8% 0px' }}
      transition={{ duration: 1.3, ease: [0.22, 1, 0.36, 1] }}
    >
      <motion.img
        src={src}
        alt={alt}
        loading={loading}
        style={reduce ? undefined : { y, scale: 1 + strength * 2 }}
        className={`size-full object-cover ${imgClassName}`}
      />
    </motion.div>
  )
}
