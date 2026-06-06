import { useState } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

const inView = (delay = 0) => ({
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-60px' },
  transition: { duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] }
})

const schedule = [
  { date: 'Sep 5',  opponent: 'LSU',               location: 'Baton Rouge, LA',  home: false, time: '7:30 PM',  tv: 'ABC',  rivalry: true  },
  { date: 'Sep 12', opponent: 'Georgia Southern',   location: 'Death Valley',     home: true,  time: '7:30 PM',  tv: 'ACCN'                 },
  { date: 'Sep 19', opponent: 'North Carolina',     location: 'Death Valley',     home: true,  time: '12:00 PM', tv: 'ESPN'                 },
  { date: 'Sep 25', opponent: 'California',         location: 'Berkeley, CA',     home: false, time: '10:30 PM', tv: 'ESPN'                 },
  { date: 'Oct 3',  opponent: 'Miami',              location: 'Death Valley',     home: true,  time: 'TBA',      tv: 'TBA'                  },
  { date: 'Oct 17', opponent: 'Charleston Southern',location: 'Death Valley',     home: true,  time: 'TBA',      tv: 'TBA'                  },
  { date: 'Oct 24', opponent: 'Virginia Tech',      location: 'Death Valley',     home: true,  time: 'TBA',      tv: 'TBA'                  },
  { date: 'Oct 31', opponent: 'Florida State',      location: 'Tallahassee, FL',  home: false, time: 'TBA',      tv: 'TBA'                  },
  { date: 'Nov 7',  opponent: 'Syracuse',           location: 'Syracuse, NY',     home: false, time: 'TBA',      tv: 'TBA'                  },
  { date: 'Nov 14', opponent: 'Georgia Tech',       location: 'Death Valley',     home: true,  time: 'TBA',      tv: 'TBA'                  },
  { date: 'Nov 20', opponent: 'Duke',               location: 'Durham, NC',       home: false, time: '7:30 PM',  tv: 'ESPN'                 },
  { date: 'Nov 28', opponent: 'South Carolina',     location: 'Death Valley',     home: true,  time: 'TBA',      tv: 'TBA',  rivalry: true  },
]

const features = [
  { title: 'Every Game Live',       desc: 'Every Clemson game on our massive screens. Never miss a play.' },
  { title: '$2 Tall Boys All Day',  desc: 'Damn Good Beer flowing all game long. Ice cold, every game.' },
  { title: 'Full Kitchen Open',     desc: "Clemson's best tenders, dogs, burgers & more. Kitchen open late." },
  { title: 'Game Day Audio',        desc: 'Full surround sound. Feel like you\'re in Death Valley.' },
  { title: 'Game Day Specials',     desc: 'Drink specials and deals all season long.' },
  { title: 'Best Seat In Clemson',  desc: 'Multiple screens, great sightlines, no bad seats.' },
]

function GameCard({ game, index }) {
  const today = new Date()
  const gameDate = new Date(`2026 ${game.date}`)
  const isPast = gameDate < today
  const upcoming = schedule.filter(g => new Date(`2026 ${g.date}`) >= today)
  const isNext = upcoming.length > 0 && upcoming[0].opponent === game.opponent

  return (
    <motion.div
      className={`relative border rounded-sm overflow-hidden ${
        isNext ? 'border-orange' : isPast ? 'border-white/[0.04]' : 'border-white/[0.08] hover:border-orange/30'
      }`}
      style={{ background: isNext ? 'rgba(245,101,32,0.08)' : isPast ? 'rgba(255,255,255,0.01)' : 'rgba(255,255,255,0.03)' }}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: (index % 3) * 0.06 }}
    >
      {isNext && (
        <div className="font-ui text-[9px] font-bold tracking-[.2em] uppercase text-center py-1.5" style={{ background: '#F56520', color: '#04030A' }}>
          Next Game — Watch It Here!
        </div>
      )}
      <div className="p-5">
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2 flex-wrap">
              <span className={`font-ui text-[10px] font-bold tracking-[.12em] uppercase px-2 py-0.5 ${game.home ? 'bg-orange/20 text-orange' : 'bg-white/8 text-cream/50'}`}>
                {game.home ? 'Home' : 'Away'}
              </span>
              {game.rivalry && (
                <span className="font-ui text-[10px] font-bold tracking-[.12em] uppercase px-2 py-0.5 bg-purple-bright/20 text-purple-bright">Rivalry</span>
              )}
              {isPast && <span className="font-ui text-[10px] text-cream/25 tracking-wider">Completed</span>}
            </div>
            <div className={`font-display text-[clamp(20px,2.5vw,30px)] leading-none mb-1 ${isPast ? 'text-white/40' : 'text-white'}`}>
              {!game.home && <span className="text-orange/60">@ </span>}{game.opponent}
            </div>
            <div className="font-ui text-[11px] text-cream/40">{game.location}</div>
          </div>
          <div className="text-right flex-shrink-0">
            <div className={`font-display text-[clamp(16px,2vw,24px)] ${isPast ? 'text-orange/40' : 'text-orange'}`}>{game.date}</div>
            <div className="font-ui text-[11px] text-cream/40 mt-0.5">{game.time}</div>
            {game.tv && game.tv !== 'TBA' && (
              <div className="font-ui text-[10px] font-bold tracking-[.1em] uppercase text-cream/30 mt-0.5">{game.tv}</div>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default function GameDay() {
  const [filter, setFilter] = useState('all')
  const filtered = schedule.filter(g =>
    filter === 'all' ? true : filter === 'home' ? g.home : !g.home
  )

  return (
    <div className="bg-[#04030A] min-h-screen">

      {/* Hero */}
      <div className="relative min-h-[90vh] flex items-end overflow-hidden pb-20">
        <img src="/images/clemson-field.jpg" alt="Clemson Game Day"
          className="absolute inset-0 w-full h-full object-cover"
          style={{ filter: 'brightness(0.2) saturate(1.4)' }} />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg,rgba(4,3,10,0.2) 0%,rgba(4,3,10,0.98) 100%)' }} />
        <div className="relative z-[1] px-[5vw] w-full pt-24">
          <motion.div {...inView(0)}>
            <div className="flex items-center gap-3 font-ui text-[13px] font-bold tracking-[.28em] uppercase text-orange mb-5">
              <span className="w-8 h-0.5 bg-orange" />No Better Place To Watch The Game
            </div>
            <h1 className="font-display text-[clamp(72px,16vw,200px)] leading-[.82] text-white mb-6">
              Game<br /><span className="text-orange">Day</span>
            </h1>
            <p className="font-cond text-[clamp(18px,2.5vw,28px)] text-cream/60 max-w-[600px] mb-10 tracking-wide">
              Every Clemson game. Every screen. $2 Tall Boys all day. Best food in town.
            </p>
            <div className="flex gap-4 flex-wrap">
              <Link to="/menu" className="font-ui text-[12px] font-bold tracking-[.18em] uppercase bg-orange text-black px-10 py-4 no-underline clip-angled hover:bg-white transition-colors duration-200">
                See Menu
              </Link>
              <a href="tel:8647225001" className="font-ui text-[12px] font-bold tracking-[.18em] uppercase border border-orange/40 text-cream px-10 py-4 no-underline hover:border-orange hover:text-orange transition-all duration-200">
                (864) 722-5001
              </a>
            </div>
          </motion.div>
        </div>
      </div>


      {/* $1 Mimosa Callout */}
      <section className="px-[5vw] py-[80px] relative overflow-hidden" style={{ background: 'linear-gradient(135deg,#1a0a00,#04030A,#1a0a00)' }}>
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'repeating-linear-gradient(45deg,transparent,transparent 30px,rgba(245,101,32,0.4) 30px,rgba(245,101,32,0.4) 31px)' }} />
        <motion.div {...inView(0)} className="relative z-[1] text-center">
          <div className="inline-block font-ui text-[10px] font-bold tracking-[.3em] uppercase px-4 py-2 mb-6 border border-orange/30 text-orange">
            Game Day Special · Every Gameday
          </div>
          <h2 className="font-display text-[clamp(72px,18vw,220px)] leading-[.82] text-white mb-2">
            $1<br /><span className="text-orange">Mimosas</span>
          </h2>
          <div className="font-display text-[clamp(24px,4vw,52px)] text-cream/60 mb-6">Starting at 10 AM · Every Game Day</div>
          <p className="font-cond text-[clamp(16px,2vw,24px)] text-cream/55 max-w-[560px] mx-auto mb-10 tracking-wide">
            People line up for these. Get here early — doors open at 10 AM on game days and the mimosas flow until they don't.
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <a href="tel:8647225001" className="font-ui text-[12px] font-bold tracking-[.18em] uppercase bg-orange text-black px-10 py-4 no-underline clip-angled hover:bg-white transition-colors duration-200">
              (864) 722-5001
            </a>
            <Link to="/#findus" className="font-ui text-[12px] font-bold tracking-[.18em] uppercase border border-orange/40 text-cream px-10 py-4 no-underline hover:border-orange hover:text-orange transition-all duration-200">
              Get Directions
            </Link>
          </div>
        </motion.div>
      </section>

      {/* Features */}
      <section className="px-[5vw] py-[100px]" style={{ background: 'linear-gradient(180deg,#04030A,#08060F)' }}>
        <motion.div {...inView(0)} className="mb-12">
          <div className="flex items-center gap-3 font-ui text-[11px] font-bold tracking-[.28em] uppercase text-orange mb-3">
            <span className="w-6 h-0.5 bg-orange" />The Experience
          </div>
          <h2 className="font-display text-[clamp(40px,6vw,80px)] leading-none text-white">
            The Best Seat<br /><span className="text-orange">In Clemson</span>
          </h2>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {features.map((f, i) => (
            <motion.div key={f.title} {...inView(i * 0.07)}
              className={`border p-7 transition-all duration-300 group ${f.hot ? 'border-orange/50 md:col-span-2 lg:col-span-1' : 'border-white/[0.06] hover:border-orange/25'}`}
              style={{ background: f.hot ? 'rgba(245,101,32,0.08)' : 'rgba(255,255,255,0.03)' }}>
              {f.hot && <div className="font-ui text-[9px] font-bold tracking-[.2em] uppercase text-orange/80 mb-3">🏆 Fan Favorite · Opens at 10 AM</div>}
              <div className={`w-8 h-0.5 mb-5 transition-all duration-300 ${f.hot ? 'bg-orange w-12' : 'bg-orange group-hover:w-16'}`} />
              <h3 className={`font-display leading-none mb-2 group-hover:text-orange transition-colors duration-200 ${f.hot ? 'text-orange text-[clamp(40px,5vw,64px)]' : 'text-[30px] text-white'}`}>{f.title}</h3>
              <p className="text-[13px] text-cream/65 leading-relaxed">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* $2 Beer strip */}
      <div className="px-[5vw] py-12 border-y border-orange/10" style={{ background: 'rgba(245,101,32,0.05)' }}>
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <div className="font-display text-[clamp(36px,6vw,72px)] text-white leading-none">
              $2 Tall Boys — <span className="text-orange">All Day.</span>
            </div>
            <p className="text-cream/55 mt-2 text-[14px]">Plus game day deals all season long.</p>
          </div>
          <Link to="/menu" className="font-ui text-[12px] font-bold tracking-[.18em] uppercase bg-orange text-black px-10 py-4 no-underline clip-angled hover:bg-white transition-colors duration-200 flex-shrink-0">
            Food Menu
          </Link>
        </div>
      </div>

      {/* Schedule */}
      <section className="px-[5vw] py-[100px]">
        <motion.div {...inView(0)} className="mb-10">
          <div className="flex items-center gap-3 font-ui text-[11px] font-bold tracking-[.28em] uppercase text-orange mb-3">
            <span className="w-6 h-0.5 bg-orange" />2026 Season
          </div>
          <h2 className="font-display text-[clamp(40px,6vw,80px)] leading-none text-white mb-2">
            Clemson Tigers<br /><span className="text-orange">Schedule</span>
          </h2>
          <p className="text-cream/45 text-[14px]">We'll be watching every game. Come watch with us.</p>
        </motion.div>

        <div className="flex gap-3 mb-8 flex-wrap">
          {[['all','All Games'],['home','Home Games'],['away','Away Games']].map(([val, label]) => (
            <button key={val} onClick={() => setFilter(val)}
              className={`font-ui text-[11px] font-bold tracking-[.15em] uppercase px-5 py-2.5 border transition-all duration-200 ${
                filter === val ? 'bg-orange text-black border-orange' : 'text-cream/60 border-white/15 hover:border-orange/40 hover:text-white bg-transparent'
              }`}>
              {label}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {filtered.map((game, i) => <GameCard key={game.opponent} game={game} index={i} />)}
        </div>

        <div className="mt-6 text-center">
          <p className="font-ui text-[11px] text-cream/25 tracking-[.1em] uppercase">
            All times Eastern · Schedule subject to change · TBA games times when announced. 
          </p>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="px-[5vw] py-[80px] text-center relative overflow-hidden" style={{ background: 'linear-gradient(135deg,#0e0800,#08060F)' }}>
        <div className="absolute inset-0 opacity-5" style={{ backgroundImage: 'repeating-linear-gradient(45deg,transparent,transparent 40px,rgba(245,101,32,0.4) 40px,rgba(245,101,32,0.4) 41px)' }} />
        <motion.div {...inView(0)} className="relative z-[1]">
          <h2 className="font-display text-[clamp(40px,7vw,100px)] leading-none text-white mb-4">
            We'll Save<br />You A Seat<span className="text-orange">.</span>
          </h2>
          <div className="flex gap-4 justify-center flex-wrap">
            <Link to="/#findus" className="font-ui text-[12px] font-bold tracking-[.18em] uppercase bg-orange text-black px-10 py-4 no-underline clip-angled hover:bg-white transition-colors duration-200">
              Get Directions
            </Link>
            <a href="tel:8647225001" className="font-ui text-[12px] font-bold tracking-[.18em] uppercase border border-orange/40 text-cream px-10 py-4 no-underline hover:border-orange hover:text-orange transition-all duration-200">
              Call Us
            </a>
          </div>
        </motion.div>
      </section>

    </div>
  )
}
