import { useState } from 'react'
import { KULFI_DATE as K, QUESTIONS } from '../data/config.js'
import Section from '../components/Section.jsx'
import VideoScene from '../components/VideoScene.jsx'

function shuffle(arr) {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

function QuestionDeck() {
  const [deck, setDeck] = useState(QUESTIONS)
  const [i, setI] = useState(0)
  const [flip, setFlip] = useState(0)
  const next = () => { setI((v) => (v + 1) % deck.length); setFlip((f) => f + 1) }
  const reshuffle = () => { setDeck(shuffle(QUESTIONS)); setI(0); setFlip((f) => f + 1) }
  return (
    <div className="deck">
      <p className="deck-title">🎴 The question game</p>
      <div className="deck-stack">
        <div className="deck-card back" aria-hidden="true" />
        <div className="deck-card back two" aria-hidden="true" />
        <div className="deck-card front" key={flip} aria-live="polite">
          <span className="deck-num">Q{i + 1} / {deck.length}</span>
          <p>{deck[i]}</p>
          <span className="deck-suit" aria-hidden="true">🍨</span>
        </div>
      </div>
      <div className="row center">
        <button type="button" className="btn btn-primary sm" onClick={next}>Next ›</button>
        <button type="button" className="btn btn-ghost sm" onClick={reshuffle}>🔀 Shuffle</button>
      </div>
    </div>
  )
}

export default function KulfiDate() {
  const [done, setDone] = useState(() => new Set())
  const toggle = (i) => setDone((d) => { const n = new Set(d); n.has(i) ? n.delete(i) : n.add(i); return n })
  const goodnight = done.has(K.steps.length - 1)

  return (
    <Section id="kulfi" kicker="Chapter 11 · You’re invited" className="kulfi">
      <div className="invite reveal">
        <div className="invite-ticket">
          <p className="invite-kicker">Admit two · non-transferable</p>
          <h2 id="kulfi-title" className="invite-title">{K.title}</h2>
          <p className="invite-sub">“{K.subtitle}”</p>
          <dl className="invite-details">
            {K.details.map((d) => (
              <div key={d.label}><dt>{d.label}</dt><dd>{d.value}</dd></div>
            ))}
          </dl>
        </div>
        <VideoScene videoKey="kulfi" mode="loop" />
      </div>

      <div className="kulfi-grid">
        <div className="steps reveal">
          <p className="deck-title">📋 Tonight’s plan ({done.size}/{K.steps.length})</p>
          <ol>
            {K.steps.map((s, i) => (
              <li key={i}>
                <label className={`step ${done.has(i) ? 'done' : ''}`}>
                  <input type="checkbox" checked={done.has(i)} onChange={() => toggle(i)} />
                  <span className="step-box" aria-hidden="true">{done.has(i) ? '✓' : i + 1}</span>
                  <span className="step-icon" aria-hidden="true">{s.icon}</span>
                  <span>{s.text}</span>
                </label>
              </li>
            ))}
          </ol>
          <p className="fine">{K.note}</p>
          {goodnight && (
            <div className="goodnight pop" role="status">
              <span className="gn-moon" aria-hidden="true">🌙</span>
              <p>{K.goodnight}</p>
            </div>
          )}
        </div>
        <div className="reveal"><QuestionDeck /></div>
      </div>
    </Section>
  )
}
