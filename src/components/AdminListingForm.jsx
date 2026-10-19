import { useState } from 'react'
import { Save, X } from 'lucide-react'
import { useListings } from '../context/ListingsContext'
import { DISTRICTS } from '../data/properties'

const CATEGORIES = ['Land', 'Residential', 'Commercial', 'Standalone', 'Studio Room', 'AirBnB','Apartments', 'Double Room']
const initial = {
  title: '', category: 'Residential', dealType: 'Buy', location: '', district: 'Kampala',
  price: '', beds: '', baths: '', sizeLabel: '', description: '',
  features: '', agent: '', agentPhone: '', lat: 0.3476, lng: 32.5825, featured: false,
}

export default function AdminListingForm() {
  const { addListing } = useListings()
  const [form, setForm] = useState(initial)
  const [images, setImages] = useState([])
  const [saved, setSaved] = useState(false)
  const set = k => e => setForm(f => ({ ...f, [k]: e.target.value }))

  const handleImages = (e) => {
    Array.from(e.target.files).slice(0, 4).forEach(file => {
      if (file.size > 1024 * 1024) { alert(`${file.name} is larger than 1MB — compress it first.`); return }
      const reader = new FileReader()
      reader.onload = () => setImages(prev => (prev.length < 4 ? [...prev, reader.result] : prev))
      reader.readAsDataURL(file)
    })
    e.target.value = ''
  }
  const removeImage = (i) => setImages(prev => prev.filter((_, idx) => idx !== i))

  const submit = (e) => {
    e.preventDefault()
    addListing({
      ...form,
      price: Number(form.price),
      period: form.dealType === 'Rent' ? 'month' : 'total',
      beds: form.beds || null,
      baths: form.baths || null,
      features: form.features.split(',').map(s => s.trim()).filter(Boolean),
      images,
      status: 'approved',   // admin publishes directly
    })
    setForm(initial); setImages([]); setSaved(true)
    window.scrollTo({ top: 0, behavior: 'smooth' })
    setTimeout(() => setSaved(false), 5000)
  }

  return (
    <form className="card" onSubmit={submit}>
      <h3 style={{ marginBottom: 18 }}>Add New Listing</h3>
      {saved && <p className="note" style={{ marginBottom: 16, color: 'var(--g700)', fontWeight: 600 }}>
        ✅ Listing published — it is now live on the public site.
      </p>}
      <div className="form-grid">
        <div className="field full"><label>Listing title *</label><input required value={form.title} onChange={set('title')} /></div>
        <div className="field"><label>Category *</label>
          <select value={form.category} onChange={set('category')}>{CATEGORIES.map(c => <option key={c}>{c}</option>)}</select>
        </div>
        <div className="field"><label>Status *</label>
          <select value={form.dealType} onChange={set('dealType')}><option>Buy</option><option>Rent</option></select>
        </div>
        <div className="field"><label>Location / neighbourhood *</label><input required value={form.location} onChange={set('location')} /></div>
        <div className="field"><label>District *</label>
          <select value={form.district} onChange={set('district')}>{DISTRICTS.map(d => <option key={d}>{d}</option>)}</select>
        </div>
        <div className="field"><label>Price (UGX) *</label><input required type="number" min="0" value={form.price} onChange={set('price')} /></div>
        <div className="field"><label>Featured on homepage</label>
          <select value={form.featured} onChange={e => setForm(f => ({ ...f, featured: e.target.value === 'true' }))}>
            <option value="false">No</option><option value="true">Yes</option>
          </select>
        </div>
        {form.category === 'Residential' && (
          <>
            <div className="field"><label>Bedrooms</label><input type="number" min="0" value={form.beds} onChange={set('beds')} /></div>
            <div className="field"><label>Bathrooms</label><input type="number" min="0" value={form.baths} onChange={set('baths')} /></div>
          </>
        )}
        <div className="field full"><label>Size / plot description</label><input value={form.sizeLabel} onChange={set('sizeLabel')} placeholder="e.g. 50 decimals, 250 sqm" /></div>
        <div className="field full"><label>Features (comma separated)</label>
          <input value={form.features} onChange={set('features')} placeholder="Tarmac road access, Borehole water, Wall fence" />
        </div>
        <div className="field full"><label>Description *</label><textarea required value={form.description} onChange={set('description')} /></div>
        <div className="field"><label>Agent / contact name *</label><input required value={form.agent} onChange={set('agent')} /></div>
        <div className="field"><label>Agent phone (WhatsApp) *</label><input required value={form.agentPhone} onChange={set('agentPhone')} placeholder="+256 7XX XXX XXX" /></div>
        <div className="field full"><label>Property photos (up to 4, max 1MB each)</label>
          <input type="file" accept="image/*" multiple onChange={handleImages} />
          {images.length > 0 && (
            <div className="photos-preview">
              {images.map((src, i) => (
                <span key={i} style={{ position: 'relative', display: 'inline-block' }}>
                  <img className="photo-thumb" src={src} alt="" />
                  <button type="button" onClick={() => removeImage(i)}
                    style={{ position: 'absolute', top: -6, right: -6, width: 20, height: 20, borderRadius: '50%', border: 'none', background: 'var(--g900)', color: '#fff', cursor: 'pointer', display: 'grid', placeItems: 'center' }}>
                    <X size={12} />
                  </button>
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
      <p className="note" style={{ margin: '18px 0' }}>Map pin defaults to Kampala CBD — edit the latitude/longitude in the data for precise placement later if needed.</p>
      <button className="btn btn-primary btn-lg" type="submit"><Save size={17} /> Publish Listing</button>
    </form>
  )
}