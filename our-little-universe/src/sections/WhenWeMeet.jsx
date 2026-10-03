import { MEET_LINES } from '../data/config.js'
import Section from '../components/Section.jsx'
import RevealLines from '../components/RevealLines.jsx'
import Chibi from '../components/Chibi.jsx'

export default function WhenWeMeet() {
  return (
    <Section id="meet" kicker="Chapter 07" className="meet">
      <div className="meet-stage reveal" aria-hidden="true">
        <Chibi who="gubbi" mood="love" className="meet-g" />
        <span className="meet-heart">💞</span>
        <Chibi who="childu" mood="love" className="meet-c" />
      </div>
      <RevealLines lines={MEET_LINES} className="meet-lines" lineClass="script" />
    </Section>
  )
}
