import { useState, useEffect } from 'react'
import { useListings } from '../context/ListingsContext'
import { DISTRICTS } from '../data/properties'
import { formatPrice } from '../utils/whatsapp'

const MAX_PHOTOS = 8   // ← change this one number anytime in the future

// Shrinks a photo to max 1280px-wide JPEG so 8 photos fit in browser storage
function compressImage(file, maxWidth = 1280, quality = 0.72) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => {
      const img = new Image()
      img.onload = () => {
        const scale = Math.min(1, maxWidth / img.width)
        const canvas = document.createElement('canvas')
        canvas.width = Math.round(img.width * scale)
        canvas.height = Math.round(img.height * scale)
        canvas.getContext('2d').drawImage(img, 0, 0, canvas.width, canvas.height)
        resolve(canvas.toDataURL('image/jpeg', quality))
      }
      img.onerror = () => reject(new Error('load error'))
      img.src = reader.result
    }
    reader.onerror = () => reject(new Error('read error'))
    reader.readAsDataURL(file)
  })
}

const CATEGORIES = ['Apartment', 'Villa', 'Land', 'Commercial','Standalone','Studio Rooms','AirBnB','Residentials','Double Rooms','Farms','Warehouses','Hotels','Hostels','Guest Houses','Mansions','Townhouses','Cottages','Bungalows','Duplexes','Triplexes']

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

const handlePhoto = async (e) => {
  const files = Array.from(e.target.files || [])
  for (const file of files) {
    if (images.length >= MAX_PHOTOS) {
      alert(`Maximum of ${MAX_PHOTOS} photos per property.`)
      break
    }
    try {
      const dataUrl = await compressImage(file)
      setImages(prev => (prev.length >= MAX_PHOTOS ? prev : [...prev, dataUrl]))
    } catch {
      alert(`Could not process "${file.name}" — try a different image.`)
    }
  }
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
            <option value="UGX">UGX</option>
            <option value="USD">USD</option>
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
          placeholder={form.currency === 'USD' ? 'e.g. 1200' : 'e.g. 950000'} />
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
        <label>Photos (up to {MAX_PHOTOS} — large photos are auto-compressed)</label>
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