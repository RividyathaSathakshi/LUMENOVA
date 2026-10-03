import { useRef, useState } from 'react'
import { TIMELINE } from '../data/config.js'
import Section from '../components/Section.jsx'
import VideoScene from '../components/VideoScene.jsx'
import Chibi from '../components/Chibi.jsx'

function Special({ kind }) {
  if (kind === 'heart')
    return (
      <div className="special special-heart" aria-hidden="true">
        <div className="big-heart">❤</div>
        {Array.from({ length: 10 }, (_, i) => <span key={i} style={{ '--i': i }}>💗</span>)}
        <div className="special-chibis"><Chibi who="gubbi" mood="love" /><Chibi who="childu" mood="love" /></div>
      </div>
    )
  return (
    <div className="special special-cake" aria-hidden="true">
      <div className="cake">🎂</div>
      {Array.from({ length: 8 }, (_, i) => <span key={i} style={{ '--i': i }}>{['🎉', '✨', '🎈', '💖'][i % 4]}</span>)}
      <div className="special-chibis"><Chibi who="gubbi" mood="happy" /><Chibi who="childu" mood="love" /></div>
    </div>
  )
}

export default function Timeline() {
  const [active, setActive] = useState(0)
  const tabs = useRef([])
  const item = TIMELINE[active]

  // Arrow keys move between dates (tablist pattern).
  const onKey = (e) => {
    const dir = e.key === 'ArrowRight' ? 1 : e.key === 'ArrowLeft' ? -1 : 0
    if (!dir) return
    e.preventDefault()
    const n = (active + dir + TIMELINE.length) % TIMELINE.length
    setActive(n)
    tabs.current[n]?.focus()
  }

  return (
    <Section id="timeline" kicker="Chapter 01" title="Our story so far" subtitle="Tap a date. Relive it.">
      <div className="timeline-rail reveal" role="tablist" aria-label="Our timeline" onKeyDown={onKey}>
        {TIMELINE.map((t, i) => (
          <button
            key={t.id}
            ref={(el) => (tabs.current[i] = el)}
            type="button"
            role="tab"
            id={`tl-tab-${t.id}`}
            aria-selected={i === active}
            aria-controls="tl-panel"
            tabIndex={i === active ? 0 : -1}
            className={`tl-node ${i === active ? 'on' : ''} ${t.special === 'heart' ? 'heart' : ''}`}
            onClick={() => setActive(i)}
          >
            <span className="tl-dot" aria-hidden="true">{t.special === 'heart' ? '❤' : ''}</span>
            <span className="tl-date">{t.date}</span>
            <span className="tl-label">{t.label}</span>
          </button>
        ))}
      </div>

      <div id="tl-panel" role="tabpanel" aria-labelledby={`tl-tab-${item.id}`} className="tl-panel reveal" key={item.id}>
        <div className="tl-text">
          <p className="tl-panel-date">{item.date}</p>
          <h3 className="tl-quote">“{item.text}”</h3>
          <p className="tl-detail">{item.detail}</p>
          <div className="tl-pager">
            <button type="button" className="btn btn-ghost sm" onClick={() => setActive((active - 1 + TIMELINE.length) % TIMELINE.length)}>‹ Prev</button>
            <span>{active + 1} / {TIMELINE.length}</span>
            <button type="button" className="btn btn-ghost sm" onClick={() => setActive((active + 1) % TIMELINE.length)}>Next ›</button>
          </div>
        </div>
        <div className="tl-media">
          {item.video ? <VideoScene videoKey={item.video} mode="cinematic" /> : <Special kind={item.special} />}
        </div>
      </div>
    </Section>
  )
}
