/* Original chibi designs for Childu & Gubbi (pure SVG, no image files).
   Used everywhere a video placeholder or interactive scene needs them. */

const SKIN = { childu: '#f9d7c4', gubbi: '#efc3a0' }
const HAIR = { childu: '#2a1a2e', gubbi: '#1b1730' }

function Eyes({ mood, x1 = 44, x2 = 76, y = 70 }) {
  const dark = '#1a1028'
  switch (mood) {
    case 'laugh':
      return (
        <g stroke={dark} strokeWidth="3.4" fill="none" strokeLinecap="round">
          <path d={`M${x1 - 7} ${y + 2} Q${x1} ${y - 7} ${x1 + 7} ${y + 2}`} />
          <path d={`M${x2 - 7} ${y + 2} Q${x2} ${y - 7} ${x2 + 7} ${y + 2}`} />
        </g>
      )
    case 'sleepy':
      return (
        <g stroke={dark} strokeWidth="3" fill="none" strokeLinecap="round">
          <path d={`M${x1 - 7} ${y} Q${x1} ${y + 6} ${x1 + 7} ${y}`} />
          <path d={`M${x2 - 7} ${y} Q${x2} ${y + 6} ${x2 + 7} ${y}`} />
        </g>
      )
    case 'love':
      return (
        <g fill="#ff4d7e">
          {[x1, x2].map((x) => (
            <path
              key={x}
              d={`M${x} ${y + 7} C${x - 12} ${y - 1} ${x - 7} ${y - 11} ${x} ${y - 4} C${x + 7} ${y - 11} ${x + 12} ${y - 1} ${x} ${y + 7}Z`}
            />
          ))}
        </g>
      )
    case 'annoyed':
      return (
        <g>
          {[x1, x2].map((x) => (
            <g key={x}>
              <ellipse cx={x} cy={y + 2} rx="7" ry="6" fill={dark} />
              <rect x={x - 9} y={y - 8} width="18" height="8" fill="currentColor" className="chibi-lid" />
              <path d={`M${x - 9} ${y} H${x + 9}`} stroke={dark} strokeWidth="2.6" strokeLinecap="round" />
            </g>
          ))}
        </g>
      )
    case 'surprised':
      return (
        <g>
          {[x1, x2].map((x) => (
            <g key={x}>
              <circle cx={x} cy={y} r="8" fill="#fff" stroke={dark} strokeWidth="2.4" />
              <circle cx={x} cy={y} r="3.4" fill={dark} />
            </g>
          ))}
        </g>
      )
    case 'wink':
      return (
        <g>
          <g className="chibi-eye">
            <ellipse cx={x1} cy={y} rx="6.5" ry="8.5" fill={dark} />
            <circle cx={x1 + 2.2} cy={y - 3.2} r="2.6" fill="#fff" />
          </g>
          <path d={`M${x2 - 7} ${y} Q${x2} ${y - 6} ${x2 + 7} ${y}`} stroke={dark} strokeWidth="3.2" fill="none" strokeLinecap="round" />
        </g>
      )
    default: // happy, pout, dramatic
      return (
        <g className="chibi-eye">
          {[x1, x2].map((x) => (
            <g key={x}>
              <ellipse cx={x} cy={y} rx="6.5" ry="8.5" fill={dark} />
              <circle cx={x + 2.2} cy={y - 3.2} r="2.6" fill="#fff" />
              <circle cx={x - 2} cy={y + 3} r="1.2" fill="#fff" opacity=".8" />
            </g>
          ))}
        </g>
      )
  }
}

function Mouth({ mood, y = 86 }) {
  const c = '#7a2338'
  switch (mood) {
    case 'laugh':
      return <path d={`M52 ${y - 2} Q60 ${y + 11} 68 ${y - 2} Z`} fill={c} />
    case 'surprised':
      return <ellipse cx="60" cy={y + 1} rx="4" ry="5" fill={c} />
    case 'pout':
      return (
        <path d={`M57 ${y - 2} q4 2 0 4 q4 2 0 4`} stroke={c} strokeWidth="2.4" fill="none" strokeLinecap="round" />
      )
    case 'annoyed':
      return <path d={`M54 ${y + 2} Q60 ${y - 2} 66 ${y + 2}`} stroke={c} strokeWidth="2.6" fill="none" strokeLinecap="round" />
    case 'sleepy':
      return <ellipse cx="60" cy={y + 1} rx="2.6" ry="2" fill={c} />
    case 'dramatic':
      return <path d={`M53 ${y + 4} Q60 ${y - 5} 67 ${y + 4} Z`} fill={c} />
    default:
      return <path d={`M53 ${y - 1} Q60 ${y + 7} 67 ${y - 1}`} stroke={c} strokeWidth="2.8" fill="none" strokeLinecap="round" />
  }
}

function Extras({ mood }) {
  if (mood === 'sleepy')
    return (
      <g className="chibi-zzz" fill="#cfd8ff" fontFamily="Fredoka, sans-serif" fontWeight="700">
        <text x="94" y="30" fontSize="14">z</text>
        <text x="103" y="18" fontSize="11">z</text>
      </g>
    )
  if (mood === 'annoyed' || mood === 'pout')
    return <path d="M94 34 l6 -6 m-6 0 l6 6 M90 30 h4" stroke="#ff4d6d" strokeWidth="2.6" strokeLinecap="round" />
  if (mood === 'love')
    return <text x="92" y="30" fontSize="16">💕</text>
  if (mood === 'dramatic')
    return <path d="M30 66 q-2 8 0 12" stroke="#7fd3ff" strokeWidth="3" fill="none" strokeLinecap="round" />
  return null
}

function Helmet({ color }) {
  return (
    <g>
      <path d="M12 86 Q8 16 60 14 Q112 16 108 86 L98 86 Q98 52 60 50 Q22 52 22 86 Z" fill={color} />
      <path d="M26 36 Q60 14 94 36" stroke="#fff" strokeOpacity=".4" strokeWidth="4" fill="none" strokeLinecap="round" />
      <path d="M24 52 Q60 40 96 52" stroke="#0b1130" strokeOpacity=".5" strokeWidth="6" fill="none" strokeLinecap="round" />
    </g>
  )
}

/**
 * <Chibi who="gubbi" mood="happy" hero />
 * who:  'childu' | 'gubbi'
 * mood: happy | laugh | love | pout | annoyed | surprised | sleepy | wink | dramatic
 * hero: superhero outfit (Catwoman-ish for Childu, bat + web for Gubbi)
 */
export default function Chibi({ who = 'gubbi', mood = 'happy', hero = false, helmet = false, className = '', title, style }) {
  const isG = who === 'gubbi'
  const skin = SKIN[who]
  const hair = HAIR[who]
  const suit = isG ? (hero ? '#141b3d' : '#2a3f8f') : hero ? '#1d1426' : '#ff8fb8'
  const label = title ?? `${isG ? 'Gubbi' : 'Childu'} chibi, ${mood}`

  return (
    <svg
      viewBox="0 0 120 165"
      className={`chibi chibi-${who} ${className}`}
      style={{ color: skin, ...style }}
      role="img"
      aria-label={label}
    >
      {/* cape / back hair */}
      {isG && hero && <path d="M30 104 Q60 92 90 104 L104 160 Q60 150 16 160 Z" fill="#0a0f26" />}
      {!isG && <path d="M18 64 Q14 112 28 132 L92 132 Q106 112 102 64 Z" fill={hair} />}

      {/* legs */}
      <rect x="44" y="140" width="13" height="20" rx="6" fill={isG ? '#1b2350' : hero ? '#120c18' : '#f7f0ff'} />
      <rect x="63" y="140" width="13" height="20" rx="6" fill={isG ? '#1b2350' : hero ? '#120c18' : '#f7f0ff'} />

      {/* arms (Gubbi: chunkier, those biceps 💪🏻) */}
      <rect x={isG ? 22 : 28} y="106" width={isG ? 18 : 14} height="32" rx={isG ? 9 : 7} fill={suit} transform="rotate(12 30 108)" />
      <rect x={isG ? 80 : 78} y="106" width={isG ? 18 : 14} height="32" rx={isG ? 9 : 7} fill={suit} transform="rotate(-12 90 108)" />
      {isG && hero && (
        <g stroke="#2ea8ff" strokeWidth="1.2" opacity=".85" fill="none">
          <path d="M26 114 l12 4 M25 122 l12 4 M24 130 l11 4" />
          <path d="M94 114 l-12 4 M95 122 l-12 4 M96 130 l-11 4" />
        </g>
      )}
      <circle cx={isG ? 30 : 33} cy="139" r={isG ? 7 : 6} fill={skin} />
      <circle cx={isG ? 90 : 87} cy="139" r={isG ? 7 : 6} fill={skin} />

      {/* body */}
      <rect x="36" y="100" width="48" height="46" rx="18" fill={suit} />
      {isG && hero && (
        <>
          <path d="M36 118 H84" stroke="#e63946" strokeWidth="5" />
          <path
            d="M60 112 c-3 -4 -8 -5 -12 -3 c2 1 3 3 2 5 c3 -1 5 0 6 3 l4 -3 l4 3 c1 -3 3 -4 6 -3 c-1 -2 0 -4 2 -5 c-4 -2 -9 -1 -12 3Z"
            fill="#e63946"
          />
        </>
      )}
      {isG && !hero && <path d="M48 104 L60 116 L72 104" stroke="#e63946" strokeWidth="4" fill="none" strokeLinejoin="round" />}
      {!isG && hero && <path d="M44 112 Q60 124 76 112" stroke="#ff8fb8" strokeWidth="3" fill="none" />}
      {!isG && !hero && <circle cx="60" cy="116" r="4" fill="#fff" opacity=".9" />}

      {/* head */}
      <circle cx="60" cy="64" r="42" fill={skin} />
      {isG && <ellipse cx="18" cy="70" rx="6" ry="8" fill={skin} />}
      {isG && <ellipse cx="102" cy="70" rx="6" ry="8" fill={skin} />}

      {/* hair */}
      {isG ? (
        <g fill={hair}>
          <circle cx="28" cy="46" r="15" />
          <circle cx="40" cy="31" r="17" />
          <circle cx="58" cy="25" r="19" />
          <circle cx="77" cy="29" r="17" />
          <circle cx="92" cy="44" r="14" />
          <path d="M22 52 Q34 40 46 50 Q56 38 66 50 Q78 38 98 52 Q96 32 60 26 Q24 30 22 52Z" />
          <path d="M60 22 q6 -10 14 -8 q-6 2 -6 9z" />
        </g>
      ) : (
        <g fill={hair}>
          <path d="M18 66 Q16 24 60 20 Q104 24 102 66 Q94 44 80 42 Q74 52 60 46 Q46 52 40 42 Q26 44 18 66Z" />
          {hero ? (
            <g fill="#120c18">
              <path d="M30 34 L26 8 L48 26 Z" />
              <path d="M90 34 L94 8 L72 26 Z" />
              <path d="M32 30 L30 16 L42 26 Z" fill="#ff8fb8" />
              <path d="M88 30 L90 16 L78 26 Z" fill="#ff8fb8" />
            </g>
          ) : (
            <g transform="translate(82 26) rotate(18)">
              <ellipse cx="-9" cy="0" rx="10" ry="7" fill="#ff3b5c" />
              <ellipse cx="9" cy="0" rx="10" ry="7" fill="#ff3b5c" />
              <circle cx="0" cy="0" r="4.5" fill="#ffd166" />
            </g>
          )}
        </g>
      )}

      {helmet && <Helmet color={isG ? '#e63946' : '#ff8fb8'} />}

      {/* face */}
      <Eyes mood={mood} />
      <ellipse cx="34" cy="82" rx="7" ry="4.2" fill="#ff8fab" opacity={mood === 'pout' ? 0.85 : 0.55} />
      <ellipse cx="86" cy="82" rx="7" ry="4.2" fill="#ff8fab" opacity={mood === 'pout' ? 0.85 : 0.55} />
      {mood === 'pout' && <circle cx="82" cy="84" r="8" fill="#ffb3c6" opacity=".55" />}
      <Mouth mood={mood} />
      <Extras mood={mood} />
    </svg>
  )
}
