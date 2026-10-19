import { MapPin, Building2 } from 'lucide-react'
import StoreBadges from '../components/StoreBadges'

const apps = [
  {
    icon: <MapPin size={28} />, name: 'House Hunt App',
    desc: 'A dedicated mobile app for geo-location property discovery, interactive map exploration and saved search alerts.',
  },
  {
    icon: <Building2 size={28} />, name: 'House Portal',
    desc: 'The next-generation management platform for automated rent collection, digital invoicing and tenant–landlord communication.',
  },
]

export default function AppPromo() {
  return (
    <section className="section section-alt">
      <div className="container">
        <div className="section-head center">
          <span className="eyebrow">Our Mobile Ecosystem</span>
          <h2 className="section-title">Two Powerful Apps On The Way</h2>
          <p className="section-sub">We are transitioning The Hunt experience from your browser to your pocket.</p>
        </div>
        <div className="grid grid-2">
          {apps.map(a => (
            <div className="card app-card" key={a.name}>
              <div className="app-icon">{a.icon}</div>
              <div>
                <span className="badge-soon">Coming Soon</span>
                <h3>{a.name}</h3>
                <p className="section-sub" style={{ fontSize: '.9rem' }}>{a.desc}</p>
                <StoreBadges />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}