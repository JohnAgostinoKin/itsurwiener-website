import { useState, useEffect } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'

const links = [
  { label: 'Complex',      to: '/#chaos' },
  { label: 'Game Day',     to: '/game-day' },
  { label: 'The Litcher®', to: '/the-litcher' },
  { label: 'The Basement', to: '/the-basement' },
  { label: 'Menu',         to: '/menu' },
  { label: 'Merch',        to: '/merch' },
  { label: 'Find Us',      to: '/#findus' },
]

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const { pathname } = useLocation()

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handler)
    return () => window.removeEventListener('scroll', handler)
  }, [])

  // Close mobile menu on route change
  useEffect(() => { setMenuOpen(false) }, [pathname])

  return (
    <>
      {/* ── Desktop Nav ── */}
      <nav
        className={`fixed top-0 left-0 right-0 z-[800] flex items-center justify-between px-[5vw] h-[72px] transition-all duration-300 ${
          scrolled ? 'bg-[rgba(4,3,10,0.92)] backdrop-blur-lg border-b border-orange-glow' : ''
        }`}
      >
        {/* Logo */}
        <Link to="/" className="font-display text-[30px] text-white tracking-wide no-underline">
          its<span className="animate-[logoFlash_3s_infinite]">ur</span>wiener
        </Link>

        {/* Desktop links */}
        <ul className="hidden lg:flex gap-8 list-none">
          {links.map(({ label, to }) => (
            <li key={label}>
              <NavLink
                to={to}
                className={({ isActive }) =>
                  `font-ui text-[12px] font-medium tracking-[.12em] uppercase no-underline transition-colors duration-200 relative group ${
                    isActive ? 'text-orange' : 'text-cream/50 hover:text-white'
                  }`
                }
              >
                {label}
                <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-orange transition-all duration-300 group-hover:w-full" />
              </NavLink>
            </li>
          ))}
        </ul>

        {/* CTA */}
        <Link
          to="/events"
          className="hidden lg:block font-ui text-[11px] font-bold tracking-[.18em] uppercase bg-orange text-black px-6 py-3 no-underline clip-angled-sm hover:bg-white transition-colors duration-200"
        >
          Book an Event
        </Link>

        {/* Mobile hamburger */}
        <button
          onClick={() => setMenuOpen(o => !o)}
          className="lg:hidden flex flex-col gap-1.5 p-1 bg-transparent border-0"
          aria-label="Menu"
        >
          <span className={`block w-6 h-0.5 bg-cream transition-transform duration-300 ${menuOpen ? 'rotate-45 translate-y-2' : ''}`} />
          <span className={`block w-6 h-0.5 bg-cream transition-opacity duration-300 ${menuOpen ? 'opacity-0' : ''}`} />
          <span className={`block w-6 h-0.5 bg-cream transition-transform duration-300 ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
        </button>
      </nav>

      {/* ── Mobile Menu ── */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[700] bg-black flex flex-col items-center justify-center gap-8"
          >
            {links.map(({ label, to }, i) => (
              <motion.div
                key={label}
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              >
                <Link
                  to={to}
                  onClick={() => setMenuOpen(false)}
                  className="font-display text-[clamp(44px,12vw,80px)] text-white no-underline hover:text-orange transition-colors duration-200"
                >
                  {label}
                </Link>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
