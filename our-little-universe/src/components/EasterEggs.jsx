import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import { EASTER_EGGS } from '../data/config.js'
import { load, save } from '../hooks/storage.js'

const EggCtx = createContext(null)
export const useEggs = () => useContext(EggCtx)

export function EggProvider({ children }) {
  const [found, setFound] = useState(() => new Set(load('eggs', [])))
  const [toast, setToast] = useState(null)

  useEffect(() => save('eggs', [...found]), [found])
  useEffect(() => {
    if (!toast) return
    const t = setTimeout(() => setToast(null), 4200)
    return () => clearTimeout(t)
  }, [toast])

  const reveal = useCallback((egg) => {
    setFound((f) => new Set(f).add(egg.id))
    setToast({ ...egg, key: Date.now() })
  }, [])

  const value = useMemo(() => ({ found, total: EASTER_EGGS.length, reveal }), [found, reveal])

  return (
    <EggCtx.Provider value={value}>
      {children}
      <div className="egg-toast-wrap" aria-live="polite">
        {toast && (
          <button type="button" key={toast.key} className="egg-toast" onClick={() => setToast(null)}>
            <span className="egg-toast-icon"><EggIcon name={toast.icon} /></span>
            <span>
              <small>Easter egg found! {found.size}/{EASTER_EGGS.length}</small>
              {toast.message}
            </span>
          </button>
        )}
      </div>
    </EggCtx.Provider>
  )
}

export function EasterEgg({ section, className = '' }) {
  const { found, reveal } = useEggs()
  const egg = EASTER_EGGS.find((e) => e.section === section)
  if (!egg) return null
  const isFound = found.has(egg.id)
  return (
    <button
      type="button"
      className={`egg egg-${egg.icon} ${isFound ? 'found' : ''} ${className}`}
      onClick={() => reveal(egg)}
      aria-label={`Hidden surprise: ${egg.label}`}
      title="psst…"
    >
      <EggIcon name={egg.icon} />
    </button>
  )
}

export function EggIcon({ name }) {
  switch (name) {
    case 'bat':
      return (
        <svg viewBox="0 0 64 32" aria-hidden="true">
          <path fill="currentColor" d="M32 10c-2-4-3-6-3-6l-2 5c-6-6-17-8-27-4 6 2 9 7 8 12 4-3 9-3 12 1 2-3 6-3 8 0l4-4 4 4c2-3 6-3 8 0 3-4 8-4 12-1-1-5 2-10 8-12-10-4-21-2-27 4l-2-5s-1 2-3 6z" />
        </svg>
      )
    case 'spider':
      return (
        <svg viewBox="0 0 40 40" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.6">
          <path d="M20 2v36M2 20h36M7 7l26 26M33 7L7 33" opacity=".6" />
          <circle cx="20" cy="20" r="6" opacity=".7" /><circle cx="20" cy="20" r="12" opacity=".5" />
          <circle cx="20" cy="22" r="4" fill="#e63946" stroke="none" />
        </svg>
      )
    case 'bow':
      return (
        <svg viewBox="0 0 40 26" aria-hidden="true">
          <ellipse cx="11" cy="13" rx="10" ry="8" fill="#ff3b5c" />
          <ellipse cx="29" cy="13" rx="10" ry="8" fill="#ff3b5c" />
          <circle cx="20" cy="13" r="5" fill="#ffd166" />
        </svg>
      )
    case 'cat':
      return (
        <svg viewBox="0 0 40 28" aria-hidden="true">
          <path d="M4 26 L8 2 L18 16 Z M36 26 L32 2 L22 16 Z" fill="#1a1226" stroke="#ff8fb8" strokeWidth="1.5" />
          <path d="M4 26 Q20 14 36 26" stroke="#1a1226" strokeWidth="4" fill="none" />
        </svg>
      )
    case 'hat':
      return (
        <svg viewBox="0 0 48 26" aria-hidden="true">
          <ellipse cx="24" cy="19" rx="22" ry="6" fill="#f2c14e" />
          <path d="M11 18 Q12 4 24 4 Q36 4 37 18 Z" fill="#f6d06b" />
          <path d="M11.5 15 Q24 19 36.5 15 L36.8 18 Q24 22 11.2 18 Z" fill="#e63946" />
        </svg>
      )
    default:
      return <span>✨</span>
  }
}
