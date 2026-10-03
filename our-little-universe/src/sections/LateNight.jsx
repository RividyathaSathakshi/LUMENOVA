import { useEffect, useState } from 'react'
import { LATE_NIGHT } from '../data/config.js'
import Section from '../components/Section.jsx'
import VideoScene from '../components/VideoScene.jsx'
import Chibi from '../components/Chibi.jsx'
import { useInView } from '../hooks/useInView.js'
import { useReducedMotion } from '../hooks/useReducedMotion.js'

// Emoji-only bubbles: the giggling, without inventing real messages.
const NIGHT_BUBBLES = [
  { from: 'c', text: '🥺' },
  { from: 'g', text: '😂😂' },
  { from: 'c', text: 'hehehe 🙈' },
  { from: 'g', text: '😏' },
  { from: 'c', text: '…' },
]

export default function LateNight() {
  const [phase, setPhase] = useState('night') // night | asleep | morning
  const [n, setN] = useState(0)
  const [ref, inView] = useInView({ threshold: 0.3 })
  const reduced = useReducedMotion()

  useEffect(() => {
    if (!inView || phase !== 'night') return
    if (reduced) { setN(NIGHT_BUBBLES.length); return }
    if (n >= NIGHT_BUBBLES.length) return
    const t = setTimeout(() => setN((v) => v + 1), 1100)
    return () => clearTimeout(t)
  }, [inView, n, phase, reduced])

  return (
    <Section id="latenight" kicker="Chapter 06" title={LATE_NIGHT.title} subtitle={LATE_NIGHT.subtitle}>
      <div ref={ref} className={`bedrooms phase-${phase} reveal`}>
        <div className="bedroom">
          <span className="room-label">Childu’s room</span>
          <div className="blanket-wrap">
            <Chibi who="childu" mood={phase === 'night' ? 'laugh' : phase === 'asleep' ? 'sleepy' : 'surprised'} />
            <div className="blanket" />
            <span className="phone-glow" aria-hidden="true">📱</span>
          </div>
        </div>
        <div className="chat-col" aria-live="polite">
          {phase === 'night' && NIGHT_BUBBLES.slice(0, n).map((b, i) => (
            <p key={i} className={`chat chat-${b.from} pop`}>{b.text}</p>
          ))}
          {phase === 'night' && n < NIGHT_BUBBLES.length && <p className="chat chat-typing"><i /><i /><i /></p>}
          {phase !== 'night' && (
            <>
              <p className="chat chat-c pop">{LATE_NIGHT.childu}</p>
              {phase === 'morning' && <p className="chat chat-g pop">{LATE_NIGHT.gubbi} 😤</p>}
            </>
          )}
        </div>
        <div className="bedroom">
          <span className="room-label">Gubbi’s room</span>
          <div className="blanket-wrap">
            <Chibi who="gubbi" mood={phase === 'night' ? 'happy' : phase === 'asleep' ? 'surprised' : 'annoyed'} />
            <div className="blanket blue" />
            <span className="phone-glow" aria-hidden="true">📱</span>
          </div>
        </div>
        <div className="sky-badge" aria-hidden="true">{phase === 'morning' ? '☀️' : '🌙'}</div>
      </div>

      <div className="center row wrap">
        {phase === 'night' && <button type="button" className="btn btn-primary" onClick={() => setPhase('asleep')}>2:00 AM… 😴</button>}
        {phase === 'asleep' && <button type="button" className="btn btn-primary" onClick={() => setPhase('morning')}>Next morning ☀️</button>}
        {phase === 'morning' && <button type="button" className="btn btn-link" onClick={() => { setPhase('night'); setN(0) }}>↺ Replay the night</button>}
      </div>

      <div className="narrow reveal"><VideoScene videoKey="lateNight" mode="cinematic" /></div>
    </Section>
  )
}
