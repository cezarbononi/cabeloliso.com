import { useEffect, useRef, useState } from 'react'
import { useInView, useReducedMotion } from 'motion/react'

/** Conta de 0 até `value` quando o elemento entra na tela. Com movimento reduzido, mostra o valor final direto. */
export function useCountUp<T extends Element>(value: number, { duration = 1800, delay = 0, enabled = true } = {}) {
  const ref = useRef<T>(null)
  const inView = useInView(ref, { once: true })
  const reduce = useReducedMotion()
  const [current, setCurrent] = useState(reduce ? value : 0)

  useEffect(() => {
    if (!inView || !enabled) return
    if (reduce) {
      setCurrent(value)
      return
    }
    let frame = 0
    const timer = window.setTimeout(() => {
      const start = performance.now()
      const tick = (now: number) => {
        const p = Math.min(1, (now - start) / duration)
        setCurrent(Math.round(value * (1 - Math.pow(1 - p, 4))))
        if (p < 1) frame = requestAnimationFrame(tick)
      }
      frame = requestAnimationFrame(tick)
    }, delay)
    return () => {
      window.clearTimeout(timer)
      cancelAnimationFrame(frame)
    }
  }, [inView, enabled, reduce, value, duration, delay])

  return { ref, current }
}
