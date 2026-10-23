import { Link } from 'react-router-dom'
import { MapPin, MessageCircle } from 'lucide-react'
import { waLink, compactPrice } from '../utils/whatsapp'

export default function PropertyCard({ property }) {
  const p = property

  const dealType = String(p.dealType || '').toLowerCase()
  const isRent = dealType === 'rent'
  const priceLine = compactPrice(p.price, p.currency, dealType, p.rentPeriod)

  const img = p.images?.[0]

  return (
    <article className="prop-card">
      <Link to={`/property/${p.id}`} className="prop-img-wrap" title={p.title}>
        {img ? <img src={img} alt={p.title} loading="lazy" /> : <div className="img-placeholder">No photo yet</div>}
        <span className={`badge ${isRent ? 'badge-rent' : 'badge-buy'}`}>FOR {isRent ? 'RENT' : 'SALE'}</span>
      </Link>
      <div className="prop-body">
        <p className="prop-price">{priceLine}</p>
        <p className="prop-loc"><MapPin size={13} /> {p.location}, {p.district}, Uganda</p>
        <h3><Link to={`/property/${p.id}`}>{p.title}</Link></h3>
        <div className="prop-actions">
          <Link className="btn btn-ghost btn-sm" to={`/property/${p.id}`}>View Details</Link>
          <a className="btn btn-ghost btn-sm" target="_blank" rel="noreferrer"
            href={waLink(`Hello, I'm interested in "${p.title}" (${priceLine}). Is it still available?`)}>
            <MessageCircle size={14} /> WhatsApp Inquiry
          </a>
        </div>
      </div>
    </article>
  )
}