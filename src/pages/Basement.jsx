import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { client } from '@/lib/sanity'

const inView = (delay = 0) => ({
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-60px' },
  transition: { duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] }
})

const features = [
  { title: 'Live Music',         desc: 'Live bands and performers every weekend. Clemson\'s best live music venue.' },
  { title: 'DJ Nights',          desc: 'When the band wraps, the DJ takes over. The party does not stop.' },
  { title: 'Full Bar',           desc: 'Complete bar service including our Famous Litchers® and $2 Tall Boys.' },
  { title: 'Private Events',     desc: 'Book The Basement for your next private event, birthday, or corporate function.' },
  { title: 'Late Night Kitchen', desc: 'Full kitchen open late. Fuel up without leaving the party.' },
  { title: 'Exclusive Vibe',     desc: 'A separate space from the restaurant. Once you\'re in, you\'ll know why.' },
]

function BasementEvents() {
  const [events, setEvents] = useState([])

  useEffect(() => {
    const today = new Date().toISOString().split('T')[0]
    client.fetch(`*[_type == "event" && date >= $today] | order(date asc) [0...4] {
      bandName, date, time, ticketPrice, ticketUrl, soldOut
    }`, { today }).then(data => setEvents(data || [])).catch(() => {})
  }, [])

  if (events.length === 0) return null

  return (
    <section className="px-[5vw] py-[80px]" style={{ background: 'linear-gradient(180deg,#08060F,#04030A)' }}>
      <motion.div initial={{ opacity:0, y:30 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} transition={{ duration:0.7 }}>
        <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
          <div>
            <div className="flex items-center gap-3 font-ui text-[11px] font-bold tracking-[.28em] uppercase text-purple-bright mb-3">
              <span className="w-6 h-0.5 bg-purple-bright" />The Basement
            </div>
            <h2 className="font-display text-[clamp(36px,5vw,64px)] leading-none text-white">
              Upcoming <span className="text-purple-bright">Shows</span>
            </h2>
          </div>
          <Link to="/events" className="font-ui text-[11px] font-bold tracking-[.15em] uppercase border border-purple-bright/30 text-purple-bright px-5 py-2.5 no-underline hover:bg-purple-bright hover:text-white transition-all duration-200">
            Full Calendar
          </Link>
        </div>

        <div className="flex flex-col gap-2">
          {events.map(e => {
            const d = new Date(e.date + 'T00:00:00')
            const month = d.toLocaleString('default', { month: 'short' }).toUpperCase()
            const day = d.getDate()
            const dow = d.toLocaleString('default', { weekday: 'short' }).toUpperCase()
            return (
              <div key={e.date + e.bandName}
                className="flex items-center gap-0 border border-white/[0.07] overflow-hidden hover:border-purple-bright/25 transition-all duration-200"
                style={{ background: 'rgba(255,255,255,0.03)' }}>
                <div className="flex flex-col items-center justify-center px-4 py-4 border-r border-white/[0.06] min-w-[70px]" style={{ background: 'rgba(157,78,221,0.08)' }}>
                  <div className="font-ui text-[9px] font-bold tracking-[.12em] text-purple-bright">{month}</div>
                  <div className="font-display text-[36px] text-white leading-none">{day}</div>
                  <div className="font-ui text-[8px] text-cream/35 tracking-[.1em]">{dow}</div>
                </div>
                <div className="flex-1 px-5">
                  <div className="font-display text-[clamp(20px,2.5vw,30px)] text-white leading-none">{e.bandName}</div>
                  <div className="font-ui text-[11px] text-cream/45 mt-0.5">{e.time}</div>
                </div>
                <div className="px-5 flex-shrink-0 flex items-center gap-3">
                  <span className="font-display text-[22px] text-orange">{e.ticketPrice || 'Free'}</span>
                  {e.ticketUrl && !e.soldOut && (
                    <a href={e.ticketUrl} target="_blank" rel="noreferrer"
                      className="font-ui text-[10px] font-bold tracking-[.12em] uppercase bg-purple-bright text-white px-3 py-1.5 no-underline hover:bg-orange hover:text-black transition-all duration-200">
                      Tickets
                    </a>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      </motion.div>
    </section>
  )
}

export default function Basement() {
  return (
    <div className="bg-[#04030A] min-h-screen overflow-hidden">

      {/* Hero */}
      <div className="relative min-h-screen flex items-end pb-24 overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
          <img src="/images/basement-hero.jpg" alt="" className="w-full object-cover opacity-40" style={{ minHeight: '100%' }} />
        </div>
        <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse 100% 60% at 50% 100%, rgba(4,3,10,1) 20%, transparent 80%), radial-gradient(ellipse 100% 60% at 50% 0%, rgba(4,3,10,0.9) 20%, transparent 80%), radial-gradient(ellipse 60% 40% at 50% 50%, rgba(82,45,128,0.25) 0%, transparent 100%)' }} />
        <div className="absolute top-0 left-1/4 w-px h-full opacity-20" style={{ background: 'linear-gradient(180deg,transparent,#9D4EDD,transparent)' }} />
        <div className="absolute top-0 right-1/3 w-px h-full opacity-15" style={{ background: 'linear-gradient(180deg,transparent,#F56520,transparent)' }} />

        <div className="relative z-[1] px-[5vw] w-full pt-32">
          <motion.div {...inView(0)}>
            <div className="flex items-center gap-3 font-ui text-[13px] font-bold tracking-[.28em] uppercase text-white mb-5">
              <span className="w-8 h-0.5 bg-white" />If You Know . . . You Know
            </div>
            {/* Logo replaces heading */}
            <img src="/images/basement-logo.png" alt="The Basement"
              className="mb-6 max-w-full"
              style={{ width: 'clamp(320px,55vw,750px)', height: 'auto' }} />
            <p className="font-cond text-[clamp(18px,2.5vw,28px)] text-cream/60 max-w-[600px] mb-10 tracking-wide">
              Live music every weekend. Clemson's best kept secret — hiding right below the restaurant.
            </p>
            <div className="flex gap-4 flex-wrap">
              <a href="mailto:info@itsurwiener.com?subject=Basement Booking"
                className="font-ui text-[12px] font-bold tracking-[.18em] uppercase bg-purple-bright text-white px-10 py-4 no-underline clip-angled hover:bg-orange hover:text-black transition-all duration-300">
                Book The Basement
              </a>
              <a href="tel:8647225001"
                className="font-ui text-[12px] font-bold tracking-[.18em] uppercase border border-purple-bright/40 text-cream px-10 py-4 no-underline hover:border-purple-bright hover:text-purple-bright transition-all duration-200">
                (864) 722-5001
              </a>
            </div>
          </motion.div>
        </div>
      </div>

      {/* If You Know section */}
      <section className="px-[5vw] py-[100px]" style={{ background: 'linear-gradient(180deg,#04030A,#08060F)' }}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center max-w-[1200px] mx-auto">
          <motion.div {...inView(0)}>
            <div className="flex items-center gap-3 font-ui text-[11px] font-bold tracking-[.28em] uppercase text-orange mb-4">
              <span className="w-6 h-0.5 bg-orange" />Clemson's Underground
            </div>
            <h2 className="font-display text-[clamp(44px,6vw,80px)] leading-none text-white mb-6">
              If You Know<span className="text-purple-bright">.</span><span className="text-orange">.</span><span className="text-purple-bright">.</span><br />You Know<span className="text-orange">!</span>
            </h2>
            <p className="text-[15px] text-cream/75 leading-[1.9] mb-5">
              Tucked beneath itsurwiener, The Basement is Clemson's premier live music and nightlife venue. It's not just a bar — it's an experience. The kind of place that locals keep to themselves.
            </p>
            <p className="text-[15px] text-cream/75 leading-[1.9] mb-8">
              Live bands, DJs, late-night eats, and the full itsurwiener bar — all in one underground space that hits different after dark.
            </p>
            <div className="grid grid-cols-2 gap-3">
              {['Live Music Every Weekend','Full Bar Service','Late Night Kitchen','Private Events'].map(item => (
                <div key={item} className="flex items-center gap-2 font-ui text-[12px] font-bold tracking-[.1em] uppercase text-cream/70">
                  <span className="w-1.5 h-1.5 rounded-full bg-purple-bright flex-shrink-0" />
                  {item}
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div {...inView(0.15)} className="relative overflow-hidden" style={{ aspectRatio: '4/3' }}>
            <img src="/images/basement.jpg" alt="The Basement" className="w-full h-full object-cover" />
            <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg,rgba(82,45,128,0.4),transparent 60%)' }} />
            <div className="absolute bottom-6 left-6">
              <div className="font-display text-[clamp(24px,3vw,40px)] text-white leading-none">The Basement</div>
              <div className="font-ui text-[11px] tracking-[.2em] uppercase text-purple-bright mt-1">Live Music · Every Weekend</div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Purple ticker */}
      <div className="overflow-hidden py-5 border-y border-purple-bright/20" style={{ background: '#522D80' }}>
        <div className="inline-flex whitespace-nowrap" style={{ animation: 'ticker 30s linear infinite' }}>
          {Array(3).fill(['Live Music Every Weekend','The Basement','Clemson\'s Best Nightlife','Book Your Event','DJs & Live Bands','Full Bar Service','Late Night Kitchen','If You Know...You Know']).flat().map((item, i) => (
            <span key={i} className="font-display text-[22px] tracking-[.06em] text-white inline-flex items-center px-8">
              {item}<span className="ml-8 opacity-50">✦</span>
            </span>
          ))}
        </div>
      </div>

      {/* Features */}
      <section className="px-[5vw] py-[100px]" style={{ background: 'linear-gradient(180deg,#08060F,#04030A)' }}>
        <motion.div {...inView(0)} className="mb-12">
          <div className="flex items-center gap-3 font-ui text-[11px] font-bold tracking-[.28em] uppercase text-purple-bright mb-4">
            <span className="w-6 h-0.5 bg-purple-bright" />What's Down There
          </div>
          <h2 className="font-display text-[clamp(44px,6vw,80px)] leading-none text-white">
            The Full<br /><span className="text-purple-bright">Experience</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {features.map((f, i) => (
            <motion.div key={f.title} {...inView(i * 0.07)}
              className="border border-white/[0.06] p-7 hover:border-purple-bright/30 transition-all duration-300 group"
              style={{ background: 'rgba(255,255,255,0.03)' }}>
              <div className="w-6 h-0.5 bg-purple-bright mb-5 group-hover:w-14 transition-all duration-300" />
              <h3 className="font-display text-[30px] text-white leading-none mb-3 group-hover:text-purple-bright transition-colors duration-200">{f.title}</h3>
              <p className="text-[13px] text-cream/65 leading-relaxed">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Live Music strip */}
      <div className="px-[5vw] py-14 border-y border-purple-bright/10" style={{ background: 'rgba(157,78,221,0.06)' }}>
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <div className="font-display text-[clamp(36px,6vw,72px)] text-white leading-none">
              Live Music — <span className="text-purple-bright">Every Weekend.</span>
            </div>
            <p className="text-cream/55 mt-2 text-[14px]">Bands, DJs, and performers all season long. Check our events page for the full lineup.</p>
          </div>
          <Link to="/events" className="font-ui text-[12px] font-bold tracking-[.18em] uppercase bg-purple-bright text-white px-10 py-4 no-underline clip-angled hover:bg-orange hover:text-black transition-all duration-300 flex-shrink-0">
            See Events
          </Link>
        </div>
      </div>

      {/* Live Events Preview */}
      <BasementEvents />

      {/* VIP Section */}
      <section className="px-[5vw] py-[100px]" style={{ background: 'linear-gradient(180deg,#04030A,#08060F)' }}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center max-w-[1200px] mx-auto">

          <motion.div {...inView(0.15)} className="relative overflow-hidden order-2 lg:order-1" style={{ aspectRatio:'3/4' }}>
            <img src="/images/vip-section.jpg" alt="VIP Section" className="w-full h-full object-cover hover:scale-[1.03] transition-transform duration-700" />
            <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg,rgba(82,45,128,0.3),transparent 60%)' }} />
            <div className="absolute top-4 left-4 font-ui text-[10px] font-bold tracking-[.2em] uppercase px-3 py-1.5" style={{ background: '#9D4EDD', color: 'white' }}>VIP Access</div>
          </motion.div>

          <motion.div {...inView(0)} className="order-1 lg:order-2">
            <div className="flex items-center gap-3 font-ui text-[11px] font-bold tracking-[.28em] uppercase text-purple-bright mb-4">
              <span className="w-6 h-0.5 bg-purple-bright" />Elevated Experience
            </div>
            <h2 className="font-display text-[clamp(44px,6vw,80px)] leading-none text-white mb-6">
              VIP Section<br /><span className="text-purple-bright">& Private Bar</span>
            </h2>
            <p className="text-[15px] text-cream/75 leading-[1.9] mb-5">
              The Basement's VIP section takes the experience to another level. Plush seating, elevated décor, and your own dedicated private bartender — so you and your group never wait for a drink.
            </p>
            <p className="text-[15px] text-cream/75 leading-[1.9] mb-8">
              Perfect for birthdays, bachelor/bachelorette parties, or any occasion worth celebrating in style. Reserve the VIP section and let us take care of the rest.
            </p>
            <div className="grid grid-cols-1 gap-3 mb-8">
              {[
                { label: 'Private Bartender',   desc: 'Your own dedicated bartender for the night.' },
                { label: 'Reserved Seating',    desc: 'Exclusive lounge seating for your entire group.' },
                { label: 'Bottle Service',      desc: 'Premium bottle service available on request.' },
                { label: 'Custom Packages',     desc: 'Tailored packages for any size group or occasion.' },
              ].map(item => (
                <div key={item.label} className="flex items-start gap-4 border border-purple-bright/15 px-4 py-3" style={{ background: 'rgba(157,78,221,0.05)' }}>
                  <span className="w-1.5 h-1.5 rounded-full bg-purple-bright flex-shrink-0 mt-2" />
                  <div>
                    <div className="font-cond text-[17px] font-bold text-white uppercase tracking-wide">{item.label}</div>
                    <div className="text-[12px] text-cream/55">{item.desc}</div>
                  </div>
                </div>
              ))}
            </div>
            <a href="mailto:info@itsurwiener.com?subject=VIP Section Booking"
              className="font-ui text-[12px] font-bold tracking-[.18em] uppercase bg-purple-bright text-white px-10 py-4 no-underline clip-angled hover:bg-orange hover:text-black transition-all duration-300 inline-block">
              Reserve VIP
            </a>
          </motion.div>

        </div>
      </section>

      {/* Book section */}
      <section className="px-[5vw] py-[100px]" style={{ background: 'linear-gradient(135deg,#0a0020,#04030A,#0a0020)' }}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center max-w-[1200px] mx-auto">
          <motion.div {...inView(0)}>
            <div className="flex items-center gap-3 font-ui text-[11px] font-bold tracking-[.28em] uppercase text-orange mb-4">
              <span className="w-6 h-0.5 bg-orange" />Private Events
            </div>
            <h2 className="font-display text-[clamp(44px,6vw,80px)] leading-none text-white mb-6">
              Book The<br /><span className="text-orange">Basement</span>
            </h2>
            <p className="text-[15px] text-cream/75 leading-[1.9] mb-8">
              Available for private events, birthday parties, corporate functions, and more. Exclusive access to the full space, full bar, and kitchen. Contact us to discuss your event and get a custom quote.
            </p>
            <div className="flex gap-4 flex-wrap">
              <a href="mailto:info@itsurwiener.com?subject=Basement Booking"
                className="font-ui text-[12px] font-bold tracking-[.18em] uppercase bg-orange text-black px-10 py-4 no-underline clip-angled hover:bg-white transition-colors duration-200">
                Email Us
              </a>
              <a href="tel:8647225001"
                className="font-ui text-[12px] font-bold tracking-[.18em] uppercase border border-orange/40 text-cream px-10 py-4 no-underline hover:border-orange hover:text-orange transition-all duration-200">
                (864) 722-5001
              </a>
            </div>
          </motion.div>

          <motion.div {...inView(0.15)} className="grid grid-cols-1 gap-4">
            {[
              { label: 'Birthday Parties',    desc: 'Make it a night to remember. Private bar and exclusive access.' },
              { label: 'Corporate Events',    desc: 'Team outings and company events in a one-of-a-kind venue.' },
              { label: 'Band Bookings',       desc: 'Looking to play The Basement? Reach out to our booking team.' },
              { label: 'Custom Events',       desc: 'Something else in mind? We\'ll make it happen.' },
            ].map((item, i) => (
              <motion.div key={item.label} {...inView(i * 0.08)}
                className="flex items-start gap-4 border border-white/[0.06] p-4 hover:border-orange/25 transition-all duration-200"
                style={{ background: 'rgba(255,255,255,0.03)' }}>
                <span className="w-1.5 h-1.5 rounded-full bg-orange flex-shrink-0 mt-2" />
                <div>
                  <div className="font-cond text-[18px] font-bold text-white uppercase tracking-wide">{item.label}</div>
                  <div className="text-[13px] text-cream/55 mt-0.5">{item.desc}</div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="px-[5vw] py-[80px] text-center relative overflow-hidden" style={{ background: 'linear-gradient(135deg,#0a0020,#04030A)' }}>
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'repeating-linear-gradient(45deg,transparent,transparent 40px,rgba(157,78,221,0.4) 40px,rgba(157,78,221,0.4) 41px)' }} />
        <motion.div {...inView(0)} className="relative z-[1]">
          <h2 className="font-display text-[clamp(52px,10vw,130px)] leading-[.88] text-white mb-10">
            See You<br />Down <span className="text-purple-bright">There.</span>
          </h2>
          <div className="flex gap-4 justify-center flex-wrap">
            <a href="mailto:info@itsurwiener.com?subject=Basement Booking"
              className="font-ui text-[12px] font-bold tracking-[.18em] uppercase bg-purple-bright text-white px-10 py-4 no-underline clip-angled hover:bg-orange hover:text-black transition-all duration-300">
              Book The Basement
            </a>
            <Link to="/events"
              className="font-ui text-[12px] font-bold tracking-[.18em] uppercase border border-purple-bright/40 text-cream px-10 py-4 no-underline hover:border-purple-bright hover:text-purple-bright transition-all duration-200">
              See Events
            </Link>
          </div>
        </motion.div>
      </section>

    </div>
  )
}
