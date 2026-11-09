import { useCallback, useEffect, useId, useRef } from 'react'
import { useMotionValueEvent, useReducedMotion, type MotionValue } from 'motion/react'
import { useMediaQuery } from '../../hooks/useMediaQuery'

type Props = {
  progress: MotionValue<number>
  mirrored?: boolean
}

/** Mechas decorativas do fundo, independentes do desenho da barra. */
export function HairStrands({ progress, mirrored = false }: Props) {
  const ref = useRef<SVGGElement>(null)
  const gradient = useId()
  const reduce = useReducedMotion()
  const compact = useMediaQuery('(max-width: 767px)')
  const count = compact ? 14 : 18

  const paint = useCallback((value: number) => {
    // Reduced motion retains a still lock; numeric progress remains live.
    const p = reduce ? 0.5 : Math.max(0, Math.min(1, value))
    const curl = (1 - p) ** 1.35
    const width = 220
    const length = 1000
    const amplitude = 66 * curl
    const turns = 2.6
    const samples = compact ? 120 : 176

    ref.current?.querySelectorAll('path').forEach((path, i) => {
      const strand = (i / (count - 1) - 0.5)
      let d = ''
      for (let j = 0; j <= samples; j++) {
        const t = j / samples
        const phase = t * Math.PI * 2 * turns + strand * 0.65 + (mirrored ? 1.1 : 0)
        const envelope = 0.75 + Math.sin(t * Math.PI) * 0.25
        // Backtracking gives ringlets that open into waves, then straight strands.
        const across = width / 2 + strand * 48 + Math.sin(phase) * amplitude * envelope
        const along = t * length + Math.cos(phase) * 88 * curl ** 2 * Math.sin(t * Math.PI)
        d += `${j === 0 ? 'M' : 'L'}${across.toFixed(2)},${along.toFixed(2)} `
      }
      path.setAttribute('d', d)
    })
  }, [reduce, mirrored, compact, count])

  useMotionValueEvent(progress, 'change', (value) => { if (!reduce) paint(value) })
  useEffect(() => { paint(progress.get()) }, [progress, paint])

  return (
    <svg
      viewBox="0 0 220 1000"
      preserveAspectRatio="none"
      aria-hidden="true"
      className="hair-background__strands"
    >
      <defs>
        <linearGradient id={gradient} gradientUnits="userSpaceOnUse" x1="0" y1="0" x2="0" y2="1000">
          <stop offset="0%" stopColor="var(--hair-shadow)" stopOpacity="0" />
          <stop offset="24%" stopColor="var(--hair-highlight)" />
          <stop offset="48%" stopColor="var(--hair-shadow)" />
          <stop offset="72%" stopColor="var(--hair-highlight)" />
          <stop offset="100%" stopColor="var(--hair-shadow)" stopOpacity="0" />
        </linearGradient>
      </defs>
      <g ref={ref} fill="none" stroke={`url(#${gradient})`} strokeLinecap="round">
        {Array.from({ length: count }, (_, i) => (
          <path key={i} strokeWidth={i % 5 === 0 ? 1 : 0.55} opacity={i % 5 === 0 ? 0.85 : 0.48} />
        ))}
      </g>
    </svg>
  )
}
