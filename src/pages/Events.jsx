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

function EventCard({ event, index }) {
  const d = new Date(event.date + 'T00:00:00')
  const month = d.toLocaleString('default', { month: 'short' }).toUpperCase()
  const day   = d.getDate()
  const dow   = d.toLocaleString('default', { weekday: 'short' }).toUpperCase()

  return (
    <motion.div
      className={`relative border overflow-hidden group transition-all duration-300 ${
        event.featured ? 'border-orange/50' : 'border-white/[0.07] hover:border-purple-bright/30'
      }`}
      style={{ background: event.featured ? 'rgba(245,101,32,0.05)' : 'rgba(255,255,255,0.03)' }}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: (index % 4) * 0.06 }}
    >
      {event.featured && (
        <div className="font-ui text-[9px] font-bold tracking-[.2em] uppercase px-3 py-1.5 text-center w-full" style={{ background: '#F56520', color: '#04030A' }}>
          Featured Event
        </div>
      )}
      {event.soldOut && (
        <div className="absolute top-0 right-0 font-ui text-[9px] font-bold tracking-[.2em] uppercase px-3 py-1.5 bg-white/10 text-white/50">Sold Out</div>
      )}

      <div className="flex items-stretch">
        {/* Date column */}
        <div className="flex flex-col items-center justify-center px-5 py-6 border-r border-white/[0.06] flex-shrink-0 w-[86px]"
          style={{ background: 'rgba(157,78,221,0.08)' }}>
          <div className="font-ui text-[10px] font-bold tracking-[.15em] text-purple-bright">{month}</div>
          <div className="font-display text-[48px] text-white leading-none">{day}</div>
          <div className="font-ui text-[9px] text-cream/40 tracking-[.1em] uppercase mt-1">{dow}</div>
        </div>

        {/* Event image (if exists) */}
        {event.image && (
          <div className="flex-shrink-0 hidden sm:block overflow-hidden border-r border-white/[0.06]" style={{ width: '160px', background: 'rgba(0,0,0,0.5)', alignSelf: 'stretch' }}>
            <img src={event.image} alt={event.bandName} style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top', display: 'block' }} />
          </div>
        )}

        {/* Main info */}
        <div className="flex-1 p-5 flex flex-col gap-2 min-w-0">
          <div>
            <h3 className="font-display text-[clamp(20px,2.8vw,34px)] text-white leading-tight group-hover:text-purple-bright transition-colors duration-200">
              {event.bandName}
            </h3>
            <div className="flex items-center gap-3 flex-wrap mt-1">
              <span className="font-ui text-[12px] text-cream/55">{event.time}</span>
              {event.genre && (
                <span className="font-ui text-[10px] border border-white/10 px-2 py-0.5 text-cream/40 uppercase tracking-wider">{event.genre}</span>
              )}
            </div>
          </div>

          {event.description && (
            <p className="text-[13px] text-cream/65 leading-relaxed">{event.description}</p>
          )}

          {/* Price + CTA row */}
          <div className="flex items-start justify-between flex-wrap gap-3 mt-auto pt-3 border-t border-white/[0.05]">
            <div className="font-cond text-[14px] font-bold text-orange uppercase tracking-wide leading-snug max-w-[300px]">
              {event.ticketPrice || 'Free'}
            </div>
            {(event.lineleapUrl || event.ticketUrl) && !event.soldOut && (
              <a href={event.lineleapUrl || event.ticketUrl} target="_blank" rel="noreferrer"
                className="font-ui text-[11px] font-bold tracking-[.15em] uppercase bg-purple-bright text-white px-5 py-2.5 no-underline hover:bg-orange hover:text-black transition-all duration-200 whitespace-nowrap">
                {event.lineleapUrl ? 'Get Tickets on LineLeap' : 'Get Tickets'}
              </a>
            )}
            {event.soldOut && (
              <span className="font-ui text-[11px] uppercase tracking-wider text-white/30 border border-white/10 px-4 py-2">Sold Out</span>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default function Events() {
  const [events, setEvents] = useState([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState('upcoming')

  useEffect(() => {
    client.fetch(`*[_type == "event"] | order(date asc) {
      bandName, date, time, ticketPrice, ticketUrl, lineleapUrl,
      genre, description, featured, soldOut,
      "image": image.asset->url
    }`).then(data => {
      setEvents(data || [])
      setLoading(false)
    }).catch(() => setLoading(false))
  }, [])

  const today = new Date().toISOString().split('T')[0]
  const upcoming = events.filter(e => e.date >= today)
  const past     = events.filter(e => e.date <  today)
  const displayed = filter === 'upcoming' ? upcoming : past

  return (
    <div className="bg-[#04030A] min-h-screen">

      {/* Hero */}
      <div className="relative pt-32 pb-16 px-[5vw] overflow-hidden">
        <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg,#08002a,#04030A,#08002a)' }} />
        <div className="absolute inset-0 opacity-5" style={{ backgroundImage: 'repeating-linear-gradient(45deg,transparent,transparent 40px,rgba(157,78,221,0.5) 40px,rgba(157,78,221,0.5) 41px)' }} />
        <div className="relative z-[1]">
          <div className="flex items-center gap-3 font-ui text-[13px] font-bold tracking-[.28em] uppercase text-purple-bright mb-4">
            <span className="w-8 h-0.5 bg-purple-bright" />The Basement · Live Music
          </div>
          <h1 className="font-display text-[clamp(64px,12vw,160px)] leading-[.85] text-white mb-4">
            Live<br /><span className="text-purple-bright">Events</span>
          </h1>
          <p className="font-cond text-[clamp(16px,2vw,24px)] text-cream/55 max-w-[600px] tracking-wide">
            Live bands and DJs every weekend at The Basement. 101 Keith Street, Clemson SC.
          </p>
        </div>
      </div>

      {/* Events list */}
      <section className="px-[5vw] py-16 max-w-[900px] mx-auto">

        {/* Filter row */}
        <div className="flex gap-3 mb-10 flex-wrap items-center justify-between">
          <div className="flex gap-3">
            {[['upcoming','Upcoming Shows'],['past','Past Shows']].map(([val, label]) => (
              <button key={val} onClick={() => setFilter(val)}
                className={`font-ui text-[11px] font-bold tracking-[.15em] uppercase px-5 py-2.5 border transition-all duration-200 ${
                  filter === val ? 'bg-purple-bright text-white border-purple-bright' : 'text-cream/60 border-white/15 hover:border-purple-bright/40 hover:text-white bg-transparent'
                }`}>
                {label}
              </button>
            ))}
          </div>
          <a href="mailto:info@itsurwiener.com?subject=Band Booking"
            className="font-ui text-[11px] font-bold tracking-[.15em] uppercase border border-orange/30 text-orange px-5 py-2.5 no-underline hover:bg-orange hover:text-black transition-all duration-200">
            Book Your Band
          </a>
        </div>

        {loading && (
          <div className="text-center py-20 text-cream/30 font-ui text-[13px] tracking-[.2em] uppercase">Loading events...</div>
        )}

        {!loading && displayed.length === 0 && (
          <div className="text-center py-20 border border-white/[0.06]" style={{ background: 'rgba(255,255,255,0.02)' }}>
            <div className="font-display text-[clamp(32px,5vw,60px)] text-white/20 mb-3">
              {filter === 'upcoming' ? 'No Upcoming Shows' : 'No Past Shows'}
            </div>
            <p className="text-cream/30 text-[14px]">
              {filter === 'upcoming' ? 'Check back soon — new shows added regularly.' : ''}
            </p>
          </div>
        )}

        {/* Single column event list */}
        <div className="flex flex-col gap-3">
          {displayed.map((event, i) => (
            <EventCard key={event.date + event.bandName} event={event} index={i} />
          ))}
        </div>

      </section>

      {/* Book CTA */}
      <section className="px-[5vw] py-[80px] text-center relative overflow-hidden" style={{ background: 'linear-gradient(135deg,#08002a,#04030A)' }}>
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'repeating-linear-gradient(45deg,transparent,transparent 40px,rgba(157,78,221,0.4) 40px,rgba(157,78,221,0.4) 41px)' }} />
        <motion.div {...inView(0)} className="relative z-[1]">
          <h2 className="font-display text-[clamp(40px,7vw,90px)] leading-none text-white mb-4">
            Want to Play<br /><span className="text-purple-bright">The Basement?</span>
          </h2>
          <p className="text-cream/55 text-[15px] mb-8 max-w-[480px] mx-auto">
            We book live bands and performers every weekend. Reach out and let's talk.
          </p>
          <a href="mailto:info@itsurwiener.com?subject=Band Booking"
            className="font-ui text-[12px] font-bold tracking-[.18em] uppercase bg-purple-bright text-white px-10 py-4 no-underline clip-angled hover:bg-orange hover:text-black transition-all duration-300">
            Contact Us
          </a>
        </motion.div>
      </section>

    </div>
  )
}
