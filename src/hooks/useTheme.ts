import { useCallback, useEffect, useState } from 'react'

export type Theme = 'dark' | 'light'
const STORAGE_KEY = 'cl-theme'

const readTheme = (): Theme => (document.documentElement.dataset.theme === 'light' ? 'light' : 'dark')

/** Tema claro/escuro. O valor inicial é aplicado no index.html antes da pintura, para não piscar. */
export function useTheme() {
  const [theme, setTheme] = useState<Theme>(readTheme)

  useEffect(() => {
    document.documentElement.dataset.theme = theme
    try {
      localStorage.setItem(STORAGE_KEY, theme)
    } catch {
      /* armazenamento indisponível (modo privado): o tema vale só nesta visita */
    }
  }, [theme])

  const toggle = useCallback(() => setTheme((t) => (t === 'dark' ? 'light' : 'dark')), [])
  return { theme, toggle }
}

/** Observa o tema atual a partir do atributo data-theme (útil para canvas e componentes sem acesso ao estado). */
export function useThemeValue() {
  const [theme, setTheme] = useState<Theme>(readTheme)
  useEffect(() => {
    const mo = new MutationObserver(() => setTheme(readTheme()))
    mo.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] })
    return () => mo.disconnect()
  }, [])
  return theme
}
