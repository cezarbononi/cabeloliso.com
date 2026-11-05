import { useState } from 'react'
import { Play } from 'lucide-react'

type Props = { id: string; name: string; meta: string; feature?: boolean; className?: string }

/** Depoimento em vídeo: mostra a miniatura e só carrega o player do YouTube ao clicar. */
export function VideoCard({ id, name, meta, feature = false, className = '' }: Props) {
  const [playing, setPlaying] = useState(false)
  const thumb = `https://i.ytimg.com/vi/${id}/${feature ? 'maxresdefault' : 'hqdefault'}.jpg`

  return (
    <div className={`group relative overflow-hidden rounded-[18px] bg-bg2 ${className}`}>
      {playing ? (
        <iframe
          className="absolute inset-0 size-full border-0"
          src={`https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0`}
          title={`Depoimento — ${name}`}
          allow="autoplay; encrypted-media; picture-in-picture"
          allowFullScreen
        />
      ) : (
        <button type="button" onClick={() => setPlaying(true)} className="absolute inset-0 size-full cursor-pointer text-left" aria-label={`Assistir: ${name}, ${meta}`}>
          <img src={thumb} alt="" loading="lazy" className="size-full object-cover transition-transform duration-[1600ms] ease-(--ease-out-soft) group-hover:scale-[1.03]" />
          <span className="pointer-events-none absolute inset-0 bg-linear-to-t from-black/60 to-transparent to-45%" />
          {feature && (
            <span className="glass glass-photo absolute top-1/2 left-1/2 grid size-20 -translate-1/2 place-items-center rounded-full">
              <Play className="size-6 fill-white" strokeWidth={1.4} />
            </span>
          )}
          <span className="absolute bottom-3 left-3 rounded-xl bg-black/70 px-3.5 py-2 text-xs text-white/80 backdrop-blur-md">
            <b className={`block font-display font-semibold text-white ${feature ? 'text-2xl' : 'text-lg'}`}>{name}</b>
            {meta}
          </span>
        </button>
      )}
    </div>
  )
}
