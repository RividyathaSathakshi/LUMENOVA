import Chibi from './Chibi.jsx'

/* Animated illustrated scene used as a video placeholder (and for
   illustrated transitions). Each scene = sky + chibi pair + props. */
const SCENES = {
  rooftops: { sky: 'sky-night', g: 'happy', c: 'wink', hero: true, props: ['🦇', '🕸️', '⭐'], layout: 'apart', skyline: true },
  college: { sky: 'sky-dusk', g: 'happy', c: 'surprised', props: ['🎓', '📚', '✨'], layout: 'near' },
  food: { sky: 'sky-warm', g: 'laugh', c: 'happy', props: ['🍛', '🍳', '☕'], layout: 'near', table: true },
  date: { sky: 'sky-pink', g: 'happy', c: 'love', props: ['🛍️', '🎮', '🍔', '🌸'], layout: 'near' },
  flowers: { sky: 'sky-pink', g: 'wink', c: 'love', props: ['💐', '🌸', '✂️'], layout: 'close' },
  kiss: { sky: 'sky-pink', g: 'love', c: 'love', props: ['🎂', '💋', '🎈'], layout: 'close' },
  gifts: { sky: 'sky-red', g: 'happy', c: 'love', props: ['🎁', '💝', '✂️'], layout: 'near' },
  drama: { sky: 'sky-comic', g: 'laugh', c: 'dramatic', props: ['💥', '😭', '🎭'], layout: 'near', bubble: 'Ganchali Jasthi aythu 😂' },
  night: { sky: 'sky-night', g: 'laugh', c: 'happy', props: ['📱', '🌙', '💬'], layout: 'apart', divider: true },
  sleep: { sky: 'sky-night', g: 'annoyed', c: 'sleepy', props: ['📱', '🌙', '🐥'], layout: 'apart', divider: true },
  distance: { sky: 'sky-night', g: 'pout', c: 'pout', props: ['📍', '💫', '📍'], layout: 'apart', line: true },
  ride: { sky: 'sky-sunset', g: 'happy', c: 'love', props: ['🏍️', '🌅', '💨'], layout: 'close', helmet: true },
  kulfi: { sky: 'sky-night', g: 'happy', c: 'happy', props: ['🍨', '📱', '🍨'], layout: 'apart', divider: true },
  reunion: { sky: 'sky-night', g: 'love', c: 'love', props: ['⭐', '💖', '🌙', '✨'], layout: 'hug' },
}

export default function SceneArt({ scene = 'rooftops', hint, className = '' }) {
  const s = SCENES[scene] ?? SCENES.rooftops
  return (
    <div className={`scene-art ${s.sky} layout-${s.layout} ${className}`} aria-hidden={hint ? undefined : true}>
      <div className="scene-stars" />
      {s.skyline && <Skyline />}
      {s.line && <div className="scene-line" />}
      {s.divider && <div className="scene-divider" />}
      {s.table && <div className="scene-table" />}
      <div className="scene-props">
        {s.props.map((p, i) => (
          <span key={i} style={{ '--i': i }}>{p}</span>
        ))}
      </div>
      <div className="scene-chars">
        <Chibi who="gubbi" mood={s.g} hero={s.hero} helmet={s.helmet} className="scene-g" />
        <Chibi who="childu" mood={s.c} hero={s.hero} helmet={s.helmet} className="scene-c" />
      </div>
      {s.bubble && <div className="scene-bubble">{s.bubble}</div>}
      {hint && <div className="scene-hint">{hint}</div>}
    </div>
  )
}

export function Skyline({ className = '' }) {
  return (
    <svg className={`skyline ${className}`} viewBox="0 0 400 120" preserveAspectRatio="none" aria-hidden="true">
      <path
        d="M0 120 V70 h20 v-20 h18 v30 h14 V40 h22 v40 h10 V58 h16 v-28 h8 v-10 h6 v10 h8 v28 h14 v26 h12 V48 h24 v36 h10 V62 h18 V30 h20 v52 h12 V54 h16 v20 h14 V44 h22 v40 h12 V66 h20 v54 Z"
        fill="#050818"
      />
      <g fill="#ffd36e" opacity=".55">
        <rect x="26" y="58" width="3" height="4" /><rect x="60" y="50" width="3" height="4" />
        <rect x="66" y="62" width="3" height="4" /><rect x="128" y="40" width="3" height="4" />
        <rect x="200" y="58" width="3" height="4" /><rect x="262" y="40" width="3" height="4" />
        <rect x="270" y="52" width="3" height="4" /><rect x="338" y="54" width="3" height="4" />
      </g>
    </svg>
  )
}
