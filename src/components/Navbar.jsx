import { useState } from 'react'
import { NavLink, Link } from 'react-router-dom'
import { Menu, X } from 'lucide-react'

// House + magnifying-glass logo (like the reference)
function Logo({ size = 34 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="#16a34a"
      strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M3.5 10.5 12 3.5l8.5 7" />
      <path d="M5.5 9.5V20h13V9.5" />
      <circle cx="11.5" cy="13.5" r="3.1" />
      <path d="m13.9 15.9 2.9 2.9" />
    </svg>
  )
}

const links = [
  { to: '/', label: 'Home' },
  { to: '/properties', label: 'Listings' },
  { to: '/contact', label: 'Contact' },   // routes owners to the team (admin publishes)
  { to: '/about', label: 'About Us' },
  { to: '/blog', label: 'Partners' },           // swap to a dedicated Partners page later if you build one
]

export default function Navbar() {
  const [open, setOpen] = useState(false)
  return (
    <header className="navbar">
      <div className="container nav-inner">
        <Link to="/" className="brand" onClick={() => setOpen(false)}>
          <span className="brand-logo"><Logo /></span>
          <span style={{ lineHeight: 1.15 }}>
            The Hunt<br />
            <small style={{ fontSize: '.66rem', fontWeight: 600, letterSpacing: '.04em', color: 'var(--g800)' }}>
              PROPERTIES LIMITED
            </small>
          </span>
        </Link>
        <nav className={`nav-links ${open ? 'open' : ''}`}>
          {links.map(l => (
            <NavLink key={l.label} to={l.to} end={l.to === '/'} onClick={() => setOpen(false)}>
              {l.label}
            </NavLink>
          ))}
          <Link to="/contact" className="nav-post" onClick={() => setOpen(false)}>Post a Property</Link>
        </nav>
        <button className="nav-toggle" onClick={() => setOpen(!open)} aria-label="Toggle menu">
          {open ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>
    </header>
  )
}