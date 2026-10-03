import { useCallback, useState } from 'react'

/** Reveal-one-at-a-time helper: [count, next, reset, done]. */
export function useStepper(total) {
  const [count, setCount] = useState(0)
  const next = useCallback(() => setCount((c) => Math.min(c + 1, total)), [total])
  const reset = useCallback(() => setCount(0), [])
  return [count, next, reset, count >= total]
}
