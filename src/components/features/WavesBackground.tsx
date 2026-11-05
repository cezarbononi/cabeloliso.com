import { useEffect, useRef } from 'react'
import { useReducedMotion } from 'motion/react'
import { useThemeValue } from '../../hooks/useTheme'

/**
 * Fundo animado: fios de prata ondulando numa faixa diagonal, como mechas de cabelo.
 * Desenhado em canvas, na cor do tema atual; parado (um quadro) com movimento reduzido.
 */
export function WavesBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const theme = useThemeValue()
  const reduce = useReducedMotion()

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas?.getContext('2d')
    if (!canvas || !ctx) return

    const rgb = theme === 'light' ? '0,0,0' : '255,255,255'
    // traço claro sobre preto puro precisa de mais opacidade para ter a mesma presença do traço escuro no branco
    const boost = theme === 'light' ? 1.25 : 2.2
    const col = (a: number) => `rgba(${rgb},${(a * boost).toFixed(3)})`
    let w = 0
    let h = 0
    let raf = 0

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      w = window.innerWidth
      h = window.innerHeight
      canvas.width = w * dpr
      canvas.height = h * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }

    const draw = (t: number) => {
      ctx.clearRect(0, 0, w, h)
      const n = w < 768 ? 18 : 30
      const step = w < 768 ? 14 : 10
      for (let i = 0; i < n; i++) {
        const g = ctx.createLinearGradient(0, 0, w, 0)
        // fios visíveis em quase toda a largura, sumindo só nas bordas
        const a = 0.085 + (i % 5) * 0.012
        g.addColorStop(0, col(0))
        g.addColorStop(0.12, col(a))
        g.addColorStop(0.5, col(a * 0.85))
        g.addColorStop(0.88, col(a * 0.6))
        g.addColorStop(1, col(0))
        ctx.strokeStyle = g
        ctx.lineWidth = i % 7 === 0 ? 1.1 : 0.6
        ctx.beginPath()
        for (let x = -20; x <= w + 20; x += step) {
          const p = x / w
          const y =
            h * (0.78 - p * 0.42) +
            (i - n / 2) * (h * 0.006 + 3) +
            Math.sin(p * 5.2 + t * 0.32 + i * 0.16) * h * 0.045 +
            Math.sin(p * 11 - t * 0.21 + i * 0.05) * h * 0.012
          if (x === -20) ctx.moveTo(x, y)
          else ctx.lineTo(x, y)
        }
        ctx.stroke()
      }
    }

    const loop = (ms: number) => {
      draw(ms / 1000)
      raf = requestAnimationFrame(loop)
    }

    resize()
    const onResize = () => {
      resize()
      if (reduce) draw(0)
    }
    window.addEventListener('resize', onResize)
    if (reduce) draw(0)
    else raf = requestAnimationFrame(loop)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', onResize)
    }
  }, [theme, reduce])

  return <canvas ref={canvasRef} aria-hidden className="pointer-events-none fixed inset-0 -z-10 size-full" />
}
