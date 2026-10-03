import { useEffect, useState } from 'react'
import { INSIDE_JOKES as J } from '../data/config.js'
import Section from '../components/Section.jsx'
import VideoScene from '../components/VideoScene.jsx'
import Chibi from '../components/Chibi.jsx'
import { useReducedMotion } from '../hooks/useReducedMotion.js'

function Ganchali() {
  const [step, setStep] = useState(0) // 0 idle, 1..n Childu drama, then Gubbi verdict
  const max = J.ganchali.childuLines.length
  const verdict = step > max
  return (
    <article className="joke-card joke-ganchali">
      <h3>{J.ganchali.title}</h3>
      <p className="joke-meaning">{J.ganchali.meaning}</p>
      <VideoScene videoKey="ganchali" mode="loop" />
      <div className="comic-strip" aria-live="polite">
        <div className="comic-panel">
          <Chibi who="childu" mood={step > 0 && !verdict ? 'dramatic' : verdict ? 'pout' : 'happy'} />
          {step > 0 && !verdict && <p className="bubble bubble-left pop" key={step}>{J.ganchali.childuLines[step - 1]}</p>}
        </div>
        <div className="comic-panel">
          <Chibi who="gubbi" mood={verdict ? 'laugh' : 'happy'} />
          {verdict && <p className="bubble bubble-right pow pop">{J.ganchali.line}</p>}
        </div>
      </div>
      <button type="button" className="btn btn-primary sm" onClick={() => setStep((s) => (s > max ? 0 : s + 1))}>
        {step === 0 ? 'Make Childu dramatic 🎭' : verdict ? 'Again 😂' : step === max ? 'Gubbi’s verdict…' : 'More drama 😭'}
      </button>
    </article>
  )
}

function Kappi() {
  const [spark, setSpark] = useState(0)
  return (
    <article className="joke-card joke-kappi">
      <h3>{J.kappi.title}</h3>
      <button type="button" className="kappi-word" onClick={() => setSpark((s) => s + 1)} aria-label="Kappi — tap for sparkles">
        Kappi
        <span className="kappi-sparks" key={spark} aria-hidden="true">
          {spark > 0 && Array.from({ length: 8 }, (_, i) => <i key={i} style={{ '--i': i }}>✨</i>)}
        </span>
      </button>
      <p>{J.kappi.text}</p>
    </article>
  )
}

function Balalala() {
  const [n, setN] = useState(0)
  const activated = n >= 6
  const text = n === 0 ? '…' : Array.from({ length: n * 2 }, () => 'balalala').join(' ')
  return (
    <article className="joke-card joke-balalala">
      <h3>{J.balalala.title}</h3>
      <p className="joke-meaning">{J.balalala.meaning}</p>
      <div className="balalala-stage">
        <Chibi who="childu" mood={n > 0 ? 'laugh' : 'happy'} className="bal-c" />
        <p className="bubble bubble-grow" style={{ '--n': Math.min(n, 8) }} aria-live="polite">{text}</p>
        <Chibi who="gubbi" mood={n >= 4 ? 'sleepy' : n >= 2 ? 'annoyed' : 'happy'} className="bal-g" />
      </div>
      {activated && <p className="activated pop">{J.balalala.activated}</p>}
      <button type="button" className="btn btn-primary sm" onClick={() => setN((v) => (activated ? 0 : v + 1))}>
        {activated ? 'Okay okay, stop 🤐' : 'Keep talking, Childu 🗣️'}
      </button>
    </article>
  )
}

function Moods() {
  const reduced = useReducedMotion()
  const seq = J.moods.sequence
  const [i, setI] = useState(0)
  const [auto, setAuto] = useState(!reduced)
  useEffect(() => {
    if (!auto) return
    const t = setInterval(() => setI((v) => (v + 1) % seq.length), 1400)
    return () => clearInterval(t)
  }, [auto, seq.length])
  const mood = seq[i]
  return (
    <article className="joke-card joke-moods">
      <h3>{J.moods.title}</h3>
      <div className="mood-stage">
        <Chibi who="gubbi" mood={mood} key={mood} className="mood-pop" />
        <span className="mood-label" aria-live="off">{J.moods.labels[mood]}</span>
      </div>
      <p className="punchline sm">{J.moods.line}</p>
      <div className="row">
        <button type="button" className="btn btn-ghost sm" onClick={() => setI((v) => (v + 1) % seq.length)}>Next mood 🎲</button>
        <button type="button" className="btn btn-link sm" onClick={() => setAuto((a) => !a)} aria-pressed={auto}>
          {auto ? '⏸ Pause' : '▶ Auto'}
        </button>
      </div>
    </article>
  )
}

function Teasing() {
  const [act, setAct] = useState(null)
  const a = J.teasing.actions.find((x) => x.id === act)
  return (
    <article className="joke-card joke-teasing">
      <h3>{J.teasing.title}</h3>
      <div className={`tease-stage ${act ? `tease-${act}` : ''}`} aria-live="polite">
        <div className="tease-char">
          <Chibi who="gubbi" mood={a ? 'laugh' : 'wink'} />
          {a && <p className="bubble bubble-left pop" key={`g-${act}`}>{a.gubbi}</p>}
        </div>
        <div className="tease-hand" aria-hidden="true">👉</div>
        <div className="tease-char">
          <Chibi who="childu" mood={a ? (act === 'mustache' ? 'laugh' : 'pout') : 'happy'} />
          {a && <p className="bubble bubble-right pop" key={`c-${act}`}>{a.childu}</p>}
        </div>
      </div>
      <div className="row wrap">
        {J.teasing.actions.map((x) => (
          <button key={x.id} type="button" className={`chip ${act === x.id ? 'on' : ''}`} onClick={() => setAct(x.id)}>
            {x.label}
          </button>
        ))}
      </div>
      {a && <p className="joke-foot">{J.teasing.footer} 😂</p>}
    </article>
  )
}

export default function InsideJokes() {
  return (
    <Section id="jokes" kicker="Chapter 03" title="Inside jokes" subtitle="Translation not available for outsiders. 😌">
      <div className="jokes-grid">
        <Ganchali />
        <div className="jokes-col">
          <Kappi />
          <Moods />
        </div>
        <Balalala />
        <Teasing />
      </div>
    </Section>
  )
}
