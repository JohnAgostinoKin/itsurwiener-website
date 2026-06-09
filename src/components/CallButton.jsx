import { useState, useEffect } from 'react'

export default function CallButton({ className = '' }) {
  const [revealed, setRevealed] = useState(false)

  useEffect(() => {
    if (!revealed) return
    const timer = setTimeout(() => setRevealed(false), 30000)
    return () => clearTimeout(timer)
  }, [revealed])

  return revealed ? (
    <a href="tel:8647225001" className={className}>(864) 722-5001</a>
  ) : (
    <button className={className} onClick={() => setRevealed(true)}>Call Us</button>
  )
}
