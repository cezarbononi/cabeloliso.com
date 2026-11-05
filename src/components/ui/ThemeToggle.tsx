import { Moon, Sun } from 'lucide-react'
import type { Theme } from '../../hooks/useTheme'

type Props = { theme: Theme; onToggle: () => void; className?: string }

/** Mostra o ícone do tema de destino: sol no escuro (ir para o claro), lua no claro. */
export function ThemeToggle({ theme, onToggle, className = '' }: Props) {
  const Icon = theme === 'dark' ? Sun : Moon
  return (
    <button
      type="button"
      onClick={onToggle}
      aria-label={theme === 'dark' ? 'Ativar tema claro' : 'Ativar tema escuro'}
      className={`grid size-10 cursor-pointer place-items-center rounded-full text-fg ring-1 ring-fg/20 transition-colors duration-300 hover:bg-fg/8 ${className}`}
    >
      <Icon className="size-[18px]" strokeWidth={1.5} />
    </button>
  )
}
