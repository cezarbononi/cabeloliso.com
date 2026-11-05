import type { PointerEvent, ReactNode } from 'react'
import { ArrowUpRight } from 'lucide-react'
import { motion, useMotionValue, useReducedMotion, useSpring } from 'motion/react'
import { useGlassPointer } from '../../hooks/useGlassPointer'

type Props = {
  href: string
  children: ReactNode
  variant?: 'metal' | 'glass'
  size?: 'md' | 'lg'
  arrow?: boolean
  className?: string
}

/**
 * Botão-link: "metal" (ação principal) ou "glass" (secundária). Links externos abrem em nova aba.
 * Magnético no desktop: é levemente atraído pelo cursor. Parado no toque e com movimento reduzido.
 */
export function Button({ href, children, variant = 'metal', size = 'md', arrow = false, className = '' }: Props) {
  const glass = useGlassPointer()
  const reduce = useReducedMotion()
  const external = /^https?:/.test(href)
  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const x = useSpring(mx, { stiffness: 220, damping: 16, mass: 0.4 })
  const y = useSpring(my, { stiffness: 220, damping: 16, mass: 0.4 })

  const onMove = (e: PointerEvent<HTMLAnchorElement>) => {
    if (variant === 'glass') glass.onPointerMove(e)
    if (reduce || e.pointerType !== 'mouse') return
    const r = e.currentTarget.getBoundingClientRect()
    mx.set((e.clientX - (r.left + r.width / 2)) * 0.28)
    my.set((e.clientY - (r.top + r.height / 2)) * 0.38)
  }
  const onLeave = (e: PointerEvent<HTMLAnchorElement>) => {
    if (variant === 'glass') glass.onPointerLeave(e)
    mx.set(0)
    my.set(0)
  }

  return (
    <motion.a
      href={href}
      {...(external ? { target: '_blank', rel: 'noopener' } : {})}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      style={{ x, y }}
      className={`btn ${variant === 'metal' ? 'btn-metal' : 'btn-glass glass'} ${size === 'lg' ? 'min-h-15 px-10' : ''} ${className}`}
    >
      <span>{children}</span>
      {arrow && <ArrowUpRight className="size-4" strokeWidth={1.6} aria-hidden />}
    </motion.a>
  )
}
