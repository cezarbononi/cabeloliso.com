import type { MotionValue } from 'motion/react'
import { HairStrands } from './HairStrands'

/** Mechas laterais que passam de cachos a fios lisos ao chegar ao rodapé. */
export function WavesBackground({ progress }: { progress: MotionValue<number> }) {
  return (
    <div aria-hidden="true" className="hair-background">
      <div className="hair-background__lock hair-background__lock--left">
        <HairStrands progress={progress} />
      </div>
      <div className="hair-background__lock hair-background__lock--right">
        <HairStrands progress={progress} mirrored />
      </div>
    </div>
  )
}
