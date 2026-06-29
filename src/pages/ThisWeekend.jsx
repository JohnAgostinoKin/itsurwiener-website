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

const DAY_LABELS = { mon: 'Monday', tue: 'Tuesday', wed: 'Wednesday', thu: 'Thursday', fri: 'Friday', sat: 'Saturday', sun: 'Sunday' }
const WEEKEND_DAYS = ['fri', 'sat', 'sun']

function getWeekendRange() {
  const today = new Date()
  const dow = today.getDay()
  const daysToFriday = dow === 0 ? -2 : dow === 6 ? -1 : dow === 5 ? 0 : 5 - dow
  const friday = new Date(today)
  friday.setDate(today.getDate() + daysToFriday)
  friday.setHours(0, 0, 0, 0)
  const sunday = new Date(friday)
  sunday.setDate(friday.getDate() + 2)
  sunday.setHours(23, 59, 59, 999)
  return { friday, sunday }
}

function formatKickoff(dt) {
  if (!dt) return null
  const d = new Date(dt)
  return d.toLocaleString('en-US', { weekday: 'short', month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit' })
}

export default function ThisWeekend() {
  const [loading, setLoading] = useState(true)
  const [specials, setSpecials] = useState(null)
  const [weekend, setWeekend] = useState(null)
  const [homeGames, setHomeGames] = useState([])
  const [events, setEvents] = useState([])

  useEffect(() => {
    const today = new Date().toISOString().split('T')[0]
    Promise.all([
      client.fetch(`*[_type == "weeklySpecials"][0]`).catch(() => null),
      client.fetch(`*[_type == "currentWeekend"][0]`).catch(() => null),
      client.fetch(`*[_type == "homeGame" && date >= $today] | order(date asc) [0...3]`, { today }).catch(() => []),
      client.fetch(
        `*[_type == "event" && date >= $today && eventType == "show"] | order(date asc) [0...6] {
          bandName, date, time, ticketPrice, lineleapUrl, ticketUrl, genre, soldOut, description
        }`,
        { today }
      ).catch(() => []),
    ]).then(([s, w, hg, ev]) => {
      setSpecials(s)
      setWeekend(w)
      setHomeGames(hg || [])
      setEvents(ev || [])
      setLoading(false)
    })
  }, [])

  const { friday, sunday } = getWeekendRange()

  let mode = weekend?.mode || 'auto'
  let thisWeekendGame = null

  if (mode === 'auto') {
    thisWeekendGame = homeGames.find(g => {
      const d = new Date(g.date + 'T00:00:00')
      return d >= friday && d <= sunday
    }) || null
    mode = thisWeekendGame ? 'gameday' : 'normal'
  } else if (mode === 'gameday') {
    thisWeekendGame = homeGames[0] || null
  }

  const isGameday = mode === 'gameday'

  const headline = weekend?.headline || (isGameday ? 'Gameday at The Wien' : 'This Weekend at The Wien')
  const subline = weekend?.subline || (isGameday && thisWeekendGame?.opponent
    ? `Tigers vs. ${thisWeekendGame.opponent}`
    : 'Live music · specials · good vibes')

  const weekendSpecials = specials?.days?.filter(d => WEEKEND_DAYS.includes(d.day)) || []
  const thisWeekendEvents = events.filter(e => {
    const d = new Date(e.date + 'T00:00:00')
    return d >= friday && d <= sunday
  })
  const upcomingEvents = events.slice(0, 4)

  return (
    <div className="bg-[#04030A] min-h-screen">

      {/* Hero */}
      <div className="relative min-h-[80vh] flex items-end pb-24 overflow-hidden">
        <div className="absolute inset-0" style={{ background: isGameday
          ? 'radial-gradient(ellipse 80% 60% at 50% 0%, rgba(245,101,32,0.18), transparent 70%), linear-gradient(180deg,#08060F,#04030A)'
          : 'radial-gradient(ellipse 80% 60% at 50% 0%, rgba(82,45,128,0.12), transparent 70%), linear-gradient(180deg,#08060F,#04030A)'
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
            <div className="flex gap-4 flex-wrap">
              <Link to="/events" className="font-ui text-[12px] font-bold tracking-[.18em] uppercase bg-orange text-black px-10 py-4 no-underline clip-angled hover:bg-white transition-colors duration-200">
                Full Event Calendar
              </Link>
              {weekend?.ctaUrl && (
                <a href={weekend.ctaUrl} target="_blank" rel="noreferrer" className="font-ui text-[12px] font-bold tracking-[.18em] uppercase border border-orange/40 text-cream px-10 py-4 no-underline hover:border-orange hover:text-orange transition-all duration-200">
                  {weekend.ctaLabel || 'Get Tickets'}
                </a>
              )}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Gameday overlay */}
      {isGameday && (
        <section className="px-[5vw] py-[80px]" style={{ background: 'linear-gradient(180deg,rgba(245,101,32,0.06),transparent)' }}>
          <motion.div {...inView(0)} className="max-w-[900px]">
            <div className="flex items-center gap-3 font-ui text-[11px] font-bold tracking-[.28em] uppercase text-orange mb-4">
              <span className="w-6 h-0.5 bg-orange" />Gameday Experience
            </div>
            <h2 className="font-display text-[clamp(44px,6vw,80px)] leading-none text-white mb-6">
              {thisWeekendGame?.opponent ? `Tigers vs. ${thisWeekendGame.opponent}` : 'Game Day Done Right.'}
            </h2>
            <p className="text-[15px] text-cream/75 leading-[1.9] mb-8 max-w-[560px]">
              The only place to watch the game. Open early, stacked from kickoff to last call — LED walls, $1 mimosas, gameday brunch, and live music in The Basement after the final whistle.
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

      {/* Weekend Specials — always shown */}
      <section className="px-[5vw] py-[80px]" style={{ background: 'linear-gradient(180deg,#08060F,#04030A)' }}>
        <motion.div {...inView(0)}>
          <div className="flex items-center gap-3 font-ui text-[11px] font-bold tracking-[.28em] uppercase text-orange mb-4">
            <span className="w-6 h-0.5 bg-orange" />Standing Specials
          </div>
          <h2 className="font-display text-[clamp(44px,6vw,80px)] leading-none text-white mb-10">
            This Weekend's<br /><span className="text-orange">Deals</span>
          </h2>
        </motion.div>

        {weekendSpecials.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {weekendSpecials.map((day, i) => (
              <motion.div key={day.day} {...inView(i * 0.08)}
                className="border border-white/[0.07] p-7 hover:border-orange/25 transition-all duration-300"
                style={{ background: 'rgba(255,255,255,0.03)' }}>
                <div className="font-ui text-[10px] font-bold tracking-[.2em] uppercase text-orange mb-2">
                  {DAY_LABELS[day.day] || day.day}
                </div>
                {day.title && (
                  <div className="font-display text-[26px] text-white leading-none mb-3">{day.title}</div>
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
        ) : (
          /* Fallback when Sanity weeklySpecials is not yet populated */
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              { day: 'Friday', items: ['Happy hour specials', 'Live music in The Basement'] },
              { day: 'Saturday', items: ['$1 Mimosas', 'Gameday brunch', 'Live bands all night'] },
              { day: 'Sunday', items: ['$1 Mimosas', 'Brunch menu', 'Late-night kitchen open'] },
            ].map((day, i) => (
              <motion.div key={day.day} {...inView(i * 0.08)}
                className="border border-white/[0.07] p-7"
                style={{ background: 'rgba(255,255,255,0.03)' }}>
                <div className="font-ui text-[10px] font-bold tracking-[.2em] uppercase text-orange mb-3">{day.day}</div>
                <ul className="flex flex-col gap-1.5">
                  {day.items.map((item, j) => (
                    <li key={j} className="flex items-center gap-2.5">
                      <span className="w-1 h-1 rounded-full bg-orange flex-shrink-0" />
                      <span className="font-cond text-[16px] text-cream/75 tracking-wide">{item}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        )}
      </section>

      {/* Events this weekend / upcoming shows */}
      {upcomingEvents.length > 0 && (
        <section className="px-[5vw] py-[80px]" style={{ background: 'linear-gradient(180deg,#04030A,#08060F)' }}>
          <motion.div {...inView(0)}>
            <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
              <div>
                <div className="flex items-center gap-3 font-ui text-[11px] font-bold tracking-[.28em] uppercase text-purple-bright mb-3">
                  <span className="w-6 h-0.5 bg-purple-bright" />The Basement
                </div>
                <h2 className="font-display text-[clamp(36px,5vw,64px)] leading-none text-white">
                  {thisWeekendEvents.length > 0 ? 'Shows This Weekend' : 'Coming Up'}
                </h2>
              </div>
              <Link to="/events" className="font-ui text-[11px] font-bold tracking-[.15em] uppercase border border-purple-bright/30 text-purple-bright px-5 py-2.5 no-underline hover:bg-purple-bright hover:text-white transition-all duration-200">
                Full Calendar
              </Link>
            </div>
            <div className="flex flex-col gap-2">
              {(thisWeekendEvents.length > 0 ? thisWeekendEvents : upcomingEvents).map((e, i) => {
                const d = new Date(e.date + 'T00:00:00')
                const month = d.toLocaleString('default', { month: 'short' }).toUpperCase()
                const day = d.getDate()
                const dow = d.toLocaleString('default', { weekday: 'short' }).toUpperCase()
                return (
                  <motion.div key={e.date + e.bandName}
                    className="flex items-stretch border border-white/[0.07] overflow-hidden hover:border-purple-bright/25 transition-all duration-200"
                    style={{ background: 'rgba(255,255,255,0.03)' }}
                    initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.07 }}>
                    <div className="flex flex-col items-center justify-center px-4 py-4 border-r border-white/[0.06] min-w-[70px]" style={{ background: 'rgba(157,78,221,0.08)' }}>
                      <div className="font-ui text-[9px] font-bold tracking-[.12em] text-purple-bright">{month}</div>
                      <div className="font-display text-[36px] text-white leading-none">{day}</div>
                      <div className="font-ui text-[8px] text-cream/35 tracking-[.1em]">{dow}</div>
                    </div>
                    <div className="flex-1 px-5 py-4">
                      <div className="font-display text-[clamp(18px,2.5vw,28px)] text-white leading-none">{e.bandName}</div>
                      {e.genre && <div className="font-ui text-[10px] font-bold tracking-[.12em] uppercase text-purple-bright/70 mt-0.5">{e.genre}</div>}
                      {e.time && <div className="font-ui text-[11px] text-cream/45 mt-0.5">{e.time}</div>}
                    </div>
                    <div className="px-5 py-4 flex-shrink-0 flex flex-col items-end justify-center gap-2">
                      {e.ticketPrice && <span className="font-cond text-[15px] font-bold text-orange uppercase">{e.ticketPrice}</span>}
                      {(e.lineleapUrl || e.ticketUrl) && !e.soldOut && (
                        <a href={e.lineleapUrl || e.ticketUrl} target="_blank" rel="noreferrer"
                          className="font-ui text-[10px] font-bold tracking-[.12em] uppercase bg-purple-bright text-white px-3 py-1.5 no-underline hover:bg-orange hover:text-black transition-all duration-200">
                          {e.lineleapUrl ? 'LineLeap' : 'Tickets'}
                        </a>
                      )}
                      {e.soldOut && <span className="font-ui text-[10px] font-bold tracking-[.12em] uppercase text-cream/30 border border-white/10 px-2 py-1">Sold Out</span>}
                    </div>
                  </motion.div>
                )
              })}
            </div>
          </motion.div>
        </section>
      )}

      {/* Bottom CTA */}
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
              { icon: '🕐', label: 'Open This Weekend', sub: 'Fri–Sat 11AM–2AM · Sun 11AM–10PM' },
              { icon: '🎵', label: 'Live Music in The Basement', sub: 'Check events for the full lineup' },
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
