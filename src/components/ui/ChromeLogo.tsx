import type { CSSProperties } from 'react'
import { media } from '../../data/content'

const variants = {
  full: { src: media.logo.full, ratio: '1831 / 990' },
  mark: { src: media.logo.mark, ratio: '1170 / 560' },
  wordmark: { src: media.logo.wordmark, ratio: '1831 / 390' },
} as const

type Props = { variant?: keyof typeof variants; className?: string; label?: string }

/** Logomarca original com acabamento cromado animado. A logo é usada como máscara, preservando o desenho. */
export function ChromeLogo({ variant = 'full', className = '', label }: Props) {
  const v = variants[variant]
  // URL absoluta: url() dentro de variável CSS seria resolvida a partir da pasta do CSS gerado, não da página
  const href = new URL(v.src, document.baseURI).href
  const style = { '--logo': `url("${href}")`, aspectRatio: v.ratio } as CSSProperties
  return (
    <span
      className={`chrome-logo block ${className}`}
      style={style}
      role={label ? 'img' : undefined}
      aria-label={label}
      aria-hidden={label ? undefined : true}
    />
  )
}
