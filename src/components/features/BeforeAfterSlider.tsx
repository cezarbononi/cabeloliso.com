import { useState } from 'react'
import { ChevronsLeftRight } from 'lucide-react'

type Props = { before: string; after: string; caption: string; className?: string }

/** Comparador antes/depois. O controle é um input range nativo (teclado e leitores de tela funcionam). */
export function BeforeAfterSlider({ before, after, caption, className = '' }: Props) {
  const [pos, setPos] = useState(50)
  return (
    <figure className={`relative overflow-hidden rounded-[20px] select-none ring-1 ring-accent/20 ${className}`}>
      <img src={before} alt={`Antes — ${caption}`} loading="lazy" className="pointer-events-none size-full object-cover" />
      <div className="absolute inset-0" style={{ clipPath: `inset(0 0 0 ${pos}%)` }}>
        <img src={after} alt={`Depois — ${caption}`} loading="lazy" className="pointer-events-none size-full object-cover" />
      </div>

      {/* elementos sobre a foto: sempre claros, independentes do tema */}
      <span className="pointer-events-none absolute inset-y-0 w-px -translate-x-1/2 bg-white/90" style={{ left: `${pos}%` }} />
      <span
        className="glass glass-photo pointer-events-none absolute top-1/2 grid size-12 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full"
        style={{ left: `${pos}%` }}
      >
        <ChevronsLeftRight className="size-5" strokeWidth={1.6} />
      </span>
      <span className="pointer-events-none absolute top-3 left-3 text-[10px] font-medium tracking-[0.24em] text-white rounded-full bg-black/65 px-2.5 py-1.5 backdrop-blur-sm">ANTES</span>
      <span className="pointer-events-none absolute top-3 right-3 text-[10px] font-medium tracking-[0.24em] text-white rounded-full bg-black/65 px-2.5 py-1.5 backdrop-blur-sm">DEPOIS</span>
      <figcaption className="pointer-events-none absolute bottom-3 left-3 text-[10px] font-medium tracking-[0.24em] text-white uppercase rounded-full bg-black/65 px-2.5 py-1.5 backdrop-blur-sm">
        {caption}
      </figcaption>

      <input
        type="range"
        min={0}
        max={100}
        value={pos}
        onChange={(e) => setPos(Number(e.target.value))}
        aria-label={`Comparar antes e depois — ${caption}`}
        className="absolute inset-0 z-10 m-0 size-full cursor-ew-resize opacity-0"
      />
    </figure>
  )
}
