import { useEffect, useRef, useState } from 'react'
import { useReducedMotion } from 'motion/react'
import { media } from '../../data/content'

/**
 * Vídeo do topo dentro do arco. A foto aparece até o vídeo carregar (e fica se o arquivo faltar).
 * Com movimento reduzido, mostra o primeiro quadro parado.
 */
export function HeroVideo() {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [ready, setReady] = useState(false)
  const reduce = useReducedMotion()

  useEffect(() => {
    const v = videoRef.current
    if (!v || !ready) return
    if (reduce) v.pause()
    else v.play().catch(() => {})
  }, [ready, reduce])

  return (
    <div className="group relative aspect-[4/5] overflow-hidden rounded-t-[280px] shadow-[0_0_0_1px_color-mix(in_srgb,var(--c-accent)_25%,transparent),0_60px_120px_-40px_color-mix(in_srgb,var(--c-accent)_18%,transparent)] lg:aspect-[7/10] lg:rounded-t-full">
      <img
        src={media.heroPoster}
        alt="Cliente do salão com cabelo liso, preto, longo e brilhante após a Compactação Capilar"
        fetchPriority="high"
        className="size-full scale-[1.04] object-cover transition-transform duration-[2400ms] ease-(--ease-out-soft) group-hover:scale-100"
      />
      <video
        ref={videoRef}
        muted
        loop
        playsInline
        preload="auto"
        onLoadedData={() => setReady(true)}
        aria-label="Vídeo de resultado do salão Cabeloliso.com"
        className={`absolute inset-0 size-full scale-[1.04] object-cover object-[50%_28%] transition-[opacity,transform] duration-[1200ms,2400ms] ease-(--ease-out-soft) group-hover:scale-100 ${ready ? 'opacity-100' : 'opacity-0'}`}
      >
        <source src={media.heroVideo} type="video/mp4" />
      </video>
      <span className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,transparent_55%,rgb(0_0_0/0.45)),linear-gradient(115deg,rgb(255_255_255/0.14),transparent_30%)]" />
    </div>
  )
}
