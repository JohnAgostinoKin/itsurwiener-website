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
      className="flex flex-col justify-between px-10 py-10 lg:px-12 lg:py-12 min-h-[200px] hover:border-orange/30 transition-colors duration-300"
      style={{ border: '1px solid rgba(255,255,255,0.08)', borderTopWidth: '3px', borderTopColor: '#F56520' }}
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="font-display text-[clamp(36px,4vw,60px)] leading-[.88] text-white">
        itsurwiener
      </div>

      <Link
        to="/#chaos"
        className="w-full block font-ui text-[12px] font-bold tracking-[.2em] uppercase bg-orange text-black py-4 no-underline text-center clip-angled hover:bg-white transition-colors duration-200 mt-8"
      >
        The Bar →
      </Link>
    </motion.div>
  )
}

// ── Tile 2: The Basement ─────────────────
function BasementTile() {
  return (
    <motion.div
      className="flex flex-col justify-between px-10 py-10 lg:px-12 lg:py-12 min-h-[200px] hover:border-purple-bright/30 transition-colors duration-300"
      style={{ border: '1px solid rgba(255,255,255,0.08)', borderTopWidth: '3px', borderTopColor: '#9D4EDD' }}
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="font-display text-[clamp(36px,4vw,60px)] leading-[.88] text-white">
        The<br />Basement
      </div>

      <Link
        to="/the-basement"
        className="w-full block font-ui text-[12px] font-bold tracking-[.2em] uppercase bg-purple-bright text-white py-4 no-underline text-center clip-angled hover:bg-orange hover:text-black transition-all duration-300 mt-8"
      >
        The Basement →
      </Link>
    </motion.div>
  )
}

// ── Tile 3: This Weekend (dynamic) ────────
function ThisWeekendTile() {
  const [state, setState] = useState({ loading: true, weekend: null, homeGames: [] })

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
  const accentColor = isGameday ? '#F56520' : 'rgba(255,255,255,0.25)'

  return (
    <motion.div
      className="flex flex-col justify-between px-10 py-10 lg:px-12 lg:py-12 min-h-[200px] transition-colors duration-300"
      style={{
        border: '1px solid rgba(255,255,255,0.08)',
        borderTopWidth: '3px',
        borderTopColor: accentColor,
      }}
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.16, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="font-display text-[clamp(36px,4vw,60px)] leading-[.88] text-white">
        {loading ? <span className="text-cream/15">—</span> : headline}
      </div>

      {isGameday ? (
        <Link
          to="/this-weekend"
          className="w-full block font-ui text-[12px] font-bold tracking-[.2em] uppercase bg-orange text-black py-4 no-underline text-center clip-angled hover:bg-white transition-colors duration-200 mt-8"
        >
          {ctaLabel} →
        </Link>
      ) : (
        <Link
          to="/this-weekend"
          className="w-full block font-ui text-[12px] font-bold tracking-[.2em] uppercase border border-white/20 text-cream/70 py-4 no-underline text-center hover:border-orange hover:text-orange transition-all duration-200 mt-8"
        >
          {ctaLabel} →
        </Link>
      )}
    </motion.div>
  )
}

// ── HeroTiles ─────────────────────────────
export default function HeroTiles() {
  return (
    <section className="bg-[#04030A] px-[5vw] pb-14">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <BarTile />
        <BasementTile />
        <ThisWeekendTile />
      </div>
    </section>
  )
}
