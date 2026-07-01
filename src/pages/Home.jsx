import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import PageCTA from '@components/PageCTA'
import { motion, useReducedMotion } from 'framer-motion'
import Ticker from '@components/Ticker'
import CallButton from '@components/CallButton'
import GameDayHero from '@components/GameDayHero'
import { useCounter, useScrollReveal } from '@hooks/useScrollReveal'
import { client } from '@/lib/sanity'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SplitText } from 'gsap/SplitText'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(ScrollTrigger, SplitText, useGSAP)

// ── Shared animation presets ─────────────
const inView = (delay = 0) => ({
  initial:     { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport:    { once: true, margin: '-60px' },
  transition:  { duration: 0.85, delay, ease: [0.16, 1, 0.3, 1] },
})

// ── Weekend date math (shared by marquee) ─
function getWeekendDates() {
  const today = new Date()
  const dow = today.getDay()
  const daysToThursday = dow === 0 ? -3 : 4 - dow
  const thu = new Date(today)
  thu.setDate(today.getDate() + daysToThursday)
  thu.setHours(0, 0, 0, 0)
  const sat = new Date(thu)
  sat.setDate(thu.getDate() + 2)
  sat.setHours(23, 59, 59, 999)
  return { thu, sat }
}

function toISO(d) { return d.toISOString() }

// ── Hero particle canvas ─────────────────
function HeroCanvas() {
  const canvasRef = useRef(null)
  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    let W, H, particles = [], raf
    const resize = () => { W = canvas.width = window.innerWidth; H = canvas.height = window.innerHeight }
    resize()
    window.addEventListener('resize', resize)
    class Particle {
      constructor() { this.reset() }
      reset() {
        this.x = Math.random() * W; this.y = Math.random() * H
        this.size = Math.random() * 2 + 0.5
        this.speedX = (Math.random() - 0.5) * 0.4
        this.speedY = (Math.random() - 0.5) * 0.4
        this.opacity = Math.random() * 0.5 + 0.4
        this.color = Math.random() > 0.7 ? 'rgba(245,101,32,' : 'rgba(157,78,221,'
      }
      update() { this.x += this.speedX; this.y += this.speedY; if (this.x < 0 || this.x > W || this.y < 0 || this.y > H) this.reset() }
      draw() { ctx.beginPath(); ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2); ctx.fillStyle = this.color + this.opacity + ')'; ctx.fill() }
    }
    for (let i = 0; i < 120; i++) particles.push(new Particle())
    const animate = () => {
      ctx.clearRect(0, 0, W, H)
      particles.forEach((p, i) => {
        particles.slice(i + 1).forEach(q => {
          const d = Math.hypot(p.x - q.x, p.y - q.y)
          if (d < 140) { ctx.beginPath(); ctx.moveTo(p.x, p.y); ctx.lineTo(q.x, q.y); ctx.strokeStyle = `rgba(245,101,42,${0.9 * (1 - d / 140)})`; ctx.lineWidth = 0.1; ctx.stroke() }
        })
        p.update(); p.draw()
      })
      raf = requestAnimationFrame(animate)
    }
    animate()
    return () => { cancelAnimationFrame(raf); window.removeEventListener('resize', resize) }
  }, [])
  return <canvas ref={canvasRef} className="absolute inset-0 z-0 pointer-events-none" />
}

// ── Section 1: Animated Wordmark Hero ────
function WordmarkHero() {
  const containerRef = useRef(null)
  const titleRef     = useRef(null)
  const glitchTopRef = useRef(null)
  const glitchBotRef = useRef(null)

  useGSAP(() => {
    if (!titleRef.current) return
    const mm = gsap.matchMedia()

    mm.add('(prefers-reduced-motion: no-preference)', () => {
      const split = new SplitText(titleRef.current, { type: 'chars' })
      const tl = gsap.timeline()

      tl.from('.hero-eyebrow', { opacity: 0, y: 20, duration: 0.5, ease: 'power3.out' }, 0.1)
        .from(split.chars, {
          opacity: 0,
          y: 60,
          stagger: { amount: 0.55 },
          duration: 0.65,
          ease: 'power4.out',
        }, 0.25)
        .from('.hero-tagline', { opacity: 0, y: 20, duration: 0.5, ease: 'power3.out' }, 0.7)
        .from('.hero-scroll', { opacity: 0, y: 10, duration: 0.4, ease: 'power2.out' }, 1.0)

      // Lightning strike — GSAP-controlled real DOM elements, fires after intro
      let strikeCall
      const strike = () => {
        const top = glitchTopRef.current
        const bot = glitchBotRef.current
        if (!top || !bot) return
        gsap.timeline({
          onComplete: () => { strikeCall = gsap.delayedCall(3 + Math.random() * 2.5, strike) },
        })
          .set([top, bot], { opacity: 1 })
          .to(top, { x: -14, duration: 0.04, ease: 'none' }, 0)
          .to(bot, { x:  14, duration: 0.04, ease: 'none' }, 0)
          .to(top, { x:  14, duration: 0.04, ease: 'none' }, 0.04)
          .to(bot, { x: -14, duration: 0.04, ease: 'none' }, 0.04)
          .to(top, { x: -10, duration: 0.04, ease: 'none' }, 0.08)
          .to(bot, { x:  10, duration: 0.04, ease: 'none' }, 0.08)
          .to(top, { x:   8, duration: 0.04, ease: 'none' }, 0.12)
          .to(bot, { x:  -8, duration: 0.04, ease: 'none' }, 0.12)
          .to([top, bot], { opacity: 0, x: 0, duration: 0.06, ease: 'none' }, 0.16)
      }
      strikeCall = gsap.delayedCall(1.8, strike)

      return () => {
        split.revert()
        if (strikeCall) strikeCall.kill()
        gsap.killTweensOf([glitchTopRef.current, glitchBotRef.current])
      }
    })

    mm.add('(prefers-reduced-motion: reduce)', () => {
      gsap.set(['.hero-eyebrow', titleRef.current, '.hero-tagline', '.hero-scroll'], { opacity: 1, y: 0 })
    })
  }, { scope: containerRef })

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex flex-col items-center justify-center bg-[#04030A] overflow-hidden"
      aria-label="itsurwiener — A Clemson Destination"
    >
      <HeroCanvas />

      {/* Scrolling grid */}
      <div
        className="absolute inset-0 z-0 pointer-events-none"
        style={{
          backgroundImage: 'linear-gradient(rgba(245,101,32,0.04) 1px,transparent 1px),linear-gradient(90deg,rgba(245,101,32,0.04) 1px,transparent 1px)',
          backgroundSize: '80px 80px',
          animation: 'gridScroll 20s linear infinite',
        }}
      />
      <div className="absolute inset-0 z-[1] pointer-events-none bg-gradient-to-b from-transparent via-transparent to-[#04030A]" />

      {/* Glow orbs */}
      <div className="absolute top-[-80px] right-[-100px] w-[500px] h-[500px] rounded-full z-0 pointer-events-none"
        style={{ background: 'radial-gradient(circle,rgba(245,101,32,0.15),transparent 70%)', filter: 'blur(80px)' }} />
      <div className="absolute bottom-20 left-[-80px] w-[400px] h-[400px] rounded-full z-0 pointer-events-none"
        style={{ background: 'radial-gradient(circle,rgba(157,78,221,0.10),transparent 70%)', filter: 'blur(80px)' }} />

      {/* Content */}
      <div className="relative z-[2] flex flex-col items-center text-center px-[5vw]">
        <div className="hero-eyebrow flex items-center gap-4 font-ui text-[11px] font-bold tracking-[.28em] uppercase text-orange mb-8">
          <span className="w-8 h-0.5 bg-orange" />
          A Clemson Destination
          <span className="w-8 h-0.5 bg-orange" />
        </div>

        <div className="relative">
          <h1
            ref={titleRef}
            className="font-display text-[clamp(64px,17vw,240px)] leading-[.85] text-white uppercase"
            style={{ letterSpacing: '-0.01em' }}
          >
            ITSURWIENER
          </h1>
          {/* Lightning strike overlays — GSAP-animated, always start hidden */}
          <span
            ref={glitchTopRef}
            aria-hidden="true"
            className="font-display text-[clamp(64px,17vw,240px)] leading-[.85] uppercase absolute inset-0 select-none pointer-events-none"
            style={{
              color: '#FF7A30',
              clipPath: 'polygon(0 0, 100% 0, 100% 33%, 0 33%)',
              opacity: 0,
              letterSpacing: '-0.01em',
              textShadow: '0 0 20px rgba(255,122,48,0.95), 0 0 50px rgba(255,122,48,0.5)',
            }}
          >ITSURWIENER</span>
          <span
            ref={glitchBotRef}
            aria-hidden="true"
            className="font-display text-[clamp(64px,17vw,240px)] leading-[.85] uppercase absolute inset-0 select-none pointer-events-none"
            style={{
              color: '#C46EFF',
              clipPath: 'polygon(0 67%, 100% 67%, 100% 100%, 0 100%)',
              opacity: 0,
              letterSpacing: '-0.01em',
              textShadow: '0 0 20px rgba(196,110,255,0.95), 0 0 50px rgba(196,110,255,0.5)',
            }}
          >ITSURWIENER</span>
        </div>

        <p className="hero-tagline font-display text-[clamp(20px,3vw,44px)] text-orange tracking-[0.04em] mt-6">
          The Home of The Litcher<sup style={{ fontSize: '0.38em', verticalAlign: 'super', lineHeight: 0 }}>®</sup>
        </p>
      </div>

      {/* Scroll cue */}
      <div className="hero-scroll absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3">
        <span className="font-ui text-[9px] tracking-[.32em] uppercase text-cream/30">Discover</span>
        <div className="w-px h-12 bg-gradient-to-b from-orange/50 to-transparent" />
        <div className="w-1.5 h-1.5 rounded-full bg-orange animate-bounce" />
      </div>

      <style>{`@keyframes gridScroll{0%{transform:translateY(0)}100%{transform:translateY(80px)}}`}</style>
    </section>
  )
}

// ── Band 3 helper: live event/specials marquee ─
function ThisWeekendMarquee() {
  const [items, setItems] = useState([])
  const prefersReducedMotion = useReducedMotion()

  useEffect(() => {
    const { thu, sat } = getWeekendDates()

    Promise.all([
      client.fetch(
        `*[_type == "weekendEvent" && date >= $start && date <= $end] | order(date asc) { title }`,
        { start: toISO(thu), end: toISO(sat) }
      ).catch(() => []),
      client.fetch(`*[_type == "weeklySpecials"][0] { days }`).catch(() => null),
    ]).then(([events, specials]) => {
      const eventTitles = (events || []).map(e => e.title)
      const specialItems = (specials?.days || [])
        .filter(d => ['thu', 'fri', 'sat'].includes(d.day))
        .flatMap(d => d.items || [])
      const all = [...eventTitles, ...specialItems]
      setItems(
        all.length > 0
          ? all
          : ['Live Music Every Weekend', '$1 Mimosas', 'Gameday Brunch', 'Late Night Kitchen', 'The Litcher®', 'The Basement']
      )
    })
  }, [])

  if (items.length === 0) return null

  const doubled = [...items, ...items, ...items]

  return (
    <div
      className="overflow-hidden border-t border-b border-white/10 py-3 mt-5 mb-7"
      aria-label="This weekend's highlights"
    >
      <div
        className="inline-flex whitespace-nowrap"
        style={{ animation: prefersReducedMotion ? 'none' : 'ticker 28s linear infinite' }}
      >
        {doubled.map((item, i) => (
          <span
            key={i}
            className="font-cond text-[clamp(13px,1.4vw,18px)] font-bold text-cream/65 tracking-[.06em] uppercase inline-flex items-center px-6"
          >
            {item}
            <span className="ml-6 text-orange opacity-50">✦</span>
          </span>
        ))}
      </div>
    </div>
  )
}

// ── Section 2: Three Full-Bleed Experience Bands ─
function ExperienceBands() {
  const ref = useRef(null)
  const prefersReducedMotion = useReducedMotion()

  useGSAP(() => {
    const mm = gsap.matchMedia()

    mm.add('(prefers-reduced-motion: no-preference)', () => {
      // Scroll-in reveal for each band's text content
      gsap.utils.toArray('.band-content').forEach(content => {
        gsap.from(content, {
          scrollTrigger: {
            trigger: content.closest('.exp-band'),
            start: 'top 72%',
            toggleActions: 'play none none none',
          },
          opacity: 0,
          y: 50,
          duration: 0.9,
          ease: 'power3.out',
        })
      })

      // Basement parallax: bg drifts slower than scroll
      gsap.to('.basement-vid', {
        scrollTrigger: {
          trigger: '.basement-band',
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1.5,
        },
        yPercent: -18,
        ease: 'none',
      })
    })
  }, { scope: ref })

  return (
    <div ref={ref}>

      {/* Band 1 — Sports Bar (orange world) */}
      <Link
        to="/sports-bar"
        className="exp-band relative overflow-hidden focus:outline-none focus-visible:ring-2 focus-visible:ring-orange"
        style={{ height: '80vh', display: 'block' }}
        aria-label="The Wien Sports Bar & Grill — Watch the game upstairs"
      >
        {/* TODO: set VITE_SPORTS_BAR_VIDEO_URL to your Mux/Cloudflare Stream URL */}
        <video
          autoPlay muted loop playsInline
          poster="/images/sports-bar.jpg"
          className="absolute inset-0 w-full h-full object-cover"
          preload="none"
        >
          {import.meta.env.VITE_SPORTS_BAR_VIDEO_URL && (
            <source src={import.meta.env.VITE_SPORTS_BAR_VIDEO_URL} type="video/mp4" />
          )}
        </video>
        <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/55 to-black/10" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />

        <div className="band-content absolute inset-0 flex flex-col justify-end p-[5vw] pb-[8vh]">
          <div className="font-ui text-[10px] font-bold tracking-[.34em] uppercase text-orange mb-4">Upstairs</div>
          <h2 className="font-display text-[clamp(44px,9vw,120px)] leading-[.85] text-white mb-3">
            The Wien —<br />Sports Bar &amp; Grill
          </h2>
          <p className="font-cond text-[clamp(14px,1.7vw,22px)] text-cream/65 mb-7 tracking-wide max-w-[500px]">
            25 big screens · game-day brunch · The Litcher®
          </p>
          <span className="inline-block font-ui text-[11px] font-bold tracking-[.22em] uppercase bg-orange text-black px-7 py-3.5 hover:bg-white transition-colors duration-200 w-fit">
            Watch the Game →
          </span>
        </div>
      </Link>

      {/* Band 2 — The Basement (purple world, neon glow, parallax) */}
      <Link
        to="/the-basement"
        className="exp-band basement-band relative overflow-hidden focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-bright"
        style={{ height: '80vh', display: 'block' }}
        aria-label="The Basement Dance & Nightclub — See what's on downstairs"
      >
        {/* TODO: set VITE_BASEMENT_VIDEO_URL to your Mux/Cloudflare Stream URL */}
        <video
          autoPlay muted loop playsInline
          poster="/images/basement.jpg"
          className="basement-vid absolute inset-0 w-full h-full object-cover"
          style={{ transform: 'scale(1.25)', willChange: 'transform', transformOrigin: 'center center' }}
          preload="none"
        >
          {import.meta.env.VITE_BASEMENT_VIDEO_URL && (
            <source src={import.meta.env.VITE_BASEMENT_VIDEO_URL} type="video/mp4" />
          )}
        </video>
        <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/55 to-black/10" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
        <div
          className="absolute bottom-0 left-0 w-full h-1/2 pointer-events-none"
          style={{ background: 'linear-gradient(to top, rgba(82,45,128,0.3), transparent)' }}
        />

        <div className="band-content absolute inset-0 flex flex-col justify-end p-[5vw] pb-[8vh]">
          <div className="font-ui text-[10px] font-bold tracking-[.34em] uppercase text-purple-bright mb-4">Downstairs</div>
          <h2
            className="font-display text-[clamp(44px,9vw,120px)] leading-[.85] text-white mb-3"
            style={{
              textShadow: '0 0 30px rgba(157,78,221,0.55), 0 0 60px rgba(157,78,221,0.25)',
              animation: prefersReducedMotion ? 'none' : 'neonFlicker 7s ease-in-out infinite',
            }}
          >
            The Basement —<br />Dance &amp; Nightclub
          </h2>
          <p className="font-cond text-[clamp(14px,1.7vw,22px)] text-cream/65 mb-7 tracking-wide max-w-[500px]">
            Live music · DJs · second 12-ft LED wall · late-night
          </p>
          <span className="inline-block font-ui text-[11px] font-bold tracking-[.22em] uppercase bg-purple-bright text-white px-7 py-3.5 hover:bg-white hover:text-black transition-colors duration-200 w-fit">
            See What's On →
          </span>
        </div>
      </Link>

      {/* Band 3 — This Weekend (orange→purple gradient world, live marquee) */}
      <Link
        to="/this-weekend"
        className="exp-band relative overflow-hidden focus:outline-none focus-visible:ring-2 focus-visible:ring-orange"
        style={{ height: '80vh', display: 'block' }}
        aria-label="The Wien Is The Weekend — Plan your weekend"
      >
        <div
          className="absolute inset-0"
          style={{ background: 'radial-gradient(ellipse 80% 60% at 15% 50%, rgba(245,101,32,0.14), transparent 60%), radial-gradient(ellipse 80% 60% at 85% 50%, rgba(82,45,128,0.22), transparent 60%), #04030A' }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />

        {/* TODO: set VITE_WEEKEND_VIDEO_URL to your Mux/Cloudflare Stream URL */}
        {import.meta.env.VITE_WEEKEND_VIDEO_URL && (
          <video
            autoPlay muted loop playsInline
            className="absolute inset-0 w-full h-full object-cover opacity-30"
            preload="none"
          >
            <source src={import.meta.env.VITE_WEEKEND_VIDEO_URL} type="video/mp4" />
          </video>
        )}

        <div className="band-content absolute inset-0 flex flex-col justify-end p-[5vw] pb-[8vh]">
          <div className="font-ui text-[10px] font-bold tracking-[.34em] uppercase flex items-center gap-2.5 mb-4" style={{ color: '#F56520' }}>
            <span className="w-2 h-2 rounded-full bg-orange inline-block animate-pulse" />
            This Weekend
          </div>
          <h2 className="font-display text-[clamp(44px,9vw,120px)] leading-[.85] text-white mb-0">
            The Wien Is<br />The Weekend
          </h2>

          <ThisWeekendMarquee />

          <span className="inline-block font-ui text-[11px] font-bold tracking-[.22em] uppercase border border-white/30 text-white px-7 py-3.5 hover:bg-white hover:text-black transition-all duration-200 w-fit">
            Plan Your Weekend →
          </span>
        </div>
      </Link>
    </div>
  )
}

// ── The Venue ─────────────────────────────
function Complex() {
  return (
    <section id="chaos" className="bg-[#08060F] pt-[100px] pb-[110px] px-[5vw]">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <motion.div {...inView(0)}>
          <div className="flex items-center gap-3 font-ui text-[11px] font-bold tracking-[.28em] uppercase text-orange mb-4">
            <span className="w-6 h-0.5 bg-orange" />The Venue
          </div>
          <div className="font-display text-[clamp(48px,7vw,88px)] leading-[.88] text-white mb-6">
            More than a restaurant.<br />More than a bar.<br />
            <span className="text-orange">it's</span> <span className="text-orange">Clemson's</span><br />
            <span className="text-purple-bright" style={{ textShadow: '0 0 20px #9D4EDD,0 0 40px rgba(157,78,221,0.3)', animation: 'neonPulse 2.5s ease-in-out infinite' }}>wildest ride!</span>
          </div>
          <p className="text-[15px] text-cream/75 leading-[1.85] max-w-[540px]">
            One address, four distinct spaces. Restaurant and Sports Bar on the top level, The Basement Nightclub below. Two covered patios, huge deck and turf area, two 12-ft LED Walls, two outdoor bars, great food, huge drinks — there's nothing else like it in this town!
          </p>
        </motion.div>
        <motion.div className="relative overflow-hidden" style={{ aspectRatio: '4/3' }} {...inView(0.15)}>
          <img src="/images/venue-exterior.jpg" alt="itsurwiener — Clemson, SC" className="w-full h-full object-cover hover:scale-[1.04] transition-transform duration-700" style={{ objectPosition: 'center top' }} />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
          <div className="absolute bottom-4 left-4 font-display text-[22px] text-white">Clemson, SC</div>
        </motion.div>
      </div>
    </section>
  )
}

// ── Game Day ──────────────────────────────
function GameDay() {
  const features = [
    { icon: '📺', name: '25 TVs Everywhere',            desc: 'You will never miss a play from any seat in the house' },
    { icon: '🎬', name: 'Two 12-FT LED Walls',           desc: 'One inside and one outside. Take your pick, but come early for best seats.' },
    { icon: '🥂', name: '$1 Mimosas Every Gameday',      desc: '$1 Mimosas and $2 Jumbo Mimosas every gameday while they last!' },
    { icon: '🍔', name: 'Gameday Food & Drink Specials', desc: 'Crazy food and drink deals every gameday.' },
    { icon: '🎵', name: 'Live Music in The Basement',    desc: 'Live music in The Basement before or after the game.' },
    { icon: '🕙', name: 'Open Early on Gamedays',        desc: 'Open at 10AM on gamedays.' },
  ]
  return (
    <section id="gameday" className="p-0 pb-16">
      <div className="grid grid-cols-1 lg:grid-cols-2">
        <motion.div className="bg-orange flex flex-col justify-center px-[60px] py-[80px] relative overflow-hidden" {...inView(0)}>
          <div className="absolute bottom-[-60px] right-[-60px] font-display text-[380px] text-black/10 leading-none pointer-events-none select-none hidden md:block">🏈</div>
          <div className="font-ui text-[11px] font-bold tracking-[.25em] uppercase bg-black text-orange inline-block px-4 py-2 mb-7 clip-angled-sm w-fit">Go Tigers!</div>
          <h2 className="font-display text-[clamp(64px,9vw,130px)] leading-[.85] text-black mb-6">Game Day<br />Done Right.</h2>
          <p className="text-[15px] max-w-[400px] leading-[1.8] mb-9" style={{ color: 'rgba(253,252,248,0.92)' }}>There's no better place to watch the game — and it's not even close. Clemson's legendary sports bar loaded with LED walls, big screens, and full surround sound puts you as close to Death Valley as you can get without a ticket.<br />$1 Mimosas, $2 Wien Beer Tall Boys, Gameday Brunch, and the best fans in college football.<br />

But itsurwiener isn't just a place to watch — it's a place to be. One address. One decision. No better place.<br />GO TIGERS!</p>
          <Link to="/game-day" className="font-ui text-[12px] font-bold tracking-[.15em] uppercase bg-black text-orange px-7 py-3.5 no-underline w-fit hover:bg-white hover:text-black transition-colors duration-200">See the Experience →</Link>
        </motion.div>
        <motion.div className="bg-[#08060F] flex flex-col h-full justify-between" {...inView(0.1)}>
          {features.map(({ icon, name, desc }) => (
            <div key={name} className="flex items-center gap-5 px-10 py-0 border-b border-orange/[0.08] last:border-b-0 hover:bg-orange/[0.04] transition-colors duration-200 flex-1 min-h-0">
              <span className="text-[22px] mt-1 flex-shrink-0">{icon}</span>
              <div>
                <div className="font-cond text-[18px] font-black text-white uppercase tracking-wide mb-0.5">{name}</div>
                <div className="text-[12px] text-cream/75 leading-relaxed">{desc}</div>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

// ── The Litcher® ──────────────────────────
function LitcherSection() {
  const [ref, visible] = useScrollReveal(0.4)
  const count = useCounter(60000, 2200, visible)
  return (
    <section id="litcher" className="bg-[#08060F] py-[80px] relative overflow-hidden px-[5vw]">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-display pointer-events-none select-none z-0" style={{ fontSize: '28vw', color: 'rgba(245,101,32,0.025)', whiteSpace: 'nowrap', lineHeight: 1 }}>LITCHER</div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 relative z-[1]">
        <motion.div {...inView(0)}>
          <div className="flex items-center gap-3 font-ui text-[11px] font-bold tracking-[.28em] uppercase text-orange mb-3"><span className="w-6 h-0.5 bg-orange" />Famous Litchers</div>
          <h2 className="font-display text-[clamp(60px,9vw,130px)] leading-[.88] text-white mb-4">
            Home of The<br /><span className="relative inline-block text-orange">Litcher<sup style={{ position: 'absolute', top: '-0.05em', right: '-0.28em', fontSize: '0.15em', fontFamily: 'Space Grotesk,sans-serif', fontWeight: 700, color: 'rgba(245,101,32,0.8)', lineHeight: 1 }}>®</sup></span>
          </h2>
          <p className="text-[15px] text-cream/75 leading-[1.85] mb-5 max-w-[440px]">
            There's nothing like it! 48 ounces of pure refreshment in an oversized vessel that shows you mean business and gives you more time for fun instead of waiting in line for another drink. It's a Clemson tradition!
          </p>
          <div className="border border-orange/20 px-6 py-3 mb-5 flex items-center justify-center gap-4 w-full max-w-[440px]" style={{ background: 'rgba(245,101,32,0.05)' }}>
            <span className="font-display text-[28px] text-orange leading-none">60,000+</span>
            <span className="font-ui text-[12px] text-cream/70 uppercase tracking-[.12em]">Sold Each Year</span>
          </div>
          <Link to="/the-litcher" className="font-ui text-[12px] font-bold tracking-[.18em] uppercase bg-orange text-black px-10 py-4 no-underline clip-angled hover:bg-white transition-colors duration-200 inline-block">Learn More →</Link>
        </motion.div>
        <motion.div className="relative overflow-hidden" style={{ minHeight: '320px', height: '100%' }} {...inView(0.15)}>
          <img src="/images/litchers.jpg" alt="The Litcher — itsurwiener" className="w-full h-full object-cover" style={{ position: 'absolute', inset: 0, minHeight: '320px' }} />
          <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(8,6,15,0.7) 0%, transparent 50%)' }} />
          <div className="absolute bottom-6 left-6">
            <div className="font-display text-[28px] text-white leading-none">The Litcher<sup style={{ fontSize: '0.35em', verticalAlign: 'super' }}>®</sup></div>
            <div className="font-ui text-[11px] tracking-[.15em] uppercase text-orange/80 mt-1">Clemson's Signature Drink</div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

// ── The Basement ──────────────────────────
function BasementSection() {
  const features = ['Professional Stage', 'Dance Floor', 'Full Sound Rig', '12-Ft LED Wall', 'Full Bar', 'VIP Section w/ Private Bartender', 'Available for Private Functions and Events']
  return (
    <section id="basement" className="relative min-h-screen flex items-center justify-center overflow-hidden py-[120px] px-[5vw]">
      <div className="absolute inset-0 z-0" style={{ background: 'radial-gradient(ellipse 60% 70% at 50% 40%,#1a004d,#04030A)' }} />
      {[{ left: '20%', h: '65%', c: 'rgba(157,78,221,0.55)', d: '0s' }, { left: '40%', h: '80%', c: 'rgba(245,101,32,0.45)', d: '-1.3s' }, { left: '60%', h: '55%', c: 'rgba(0,245,212,0.35)', d: '-2.6s' }, { left: '80%', h: '70%', c: 'rgba(255,229,102,0.35)', d: '-0.8s' }].map((b, i) => (
        <div key={i} className="absolute top-0 w-[3px] z-[1] pointer-events-none" style={{ left: b.left, height: b.h, background: `linear-gradient(to bottom,transparent,${b.c},transparent)`, transformOrigin: 'top center', animation: `beamSweep 4s ease-in-out infinite`, animationDelay: b.d }} />
      ))}
      {Array.from({ length: 20 }).map((_, i) => (
        <div key={i} className="absolute rounded-full z-[1] pointer-events-none" style={{ width: `${(i % 3) + 2}px`, height: `${(i % 3) + 2}px`, left: `${i * 5}%`, background: ['rgba(157,78,221,0.6)', 'rgba(245,101,32,0.5)', 'rgba(0,245,212,0.4)'][i % 3], animation: `particleFloat ${(i % 4) + 6}s linear infinite`, animationDelay: `${i * 0.3}s` }} />
      ))}
      <motion.div className="relative z-[2] text-center max-w-[800px]" {...inView(0)}>
        <div className="font-ui text-[12px] font-bold tracking-[.2em] uppercase text-purple-bright/80 mb-4">If You Know . . . You Know!</div>
        <div className="font-display leading-[.85]">
          <span className="block text-[clamp(70px,16vw,220px)] text-white">THE</span>
          <span className="block text-[clamp(70px,16vw,220px)] text-purple-bright" style={{ textShadow: '0 0 40px rgba(157,78,221,0.6),0 0 80px rgba(157,78,221,0.3)' }}>BASEMENT</span>
        </div>
        <div className="font-display text-[clamp(20px,2.5vw,32px)] text-white/80 mt-4 mb-0 tracking-wide">Live Music Every Weekend</div>
        <div className="mx-auto my-6 h-[2px] bg-purple-bright" style={{ animation: 'lineGlow 2s ease-in-out infinite', width: '80px' }} />
        <div className="flex flex-wrap justify-center gap-3 mb-8">
          {features.map(f => <span key={f} className="font-ui text-[11px] font-medium tracking-[.15em] uppercase border border-purple-bright/30 px-5 py-2.5 text-cream/60 hover:border-purple-bright hover:text-purple-bright transition-all duration-200">{f}</span>)}
        </div>
        <div className="flex gap-4 justify-center flex-wrap">
          <a href="/book-event" className="font-ui text-[12px] font-bold tracking-[.18em] uppercase bg-purple-bright text-white px-11 py-4 no-underline hover:bg-[#B85EFF] transition-colors duration-200">BOOK NOW!</a>
          <Link to="/the-basement" className="font-ui text-[12px] font-bold tracking-[.18em] uppercase border border-purple-bright/35 text-cream/60 px-11 py-4 no-underline hover:border-purple-bright hover:text-purple-bright transition-all duration-200">Learn More</Link>
        </div>
      </motion.div>
      <style>{`@keyframes lineGlow{0%,100%{box-shadow:0 0 8px #9D4EDD;width:80px}50%{box-shadow:0 0 24px #9D4EDD;width:120px}}`}</style>
    </section>
  )
}

// ── The Destination ───────────────────────
function VenuesGrid() {
  const venues = [
    { num: '01', tag: 'Upper Level', title: 'Restaurant & Sports Bar', desc: '25 TVs · Full Bar · Great Food · Game Day HQ',             bg: '/images/sports-bar.jpg' },
    { num: '02', tag: 'Lower Level', title: 'The Basement Nightclub',  desc: 'Live Music · Stage · Sound · Lights · 12-Ft LED Wall · VIP', bg: '/images/basement.jpg' },
    { num: '03', tag: 'Outdoor',     title: 'Covered Patios',          desc: 'Two covered all-weather patios · Outdoor bars',              bg: '/images/covered-patios.jpg' },
    { num: '04', tag: 'Outdoor',     title: 'Deck, Turf & LED Wall',   desc: 'Huge open deck · Artificial turf · 12-Ft LED Wall',          bg: '/images/outdoor-screen.jpg' },
  ]
  return (
    <section id="venues" className="bg-[#0E0B18] py-[100px] px-[5vw]">
      <motion.div className="flex items-end justify-between mb-14 flex-wrap gap-6" {...inView(0)}>
        <div>
          <div className="flex items-center gap-3 font-ui text-[11px] font-bold tracking-[.28em] uppercase text-orange mb-3"><span className="w-6 h-0.5 bg-orange" />The Destination</div>
          <h2 className="font-display text-[clamp(52px,8vw,100px)] leading-[.88] text-white">One Address.<br />Four Distinct Spaces.</h2>
        </div>
        <Link to="/venues" className="font-ui text-[12px] font-bold tracking-[.18em] uppercase border border-orange/40 text-cream px-8 py-4 no-underline hover:border-orange hover:text-orange transition-all duration-200">Explore All</Link>
      </motion.div>
      <motion.div className="grid grid-cols-1 sm:grid-cols-2 gap-4" {...inView(0.1)}>
        {venues.map(({ num, tag, title, desc, bg }) => (
          <div key={num} className="relative border border-orange/10 hover:border-orange/30 transition-colors duration-300 overflow-hidden" style={{ aspectRatio: '3/4', background: bg ? `url(${bg}) center/cover no-repeat` : '#08060F' }}>
            {bg && <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />}
            <div className="absolute inset-0 p-6 flex flex-col justify-between">
              <div className="flex items-center justify-between">
                <span className="font-ui text-[9px] font-bold tracking-[.2em] uppercase bg-orange text-black px-3 py-1">{tag}</span>
                <span className="font-display text-[40px] text-orange/20 leading-none">{num}</span>
              </div>
              <div>
                <h3 className="font-display text-[clamp(26px,3vw,40px)] text-white leading-none mb-2">{title}</h3>
                <p className="font-ui text-[12px] text-cream/60 tracking-wide">{desc}</p>
              </div>
            </div>
          </div>
        ))}
      </motion.div>
    </section>
  )
}

// ── Damn Good Beer ────────────────────────
function Beer() {
  return (
    <section id="beer" className="py-[100px] px-[5vw] relative overflow-hidden" style={{ background: 'linear-gradient(135deg,#0e0800,#1a0e00,#0e0800)' }}>
      <motion.div className="flex flex-col lg:flex-row gap-8 border border-orange/15 p-12 items-stretch" {...inView(0)} style={{ minHeight: '500px' }}>
        <div className="flex items-center justify-center lg:w-[20%] flex-shrink-0">
          <img src="/images/beer.png" alt="Damn Good Beer" style={{ height: '480px', width: 'auto', display: 'block', objectFit: 'contain' }} />
        </div>
        <div className="lg:w-[50%] flex flex-col justify-center">
          <div className="flex items-center gap-3 font-ui text-[11px] font-bold tracking-[.28em] uppercase text-orange mb-3">
            <span className="w-6 h-0.5 bg-orange" />House Beer
          </div>
          <h2 className="font-display text-[clamp(52px,8vw,100px)] leading-[.88] text-white mb-3">
            <span className="text-orange">Damn</span><br />Good Beer
          </h2>
          <div className="font-cond text-[17px] font-bold tracking-[.15em] uppercase text-cream/40 mb-5">
            Clemson Lager · 4.5% ABV · 16 OZ
          </div>
          <p className="text-[15px] text-cream/75 leading-[1.8] mb-7">
            Our beer. Brewed for Clemson. Sold only here. Pair it with the Litcher<sup style={{ fontSize: '0.38em', verticalAlign: 'super', lineHeight: 0 }}>®</sup> or let it stand alone. Either way: it's damn good.
          </p>
          <div className="font-display text-[clamp(36px,5vw,72px)] text-orange leading-none">
            $2 Tall Boys — Always!
          </div>
        </div>
        <div className="lg:w-[30%] flex-shrink-0 relative overflow-hidden border border-orange/20" style={{ minHeight: '400px' }}>
          <video autoPlay muted loop playsInline style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }}>
            <source src="/images/videos/beer.mp4" type="video/mp4" />
          </video>
        </div>
      </motion.div>
    </section>
  )
}

// ── Merch Section ─────────────────────────
function MerchSection() {
  return (
    <section id="merch" className="bg-[#08060F] py-[100px] px-[5vw]">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <motion.div className="relative overflow-hidden" style={{ aspectRatio: '7/5' }} {...inView(0)}>
          <img src="/images/merch.jpg" alt="itsurwiener Merch" className="w-full h-full object-cover hover:scale-[1.03] transition-transform duration-700" />
          <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[#08060F]/60" />
        </motion.div>
        <motion.div {...inView(0.15)}>
          <div className="flex items-center gap-3 font-ui text-[11px] font-bold tracking-[.28em] uppercase text-orange mb-4">
            <span className="w-6 h-0.5 bg-orange" />Rep The Wien
          </div>
          <h2 className="font-display text-[clamp(48px,7vw,96px)] leading-[.88] text-white mb-5">
            Shop Official<br /><span className="text-orange">Wien Merch</span>
          </h2>
          <p className="text-[15px] text-cream/75 leading-[1.85] max-w-[460px] mb-8">
            Make a fashion statement with itsurwiener T-Shirts, Sweatshirts, Hats and more! We feature quality "Comfort Colors" apparel.
          </p>
          <Link to="/merch" className="font-ui text-[12px] font-bold tracking-[.18em] uppercase bg-orange text-black px-10 py-4 no-underline clip-angled hover:bg-white transition-colors duration-200 inline-block">
            Shop Now!
          </Link>
        </motion.div>
      </div>
    </section>
  )
}

// ── Eats Section ──────────────────────────
function EatsSection() {
  const foods = [
    { src: '/images/burger.jpg',  label: 'Hand-Formed Burgers',    rotate: '-6deg', z: 10 },
    { src: '/images/tenders.jpg', label: "Clemson's Best Tenders", rotate: '0deg',  z: 20 },
    { src: '/images/fries.jpg',   label: 'Fresh-Cut Fries',        rotate: '6deg',  z: 10 },
  ]
  return (
    <section id="eats" className="bg-[#04030A] py-[100px] px-[5vw] overflow-hidden">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <motion.div {...inView(0)}>
          <div className="flex items-center gap-3 font-ui text-[11px] font-bold tracking-[.28em] uppercase text-orange mb-4">
            <span className="w-6 h-0.5 bg-orange" />The Food
          </div>
          <h2 className="font-display text-[clamp(40px,6vw,80px)] leading-[.9] text-white mb-6">
            Gameday and Everyday . . .<br />
            <span className="text-orange">Best Eats in Town.</span>
          </h2>
          <p className="text-[15px] text-cream/75 leading-[1.85] max-w-[480px] mb-10">
            All-Beef Dogs, fresh Hand-Formed Burgers, Clemson's Best Chicken Tenders, Fresh-Cut Fries, over 100 Toppings and much more. Kitchen open late, too!
          </p>
          <div className="flex gap-4 flex-wrap">
            <Link to="/menu" className="font-ui text-[12px] font-bold tracking-[.18em] uppercase bg-orange text-black px-10 py-4 no-underline clip-angled hover:bg-white transition-colors duration-200">
              See Full Menu
            </Link>
            <a href="https://www.doordash.com/store/itsurwiener-restaurant-and-bar-clemson-475097/12786218/" target="_blank" rel="noreferrer" className="font-ui text-[12px] font-bold tracking-[.18em] uppercase border border-orange/40 text-cream px-10 py-4 no-underline hover:border-orange hover:text-orange transition-all duration-200">
              Order Online
            </a>
          </div>
        </motion.div>
        {/* Mobile */}
        <motion.div className="grid grid-cols-3 gap-3 lg:hidden" {...inView(0.15)}>
          {foods.map(({ src, label }) => (
            <div key={label} className="relative overflow-hidden border-2 border-white/10" style={{ aspectRatio: '1/1' }}>
              <img src={src} alt={label} className="w-full h-full object-cover" />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-2">
                <span className="font-display text-[12px] text-white leading-tight">{label}</span>
              </div>
            </div>
          ))}
        </motion.div>
        {/* Desktop */}
        <motion.div className="relative hidden lg:flex items-center justify-center" style={{ height: '520px' }} {...inView(0.15)}>
          {foods.map(({ src, label, rotate, z }, i) => (
            <div key={label} className="absolute shadow-2xl overflow-hidden border-4 border-white/10 hover:z-30 hover:scale-105 transition-transform duration-300"
              style={{ width: '240px', transform: `rotate(${rotate}) translateX(${(i - 1) * 260}px)`, zIndex: z, aspectRatio: '1/1' }}>
              <img src={src} alt={label} className="w-full h-full object-cover" />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-3">
                <span className="font-display text-[16px] text-white">{label}</span>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

// ── Events CTA ────────────────────────────
function EventsCTA() {
  const types = [
    { icon: '🏢', label: 'Corporate & Company Events' },
    { icon: '🎓', label: 'Alumni Gatherings' },
    { icon: '🎉', label: 'Birthday & Milestone Parties' },
    { icon: '🏈', label: 'Game Day Group Reservations' },
    { icon: '🎸', label: 'Concerts & Live Events' },
    { icon: '🔒', label: 'Full Venue Buyouts' },
  ]
  return (
    <section id="events-cta" className="bg-[#0E0B18] py-[100px] px-[5vw]" style={{ scrollMarginTop: '80px' }}>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
        <motion.div {...inView(0)}>
          <div className="flex items-center gap-3 font-ui text-[11px] font-bold tracking-[.28em] uppercase text-orange mb-3"><span className="w-6 h-0.5 bg-orange" />Private Events</div>
          <h2 className="font-display text-[clamp(52px,8vw,100px)] leading-[.88] text-white mb-5">Your Night.<br />Our Stage.</h2>
          <p className="text-[15px] text-cream/75 leading-[1.85] mb-5 max-w-[440px]">From game day group reservations to full venue buyouts — itsurwiener hosts events that need a venue with real range.</p>
          <div className="flex flex-col gap-0 border border-orange/10">
            {types.map(({ icon, label }) => (
              <div key={label} className="flex items-center gap-4 px-6 py-5 border-b border-orange/[0.06] last:border-b-0 hover:bg-orange/[0.04] hover:pl-9 transition-all duration-300 group relative">
                <div className="absolute left-0 top-0 w-0 h-full bg-orange transition-all duration-300 group-hover:w-[3px]" />
                <span className="text-[20px]">{icon}</span>
                <span className="font-cond text-[17px] font-bold uppercase tracking-wide text-cream">{label}</span>
                <span className="ml-auto text-orange opacity-0 group-hover:opacity-100 transition-opacity duration-200">→</span>
              </div>
            ))}
          </div>
        </motion.div>
        <motion.div {...inView(0.15)}>
          <div className="bg-[#08060F] border border-orange/15 p-10">
            <h3 className="font-display text-[48px] leading-[.88] text-white mb-8">Start Your<br /><span className="text-orange">Event.</span></h3>
            <form onSubmit={e => { e.preventDefault(); alert("We'll be in touch! 🎉") }} className="flex flex-col gap-4">
              <div className="grid grid-cols-2 gap-4">
                <div><label className="font-ui text-[9px] font-bold tracking-[.22em] uppercase text-orange/60 block mb-2">Name</label><input className="w-full bg-orange/[0.04] border border-orange/12 text-cream font-ui text-[14px] px-4 py-3.5 outline-none focus:border-orange transition-colors placeholder:text-cream/20" placeholder="Your name" required /></div>
                <div><label className="font-ui text-[9px] font-bold tracking-[.22em] uppercase text-orange/60 block mb-2">Phone</label><input className="w-full bg-orange/[0.04] border border-orange/12 text-cream font-ui text-[14px] px-4 py-3.5 outline-none focus:border-orange transition-colors placeholder:text-cream/20" placeholder="(864) 000-0000" type="tel" /></div>
              </div>
              <div><label className="font-ui text-[9px] font-bold tracking-[.22em] uppercase text-orange/60 block mb-2">Email</label><input className="w-full bg-orange/[0.04] border border-orange/12 text-cream font-ui text-[14px] px-4 py-3.5 outline-none focus:border-orange transition-colors placeholder:text-cream/20" placeholder="your@email.com" type="email" required /></div>
              <div className="grid grid-cols-2 gap-4">
                <div><label className="font-ui text-[9px] font-bold tracking-[.22em] uppercase text-orange/60 block mb-2">Event Date</label><input className="w-full bg-orange/[0.04] border border-orange/12 text-cream font-ui text-[14px] px-4 py-3.5 outline-none focus:border-orange transition-colors" type="date" /></div>
                <div><label className="font-ui text-[9px] font-bold tracking-[.22em] uppercase text-orange/60 block mb-2">Guest Count</label>
                  <select className="w-full bg-orange/[0.04] border border-orange/12 text-cream font-ui text-[14px] px-4 py-3.5 outline-none focus:border-orange transition-colors"><option value="">Estimate</option><option>Under 25</option><option>25–75</option><option>75–150</option><option>150–300</option><option>300+</option></select>
                </div>
              </div>
              <div><label className="font-ui text-[9px] font-bold tracking-[.22em] uppercase text-orange/60 block mb-2">Tell Us About Your Event</label><textarea className="w-full bg-orange/[0.04] border border-orange/12 text-cream font-ui text-[14px] px-4 py-3.5 outline-none focus:border-orange transition-colors placeholder:text-cream/20 h-24 resize-y" placeholder="What are you planning? We'll make it happen." /></div>
              <button type="submit" className="w-full bg-orange text-black font-ui text-[13px] font-bold tracking-[.2em] uppercase py-4 border-0 hover:bg-white transition-colors duration-200 clip-angled">Send It →</button>
            </form>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

// ── Find Us ───────────────────────────────
function FindUs() {
  const items = [
    { icon: '📍', label: 'Address', value: '101 Keith Street, Clemson, SC 29631', sub: 'Downtown Clemson · Home of Clemson University' },
    { icon: '🕐', label: 'Hours',   value: 'Wed 4PM–12AM · Thu–Sat 11AM–2AM', sub: 'Kitchen open late' },
    { icon: '📞', label: 'Phone',   value: '(864) 722-5001', href: 'tel:8647225001' },
    { icon: '✉️', label: 'Email',   value: 'info@itsurwiener.com', href: 'mailto:info@itsurwiener.com' },
  ]
  return (
    <section id="findus" className="bg-[#04030A] py-[100px] px-[5vw]" style={{ scrollMarginTop: '80px' }}>
      <motion.div {...inView(0)}>
        <div className="flex items-center gap-3 font-ui text-[11px] font-bold tracking-[.28em] uppercase text-orange mb-3"><span className="w-6 h-0.5 bg-orange" />Find Us</div>
        <h2 className="font-display text-[clamp(52px,8vw,100px)] leading-[.88] text-white mb-12">Come Early.<br />Stay Late.</h2>
      </motion.div>
      <motion.div className="grid grid-cols-1 lg:grid-cols-2 gap-0 border border-orange/10" {...inView(0.1)}>
        <div className="bg-[#08060F] p-14">
          <div className="flex flex-col gap-0">
            {items.map(({ icon, label, value, sub, href }) => (
              <div key={label} className="flex gap-5 py-6 border-b border-orange/[0.07] last:border-b-0 group hover:pl-2 transition-all duration-300">
                <div className="w-11 h-11 bg-orange/[0.08] border border-orange/15 flex items-center justify-center text-[18px] flex-shrink-0 group-hover:bg-orange/15 transition-colors duration-200">{icon}</div>
                <div>
                  <div className="font-ui text-[9px] font-bold tracking-[.22em] uppercase text-orange mb-1">{label}</div>
                  {href && href.startsWith('tel:') ? <CallButton className="text-[14px] text-cream no-underline hover:text-orange transition-colors duration-200 bg-transparent cursor-pointer text-left p-0 border-0" /> : href ? <a href={href} className="text-[14px] text-cream no-underline hover:text-orange transition-colors duration-200">{value}</a> : <div className="text-[14px] text-cream">{value}</div>}
                  {sub && <div className="text-[12px] text-cream/60 mt-0.5">{sub}</div>}
                </div>
              </div>
            ))}
          </div>
          <div className="flex gap-3 mt-8">
            <a href="https://facebook.com/itsurwiener" target="_blank" rel="noreferrer" aria-label="Facebook" className="w-11 h-11 border border-orange/40 flex items-center justify-center text-orange no-underline hover:bg-orange hover:text-black hover:-translate-y-1 transition-all duration-200">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" /></svg>
            </a>
            <a href="https://instagram.com/itsurwiener" target="_blank" rel="noreferrer" aria-label="Instagram" className="w-11 h-11 border border-orange/40 flex items-center justify-center text-orange no-underline hover:bg-orange hover:text-black hover:-translate-y-1 transition-all duration-200">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="2" width="20" height="20" rx="5" ry="5" /><path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z" /><line x1="17.5" y1="6.5" x2="17.51" y2="6.5" /></svg>
            </a>
            <a href="https://tiktok.com/@itsurwiener" target="_blank" rel="noreferrer" aria-label="TikTok" className="w-11 h-11 border border-orange/40 flex items-center justify-center text-orange no-underline hover:bg-orange hover:text-black hover:-translate-y-1 transition-all duration-200">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.32 6.32 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.95a8.16 8.16 0 004.77 1.52V7.01a4.85 4.85 0 01-1-.32z" /></svg>
            </a>
          </div>
        </div>
        <div className="min-h-[400px] flex items-center justify-center relative overflow-hidden" style={{ background: '#0E0B18' }}>
          <div className="absolute inset-0" style={{ backgroundImage: 'linear-gradient(rgba(245,101,32,0.06) 1px,transparent 1px),linear-gradient(90deg,rgba(245,101,32,0.06) 1px,transparent 1px)', backgroundSize: '40px 40px' }} />
          <div className="relative z-[1] text-center">
            <div className="w-6 h-6 bg-orange rounded-[50%_50%_50%_0] mx-auto mb-5" style={{ transform: 'rotate(-45deg)', boxShadow: '0 0 0 6px rgba(245,101,32,0.2),0 0 0 16px rgba(245,101,32,0.06)', animation: 'pinBounce 2s ease-in-out infinite' }} />
            <div className="font-display text-[28px] text-white mb-1">itsurwiener</div>
            <div className="font-ui text-[12px] tracking-[.15em] uppercase text-orange/55 mb-5">Clemson, South Carolina</div>
            <a href="https://maps.google.com/?q=101+Keith+Street+Clemson+SC" target="_blank" rel="noreferrer" className="font-ui text-[11px] font-bold tracking-[.2em] uppercase text-orange no-underline border-b border-orange pb-0.5 hover:opacity-60 transition-opacity">Find Us →</a>
          </div>
        </div>
      </motion.div>
    </section>
  )
}

// ── Special Events ────────────────────────
function SpecialEvents() {
  const [events, setEvents] = useState([])

  useEffect(() => {
    const today = new Date().toISOString().split('T')[0]
    client.fetch(`*[_type == "event" && date >= $today && eventType == "event"] | order(date asc) [0...4] {
      bandName, date, time, ticketPrice, lineleapUrl, ticketUrl, description
    }`, { today }).then(data => setEvents(data || [])).catch(() => {})
  }, [])

  if (events.length === 0) return null

  return (
    <section className="px-[5vw] py-[80px]" style={{ background: 'linear-gradient(180deg,#08060F,#04030A)' }}>
      <motion.div {...inView(0)}>
        <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
          <div>
            <div className="flex items-center gap-3 font-ui text-[11px] font-bold tracking-[.28em] uppercase text-orange mb-3">
              <span className="w-6 h-0.5 bg-orange" />Coming Up
            </div>
            <h2 className="font-display text-[clamp(36px,5vw,64px)] leading-none text-white">
              Special <span className="text-orange">Events</span>
            </h2>
          </div>
          <Link to="/events" className="font-ui text-[11px] font-bold tracking-[.15em] uppercase border border-orange/30 text-orange px-5 py-2.5 no-underline hover:bg-orange hover:text-black transition-all duration-200">
            All Events
          </Link>
        </div>
        <div className="flex flex-col gap-2">
          {events.map((e, i) => {
            const d = new Date(e.date + 'T00:00:00')
            const month = d.toLocaleString('default', { month: 'short' }).toUpperCase()
            const day = d.getDate()
            const dow = d.toLocaleString('default', { weekday: 'short' }).toUpperCase()
            return (
              <motion.div key={e.date + e.bandName}
                className="flex items-stretch border border-white/[0.07] overflow-hidden hover:border-orange/25 transition-all duration-200"
                style={{ background: 'rgba(255,255,255,0.03)' }}
                initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.07 }}>
                <div className="flex flex-col items-center justify-center px-4 py-4 border-r border-white/[0.06] min-w-[70px]" style={{ background: 'rgba(245,101,32,0.08)' }}>
                  <div className="font-ui text-[9px] font-bold tracking-[.12em] text-orange">{month}</div>
                  <div className="font-display text-[36px] text-white leading-none">{day}</div>
                  <div className="font-ui text-[8px] text-cream/35 tracking-[.1em]">{dow}</div>
                </div>
                <div className="flex-1 px-5 py-4">
                  <div className="font-display text-[clamp(18px,2.5vw,28px)] text-white leading-none">{e.bandName}</div>
                  {e.time && <div className="font-ui text-[11px] text-cream/45 mt-0.5">{e.time}</div>}
                  {e.description && <p className="text-[12px] text-cream/50 mt-1.5 leading-relaxed">{e.description}</p>}
                </div>
                <div className="px-5 py-4 flex-shrink-0 flex flex-col items-end justify-center gap-2">
                  {e.ticketPrice && <span className="font-cond text-[15px] font-bold text-orange uppercase">{e.ticketPrice}</span>}
                  {(e.lineleapUrl || e.ticketUrl) && (
                    <a href={e.lineleapUrl || e.ticketUrl} target="_blank" rel="noreferrer"
                      className="font-ui text-[10px] font-bold tracking-[.12em] uppercase bg-orange text-black px-3 py-1.5 no-underline hover:bg-white transition-all duration-200">
                      {e.lineleapUrl ? 'LineLeap' : 'Tickets'}
                    </a>
                  )}
                </div>
              </motion.div>
            )
          })}
        </div>
      </motion.div>
    </section>
  )
}

// ── HOME ──────────────────────────────────
export default function Home() {
  useEffect(() => {
    const hash = window.location.hash
    if (!hash) return
    const id = hash.replace('#', '')
    const attempt = (tries = 0) => {
      const el = document.getElementById(id)
      if (el) { el.scrollIntoView({ behavior: 'smooth', block: 'start' }); return }
      if (tries < 10) setTimeout(() => attempt(tries + 1), 100)
    }
    setTimeout(attempt, 50)
  }, [])

  return (
    <div className="bg-[#04030A]">
      <WordmarkHero />
      <ExperienceBands />
      <Ticker
        items={['Dogs, Burgers & Beer', 'Famous Litchers', "Clemson's Best Chicken Tenders", 'Red Bull Litchers', 'Live Music in The Basement', 'Huge Deck and Turf Area', 'Saturday $1 Mimosas', 'Double 12Ft LED Walls', '16 Beers on Tap', 'Damn Good Beer', 'Green Tea Bottles', 'No Better Place to Watch The Game!']}
        variant="orange"
        speed={35}
      />
      <Complex />
      <GameDayHero />
      <GameDay />
      <SpecialEvents />
      <EatsSection />
      <div className="py-10 bg-[#04030A]">
        <div className="overflow-hidden py-[22px]" style={{ background: '#9D4EDD' }}>
          <div className="inline-flex whitespace-nowrap" style={{ animation: 'ticker 30s linear infinite' }}>
            {['The Home of The Litcher®', 'Famous Litchers', 'Red Bull Litchers', 'Green Tea Litchers', 'Margarita Litchers', 'Mojito Litchers', 'Corona Litchers', 'High Noon Litchers', 'Surfside Litchers', 'Cosmic Litchers', 'Filthy Dirty Soda Litchers', 'Specialty Litchers', 'and more…',
              'The Home of The Litcher®', 'Famous Litchers', 'Red Bull Litchers', 'Green Tea Litchers', 'Margarita Litchers', 'Mojito Litchers', 'Corona Litchers', 'High Noon Litchers', 'Surfside Litchers', 'Cosmic Litchers', 'Filthy Dirty Soda Litchers', 'Specialty Litchers', 'and more…',
            ].map((item, i) => (
              <span key={i} className="font-display text-[24px] tracking-[.06em] text-white inline-flex items-center px-10">
                {item}<span className="ml-10 opacity-60">✦</span>
              </span>
            ))}
          </div>
        </div>
      </div>
      <LitcherSection />
      <BasementSection />
      <VenuesGrid />
      <Beer />
      <MerchSection />
      <EventsCTA />
      <FindUs />
      <PageCTA />
    </div>
  )
}
