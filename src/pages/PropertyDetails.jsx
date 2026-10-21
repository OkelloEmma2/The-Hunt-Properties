import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { MapPin, ChevronLeft, ChevronRight, MessageCircle, Phone, Clock, Hourglass } from 'lucide-react'
import { useListings } from '../context/ListingsContext'
import PropertyCard from '../components/PropertyCard'
import { formatUGX, waLink, COMPANY_PHONE_DISPLAY } from '../utils/whatsapp'


function Gallery({ images, title }) {
  const [i, setI] = useState(0)
  const imgs = images?.length ? images : [null]
  const go = d => setI(p => (p + d + imgs.length) % imgs.length)
  return (
    <div className="gallery">
      <div className="gal-main">
        {imgs[i] ? <img src={imgs[i]} alt={title} /> : <div className="img-placeholder">No photo available</div>}
        {imgs.length > 1 && (
          <>
            <button className="gal-nav left" onClick={() => go(-1)} aria-label="Previous photo"><ChevronLeft /></button>
            <button className="gal-nav right" onClick={() => go(1)} aria-label="Next photo"><ChevronRight /></button>
            <span className="gal-count">{i + 1} / {imgs.length}</span>
          </>
        )}
      </div>
      {imgs.length > 1 && (
        <div className="gal-thumbs">
          {imgs.map((src, idx) => (
            <img key={idx} src={src} alt="" className={idx === i ? 'active' : ''} onClick={() => setI(idx)} />
          ))}
        </div>
      )}
    </div>
  )
}

export default function PropertyDetails() {
  const { id } = useParams()
  const { listings } = useListings()
  const p = listings.find(l => l.id === id)

  if (!p) return (
    <section className="section"><div className="container notfound">
      <h1>404</h1><h2>Property not found</h2>
      <Link className="btn btn-primary" to="/properties" style={{ marginTop: 16 }}>Browse Properties</Link>
    </div></section>
  )

  if (p.status !== 'approved') return (
    <section className="section"><div className="container">
      <div className="card success-panel">
        <div className="icon"><Hourglass size={30} /></div>
        <h2>This listing is awaiting admin approval</h2>
        <p className="section-sub" style={{ marginBottom: 18 }}>It will appear publicly once our team verifies the details.</p>
        <Link className="btn btn-primary" to="/properties">Browse Properties</Link>
      </div>
    </div></section>
  )

  // Auto-populated WhatsApp message with property details + page link (SRS: float CTA)
  const message = `Hello The Hunt Properties, I am interested in "${p.title}" located in ${p.location} (${formatUGX(p.price)}${p.period === 'month' ? '/month' : ''}). Here is the link: ${window.location.href}`

  const specs = [
    ['Category', p.category],
    ['Status', p.dealType === 'Rent' ? 'For Rent' : 'For Sale'],
    p.beds ? ['Bedrooms', p.beds] : null,
    p.baths ? ['Bathrooms', p.baths] : null,
    ['Size', p.sizeLabel || '—'],
    ['District', p.district],
    ['Listed', new Date(p.datePosted).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })],
  ].filter(Boolean)

  const similar = listings.filter(l => l.status === 'approved' && l.category === p.category && l.id !== p.id).slice(0, 3)
  const bbox = `${p.lng - 0.02},${p.lat - 0.02},${p.lng + 0.02},${p.lat + 0.02}`

  return (
    <section className="section">
      <div className="container">
        <p style={{ marginBottom: 14, fontSize: '.85rem', color: 'var(--muted)' }}>
          <Link to="/">Home</Link> / <Link to="/properties">Properties</Link> / {p.title}
        </p>
        <div className="detail-layout">
          <div>
            <Gallery images={p.images} title={p.title} />
            <div className="detail-info">
              <span className="badge-soon" style={{ background: 'var(--g100)', color: 'var(--g800)' }}>
                {p.category} • For {p.dealType === 'Rent' ? 'Rent' : 'Sale'}
              </span>
              <h1 style={{ fontSize: '1.6rem', margin: '6px 0' }}>{p.title}</h1>
              <p className="prop-loc" style={{ fontSize: '.95rem' }}><MapPin size={16} /> {p.location}, {p.district}, Uganda</p>
              <div className="specs-grid">
                {specs.map(([k, v]) => <div className="spec" key={k}><small>{k}</small><b>{v}</b></div>)}
              </div>
              <h3>About this property</h3>
              <p className="section-sub" style={{ marginTop: 8 }}>{p.description}</p>
              {p.features?.length > 0 && (
                <>
                  <h3 style={{ marginTop: 22 }}>Features &amp; amenities</h3>
                  <ul className="feature-list">{p.features.map(f => <li key={f}>{f}</li>)}</ul>
                </>
              )}
            </div>
          </div>
          <aside className="card agent-card">
            <p className="price">{formatUGX(p.price)}{p.period === 'month' && <small> /month</small>}</p>
            <hr style={{ border: 'none', borderTop: '1px solid var(--line)', margin: '14px 0' }} />
            <p style={{ fontWeight: 700, color: 'var(--g900)' }}>{p.agent || 'The Hunt Properties Team'}</p>
            <p className="section-sub" style={{ fontSize: '.85rem' }}>Verified listing agent</p>
            <p className="prop-loc" style={{ marginTop: 10 }}><Phone size={14} /> {p.agentPhone || COMPANY_PHONE_DISPLAY}</p>
            <div className="agent-actions">
              <a className="btn btn-primary btn-lg" href={waLink(message)} target="_blank" rel="noreferrer">
                <MessageCircle size={18} /> Inquire on WhatsApp
              </a>
              <a className="btn btn-ghost" href={`tel:${(p.agentPhone || '+256766306132').replace(/\s/g, '')}`}>
                <Phone size={16} /> Call Agent
              </a>
            </div>
            <p className="prop-loc" style={{ marginTop: 14 }}><Clock size={14} /> Typically responds within a few hours</p>
          </aside>
        </div>

        {similar.length > 0 && (
          <>
            <div className="section-head" style={{ marginTop: 70 }}>
              <span className="eyebrow">You may also like</span>
              <h2 className="section-title">Similar Properties</h2>
            </div>
            <div className="grid grid-3">{similar.map(s => <PropertyCard key={s.id} property={s} />)}</div>
          </>
        )}
      </div>
    </section>
  )
}