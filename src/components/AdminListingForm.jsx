import { useState, useEffect } from 'react'
import { useListings } from '../context/ListingsContext'
import { DISTRICTS } from '../data/properties'
import { formatPrice } from '../utils/whatsapp'

// ← keep identical to the "Type" options in your search dropdowns
const CATEGORIES = ['House', 'Apartment', 'Villa', 'Land', 'Commercial']

const EMPTY = {
  title: '',
  category: 'House',
  dealType: 'sale',
  currency: 'UGX',
  price: '',
  rentPeriod: 'month',
  district: DISTRICTS[0] || 'Kampala',
  location: '',
  description: '',
  features: '',
  agentName: '',
  agentPhone: '',
  featured: false,
}

export default function AdminListingForm({ editing = null, onDone = () => {} }) {
  const { addListing, updateListing } = useListings()
  const [form, setForm] = useState(EMPTY)
  const [images, setImages] = useState([])
  const [savedMsg, setSavedMsg] = useState('')

  useEffect(() => {
    if (editing) {
      setForm({
        ...EMPTY,
        ...editing,
        price: editing.price ?? '',
        features: Array.isArray(editing.features) ? editing.features.join(', ') : (editing.features || ''),
      })
      setImages(Array.isArray(editing.images) ? editing.images : [])
    } else {
      setForm(EMPTY)
      setImages([])
    }
    setSavedMsg('')
  }, [editing])

  const set = (key) => (e) =>
    setForm(f => ({ ...f, [key]: e.target.type === 'checkbox' ? e.target.checked : e.target.value }))

  const handlePhoto = (e) => {
    Array.from(e.target.files || []).forEach(file => {
      if (images.length + 1 > 4) { alert('Maximum of 4 photos per property.'); return }
      if (file.size > 1024 * 1024) { alert(`"${file.name}" is over 1MB — please compress it first.`); return }
      const reader = new FileReader()
      reader.onload = () => setImages(prev => (prev.length >= 4 ? prev : [...prev, reader.result]))
      reader.readAsDataURL(file)
    })
    e.target.value = ''
  }

  const removePhoto = (i) => setImages(prev => prev.filter((_, idx) => idx !== i))

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!form.title.trim() || !form.price || !form.location.trim()) {
      alert('Please fill in Title, Price and Location.')
      return
    }

    const payload = {
      title: form.title.trim(),
      category: form.category,
      dealType: form.dealType,
      currency: form.currency,
      price: Number(form.price),
      rentPeriod: form.dealType === 'rent' ? form.rentPeriod : null,
      district: form.district,
      location: form.location.trim(),
      description: form.description.trim(),
      features: form.features.split(',').map(s => s.trim()).filter(Boolean),
      images,
      agentName: form.agentName.trim(),
      agentPhone: form.agentPhone.trim(),
      featured: form.featured,
    }

    if (editing) {
      updateListing({ ...editing, ...payload })
    } else {
      addListing(payload)
    }

    setSavedMsg(editing ? 'Listing updated — changes are live on the site.' : 'Listing saved — it is now live on the site.')
    setForm(EMPTY)
    setImages([])
    onDone()
  }

  return (
    <form className="alf" onSubmit={handleSubmit}>
      {savedMsg && <p className="alf-saved">{savedMsg}</p>}

      <label>
        Property Title *
        <input type="text" value={form.title} onChange={set('title')}
          placeholder="e.g. Modern 4 Bedroom Villa in Najjera" />
      </label>

      <div className="alf-grid2">
        <label>
          Category *
          <select value={form.category} onChange={set('category')}>
            {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
        </label>
        <label>
          Listing Type *
          <select value={form.dealType} onChange={set('dealType')}>
            <option value="sale">For Sale</option>
            <option value="rent">For Rent</option>
          </select>
        </label>
      </div>

      <div className={form.dealType === 'rent' ? 'alf-grid2' : ''}>
        <label>
          Currency *
          <select value={form.currency} onChange={set('currency')}>
            <option value="UGX">UGX — Uganda Shillings</option>
            <option value="USD">USD — US Dollars</option>
          </select>
        </label>
        {form.dealType === 'rent' && (
          <label>
            Payment Duration *
            <select value={form.rentPeriod} onChange={set('rentPeriod')}>
              <option value="month">Per Month</option>
              <option value="day">Per Day</option>
            </select>
          </label>
        )}
      </div>

      <label>
        Price *
        <input type="number" min="0" value={form.price} onChange={set('price')}
          placeholder={form.currency === 'USD' ? 'e.g. 1200' : 'e.g. 950000000'} />
      </label>

      <p className="alf-preview">
        Will display as: <strong>
          {formatPrice(Number(form.price) || 0, form.currency, form.dealType, form.rentPeriod)}
        </strong>
      </p>

      <div className="alf-grid2">
        <label>
          District *
          <select value={form.district} onChange={set('district')}>
            {DISTRICTS.map(d => <option key={d} value={d}>{d}</option>)}
          </select>
        </label>
        <label>
          Area / Location *
          <input type="text" value={form.location} onChange={set('location')} placeholder="e.g. Najjera" />
        </label>
      </div>

      <label>
        Description *
        <textarea rows="5" value={form.description} onChange={set('description')}
          placeholder="Describe the property: rooms, amenities, neighbourhood..." />
      </label>

      <label>
        Features (comma separated)
        <input type="text" value={form.features} onChange={set('features')}
          placeholder="Swimming Pool, Tarmac Road, Wall Fence, Borehole Water" />
      </label>

      <div>
        <label>Photos (up to 4, max 1MB each)</label>
        <input type="file" accept="image/*" multiple onChange={handlePhoto} className="alf-file" />
        {images.length > 0 && (
          <div className="alf-photos">
            {images.map((src, i) => (
              <div key={i} className="alf-thumb">
                <img src={src} alt={`photo ${i + 1}`} />
                <button type="button" onClick={() => removePhoto(i)} aria-label="Remove photo">×</button>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="alf-grid2">
        <label>
          Agent Name
          <input type="text" value={form.agentName} onChange={set('agentName')} placeholder="e.g. Sarah" />
        </label>
        <label>
          Agent Phone (WhatsApp)
          <input type="text" value={form.agentPhone} onChange={set('agentPhone')} placeholder="2567XXXXXXXX" />
        </label>
      </div>

      <label className="alf-check">
        <input type="checkbox" checked={form.featured} onChange={set('featured')} />
        Feature this property on the homepage
      </label>

      <button type="submit" className="alf-submit">
        {editing ? 'Update Listing' : 'Publish Listing'}
      </button>
    </form>
  )
}