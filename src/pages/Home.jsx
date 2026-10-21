import { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  MapPin, Building2, User, Search, X, SearchX, ArrowRight,
  HousePlus, Home as HomeIcon,
} from 'lucide-react'
import { useListings } from '../context/ListingsContext'
import PropertyCard from '../components/PropertyCard'
import AdBanner from '../components/AdBanner'
import { waLink } from '../utils/whatsapp'
import StoreBadges from '../components/StoreBadges'

export default function Home() {
  const { listings } = useListings()
  const [q, setQ] = useState('')
  const [category, setCategory] = useState('')
  const [status, setStatus] = useState('Buy')
  const [searched, setSearched] = useState(false)
  const [results, setResults] = useState([])

  const published = listings.filter(l => l.status === 'approved')
  const featured = published.filter(l => l.featured).slice(0, 4)

  const search = (e) => {
    e.preventDefault()
    const query = q.trim().toLowerCase()
    const found = published.filter(l =>
      (!query || `${l.title} ${l.location} ${l.district} ${l.description}`.toLowerCase().includes(query))
      && (!category || l.category === category)
      && l.dealType === status
    )
    setResults(found)
    setSearched(true)
    document.getElementById('home-results')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  const clearSearch = () => {
    setSearched(false)
    setResults([])
    setQ(''); setCategory(''); setStatus('Buy')
    window.scrollTo({ top: 0, behavior: 'smooth' })
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
              <input value={q} onChange={e => setQ(e.target.value)} placeholder="What do you want to find?" />
            </div>
            <div className="hs-field">
              <Building2 size={16} />
              <select value={category} onChange={e => setCategory(e.target.value)}>
                <option value="">TYPE: Any</option>
                <option>Apartment</option><option>Villa</option><option>Land</option><option>Commercial</option><option>Standalone</option><option>Studio Rooms</option><option>AirBnB</option><option>Residentials</option><option>Double Rooms</option><option>Farms</option><option>Warehouses</option><option>Hotels</option><option>Hostels</option><option>Guest Houses</option><option>Mansions</option><option>Townhouses</option><option>Cottages</option><option>Bungalows</option><option>Duplexes</option><option>Triplexes</option>
              </select>
            </div>
            <div className="hs-field">
              <User size={16} />
              <select value={status} onChange={e => setStatus(e.target.value)}>
                <option value="Buy">STATUS: Buy</option>
                <option value="Rent">STATUS: Rent</option>
                <option value="Lease">STATUS: Lease</option>
              </select>
            </div>
            <button className="btn btn-primary" type="submit">
              <Search size={15} /> <span className="btn-label">Search Properties</span>
            </button>
          </form>
        </div>
      </section>

      {/* ===== RESULTS / FEATURED — same section, swaps based on search state ===== */}
      <section id="home-results" style={{ padding: '54px 0 34px' }}>
        <div className="container">
          {searched ? (
            <>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12, marginBottom: 22 }}>
                <h2 className="sec-heading" style={{ marginBottom: 0 }}>
                  Search Results ({results.length})
                </h2>
                <button className="btn btn-ghost btn-sm" onClick={clearSearch}>
                  <X size={14} /> Clear Search
                </button>
              </div>
              {results.length === 0 ? (
                <div className="card empty-state">
                  <SearchX size={40} />
                  <h3>No properties match your criteria</h3>
                  <p className="section-sub">Try a different area, or let our agents hunt for you.</p>
                  <a className="btn btn-primary" target="_blank" rel="noreferrer"
                    href={waLink(`Hello, I'm looking for a property (${category || 'any type'}) in "${q || 'Uganda'}" to ${status === 'Rent' ? 'rent' : 'buy'}. Can you help?`)}>
                    Ask an Agent on WhatsApp
                  </a>
                </div>
              ) : (
                <div className="grid grid-4">
                  {results.map(p => <PropertyCard key={p.id} property={p} />)}
                </div>
              )}
              <div style={{ textAlign: 'right', marginTop: 20 }}>
                <Link className="section-link" to="/properties">
                  Browse all listings with more filters <ArrowRight size={15} />
                </Link>
              </div>
            </>
          ) : (
            <>
              <h2 className="sec-heading">Featured Properties</h2>
              <div className="grid grid-4">
                {featured.map(p => <PropertyCard key={p.id} property={p} />)}
              </div>
            </>
          )}
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
              <StoreBadges />
            </div>
          </div>

        </div>
      </section>

      {/* ===== ADSENSE SLOT (required by SRS) ===== */}
      <div className="container" style={{ paddingBottom: 20 }}><AdBanner /></div>
    </>
  )
}