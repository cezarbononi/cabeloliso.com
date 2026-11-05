import { useEffect } from 'react'
import Lenis from 'lenis'
import 'lenis/dist/lenis.css'
import { cancelFrame, frame, useReducedMotion } from 'motion/react'

let instance: Lenis | null = null

/** Volta ao topo usando a rolagem suave quando ativa; sem ela, de forma instantânea ou nativa. */
export function scrollToTop() {
  if (instance) instance.scrollTo(0, { duration: 1.4 })
  else window.scrollTo({ top: 0, behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' })
}

/**
 * Rolagem suave (Lenis) sincronizada com o loop de quadros do Motion,
 * para as animações ligadas à rolagem acompanharem o movimento suavizado.
 * Desligada para quem pede menos movimento; no toque, mantém a rolagem nativa do aparelho.
 */
export function SmoothScroll() {
  const reduce = useReducedMotion()

  useEffect(() => {
    if (reduce) return
    const lenis = new Lenis({ duration: 1.15, anchors: { offset: -16 }, autoRaf: false })
    instance = lenis
    const update = ({ timestamp }: { timestamp: number }) => lenis.raf(timestamp)
    frame.update(update, true)
    return () => {
      cancelFrame(update)
      lenis.destroy()
      instance = null
    }
  }, [reduce])

  return null
}
