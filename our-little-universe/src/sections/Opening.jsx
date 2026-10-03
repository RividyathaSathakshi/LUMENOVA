import { useEffect, useRef, useState } from 'react'
import { OPENING } from '../data/config.js'
import Chibi from '../components/Chibi.jsx'
import { Skyline } from '../components/SceneArt.jsx'
import Starfield from '../components/Starfield.jsx'

/** Full-screen landing. Works with or without music/video. */
export default function Opening({ onEnter }) {
  const [leaving, setLeaving] = useState(false)
  const btn = useRef(null)

  useEffect(() => {
    document.body.classList.add('no-scroll')
    btn.current?.focus({ preventScroll: true })
    return () => document.body.classList.remove('no-scroll')
  }, [])

  const enter = () => {
    if (leaving) return
    setLeaving(true)
    onEnter() // starts music inside the click gesture (browser autoplay rules)
  }

  return (
    <div className={`opening ${leaving ? 'leaving' : ''}`} role="dialog" aria-modal="true" aria-labelledby="opening-title">
      <Starfield count={90} />
      <div className="opening-moon" aria-hidden="true" />
      <div className="opening-bats" aria-hidden="true">
        <span>🦇</span><span>🦇</span>
      </div>

      <div className="opening-city" aria-hidden="true">
        <div className="rooftop left">
          <Chibi who="gubbi" hero mood="happy" className="silhouette" title="" />
        </div>
        <div className="rooftop right">
          <Chibi who="childu" hero mood="wink" className="silhouette" title="" />
        </div>
        <div className="web-line" />
        <Skyline className="opening-skyline" />
      </div>

      <div className="opening-copy">
        <h1 id="opening-title" className="opening-title">{OPENING.title}</h1>
        <p className="opening-sub">{OPENING.subtitle}</p>
        <button ref={btn} type="button" className="btn btn-hero" onClick={enter}>
          {OPENING.button}
        </button>
        <p className="opening-tip">🎧 Sound on for the full experience</p>
      </div>
    </div>
  )
}
