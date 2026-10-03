import { useState } from 'react'
import { DISTANCE } from '../data/config.js'
import Section from '../components/Section.jsx'
import VideoScene from '../components/VideoScene.jsx'
import Chibi from '../components/Chibi.jsx'

export default function LongDistance() {
  const [asked, setAsked] = useState(false)
  return (
    <Section id="distance" kicker="Chapter 05" title={DISTANCE.title} subtitle={DISTANCE.context}>
      <div className="map-card reveal" role="img" aria-label={`${DISTANCE.placeA} and ${DISTANCE.placeB}, ${DISTANCE.travel}, connected by a glowing line`}>
        <div className="map-place a">
          <Chibi who="childu" mood="pout" />
          <span className="pin">📍</span>
          <strong>{DISTANCE.placeA}</strong>
        </div>
        <svg className="map-line" viewBox="0 0 300 80" preserveAspectRatio="none" aria-hidden="true">
          <defs>
            <linearGradient id="glow" x1="0" x2="1">
              <stop offset="0" stopColor="#ff8fb8" />
              <stop offset="1" stopColor="#2ea8ff" />
            </linearGradient>
          </defs>
          <path d="M10 60 Q150 -10 290 60" stroke="url(#glow)" strokeWidth="4" fill="none" strokeLinecap="round" className="map-path" />
          <circle r="6" fill="#fff" className="map-heart-dot">
            <animateMotion dur="3.5s" repeatCount="indefinite" path="M10 60 Q150 -10 290 60" />
          </circle>
        </svg>
        <span className="map-travel">🛵 {DISTANCE.travel}</span>
        <div className="map-place b">
          <Chibi who="gubbi" mood="pout" />
          <span className="pin">📍</span>
          <strong>{DISTANCE.placeB}</strong>
        </div>
      </div>

      <ul className="habit-row reveal">
        {DISTANCE.habits.map((h) => (
          <li key={h.text} className="chip static"><span aria-hidden="true">{h.icon}</span> {h.text}</li>
        ))}
      </ul>

      <div className="split">
        <div className="reveal"><VideoScene videoKey="ldr" mode="cinematic" /></div>
        <div className="distance-copy">
          <blockquote className="big-quote reveal">{DISTANCE.text}</blockquote>
          {!asked ? (
            <button type="button" className="btn btn-primary reveal" onClick={() => setAsked(true)}>{DISTANCE.question}</button>
          ) : (
            <div className="answer pop" aria-live="polite">
              <p className="answer-q">{DISTANCE.question}</p>
              <p className="answer-a">{DISTANCE.answer}</p>
            </div>
          )}
        </div>
      </div>
    </Section>
  )
}
