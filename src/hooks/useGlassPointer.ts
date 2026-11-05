import type { PointerEvent } from 'react'

/** Reflexo especular do vidro seguindo o ponteiro: espalhe o retorno em qualquer elemento `.glass`. */
export function useGlassPointer() {
  return {
    onPointerMove: (e: PointerEvent<HTMLElement>) => {
      if (e.pointerType !== 'mouse') return
      const el = e.currentTarget
      const r = el.getBoundingClientRect()
      el.style.setProperty('--mx', `${((e.clientX - r.left) / r.width) * 100}%`)
      el.style.setProperty('--my', `${((e.clientY - r.top) / r.height) * 100}%`)
    },
    onPointerLeave: (e: PointerEvent<HTMLElement>) => {
      e.currentTarget.style.removeProperty('--mx')
      e.currentTarget.style.removeProperty('--my')
    },
  }
}
