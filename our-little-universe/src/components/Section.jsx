import { useInView } from '../hooks/useInView.js'
import { EasterEgg } from './EasterEggs.jsx'

/** Chapter wrapper: anchor id, scroll-reveal class, optional heading + Easter egg. */
export default function Section({ id, kicker, title, subtitle, className = '', children }) {
  const [ref, inView] = useInView({ threshold: 0.08 })
  return (
    <section id={id} ref={ref} data-section={id} className={`chapter ${inView ? 'in' : ''} ${className}`} aria-labelledby={title ? `${id}-title` : undefined}>
      <EasterEgg section={id} />
      <div className="chapter-inner">
        {(kicker || title) && (
          <header className="chapter-head">
            {kicker && <p className="kicker reveal">{kicker}</p>}
            {title && <h2 id={`${id}-title`} className="chapter-title reveal">{title}</h2>}
            {subtitle && <p className="chapter-sub reveal">{subtitle}</p>}
          </header>
        )}
        {children}
      </div>
    </section>
  )
}
