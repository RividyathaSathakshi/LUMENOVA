import { useEffect, useRef } from 'react'
import { useStepper } from '../hooks/useStepper.js'

/**
 * Tap-to-reveal lines, one at a time.
 * `onDone` fires after the final line appears.
 */
export default function RevealLines({ lines, buttonLabel = 'Next ›', doneLabel, onDone, className = '', lineClass = '' }) {
  const [count, next, reset, done] = useStepper(lines.length)
  const btnRef = useRef(null)

  useEffect(() => {
    if (done) onDone?.()
  }, [done, onDone])

  return (
    <div className={`reveal-lines ${className}`}>
      <div className="reveal-lines-list" aria-live="polite">
        {lines.slice(0, count).map((l, i) => (
          <p key={i} className={`reveal-line ${lineClass} ${i === count - 1 ? 'latest' : ''}`}>{l}</p>
        ))}
      </div>
      {!done ? (
        <button ref={btnRef} type="button" className="btn btn-ghost" onClick={next}>
          {count === 0 ? 'Tap to begin ›' : buttonLabel}
        </button>
      ) : (
        doneLabel !== null && (
          <button type="button" className="btn btn-link" onClick={reset}>{doneLabel ?? '↺ Read again'}</button>
        )
      )}
    </div>
  )
}
