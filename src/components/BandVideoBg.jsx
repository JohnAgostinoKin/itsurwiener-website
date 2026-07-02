import { useRef, useEffect, useState } from 'react'
import { useReducedMotion } from 'framer-motion'

/**
 * Full-bleed video background for experience bands and hero sections.
 *
 * Props
 *   src720        MP4 path (720p) — required to show video (quality fallback mode)
 *   src1080       MP4 path (1080p) — optional, tried first (no media query)
 *   srcDesktop    MP4 path served above mobileBreakpoint (media-query mode)
 *   srcMobile     MP4 path served at/below mobileBreakpoint (media-query mode)
 *   poster        Image shown before video loads + on prefers-reduced-motion
 *   posterDesktop Poster used for srcDesktop — falls back to `poster`
 *   posterMobile  Poster used for srcMobile — falls back to `poster`
 *   mobileBreakpoint Max width (px) that counts as mobile — default 767
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
 *
 * srcDesktop/srcMobile pick the active file via JS (window.matchMedia) rather
 * than a <source media="..."> tag — the `media` attribute on <source> is a
 * <picture>-only feature and most browsers ignore it inside <video>, silently
 * failing to switch (or failing to select any source at all).
 */
export default function BandVideoBg({
  src720,
  src1080,
  srcDesktop,
  srcMobile,
  poster,
  posterDesktop,
  posterMobile,
  mobileBreakpoint = 767,
  overlay = 'linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.7))',
  lazy = true,
  videoClassName = '',
  videoStyle = {},
}) {
  const wrapRef  = useRef(null)
  const videoRef = useRef(null)
  const reduced  = useReducedMotion()
  const responsive = !!(srcDesktop || srcMobile)
  const hasVideo = !!(src720 || responsive)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    if (!responsive) return
    const mq = window.matchMedia(`(max-width: ${mobileBreakpoint}px)`)
    const update = () => setIsMobile(mq.matches)
    update()
    mq.addEventListener('change', update)
    return () => mq.removeEventListener('change', update)
  }, [responsive, mobileBreakpoint])

  const activeSrc = responsive ? ((isMobile ? srcMobile : srcDesktop) || srcDesktop || srcMobile) : null
  const activePoster = responsive
    ? (isMobile ? (posterMobile || poster) : (posterDesktop || poster))
    : poster

  useEffect(() => {
    if (!hasVideo || reduced) return
    const v = wrapRef.current   // observe the wrapper div
    const vid = videoRef.current
    if (!v || !vid) return

    // load() re-runs source selection so a mid-session isMobile flip
    // (window resized past mobileBreakpoint) picks up the new <source>.
    const play = () => { vid.load(); vid.play().catch(() => {}) }

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
  }, [lazy, hasVideo, reduced, activeSrc])

  return (
    <div ref={wrapRef} className="absolute inset-0">
      {hasVideo && !reduced ? (
        <video
          ref={videoRef}
          muted loop playsInline
          poster={activePoster}
          preload="none"
          className={`absolute inset-0 w-full h-full object-cover z-0 ${videoClassName}`}
          style={videoStyle}
        >
          {responsive ? (
            activeSrc && <source src={activeSrc} type="video/mp4" />
          ) : (
            <>
              {/* src1080 first so wide-screen clients get higher quality;
                  browser falls back to src720 if the file is absent */}
              {src1080 && <source src={src1080} type="video/mp4" />}
              <source src={src720} type="video/mp4" />
            </>
          )}
        </video>
      ) : activePoster ? (
        <img
          src={activePoster}
          alt=""
          aria-hidden="true"
          className="absolute inset-0 w-full h-full object-cover z-0"
        />
      ) : null}

      <div className="absolute inset-0 z-[1]" style={{ background: overlay }} />
    </div>
  )
}
