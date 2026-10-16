import { Link } from 'react-router-dom'
import { Home, MapPin, Phone, Mail, Apple, Play } from 'lucide-react'
import { COMPANY_PHONE_DISPLAY } from '../utils/whatsapp'

const quickLinks = [
  ['/blog', 'Blog'], ['/about', 'About'], ['/contact', 'Contact'],
]
const legalLinks = [['/privacy-policy', 'Privacy Policy'], ['/terms', 'Terms of Service']]

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div>
            <div className="footer-brand"><span className="brand-mark"><Home size={18} /></span>The Hunt Properties</div>
            <p>Uganda's trusted marketplace for verified land, houses and apartments. Find it. Hunt it. Own it.</p>
            {/* App Launch Promotion Hub — SRS module: "Coming Soon" store badges */}
            <div className="store-badges">
              <a className="store-badge" href="#" onClick={e => e.preventDefault()}><Apple size={20} /><span><small>Coming soon</small><strong>App Store</strong></span></a>
              <a className="store-badge" href="#" onClick={e => e.preventDefault()}><Play size={20} /><span><small>Coming soon</small><strong>Google Play</strong></span></a>
            </div>
          </div>
          <div>
            <h4>Quick Links</h4>
            <ul className="footer-links">
              {quickLinks.map(([to, label]) => <li key={to}><Link to={to}>{label}</Link></li>)}
            </ul>
          </div>
          <div>
            <h4>Legal</h4>
            <ul className="footer-links">
              {legalLinks.map(([to, label]) => <li key={to}><Link to={to}>{label}</Link></li>)}
            </ul>
          </div>
          <div>
            <h4>Contact</h4>
            <ul className="footer-links">
              <li><MapPin size={14} /> Plot 12, Kampala Road, Kampala</li>
              <li><Phone size={14} /> {COMPANY_PHONE_DISPLAY}</li>
              <li><Mail size={14} /> info@thehuntproperties.com</li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} The Hunt Properties Limited. All rights reserved.</span>
          <Link to="/admin">Admin Panel</Link>
        </div>
      </div>
    </footer>
  )
}