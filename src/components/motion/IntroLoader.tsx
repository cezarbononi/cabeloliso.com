import { createContext, useContext, useEffect, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { ChromeLogo } from '../ui/ChromeLogo'

const KEY = 'cl-intro-visto'
const seen = () => {
  try {
    return sessionStorage.getItem(KEY) === '1'
  } catch {
    return false
  }
}

/** true quando a abertura terminou (ou não foi exibida) — o topo da página só anima depois disso. */
export const IntroReady = createContext(true)
export const useIntroReady = () => useContext(IntroReady)

/**
 * Abertura: a logo cromada surge em tela cheia, o brilho passa por ela e a "cortina" sobe revelando o site.
 * Só na primeira visita da sessão; nunca para quem pede menos movimento.
 */
export function IntroProvider({ children }: { children: React.ReactNode }) {
  const reduce = useReducedMotion()
  const [show, setShow] = useState(() => !seen())
  const [ready, setReady] = useState(() => seen())

  useEffect(() => {
    if (reduce) {
      setShow(false)
      setReady(true)
      return
    }
    if (!show) return
    document.documentElement.style.overflow = 'hidden'
    const t = window.setTimeout(() => {
      // a cortina começa a subir agora: libera as animações do topo
      setShow(false)
      setReady(true)
      try {
        sessionStorage.setItem(KEY, '1')
      } catch {
        /* sem armazenamento: a abertura volta na próxima visita */
      }
    }, 1700)
    return () => window.clearTimeout(t)
  }, [show, reduce])

  return (
    <IntroReady.Provider value={ready}>
      {children}
      <AnimatePresence
        onExitComplete={() => {
          document.documentElement.style.overflow = ''
        }}
      >
        {show && !reduce && (
          <motion.div
            key="intro"
            aria-hidden
            className="fixed inset-0 z-[100] grid place-items-center bg-bg"
            initial={{ clipPath: 'inset(0% 0% 0% 0%)' }}
            exit={{ clipPath: 'inset(0% 0% 100% 0%)' }}
            transition={{ duration: 0.95, ease: [0.76, 0, 0.24, 1] }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, filter: 'blur(10px)' }}
              animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
              exit={{ opacity: 0, y: -40, scale: 0.94 }}
              transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-col items-center gap-8"
            >
              <ChromeLogo variant="full" className="w-[min(72vw,420px)] [animation-duration:2.4s]!" />
              <span className="h-px w-40 overflow-hidden bg-fg/15">
                <motion.span
                  className="block h-full origin-left bg-accent"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 1.3, ease: [0.65, 0, 0.35, 1], delay: 0.2 }}
                />
              </span>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </IntroReady.Provider>
  )
}
