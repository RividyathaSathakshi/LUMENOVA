import { useState } from 'react'
import { useMusic } from './MusicContext.jsx'

const fmt = (t) => {
  if (!Number.isFinite(t) || t < 0) return '0:00'
  return `${Math.floor(t / 60)}:${String(Math.floor(t % 60)).padStart(2, '0')}`
}

/** Small floating player. Collapsed: an animated music button. */
export default function MusicPlayer() {
  const m = useMusic()
  const [open, setOpen] = useState(false)
  const playing = m.status === 'playing'
  const unavailable = m.status === 'unavailable'
  const pct = m.time.dur ? (m.time.cur / m.time.dur) * 100 : 0

  let note = null
  if (unavailable)
    note = m.allMissing
      ? 'Music unavailable — add your song to public/audio/ (see README).'
      : `Music unavailable for this track (${m.track.src.split('/').pop()} not found). Try ⏭.`
  else if (m.status === 'blocked') note = 'Your browser paused autoplay — tap ▶ to start the music.'

  return (
    <div className={`music ${open ? 'is-open' : ''} ${playing ? 'is-playing' : ''}`}>
      {open && (
        <div className="music-panel" role="region" aria-label="Music player">
          <div className="music-track">
            <div className="music-disc" aria-hidden="true">🎵</div>
            <div className="music-meta">
              <strong>{m.track.title}</strong>
              <span>{m.track.artist}</span>
            </div>
          </div>

          <div className="music-progress">
            <span>{fmt(m.time.cur)}</span>
            <input
              type="range" min="0" max="1000"
              value={Math.round(pct * 10)}
              onChange={(e) => m.seek(Number(e.target.value) / 1000)}
              disabled={!m.time.dur}
              aria-label="Song progress"
              style={{ '--pct': `${pct}%` }}
            />
            <span>{fmt(m.time.dur)}</span>
          </div>

          <div className="music-buttons">
            <button type="button" onClick={m.prev} aria-label="Previous song">⏮</button>
            <button type="button" className="music-main" onClick={m.toggle} aria-label={playing ? 'Pause music' : 'Play music'}>
              {playing ? '❚❚' : '▶'}
            </button>
            <button type="button" onClick={m.next} aria-label="Next song">⏭</button>
          </div>

          <div className="music-volume">
            <button type="button" onClick={() => m.setMuted(!m.muted)} aria-label={m.muted ? 'Unmute music' : 'Mute music'}>
              {m.muted || m.volume === 0 ? '🔇' : '🔊'}
            </button>
            <input
              type="range" min="0" max="100"
              value={m.muted ? 0 : Math.round(m.volume * 100)}
              onChange={(e) => m.setVolume(Number(e.target.value) / 100)}
              aria-label="Volume"
              style={{ '--pct': `${m.muted ? 0 : m.volume * 100}%` }}
            />
          </div>

          {note && <p className="music-note" role="status">{note}</p>}
        </div>
      )}

      <div className="music-fab-row">
        {!open && (
          <button type="button" className="music-quick" onClick={m.toggle} aria-label={playing ? 'Pause music' : 'Play music'}>
            {playing ? '❚❚' : '▶'}
          </button>
        )}
        <button
          type="button"
          className="music-fab"
          onClick={() => setOpen((o) => !o)}
          aria-expanded={open}
          aria-label={open ? 'Close music player' : 'Open music player'}
        >
          {open ? '✕' : (
            <span className={`eq ${unavailable ? 'off' : ''}`} aria-hidden="true">
              <i /><i /><i /><i />
            </span>
          )}
        </button>
      </div>
    </div>
  )
}
