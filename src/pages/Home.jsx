import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  MapPin, Building2, CircleDollarSign, User, Search,
  HousePlus, Home as HomeIcon, Apple, Play,
} from 'lucide-react'
import { useListings } from '../context/ListingsContext'
import PropertyCard from '../components/PropertyCard'
import AdBanner from '../components/AdBanner'
import { waLink } from '../utils/whatsapp'

export default function Home() {
  const { listings } = useListings()
  const navigate = useNavigate()
  const [q, setQ] = useState('')
  const [category, setCategory] = useState('')
  const [price, setPrice] = useState('')
  const [status, setStatus] = useState('Buy')

  const published = listings.filter(l => l.status === 'approved')
  const featured = published.filter(l => l.featured).slice(0, 4)

  // Typing + filters combined → results open on the Properties page
  const search = (e) => {
    e.preventDefault()
    const p = new URLSearchParams()
    if (q) p.set('q', q)
    if (category) p.set('category', category)
    p.set('status', status)
    if (price === 'lt100') p.set('maxPrice', '100000000')
    if (price === 'mid') { p.set('minPrice', '100000000'); p.set('maxPrice', '500000000') }
    if (price === 'gt500') p.set('minPrice', '500000000')
    navigate(`/properties?${p.toString()}`)
  }

  return (
    <>
      {/* ===== HERO ===== */}
      <section className="hero">
        <div className="hero-bg"><img src="/images/hero-house.jpg" alt="Luxury home in Uganda" /></div>
        <div className="container hero-inner">
          <h1>Find Uganda's Perfect Property | Land, Homes, Apartments.</h1>
          <form className="hero-search" onSubmit={search}>
            <div className="hs-field">
              <MapPin size={16} />
              <input value={q} onChange={e => setQ(e.target.value)} placeholder="[TYPE TO SEARCH]: e.g. Kampala, villa" />
            </div>
            <div className="hs-field">
              <Building2 size={16} />
              <select value={category} onChange={e => setCategory(e.target.value)}>
                <option value="">[TYPE: ANY]</option>
                <option>Land</option><option>Residential</option><option>Commercial</option>
              </select>
            </div>
            <div className="hs-field">
              <CircleDollarSign size={16} />
              <select value={price} onChange={e => setPrice(e.target.value)}>
                <option value="">[PRICE: ANY]</option>
                <option value="lt100">Under UGX 100M</option>
                <option value="mid">UGX 100M – 500M</option>
                <option value="gt500">Above UGX 500M</option>
              </select>
            </div>
            <div className="hs-field">
              <User size={16} />
              <select value={status} onChange={e => setStatus(e.target.value)}>
                <option value="Buy">[STATUS: BUY]</option>
                <option value="Rent">[STATUS: RENT]</option>
              </select>
            </div>
            <button className="btn btn-primary" type="submit">
              <Search size={15} /> <span className="btn-label">Search Properties</span>
            </button>
          </form>
        </div>
      </section>

      {/* ===== FEATURED PROPERTIES ===== */}
      <section style={{ padding: '54px 0 34px' }}>
        <div className="container">
          <h2 className="sec-heading">Featured Properties</h2>
          <div className="grid grid-4">
            {featured.map(p => <PropertyCard key={p.id} property={p} />)}
          </div>
        </div>
      </section>

      {/* ===== PROMO BANNERS ===== */}
      <section style={{ paddingBottom: 44 }}>
        <div className="container promo-grid">

          <div className="promo-banner">
            <span className="deco-stripes" style={{ left: -22, bottom: -22 }} />
            <div className="promo-art"><HousePlus size={52} /></div>
            <div>
              <h3>List Your Property With Us!</h3>
              <p>Send us your property details — our team verifies ownership and publishes it to thousands of buyers.</p>
              <a className="promo-btn" href={waLink('Hello The Hunt Properties, I would like to list my property for sale/rent.')} target="_blank" rel="noreferrer">
                Submit Listing Now
              </a>
            </div>
          </div>

          <div className="promo-banner">
            <span className="deco-stripes" style={{ right: -22, top: -22 }} />
            <span className="deco-dots" style={{ right: 46, bottom: 6 }} />
            <div className="phone"><HomeIcon size={36} /></div>
            <div>
              <h3>The House Hunt App</h3>
              <p>Geo-location discovery, map exploration and saved alerts — coming soon to your phone.</p>
              <div className="store-badges">
                <a className="store-badge" href="#" onClick={e => e.preventDefault()}><Apple size={20} /><span><small>Coming soon on</small><strong>App Store</strong></span></a>
                <a className="store-badge" href="#" onClick={e => e.preventDefault()}><Play size={20} /><span><small>Get it soon on</small><strong>Google Play</strong></span></a>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* ===== ADSENSE SLOT (required by SRS) ===== */}
      <div className="container" style={{ paddingBottom: 20 }}><AdBanner /></div>
    </>
  )
}