import { Link } from 'react-router-dom'
import { ShieldCheck, Target, Eye, Users } from 'lucide-react'
import AppPromo from '../components/AppPromo'

const values = [
  { icon: <ShieldCheck size={22} />, title: 'Integrity', text: 'Every listing is verified against ownership documents before publication.' },
  { icon: <Users size={22} />, title: 'Client First', text: 'Direct WhatsApp access to owners and agents — no hidden middlemen.' },
  { icon: <Target size={22} />, title: 'Precision', text: 'Smart filters help you find the right property in minutes, not weeks.' },
]

export default function About() {
  return (
    <>
      <div className="page-head"><div className="container">
        <h1>About The Hunt Properties Limited</h1>
        <p>Uganda's trusted property marketplace for land, residential and commercial real estate.</p>
      </div></div>
      <section className="section"><div className="container">
        <div className="grid grid-2" style={{ alignItems: 'center' }}>
          <div>
            <span className="eyebrow">Our Story</span>
            <h2 className="section-title">Hunting for property should be exciting — not exhausting</h2>
            <p className="section-sub">The Hunt Properties Limited was founded to solve a simple problem: finding genuine property in Uganda is hard. Scattered listings, unverified owners and endless broker calls waste time and money. We built a single platform where buyers and tenants discover verified land, houses and apartments — and where owners get serious leads through WhatsApp and our web forms.</p>
          </div>
          <div className="card" style={{ background: 'var(--g900)' }}>
            <div className="why-icon" style={{ background: 'rgba(255,255,255,.12)', color: 'var(--white)' }}><Eye size={24} /></div>
            <h3 style={{ color: 'var(--white)' }}>Our Vision</h3>
            <p style={{ color: 'var(--g100)', fontSize: '.92rem' }}>To become East Africa's most trusted digital real estate ecosystem — from search to ownership.</p>
            <hr style={{ border: 'none', borderTop: '1px solid rgba(255,255,255,.15)', margin: '18px 0' }} />
            <h3 style={{ color: 'var(--white)' }}>Our Mission</h3>
            <p style={{ color: 'var(--g100)', fontSize: '.92rem' }}>Connect every buyer and tenant with a genuine property through verified listings, transparent pricing and instant communication.</p>
          </div>
        </div>
        <div className="grid grid-3" style={{ marginTop: 50 }}>
          {values.map(v => (
            <div className="card why-card" key={v.title}>
              <div className="why-icon">{v.icon}</div><h3>{v.title}</h3><p>{v.text}</p>
            </div>
          ))}
        </div>
        <div className="cta-band" style={{ marginTop: 50 }}>
          <div><h2>Join The Hunt today</h2><p>Thousands of verified listings across Uganda are waiting.</p></div>
          <Link to="/properties" className="btn btn-light btn-lg">Start Hunting</Link>
        </div>
      </div></section>
      <AppPromo />
    </>
  )
}