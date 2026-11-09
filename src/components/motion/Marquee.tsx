import { useRef } from 'react'
import { motion, useAnimationFrame, useMotionValue, useReducedMotion, useScroll, useSpring, useTransform, useVelocity, wrap } from 'motion/react'

type Props = { items: readonly string[]; baseVelocity?: number }

/**
 * Faixa de texto em movimento contínuo que acelera e inverte o sentido conforme a rolagem.
 * Serve de "respiro" e transição entre seções. Parada para quem pede menos movimento.
 */
export function Marquee({ items, baseVelocity = -2.2 }: Props) {
  const reduce = useReducedMotion()
  const baseX = useMotionValue(0)
  const { scrollY } = useScroll()
  const velocity = useSpring(useVelocity(scrollY), { damping: 50, stiffness: 400 })
  const factor = useTransform(velocity, [0, 1000], [0, 4], { clamp: false })
  const direction = useRef(1)
  const x = useTransform(baseX, (v) => `${wrap(-50, 0, v)}%`)

  useAnimationFrame((_, delta) => {
    if (reduce) return
    let move = direction.current * baseVelocity * (delta / 1000)
    const f = factor.get()
    if (f < 0) direction.current = -1
    else if (f > 0) direction.current = 1
    move += direction.current * move * f
    baseX.set(baseX.get() + move)
  })

  const row = [...items, ...items]
  return (
    <div aria-hidden className="overflow-hidden border-y border-fg/10 py-6 select-none md:py-8">
      <motion.div style={{ x }} className="flex w-max gap-10 whitespace-nowrap">
        {[0, 1].map((k) => (
          <div key={k} className="flex gap-10">
            {row.map((t, i) => (
              <span key={`${k}-${i}`} className="flex items-center gap-10 font-display text-[clamp(28px,4.4vw,64px)] leading-none font-bold tracking-[-0.03em]">
                <span className={i % 2 ? 'text-transparent [-webkit-text-stroke:1.25px_var(--c-accent)]' : 'chrome-text'}>{t}</span>
                <span className="size-2 rounded-full bg-accent" />
              </span>
            ))}
          </div>
        ))}
      </motion.div>
    </div>
  )
}
