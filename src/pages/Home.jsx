import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import Ticker from '@components/Ticker'
import { useCounter, useScrollReveal } from '@hooks/useScrollReveal'

const fadeUp = (delay = 0) => ({
  initial:    { opacity: 0, y: 30 },
  animate:    { opacity: 1, y: 0 },
  transition: { duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] },
})

const inView = (delay = 0) => ({
  initial:     { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport:    { once: true, margin: '-60px' },
  transition:  { duration: 0.85, delay, ease: [0.16, 1, 0.3, 1] },
})

// ── Hero Canvas ──────────────────────────
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
        this.speedX = (Math.random() - 0.5) * 0.4; this.speedY = (Math.random() - 0.5) * 0.4
        this.opacity = Math.random() * 0.4 + 0.1
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
          if (d < 100) { ctx.beginPath(); ctx.moveTo(p.x, p.y); ctx.lineTo(q.x, q.y); ctx.strokeStyle = `rgba(245,101,32,${0.07 * (1 - d / 100)})`; ctx.lineWidth = 0.5; ctx.stroke() }
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

// ── Hero ─────────────────────────────────
function Hero() {
  return (
    <section id="hero" className="relative h-screen flex flex-col justify-center px-[5vw] overflow-hidden bg-[#04030A] pb-0">
      <HeroCanvas />
      <div className="absolute inset-0 z-0 pointer-events-none" style={{ backgroundImage: 'linear-gradient(rgba(245,101,32,0.04) 1px,transparent 1px),linear-gradient(90deg,rgba(245,101,32,0.04) 1px,transparent 1px)', backgroundSize: '80px 80px', animation: 'gridScroll 20s linear infinite' }} />
      <div className="absolute inset-0 z-[1] pointer-events-none bg-gradient-to-b from-transparent via-transparent to-[#04030A]" />
      <div className="absolute top-[-100px] right-[-100px] w-[500px] h-[500px] rounded-full z-0 pointer-events-none" style={{ background: 'radial-gradient(circle,rgba(245,101,32,0.15),transparent 70%)', filter: 'blur(80px)' }} />
      <div className="relative z-[2]">
        <motion.div className="flex items-center gap-3 font-ui text-[15px] font-bold tracking-[.22em] uppercase text-orange mb-6" {...fadeUp(0.2)}>
          <span className="w-8 h-0.5 bg-orange" />
          A Clemson Destination
        </motion.div>
        <motion.h1 className="font-display text-[clamp(80px,18vw,260px)] leading-[.85] text-white mb-0" {...fadeUp(0.4)}>
          <span className="glitch relative inline-block" data-text="itsurwiener">
            itsurwiener
          </span>
        </motion.h1>
        <motion.h2 className="font-display text-[clamp(28px,4vw,56px)] text-orange leading-none mt-4 mb-3 tracking-wide" {...fadeUp(0.55)}>
          The Home of The Litcher<sup style={{fontSize:"0.55em",verticalAlign:"super",lineHeight:0}}>®</sup>
        </motion.h2>
        <motion.p className="font-cond text-[clamp(13px,1.8vw,20px)] font-light tracking-[.06em] text-cream/45 mb-10" {...fadeUp(0.65)}>
          Restaurant&nbsp;
          <span className="text-orange/50">·</span>&nbsp;
          Sports Bar&nbsp;
          <span className="text-orange/50">·</span>&nbsp;
          The Basement Nightclub&nbsp;
          <span className="text-orange/50">·</span>&nbsp;
          Huge Outdoor Areas&nbsp;
          <span className="text-orange/50">·</span>&nbsp;
          Two 12-Ft LED Walls
        </motion.p>
        <motion.div className="flex gap-4 flex-wrap" {...fadeUp(0.8)}>
          <Link to="/#chaos" className="font-ui text-[12px] font-bold tracking-[.18em] uppercase bg-orange text-black px-10 py-4 no-underline clip-angled hover:bg-white transition-colors duration-200">Enter the Complex</Link>
          <Link to="/events" className="font-ui text-[12px] font-bold tracking-[.18em] uppercase border border-orange/40 text-cream px-10 py-4 no-underline hover:border-orange hover:text-orange transition-all duration-200">Book Your Night</Link>
        </motion.div>
      </div>
      <motion.div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-[2] flex flex-col items-center gap-2" {...fadeUp(1.2)}>
        <span className="font-ui text-[10px] tracking-[.25em] uppercase text-orange/50">Scroll</span>
        <div className="w-px h-12 bg-gradient-to-b from-orange to-transparent animate-[scrollBar_1.8s_ease-in-out_infinite]" />
      </motion.div>
      <style>{`@keyframes gridScroll{0%{transform:translateY(0)}100%{transform:translateY(80px)}}@keyframes scrollBar{0%{height:0;opacity:1}100%{height:48px;opacity:0}}`}</style>
    </section>
  )
}

// ── The Venue ────────────────────────────
function Complex() {
  return (
    <section id="chaos" className="bg-[#08060F] pt-[72px] pb-[80px] px-[5vw]">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <motion.div {...inView(0)}>
          <div className="flex items-center gap-3 font-ui text-[11px] font-bold tracking-[.28em] uppercase text-orange mb-4">
            <span className="w-6 h-0.5 bg-orange" />The Venue
          </div>
          <div className="font-display text-[clamp(48px,7vw,88px)] leading-[.88] text-white mb-6">
            More than a restaurant.<br />More than a bar.<br />
            <span className="text-orange">it's</span> <span className="text-orange">Clemson's</span><br />
            <span className="text-purple-bright" style={{ textShadow: '0 0 20px #9D4EDD,0 0 40px rgba(157,78,221,0.3)', animation: 'neonPulse 2.5s ease-in-out infinite' }}>
              wildest night.
            </span>
          </div>
          <p className="text-[15px] text-cream/55 leading-[1.85] max-w-[540px]">
            Five distinct areas. One address. Game day to last call — itsurwiener handles all of it. Sports bar, nightclub, outdoor LED wall, covered patios — there is nothing else like it in this market.
          </p>
        </motion.div>

        {/* Photo collage */}
        <motion.div className="grid grid-cols-2 gap-2 h-[480px]" {...inView(0.15)}>
          {/* Exterior - full left column */}
          <div className="relative overflow-hidden row-span-2">
            <img src="/images/venue-exterior.jpg" alt="itsurwiener exterior" className="w-full h-full object-cover hover:scale-[1.04] transition-transform duration-700" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            <div className="absolute bottom-3 left-3 font-ui text-[9px] font-bold tracking-[.2em] uppercase text-cream/70">Clemson, SC</div>
          </div>
          {/* Outdoor crowd - top right */}
          <div className="relative overflow-hidden">
            <img src="/images/venue-outdoor.jpg" alt="Outdoor patio crowd" className="w-full h-full object-cover hover:scale-[1.04] transition-transform duration-700" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            <div className="absolute bottom-3 left-3 font-ui text-[9px] font-bold tracking-[.2em] uppercase text-cream/70">Outdoor</div>
          </div>
          {/* Bar crowd - bottom right */}
          <div className="relative overflow-hidden">
            <img src="/images/venue-bar.jpg" alt="Game day bar crowd" className="w-full h-full object-cover hover:scale-[1.04] transition-transform duration-700" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            <div className="absolute bottom-3 left-3 font-ui text-[9px] font-bold tracking-[.2em] uppercase text-cream/70">Game Day</div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

// ── Game Day ─────────────────────────────
function GameDay() {
  const features = [
    { icon: '📺', name: '20 TVs Everywhere',     desc: 'You will never miss a play from any seat in the house' },
    { icon: '🎬', name: '12-Ft Outdoor LED Wall', desc: 'Watch party scale, open air, all season long' },
    { icon: '🍹', name: 'The Litcher<sup style={{fontSize:"0.55em",verticalAlign:"super",lineHeight:0}}>®</sup> All Day',   desc: 'The official unofficial drink of Clemson game day' },
    { icon: '🎵', name: 'The Basement After Dark', desc: "The game ends. The night doesn't." },
  ]
  return (
    <section id="gameday" className="p-0">
      <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[90vh]">
        <motion.div className="bg-orange flex flex-col justify-center px-[60px] py-[80px] relative overflow-hidden" {...inView(0)}>
          <div className="absolute bottom-[-60px] right-[-60px] font-display text-[380px] text-black/10 leading-none pointer-events-none select-none">🏈</div>
          <div className="font-ui text-[11px] font-bold tracking-[.25em] uppercase bg-black text-orange inline-block px-4 py-2 mb-7 clip-angled-sm w-fit">Football Season</div>
          <h2 className="font-display text-[clamp(64px,9vw,130px)] leading-[.85] text-black mb-6">Game Day<br />Done Right.</h2>
          <p className="text-[15px] text-black/60 max-w-[400px] leading-[1.8] mb-9">ESPN College GameDay has been here. When Clemson kicks off, there's only one place to be. 20 TVs. Outdoor LED wall. The Litcher<sup style={{fontSize:"0.55em",verticalAlign:"super",lineHeight:0}}>®</sup> flowing. The Basement open after the final whistle.</p>
          <Link to="/game-day" className="font-ui text-[12px] font-bold tracking-[.15em] uppercase bg-black text-orange px-7 py-3.5 no-underline w-fit hover:bg-white hover:text-black transition-colors duration-200">See the Experience →</Link>
        </motion.div>
        <motion.div className="bg-[#08060F] flex flex-col" {...inView(0.1)}>
          {features.map(({ icon, name, desc }) => (
            <div key={name} className="flex items-start gap-5 px-12 py-9 border-b border-orange/[0.08] hover:bg-orange/[0.04] transition-colors duration-200">
              <span className="text-[28px] mt-1 flex-shrink-0">{icon}</span>
              <div>
                <div className="font-cond text-[22px] font-black text-white uppercase tracking-wide mb-1">{name}</div>
                <div className="text-[13px] text-cream/45 leading-relaxed">{desc}</div>
              </div>
            </div>
          ))}
          <div className="flex-1 flex flex-col justify-center px-12 py-8 bg-orange/[0.04]">
            <div className="font-display text-[clamp(56px,9vw,120px)] text-orange leading-none mb-1">80K+</div>
            <div className="font-ui text-[11px] tracking-[.18em] uppercase text-cream/30">Home Game Attendance &nbsp;·&nbsp; All Roads Lead Here</div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

// ── The Litcher<sup style={{fontSize:"0.55em",verticalAlign:"super",lineHeight:0}}>®</sup> ─────────────────────────
function LitcherSection() {
  const [ref, visible] = useScrollReveal(0.4)
  const count = useCounter(60000, 2200, visible)
  const cards = [
    { num: '01', title: 'The Only One in the World',      body: 'The Litcher<sup style={{fontSize:"0.55em",verticalAlign:"super",lineHeight:0}}>®</sup> is federally trademarked. There is no other. It was created here, in Clemson — and it stays ours.' },
    { num: '02', title: 'Not a Menu Item. The Brand.',    body: 'Over 60,000 served per year. The Litcher<sup style={{fontSize:"0.55em",verticalAlign:"super",lineHeight:0}}>®</sup> is the product — the thing people come back for every single time.' },
    { num: '03', title: 'Multiple Flavors. Always Fresh.', body: "Ask your server what's flowing tonight. Seasonal specials and limited runs keep it interesting." },
    { num: '04', title: 'Pair It With Damn Good Beer',    body: 'Our house Clemson Lager. Start with a Litcher<sup style={{fontSize:"0.55em",verticalAlign:"super",lineHeight:0}}>®</sup>, chase it with a Damn Good Beer.' },
  ]
  return (
    <section id="litcher" className="bg-[#08060F] py-[120px] px-[5vw] relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-display pointer-events-none select-none z-0" style={{ fontSize: '28vw', color: 'rgba(245,101,32,0.025)', whiteSpace: 'nowrap', lineHeight: 1 }}>LITCHER</div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 relative z-[1]">
        <motion.div {...inView(0)}>
          <div className="inline-flex items-center gap-2 border border-orange px-5 py-2 mb-6 group hover:bg-orange transition-colors duration-300 cursor-default">
            <span className="w-[7px] h-[7px] bg-orange rounded-full group-hover:bg-black transition-colors animate-[blink_1.5s_ease-in-out_infinite]" />
            <span className="font-ui text-[11px] font-bold tracking-[.2em] uppercase text-orange group-hover:text-black transition-colors">Federally Trademarked · Born in Clemson</span>
          </div>
          <div className="flex items-center gap-3 font-ui text-[11px] font-bold tracking-[.28em] uppercase text-orange mb-3"><span className="w-6 h-0.5 bg-orange" />Signature Drink</div>
          <h2 className="font-display text-[clamp(72px,11vw,150px)] leading-[.88] text-white mb-4">The<br />Litcher<sup style={{fontSize:"0.55em",verticalAlign:"super",lineHeight:0}}>®</sup></h2>
          <p className="text-[15px] text-cream/55 leading-[1.85] mb-8 max-w-[440px]">48 ounces. 4 shots. Served pitcher-style. The only one in the world. The reason people walk through the door and the reason they come back.</p>
          <div ref={ref} className="border-l-2 border-orange pl-6 mb-8">
            <div className="font-ui text-[10px] tracking-[.22em] uppercase text-orange/60 mb-1">Total Litchers® Served</div>
            <div className="font-display text-[clamp(60px,10vw,130px)] text-white leading-none">{count.toLocaleString()}<span className="text-orange">+</span></div>
          </div>
          <div className="grid grid-cols-4 gap-px bg-orange/10 border border-orange/10 mb-8">
            {[['48','Ounces'],['4','Shots'],['∞','Flavors'],['1','TM']].map(([v,l]) => (
              <div key={l} className="bg-[#0E0B18] py-5 text-center">
                <span className="font-display text-[30px] text-orange block mb-1">{v}</span>
                <span className="font-ui text-[10px] tracking-[.15em] uppercase text-cream/35">{l}</span>
              </div>
            ))}
          </div>
          <Link to="/the-litcher" className="font-ui text-[12px] font-bold tracking-[.18em] uppercase bg-orange text-black px-10 py-4 no-underline clip-angled hover:bg-white transition-colors duration-200 inline-block">Learn More →</Link>
        </motion.div>
        <motion.div className="flex flex-col gap-0" {...inView(0.15)}>
          {cards.map(({ num, title, body }) => (
            <div key={num} className="bg-[#0E0B18] border border-orange/[0.08] px-8 py-7 relative overflow-hidden group transition-colors duration-300 hover:bg-orange/[0.04] hover:border-orange/25 border-b-0 last:border-b first:border-t">
              <div className="absolute top-4 right-5 font-display text-[48px] text-orange/10 leading-none">{num}</div>
              <div className="font-cond text-[20px] font-black text-white uppercase tracking-wide mb-2">{title}</div>
              <div className="text-[13px] text-cream/50 leading-[1.7]">{body}</div>
              <div className="absolute bottom-0 left-0 w-0 h-[2px] bg-orange transition-all duration-500 group-hover:w-full" />
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

// ── The Basement ─────────────────────────
function BasementSection() {
  const features = ['Professional Stage','Dance Floor','Full Sound Rig','12-Ft LED Wall','Full Bar','Private Buyouts']
  return (
    <section id="basement" className="relative min-h-screen flex items-center justify-center overflow-hidden py-[120px] px-[5vw]">
      <div className="absolute inset-0 z-0" style={{ background: 'radial-gradient(ellipse 60% 70% at 50% 40%,#1a004d,#04030A)' }} />
      {[{left:'20%',h:'65%',c:'rgba(157,78,221,0.55)',d:'0s'},{left:'40%',h:'80%',c:'rgba(245,101,32,0.45)',d:'-1.3s'},{left:'60%',h:'55%',c:'rgba(0,245,212,0.35)',d:'-2.6s'},{left:'80%',h:'70%',c:'rgba(255,229,102,0.35)',d:'-0.8s'}].map((b,i) => (
        <div key={i} className="absolute top-0 w-[3px] z-[1] pointer-events-none" style={{ left:b.left, height:b.h, background:`linear-gradient(to bottom,transparent,${b.c},transparent)`, transformOrigin:'top center', animation:`beamSweep 4s ease-in-out infinite`, animationDelay:b.d }} />
      ))}
      {Array.from({length:20}).map((_,i) => (
        <div key={i} className="absolute rounded-full z-[1] pointer-events-none" style={{ width:`${Math.random()*4+2}px`, height:`${Math.random()*4+2}px`, left:`${i*5}%`, background:['rgba(157,78,221,0.6)','rgba(245,101,32,0.5)','rgba(0,245,212,0.4)'][i%3], animation:`particleFloat ${Math.random()*8+6}s linear infinite`, animationDelay:`${i*0.3}s` }} />
      ))}
      <motion.div className="relative z-[2] text-center max-w-[800px]" {...inView(0)}>
        <div className="font-ui text-[11px] font-bold tracking-[.3em] uppercase text-purple-bright/80 mb-4">Lower Level · itsurwiener</div>
        <div className="font-display leading-[.85] mb-0">
          <span className="block text-[clamp(70px,16vw,220px)] text-white">THE</span>
          <span className="block text-[clamp(70px,16vw,220px)] text-purple-bright" style={{ textShadow:'0 0 40px rgba(157,78,221,0.6),0 0 80px rgba(157,78,221,0.3)' }}>BASEMENT</span>
        </div>
        <div className="mx-auto my-8 h-[2px] bg-purple-bright" style={{ animation:'lineGlow 2s ease-in-out infinite', width:'80px' }} />
        <div className="flex flex-wrap justify-center gap-3 mb-8">
          {features.map(f => <span key={f} className="font-ui text-[11px] font-medium tracking-[.15em] uppercase border border-purple-bright/30 px-5 py-2.5 text-cream/60 hover:border-purple-bright hover:text-purple-bright transition-all duration-200">{f}</span>)}
        </div>
        <p className="text-[15px] text-cream/45 leading-[1.85] mb-10 max-w-[500px] mx-auto">Clemson's only purpose-built nightclub. Professional stage, lighting rig, dance floor, and a 12-ft LED wall. When The Basement opens, the night is just beginning.</p>
        <div className="flex gap-4 justify-center flex-wrap">
          <Link to="/events" className="font-ui text-[12px] font-bold tracking-[.18em] uppercase bg-purple-bright text-white px-11 py-4 no-underline hover:bg-[#B85EFF] transition-colors duration-200">Book The Basement</Link>
          <Link to="/the-basement" className="font-ui text-[12px] font-bold tracking-[.18em] uppercase border border-purple-bright/35 text-cream/60 px-11 py-4 no-underline hover:border-purple-bright hover:text-purple-bright transition-all duration-200">Learn More</Link>
        </div>
      </motion.div>
      <style>{`@keyframes lineGlow{0%,100%{box-shadow:0 0 8px #9D4EDD;width:80px}50%{box-shadow:0 0 24px #9D4EDD;width:120px}}`}</style>
    </section>
  )
}

// ── Venues Grid ──────────────────────────
function VenuesGrid() {
  const venues = [
    { num:'01', tag:'Upper Level', title:'Restaurant\n& Sports Bar', desc:'20 TVs. Full bar and menu. The game on every screen.', bg:'linear-gradient(135deg,#1a0800,#3a1500,#1a0a00)' },
    { num:'02', tag:'Lower Level', title:'The Basement\nNightclub',   desc:'Stage · Sound · Lights · 12-ft LED Wall · Dance Floor',    bg:'linear-gradient(135deg,#04001a,#120040,#080030)' },
    { num:'03', tag:'Outdoor',     title:'Covered\nPatios',           desc:'Two covered all-weather patios. Rain or shine.',           bg:'linear-gradient(135deg,#001a08,#003820,#001408)' },
    { num:'04', tag:'Outdoor',     title:'Deck, Turf\n& LED Wall',   desc:'Open deck, artificial turf, and a 12-ft LED wall.',        bg:'linear-gradient(135deg,#1a0a00,#2a1a00,#100500)' },
  ]
  return (
    <section id="venues" className="bg-[#0E0B18] py-[100px] px-[5vw]">
      <motion.div className="flex items-end justify-between mb-14 flex-wrap gap-6" {...inView(0)}>
        <div>
          <div className="flex items-center gap-3 font-ui text-[11px] font-bold tracking-[.28em] uppercase text-orange mb-3"><span className="w-6 h-0.5 bg-orange" />All Venues</div>
          <h2 className="font-display text-[clamp(52px,8vw,100px)] leading-[.88] text-white">Five Spaces.<br />One Address.</h2>
        </div>
        <Link to="/venues" className="font-ui text-[12px] font-bold tracking-[.18em] uppercase border border-orange/40 text-cream px-8 py-4 no-underline hover:border-orange hover:text-orange transition-all duration-200">Explore All</Link>
      </motion.div>
      <motion.div className="grid grid-cols-1 sm:grid-cols-2 gap-0.5" {...inView(0.1)}>
        {venues.map(({ num, tag, title, desc, bg }) => (
          <div key={num} className="relative overflow-hidden group" style={{ aspectRatio:'4/3' }}>
            <div className="absolute inset-0 transition-transform duration-700 group-hover:scale-[1.04]" style={{ background: bg }} />
            <div className="absolute inset-0 bg-gradient-to-t from-[#04030A] via-[rgba(4,3,10,0.4)] to-transparent" />
            <div className="absolute top-5 left-5 font-display text-[14px] tracking-[.1em] text-orange/40">{num}</div>
            <Link to="/venues" className="absolute top-4 right-4 w-10 h-10 border border-orange/30 flex items-center justify-center text-orange text-lg no-underline opacity-0 scale-75 group-hover:opacity-100 group-hover:scale-100 transition-all duration-300 hover:bg-orange hover:text-black">→</Link>
            <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
              <div className="font-ui text-[9px] font-bold tracking-[.2em] uppercase bg-orange text-black px-2.5 py-1 inline-block mb-2.5 clip-angled-sm">{tag}</div>
              <div className="font-display text-[clamp(28px,3.5vw,48px)] text-white leading-[.9] mb-2 whitespace-pre-line">{title}</div>
              <div className="text-[12px] text-cream/50 leading-relaxed max-h-0 overflow-hidden group-hover:max-h-[60px] transition-all duration-500 opacity-0 group-hover:opacity-100">{desc}</div>
            </div>
          </div>
        ))}
      </motion.div>
    </section>
  )
}

// ── Damn Good Beer ───────────────────────
function Beer() {
  return (
    <section id="beer" className="py-[100px] px-[5vw] relative overflow-hidden" style={{ background:'linear-gradient(135deg,#0e0800,#1a0e00,#0e0800)' }}>
      <motion.div className="flex flex-col lg:flex-row items-center gap-16 border border-orange/15 p-12" {...inView(0)}>
        <div className="relative flex-shrink-0 flex justify-center">
          <div className="w-40 h-56 rounded-xl flex flex-col items-center justify-center relative" style={{ background:'linear-gradient(160deg,#CC0000,#F66733,#CC0000)', boxShadow:'0 30px 80px rgba(245,101,32,0.4),0 0 40px rgba(245,101,32,0.2) inset', animation:'canWobble 5s ease-in-out infinite' }}>
            <div className="absolute top-3 left-1/2 -translate-x-1/2 w-[70%] h-3 bg-white/15 rounded" />
            <div className="text-center px-3">
              <div className="font-display text-[26px] text-white/95 block tracking-wide">DAMN GOOD</div>
              <div className="font-cond text-[10px] font-black tracking-[.2em] text-white/70 uppercase block mt-1">BEER</div>
              <div className="font-ui text-[8px] tracking-[.12em] text-white/45 mt-2 block">itsurwiener's · Clemson Lager</div>
            </div>
          </div>
          <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-48 h-48 rounded-full pointer-events-none" style={{ background:'radial-gradient(circle,rgba(245,101,32,0.25),transparent 70%)', filter:'blur(24px)' }} />
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-3 font-ui text-[11px] font-bold tracking-[.28em] uppercase text-orange mb-3"><span className="w-6 h-0.5 bg-orange" />House Beer</div>
          <h2 className="font-display text-[clamp(52px,8vw,100px)] leading-[.88] text-white mb-3"><span className="text-orange">Damn</span><br />Good Beer.</h2>
          <div className="font-cond text-[17px] font-bold tracking-[.15em] uppercase text-cream/40 mb-5">Clemson Lager · itsurwiener's Restaurant & Bar</div>
          <p className="text-[15px] text-cream/50 leading-[1.8] max-w-[460px] mb-7">Our beer. Brewed for Clemson. Sold only here. Pair it with the Litcher<sup style={{fontSize:"0.55em",verticalAlign:"super",lineHeight:0}}>®</sup> or let it stand alone. Either way: it's damn good.</p>
          <div className="flex gap-8">
            {[['4.5%','ABV'],['16oz','Can'],['Lager','Style']].map(([v,l]) => (
              <div key={l} className="text-center">
                <span className="font-display text-[32px] text-orange block leading-none">{v}</span>
                <span className="font-ui text-[10px] tracking-[.15em] uppercase text-cream/35 mt-1 block">{l}</span>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  )
}

// ── Events CTA ───────────────────────────
function EventsCTA() {
  const types = [
    {icon:'🏢',label:'Corporate & Company Events'},
    {icon:'🎓',label:'Alumni Gatherings'},
    {icon:'🎉',label:'Birthday & Milestone Parties'},
    {icon:'🏈',label:'Game Day Group Reservations'},
    {icon:'🎸',label:'Concerts & Live Events'},
    {icon:'🔒',label:'Full Venue Buyouts'},
  ]
  return (
    <section id="events-cta" className="bg-[#0E0B18] py-[100px] px-[5vw]">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
        <motion.div {...inView(0)}>
          <div className="flex items-center gap-3 font-ui text-[11px] font-bold tracking-[.28em] uppercase text-orange mb-3"><span className="w-6 h-0.5 bg-orange" />Private Events</div>
          <h2 className="font-display text-[clamp(52px,8vw,100px)] leading-[.88] text-white mb-5">Your Night.<br />Our Stage.</h2>
          <p className="text-[15px] text-cream/55 leading-[1.85] mb-8 max-w-[440px]">From game day group reservations to full venue buyouts — itsurwiener hosts events that need a venue with real range.</p>
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
            <form onSubmit={e=>{e.preventDefault();alert("We'll be in touch! 🎉")}} className="flex flex-col gap-4">
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

// ── Find Us ──────────────────────────────
function FindUs() {
  const items = [
    { icon:'📍', label:'Address',          value:'Clemson, South Carolina',  sub:'Downtown Clemson · Home of Clemson University' },
    { icon:'🕐', label:'Hours',            value:'Open 4 nights a week',      sub:'Follow @itsurwiener for current schedule' },
    { icon:'📞', label:'Phone',            value:'(864) 722-5001',            href:'tel:8647225001' },
    { icon:'✉️', label:'Events',           value:'info@itsurwiener.com',      href:'mailto:info@itsurwiener.com' },
  ]
  return (
    <section id="findus" className="bg-[#04030A] py-[100px] px-[5vw]">
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
                  {href ? <a href={href} className="text-[14px] text-cream no-underline hover:text-orange transition-colors duration-200">{value}</a> : <div className="text-[14px] text-cream">{value}</div>}
                  {sub && <div className="text-[11px] text-orange/35 mt-0.5">{sub}</div>}
                </div>
              </div>
            ))}
          </div>
          <div className="flex gap-3 mt-8">
            {['📸','👥','🎵'].map((icon, i) => (
              <a key={i} href="#" className="w-11 h-11 border border-orange/15 flex items-center justify-center text-[18px] no-underline hover:bg-orange/10 hover:border-orange hover:-translate-y-1 transition-all duration-200">{icon}</a>
            ))}
          </div>
        </div>
        <div className="bg-[#0E0B18] min-h-[400px] flex items-center justify-center relative overflow-hidden">
          <div className="absolute inset-0" style={{ backgroundImage:'linear-gradient(rgba(245,101,32,0.06) 1px,transparent 1px),linear-gradient(90deg,rgba(245,101,32,0.06) 1px,transparent 1px)', backgroundSize:'40px 40px' }} />
          <div className="relative z-[1] text-center">
            <div className="w-6 h-6 bg-orange rounded-[50%_50%_50%_0] mx-auto mb-5" style={{ transform:'rotate(-45deg)', boxShadow:'0 0 0 6px rgba(245,101,32,0.2),0 0 0 16px rgba(245,101,32,0.06)', animation:'pinBounce 2s ease-in-out infinite' }} />
            <div className="font-display text-[28px] text-white mb-1">itsurwiener</div>
            <div className="font-ui text-[12px] tracking-[.15em] uppercase text-orange/55 mb-5">Clemson, South Carolina</div>
            <a href="https://maps.google.com" target="_blank" rel="noreferrer" className="font-ui text-[11px] font-bold tracking-[.2em] uppercase text-orange no-underline border-b border-orange pb-0.5 hover:opacity-60 transition-opacity">Get Directions →</a>
          </div>
        </div>
      </motion.div>
    </section>
  )
}

// ── HOME ─────────────────────────────────
export default function Home() {
  return (
    <div className="bg-[#04030A]">
      <Hero />
      <Ticker
        items={[
          "Dogs, Burgers & Beer",
          "Big Litchers",
          "Clemson's Best Chicken Tenders",
          "Red Bull Litchers",
          "Live Music in The Basement",
          "Huge Deck and Turf Area",
          "Saturday $1 Mimosas",
          "Double 12Ft LED Walls",
          "16 Beers on Tap",
          "Damn Good Beer",
          "Green Tea Bottles",
          "No Better Place to Watch The Game!",
        ]}
        variant="purple"
        speed={35}
      />
      <Complex />
      <GameDay />
      <Ticker items={["29,545 Students","Clemson University","80K Game Day","Your Night Starts Here","Open 4 Nights a Week","Private Events Available"]} variant="dark" reverse speed={26} />
      <LitcherSection />
      <BasementSection />
      <VenuesGrid />
      <div className="bg-orange overflow-hidden">
        <div className="inline-flex whitespace-nowrap" style={{ animation:'ticker 20s linear infinite' }}>
          {['CELEBRATE HARD','GAME DAY','THE LITCHER®','DAMN GOOD BEER','THE BASEMENT',"CLEMSON'S NIGHT",
            'CELEBRATE HARD','GAME DAY','THE LITCHER®','DAMN GOOD BEER','THE BASEMENT',"CLEMSON'S NIGHT"].map((t,i) => (
            <span key={i} className="font-display text-[clamp(60px,10vw,130px)] text-black leading-none inline-flex items-center gap-10 px-14">
              {t}<span className="w-4 h-4 rounded-full bg-black flex-shrink-0" />
            </span>
          ))}
        </div>
      </div>
      <Beer />
      <EventsCTA />
      <FindUs />
    </div>
  )
}
