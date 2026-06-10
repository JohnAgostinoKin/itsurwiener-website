import { Link } from 'react-router-dom'

const footerLinks = [
  { label: 'Venues',              to: '/venues' },
  { label: 'Game Day',            to: '/game-day' },
  { label: 'Home of The Litcher', to: '/the-litcher' },
  { label: 'The Basement',        to: '/the-basement' },
  { label: 'Menu',                to: '/menu' },
  { label: 'Merch',               to: '/merch' },
  { label: 'Events',              to: '/events' },
  { label: 'Find Us', href: '/#findus' },
]

export default function Footer() {
  return (
    <footer className="bg-black-2 border-t border-orange/[0.12] px-[5vw] py-12">
      <div className="flex flex-col md:flex-row items-center justify-between gap-8 flex-wrap">

        <Link to="/" className="font-display text-[30px] text-white no-underline">
          its<span className="animate-[logoFlash_3s_infinite]">ur</span>wiener
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

      <div className="mt-8 pt-6 border-t border-orange/[0.08] flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex flex-wrap gap-4 justify-center md:justify-start">
          {[
            { label: 'Privacy Policy',    to: '/privacy' },
            { label: 'Terms of Use',      to: '/terms' },
            { label: 'Refund Policy',     to: '/refund-policy' },
            { label: 'Venue & Event Terms', to: '/venue-terms' },
            { label: 'Accessibility',     to: '/accessibility' },
          ].map(({ label, to }) => (
            <Link key={label} to={to}
              className="font-ui text-[10px] text-cream/35 no-underline hover:text-cream/70 transition-colors duration-200 tracking-[.08em]">
              {label}
            </Link>
          ))}
        </div>
        <div className="font-ui text-[12px] text-cream/70">
          Copyright 2026 Itsurwiener — All Rights Reserved.
        </div>
      </div>
    </footer>
  )
}
