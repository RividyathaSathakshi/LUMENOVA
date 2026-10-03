import { MOTORCYCLE } from '../data/config.js'
import Section from '../components/Section.jsx'
import VideoScene from '../components/VideoScene.jsx'

export default function Motorcycle() {
  return (
    <Section id="motorcycle" kicker="Chapter 08 · The ride" className="ride">
      <div className="ride-sun" aria-hidden="true" />
      <div className="ride-road" aria-hidden="true" />
      <div className="split">
        <div className="reveal"><VideoScene videoKey="motorcycle" mode="cinematic" /></div>
        <div className="ride-copy">
          <p className="ride-line reveal">{MOTORCYCLE.lines[0]}</p>
          <p className="ride-line big reveal">{MOTORCYCLE.lines[1]}</p>
          <p className="lede reveal">{MOTORCYCLE.caption}</p>
        </div>
      </div>
    </Section>
  )
}
