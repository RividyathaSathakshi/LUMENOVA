import { OPENING, PEOPLE } from '../data/config.js'
import Section from '../components/Section.jsx'
import VideoScene from '../components/VideoScene.jsx'
import Chibi from '../components/Chibi.jsx'
import { scrollToSection } from '../components/Nav.jsx'

export default function Intro() {
  return (
    <Section id="intro" className="intro">
      <div className="intro-grid">
        <div className="intro-copy reveal">
          <p className="kicker">Episode 01 · A Childu Production</p>
          <h1 className="intro-title">
            <span className="t-red">{PEOPLE.him}</span> <span className="amp">&amp;</span> <span className="t-pink">{PEOPLE.her}</span>
          </h1>
          <p className="lede">{OPENING.introLine}</p>
          <div className="intro-cast">
            <div className="cast-card">
              <Chibi who="gubbi" hero mood="happy" />
              <div><strong>Gubbi</strong><span>Dark-knight vibes, web-slinger energy, suspiciously strong arms.</span></div>
            </div>
            <div className="cast-card">
              <Chibi who="childu" hero mood="wink" />
              <div><strong>Childu</strong><span>Cute bow, cat-eared elegance, dramatic by profession.</span></div>
            </div>
          </div>
          <button type="button" className="btn btn-primary" onClick={() => scrollToSection('timeline')}>Start our story ↓</button>
        </div>
        <div className="reveal">
          <VideoScene videoKey="intro" mode="cinematic" autoPlay caption="Our world, after dark." />
        </div>
      </div>
    </Section>
  )
}
