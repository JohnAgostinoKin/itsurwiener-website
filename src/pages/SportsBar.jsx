import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import PageCTA from '@components/PageCTA'
import Ticker from '@components/Ticker'
import BandVideoBg from '@components/BandVideoBg'

const inView = (delay = 0) => ({
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-60px' },
  transition: { duration: 0.85, delay, ease: [0.16, 1, 0.3, 1] },
})

const features = [
  { icon: '📺', title: '25 Big Screens',       desc: 'Every game, every angle — zero bad seats in the house.' },
  { icon: '🎬', title: 'Two 12-Ft LED Walls',  desc: 'One inside the bar, one on the outdoor deck. Best views in Clemson.' },
  { icon: '🥂', title: 'Gameday Brunch',        desc: '$1 Mimosas & $2 Wien Beer Tall Boys every gameday while they last.' },
  { icon: '🍔', title: 'Full Kitchen',          desc: 'Hand-formed burgers, tenders, fresh-cut fries, all-beef dogs. Open late.' },
  { icon: '🍺', title: '16 Beers on Tap',       desc: 'Including our house Clemson Lager. Damn good beer.' },
  { icon: '🔊', title: 'Full Surround Sound',   desc: 'Hear every play from every seat. You will not miss a thing.' },
]

export default function SportsBar() {
  return (
    <div className="bg-[#04030A] min-h-screen">

      {/* ── Hero ── */}
      <div className="relative min-h-[85vh] flex items-end pb-20 overflow-hidden">
        <BandVideoBg
          srcDesktop="/videos/sportsbar2-landscape.mp4"
          srcMobile="/videos/sportsbar2-portrait.mp4"
          posterDesktop="/videos/sportsbar2-landscape-poster.jpg"
          posterMobile="/videos/sportsbar2-portrait-poster.jpg"
          overlay="linear-gradient(rgba(40,20,5,.5), rgba(40,20,5,.72))"
          lazy={false}
        />
        <div
          className="absolute top-0 left-0 w-[600px] h-[600px] pointer-events-none z-[2]"
          style={{ background: 'radial-gradient(circle, rgba(245,101,32,0.15) 0%, transparent 70%)', filter: 'blur(60px)' }}
        />
        <div className="relative z-[3] px-[5vw] w-full pt-40">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="flex items-center gap-3 font-ui text-[13px] font-bold tracking-[.32em] uppercase text-orange mb-5">
              <span className="w-8 h-0.5 bg-orange" />Upstairs
            </div>
            <h1 className="font-display text-[clamp(60px,12vw,160px)] leading-[.85] text-white mb-4">
              The Wien<br />
              <span
                className="text-orange"
                style={{ textShadow: '0 0 30px rgba(245,101,32,0.55), 0 0 60px rgba(245,101,32,0.25)' }}
              >
                Sports Bar<br />&amp; Grill
              </span>
            </h1>
            <p className="font-cond text-[clamp(16px,2vw,24px)] text-cream/65 mb-10 max-w-[560px] tracking-wide">
              25 Big Screens — Best Food In Town — Covered Patios — Home Of The Litcher®
            </p>
            <div className="flex gap-4 flex-wrap">
              <Link
                to="/menu"
                className="font-ui text-[12px] font-bold tracking-[.18em] uppercase bg-orange text-black px-10 py-4 no-underline clip-angled hover:bg-white transition-colors duration-200"
              >
                Come On In →
              </Link>
              <Link
                to="/game-day"
                className="font-ui text-[12px] font-bold tracking-[.18em] uppercase border border-orange/40 text-cream px-10 py-4 no-underline hover:border-orange hover:text-orange transition-all duration-200"
              >
                Game Day Info
              </Link>
            </div>
          </motion.div>
        </div>
      </div>

      {/* ── Ticker ── */}
      <Ticker
        items={['25 Big Screens', 'Two 12-Ft LED Walls', 'Game Day Brunch', '$1 Mimosas', 'The Litcher®', '16 Beers on Tap', 'Kitchen Open Late', 'Clemson Lager', 'Best Seats in Town']}
        variant="orange"
        speed={30}
      />

      {/* ── Features Grid ── */}
      <section className="bg-[#08060F] py-[100px] px-[5vw]">
        <motion.div {...inView(0)} className="mb-14">
          <div className="flex items-center gap-3 font-ui text-[11px] font-bold tracking-[.28em] uppercase text-orange mb-4">
            <span className="w-6 h-0.5 bg-orange" />The Experience
          </div>
          <h2 className="font-display text-[clamp(52px,8vw,100px)] leading-[.88] text-white">
            Watch the Game<br /><span className="text-orange">Done Right.</span>
          </h2>
        </motion.div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {features.map(({ icon, title, desc }, i) => (
            <motion.div
              key={title}
              {...inView(i * 0.07)}
              className="border border-orange/10 px-7 py-7 hover:border-orange/30 transition-colors duration-300"
              style={{ background: 'rgba(245,101,32,0.03)' }}
            >
              <div className="text-[28px] mb-3">{icon}</div>
              <div className="font-cond text-[20px] font-black text-white uppercase tracking-wide mb-1.5">{title}</div>
              <div className="text-[13px] text-cream/65 leading-relaxed">{desc}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── The Litcher® ── */}
      <section className="py-[100px] px-[5vw] relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #1a0800, #0e0400, #04030A)' }}>
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden">
          <span className="font-display text-[28vw] text-orange/[0.025] leading-none whitespace-nowrap">LITCHER</span>
        </div>
        <motion.div className="relative z-[1] grid grid-cols-1 lg:grid-cols-2 gap-16 items-center" {...inView(0)}>
          <div>
            <div className="flex items-center gap-3 font-ui text-[11px] font-bold tracking-[.28em] uppercase text-orange mb-4">
              <span className="w-6 h-0.5 bg-orange" />House Specialty
            </div>
            <h2 className="font-display text-[clamp(52px,8vw,100px)] leading-[.88] text-white mb-5">
              Home of<br />The{' '}
              <span className="text-orange">
                Litcher
                <sup style={{ fontSize: '0.35em', verticalAlign: 'super' }}>®</sup>
              </span>
            </h2>
            <p className="text-[15px] text-cream/75 leading-[1.85] max-w-[440px] mb-8">
              48 ounces of Clemson's signature drink. More than 60,000 sold each year — there's nothing else like it. Order yours upstairs at the bar.
            </p>
            <Link
              to="/the-litcher"
              className="font-ui text-[12px] font-bold tracking-[.18em] uppercase bg-orange text-black px-10 py-4 no-underline clip-angled hover:bg-white transition-colors duration-200 inline-block"
            >
              About the Litcher® →
            </Link>
          </div>
          <div className="relative overflow-hidden" style={{ minHeight: '360px', aspectRatio: '4/3' }}>
            <img
              src="/images/litchers.jpg"
              alt="The Litcher® — itsurwiener Sports Bar"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          </div>
        </motion.div>
      </section>

      {/* ── Gameday Brunch ── */}
      <section className="bg-orange py-[80px] px-[5vw]">
        <motion.div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center" {...inView(0)}>
          <div>
            <div className="font-ui text-[10px] font-bold tracking-[.3em] uppercase bg-black text-orange inline-block px-4 py-2 mb-6">
              Gameday Brunch
            </div>
            <h2 className="font-display text-[clamp(52px,8vw,100px)] leading-[.88] text-black mb-5">
              $1 Mimosas.<br />Every Saturday.
            </h2>
            <p className="text-[15px] leading-[1.8] text-black/75 max-w-[440px] mb-8">
              The Wien opens at 10AM on gamedays. $1 Mimosas, $2 Wien Beer Tall Boys, and a full brunch menu — the perfect start before the tailgate.
            </p>
            <Link
              to="/menu"
              className="font-ui text-[12px] font-bold tracking-[.18em] uppercase bg-black text-orange px-10 py-4 no-underline hover:bg-white hover:text-black transition-colors duration-200 inline-block"
            >
              Brunch Menu →
            </Link>
          </div>
          <div className="relative overflow-hidden border-4 border-black/10 flex items-center justify-center" style={{ aspectRatio: '4/3', background: 'rgba(0,0,0,0.1)' }}>
            {/* TODO: replace with full-res mimosa photo */}
            <picture>
              <source srcSet="/images/mimosas-placeholder.webp" type="image/webp" />
              <img
                src="/images/mimosas-placeholder.jpg"
                alt="Mimosas"
                className="max-w-[240px] max-h-[320px] w-auto h-auto object-contain"
              />
            </picture>
          </div>
        </motion.div>
      </section>

      {/* ── Reserve / Book / Find ── */}
      <section className="bg-[#0E0B18] py-[80px] px-[5vw]">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {[
            { label: 'Reserve a Table',    desc: 'Book your spot for the game. Limited VIP seating available.',          cta: 'Reserve Now →', to: '/reserve' },
            { label: 'Book a Private Event', desc: 'Group game-day reservations, corporate events, and full buyouts.', cta: 'Inquire →',    to: '/book-event' },
            { label: 'Find Us',            desc: '101 Keith Street, Downtown Clemson, SC 29631.',                         cta: 'Directions →', to: '/find-us' },
          ].map((item, i) => (
            <motion.div
              key={item.label}
              {...inView(i * 0.08)}
              className="border border-orange/15 p-8 hover:border-orange/35 transition-colors duration-300"
              style={{ background: 'rgba(245,101,32,0.03)' }}
            >
              <h3 className="font-display text-[32px] text-white leading-none mb-3">{item.label}</h3>
              <p className="text-[14px] text-cream/60 leading-relaxed mb-6">{item.desc}</p>
              <Link
                to={item.to}
                className="font-ui text-[11px] font-bold tracking-[.2em] uppercase text-orange no-underline border-b border-orange/40 pb-0.5 hover:opacity-60 transition-opacity"
              >
                {item.cta}
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      <PageCTA />
    </div>
  )
}
