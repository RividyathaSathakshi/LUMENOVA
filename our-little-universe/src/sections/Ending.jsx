import { useCallback, useEffect, useState } from 'react'
import { ENDING } from '../data/config.js'
import Section from '../components/Section.jsx'
import VideoScene from '../components/VideoScene.jsx'
import RevealLines from '../components/RevealLines.jsx'
import Starfield from '../components/Starfield.jsx'
import Chibi from '../components/Chibi.jsx'

function HugOverlay({ onClose }) {
  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && onClose()
    document.addEventListener('keydown', onKey)
    document.body.classList.add('no-scroll')
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.classList.remove('no-scroll')
    }
  }, [onClose])

  return (
    <div className="hug-overlay" role="dialog" aria-modal="true" aria-labelledby="hug-msg">
      <Starfield count={70} />
      <div className="hug-floaters" aria-hidden="true">
        {Array.from({ length: 24 }, (_, i) => (
          <i key={i} style={{ '--i': i, left: `${(i * 37) % 100}%` }}>{['❤️', '💖', '⭐', '✨', '💕', '🌙'][i % 6]}</i>
        ))}
      </div>
      <div className="hug-chibis" aria-hidden="true">
        <Chibi who="gubbi" mood="love" className="hug-g" />
        <Chibi who="childu" mood="love" className="hug-c" />
      </div>
      <p className="hug-word" aria-hidden="true">*HUG*</p>
      <p id="hug-msg" className="hug-msg">{ENDING.final}</p>
      <button type="button" className="btn btn-ghost" onClick={onClose} autoFocus>Okay, coming 🏃‍♂️</button>
    </div>
  )
}

export default function Ending() {
  const [linesDone, setLinesDone] = useState(false)
  const [hug, setHug] = useState(false)
  const onDone = useCallback(() => setLinesDone(true), [])
  const closeHug = useCallback(() => setHug(false), [])

  return (
    <Section id="ending" kicker="Final chapter" className="ending">
      <Starfield count={80} />
      <div className="narrow reveal"><VideoScene videoKey="reunion" mode="cinematic" /></div>

      <RevealLines lines={ENDING.lines} className="ending-lines" lineClass="script" doneLabel={null} onDone={onDone} />

      {linesDone && (
        <div className="finale pop">
          <h2 className="finale-title">{ENDING.title}</h2>
          <p className="finale-sub">{ENDING.sub1}</p>
          <p className="finale-sub strong">{ENDING.sub2}</p>
          <button type="button" className="btn btn-hero" onClick={() => setHug(true)}>{ENDING.button}</button>
          <p className="signature">{ENDING.signature}</p>
        </div>
      )}

      {hug && <HugOverlay onClose={closeHug} />}
    </Section>
  )
}
