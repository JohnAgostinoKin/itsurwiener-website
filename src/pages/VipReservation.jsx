import { useState, useEffect } from 'react'
import PageCTA from '@components/PageCTA'
import { motion } from 'framer-motion'
import { client } from '@/lib/sanity'

const inView = (delay = 0) => ({
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] }
})

export default function VipReservation() {
  const [packages, setPackages] = useState([])
  const [times, setTimes] = useState([])
  const [note, setNote] = useState('')
  const [selected, setSelected] = useState(null)
  const [date, setDate] = useState('')
  const [time, setTime] = useState('')
  const [guests, setGuests] = useState('')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [added, setAdded] = useState(false)

  useEffect(() => {
    client.fetch(`*[_type == "reservationPackages"][0] {
      vipPackages, availableTimes, vipNote
    }`).then(data => {
      if (data?.vipPackages?.length) setPackages(data.vipPackages.filter(p => p.available))
      if (data?.availableTimes?.length) setTimes(data.availableTimes)
      if (data?.vipNote) setNote(data.vipNote)
    }).catch(() => {})
  }, [])

  const defaultPackages = [
    { name: 'VIP Small',    description: 'Private section for up to 10 guests. Dedicated bartender included.', price: 150, maxGuests: 10, perks: ['Private Bartender','Reserved Seating','Priority Service'] },
    { name: 'VIP Large',    description: 'Expanded VIP area for up to 20 guests. Perfect for birthdays.', price: 300, maxGuests: 20, perks: ['Private Bartender','Reserved Seating','Priority Service','Bottle Service Option'] },
    { name: 'Full VIP Section', description: 'Exclusive access to the entire VIP section. The ultimate experience.', price: 500, maxGuests: 40, perks: ['Private Bartender','Full Section Exclusive','Bottle Service','Custom Setup','Priority Entry'] },
  ]

  const defaultTimes = ['8:00 PM','9:00 PM','10:00 PM']
  const displayPackages = packages.length ? packages : defaultPackages
  const displayTimes = times.length ? times : defaultTimes

  return (
    <div className="bg-[#04030A] min-h-screen">
      <div className="relative pt-32 pb-16 px-[5vw] overflow-hidden">
        <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg,#08002a,#04030A,#08002a)' }} />
        <div className="relative z-[1]">
          <div className="flex items-center gap-3 font-ui text-[13px] font-bold tracking-[.28em] uppercase text-purple-bright mb-4">
            <span className="w-8 h-0.5 bg-purple-bright" />The Basement
          </div>
          <h1 className="font-display text-[clamp(56px,10vw,130px)] leading-[.85] text-white mb-4">
            Reserve<br /><span className="text-purple-bright">VIP</span>
          </h1>
          <p className="font-cond text-[clamp(16px,2vw,22px)] text-cream/55 max-w-[600px] tracking-wide">
            Private bartender, reserved seating, bottle service. Choose your package and book instantly.
          </p>
        </div>
      </div>

      {note && (
        <div className="px-[5vw] max-w-[900px] mx-auto pt-2 pb-4">
          <div className="border border-purple-bright/30 px-5 py-4" style={{ background: 'rgba(157,78,221,0.06)' }}>
            <p className="text-[13px] text-purple-bright">{note}</p>
          </div>
        </div>
      )}

      <section className="px-[5vw] py-8 max-w-[900px] mx-auto">

        {/* Packages */}
        <motion.div {...inView(0)} className="mb-10">
          <div className="font-ui text-[11px] font-bold tracking-[.22em] uppercase text-purple-bright mb-5">Step 1 — Choose Your VIP Package</div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {displayPackages.map((pkg) => (
              <button key={pkg.name} onClick={() => setSelected(pkg)}
                className={`text-left p-6 border transition-all duration-200 ${selected?.name === pkg.name ? 'border-purple-bright bg-purple-bright/10' : 'border-white/[0.08] hover:border-purple-bright/40 bg-white/[0.03]'}`}>
                <div className="font-display text-[clamp(36px,4vw,52px)] text-purple-bright leading-none mb-2">${pkg.price}</div>
                <div className="font-cond text-[18px] font-bold text-white uppercase tracking-wide mb-2">{pkg.name}</div>
                <div className="text-[12px] text-cream/55 leading-relaxed mb-3">{pkg.description}</div>
                <div className="font-ui text-[10px] text-cream/35 uppercase tracking-wider mb-3">Up to {pkg.maxGuests} guests</div>
                {pkg.perks?.length > 0 && (
                  <div className="flex flex-col gap-1">
                    {pkg.perks.map(p => (
                      <div key={p} className="flex items-center gap-2 text-[11px] text-cream/60">
                        <span className="w-1 h-1 rounded-full bg-purple-bright flex-shrink-0" />{p}
                      </div>
                    ))}
                  </div>
                )}
                {selected?.name === pkg.name && (
                  <div className="mt-3 font-ui text-[10px] font-bold tracking-[.15em] uppercase text-purple-bright">✓ Selected</div>
                )}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Date/time/guests */}
        <motion.div {...inView(0.1)} className="mb-10">
          <div className="font-ui text-[11px] font-bold tracking-[.22em] uppercase text-purple-bright mb-5">Step 2 — Pick Your Date & Time</div>
          <div className="border border-white/[0.07] p-6 md:p-8" style={{ background: 'rgba(255,255,255,0.03)' }}>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-5">
              <div>
                <label className="font-ui text-[9px] font-bold tracking-[.22em] uppercase text-purple-bright/70 block mb-2">Date *</label>
                <input type="date" value={date} onChange={e => setDate(e.target.value)}
                  className="w-full bg-white/[0.04] border border-white/10 text-cream font-ui text-[14px] px-4 py-3.5 outline-none focus:border-purple-bright transition-colors" />
              </div>
              <div>
                <label className="font-ui text-[9px] font-bold tracking-[.22em] uppercase text-purple-bright/70 block mb-2">Time *</label>
                <select value={time} onChange={e => setTime(e.target.value)}
                  className="w-full bg-[#08060F] border border-white/10 text-cream font-ui text-[14px] px-4 py-3.5 outline-none focus:border-purple-bright transition-colors">
                  <option value="">Select time...</option>
                  {displayTimes.map(t => <option key={t}>{t}</option>)}
                </select>
              </div>
              <div>
                <label className="font-ui text-[9px] font-bold tracking-[.22em] uppercase text-purple-bright/70 block mb-2">Guests *</label>
                <select value={guests} onChange={e => setGuests(e.target.value)}
                  className="w-full bg-[#08060F] border border-white/10 text-cream font-ui text-[14px] px-4 py-3.5 outline-none focus:border-purple-bright transition-colors">
                  <option value="">Select...</option>
                  {Array.from({length: selected?.maxGuests || 40}, (_,i) => i+1).map(n => (
                    <option key={n}>{n} {n === 1 ? 'Guest' : 'Guests'}</option>
                  ))}
                </select>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              <div>
                <label className="font-ui text-[9px] font-bold tracking-[.22em] uppercase text-purple-bright/70 block mb-2">Your Name *</label>
                <input value={name} onChange={e => setName(e.target.value)} placeholder="Full name"
                  className="w-full bg-white/[0.04] border border-white/10 text-cream font-ui text-[14px] px-4 py-3.5 outline-none focus:border-purple-bright transition-colors placeholder:text-cream/20" />
              </div>
              <div>
                <label className="font-ui text-[9px] font-bold tracking-[.22em] uppercase text-purple-bright/70 block mb-2">Email *</label>
                <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="your@email.com"
                  className="w-full bg-white/[0.04] border border-white/10 text-cream font-ui text-[14px] px-4 py-3.5 outline-none focus:border-purple-bright transition-colors placeholder:text-cream/20" />
              </div>
              <div>
                <label className="font-ui text-[9px] font-bold tracking-[.22em] uppercase text-purple-bright/70 block mb-2">Phone</label>
                <input type="tel" value={phone} onChange={e => setPhone(e.target.value)} placeholder="(000) 000-0000"
                  className="w-full bg-white/[0.04] border border-white/10 text-cream font-ui text-[14px] px-4 py-3.5 outline-none focus:border-purple-bright transition-colors placeholder:text-cream/20" />
              </div>
            </div>
          </div>
        </motion.div>

        {/* Book */}
        <motion.div {...inView(0.2)}>
          <div className="font-ui text-[11px] font-bold tracking-[.22em] uppercase text-purple-bright mb-5">Step 3 — Book & Pay</div>
          {selected ? (
            <div className="border border-purple-bright/20 p-6 md:p-8" style={{ background: 'rgba(157,78,221,0.04)' }}>
              <div className="flex items-center justify-between flex-wrap gap-4 mb-6">
                <div>
                  <div className="font-cond text-[20px] font-bold text-white uppercase">{selected.name}</div>
                  <div className="text-[13px] text-cream/50">{date && time ? `${date} at ${time}` : 'Date & time TBD'}{guests ? ` · ${guests}` : ''}</div>
                </div>
                <div className="font-display text-[48px] text-purple-bright leading-none">${selected.price}</div>
              </div>
              <button
                className={`snipcart-add-item w-full font-ui text-[13px] font-bold tracking-[.2em] uppercase py-4 transition-all duration-200 ${!date || !time || !guests || !name || !email ? 'opacity-40 cursor-not-allowed border border-purple-bright/30 text-purple-bright bg-transparent' : added ? 'bg-purple-bright/20 border border-purple-bright text-purple-bright' : 'bg-purple-bright text-white hover:bg-orange hover:text-black'}`}
                disabled={!date || !time || !guests || !name || !email}
                data-item-id={`vip-${selected.name.toLowerCase().replace(/\s+/g,'-')}`}
                data-item-price={selected.price}
                data-item-url="/vip"
                data-item-name={`VIP Reservation — ${selected.name}`}
                data-item-description={`${date} at ${time} · ${guests} · ${name} · ${email}${phone ? ` · ${phone}` : ''}`}
                onClick={() => { setAdded(true); setTimeout(() => setAdded(false), 2000) }}
              >
                {!date || !time || !guests || !name || !email ? 'Fill in all fields above' : added ? '✓ Added — Complete Checkout' : `Book VIP — $${selected.price}`}
              </button>
              <p className="text-[11px] text-cream/35 text-center mt-3">Full payment required to secure your VIP reservation.</p>
            </div>
          ) : (
            <div className="border border-white/[0.06] p-6 text-center" style={{ background: 'rgba(255,255,255,0.02)' }}>
              <p className="text-cream/35 text-[14px]">Select a package above to continue.</p>
            </div>
          )}
        </motion.div>

      </section>
      <PageCTA />
    </div>
  )
}
