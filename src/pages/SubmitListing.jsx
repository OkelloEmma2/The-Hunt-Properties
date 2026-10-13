import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Upload, CheckCircle2 } from 'lucide-react'
import { useListings } from '../context/ListingsContext'
import { DISTRICTS } from '../data/properties'
import { waLink } from '../utils/whatsapp'

const CATEGORIES = ['Land', 'Residential', 'Commercial']
const initial = {
  ownerName: '', ownerPhone: '', ownerEmail: '', title: '', category: 'Residential',
  dealType: 'Buy', location: '', district: 'Kampala', price: '', beds: '', baths: '',
  sizeLabel: '', description: '',
}

// SRS module: Owner Listing Submission — owner contact, specs, pricing,
// photo attachments and title deed/verification document upload.
export default function SubmitListing() {
  const { addListing } = useListings()
  const [form, setForm] = useState(initial)
  const [photos, setPhotos] = useState([])
  const [deedName, setDeedName] = useState('')
  const [done, setDone] = useState(false)
  const set = k => e => setForm(f => ({ ...f, [k]: e.target.value }))

  const handlePhotos = (e) => {
    Array.from(e.target.files).slice(0, 4).forEach(file => {
      if (file.size > 1024 * 1024) { alert(`${file.name} is larger than 1MB — please compress it first.`); return }
      const reader = new FileReader()
      reader.onload = () => setPhotos(prev => (prev.length < 4 ? [...prev, { name: file.name, data: reader.result }] : prev))
      reader.readAsDataURL(file)
    })
    e.target.value = ''
  }

  const submit = (e) => {
    e.preventDefault()
    addListing({
      ...form,
      price: Number(form.price),
      period: form.dealType === 'Rent' ? 'month' : 'total',
      beds: form.beds || null,
      baths: form.baths || null,
      images: photos.map(ph => ph.data),
      deedName,                 // demo: filename only — a real backend should store the file securely
      status: 'pending',        // goes straight to the Admin Approval Panel
      featured: false,
      agent: form.ownerName,
      agentPhone: form.ownerPhone,
      datePosted: new Date().toISOString(),
    })
    setDone(true)
    window.scrollTo({ top: 0 })
  }

  if (done) return (
    <section className="section"><div className="container">
      <div className="card success-panel">
        <div className="icon"><CheckCircle2 size={34} /></div>
        <h2>Listing submitted successfully!</h2>
        <p className="section-sub" style={{ maxWidth: 480, margin: '10px auto 22px' }}>
          Our team will review your property details and documents. You will be contacted on {form.ownerPhone} once it is approved and published.
        </p>
        <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link to="/" className="btn btn-primary">Back to Home</Link>
          <a className="btn btn-whatsapp" href={waLink('Hello, I just submitted a property listing and would like to follow up.')} target="_blank" rel="noreferrer">Follow up on WhatsApp</a>
        </div>
      </div>
    </div></section>
  )

  return (
    <>
      <div className="page-head"><div className="container">
        <h1>List Your Property</h1>
        <p>Submit your house, land or commercial property. Our team reviews every submission before it goes live.</p>
      </div></div>
      <section className="section"><div className="container" style={{ maxWidth: 860 }}>
        <form className="card" onSubmit={submit}>
          <h3 style={{ marginBottom: 18 }}>Owner / Agent details</h3>
          <div className="form-grid">
            <div className="field"><label>Full name *</label><input required value={form.ownerName} onChange={set('ownerName')} /></div>
            <div className="field"><label>Phone (WhatsApp) *</label><input required value={form.ownerPhone} onChange={set('ownerPhone')} placeholder="+256 7XX XXX XXX" /></div>
            <div className="field full"><label>Email</label><input type="email" value={form.ownerEmail} onChange={set('ownerEmail')} /></div>
          </div>

          <h3 style={{ margin: '26px 0 18px' }}>Property details</h3>
          <div className="form-grid">
            <div className="field full"><label>Listing title *</label><input required value={form.title} onChange={set('title')} placeholder="e.g. Modern 4-Bedroom Villa in Muyenga" /></div>
            <div className="field"><label>Category *</label>
              <select value={form.category} onChange={set('category')}>{CATEGORIES.map(c => <option key={c}>{c}</option>)}</select>
            </div>
            <div className="field"><label>Status *</label>
              <select value={form.dealType} onChange={set('dealType')}><option>Buy</option><option>Rent</option></select>
            </div>
            <div className="field"><label>Location / neighbourhood *</label><input required value={form.location} onChange={set('location')} placeholder="e.g. Najjera" /></div>
            <div className="field"><label>District *</label>
              <select value={form.district} onChange={set('district')}>{DISTRICTS.map(d => <option key={d}>{d}</option>)}</select>
            </div>
            <div className="field"><label>Price (UGX) *</label><input required type="number" min="0" value={form.price} onChange={set('price')} placeholder="e.g. 85000000" /></div>
            {form.dealType === 'Rent' && (
              <div className="field"><label>Price period</label><select disabled value="month"><option>per month</option></select></div>
            )}
            {form.category === 'Residential' && (
              <>
                <div className="field"><label>Bedrooms</label><input type="number" min="0" value={form.beds} onChange={set('beds')} /></div>
                <div className="field"><label>Bathrooms</label><input type="number" min="0" value={form.baths} onChange={set('baths')} /></div>
              </>
            )}
            <div className="field full"><label>Size / plot description</label><input value={form.sizeLabel} onChange={set('sizeLabel')} placeholder="e.g. 50 decimals, 250 sqm" /></div>
            <div className="field full"><label>Description *</label><textarea required value={form.description} onChange={set('description')} placeholder="Describe the property, access roads, utilities, neighbourhood..." /></div>
            <div className="field full"><label>Property photos (up to 4, max 1MB each)</label>
              <input type="file" accept="image/*" multiple onChange={handlePhotos} />
              {photos.length > 0 && (
                <div className="photos-preview">{photos.map((ph, i) => <img key={i} className="photo-thumb" src={ph.data} alt={ph.name} />)}</div>
              )}
            </div>
            <div className="field full"><label>Title deed / verification document (PDF or image)</label>
              <input type="file" accept=".pdf,image/*" onChange={e => setDeedName(e.target.files[0]?.name || '')} />
              {deedName && <p className="section-sub" style={{ fontSize: '.8rem' }}>Attached: {deedName}</p>}
            </div>
          </div>
          <p className="note" style={{ margin: '18px 0' }}>
            By submitting, you confirm you are the rightful owner or an authorised agent. All listings are verified by The Hunt Properties Limited before publication.
          </p>
          <button className="btn btn-primary btn-lg" type="submit"><Upload size={17} /> Submit for Approval</button>
        </form>
      </div></section>
    </>
  )
}