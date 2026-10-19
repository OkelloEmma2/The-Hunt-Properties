import { useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Search, RotateCcw } from 'lucide-react'
import { DISTRICTS } from '../data/properties'

const CATEGORIES = ['Land', 'Residential', 'Commercial','Standalone', 'Studio Room', 'AirBnB','Apartments', 'Double Room']
const STATUSES = ['Buy', 'Rent']

// SRS: "Dynamic multi-attribute search filtering by Location, Property Category,
// Price Range (UGX), and Status (Buy / Rent)" — filters live in the URL so
// results are shareable and crawlable-friendly.
export default function SearchFilters() {
  const [params, setParams] = useSearchParams()
  const [form, setForm] = useState({
    q: params.get('q') || '', location: params.get('location') || '',
    category: params.get('category') || '', status: params.get('status') || '',
    minPrice: params.get('minPrice') || '', maxPrice: params.get('maxPrice') || '',
  })
  const set = k => e => setForm(f => ({ ...f, [k]: e.target.value }))

  const apply = (e) => {
    e.preventDefault()
    const next = {}
    Object.entries(form).forEach(([k, v]) => { if (v) next[k] = v })
    setParams(next)
  }
  const clear = () => {
    setForm({ q: '', location: '', category: '', status: '', minPrice: '', maxPrice: '' })
    setParams({})
  }

  return (
    <form className="filters card" onSubmit={apply}>
      <div className="filters-grid">
        <label>Keyword<input value={form.q} onChange={set('q')} placeholder="e.g. villa, plot" /></label>
        <label>Location
          <select value={form.location} onChange={set('location')}>
            <option value="">All locations</option>
            {DISTRICTS.map(d => <option key={d}>{d}</option>)}
          </select>
        </label>
        <label>Category
          <select value={form.category} onChange={set('category')}>
            <option value="">All categories</option>
            {CATEGORIES.map(c => <option key={c}>{c}</option>)}
          </select>
        </label>
        <label>Status (Buy / Rent)
          <select value={form.status} onChange={set('status')}>
            <option value="">Buy or Rent</option>
            {STATUSES.map(s => <option key={s}>{s}</option>)}
          </select>
        </label>
        <label>Min price (UGX)<input type="number" min="0" value={form.minPrice} onChange={set('minPrice')} placeholder="0" /></label>
        <label>Max price (UGX)<input type="number" min="0" value={form.maxPrice} onChange={set('maxPrice')} placeholder="Any" /></label>
      </div>
      <div className="filters-actions">
        <button className="btn btn-primary" type="submit"><Search size={16} /> Search Properties</button>
        <button className="btn btn-ghost" type="button" onClick={clear}><RotateCcw size={16} /> Reset</button>
      </div>
    </form>
  )
}