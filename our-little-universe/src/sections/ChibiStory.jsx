import { useCallback, useEffect, useState } from 'react'
import { CHIBI_STORY } from '../data/config.js'
import Section from '../components/Section.jsx'
import VideoScene from '../components/VideoScene.jsx'
import SceneArt from '../components/SceneArt.jsx'

const chapters = CHIBI_STORY.chapters

/** Plays individual clips back-to-back with illustrated title cards between them. */
export default function ChibiStory() {
  const [idx, setIdx] = useState(0)
  const [auto, setAuto] = useState(false)
  const [missing, setMissing] = useState(false)
  const [card, setCard] = useState(false) // transition title card
  const ch = chapters[idx]
  const illustrated = !ch.video || missing
  const last = idx === chapters.length - 1

  const goTo = useCallback((n) => {
    setMissing(false)
    setCard(true)
    setIdx(Math.max(0, Math.min(chapters.length - 1, n)))
  }, [])

  const advance = useCallback(() => {
    if (idx < chapters.length - 1) goTo(idx + 1)
    else setAuto(false)
  }, [idx, goTo])

  useEffect(() => {
    if (!card) return
    const t = setTimeout(() => setCard(false), 1300)
    return () => clearTimeout(t)
  }, [card, idx])

  // Illustrated chapters (or missing clips) hold for a few seconds while auto-playing.
  useEffect(() => {
    if (!auto || !illustrated || card) return
    const t = setTimeout(advance, (ch.seconds ?? 5) * 1000)
    return () => clearTimeout(t)
  }, [auto, illustrated, card, advance, ch.seconds, idx])

  const onMissing = useCallback(() => setMissing(true), [])
  const onEnded = useCallback(() => { if (auto) advance() }, [auto, advance])

  return (
    <Section id="chibi" kicker="Chapter 09 · Feature presentation" title={CHIBI_STORY.title} subtitle="Twelve tiny scenes. One very big feeling.">
      <div className="story-player reveal">
        <div className="story-screen">
          {illustrated ? (
            <div className="video-scene is-cinematic">
              <div className="video-frame">
                <SceneArt scene={ch.scene} />
                {auto && !card && <div className="story-timer" key={idx} style={{ '--dur': `${ch.seconds ?? 5}s` }} />}
              </div>
            </div>
          ) : (
            <VideoScene key={idx} videoKey={ch.video} scene={ch.scene} mode="cinematic" autoPlay={auto && !card} onEnded={onEnded} onMissing={onMissing} />
          )}
          {card && (
            <div className="story-card" aria-hidden="true">
              <span>{ch.caption}</span>
            </div>
          )}
        </div>

        <p className="story-caption" aria-live="polite">{ch.caption}</p>

        <div className="story-controls">
          <button type="button" className="btn btn-ghost sm" onClick={() => goTo(idx - 1)} disabled={idx === 0}>‹ Prev</button>
          <button type="button" className="btn btn-primary sm" onClick={() => (last && !auto ? (goTo(0), setAuto(true)) : setAuto((a) => !a))} aria-pressed={auto}>
            {auto ? '❚❚ Pause story' : last ? '↺ Watch again' : idx === 0 ? '▶ Play our story' : '▶ Continue'}
          </button>
          <button type="button" className="btn btn-ghost sm" onClick={() => goTo(idx + 1)} disabled={last}>Next ›</button>
        </div>

        <ol className="story-dots" aria-label="Story chapters">
          {chapters.map((c, i) => (
            <li key={i}>
              <button type="button" className={i === idx ? 'on' : i < idx ? 'seen' : ''} onClick={() => goTo(i)} aria-label={c.caption} aria-current={i === idx ? 'step' : undefined} />
            </li>
          ))}
        </ol>
      </div>
    </Section>
  )
}
