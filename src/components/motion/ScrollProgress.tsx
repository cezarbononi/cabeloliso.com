import { motion, useScroll, useSpring } from 'motion/react'

/** Fio prateado no topo da tela que acompanha o progresso de leitura. */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 140, damping: 30, mass: 0.4 })
  return (
    <motion.div
      aria-hidden
      style={{ scaleX }}
      className="fixed inset-x-0 top-0 z-[60] h-[2px] origin-left bg-[linear-gradient(90deg,transparent,var(--c-accent)_30%,var(--c-fg))]"
    />
  )
}
