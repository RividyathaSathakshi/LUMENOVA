import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react'
import { MUSIC } from '../data/config.js'
import { load, save } from '../hooks/storage.js'

const MusicCtx = createContext(null)
export const useMusic = () => useContext(MusicCtx)

/*
 * One <audio> element for the whole site, mounted once at the top of the
 * app, so scrolling between chapters never restarts the song.
 *
 * status:
 *   idle        – nothing attempted yet (before first interaction)
 *   playing     – audio is playing
 *   paused      – user paused (or song ended)
 *   blocked     – browser refused autoplay; needs a tap on ▶
 *   unavailable – file missing / unsupported
 */
export function MusicProvider({ children }) {
  const tracks = MUSIC.tracks
  const audioRef = useRef(null)
  const [index, setIndex] = useState(() => {
    const i = load('track', MUSIC.MAIN_TRACK_INDEX)
    return i >= 0 && i < tracks.length ? i : 0
  })
  const [status, setStatus] = useState('idle')
  const [volume, setVolumeState] = useState(() => load('volume', MUSIC.defaultVolume))
  const [muted, setMuted] = useState(() => load('muted', false))
  const [time, setTime] = useState({ cur: 0, dur: 0 })
  const [missing, setMissing] = useState(() => new Set())
  const wantPlay = useRef(false) // play automatically once the current track can

  useEffect(() => save('volume', volume), [volume])
  useEffect(() => save('muted', muted), [muted])
  useEffect(() => save('track', index), [index])

  useEffect(() => {
    const a = audioRef.current
    if (!a) return
    a.volume = volume
    a.muted = muted
  }, [volume, muted])

  const tryPlay = useCallback(() => {
    const a = audioRef.current
    if (!a) return
    wantPlay.current = true
    const p = a.play()
    if (p?.catch) {
      p.catch((err) => {
        if (err?.name === 'NotAllowedError') setStatus('blocked')
        else if (err?.name === 'NotSupportedError') setStatus('unavailable')
        // AbortError: a newer load interrupted us — the new track will retry.
      })
    }
  }, [])

  const play = useCallback(() => {
    if (missing.has(index)) {
      // This file is missing: jump to the next track that might exist instead.
      const step = tracks.findIndex((_, i) => !missing.has((index + 1 + i) % tracks.length))
      if (step < 0) {
        setStatus('unavailable')
        return
      }
      wantPlay.current = true
      setTime({ cur: 0, dur: 0 })
      setStatus('paused')
      setIndex((index + 1 + step) % tracks.length)
      return
    }
    tryPlay()
  }, [index, missing, tracks, tryPlay])

  const pause = useCallback(() => {
    wantPlay.current = false
    audioRef.current?.pause()
  }, [])

  const toggle = useCallback(() => {
    const a = audioRef.current
    if (a && !a.paused) pause()
    else play()
  }, [pause, play])

  const goTo = useCallback(
    (i, { keepPlaying } = {}) => {
      const n = ((i % tracks.length) + tracks.length) % tracks.length
      const a = audioRef.current
      wantPlay.current = keepPlaying ?? (a ? !a.paused : false)
      setTime({ cur: 0, dur: 0 })
      setIndex(n)
      if (missing.has(n)) setStatus('unavailable')
      else if (status === 'unavailable') setStatus('paused')
    },
    [tracks.length, missing, status],
  )

  const next = useCallback(() => goTo(index + 1), [goTo, index])
  const prev = useCallback(() => {
    const a = audioRef.current
    if (a && a.currentTime > 3) {
      a.currentTime = 0
      return
    }
    goTo(index - 1)
  }, [goTo, index])

  const selectTrackById = useCallback(
    (id) => {
      const i = tracks.findIndex((t) => t.id === id)
      if (i >= 0 && i !== index) goTo(i)
    },
    [tracks, index, goTo],
  )

  // The source changed: load it, and resume if we were playing.
  const firstRender = useRef(true)
  useEffect(() => {
    const a = audioRef.current
    if (!a) return
    if (firstRender.current) {
      firstRender.current = false
      return
    }
    a.load()
    if (wantPlay.current && !missing.has(index)) tryPlay()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [index])

  const setVolume = useCallback((v) => {
    setVolumeState(v)
    if (v > 0) setMuted(false)
  }, [])

  const seek = useCallback((fraction) => {
    const a = audioRef.current
    if (a && Number.isFinite(a.duration)) a.currentTime = fraction * a.duration
  }, [])

  // Optional: chapter-based song switching (MUSIC.sectionTracks).
  const onSection = useCallback(
    (sectionId) => {
      const id = MUSIC.sectionTracks?.[sectionId]
      if (id && status === 'playing') selectTrackById(id)
    },
    [status, selectTrackById],
  )

  const onError = () => {
    const nowMissing = new Set(missing).add(index)
    setMissing(nowMissing)
    // If music was meant to be playing, skip ahead to the next file that might exist.
    const fallback = tracks.findIndex((_, i) => !nowMissing.has((index + 1 + i) % tracks.length))
    if (wantPlay.current && fallback >= 0) {
      setTime({ cur: 0, dur: 0 })
      setIndex((index + 1 + fallback) % tracks.length)
    } else {
      setStatus('unavailable')
    }
  }

  const allMissing = missing.size >= tracks.length

  const value = useMemo(
    () => ({
      tracks, index, track: tracks[index], status, volume, muted, time, allMissing,
      play, pause, toggle, next, prev, setVolume, setMuted, seek, onSection, selectTrackById,
    }),
    [tracks, index, status, volume, muted, time, allMissing, play, pause, toggle, next, prev, setVolume, seek, onSection, selectTrackById],
  )

  return (
    <MusicCtx.Provider value={value}>
      <audio
        ref={audioRef}
        src={tracks[index]?.src}
        preload="none"
        onPlay={() => setStatus('playing')}
        onPause={() => setStatus((s) => (s === 'unavailable' ? s : 'paused'))}
        onEnded={(e) => {
          if (tracks.length > 1) goTo(index + 1, { keepPlaying: true })
          else { e.target.currentTime = 0; tryPlay() }
        }}
        onError={onError}
        onTimeUpdate={(e) => setTime({ cur: e.target.currentTime, dur: e.target.duration })}
        onLoadedMetadata={(e) => setTime({ cur: 0, dur: e.target.duration })}
      />
      {children}
    </MusicCtx.Provider>
  )
}
