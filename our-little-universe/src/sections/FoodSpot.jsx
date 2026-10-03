import { useState } from 'react'
import { FOOD_SPOT } from '../data/config.js'
import Section from '../components/Section.jsx'
import VideoScene from '../components/VideoScene.jsx'

export default function FoodSpot() {
  const [ordered, setOrdered] = useState(false)
  return (
    <Section id="food" kicker="Chapter 02 · HQ" className="food">
      <div className="split">
        <div className="reveal">
          <VideoScene videoKey="food" mode="loop" />
        </div>
        <div className="food-copy">
          <h2 id="food-title" className="chapter-title reveal">{FOOD_SPOT.title}</h2>
          <p className="punchline reveal">{FOOD_SPOT.punchline}</p>
          <p className="lede reveal">{FOOD_SPOT.intro}</p>
          {!ordered && (
            <button type="button" className="btn btn-primary reveal" onClick={() => setOrdered(true)}>
              {FOOD_SPOT.button}
            </button>
          )}
        </div>
      </div>

      {ordered && (
        <div className="menu-board" aria-live="polite">
          <p className="menu-title">— Today’s Specials at HQ —</p>
          <ul className="menu-grid">
            {FOOD_SPOT.menu.map((m, i) => (
              <li key={m.name} className="menu-card" style={{ '--i': i }}>
                <span className="menu-icon" aria-hidden="true">{m.icon}</span>
                <strong>{m.name}</strong>
                <span>{m.desc}</span>
                <em className="menu-price">priceless</em>
              </li>
            ))}
          </ul>
          <button type="button" className="btn btn-link" onClick={() => setOrdered(false)}>Clear the table ↺</button>
        </div>
      )}
    </Section>
  )
}
