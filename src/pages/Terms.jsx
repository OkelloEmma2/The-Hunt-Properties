import { Link } from 'react-router-dom'

export default function Terms() {
  return (
    <section className="section"><div className="container" style={{ maxWidth: 800 }}>
      <span className="eyebrow">Legal</span>
      <h1 style={{ fontSize: 'clamp(1.7rem,3.4vw,2.3rem)' }}>Terms of Service</h1>
      <p className="section-sub" style={{ marginBottom: 28 }}>Last updated: October 2026</p>
      <div className="prose card" style={{ padding: 30 }}>
        <h2>1. Acceptance of terms</h2>
        <p>By accessing this website you agree to these terms. If you do not agree, please discontinue use of the site.</p>
        <h2>2. Our services</h2>
        <p>The Hunt Properties Limited operates an online marketplace connecting property seekers with property owners and agents in Uganda, and provides listing submission and lead-routing tools.</p>
        <h2>3. Listings &amp; accuracy</h2>
        <p>Listings are submitted by property owners and agents and reviewed by our team before publication. While we take reasonable steps to verify details, we do not guarantee completeness or accuracy. Always conduct independent due diligence, including physical inspection and title verification, before any transaction.</p>
        <h2>4. Acceptable use</h2>
        <p>You agree not to submit false listings or documents, scrape or reuse content without permission, attempt to breach site security, or use the platform for unlawful purposes.</p>
        <h2>5. Intellectual property</h2>
        <p>All content, branding and design on this site belong to The Hunt Properties Limited unless otherwise stated. Listing photos remain the property of their respective owners.</p>
        <h2>6. Third-party links &amp; advertising</h2>
        <p>This site may contain third-party links and advertising (including Google AdSense). We are not responsible for the content or practices of third parties.</p>
        <h2>7. Limitation of liability</h2>
        <p>To the maximum extent permitted by law, The Hunt Properties Limited shall not be liable for any loss arising from use of the website or reliance on listing information.</p>
        <h2>8. Governing law</h2>
        <p>These terms are governed by the laws of the Republic of Uganda.</p>
      </div>
      <Link to="/" className="btn btn-ghost" style={{ marginTop: 24 }}>Back to Home</Link>
    </div></section>
  )
}