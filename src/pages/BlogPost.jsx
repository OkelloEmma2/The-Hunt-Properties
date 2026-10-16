import { Link, useParams } from 'react-router-dom'
import { MessageCircle, ArrowLeft } from 'lucide-react'
import { useListings } from '../context/ListingsContext'
import { waLink } from '../utils/whatsapp'

export default function BlogPost() {
  const { slug } = useParams()
  const post = posts.find(p => p.slug === slug)
  const { posts } = useListings()
  if (!post) return (
    <section className="section"><div className="container notfound">
      <h1>404</h1><h2>Article not found</h2>
      <Link className="btn btn-primary" to="/blog" style={{ marginTop: 16 }}>Back to Blog</Link>
    </div></section>
  )

  return (
    <section className="section"><div className="container" style={{ maxWidth: 800 }}>
      <Link to="/blog" className="prop-loc" style={{ marginBottom: 18, display: 'inline-flex' }}><ArrowLeft size={15} /> All articles</Link>
      <span className="eyebrow">{post.tag}</span>
      <h1 style={{ fontSize: 'clamp(1.7rem,3.4vw,2.4rem)' }}>{post.title}</h1>
      <div className="post-meta">
        <span>{new Date(post.date).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
        <span>By The Hunt Properties Team</span>
      </div>
      <img src={post.image} alt={post.title} style={{ borderRadius: 'var(--radius)', marginBottom: 28 }} />
      <div className="prose">
        {post.content.map((para, i) =>
          para.startsWith('## ') ? <h2 key={i}>{para.replace('## ', '')}</h2> : <p key={i}>{para}</p>
        )}
      </div>
      <div className="cta-band" style={{ marginTop: 46 }}>
        <div><h2>Ready to find your property?</h2><p>Browse verified listings or talk to our team directly.</p></div>
        <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
          <Link to="/properties" className="btn btn-light">Browse Properties</Link>
          <a href={waLink('Hello, I read your blog and would like to talk to an agent.')} target="_blank" rel="noreferrer"
             className="btn btn-whatsapp"><MessageCircle size={16} /> WhatsApp Us</a>
        </div>
      </div>
    </div></section>
  )
}