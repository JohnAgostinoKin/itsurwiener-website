import { useRef, useEffect, useState } from 'react'
import { useReducedMotion } from 'framer-motion'

/**
 * Full-bleed video background for experience bands and hero sections.
 *
 * Props
 *   src720        MP4 path (720p) — required to show video
 *   src1080       MP4 path (1080p, wide screens) — optional
 *   poster        Image shown before video loads + on prefers-reduced-motion
 *   overlay       CSS gradient string for the colour overlay (sits at z-[1])
 *   lazy          Defer load until element nears viewport — default true
 *   videoClassName Extra classes applied to the <video> element
 *   videoStyle    Extra inline styles on <video> (e.g. parallax pre-scale)
 *
 * Parent must have position:relative; overflow:hidden.
 * Band content / headings must sit at z-[2] or higher.
 */
export default function BandVideoBg({
  src720,
  src1080,
  poster,
  overlay = 'linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.7))',
  lazy = true,
  videoClassName = '',
  videoStyle = {},
}) {
  const wrapRef  = useRef(null)
  const videoRef = useRef(null)
  const [ready, setReady] = useState(!lazy)
  const reduced = useReducedMotion()

  // IntersectionObserver — start loading only when band enters rootMargin
  useEffect(() => {
    if (!lazy || ready || !src720 || reduced) return
    const el = wrapRef.current
    if (!el) return
    const io = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setReady(true); io.disconnect() } },
      { rootMargin: '200px' }
    )
    io.observe(el)
    return () => io.disconnect()
  }, [lazy, ready, src720, reduced])

  // Once sources are present in DOM, load + play
  useEffect(() => {
    if (!ready || !videoRef.current || !src720 || reduced) return
    const v = videoRef.current
    v.load()
    v.play().catch(() => {})
  }, [ready, src720, reduced])

  return (
    <div ref={wrapRef} className="absolute inset-0">
      {src720 && !reduced ? (
        <video
          ref={videoRef}
          muted loop playsInline
          poster={poster}
          preload="none"
          className={`absolute inset-0 w-full h-full object-cover z-0 ${videoClassName}`}
          style={videoStyle}
        >
          {/* Wide screens get 1080p if provided; 720p is the universal fallback */}
          {ready && src1080 && (
            <source src={src1080} media="(min-width: 1280px)" type="video/mp4" />
          )}
          {ready && <source src={src720} type="video/mp4" />}
        </video>
      ) : poster ? (
        // Static fallback: no video src, or prefers-reduced-motion
        <img
          src={poster}
          alt=""
          aria-hidden="true"
          className="absolute inset-0 w-full h-full object-cover z-0"
        />
      ) : null}

      {/* Colour / contrast overlay — content sits above this */}
      <div className="absolute inset-0 z-[1]" style={{ background: overlay }} />
    </div>
  )
}
