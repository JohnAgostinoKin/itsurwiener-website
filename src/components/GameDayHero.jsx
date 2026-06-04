import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'

export default function GameDayHero() {
  const ballRef  = useRef(null)
  const trailRef = useRef([])
  const rafRef   = useRef(null)
  const frameRef = useRef(0)

  useEffect(() => {
    const section = document.getElementById('gameday-hero')
    if (!section || !ballRef.current) return
    const TOTAL = 380

    function tick() {
      frameRef.current = (frameRef.current + 1) % TOTAL
      const f = frameRef.current
      const p = f / TOTAL
      const W = section.offsetWidth
      const H = section.offsetHeight
      const margin = W * 0.07
      const fw = W - margin * 2
      let x, y, angleDeg

      if (p < 0.5) {
        const t = p * 2
        x = margin + fw * t
        y = H * 0.78 - H * 0.62 * Math.sin(t * Math.PI)
        const dy = -H * 0.62 * Math.PI * Math.cos(t * Math.PI)
        angleDeg = Math.atan2(dy, fw * 2) * (180 / Math.PI)
      } else {
        const t = (p - 0.5) * 2
        x = margin + fw - fw * t
        y = H * 0.78 - H * 0.62 * Math.sin(t * Math.PI)
        const dy = -H * 0.62 * Math.PI * Math.cos(t * Math.PI)
        angleDeg = Math.atan2(dy, -fw * 2) * (180 / Math.PI) + 180
      }

      if (ballRef.current) {
        ballRef.current.style.left      = `${x}px`
        ballRef.current.style.top       = `${y}px`
        ballRef.current.style.transform = `translate(-50%, -50%) rotate(${angleDeg}deg)`
      }

      trailRef.current.push({ x, y })
      if (trailRef.current.length > 32) trailRef.current.shift()

      const canvas = section.querySelector('canvas')
      if (canvas) {
        const ctx = canvas.getContext('2d')
        canvas.width  = W
        canvas.height = H
        ctx.clearRect(0, 0, W, H)
        trailRef.current.forEach((pt, i) => {
          const ratio  = i / trailRef.current.length
          const alpha  = ratio * 0.65
          const radius = ratio * 14 + 2
          const grad   = ctx.createRadialGradient(pt.x, pt.y, 0, pt.x, pt.y, radius)
          const color  = i % 3 === 0 ? '157,78,221' : '245,101,32'
          grad.addColorStop(0, `rgba(${color},${alpha})`)
          grad.addColorStop(1, 'transparent')
          ctx.beginPath()
          ctx.arc(pt.x, pt.y, radius, 0, Math.PI * 2)
          ctx.fillStyle = grad
          ctx.fill()
        })
      }

      rafRef.current = requestAnimationFrame(tick)
    }

    tick()
    return () => cancelAnimationFrame(rafRef.current)
  }, [])

  return (
    <div id="gameday-hero" className="relative overflow-hidden" style={{ height: '520px' }}>

      {/* Clemson field background */}
      <div className="absolute inset-0" style={{
        backgroundImage: 'url(/images/clemson-field.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center 60%',
        filter: 'brightness(0.5) saturate(1.2)',
      }} />

      {/* Dark gradient overlay */}
      <div className="absolute inset-0" style={{
        background: 'linear-gradient(180deg, rgba(4,3,10,0.90) 0%, rgba(4,3,10,0.45) 50%, rgba(4,3,10,0.2) 100%)'
      }} />

      {/* Stadium light shafts */}
      {[
        { left: '5%',  color: 'rgba(245,101,32,0.07)', delay: '0s',   dur: '4s'   },
        { left: '22%', color: 'rgba(157,78,221,0.05)', delay: '0.8s', dur: '5s'   },
        { left: '50%', color: 'rgba(245,101,32,0.09)', delay: '0s',   dur: '3.5s' },
        { left: '78%', color: 'rgba(157,78,221,0.05)', delay: '1.2s', dur: '4.5s' },
        { left: '95%', color: 'rgba(245,101,32,0.07)', delay: '0.4s', dur: '4s'   },
      ].map((b, i) => (
        <div key={i} className="absolute top-0 pointer-events-none"
          style={{
            left: b.left, width: '180px', height: '100%',
            background: `linear-gradient(180deg, ${b.color} 0%, transparent 75%)`,
            transformOrigin: 'top center',
            animation: `sway ${b.dur} ease-in-out infinite alternate`,
            animationDelay: b.delay,
          }}
        />
      ))}

      {/* Top rim glow */}
      <div className="absolute top-0 left-0 right-0 h-[3px]"
        style={{ background: 'linear-gradient(90deg, transparent, #F56520, #9D4EDD, #F56520, transparent)' }} />

      {/* Corner floodlights */}
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at top left, rgba(245,101,32,0.12) 0%, transparent 50%)' }} />
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at top right, rgba(157,78,221,0.10) 0%, transparent 50%)' }} />

      {/* Scanline overlay */}
      <div className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(0,0,0,0.05) 3px, rgba(0,0,0,0.05) 4px)',
        }}
      />

      {/* Motion trail canvas */}
      <canvas className="absolute inset-0 pointer-events-none" />

      {/* Football */}
      <div ref={ballRef} className="absolute pointer-events-none"
        style={{ willChange: 'transform', filter: 'drop-shadow(0 6px 16px rgba(0,0,0,0.7))' }}>
        <img src="/images/football.png" alt="football" style={{ width: '120px', height: 'auto', display: 'block' }} />
      </div>

      {/* Title overlay */}
      <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none px-6">
        <motion.h1
          className="text-center font-display leading-none"
          style={{ fontSize: 'clamp(28px, 5.5vw, 96px)', letterSpacing: '0.02em' }}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        >
          <span style={{ color: 'white', textShadow: '0 2px 40px rgba(0,0,0,0.95)' }}>
            No Better Place To{' '}
          </span>
          <span style={{ color: '#F56520', textShadow: '0 0 80px rgba(245,101,32,0.8), 0 2px 40px rgba(0,0,0,0.9)' }}>
            Watch The Game
          </span>
          <sup style={{
            fontSize: '0.28em',
            color: 'rgba(245,101,32,0.75)',
            verticalAlign: 'super',
            fontFamily: 'Space Grotesk, sans-serif',
            fontWeight: 700,
            marginLeft: '4px',
          }}>TM</sup>
        </motion.h1>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-16 pointer-events-none"
        style={{ background: 'linear-gradient(to bottom, transparent, #04030A)' }} />

      <style>{`
        @keyframes sway {
          0%   { transform: rotate(-6deg); }
          100% { transform: rotate(6deg); }
        }
      `}</style>
    </div>
  )
}
