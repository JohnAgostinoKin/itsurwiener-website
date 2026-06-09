import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

const inView = (delay = 0) => ({
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-60px' },
  transition: { duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] }
})

const venues = [
  {
    num: '01',
    tag: 'Upper Level',
    title: 'Restaurant & Sports Bar',
    color: '#F56520',
    bg: '/images/sports-bar.jpg',
    link: '/game-day',
    linkLabel: 'Game Day Info',
    features: ['25 HDTVs · Zero Bad Sightlines','Full Kitchen Open Late','Two 12-Ft LED Walls','$2 Tall Boys · $1 Mimosas on Game Day','Full Surround Sound','Clemson\'s Best Sports Bar'],
    desc: 'The main level of itsurwiener is Clemson\'s premier sports bar. 25 HDTVs, two 12-ft LED walls, full surround sound, and a kitchen that stays open late. There is no better place to watch the game — and it\'s not even close.',
  },
  {
    num: '02',
    tag: 'Lower Level',
    title: 'The Basement Nightclub',
    color: '#9D4EDD',
    bg: '/images/basement.jpg',
    link: '/the-basement',
    linkLabel: 'Explore The Basement',
    features: ['Professional Stage','Full Sound Rig & Lights','12-Ft LED Wall','Dance Floor','VIP Section w/ Private Bartender','Live Music Every Weekend'],
    desc: 'Tucked beneath the restaurant, The Basement is Clemson\'s premier live music and nightlife venue. Live bands, DJs, a professional stage and sound rig, 12-ft LED wall, and a VIP section with private bartender.',
  },
  {
    num: '03',
    tag: 'Outdoor',
    title: 'Covered Patios',
    color: '#F56520',
    bg: '/images/covered-patios.jpg',
    link: '/#findus',
    linkLabel: 'Get Directions',
    features: ['Two Covered All-Weather Patios','Outdoor Bar Service','Game Day Ready','Great for Groups','Rain or Shine'],
    desc: 'Two fully covered patios mean the party never stops — rain or shine. Full outdoor bar service, comfortable seating, and the perfect spot to enjoy Clemson weather with a cold drink in hand.',
  },
  {
    num: '04',
    tag: 'Outdoor',
    title: 'Deck, Turf & LED Wall',
    color: '#9D4EDD',
    bg: '/images/outdoor-screen.jpg',
    link: '/game-day',
    linkLabel: 'Game Day Info',
    features: ['Massive Open Deck','Artificial Turf Area','12-Ft Outdoor LED Wall','Outdoor Bar','Best Outdoor Game Day Setup in Clemson'],
    desc: 'Our sprawling outdoor deck and turf area is built for game days and big nights. The 12-ft outdoor LED wall means you never miss a play — even outside. It\'s the best outdoor sports bar setup in Clemson.',
  },
]

export default function Venues() {
  return (
    <div className="bg-[#04030A] min-h-screen">

      {/* Hero */}
      <div className="relative pt-32 pb-16 px-[5vw] overflow-hidden">
        <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg,#0e0800,#04030A,#0e0800)' }} />
        <div className="absolute inset-0 opacity-5" style={{ backgroundImage: 'repeating-linear-gradient(45deg,transparent,transparent 40px,rgba(245,101,32,0.4) 40px,rgba(245,101,32,0.4) 41px)' }} />
        <div className="relative z-[1]">
          <div className="flex items-center gap-3 font-ui text-[13px] font-bold tracking-[.28em] uppercase text-orange mb-4">
            <span className="w-8 h-0.5 bg-orange" />101 Keith Street · Clemson, SC
          </div>
          <h1 className="font-display text-[clamp(64px,12vw,160px)] leading-[.85] text-white mb-4">
            One Address.<br /><span className="text-orange">Four Spaces.</span>
          </h1>
          <p className="font-cond text-[clamp(16px,2vw,24px)] text-cream/55 max-w-[680px] tracking-wide">
            Restaurant, sports bar, nightclub, covered patios, and a massive outdoor deck with LED wall. There's nothing else like it in Clemson.
          </p>
        </div>
      </div>

      {/* Venues */}
      <section className="px-[5vw] py-16">
        <div className="flex flex-col gap-20 max-w-[1200px] mx-auto">
          {venues.map((venue, i) => (
            <motion.div key={venue.num} {...inView(0)}
              className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${i % 2 === 1 ? 'lg:[&>*:first-child]:order-2' : ''}`}>

              {/* Image */}
              <div className="relative overflow-hidden border border-white/[0.07]" style={{ aspectRatio: '4/3' }}>
                <img src={venue.bg} alt={venue.title} className="w-full h-full object-cover hover:scale-[1.04] transition-transform duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute top-4 left-4 font-ui text-[9px] font-bold tracking-[.2em] uppercase px-3 py-1.5"
                  style={{ background: venue.color, color: '#04030A' }}>{venue.tag}</div>
                <div className="absolute bottom-4 left-4">
                  <div className="font-display text-[clamp(28px,4vw,48px)] text-white leading-none">{venue.title}</div>
                </div>
                <div className="absolute top-4 right-4 font-display text-[64px] leading-none"
                  style={{ color: `${venue.color}20` }}>{venue.num}</div>
              </div>

              {/* Info */}
              <div>
                <div className="flex items-center gap-3 font-ui text-[11px] font-bold tracking-[.28em] uppercase mb-4"
                  style={{ color: venue.color }}>
                  <span className="w-6 h-0.5" style={{ background: venue.color }} />{venue.tag}
                </div>
                <h2 className="font-display text-[clamp(36px,5vw,64px)] leading-none text-white mb-5">{venue.title}</h2>
                <p className="text-[15px] text-cream/75 leading-[1.85] mb-6">{venue.desc}</p>
                <div className="grid grid-cols-1 gap-2 mb-8">
                  {venue.features.map(f => (
                    <div key={f} className="flex items-center gap-3 font-ui text-[12px] font-bold tracking-[.08em] uppercase text-cream/65">
                      <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: venue.color }} />
                      {f}
                    </div>
                  ))}
                </div>
                <Link to={venue.link}
                  className="font-ui text-[12px] font-bold tracking-[.18em] uppercase px-8 py-3.5 no-underline clip-angled inline-block transition-colors duration-200"
                  style={{ background: venue.color, color: '#04030A' }}>
                  {venue.linkLabel} →
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="px-[5vw] py-[80px] text-center relative overflow-hidden mt-8" style={{ background: 'linear-gradient(135deg,#0e0800,#08060F)' }}>
        <div className="absolute inset-0 opacity-5" style={{ backgroundImage: 'repeating-linear-gradient(45deg,transparent,transparent 40px,rgba(245,101,32,0.4) 40px,rgba(245,101,32,0.4) 41px)' }} />
        <motion.div {...inView(0)} className="relative z-[1]">
          <h2 className="font-display text-[clamp(40px,7vw,100px)] leading-none text-white mb-4">
            Come See It<br /><span className="text-orange">For Yourself.</span>
          </h2>
          <p className="text-cream/55 text-[15px] mb-8 max-w-[500px] mx-auto">
            101 Keith Street · Clemson, SC · Wed 4PM–12AM · Thu–Sat 11AM–2AM
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <a href="/#findus" className="font-ui text-[12px] font-bold tracking-[.18em] uppercase bg-orange text-black px-10 py-4 no-underline clip-angled hover:bg-white transition-colors duration-200">
              Get Directions
            </a>
            <Link to="/#events-cta" className="font-ui text-[12px] font-bold tracking-[.18em] uppercase border border-orange/40 text-cream px-10 py-4 no-underline hover:border-orange hover:text-orange transition-all duration-200">
              Book an Event
            </a>
          </div>
        </motion.div>
      </section>

    </div>
  )
}
