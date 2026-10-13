import { Link } from 'react-router-dom'
import { BedDouble, Bath, Ruler, MapPin, MessageCircle } from 'lucide-react'
import { formatUGX, waLink } from '../utils/whatsapp'

export default function PropertyCard({ property }) {
  const img = property.images?.[0]
  return (
    <article className="prop-card">
      <Link to={`/property/${property.id}`} className="prop-img-wrap">
        {img ? <img src={img} alt={property.title} loading="lazy" /> : <div className="img-placeholder">No photo yet</div>}
        <span className={`badge ${property.dealType === 'Rent' ? 'badge-rent' : 'badge-buy'}`}>
          For {property.dealType === 'Rent' ? 'Rent' : 'Sale'}
        </span>
        <span className="badge badge-cat">{property.category}</span>
      </Link>
      <div className="prop-body">
        <p className="prop-price">
          {formatUGX(property.price)}{property.period === 'month' && <small> /month</small>}
        </p>
        <h3><Link to={`/property/${property.id}`}>{property.title}</Link></h3>
        <p className="prop-loc"><MapPin size={14} /> {property.location}, {property.district}</p>
        <div className="prop-meta">
          {property.beds ? <span><BedDouble size={14} /> {property.beds} Beds</span> : null}
          {property.baths ? <span><Bath size={14} /> {property.baths} Baths</span> : null}
          {property.sizeLabel ? <span><Ruler size={14} /> {property.sizeLabel}</span> : null}
        </div>
        <div className="prop-actions">
          <Link className="btn btn-primary btn-sm" to={`/property/${property.id}`}>View Details</Link>
          <a
            className="btn btn-whatsapp btn-sm"
            href={waLink(`Hello, I'm interested in "${property.title}" (${formatUGX(property.price)}). Is it still available?`)}
            target="_blank" rel="noreferrer"
          ><MessageCircle size={15} /> WhatsApp</a>
        </div>
      </div>
    </article>
  )
}