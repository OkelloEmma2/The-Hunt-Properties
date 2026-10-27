import { useEffect, useRef } from 'react'

const AD_CLIENT = 'ca-pub-4168573839634983'   // your publisher ID

export default function AdUnit({ slot, className = '' }) {
  const pushed = useRef(false)

  useEffect(() => {
    if (pushed.current) return          // guard: never push twice for the same unit
    try {
      ;(window.adsbygoogle = window.adsbygoogle || []).push({})
      pushed.current = true
    } catch (e) { /* loader not ready yet — it processes the queue when it loads */ }
  }, [])

  return (
    <div className={`ad-wrap ${className}`}>
      <span className="ad-label">Advertisement</span>
      <ins className="adsbygoogle"
        style={{ display: 'block' }}
        data-ad-client={AD_CLIENT}
        data-ad-slot={slot}
        data-ad-format="auto"
        data-full-width-responsive="true" />
    </div>
  )
}