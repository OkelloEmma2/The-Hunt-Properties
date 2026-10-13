import { useEffect, useRef, useState } from 'react'

function useCountUp(target, duration = 1800, run) {
  const [value, setValue] = useState(0)
  useEffect(() => {
    if (!run) { setValue(0); return }        // reset when scrolled out of view
    let raf
    const t0 = performance.now()
    const tick = (now) => {
      const p = Math.min((now - t0) / duration, 1)
      const eased = 1 - Math.pow(1 - p, 3)   // ease-out curve
      setValue(Math.round(eased * target))
      if (p < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [run, target, duration])
  return value
}

export default function AnimatedStat({ value, suffix = '', label }) {
  const ref = useRef(null)
  const [inView, setInView] = useState(false)
  const count = useCountUp(value, 1800, inView)

  // Observer never disconnects — it keeps watching so the
  // animation replays on every scroll up/down
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold: 0.3 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  return (
    <div className={`stat ${inView ? 'stat-in' : ''}`} ref={ref}>
      <b>{count}{suffix}</b>
      <span>{label}</span>
    </div>
  )
}