import { useRef, useEffect } from 'react'
import { useReducedMotion } from 'framer-motion'

/**
 * Full-bleed video background for experience bands and hero sections.
 *
 * Props
 *   src720        MP4 path (720p) — required to show video
 *   src1080       MP4 path (1080p) — optional, tried first (no media query)
 *   poster        Image shown before video loads + on prefers-reduced-motion
 *   overlay       CSS gradient string for the colour overlay (sits at z-[1])
 *   lazy          Defer play until element nears viewport — default true
 *   videoClassName Extra classes applied to the <video> element
 *   videoStyle    Extra inline styles on <video> (e.g. parallax pre-scale)
 *
 * Parent must have position:relative; overflow:hidden.
 * Band content / headings must sit at z-[2] or higher.
 *
 * How lazy-load works:
 *   Sources are always in the DOM. preload="none" means the browser downloads
 *   nothing until play() is called. IntersectionObserver (rootMargin 200px)
 *   calls v.play() when the band approaches the viewport — that's the moment
 *   the browser fetches and decodes the video. No setState, no timing races.
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
  const reduced  = useReducedMotion()

  useEffect(() => {
    if (!src720 || reduced) return
    const v = wrapRef.current   // observe the wrapper div
    const vid = videoRef.current
    if (!v || !vid) return

    const play = () => vid.play().catch(() => {})

    if (!lazy) {
      play()
      return
    }

    const io = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { play(); io.disconnect() } },
      { rootMargin: '200px' }
    )
    io.observe(v)
    return () => io.disconnect()
  }, [lazy, src720, reduced])

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
          {/* src1080 first so wide-screen clients get higher quality;
              browser falls back to src720 if the file is absent */}
          {src1080 && <source src={src1080} type="video/mp4" />}
          <source src={src720} type="video/mp4" />
        </video>
      ) : poster ? (
        <img
          src={poster}
          alt=""
          aria-hidden="true"
          className="absolute inset-0 w-full h-full object-cover z-0"
        />
      ) : null}

      <div className="absolute inset-0 z-[1]" style={{ background: overlay }} />
    </div>
  )
}
