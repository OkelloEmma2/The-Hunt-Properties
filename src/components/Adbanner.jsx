export default function AdBanner({ label = 'Advertisement' }) {
  return (
    <div className="ad-banner" aria-label={label}>
      <span className="ad-tag">{label}</span>
      <div className="ad-slot">
        {/* ===== GOOGLE ADSENSE =====
            After approval, paste your responsive ad unit <ins> + script code here.
            This placeholder reserves the exact slot so layout won't shift. */}
        Responsive Ad Space — 728 × 90
      </div>
    </div>
  )
}