import { Link } from 'react-router-dom'

const footerLinks = [
  { label: 'Complex',      to: '/#chaos' },
  { label: 'Game Day',     to: '/game-day' },
  { label: 'The Litcher®', to: '/the-litcher' },
  { label: 'The Basement', to: '/the-basement' },
  { label: 'Menu',         to: '/menu' },
  { label: 'Merch',        to: '/merch' },
  { label: 'Events',       to: '/events' },
  { label: 'Find Us',      to: '/#findus' },
]

export default function Footer() {
  return (
    <footer className="bg-black-2 border-t border-orange/[0.08] px-[5vw] py-10">
      <div className="flex flex-col md:flex-row items-center justify-between gap-6 flex-wrap">

        {/* Brand */}
        <Link to="/" className="font-display text-[30px] text-white no-underline">
          its<span className="text-orange">ur</span>wiener
        </Link>

        {/* Links */}
        <nav className="flex flex-wrap gap-6 justify-center">
          {footerLinks.map(({ label, to }) => (
            <Link
              key={label}
              to={to}
              className="font-ui text-[11px] font-medium tracking-[.12em] uppercase text-cream/30 no-underline hover:text-orange transition-colors duration-200"
            >
              {label}
            </Link>
          ))}
        </nav>

        {/* Legal */}
        <div className="font-ui text-[11px] text-cream/20 text-center md:text-right leading-relaxed">
          © {new Date().getFullYear()} Agostino Industries, LLC<br />
          d/b/a itsurwiener · Clemson, SC
        </div>
      </div>
    </footer>
  )
}
