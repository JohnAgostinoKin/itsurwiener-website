import { useEffect, useRef } from 'react'

export default function Cursor() {
  const dotRef  = useRef(null)
  const ringRef = useRef(null)
  const mouse   = useRef({ x: 0, y: 0 })
  const ring    = useRef({ x: 0, y: 0 })
  const big     = useRef(false)

  useEffect(() => {
    const move = (e) => {
      mouse.current.x = e.clientX
      mouse.current.y = e.clientY
      if (dotRef.current) {
        dotRef.current.style.left = e.clientX + 'px'
        dotRef.current.style.top  = e.clientY + 'px'
      }
    }

    const over = (e) => {
      const el = e.target.closest('a, button, [data-cursor]')
      if (el && !big.current) {
        big.current = true
        dotRef.current?.classList.add('scale-[2]')
        ringRef.current?.classList.add('!w-[70px]', '!h-[70px]')
      } else if (!el && big.current) {
        big.current = false
        dotRef.current?.classList.remove('scale-[2]')
        ringRef.current?.classList.remove('!w-[70px]', '!h-[70px]')
      }
    }

    document.addEventListener('mousemove', move)
    document.addEventListener('mouseover', over)

    let raf
    const loop = () => {
      ring.current.x += (mouse.current.x - ring.current.x) * 0.13
      ring.current.y += (mouse.current.y - ring.current.y) * 0.13
      if (ringRef.current) {
        ringRef.current.style.left = ring.current.x + 'px'
        ringRef.current.style.top  = ring.current.y + 'px'
      }
      raf = requestAnimationFrame(loop)
    }
    loop()

    return () => {
      document.removeEventListener('mousemove', move)
      document.removeEventListener('mouseover', over)
      cancelAnimationFrame(raf)
    }
  }, [])

  return (
    <>
      <div
        ref={dotRef}
        className="fixed z-[9999] pointer-events-none w-[10px] h-[10px] bg-orange rounded-full -translate-x-1/2 -translate-y-1/2 transition-transform duration-200 mix-blend-difference"
      />
      <div
        ref={ringRef}
        className="fixed z-[9998] pointer-events-none w-[36px] h-[36px] border border-orange/50 rounded-full -translate-x-1/2 -translate-y-1/2 transition-[width,height] duration-300"
      />
    </>
  )
}
