import { LOVE_REASONS, LOVE_FINAL } from '../data/config.js'
import Section from '../components/Section.jsx'
import { useStepper } from '../hooks/useStepper.js'

export default function LoveList() {
  const total = LOVE_REASONS.length + 1
  const [count, next, reset, done] = useStepper(total)
  const shown = Math.min(count, LOVE_REASONS.length)
  const finalShown = count > LOVE_REASONS.length

  return (
    <Section id="love" kicker="Chapter 04" title="Things I love about you" subtitle="A very incomplete list. One at a time, so you actually read them. 😤">
      <div className="love-progress" aria-hidden="true">
        <span style={{ width: `${(count / total) * 100}%` }} />
      </div>
      <ol className="love-grid" aria-live="polite">
        {LOVE_REASONS.map((r, i) => (
          <li key={i} className={`love-card ${i < shown ? 'shown' : ''}`} aria-hidden={i >= shown}>
            <span className="love-num">{String(i + 1).padStart(2, '0')}</span>
            <span className="love-icon" aria-hidden="true">{i < shown ? r.icon : '?'}</span>
            <span className="love-text">{i < shown ? r.text : 'Tap reveal…'}</span>
          </li>
        ))}
      </ol>
      {finalShown && <p className="love-final pop">{LOVE_FINAL}</p>}
      <div className="center">
        {!done ? (
          <button type="button" className="btn btn-primary" onClick={next}>
            {count === 0 ? 'Reveal #1 💌' : count === LOVE_REASONS.length ? 'And most of all… ❤️' : `Reveal #${count + 1}`}
          </button>
        ) : (
          <button type="button" className="btn btn-link" onClick={reset}>↺ Start over</button>
        )}
      </div>
    </Section>
  )
}
