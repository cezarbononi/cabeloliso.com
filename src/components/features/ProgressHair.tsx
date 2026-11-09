import { useCallback, useEffect, useId, useRef } from 'react'
import { useMotionValueEvent, useReducedMotion, type MotionValue } from 'motion/react'

type Point = { x: number; y: number }
const fibers = [
  { offset: -5, width: 0.85, opacity: 0.55 },
  { offset: -2.6, width: 1.1, opacity: 0.8 },
  { offset: 0, width: 1.4, opacity: 1 },
  { offset: 2.7, width: 1, opacity: 0.75 },
  { offset: 5, width: 0.85, opacity: 0.5 },
]

/** Curvas cúbicas mantêm a tangente contínua, inclusive ao ampliar a mecha. */
function smoothPath(points: Point[]) {
  const pair = (p: Point) => `${p.x.toFixed(3)},${p.y.toFixed(3)}`
  let d = `M${pair(points[0])}`
  for (let i = 0; i < points.length - 1; i++) {
    const previous = points[Math.max(0, i - 1)]
    const start = points[i]
    const end = points[i + 1]
    const next = points[Math.min(points.length - 1, i + 2)]
    const c1 = { x: start.x + (end.x - previous.x) / 6, y: start.y + (end.y - previous.y) / 6 }
    const c2 = { x: end.x - (next.x - start.x) / 6, y: end.y - (next.y - start.y) / 6 }
    d += ` C${pair(c1)} ${pair(c2)} ${pair(end)}`
  }
  return d
}

/** Mecha da barra: cinco fios com curvatura orgânica e pontas afiladas. */
export function ProgressHair({ progress }: { progress: MotionValue<number> }) {
  const group = useRef<SVGGElement>(null)
  const gradient = useId()
  const reduce = useReducedMotion()

  const paint = useCallback((value: number) => {
    const p = reduce ? 0.5 : Math.max(0, Math.min(1, value))
    const curl = (1 - p) ** 1.15
    const tightCurl = (1 - p) ** 3
    const turns = 3 + 2.3 * tightCurl
    group.current?.querySelectorAll('path').forEach((path, index) => {
      const { offset } = fibers[index]
      const points = Array.from({ length: 65 }, (_, j) => {
        const t = j / 64
        const envelope = Math.sin(Math.PI * t)
        const phase = Math.PI * 2 * (turns * t + 0.085 * envelope) - 0.7 + offset * 0.012 * curl
        return {
          // A largura sempre avança: sem cúspides ou cruzamentos de fios.
          x: 12 + t * 776 + Math.sin(phase) * 12 * curl ** 2 * envelope,
          y: 32 + Math.cos(phase) * (22 + 3 * tightCurl) * curl * (0.72 + 0.28 * envelope)
            + offset * (0.35 + 0.65 * envelope),
        }
      })
      path.setAttribute('d', smoothPath(points))
    })
  }, [reduce])

  useMotionValueEvent(progress, 'change', (value) => { if (!reduce) paint(value) })
  useEffect(() => { paint(progress.get()) }, [progress, paint])

  return (
    <svg viewBox="0 0 800 64" preserveAspectRatio="none" aria-hidden="true" className="hair-progress__strands" shapeRendering="geometricPrecision">
      <defs>
        <linearGradient id={gradient} gradientUnits="userSpaceOnUse" x1="12" y1="0" x2="788" y2="0">
          <stop offset="0%" stopColor="var(--hair-shadow)" stopOpacity="0" />
          <stop offset="12%" stopColor="var(--hair-shadow)" />
          <stop offset="42%" stopColor="var(--hair-highlight)" />
          <stop offset="65%" stopColor="var(--hair-highlight)" />
          <stop offset="88%" stopColor="var(--hair-shadow)" />
          <stop offset="100%" stopColor="var(--hair-shadow)" stopOpacity="0" />
        </linearGradient>
      </defs>
      <g ref={group} fill="none" stroke={`url(#${gradient})`} strokeLinecap="round" strokeLinejoin="round">
        {fibers.map((fiber, i) => (
          <path key={i} strokeWidth={fiber.width} opacity={fiber.opacity} vectorEffect="non-scaling-stroke" />
        ))}
      </g>
    </svg>
  )
}
