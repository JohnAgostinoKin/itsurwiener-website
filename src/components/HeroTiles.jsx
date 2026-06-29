import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { client } from '@/lib/sanity'

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

// ── Tile 1: The Bar ───────────────────────
function BarTile() {
  return (
    <motion.div
      className="relative flex flex-col justify-between px-10 py-10 lg:px-12 lg:py-12 border-b border-white/[0.06] lg:border-b-0 lg:border-r overflow-hidden"
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="absolute top-0 left-0 right-0 h-[3px] bg-orange" />

      <div className="font-display text-[clamp(36px,4.5vw,64px)] leading-[.88] text-white">
        itsurwiener
      </div>

      <div className="mt-8">
        <Link to="/#chaos" className="font-ui text-[11px] font-bold tracking-[.18em] uppercase bg-orange text-black px-8 py-3.5 no-underline clip-angled hover:bg-white transition-colors duration-200 inline-block">
          Enter →
        </Link>
      </div>
    </motion.div>
  )
}

// ── Tile 2: The Basement ─────────────────
function BasementTile() {
  return (
    <motion.div
      className="relative flex flex-col justify-between px-10 py-10 lg:px-12 lg:py-12 border-b border-white/[0.06] lg:border-b-0 lg:border-r overflow-hidden"
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="absolute top-0 left-0 right-0 h-[3px] bg-purple-bright" />

      <div className="font-display text-[clamp(36px,4.5vw,64px)] leading-[.88] text-white">
        The<br />Basement
      </div>

      <div className="mt-8">
        <Link to="/the-basement" className="font-ui text-[11px] font-bold tracking-[.18em] uppercase bg-purple-bright text-white px-8 py-3.5 no-underline clip-angled hover:bg-orange hover:text-black transition-all duration-300 inline-block">
          Enter →
        </Link>
      </div>
    </motion.div>
  )
}

// ── Tile 3: This Weekend (dynamic) ────────
function ThisWeekendTile() {
  const [state, setState] = useState({
    loading: true, weekend: null, homeGames: [],
  })

  useEffect(() => {
    const today = new Date().toISOString().split('T')[0]
    Promise.all([
      client.fetch(`*[_type == "currentWeekend"][0]`).catch(() => null),
      client.fetch(
        `*[_type == "homeGame" && date >= $today] | order(date asc) [0...3]`,
        { today }
      ).catch(() => []),
    ]).then(([weekend, homeGames]) => {
      setState({ loading: false, weekend, homeGames: homeGames || [] })
    })
  }, [])

  const { friday, sunday } = getWeekendRange()
  const { loading, weekend, homeGames } = state

  let mode = weekend?.mode || 'auto'
  if (mode === 'auto') {
    const hasGame = homeGames.some(g => {
      const d = new Date(g.date + 'T00:00:00')
      return d >= friday && d <= sunday
    })
    mode = hasGame ? 'gameday' : 'normal'
  }

  const isGameday = mode === 'gameday'
  const headline = weekend?.headline || (isGameday ? 'Gameday' : 'This Weekend')
  const ctaLabel = weekend?.ctaLabel || "See What's On"

  return (
    <motion.div
      className="relative flex flex-col justify-between px-10 py-10 lg:px-12 lg:py-12 overflow-hidden"
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.16, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="absolute top-0 left-0 right-0 h-[3px]"
        style={{ background: isGameday ? '#F56520' : 'rgba(253,252,248,0.25)' }} />

      <div className="font-display text-[clamp(36px,4.5vw,64px)] leading-[.88] text-white">
        {loading ? <span className="text-cream/15">—</span> : headline}
      </div>

      <div className="mt-8">
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
    <section className="bg-[#04030A] border-t border-b border-white/[0.06]">
      <div className="grid grid-cols-1 lg:grid-cols-3">
        <BarTile />
        <BasementTile />
        <ThisWeekendTile />
      </div>
    </section>
  )
}
