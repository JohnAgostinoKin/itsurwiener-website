import { useEffect, useState } from 'react'

export default function Cursor() {
  const [pos, setPos] = useState({ x: -100, y: -100 })
  const [visible, setVisible] = useState(false)
  const [isMobile, setIsMobile] = useState(true)

  useEffect(() => {
    // Check if touch device
    const checkMobile = () => setIsMobile(window.matchMedia('(pointer: coarse)').matches)
    checkMobile()
    window.addEventListener('resize', checkMobile)

    const move = (e) => {
      setPos({ x: e.clientX, y: e.clientY })
      setVisible(true)
    }
    const leave = () => setVisible(false)

    window.addEventListener('mousemove', move)
    document.addEventListener('mouseleave', leave)
    return () => {
      window.removeEventListener('mousemove', move)
      document.removeEventListener('mouseleave', leave)
      window.removeEventListener('resize', checkMobile)
    }
  }, [])

  if (isMobile) return null

  return (
    <div
      className="fixed pointer-events-none z-[9999] transition-opacity duration-200"
      style={{
        left: pos.x,
        top: pos.y,
        opacity: visible ? 1 : 0,
        transform: 'translate(-4px, -4px)',
      }}
    >
      {/* Orange arrow cursor */}
      <svg width="20" height="24" viewBox="0 0 20 24" fill="none">
        <path d="M2 2L18 10L10 12L6 20L2 2Z" fill="#F56520" stroke="#04030A" strokeWidth="1.5" strokeLinejoin="round"/>
      </svg>
    </div>
  )
}
