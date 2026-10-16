import { useState } from 'react'
import { Trash2, PlusCircle } from 'lucide-react'
import { useListings } from '../context/ListingsContext'
import { Link } from 'react-router-dom'

const TAGS = ['Buyer Guides', 'Tenant Guides', 'Investment', 'Company News']
const initial = { title: '', tag: 'Buyer Guides', image: '', excerpt: '', content: '' }

export default function BlogManager() {
  const { posts, addPost, deletePost } = useListings()
  const [form, setForm] = useState(initial)
  const set = k => e => setForm(f => ({ ...f, [k]: e.target.value }))

  const submit = (e) => {
    e.preventDefault()
    addPost({
      ...form,
      date: new Date().toISOString(),
      image: form.image.trim() || `https://picsum.photos/seed/hunt-${Date.now()}/900/500`,
      // One paragraph per line — start a line with "## " to make it a heading
      content: form.content.split('\n').map(l => l.trim()).filter(Boolean),
    })
    setForm(initial)
    alert('Post published!')
  }

  return (
    <div>
      <form className="card" onSubmit={submit}>
        <h3 style={{ marginBottom: 18 }}>Publish New Article</h3>
        <div className="form-grid">
          <div className="field full"><label>Title *</label><input required value={form.title} onChange={set('title')} /></div>
          <div className="field"><label>Tag</label>
            <select value={form.tag} onChange={set('tag')}>{TAGS.map(t => <option key={t}>{t}</option>)}</select>
          </div>
          <div className="field"><label>Cover image URL (optional)</label>
            <input value={form.image} onChange={set('image')} placeholder="Leave empty for auto image" />
          </div>
          <div className="field full"><label>Short excerpt *</label><input required value={form.excerpt} onChange={set('excerpt')} /></div>
          <div className="field full"><label>Content *</label>
            <textarea required style={{ minHeight: 200 }} value={form.content} onChange={set('content')}
              placeholder={'First paragraph...\n\n## A heading\nAnother paragraph...'} />
            <p className="section-sub" style={{ fontSize: '.78rem' }}>One paragraph per line. Start a line with "## " for a heading.</p>
          </div>
        </div>
        <button className="btn btn-primary" style={{ marginTop: 16 }} type="submit"><PlusCircle size={16} /> Publish Post</button>
      </form>

      <h3 style={{ margin: '28px 0 14px' }}>Published articles ({posts.length})</h3>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        {posts.map(p => (
          <div className="card" key={p.slug} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 14, flexWrap: 'wrap' }}>
            <div>
              <span className="chip chip-approved">{p.tag}</span>
              <h4 style={{ margin: '8px 0 2px' }}>{p.title}</h4>
              <p className="section-sub" style={{ fontSize: '.8rem' }}>
                {new Date(p.date).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })} • <Link to={`/blog/${p.slug}`}>view</Link>
              </p>
            </div>
            <button className="btn btn-ghost btn-sm" onClick={() => { if (window.confirm(`Delete "${p.title}"?`)) deletePost(p.slug) }}>
              <Trash2 size={15} /> Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}