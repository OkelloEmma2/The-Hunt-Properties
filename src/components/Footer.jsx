import { Link } from 'react-router-dom'
import { Facebook, Instagram, Youtube, MessageCircle, MapPin, Phone, Mail } from 'lucide-react'
import { waLink, COMPANY_PHONE_DISPLAY } from '../utils/whatsapp'

const quickLinks = [['/', 'Home'], ['/properties', 'Listings'], ['/about', 'About Us'], ['/blog', 'Blog']]
const legalLinks = [['/privacy-policy', 'Privacy Policy'], ['/terms', 'Terms of Service'], ['/contact', 'Contact']]
const partnerLinks = [['/contact', 'Become a Partner'], ['/contact', 'Agent Program'], ['/contact', 'Advertise With Us']]

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div>
            <h4>Quick Links</h4>
            <ul className="footer-links">
              {quickLinks.map(([to, label]) => <li key={label}><Link to={to}>{label}</Link></li>)}
            </ul>
          </div>
          <div>
            <h4>Legal Pages</h4>
            <p style={{ fontSize: '.76rem', marginBottom: 10 }}>(AdSense Ready)</p>
            <ul className="footer-links">
              {legalLinks.map(([to, label]) => <li key={label}><Link to={to}>{label}</Link></li>)}
            </ul>
          </div>
          <div>
            <h4>Partner Pitch Portal</h4>
            <ul className="footer-links">
              {partnerLinks.map(([to, label]) => <li key={label}><Link to={to}>{label}</Link></li>)}
            </ul>
          </div>
          <div>
            <h4>Connect With Us</h4>
            <div className="social-row">
              <a className="social-circle" href="#" aria-label="Facebook" onClick={e => e.preventDefault()}><Facebook size={17} /></a>
              <a className="social-circle" href="#" aria-label="Instagram" onClick={e => e.preventDefault()}><Instagram size={17} /></a>
              <a className="social-circle" href="#" aria-label="YouTube" onClick={e => e.preventDefault()}><Youtube size={17} /></a>
              <a className="social-circle" href={waLink('Hello The Hunt Properties!')} target="_blank" rel="noreferrer" aria-label="WhatsApp"><MessageCircle size={17} /></a>
            </div>
            <ul className="footer-links" style={{ marginTop: 16 }}>
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