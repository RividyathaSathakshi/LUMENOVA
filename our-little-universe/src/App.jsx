import { useCallback, useEffect, useState } from 'react'
import { MusicProvider, useMusic } from './components/MusicContext.jsx'
import { EggProvider } from './components/EasterEggs.jsx'
import MusicPlayer from './components/MusicPlayer.jsx'
import Nav from './components/Nav.jsx'
import Opening from './sections/Opening.jsx'
import Intro from './sections/Intro.jsx'
import Timeline from './sections/Timeline.jsx'
import FoodSpot from './sections/FoodSpot.jsx'
import InsideJokes from './sections/InsideJokes.jsx'
import LoveList from './sections/LoveList.jsx'
import LongDistance from './sections/LongDistance.jsx'
import LateNight from './sections/LateNight.jsx'
import WhenWeMeet from './sections/WhenWeMeet.jsx'
import Motorcycle from './sections/Motorcycle.jsx'
import ChibiStory from './sections/ChibiStory.jsx'
import Letters from './sections/Letters.jsx'
import KulfiDate from './sections/KulfiDate.jsx'
import Secret from './sections/Secret.jsx'
import Ending from './sections/Ending.jsx'

/** Tracks which chapter is on screen (for nav + optional per-chapter music). */
function useActiveSection(enabled) {
  const [active, setActive] = useState('intro')
  useEffect(() => {
    if (!enabled) return
    const els = document.querySelectorAll('[data-section]')
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => e.isIntersecting && setActive(e.target.dataset.section))
      },
      { rootMargin: '-45% 0px -50% 0px' },
    )
    els.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [enabled])
  return active
}

function Universe() {
  const [entered, setEntered] = useState(false)
  const [showOpening, setShowOpening] = useState(true)
  const music = useMusic()
  const active = useActiveSection(entered)

  useEffect(() => { music.onSection(active) }, [active]) // eslint-disable-line react-hooks/exhaustive-deps

  const enter = useCallback(() => {
    music.play() // must happen inside the click for browsers to allow audio
    setEntered(true)
    setTimeout(() => setShowOpening(false), 900)
  }, [music])

  return (
    <>
      {showOpening && <Opening onEnter={enter} />}
      {entered && (
        <>
          <Nav active={active} />
          <main id="main">
            <Intro />
            <Timeline />
            <FoodSpot />
            <InsideJokes />
            <LoveList />
            <LongDistance />
            <LateNight />
            <WhenWeMeet />
            <Motorcycle />
            <ChibiStory />
            <Letters />
            <KulfiDate />
            <Secret />
            <Ending />
          </main>
          <footer className="site-foot">
            Made by Childu, for Gubbi · Our little universe 🌙
          </footer>
        </>
      )}
      <MusicPlayer />
    </>
  )
}

export default function App() {
  return (
    <MusicProvider>
      <EggProvider>
        <Universe />
      </EggProvider>
    </MusicProvider>
  )
}
