import { useCountUp } from '../../hooks/useCountUp'

/** Número que conta até o valor ao aparecer ("400+" → 0…400+). Anos (ex.: 2009) ficam fixos. */
export function CountStat({ value }: { value: string }) {
  const m = value.match(/^(\d+)(.*)$/)
  const n = m ? Number(m[1]) : 0
  const isYear = n >= 1900 && n <= 2100
  const { ref, current } = useCountUp<HTMLSpanElement>(isYear ? n : n, { duration: 1600 })
  if (!m || isYear) return <span>{value}</span>
  return (
    <span ref={ref} aria-label={value}>
      {current}
      {m[2]}
    </span>
  )
}
