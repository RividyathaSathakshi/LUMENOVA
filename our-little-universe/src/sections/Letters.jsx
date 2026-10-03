import { useState } from 'react'
import { LETTERS } from '../data/config.js'
import Section from '../components/Section.jsx'
import Modal from '../components/Modal.jsx'
import { load, save } from '../hooks/storage.js'

export default function Letters() {
  const [openId, setOpenId] = useState(null)
  const [read, setRead] = useState(() => new Set(load('letters', [])))
  const letter = LETTERS.find((l) => l.id === openId)
  const idx = LETTERS.findIndex((l) => l.id === openId)

  const open = (id) => {
    setOpenId(id)
    setRead((r) => {
      const n = new Set(r).add(id)
      save('letters', [...n])
      return n
    })
  }

  return (
    <Section id="letters" kicker="Chapter 10" title="Open when…" subtitle={`Eleven letters for eleven kinds of days. ${read.size}/${LETTERS.length} opened.`}>
      <ul className="envelope-wall">
        {LETTERS.map((l, i) => (
          <li key={l.id} style={{ '--i': i }}>
            <button type="button" className={`envelope env-${l.color} ${read.has(l.id) ? 'read' : ''}`} onClick={() => open(l.id)}>
              <span className="env-flap" aria-hidden="true" />
              <span className="env-seal" aria-hidden="true">{l.seal}</span>
              <span className="env-title">{l.title}</span>
              {read.has(l.id) && <span className="env-read">opened ✓</span>}
            </button>
          </li>
        ))}
      </ul>

      <Modal open={!!letter} onClose={() => setOpenId(null)} labelledBy="letter-title" className="letter-modal">
        {letter && (
          <article className={`letter paper-${letter.color}`} key={letter.id}>
            <p className="letter-seal" aria-hidden="true">{letter.seal}</p>
            <h3 id="letter-title" className="letter-title">{letter.title}</h3>
            {letter.body.map((p, i) => (
              <p key={i} className="letter-p">{p}</p>
            ))}
            <div className="letter-nav">
              <button type="button" className="btn btn-ghost sm" onClick={() => open(LETTERS[(idx - 1 + LETTERS.length) % LETTERS.length].id)}>‹ Previous letter</button>
              <button type="button" className="btn btn-ghost sm" onClick={() => open(LETTERS[(idx + 1) % LETTERS.length].id)}>Next letter ›</button>
            </div>
          </article>
        )}
      </Modal>
    </Section>
  )
}
