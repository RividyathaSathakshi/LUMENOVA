import { useEffect, useState } from 'react'
import { SECTIONS } from '../data/config.js'
import { useEggs } from './EasterEggs.jsx'

export function scrollToSection(id) {
  const el = document.getElementById(id)
  if (!el) return
  const reduced = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
  el.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth', block: 'start' })
  // move keyboard focus to the chapter for screen-reader / keyboard users
  el.setAttribute('tabindex', '-1')
  el.focus({ preventScroll: true })
}

export default function Nav({ active }) {
  const [open, setOpen] = useState(false)
  const [progress, setProgress] = useState(0)
  const { found, total } = useEggs()

  useEffect(() => {
    let raf = 0
    const onScroll = () => {
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(() => {
        const h = document.documentElement.scrollHeight - window.innerHeight
        setProgress(h > 0 ? Math.min(1, window.scrollY / h) : 0)
      })
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [])

  useEffect(() => {
    if (!open) return
    const onKey = (e) => e.key === 'Escape' && setOpen(false)
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [open])

  const idx = Math.max(0, SECTIONS.findIndex((s) => s.id === active))
  const cur = SECTIONS[idx]
  const go = (id) => {
    setOpen(false)
    scrollToSection(id)
  }

  return (
    <>
      <a className="skip-link" href="#timeline">Skip to our story</a>
      <header className="topbar">
        <div className="topbar-progress" style={{ transform: `scaleX(${progress})` }} aria-hidden="true" />
        <button type="button" className="topbar-brand" onClick={() => go('intro')} aria-label="Back to the start">
          <span className="brand-heart">❤</span> C <span className="amp">&amp;</span> G
        </button>
        <div className="topbar-chapter" aria-live="polite">
          <span className="topbar-count">{String(idx + 1).padStart(2, '0')}/{SECTIONS.length}</span>
          <span className="topbar-label">{cur.icon} {cur.label}</span>
        </div>
        <span className="topbar-eggs" title="Easter eggs found" aria-label={`${found.size} of ${total} Easter eggs found`}>
          🥚 {found.size}/{total}
        </span>
        <button type="button" className="topbar-menu" onClick={() => setOpen((o) => !o)} aria-expanded={open} aria-controls="chapter-drawer">
          <span className="sr-only">Chapters</span>
          <span className={`burger ${open ? 'x' : ''}`} aria-hidden="true"><i /><i /><i /></span>
        </button>
      </header>

      <nav id="chapter-drawer" className={`drawer ${open ? 'open' : ''}`} aria-label="Chapters" aria-hidden={!open}>
        <p className="drawer-title">Chapters of us</p>
        <ol>
          {SECTIONS.map((s, i) => (
            <li key={s.id}>
              <button type="button" tabIndex={open ? 0 : -1} className={s.id === active ? 'current' : ''} onClick={() => go(s.id)}>
                <span className="drawer-num">{String(i + 1).padStart(2, '0')}</span>
                <span className="drawer-icon" aria-hidden="true">{s.icon}</span>
                {s.label}
              </button>
            </li>
          ))}
        </ol>
      </nav>
      {open && <div className="drawer-scrim" onClick={() => setOpen(false)} aria-hidden="true" />}

      <nav className="dots" aria-label="Chapter progress">
        {SECTIONS.map((s) => (
          <button
            key={s.id}
            type="button"
            className={s.id === active ? 'on' : ''}
            onClick={() => go(s.id)}
            aria-label={`Go to ${s.label}`}
            aria-current={s.id === active ? 'true' : undefined}
          />
        ))}
      </nav>
    </>
  )
}
