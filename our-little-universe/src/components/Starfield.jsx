import { useMemo } from 'react'

/** Lightweight CSS star layer (deterministic so it doesn't jump on re-render). */
export default function Starfield({ count = 60, className = '' }) {
  const stars = useMemo(() => {
    let seed = count * 9301
    const rnd = () => ((seed = (seed * 9301 + 49297) % 233280) / 233280)
    return Array.from({ length: count }, () => ({
      left: `${rnd() * 100}%`,
      top: `${rnd() * 100}%`,
      size: 1 + rnd() * 2.2,
      delay: `${rnd() * 4}s`,
      dur: `${2.5 + rnd() * 3}s`,
    }))
  }, [count])
  return (
    <div className={`starfield ${className}`} aria-hidden="true">
      {stars.map((s, i) => (
        <i key={i} style={{ left: s.left, top: s.top, width: s.size, height: s.size, animationDelay: s.delay, animationDuration: s.dur }} />
      ))}
    </div>
  )
}
