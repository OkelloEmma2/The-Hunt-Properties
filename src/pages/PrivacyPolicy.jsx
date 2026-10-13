import { Link } from 'react-router-dom'

export default function PrivacyPolicy() {
  return (
    <section className="section"><div className="container" style={{ maxWidth: 800 }}>
      <span className="eyebrow">Legal</span>
      <h1 style={{ fontSize: 'clamp(1.7rem,3.4vw,2.3rem)' }}>Privacy Policy</h1>
      <p className="section-sub" style={{ marginBottom: 28 }}>Last updated: October 2026</p>
      <div className="prose card" style={{ padding: 30 }}>
        <h2>1. Who we are</h2>
        <p>The Hunt Properties Limited ("we", "our") operates this website and related services. For any privacy questions, contact us at info@thehuntproperties.com.</p>
        <h2>2. Information we collect</h2>
        <p>Contact details you submit through our forms (name, phone number, email address), property details, photographs and verification documents you upload when listing property, and basic usage data such as pages visited.</p>
        <h2>3. How we use your information</h2>
        <p>To respond to enquiries, verify and publish listings, route WhatsApp leads to the right owners or agents, improve the platform, and comply with legal obligations.</p>
        <h2>4. Cookies &amp; advertising</h2>
        <p>This site may display ads served by Google AdSense. Third-party vendors, including Google, use cookies to serve ads based on your prior visits to this and other websites. You may opt out of personalised advertising by visiting Google Ads Settings at adssettings.google.com.</p>
        <h2>5. Data sharing</h2>
        <p>We do not sell your personal data. Information is shared only with service providers who help us operate the website, or where required by law.</p>
        <h2>6. Data security &amp; retention</h2>
        <p>We enforce HTTPS encryption and restrict access to submitted documents. Data is retained only as long as necessary for the purposes described above.</p>
        <h2>7. Your rights</h2>
        <p>You may request access to, correction of, or deletion of your personal data at any time by contacting us.</p>
        <h2>8. Changes to this policy</h2>
        <p>We may update this policy from time to time. Changes will be posted on this page with an updated revision date.</p>
      </div>
      <Link to="/" className="btn btn-ghost" style={{ marginTop: 24 }}>Back to Home</Link>
    </div></section>
  )
}