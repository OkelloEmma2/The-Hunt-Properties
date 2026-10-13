import { useState } from 'react'
import { Link } from 'react-router-dom'
import { KeyRound, LogOut, CheckCircle2, XCircle, Trash2, Pencil, Mail, MessageCircle, RefreshCw, Inbox } from 'lucide-react'
import { useListings } from '../context/ListingsContext'
import { formatUGX, waLink } from '../utils/whatsapp'

// ⚠️ DEMO ONLY — in production replace with a real backend + hashed credentials (SRS: secure admin authentication)
const ADMIN_PASSWORD = 'hunt-admin-2026'

function ListingRow({ l, approve, reject, remove, update }) {
  const [editing, setEditing] = useState(false)
  const [title, setTitle] = useState(l.title)
  const [price, setPrice] = useState(l.price)
  const img = l.images?.[0]
  return (
    <div className="card admin-item">
      {img
        ? <img src={img} alt="" />
        : <div className="img-placeholder" style={{ width: 130, height: 92, borderRadius: 10 }}>No photo</div>}
      <div className="grow">
        <span className={`chip chip-${l.status}`}>{l.status}</span>
        <h3 style={{ fontSize: '1rem', margin: '8px 0 2px' }}>{l.title}</h3>
        <p className="section-sub" style={{ fontSize: '.85rem' }}>
          {l.location}, {l.district} • {l.category} • For {l.dealType === 'Rent' ? 'Rent' : 'Sale'} • {formatUGX(l.price)}{l.period === 'month' ? '/month' : ''}
        </p>
        <p className="section-sub" style={{ fontSize: '.8rem' }}>
          Owner: {l.ownerName || 'The Hunt Team'} — {l.ownerPhone || '—'}{l.deedName ? ` • Deed: ${l.deedName}` : ''}
        </p>
        {editing ? (
          <div className="edit-inline">
            <input value={title} onChange={e => setTitle(e.target.value)} />
            <input type="number" value={price} onChange={e => setPrice(e.target.value)} />
            <button className="btn btn-primary btn-sm" onClick={() => { update(l.id, { title, price: Number(price) }); setEditing(false) }}>Save</button>
          </div>
        ) : (
          <div className="row-actions">
            {l.status === 'pending' && (
              <>
                <button className="btn btn-primary btn-sm" onClick={() => approve(l.id)}><CheckCircle2 size={15} /> Approve</button>
                <button className="btn btn-ghost btn-sm" onClick={() => reject(l.id)}><XCircle size={15} /> Reject</button>
              </>
            )}
            <button className="btn btn-ghost btn-sm" onClick={() => setEditing(true)}><Pencil size={15} /> Edit</button>
            <button className="btn btn-ghost btn-sm" onClick={() => { if (window.confirm('Delete this listing permanently?')) remove(l.id) }}><Trash2 size={15} /> Delete</button>
            {l.status === 'approved' && <Link className="btn btn-ghost btn-sm" to={`/property/${l.id}`}>View</Link>}
          </div>
        )}
      </div>
    </div>
  )
}

export default function Admin() {
  const { listings, leads, updateListing, deleteListing, resetDemoData } = useListings()
  const [authed, setAuthed] = useState(() => sessionStorage.getItem('thp_admin') === '1')
  const [pw, setPw] = useState('')
  const [error, setError] = useState('')
  const [tab, setTab] = useState('pending')

  if (!authed) return (
    <section className="section"><div className="container">
      <div className="card login-box">
        <div className="why-icon" style={{ margin: '0 auto 12px' }}><KeyRound size={24} /></div>
        <h2>Admin Panel</h2>
        <p className="section-sub" style={{ fontSize: '.85rem' }}>Restricted to The Hunt Properties staff.</p>
        <form onSubmit={e => {
          e.preventDefault()
          if (pw === ADMIN_PASSWORD) { sessionStorage.setItem('thp_admin', '1'); setAuthed(true) }
          else setError('Incorrect password')
        }}>
          <input type="password" placeholder="Enter admin password" value={pw} onChange={e => setPw(e.target.value)} />
          {error && <p style={{ color: 'var(--g700)', fontSize: '.85rem', fontWeight: 600 }}>{error}</p>}
          <button className="btn btn-primary" type="submit">Login</button>
        </form>
      </div>
    </div></section>
  )

  const pending = listings.filter(l => l.status === 'pending')
  const shown = tab === 'pending' ? pending : tab === 'all' ? listings : []
  const approve = id => updateListing(id, { status: 'approved' })
  const reject = id => updateListing(id, { status: 'rejected' })

  return (
    <section className="section"><div className="container">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12, marginBottom: 24 }}>
        <div><span className="eyebrow">Dashboard</span><h2 className="section-title" style={{ marginBottom: 0 }}>Admin Approval Panel</h2></div>
        <div style={{ display: 'flex', gap: 10 }}>
          <button className="btn btn-ghost btn-sm" onClick={() => { if (window.confirm('Reset all demo data?')) resetDemoData() }}><RefreshCw size={15} /> Reset demo data</button>
          <button className="btn btn-ghost btn-sm" onClick={() => { sessionStorage.removeItem('thp_admin'); setAuthed(false) }}><LogOut size={15} /> Logout</button>
        </div>
      </div>

      <div className="admin-tabs">
        {[['pending', `Pending (${pending.length})`], ['all', `All Listings (${listings.length})`], ['leads', `Leads (${leads.length})`]].map(([key, label]) => (
          <button key={key} className={`tab-btn ${tab === key ? 'active' : ''}`} onClick={() => setTab(key)}>{label}</button>
        ))}
      </div>

      {tab !== 'leads' && (
        shown.length === 0 ? (
          <div className="card empty-state"><Inbox size={36} /><h3>Nothing here yet</h3><p className="section-sub">Owner-submitted listings will appear here for review.</p></div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {shown.map(l => <ListingRow key={l.id} l={l} approve={approve} reject={reject} remove={deleteListing} update={updateListing} />)}
          </div>
        )
      )}

      {tab === 'leads' && (
        leads.length === 0 ? (
          <div className="card empty-state"><Inbox size={36} /><h3>No leads yet</h3><p className="section-sub">Messages from the contact form will appear here.</p></div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {leads.map(lead => (
              <div className="card" key={lead.id}>
                <div style={{ display: 'flex', justifyContent: 'space-between', gap: 10, flexWrap: 'wrap' }}>
                  <h3 style={{ fontSize: '1rem' }}>{lead.name} <span className="chip chip-approved">{lead.subject}</span></h3>
                  <span className="section-sub" style={{ fontSize: '.78rem' }}>{new Date(lead.date).toLocaleString()}</span>
                </div>
                <p className="section-sub" style={{ fontSize: '.85rem', margin: '6px 0' }}>
                  {lead.phone}{lead.email && ` • ${lead.email}`} • via {lead.source}
                </p>
                <p style={{ fontSize: '.9rem' }}>{lead.message}</p>
                <div className="row-actions">
                  <a className="btn btn-primary btn-sm" href={waLink(`Hello ${lead.name}, this is The Hunt Properties regarding your enquiry.`)} target="_blank" rel="noreferrer"><MessageCircle size={15} /> WhatsApp</a>
                  <a className="btn btn-ghost btn-sm" href={`mailto:${lead.email}`}><Mail size={15} /> Email</a>
                </div>
              </div>
            ))}
          </div>
        )
      )}
    </div></section>
  )
}