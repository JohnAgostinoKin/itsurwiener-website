import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import CallButton from '@components/CallButton'

const inView = (delay = 0) => ({
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] }
})

export default function FindUs() {
  const items = [
    { icon: '📍', label: 'Address',  value: '101 Keith Street, Clemson, SC 29631', sub: 'Downtown Clemson · Home of Clemson University', href: 'https://maps.google.com/?q=101+Keith+Street+Clemson+SC' },
    { icon: '🕐', label: 'Hours',    value: 'Wed 4PM–12AM · Thu–Sat 11AM–2AM', sub: 'Kitchen open late · Open early on game days' },
    { icon: '📞', label: 'Phone',    value: '(864) 722-5001', tel: true },
    { icon: '✉️', label: 'Email',    value: 'info@itsurwiener.com', href: 'mailto:info@itsurwiener.com' },
  ]

  return (
    <div className="bg-[#04030A] min-h-screen">

      {/* Hero */}
      <div className="relative pt-32 pb-16 px-[5vw] overflow-hidden">
        <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg,#0e0800,#04030A,#0e0800)' }} />
        <div className="absolute inset-0 opacity-5" style={{ backgroundImage: 'repeating-linear-gradient(45deg,transparent,transparent 40px,rgba(245,101,32,0.4) 40px,rgba(245,101,32,0.4) 41px)' }} />
        <div className="relative z-[1]">
          <div className="flex items-center gap-3 font-ui text-[13px] font-bold tracking-[.28em] uppercase text-orange mb-4">
            <span className="w-8 h-0.5 bg-orange" />101 Keith Street · Clemson, SC
          </div>
          <h1 className="font-display text-[clamp(64px,12vw,160px)] leading-[.85] text-white mb-4">
            Come Early.<br /><span className="text-orange">Stay Late.</span>
          </h1>
          <p className="font-cond text-[clamp(16px,2vw,24px)] text-cream/55 max-w-[600px] tracking-wide">
            We're right in the heart of downtown Clemson. Come find us.
          </p>
        </div>
      </div>

      {/* Info + Map */}
      <section className="px-[5vw] py-16 max-w-[1100px] mx-auto">
        <motion.div {...inView(0)} className="grid grid-cols-1 lg:grid-cols-2 gap-0 border border-orange/10">

          {/* Contact info */}
          <div className="bg-[#08060F] p-10 md:p-14">
            <div className="flex flex-col gap-0">
              {items.map(({ icon, label, value, sub, href, tel }) => (
                <div key={label} className="flex gap-5 py-6 border-b border-orange/[0.07] last:border-b-0 group">
                  <div className="w-11 h-11 bg-orange/[0.08] border border-orange/15 flex items-center justify-center text-[18px] flex-shrink-0 group-hover:bg-orange/15 transition-colors duration-200">{icon}</div>
                  <div>
                    <div className="font-ui text-[9px] font-bold tracking-[.22em] uppercase text-orange mb-1">{label}</div>
                    {tel ? (
                      <CallButton className="text-[14px] text-cream bg-transparent border-0 p-0 cursor-pointer hover:text-orange transition-colors duration-200" />
                    ) : href ? (
                      <a href={href} target={href.startsWith('https') ? '_blank' : undefined} rel="noreferrer"
                        className="text-[14px] text-cream no-underline hover:text-orange transition-colors duration-200">{value}</a>
                    ) : (
                      <div className="text-[14px] text-cream">{value}</div>
                    )}
                    {sub && <div className="text-[12px] text-cream/50 mt-0.5">{sub}</div>}
                  </div>
                </div>
              ))}
            </div>

            {/* Social */}
            <div className="flex gap-3 mt-8">
              {[
                { href: 'https://facebook.com/itsurwiener', label: 'Facebook', icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"/></svg> },
                { href: 'https://instagram.com/itsurwiener', label: 'Instagram', icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg> },
                { href: 'https://tiktok.com/@itsurwiener', label: 'TikTok', icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.32 6.32 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.95a8.16 8.16 0 004.77 1.52V7.01a4.85 4.85 0 01-1-.32z"/></svg> },
              ].map(({ href, label, icon }) => (
                <a key={label} href={href} target="_blank" rel="noreferrer" aria-label={label}
                  className="w-11 h-11 border border-orange/40 flex items-center justify-center text-orange no-underline hover:bg-orange hover:text-black hover:-translate-y-1 transition-all duration-200">
                  {icon}
                </a>
              ))}
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              <a href="https://maps.google.com/?q=101+Keith+Street+Clemson+SC" target="_blank" rel="noreferrer"
                className="font-ui text-[12px] font-bold tracking-[.18em] uppercase bg-orange text-black px-8 py-3.5 no-underline clip-angled hover:bg-white transition-colors duration-200">
                Open in Maps
              </a>
              <Link to="/reserve" className="font-ui text-[12px] font-bold tracking-[.18em] uppercase border border-orange/40 text-cream px-8 py-3.5 no-underline hover:border-orange hover:text-orange transition-all duration-200">
                Reserve a Table
              </Link>
            </div>
          </div>

          {/* Map placeholder */}
          <div className="min-h-[400px] flex items-center justify-center relative overflow-hidden" style={{ background: '#0E0B18' }}>
            <div className="absolute inset-0" style={{ backgroundImage: 'linear-gradient(rgba(245,101,32,0.06) 1px,transparent 1px),linear-gradient(90deg,rgba(245,101,32,0.06) 1px,transparent 1px)', backgroundSize: '40px 40px' }} />
            <div className="relative z-[1] text-center px-8">
              <div className="w-6 h-6 bg-orange rounded-[50%_50%_50%_0] mx-auto mb-5" style={{ transform: 'rotate(-45deg)', boxShadow: '0 0 0 6px rgba(245,101,32,0.2),0 0 0 16px rgba(245,101,32,0.06)', animation: 'pinBounce 2s ease-in-out infinite' }} />
              <div className="font-display text-[28px] text-white mb-1">itsurwiener</div>
              <div className="font-ui text-[12px] tracking-[.15em] uppercase text-orange/55 mb-2">101 Keith Street</div>
              <div className="font-ui text-[12px] tracking-[.12em] uppercase text-cream/35 mb-6">Clemson, South Carolina</div>
              <a href="https://maps.google.com/?q=101+Keith+Street+Clemson+SC" target="_blank" rel="noreferrer"
                className="font-ui text-[11px] font-bold tracking-[.2em] uppercase text-orange no-underline border-b border-orange pb-0.5 hover:opacity-60 transition-opacity">
                Get Directions in Google Maps →
              </a>
            </div>
          </div>

        </motion.div>
      </section>

    </div>
  )
}
