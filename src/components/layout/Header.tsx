import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { business, nav } from '../../data/content'
import type { Theme } from '../../hooks/useTheme'
import { useActiveSection, useScrolled } from '../../hooks/useScrollState'
import { useGlassPointer } from '../../hooks/useGlassPointer'
import { ChromeLogo } from '../ui/ChromeLogo'
import { ThemeToggle } from '../ui/ThemeToggle'
import { Button } from '../ui/Button'

type Props = { theme: Theme; onToggleTheme: () => void }

const ids = nav.map((n) => n.id)
const left = nav.slice(0, 3)
const right = nav.slice(3)

/** Navegação flutuante simétrica (eco do espelhamento da logo) + menu em tela cheia no mobile. */
export function Header({ theme, onToggleTheme }: Props) {
  const scrolled = useScrolled()
  const active = useActiveSection(ids)
  const glass = useGlassPointer()
  const [open, setOpen] = useState(false)

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  const link = (id: string, label: string) => (
    <a
      key={id}
      href={`#${id}`}
      aria-current={active === id ? 'true' : undefined}
      className={`transition-colors duration-300 hover:text-fg ${active === id ? 'text-fg' : 'text-text/70'}`}
    >
      {label}
    </a>
  )

  return (
    <>
      <header
        {...glass}
        className={`glass fixed left-1/2 z-50 grid w-[min(1180px,calc(100%-32px))] -translate-x-1/2 grid-cols-[1fr_auto_auto] items-center rounded-full pr-2 pl-5 transition-[top,height] duration-600 ease-(--ease-glass) min-[1100px]:grid-cols-[1fr_auto_1fr] min-[1100px]:pl-7 ${scrolled ? 'top-2.5 h-14' : 'top-4 h-16'}`}
      >
        <nav aria-label="Seções" className="hidden items-center gap-8 text-[11px] font-medium tracking-[0.22em] uppercase min-[1100px]:flex">
          {left.map((n) => link(n.id, n.label))}
        </nav>

        <a href="#topo" aria-label="Cabeloliso.com — início" className="block w-[136px] md:w-[168px] min-[1100px]:justify-self-center">
          <ChromeLogo variant="wordmark" />
        </a>

        <div className="flex items-center justify-end gap-3 min-[1100px]:gap-7">
          <nav aria-label="Seções" className="hidden items-center gap-8 text-[11px] font-medium tracking-[0.22em] uppercase min-[1100px]:flex">
            {right.map((n) => link(n.id, n.label))}
          </nav>
          <ThemeToggle theme={theme} onToggle={onToggleTheme} />
          <a
            href={business.links.booking}
            target="_blank"
            rel="noopener"
            className="btn hidden min-h-11! px-5! sm:inline-flex"
          >
            Agendar
          </a>
          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            aria-expanded={open}
            aria-controls="menu-mobile"
            aria-label={open ? 'Fechar menu' : 'Abrir menu'}
            className="button-control size-11 cursor-pointer gap-1.5 min-[1100px]:hidden"
          >
            <span className={`h-px w-[18px] bg-current transition-transform duration-500 ${open ? 'translate-y-[3.5px] rotate-45' : ''}`} />
            <span className={`h-px w-[18px] bg-current transition-transform duration-500 ${open ? '-translate-y-[3.5px] -rotate-45' : ''}`} />
          </button>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            id="menu-mobile"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: [0.32, 0.72, 0, 1] }}
            className="fixed inset-0 z-40 flex flex-col items-center justify-center gap-6 overflow-y-auto bg-bg/90 py-24 backdrop-blur-2xl min-[1100px]:hidden"
          >
            <ChromeLogo variant="mark" className="mb-4 w-40" />
            {nav.map((n) => (
              <a key={n.id} href={`#${n.id}`} onClick={() => setOpen(false)} className="font-display text-4xl font-bold tracking-[-0.03em] text-fg">
                {n.label}
              </a>
            ))}
            <Button href={business.links.booking} className="mt-4">
              Agendar avaliação
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
