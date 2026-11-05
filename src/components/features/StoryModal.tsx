import { useEffect, useRef } from 'react'
import { X } from 'lucide-react'
import { story } from '../../data/content'

type Props = { open: boolean; onClose: () => void }

/**
 * "A minha história" do Renildo em <dialog> nativo:
 * prende o foco, fecha com Esc e clicando fora, e devolve o foco ao botão que abriu.
 */
export function StoryModal({ open, onClose }: Props) {
  const ref = useRef<HTMLDialogElement>(null)

  useEffect(() => {
    const d = ref.current
    if (!d) return
    if (open && !d.open) {
      d.showModal()
      d.scrollTop = 0
      document.body.style.overflow = 'hidden'
    } else if (!open && d.open) {
      d.close()
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  return (
    <dialog
      ref={ref}
      onClose={onClose}
      onClick={(e) => e.target === e.currentTarget && onClose()}
      aria-labelledby="historia-titulo"
      className="m-auto max-h-[92svh] w-[min(920px,calc(100%-24px))] overflow-y-auto rounded-[28px] bg-bg p-0 text-text shadow-[0_40px_120px_-30px_rgb(0_0_0/0.7)] ring-1 ring-fg/12 backdrop:bg-black/70 backdrop:backdrop-blur-sm open:animate-[story-in_.5s_var(--ease-glass)]"
    >
      <button
        type="button"
        onClick={onClose}
        aria-label="Fechar a história"
        className="glass glass-photo sticky top-4 z-10 float-right -mb-11 mr-4 grid size-11 cursor-pointer place-items-center rounded-full"
      >
        <X className="size-5" strokeWidth={1.6} />
      </button>

      <div className="clear-right grid md:grid-cols-[2fr_3fr]">
        <div className="relative aspect-[4/3] md:aspect-auto md:min-h-[340px]">
          <img src={story.photo} alt={story.photoAlt} className="size-full object-cover object-[35%_18%] md:absolute md:inset-0" />
        </div>
        <header className="flex flex-col justify-end px-6 py-8 md:px-10 md:py-12">
          <p className="eyebrow">Renildo Ferreira</p>
          <h2 id="historia-titulo" className="mt-3 font-display text-[clamp(30px,4vw,48px)] leading-[1] font-bold tracking-[-0.035em] text-fg">
            {story.title}
          </h2>
          <p className="mt-4 text-[17px] text-text/75">{story.subtitle}</p>
        </header>
      </div>

      <ol className="relative px-6 pt-4 pb-12 md:px-10">
        {story.chapters.map((c) => (
          <li key={c.year} className="grid gap-x-8 border-t border-fg/10 py-8 md:grid-cols-[140px_1fr]">
            <p className="numeral text-[22px] font-semibold text-accent">{c.year}</p>
            <div>
              <h3 className="mt-2 font-display text-[clamp(20px,2vw,24px)] leading-tight font-bold tracking-[-0.025em] text-fg md:mt-0">{c.title}</h3>
              {c.text.map((t, i) => (
                <p key={i} className="mt-3 max-w-[62ch] text-[16px] leading-relaxed text-text/80">
                  {t}
                </p>
              ))}
            </div>
          </li>
        ))}
      </ol>
    </dialog>
  )
}
