import { useState } from 'react'
import { MapPin, Phone, Mail, MessageCircle, Send, CheckCircle2 } from 'lucide-react'
import { useListings } from '../context/ListingsContext'
import { waLink, COMPANY_PHONE_DISPLAY } from '../utils/whatsapp'

export default function Contact() {
  const { addLead } = useListings()
  const [form, setForm] = useState({ name: '', email: '', phone: '', subject: 'Buying a property', message: '' })
  const [sent, setSent] = useState(false)
  const set = k => e => setForm(f => ({ ...f, [k]: e.target.value }))
  const submit = e => { e.preventDefault(); addLead({ ...form, source: 'Contact page' }); setSent(true) }

  return (
    <>
      <div className="page-head"><div className="container">
        <h1>Contact Us</h1>
        <p>Talk to our team about buying, renting or listing a property.</p>
      </div></div>
      <section className="section"><div className="container detail-layout">
        <div className="card">
          {sent ? (
            <div className="success-panel">
              <div className="icon"><CheckCircle2 size={34} /></div>
              <h2>Message received!</h2>
              <p className="section-sub" style={{ marginBottom: 18 }}>Our team will get back to you shortly. For a faster response, reach us on WhatsApp.</p>
              <a className="btn btn-primary" href={waLink('Hello, I just sent a message through the website.')} target="_blank" rel="noreferrer">
                <MessageCircle size={16} /> Chat on WhatsApp
              </a>
            </div>
          ) : (
            <form onSubmit={submit}>
              <h3 style={{ marginBottom: 18 }}>Send us a message</h3>
              <div className="form-grid">
                <div className="field"><label>Your name *</label><input required value={form.name} onChange={set('name')} /></div>
                <div className="field"><label>Phone *</label><input required value={form.phone} onChange={set('phone')} /></div>
                <div className="field full"><label>Email</label><input type="email" value={form.email} onChange={set('email')} /></div>
                <div className="field full"><label>I'm interested in</label>
                  <select value={form.subject} onChange={set('subject')}>
                    <option>Buying a property</option><option>Renting a property</option>
                    <option>Listing my property</option><option>Partnership / other</option>
                  </select>
                </div>
                <div className="field full"><label>Message *</label><textarea required value={form.message} onChange={set('message')} /></div>
              </div>
              <button className="btn btn-primary btn-lg" style={{ marginTop: 18 }} type="submit"><Send size={16} /> Send Message</button>
            </form>
          )}
        </div>
        <aside>
          <div className="card">
            <h3>Reach us directly</h3>
            <p className="prop-loc" style={{ marginTop: 12 }}><MapPin size={16} /> Plot 12, Kampala Road, Kampala, Uganda</p>
            <p className="prop-loc"><Phone size={16} /> {COMPANY_PHONE_DISPLAY}</p>
            <p className="prop-loc"><Mail size={16} /> huntpropertiessales@gmail.com</p>
            <a className="btn btn-primary" style={{ marginTop: 18, justifyContent: 'center' }} href={waLink('Hello The Hunt Properties, I have an enquiry.')} target="_blank" rel="noreferrer">
              <MessageCircle size={16} /> WhatsApp Us
            </a>
          </div>
          <div className="card" style={{ marginTop: 20 }}>
            <h3>Office hours</h3>
            <p className="section-sub" style={{ marginTop: 8 }}>
              Monday – Friday: 8:00 AM – 6:00 PM<br />Saturday: 9:00 AM – 2:00 PM<br />Sunday: Closed
            </p>
          </div>
        </aside>
      </div></section>
    </>
  )
}