import { useEffect, useRef, useState } from 'react'
import { VIDEOS, SHOW_PLACEHOLDER_HINTS } from '../data/config.js'
import { useInView } from '../hooks/useInView.js'
import { useReducedMotion } from '../hooks/useReducedMotion.js'
import SceneArt from './SceneArt.jsx'

const posterCache = new Map()
/** Checks once whether an optional poster image exists. */
function usePoster(url) {
  const [ok, setOk] = useState(() => posterCache.get(url) ?? false)
  useEffect(() => {
    if (!url || posterCache.has(url)) return
    const img = new Image()
    img.onload = () => { posterCache.set(url, true); setOk(true) }
    img.onerror = () => posterCache.set(url, false)
    img.src = url
  }, [url])
  return ok ? url : undefined
}

const fmt = (t) => {
  if (!Number.isFinite(t)) return '0:00'
  const m = Math.floor(t / 60)
  const s = Math.floor(t % 60)
  return `${m}:${String(s).padStart(2, '0')}`
}

/**
 * Lazy, fault-tolerant video scene.
 *  videoKey: key in VIDEOS
 *  mode:     'loop'      → muted, looping preview that plays while visible
 *            'cinematic' → play/pause, replay, mute, progress
 *  autoPlay: start cinematic playback (muted) as soon as it can
 *  onEnded / onMissing: callbacks for sequencing (Chibi Story)
 */
export default function VideoScene({
  videoKey,
  mode = 'cinematic',
  autoPlay = false,
  onEnded,
  onMissing,
  scene,
  caption,
  className = '',
}) {
  const v = VIDEOS[videoKey]
  const reduced = useReducedMotion()
  const [wrapRef, near] = useInView({ rootMargin: '300px', threshold: 0, once: true })
  const [visRef, visible] = useInView({ threshold: 0.35, once: false })
  const videoRef = useRef(null)
  const poster = usePoster(near ? v?.poster : null)

  const [status, setStatus] = useState('idle') // idle | loading | ready | error
  const [playing, setPlaying] = useState(false)
  const [muted, setMuted] = useState(true)
  const [ended, setEnded] = useState(false)
  const [time, setTime] = useState({ cur: 0, dur: 0 })

  const isLoop = mode === 'loop'

  // Reset when the clip changes (Chibi Story reuses this component).
  useEffect(() => {
    setStatus('idle')
    setPlaying(false)
    setEnded(false)
    setTime({ cur: 0, dur: 0 })
  }, [videoKey])

  useEffect(() => {
    if (near && status === 'idle') setStatus('loading')
  }, [near, status])

  useEffect(() => {
    if (status === 'error') onMissing?.()
  }, [status, onMissing])

  // Loop previews: play only while on screen (saves battery + bandwidth).
  useEffect(() => {
    const el = videoRef.current
    if (!el || status !== 'ready' || !isLoop) return
    if (visible && !reduced) el.play().catch(() => {})
    else el.pause()
  }, [visible, status, isLoop, reduced])

  // Cinematic: pause when scrolled away; optional autoplay.
  useEffect(() => {
    const el = videoRef.current
    if (!el || status !== 'ready' || isLoop) return
    if (!visible && !el.paused) el.pause()
    if (visible && autoPlay && el.paused && !ended && el.currentTime === 0) {
      el.play().catch(() => {})
    }
  }, [visible, status, isLoop, autoPlay, ended])

  const play = () => {
    const el = videoRef.current
    if (!el) return
    if (ended) {
      el.currentTime = 0
      setEnded(false)
    }
    el.play().catch(() => {})
  }
  const toggle = () => {
    const el = videoRef.current
    if (!el) return
    if (el.paused) play()
    else el.pause()
  }
  const replay = () => {
    const el = videoRef.current
    if (!el) return
    el.currentTime = 0
    setEnded(false)
    el.play().catch(() => {})
  }
  const seek = (e) => {
    const el = videoRef.current
    if (!el || !time.dur) return
    el.currentTime = (Number(e.target.value) / 1000) * time.dur
  }

  if (!v) return null
  const filename = v.file.split('/').pop()
  const showVideo = status === 'loading' || status === 'ready'
  const hint = SHOW_PLACEHOLDER_HINTS ? `AI chibi scene · add ${filename}` : null

  return (
    <figure
      ref={(n) => { wrapRef.current = n; visRef.current = n }}
      className={`video-scene ${isLoop ? 'is-loop' : 'is-cinematic'} status-${status} ${className}`}
    >
      <div className="video-frame">
        {/* Placeholder is always underneath; the video fades in over it once it has frames. */}
        <SceneArt scene={scene ?? v.scene} hint={status === 'error' ? hint : null} />

        {status === 'loading' && <div className="video-loading" aria-hidden="true"><span /><span /><span /></div>}

        {showVideo && (
          <video
            key={v.src}
            ref={videoRef}
            src={v.src}
            poster={poster}
            preload="metadata"
            playsInline
            muted={isLoop ? true : muted}
            loop={isLoop}
            aria-label={v.title}
            onLoadedData={() => setStatus('ready')}
            onCanPlay={() => setStatus((s) => (s === 'loading' ? 'ready' : s))}
            onError={() => setStatus('error')}
            onPlay={() => setPlaying(true)}
            onPause={() => setPlaying(false)}
            onEnded={() => { setPlaying(false); setEnded(true); onEnded?.() }}
            onTimeUpdate={(e) => setTime({ cur: e.target.currentTime, dur: e.target.duration })}
            onLoadedMetadata={(e) => setTime({ cur: 0, dur: e.target.duration })}
          />
        )}

        {status === 'ready' && !isLoop && !playing && (
          <button type="button" className="video-bigplay" onClick={ended ? replay : play} aria-label={ended ? `Replay ${v.title}` : `Play ${v.title}`}>
            {ended ? '↺' : '▶'}
          </button>
        )}

        {status === 'ready' && isLoop && reduced && (
          <button type="button" className="video-bigplay small" onClick={toggle} aria-label={playing ? 'Pause preview' : 'Play preview'}>
            {playing ? '❚❚' : '▶'}
          </button>
        )}
      </div>

      {status === 'ready' && !isLoop && (
        <div className="video-controls">
          <button type="button" onClick={toggle} aria-label={playing ? 'Pause' : 'Play'}>{playing ? '❚❚' : '▶'}</button>
          <button type="button" onClick={replay} aria-label="Replay from start">↺</button>
          <input
            type="range"
            min="0"
            max="1000"
            value={time.dur ? Math.round((time.cur / time.dur) * 1000) : 0}
            onChange={seek}
            aria-label="Video progress"
          />
          <span className="video-time">{fmt(time.cur)} / {fmt(time.dur)}</span>
          <button type="button" onClick={() => setMuted((m) => !m)} aria-label={muted ? 'Unmute video' : 'Mute video'}>
            {muted ? '🔇' : '🔊'}
          </button>
        </div>
      )}

      {caption && <figcaption>{caption}</figcaption>}
    </figure>
  )
}
