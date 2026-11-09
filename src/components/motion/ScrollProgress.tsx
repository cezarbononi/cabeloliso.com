import { useEffect, useState } from 'react'
import { useMotionValueEvent, type MotionValue } from 'motion/react'
import { ProgressHair } from '../features/ProgressHair'

const stages = ['Cachos', 'Ondas', 'Liso']

/** A mecha representa o progresso de leitura, com três referências visuais. */
export function ScrollProgress({ progress }: { progress: MotionValue<number> }) {
  const [percent, setPercent] = useState(0)
  const update = (value: number) => setPercent(Math.floor(Math.max(0, Math.min(1, value)) * 100))
  useMotionValueEvent(progress, 'change', update)
  useEffect(() => { update(progress.get()) }, [progress])
  const stage = percent >= 99 ? 2 : percent >= 40 ? 1 : 0

  return (
    <div className="hair-progress">
      <div className="hair-progress__inner">
        <div className="hair-progress__intro" aria-hidden="true">
          <span className="hair-progress__eyebrow">Fio a fio</span>
          <span className="hair-progress__caption">A transformação acompanha você.</span>
        </div>
        <div
          className="hair-progress__track"
          role="progressbar"
          aria-label="Progresso de leitura da página"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={percent}
          aria-valuetext={`${percent}% da página`}
        >
          <ProgressHair progress={progress} />
          <div className="hair-progress__stages" aria-hidden="true">
            {stages.map((label, i) => (
              <span key={label} data-active={i === stage} data-complete={i < stage}>
                <span className="hair-progress__dot" />
                {label}
              </span>
            ))}
          </div>
        </div>
        <span className="hair-progress__value" aria-hidden="true">{percent}<span>%</span></span>
      </div>
    </div>
  )
}
