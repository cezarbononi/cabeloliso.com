import { AnimatePresence, motion, useMotionValueEvent, useScroll } from 'motion/react'
import { ArrowUp } from 'lucide-react'
import { useState } from 'react'
import { scrollToTop } from './SmoothScroll'

/** Botão "voltar ao topo": aparece depois da primeira tela, com anel que mostra o progresso da leitura. */
export function BackToTop() {
  const { scrollY, scrollYProgress } = useScroll()
  const [visible, setVisible] = useState(false)
  useMotionValueEvent(scrollY, 'change', (y) => setVisible(y > window.innerHeight * 1.2))

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          type="button"
          onClick={() => {
            scrollToTop()
            document.querySelector<HTMLElement>('#topo a, #topo button')?.focus({ preventScroll: true })
          }}
          aria-label="Voltar ao topo"
          initial={{ opacity: 0, y: 16, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 16, scale: 0.9 }}
          transition={{ duration: 0.4, ease: [0.32, 0.72, 0, 1] }}
          whileHover={{ y: -3 }}
          whileTap={{ scale: 0.94 }}
          className="glass fixed right-4 bottom-4 z-50 grid size-13 cursor-pointer place-items-center rounded-full text-fg md:right-6 md:bottom-6"
        >
          <svg viewBox="0 0 52 52" className="absolute! inset-0 size-full -rotate-90" aria-hidden>
            <circle cx="26" cy="26" r="24" fill="none" stroke="currentColor" strokeOpacity="0.12" strokeWidth="1.5" />
            <motion.circle cx="26" cy="26" r="24" fill="none" stroke="var(--c-accent)" strokeWidth="1.5" strokeLinecap="round" style={{ pathLength: scrollYProgress }} />
          </svg>
          <ArrowUp className="size-5" strokeWidth={1.6} />
        </motion.button>
      )}
    </AnimatePresence>
  )
}
