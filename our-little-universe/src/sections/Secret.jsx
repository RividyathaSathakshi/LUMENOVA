import { useRef, useState } from 'react'
import { PUZZLE as P } from '../data/config.js'
import Section from '../components/Section.jsx'

const norm = (s) => s.toLowerCase().replace(/[^a-z0-9]/g, '')

function Lock({ lock, n, onSolved }) {
  const [value, setValue] = useState('')
  const [feedback, setFeedback] = useState(null) // { ok, text }
  const [hints, setHints] = useState(0)
  const [shake, setShake] = useState(0)
  const tries = useRef(0)

  const submit = (e) => {
    e.preventDefault()
    if (!value.trim()) return
    if (lock.answers.includes(norm(value))) {
      setFeedback({ ok: true, text: P.right })
      setTimeout(onSolved, 700)
    } else {
      setFeedback({ ok: false, text: P.wrong[tries.current++ % P.wrong.length] })
      setShake((s) => s + 1)
    }
  }

  return (
    <form className="lock pop" onSubmit={submit}>
      <label htmlFor={`lock-${n}`} className="lock-q">{lock.question}</label>
      <div className={`lock-row ${feedback && !feedback.ok ? 'shake' : ''}`} key={shake}>
        <input
          id={`lock-${n}`}
          value={value}
          onChange={(e) => { setValue(e.target.value); setFeedback(null) }}
          autoComplete="off"
          autoCapitalize="off"
          spellCheck="false"
          placeholder="Your answer…"
          aria-describedby={`lock-fb-${n}`}
        />
        <button type="submit" className="btn btn-primary sm">Unlock 🔑</button>
      </div>
      <p id={`lock-fb-${n}`} className={`lock-fb ${feedback ? (feedback.ok ? 'ok' : 'bad') : ''}`} role="status">
        {feedback?.text ?? ' '}
      </p>
      {lock.hints.slice(0, hints).map((h, i) => <p key={i} className="lock-hint">💡 {h}</p>)}
      {hints < lock.hints.length && (
        <button type="button" className="btn btn-link sm" onClick={() => setHints((h) => h + 1)}>Need a hint?</button>
      )}
    </form>
  )
}

function GiftBox() {
  const [opened, setOpened] = useState(false)
  return (
    <div className={`gift ${opened ? 'opened' : ''}`}>
      <button type="button" className="gift-box" onClick={() => setOpened(true)} disabled={opened} aria-label={opened ? 'Gift opened' : P.gift.prompt}>
        <span className="gift-lid" aria-hidden="true" />
        <span className="gift-base" aria-hidden="true" />
        <span className="gift-ribbon" aria-hidden="true" />
        {opened && <span className="gift-burst" aria-hidden="true">{Array.from({ length: 12 }, (_, i) => <i key={i} style={{ '--i': i }}>{['❤️', '✨', '💖', '⭐'][i % 4]}</i>)}</span>}
      </button>
      {!opened ? (
        <p className="gift-prompt">{P.gift.prompt}</p>
      ) : (
        <div className="gift-reveal" aria-live="polite">
          <p className="gift-you">{P.gift.reveal}</p>
          <p className="gift-msg">{P.gift.message}</p>
        </div>
      )}
    </div>
  )
}

export default function Secret() {
  const [solved, setSolved] = useState(0)
  const unlocked = solved >= P.locks.length
  return (
    <Section id="secret" kicker="Chapter 12 · Classified" title={P.title} subtitle={P.intro}>
      <div className="vault reveal">
        <div className="vault-locks" aria-label={`${solved} of ${P.locks.length} locks open`}>
          {P.locks.map((_, i) => (
            <span key={i} className={`vault-lock ${i < solved ? 'open' : ''}`} aria-hidden="true">{i < solved ? '🔓' : '🔒'}</span>
          ))}
        </div>
        {!unlocked ? (
          <Lock key={solved} lock={P.locks[solved]} n={solved} onSolved={() => setSolved((s) => s + 1)} />
        ) : (
          <div className="secret-msg pop" role="status">
            <h3>{P.secret.title}</h3>
            {P.secret.lines.map((l, i) => <p key={i}>{l}</p>)}
          </div>
        )}
      </div>
      <GiftBox />
    </Section>
  )
}
