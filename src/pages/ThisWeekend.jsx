import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { client } from '@/lib/sanity'
import PageCTA from '@components/PageCTA'

const inView = (delay = 0) => ({
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-60px' },
  transition: { duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] },
})

// Returns this week's Thu / Fri / Sat as Date objects.
// Sun shows last week's Thu so the page isn't empty the day after.
function getThisWeekendDates() {
  const today = new Date()
  const dow = today.getDay() // 0=Sun … 6=Sat
  const daysToThursday = dow === 0 ? -3 : 4 - dow
  const thu = new Date(today)
  thu.setDate(today.getDate() + daysToThursday)
  thu.setHours(0, 0, 0, 0)
  const fri = new Date(thu); fri.setDate(thu.getDate() + 1)
  const sat = new Date(thu); sat.setDate(thu.getDate() + 2)
  return { thu, fri, sat }
}

function toYMD(d) {
  return d.toISOString().split('T')[0]
}

function fmtDayHeader(d) {
  return d.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })
}

function formatKickoff(dt) {
  if (!dt) return null
  return new Date(dt).toLocaleString('en-US', {
    weekday: 'short', month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit',
  })
}

// ── Event card with photo + full details ─
function EventCard({ event, index }) {
  const hasImage = !!event.imageUrl
  const ticketHref = event.lineleapUrl || event.ticketUrl

  return (
    <motion.div
      className="grid grid-cols-1 lg:grid-cols-2 border border-white/[0.08] overflow-hidden hover:border-purple-bright/20 transition-colors duration-300"
      {...inView(index * 0.08)}
    >
      {/* Photo */}
      <div className="relative overflow-hidden" style={{ minHeight: '280px' }}>
        {hasImage ? (
          <img
            src={event.imageUrl}
            alt={event.bandName}
            className="w-full h-full object-cover absolute inset-0"
          />
        ) : (
          <div
            className="absolute inset-0 flex items-center justify-center"
            style={{ background: 'radial-gradient(ellipse 80% 80% at 50% 50%, rgba(82,45,128,0.2), #08060F)' }}
          >
            <span className="font-display text-[clamp(20px,3vw,36px)] text-white/10 text-center px-6 leading-tight">
              {event.bandName}
            </span>
          </div>
        )}
        {/* gradient fade into details panel on desktop */}
        {hasImage && (
          <div className="absolute inset-0 hidden lg:block"
            style={{ background: 'linear-gradient(to right, transparent 55%, #04030A 100%)' }} />
        )}
        {/* bottom fade on mobile */}
        {hasImage && (
          <div className="absolute inset-0 lg:hidden"
            style={{ background: 'linear-gradient(to bottom, transparent 55%, #04030A 100%)' }} />
        )}
      </div>

      {/* Details */}
      <div className="flex flex-col justify-between px-8 py-9 lg:px-10 lg:py-10"
        style={{ background: 'rgba(255,255,255,0.02)' }}>
        <div>
          {event.genre && (
            <div className="font-ui text-[10px] font-bold tracking-[.22em] uppercase text-purple-bright mb-3">
              {event.genre}
            </div>
          )}
          <h3 className="font-display text-[clamp(32px,4vw,56px)] leading-[.88] text-white mb-5">
            {event.bandName}
          </h3>

          {event.time && (
            <div className="flex items-center gap-3 mb-4 border-l-2 border-orange/40 pl-4">
              <div>
                <div className="font-ui text-[9px] font-bold tracking-[.18em] uppercase text-orange/70 mb-0.5">Doors / Show</div>
                <div className="font-cond text-[17px] font-bold text-cream tracking-wide">{event.time}</div>
              </div>
            </div>
          )}

          {event.description && (
            <p className="text-[14px] text-cream/60 leading-[1.85] mb-6 max-w-[480px]">
              {event.description}
            </p>
          )}
        </div>

        <div className="flex items-center gap-4 flex-wrap pt-2">
          {event.ticketPrice && (
            <span className="font-display text-[clamp(26px,3vw,38px)] text-orange leading-none">
              {event.ticketPrice}
            </span>
          )}
          {ticketHref && !event.soldOut && (
            <a
              href={ticketHref}
              target="_blank"
              rel="noreferrer"
              className="font-ui text-[12px] font-bold tracking-[.18em] uppercase bg-purple-bright text-white px-8 py-4 no-underline clip-angled hover:bg-orange hover:text-black transition-all duration-200"
            >
              {event.lineleapUrl ? 'LineLeap →' : 'Get Tickets →'}
            </a>
          )}
          {!ticketHref && !event.soldOut && event.ticketPrice?.toLowerCase() === 'free' && (
            <span className="font-ui text-[12px] font-bold tracking-[.15em] uppercase border border-purple-bright/30 text-purple-bright px-6 py-3">
              Free Admission
            </span>
          )}
          {event.soldOut && (
            <span className="font-ui text-[12px] font-bold tracking-[.15em] uppercase border border-white/10 text-cream/25 px-6 py-3">
              Sold Out
            </span>
          )}
        </div>
      </div>
    </motion.div>
  )
}

// ── Day group ─────────────────────────────
function DayGroup({ date, events, index }) {
  return (
    <motion.div className="mb-14" {...inView(index * 0.05)}>
      <div className="flex items-center gap-4 mb-6">
        <span className="w-6 h-0.5 bg-purple-bright flex-shrink-0" />
        <h2 className="font-display text-[clamp(28px,3.5vw,48px)] text-white leading-none">
          {fmtDayHeader(date)}
        </h2>
      </div>
      <div className="flex flex-col gap-4">
        {events.map((ev, i) => (
          <EventCard key={ev.date + ev.bandName + i} event={ev} index={i} />
        ))}
      </div>
    </motion.div>
  )
}

// ── Page ──────────────────────────────────
export default function ThisWeekend() {
  const [loading, setLoading] = useState(true)
  const [specials, setSpecials] = useState(null)
  const [weekend, setWeekend] = useState(null)
  const [homeGames, setHomeGames] = useState([])
  const [events, setEvents] = useState([])

  const { thu, fri, sat } = getThisWeekendDates()
  const thuStr = toYMD(thu)
  const satStr = toYMD(sat)

  useEffect(() => {
    Promise.all([
      client.fetch(`*[_type == "weeklySpecials"][0]`).catch(() => null),
      client.fetch(`*[_type == "currentWeekend"][0]`).catch(() => null),
      client.fetch(
        `*[_type == "homeGame" && date >= $thu && date <= $sat] | order(date asc) [0...3]`,
        { thu: thuStr, sat: satStr }
      ).catch(() => []),
      client.fetch(
        `*[_type == "event" && date >= $thu && date <= $sat] | order(date asc) {
          bandName, date, time, ticketPrice, lineleapUrl, ticketUrl,
          genre, description, soldOut,
          "imageUrl": image.asset->url
        }`,
        { thu: thuStr, sat: satStr }
      ).catch(() => []),
    ]).then(([s, w, hg, ev]) => {
      setSpecials(s)
      setWeekend(w)
      setHomeGames(hg || [])
      setEvents(ev || [])
      setLoading(false)
    })
  }, [thuStr, satStr])

  // Mode detection
  let mode = weekend?.mode || 'auto'
  let thisWeekendGame = null
  if (mode === 'auto') {
    thisWeekendGame = homeGames[0] || null
    mode = thisWeekendGame ? 'gameday' : 'normal'
  } else if (mode === 'gameday') {
    thisWeekendGame = homeGames[0] || null
  }
  const isGameday = mode === 'gameday'

  const headline = weekend?.headline || (isGameday ? 'Gameday at The Wien' : 'This Weekend at The Wien')
  const subline = weekend?.subline || (isGameday && thisWeekendGame?.opponent
    ? `Tigers vs. ${thisWeekendGame.opponent}`
    : 'Live music · specials · good times')

  // Group events by their date string → Thu / Fri / Sat buckets
  const days = [
    { date: thu, key: thuStr, label: 'Thursday' },
    { date: fri, key: toYMD(fri), label: 'Friday' },
    { date: sat, key: satStr,    label: 'Saturday' },
  ]
  const byDay = {}
  events.forEach(e => {
    if (!byDay[e.date]) byDay[e.date] = []
    byDay[e.date].push(e)
  })
  const daysWithEvents = days.filter(d => byDay[d.key]?.length > 0)

  const weekendSpecials = specials?.days?.filter(d => ['thu', 'fri', 'sat'].includes(d.day)) || []

  return (
    <div className="bg-[#04030A] min-h-screen">

      {/* ── Hero ── */}
      <div className="relative min-h-[70vh] flex items-end pb-20 overflow-hidden">
        <div className="absolute inset-0" style={{ background: isGameday
          ? 'radial-gradient(ellipse 80% 60% at 50% 0%, rgba(245,101,32,0.18), transparent 70%), linear-gradient(180deg,#08060F,#04030A)'
          : 'radial-gradient(ellipse 80% 60% at 50% 0%, rgba(82,45,128,0.14), transparent 70%), linear-gradient(180deg,#08060F,#04030A)'
        }} />
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'linear-gradient(rgba(245,101,32,1) 1px,transparent 1px),linear-gradient(90deg,rgba(245,101,32,1) 1px,transparent 1px)', backgroundSize: '60px 60px' }} />
        <div className="relative z-[1] px-[5vw] w-full pt-40">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}>
            <div className="flex items-center gap-3 mb-5">
              {isGameday && (
                <span className="font-ui text-[10px] font-bold tracking-[.2em] uppercase bg-orange text-black px-3 py-1.5">GAMEDAY</span>
              )}
              <span className="font-ui text-[13px] font-bold tracking-[.28em] uppercase text-orange flex items-center gap-3">
                <span className="w-8 h-0.5 bg-orange" />This Weekend
              </span>
            </div>
            <h1 className="font-display text-[clamp(60px,12vw,160px)] leading-[.85] text-white mb-5">
              {headline}
            </h1>
            <p className="font-cond text-[clamp(18px,2.5vw,28px)] text-cream/55 max-w-[600px] tracking-wide mb-10">
              {subline}
            </p>
            {isGameday && thisWeekendGame?.kickoff && (
              <div className="inline-flex items-center gap-3 border border-orange/25 px-5 py-3 mb-8" style={{ background: 'rgba(245,101,32,0.06)' }}>
                <span className="font-ui text-[11px] font-bold tracking-[.15em] uppercase text-orange">Kickoff</span>
                <span className="font-cond text-[18px] font-bold text-white tracking-wide">{formatKickoff(thisWeekendGame.kickoff)}</span>
              </div>
            )}
          </motion.div>
        </div>
      </div>

      {/* ── Thu / Fri / Sat Events ── */}
      <section className="px-[5vw] py-[80px]" style={{ background: 'linear-gradient(180deg,#04030A,#08060F)' }}>
        <motion.div {...inView(0)} className="mb-12">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <div className="flex items-center gap-3 font-ui text-[11px] font-bold tracking-[.28em] uppercase text-purple-bright mb-3">
                <span className="w-6 h-0.5 bg-purple-bright" />The Basement
              </div>
              <h2 className="font-display text-[clamp(44px,6vw,80px)] leading-none text-white">
                This Week's <span className="text-purple-bright">Shows</span>
              </h2>
            </div>
            <Link to="/events" className="font-ui text-[11px] font-bold tracking-[.15em] uppercase border border-purple-bright/30 text-purple-bright px-5 py-2.5 no-underline hover:bg-purple-bright hover:text-white transition-all duration-200">
              Full Calendar
            </Link>
          </div>
        </motion.div>

        {!loading && daysWithEvents.length > 0 ? (
          daysWithEvents.map((day, i) => (
            <DayGroup key={day.key} date={day.date} events={byDay[day.key]} index={i} />
          ))
        ) : !loading ? (
          /* Empty state */
          <motion.div {...inView(0)} className="border border-white/[0.07] px-10 py-14 text-center" style={{ background: 'rgba(255,255,255,0.02)' }}>
            <div className="font-display text-[clamp(28px,4vw,48px)] text-white/25 mb-3">Nothing Scheduled Yet</div>
            <p className="text-[14px] text-cream/35 mb-6">Check back soon — we announce shows weekly.</p>
            <Link to="/events" className="font-ui text-[11px] font-bold tracking-[.15em] uppercase border border-purple-bright/30 text-purple-bright px-6 py-2.5 no-underline hover:bg-purple-bright hover:text-white transition-all duration-200 inline-block">
              Browse All Events
            </Link>
          </motion.div>
        ) : (
          /* Loading placeholder */
          <div className="flex flex-col gap-4">
            {[0, 1].map(i => (
              <div key={i} className="border border-white/[0.05] h-[280px] animate-pulse" style={{ background: 'rgba(255,255,255,0.02)' }} />
            ))}
          </div>
        )}
      </section>

      {/* ── Gameday section ── */}
      {isGameday && (
        <section className="px-[5vw] py-[80px]" style={{ background: 'linear-gradient(180deg,rgba(245,101,32,0.05),transparent)' }}>
          <motion.div {...inView(0)} className="max-w-[900px]">
            <div className="flex items-center gap-3 font-ui text-[11px] font-bold tracking-[.28em] uppercase text-orange mb-4">
              <span className="w-6 h-0.5 bg-orange" />Gameday Experience
            </div>
            <h2 className="font-display text-[clamp(44px,6vw,80px)] leading-none text-white mb-6">
              {thisWeekendGame?.opponent ? `Tigers vs. ${thisWeekendGame.opponent}` : 'Game Day Done Right.'}
            </h2>
            <p className="text-[15px] text-cream/75 leading-[1.9] mb-8 max-w-[560px]">
              Open early, stacked from kickoff to last call — LED walls, $1 mimosas, gameday brunch, and live music in The Basement after the final whistle.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {[
                { label: 'Open at 10AM', desc: 'Doors open early on gamedays' },
                { label: '$1 Mimosas', desc: 'While they last — come early' },
                { label: 'Live Music After', desc: 'The Basement fires up post-game' },
              ].map(item => (
                <div key={item.label} className="border border-orange/15 px-5 py-4" style={{ background: 'rgba(245,101,32,0.04)' }}>
                  <div className="font-cond text-[18px] font-bold text-white uppercase tracking-wide mb-0.5">{item.label}</div>
                  <div className="text-[12px] text-cream/55">{item.desc}</div>
                </div>
              ))}
            </div>
          </motion.div>
        </section>
      )}

      {/* ── Standing Specials ── */}
      <section className="px-[5vw] py-[80px]" style={{ background: 'linear-gradient(180deg,#08060F,#04030A)' }}>
        <motion.div {...inView(0)} className="mb-10">
          <div className="flex items-center gap-3 font-ui text-[11px] font-bold tracking-[.28em] uppercase text-orange mb-4">
            <span className="w-6 h-0.5 bg-orange" />Standing Specials
          </div>
          <h2 className="font-display text-[clamp(44px,6vw,80px)] leading-none text-white">
            This Weekend's <span className="text-orange">Deals</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {(weekendSpecials.length > 0 ? weekendSpecials : [
            { day: 'thu', title: 'Thursday', items: ['Happy hour specials', 'Live music in The Basement'] },
            { day: 'fri', title: 'Friday',   items: ['Happy hour specials', 'Live music in The Basement'] },
            { day: 'sat', title: 'Saturday', items: ['$1 Mimosas', 'Gameday brunch', 'Live bands all night'] },
          ]).map((day, i) => (
            <motion.div key={day.day} {...inView(i * 0.08)}
              className="border border-white/[0.07] p-7 hover:border-orange/25 transition-all duration-300"
              style={{ background: 'rgba(255,255,255,0.03)' }}>
              <div className="font-ui text-[10px] font-bold tracking-[.2em] uppercase text-orange mb-2">
                {day.day === 'thu' ? 'Thursday' : day.day === 'fri' ? 'Friday' : day.day === 'sat' ? 'Saturday' : day.title || day.day}
              </div>
              {day.title && day.day !== day.title?.toLowerCase().slice(0, 3) && (
                <div className="font-display text-[24px] text-white leading-none mb-3">{day.title}</div>
              )}
              {day.timeWindow && (
                <div className="font-ui text-[10px] tracking-[.12em] uppercase text-cream/40 mb-3">{day.timeWindow}</div>
              )}
              {day.items?.length > 0 && (
                <ul className="flex flex-col gap-1.5 mb-4">
                  {day.items.map((item, j) => (
                    <li key={j} className="flex items-center gap-2.5">
                      <span className="w-1 h-1 rounded-full bg-orange flex-shrink-0" />
                      <span className="font-cond text-[16px] text-cream/75 tracking-wide">{item}</span>
                    </li>
                  ))}
                </ul>
              )}
              {day.menuUrl && (
                <a href={day.menuUrl} target="_blank" rel="noreferrer"
                  className="font-ui text-[10px] font-bold tracking-[.15em] uppercase text-orange no-underline border-b border-orange/40 pb-0.5 hover:opacity-60 transition-opacity">
                  View Menu →
                </a>
              )}
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── Bottom CTA ── */}
      <section className="px-[5vw] py-[100px]" style={{ background: 'linear-gradient(135deg,#08060F,#04030A)' }}>
        <motion.div {...inView(0)} className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="flex items-center gap-3 font-ui text-[11px] font-bold tracking-[.28em] uppercase text-orange mb-4">
              <span className="w-6 h-0.5 bg-orange" />Come Out
            </div>
            <h2 className="font-display text-[clamp(52px,8vw,100px)] leading-[.88] text-white mb-5">
              See You<br /><span className="text-orange">This Weekend.</span>
            </h2>
            <p className="text-[15px] text-cream/75 leading-[1.85] max-w-[440px] mb-8">
              101 Keith Street, Clemson, SC. The bar, the basement, the patio — all under one roof. Come early, stay late.
            </p>
            <div className="flex gap-4 flex-wrap">
              <Link to="/find-us" className="font-ui text-[12px] font-bold tracking-[.18em] uppercase bg-orange text-black px-10 py-4 no-underline clip-angled hover:bg-white transition-colors duration-200">
                Find Us →
              </Link>
              <Link to="/reserve" className="font-ui text-[12px] font-bold tracking-[.18em] uppercase border border-orange/40 text-cream px-10 py-4 no-underline hover:border-orange hover:text-orange transition-all duration-200">
                Reserve a Table
              </Link>
            </div>
          </div>
          <div className="flex flex-col gap-3">
            {[
              { icon: '📍', label: '101 Keith Street', sub: 'Downtown Clemson, SC 29631' },
              { icon: '🕐', label: 'Open This Weekend', sub: 'Thu–Sat 11AM–2AM' },
              { icon: '🎵', label: 'Live Music in The Basement', sub: 'Check events above for the full lineup' },
            ].map(item => (
              <div key={item.label} className="flex items-center gap-4 border border-white/[0.06] px-5 py-4" style={{ background: 'rgba(255,255,255,0.02)' }}>
                <span className="text-[20px]">{item.icon}</span>
                <div>
                  <div className="font-cond text-[17px] font-bold text-white uppercase tracking-wide leading-none">{item.label}</div>
                  <div className="text-[12px] text-cream/50 mt-0.5">{item.sub}</div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </section>

      <PageCTA />
    </div>
  )
}
