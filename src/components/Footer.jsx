import { Link } from 'react-router-dom'

const footerLinks = [
  { label: 'Venues',              to: '/venues' },
  { label: 'Game Day',            to: '/game-day' },
  { label: 'Home of The Litcher', to: '/the-litcher' },
  { label: 'The Basement',        to: '/the-basement' },
  { label: 'Menu',                to: '/menu' },
  { label: 'Merch',               to: '/merch' },
  { label: 'Events',              to: '/events' },
  { label: 'Find Us',             to: '/#findus' },
]

export default function Footer() {
  return (
    <footer className="bg-black-2 border-t border-orange/[0.12] px-[5vw] py-12">
      <div className="flex flex-col md:flex-row items-center justify-between gap-8 flex-wrap">

        <Link to="/" className="font-display text-[30px] text-white no-underline">
          its<span className="text-orange">ur</span>wiener
        </Link>

        <nav className="flex flex-wrap gap-5 justify-center">
          {footerLinks.map(({ label, to }) => (
            <Link key={label} to={to}
              className="font-ui text-[12px] font-semibold tracking-[.1em] uppercase text-cream/70 no-underline hover:text-orange transition-colors duration-200">
              {label}
            </Link>
          ))}
        </nav>

      </div>

      <div className="mt-8 pt-6 border-t border-orange/[0.08] flex flex-col md:flex-row items-center justify-between gap-3">
        <div className="font-ui text-[12px] text-cream/70">
          Copyright 2026 Itsurwiener — All Rights Reserved.
        </div>
        <div className="font-ui text-[11px] text-cream/50">
          101 Keith Street, Clemson, SC 29631
        </div>
      </div>
    </footer>
  )
}
