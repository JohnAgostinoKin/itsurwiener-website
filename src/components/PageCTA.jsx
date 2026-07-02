import { Link } from 'react-router-dom'

const items = [
  { label: 'Find Us',              desc: '101 Keith Street, Downtown Clemson, SC 29631.',                cta: 'Directions →', to: '/find-us' },
  { label: 'Reserve a Table',      desc: 'Book your spot ahead of time. Limited seating available.',      cta: 'Reserve Now →', to: '/reserve' },
  { label: 'Book a Private Event', desc: 'Private events, birthday parties, corporate functions, and more.', cta: 'Inquire →',    to: '/book-event' },
]

export default function PageCTA() {
  return (
    <section className="bg-[#0E0B18] py-[80px] px-[5vw] border-t border-white/[0.06]">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {items.map(item => (
          <div key={item.label}
            className="border border-orange/15 p-8 hover:border-orange/35 transition-colors duration-300"
            style={{ background: 'rgba(245,101,32,0.03)' }}
          >
            <h3 className="font-display text-[32px] text-white leading-none mb-3">{item.label}</h3>
            <p className="text-[14px] text-cream/60 leading-relaxed mb-6">{item.desc}</p>
            <Link
              to={item.to}
              className="font-ui text-[11px] font-bold tracking-[.2em] uppercase text-orange no-underline border-b border-orange/40 pb-0.5 hover:opacity-60 transition-opacity"
            >
              {item.cta}
            </Link>
          </div>
        ))}
      </div>
    </section>
  )
}
