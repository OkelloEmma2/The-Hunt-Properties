import { Link } from 'react-router-dom'
import { Clock } from 'lucide-react'
import { useListings } from '../context/ListingsContext'

export default function Blog() {
  const { posts } = useListings()
  return (
    <>
      <div className="page-head"><div className="container">
        <h1>Real Estate Guides &amp; Insights</h1>
        <p>Practical advice for buyers, tenants and property investors in Uganda.</p>
      </div></div>
      <section className="section"><div className="container">
        <div className="grid grid-3">
          {posts.map(post => (
            <article className="prop-card" key={post.slug}>
              <Link to={`/blog/${post.slug}`} className="prop-img-wrap">
                <img src={post.image} alt={post.title} loading="lazy" />
              </Link>
              <div className="prop-body">
                <span className="badge-soon" style={{ background: 'var(--g100)', color: 'var(--g800)', alignSelf: 'flex-start' }}>{post.tag}</span>
                <h3><Link to={`/blog/${post.slug}`}>{post.title}</Link></h3>
                <p className="section-sub" style={{ fontSize: '.85rem' }}>{post.excerpt}</p>
                <p className="prop-loc" style={{ marginTop: 'auto' }}>
                  <Clock size={13} /> {new Date(post.date).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div></section>
    </>
  )
}