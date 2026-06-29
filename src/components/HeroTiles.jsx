import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { client } from '@/lib/sanity'

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

function buildTeaser(specials, events, mode, weekend, homeGame) {
  if (weekend?.teaserItems?.length) return weekend.teaserItems.slice(0, 3)

  const items = []

  if (mode === 'gameday' && homeGame?.opponent) {
    items.push(`vs. ${homeGame.opponent}`)
  }

  if (specials?.days) {
    const maxSpecials = mode === 'gameday' ? 1 : 2
    const featuredItems = specials.days
      .filter(d => WEEKEND_DAYS.includes(d.day) && d.featured)
      .flatMap(d => d.items || [])
    items.push(...featuredItems.slice(0, maxSpecials))
  }

  if (events.length > 0 && items.length < 3) {
    const ev = events[0]
    items.push(ev.time ? `Live band ${ev.time}` : 'Live band tonight')
  }

  if (items.length === 0) {
    return mode === 'gameday'
      ? ['$1 Mimosas', 'Gameday brunch', 'Live band after']
      : ['$1 Mimosas', 'Live music', 'Good vibes']
  }

  return items.slice(0, 3)
}

// ── Tile 1: The Bar ───────────────────────
function BarTile() {
  return (
    <motion.div
      className="relative flex flex-col justify-between px-10 py-14 lg:px-12 lg:py-16 min-h-[320px] lg:min-h-[420px] border-b border-white/[0.06] lg:border-b-0 lg:border-r overflow-hidden"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
    >
      {/* Accent top bar */}
      <div className="absolute top-0 left-0 right-0 h-[3px] bg-orange" />
      {/* Background glow */}
      <div className="absolute top-0 right-0 w-[350px] h-[350px] pointer-events-none" style={{ background: 'radial-gradient(circle, rgba(245,101,32,0.07), transparent 70%)', transform: 'translate(25%, -25%)' }} />

      <div className="relative z-[1]">
        <div className="font-ui text-[10px] font-bold tracking-[.25em] uppercase text-orange mb-5">
          The Bar & Restaurant
        </div>
        <div className="font-display text-[clamp(44px,6vw,80px)] leading-[.85] text-white mb-4">
          itsurwiener
        </div>
        <p className="font-cond text-[16px] text-cream/60 tracking-wide mb-6 max-w-[340px] leading-snug">
          Food, sports bar, patios, outdoor bars, and giant LED walls. The home of The&nbsp;Litcher<sup style={{ fontSize: '0.4em', verticalAlign: 'super' }}>®</sup> — always on, always open.
        </p>
        <div className="flex flex-wrap gap-2">
          {['Always On', 'Restaurant', 'Sports Bar', 'Patio & Deck'].map(tag => (
            <span key={tag} className="font-ui text-[10px] font-bold tracking-[.12em] uppercase border border-orange/20 px-3 py-1 text-cream/45">
              {tag}
            </span>
          ))}
        </div>
      </div>

      <div className="relative z-[1] mt-8">
        <Link to="/#chaos" className="font-ui text-[11px] font-bold tracking-[.18em] uppercase bg-orange text-black px-8 py-3.5 no-underline clip-angled hover:bg-white transition-colors duration-200 inline-block">
          Explore the Bar →
        </Link>
      </div>
    </motion.div>
  )
}

// ── Tile 2: The Basement ─────────────────
function BasementTile() {
  return (
    <motion.div
      className="relative flex flex-col justify-between px-10 py-14 lg:px-12 lg:py-16 min-h-[320px] lg:min-h-[420px] border-b border-white/[0.06] lg:border-b-0 lg:border-r overflow-hidden"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
    >
      {/* Accent top bar */}
      <div className="absolute top-0 left-0 right-0 h-[3px] bg-purple-bright" />
      {/* Background glow */}
      <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse 80% 70% at 50% 0%, rgba(82,45,128,0.14), transparent 65%)' }} />

      <div className="relative z-[1]">
        <div className="font-ui text-[10px] font-bold tracking-[.25em] uppercase text-purple-bright mb-5">
          Nightlife
        </div>
        <div className="font-display text-[clamp(44px,6vw,80px)] leading-[.85] text-white mb-4">
          The<br />Basement
        </div>
        <p className="font-cond text-[16px] text-cream/60 tracking-wide mb-6 max-w-[340px] leading-snug">
          Live music, DJs, VIP section, and late-night kitchen. Clemson's best-kept secret — right downstairs.
        </p>
        <div className="flex flex-wrap gap-2">
          {['Live Music', 'DJ Nights', 'VIP Section', 'Late Night'].map(tag => (
            <span key={tag} className="font-ui text-[10px] font-bold tracking-[.12em] uppercase border border-purple-bright/20 px-3 py-1 text-cream/45">
              {tag}
            </span>
          ))}
        </div>
      </div>

      <div className="relative z-[1] mt-8">
        <Link to="/the-basement" className="font-ui text-[11px] font-bold tracking-[.18em] uppercase bg-purple-bright text-white px-8 py-3.5 no-underline clip-angled hover:bg-orange hover:text-black transition-all duration-300 inline-block">
          Enter The Basement →
        </Link>
      </div>
    </motion.div>
  )
}

// ── Tile 3: This Weekend (dynamic) ────────
function ThisWeekendTile() {
  const [state, setState] = useState({
    loading: true, specials: null, weekend: null, homeGames: [], events: [],
  })

  useEffect(() => {
    const today = new Date().toISOString().split('T')[0]
    Promise.all([
      client.fetch(`*[_type == "weeklySpecials"][0]`).catch(() => null),
      client.fetch(`*[_type == "currentWeekend"][0]`).catch(() => null),
      client.fetch(
        `*[_type == "homeGame" && date >= $today] | order(date asc) [0...3]`,
        { today }
      ).catch(() => []),
      client.fetch(
        `*[_type == "event" && date >= $today && eventType == "show"] | order(date asc) [0...2] { bandName, date, time }`,
        { today }
      ).catch(() => []),
    ]).then(([specials, weekend, homeGames, events]) => {
      setState({ loading: false, specials, weekend, homeGames: homeGames || [], events: events || [] })
    })
  }, [])

  const { friday, sunday } = getWeekendRange()
  const { loading, specials, weekend, homeGames, events } = state

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
  const headline = weekend?.headline || (isGameday ? 'Gameday at The Wien' : 'This Weekend')
  const teaser = loading ? [] : buildTeaser(specials, events, mode, weekend, thisWeekendGame)
  const ctaLabel = weekend?.ctaLabel || "See What's On"
  const accentHex = isGameday ? '#F56520' : 'rgba(253,252,248,0.35)'

  return (
    <motion.div
      className="relative flex flex-col justify-between px-10 py-14 lg:px-12 lg:py-16 min-h-[320px] lg:min-h-[420px] overflow-hidden"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
    >
      {/* Accent top bar — color reflects mode */}
      <div className="absolute top-0 left-0 right-0 h-[3px]" style={{ background: accentHex }} />
      {/* Background glow */}
      <div className="absolute inset-0 pointer-events-none" style={{ background: isGameday
        ? 'radial-gradient(ellipse 80% 70% at 50% 0%, rgba(245,101,32,0.07), transparent 65%)'
        : 'radial-gradient(ellipse 80% 70% at 50% 0%, rgba(253,252,248,0.03), transparent 65%)'
      }} />

      <div className="relative z-[1]">
        <div className="flex items-center gap-2 mb-5">
          {isGameday && !loading && (
            <span className="font-ui text-[9px] font-bold tracking-[.2em] uppercase bg-orange text-black px-2 py-1">
              GAMEDAY
            </span>
          )}
          <span className="font-ui text-[10px] font-bold tracking-[.25em] uppercase" style={{ color: isGameday ? '#F56520' : 'rgba(253,252,248,0.45)' }}>
            {isGameday ? 'Game Day Edition' : 'This Weekend'}
          </span>
        </div>

        <div className="font-display text-[clamp(44px,6vw,80px)] leading-[.85] text-white mb-5">
          {loading ? <span className="text-cream/15">—</span> : headline}
        </div>

        {!loading && teaser.length > 0 && (
          <ul className="flex flex-col gap-2 mb-2">
            {teaser.map((item, i) => (
              <li key={i} className="flex items-center gap-2.5">
                <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: accentHex }} />
                <span className="font-cond text-[16px] text-cream/70 tracking-wide leading-snug">{item}</span>
              </li>
            ))}
          </ul>
        )}

        {loading && (
          <p className="font-cond text-[15px] text-cream/25 tracking-wide">Checking what's on…</p>
        )}
      </div>

      <div className="relative z-[1] mt-8">
        <Link
          to="/this-weekend"
          className="font-ui text-[11px] font-bold tracking-[.18em] uppercase px-8 py-3.5 no-underline clip-angled transition-all duration-200 inline-block"
          style={isGameday
            ? { background: '#F56520', color: '#000' }
            : { border: '1px solid rgba(253,252,248,0.2)', color: 'rgba(253,252,248,0.65)' }
          }
        >
          {ctaLabel} →
        </Link>
      </div>
    </motion.div>
  )
}

// ── HeroTiles ─────────────────────────────
export default function HeroTiles() {
  return (
    <section className="bg-[#04030A] border-b border-white/[0.06]">
      <div className="grid grid-cols-1 lg:grid-cols-3">
        <BarTile />
        <BasementTile />
        <ThisWeekendTile />
      </div>
    </section>
  )
}
