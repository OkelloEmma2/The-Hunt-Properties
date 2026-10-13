import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ShieldCheck, MessageCircle, FileText, ArrowRight, Search } from 'lucide-react'
import { useListings } from '../context/ListingsContext'
import PropertyCard from '../components/PropertyCard'
import AppPromo from '../components/AppPromo'
import AdBanner from '../components/Adbanner'
import { DISTRICTS } from '../data/properties'
import AnimatedStat from '../components/AnimatedStat'

export default function Home() {
  const { listings } = useListings()
  const navigate = useNavigate()
  const [status, setStatus] = useState('Buy')
  const [location, setLocation] = useState('')
  const [category, setCategory] = useState('')

  const featured = listings.filter(l => l.status === 'approved' && l.featured).slice(0, 6)

  const search = (e) => {
    e.preventDefault()
    const p = new URLSearchParams()
    p.set('status', status)
    if (location) p.set('location', location)
    if (category) p.set('category', category)
    navigate(`/properties?${p.toString()}`)
  }

  return (
    <>
      <section className="hero">
        <div className="container">
          <div className="hero-inner">
            <h1>Find Uganda's Perfect Property | Land, Houses &amp; Apartments</h1>
            <p>The Hunt Properties Limited connects verified buyers and tenants with genuine property owners in Kampala, Wakiso, Entebbe and beyond.</p>
          </div>
          <form className="hero-search" onSubmit={search}>
            <div className="hs-tabs">
              {['Buy', 'Rent'].map(t => (
                <button type="button" key={t} className={`hs-tab ${status === t ? 'active' : ''}`} onClick={() => setStatus(t)}>
                  For {t === 'Buy' ? 'Sale' : 'Rent'}
                </button>
              ))}
            </div>
            <div className="hs-row">
              <div className="hs-field">
                <select value={location} onChange={e => setLocation(e.target.value)}>
                  <option value="">Any location</option>
                  {DISTRICTS.map(d => <option key={d}>{d}</option>)}
                </select>
              </div>
              <div className="hs-field">
                <select value={category} onChange={e => setCategory(e.target.value)}>
                  <option value="">Any category</option>
                  <option>Land</option><option>Residential</option><option>Commercial</option>
                </select>
              </div>
              <button className="btn btn-primary" type="submit"><Search size={17} /> Search Properties</button>
            </div>
          </form>
<div className="hero-stats">
  <AnimatedStat value={listings.filter(l => l.status === 'approved').length} suffix="+" label="Active listings" />
  <AnimatedStat value={5} suffix="+" label="Districts covered" />
  <AnimatedStat value={100} suffix="%" label="Verified ownership checks" />
</div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-head">
            <span className="eyebrow">Featured Listings</span>
            <h2 className="section-title">Handpicked Properties For You</h2>
            <p className="section-sub">Freshly verified homes, plots and commercial spaces ready for viewing.</p>
          </div>
          <div className="grid grid-3">
            {featured.map(p => <PropertyCard key={p.id} property={p} />)}
          </div>
          <div style={{ textAlign: 'center', marginTop: 34 }}>
            <Link className="btn btn-ghost btn-lg" to="/properties">Browse All Properties <ArrowRight size={17} /></Link>
          </div>
        </div>
      </section>

      <section className="section section-alt">
        <div className="container">
          <div className="section-head center">
            <span className="eyebrow">Why The Hunt</span>
            <h2 className="section-title">Property Hunting, Made Simple</h2>
          </div>
          <div className="grid grid-3">
            <div className="card why-card"><div className="why-icon"><ShieldCheck size={24} /></div><h3>Verified Listings Only</h3><p>Every property passes through our admin verification review before it appears on the platform.</p></div>
            <div className="card why-card"><div className="why-icon"><MessageCircle size={24} /></div><h3>Direct WhatsApp Leads</h3><p>One tap sends your inquiry straight to the owner or our agents on WhatsApp — no middlemen.</p></div>
            <div className="card why-card"><div className="why-icon"><FileText size={24} /></div><h3>List Your Property Free</h3><p>Owners and agents submit details, photos and title documents in minutes through our portal.</p></div>
          </div>
        </div>
      </section>

      <section className="section"><div className="container"><AdBanner /></div></section>

      <AppPromo />

      <section className="section">
        <div className="container">
          <div className="cta-band">
            <div><h2>Own property? Let thousands of buyers find it.</h2><p>Submit your listing today — approval within 24 hours.</p></div>
            <Link to="/list-your-property" className="btn btn-light btn-lg">Submit Your Listing <ArrowRight size={17} /></Link>
          </div>
        </div>
      </section>
    </>
  )
}