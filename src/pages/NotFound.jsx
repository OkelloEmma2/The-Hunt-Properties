import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <section className="section"><div className="container notfound">
      <h1>404</h1>
      <h2>Page not found</h2>
      <p className="section-sub" style={{ marginBottom: 22 }}>The page you're hunting for doesn't exist or has moved.</p>
      <Link to="/" className="btn btn-primary btn-lg">Back to Home</Link>
    </div></section>
  )
}