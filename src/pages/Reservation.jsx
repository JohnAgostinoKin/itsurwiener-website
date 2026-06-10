import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { client } from '@/lib/sanity'

const inView = (delay = 0) => ({
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] }
})

export default function Reservation() {
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
      tablePackages, availableTimes, tableNote
    }`).then(data => {
      if (data?.tablePackages?.length) setPackages(data.tablePackages.filter(p => p.available))
      if (data?.availableTimes?.length) setTimes(data.availableTimes)
      if (data?.tableNote) setNote(data.tableNote)
    }).catch(() => {})
  }, [])

  const defaultPackages = [
    { name: 'Standard Table', description: 'Reserved seating for your group. Deposit applied to your tab.', price: 25, maxGuests: 6 },
    { name: 'Game Day Table', description: 'Premium reserved table for game day. Best sightlines guaranteed.', price: 50, maxGuests: 8 },
    { name: 'Large Group Table', description: 'Reserved section for large groups. Great for birthdays and events.', price: 100, maxGuests: 15 },
  ]

  const displayPackages = packages.length ? packages : defaultPackages
  const defaultTimes = ['11:00 AM','12:00 PM','1:00 PM','4:00 PM','5:00 PM','6:00 PM','7:00 PM','8:00 PM','9:00 PM']
  const displayTimes = times.length ? times : defaultTimes

  const handleAdd = () => {
    if (!selected || !date || !time || !guests) return
    setAdded(true)
    setTimeout(() => setAdded(false), 2000)
  }

  return (
    <div className="bg-[#04030A] min-h-screen">
      <div className="relative pt-32 pb-16 px-[5vw] overflow-hidden">
        <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg,#0e0800,#04030A,#0e0800)' }} />
        <div className="relative z-[1]">
          <div className="flex items-center gap-3 font-ui text-[13px] font-bold tracking-[.28em] uppercase text-orange mb-4">
            <span className="w-8 h-0.5 bg-orange" />itsurwiener · Clemson, SC
          </div>
          <h1 className="font-display text-[clamp(56px,10vw,130px)] leading-[.85] text-white mb-4">
            Reserve<br /><span className="text-orange">a Table</span>
          </h1>
          <p className="font-cond text-[clamp(16px,2vw,22px)] text-cream/55 max-w-[600px] tracking-wide">
            Choose your package, pick your date and time, and secure your spot. Deposit applies to your tab.
          </p>
        </div>
      </div>

      {note && (
        <div className="px-[5vw] max-w-[900px] mx-auto pt-2 pb-4">
          <div className="border border-orange/30 px-5 py-4" style={{ background: 'rgba(245,101,32,0.06)' }}>
            <p className="text-[13px] text-orange">{note}</p>
          </div>
        </div>
      )}

      <section className="px-[5vw] py-8 max-w-[900px] mx-auto">

        {/* Step 1: Choose package */}
        <motion.div {...inView(0)} className="mb-10">
          <div className="font-ui text-[11px] font-bold tracking-[.22em] uppercase text-orange mb-5">Step 1 — Choose Your Package</div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {displayPackages.map((pkg) => (
              <button key={pkg.name} onClick={() => setSelected(pkg)}
                className={`text-left p-6 border transition-all duration-200 ${selected?.name === pkg.name ? 'border-orange bg-orange/10' : 'border-white/[0.08] hover:border-orange/40 bg-white/[0.03]'}`}>
                <div className="font-display text-[clamp(36px,4vw,52px)] text-orange leading-none mb-2">${pkg.price}</div>
                <div className="font-cond text-[18px] font-bold text-white uppercase tracking-wide mb-2">{pkg.name}</div>
                <div className="text-[12px] text-cream/55 leading-relaxed mb-3">{pkg.description}</div>
                <div className="font-ui text-[10px] text-cream/35 uppercase tracking-wider">Up to {pkg.maxGuests} guests</div>
                {selected?.name === pkg.name && (
                  <div className="mt-3 font-ui text-[10px] font-bold tracking-[.15em] uppercase text-orange">✓ Selected</div>
                )}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Step 2: Date, time, guests */}
        <motion.div {...inView(0.1)} className="mb-10">
          <div className="font-ui text-[11px] font-bold tracking-[.22em] uppercase text-orange mb-5">Step 2 — Pick Your Date & Time</div>
          <div className="border border-white/[0.07] p-6 md:p-8" style={{ background: 'rgba(255,255,255,0.03)' }}>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-5">
              <div>
                <label className="font-ui text-[9px] font-bold tracking-[.22em] uppercase text-orange/70 block mb-2">Date *</label>
                <input type="date" value={date} onChange={e => setDate(e.target.value)} required
                  className="w-full bg-white/[0.04] border border-white/10 text-cream font-ui text-[14px] px-4 py-3.5 outline-none focus:border-orange transition-colors" />
              </div>
              <div>
                <label className="font-ui text-[9px] font-bold tracking-[.22em] uppercase text-orange/70 block mb-2">Time *</label>
                <select value={time} onChange={e => setTime(e.target.value)} required
                  className="w-full bg-[#08060F] border border-white/10 text-cream font-ui text-[14px] px-4 py-3.5 outline-none focus:border-orange transition-colors">
                  <option value="">Select time...</option>
                  {displayTimes.map(t => <option key={t}>{t}</option>)}
                </select>
              </div>
              <div>
                <label className="font-ui text-[9px] font-bold tracking-[.22em] uppercase text-orange/70 block mb-2">Guests *</label>
                <select value={guests} onChange={e => setGuests(e.target.value)} required
                  className="w-full bg-[#08060F] border border-white/10 text-cream font-ui text-[14px] px-4 py-3.5 outline-none focus:border-orange transition-colors">
                  <option value="">Select...</option>
                  {Array.from({length: selected?.maxGuests || 15}, (_,i) => i+1).map(n => (
                    <option key={n}>{n} {n === 1 ? 'Guest' : 'Guests'}</option>
                  ))}
                </select>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              <div>
                <label className="font-ui text-[9px] font-bold tracking-[.22em] uppercase text-orange/70 block mb-2">Your Name *</label>
                <input value={name} onChange={e => setName(e.target.value)} placeholder="Full name"
                  className="w-full bg-white/[0.04] border border-white/10 text-cream font-ui text-[14px] px-4 py-3.5 outline-none focus:border-orange transition-colors placeholder:text-cream/20" />
              </div>
              <div>
                <label className="font-ui text-[9px] font-bold tracking-[.22em] uppercase text-orange/70 block mb-2">Email *</label>
                <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="your@email.com"
                  className="w-full bg-white/[0.04] border border-white/10 text-cream font-ui text-[14px] px-4 py-3.5 outline-none focus:border-orange transition-colors placeholder:text-cream/20" />
              </div>
              <div>
                <label className="font-ui text-[9px] font-bold tracking-[.22em] uppercase text-orange/70 block mb-2">Phone</label>
                <input type="tel" value={phone} onChange={e => setPhone(e.target.value)} placeholder="(000) 000-0000"
                  className="w-full bg-white/[0.04] border border-white/10 text-cream font-ui text-[14px] px-4 py-3.5 outline-none focus:border-orange transition-colors placeholder:text-cream/20" />
              </div>
            </div>
          </div>
        </motion.div>

        {/* Step 3: Pay */}
        <motion.div {...inView(0.2)}>
          <div className="font-ui text-[11px] font-bold tracking-[.22em] uppercase text-orange mb-5">Step 3 — Secure Your Reservation</div>
          {selected ? (
            <div className="border border-orange/20 p-6 md:p-8" style={{ background: 'rgba(245,101,32,0.04)' }}>
              <div className="flex items-center justify-between flex-wrap gap-4 mb-6">
                <div>
                  <div className="font-cond text-[20px] font-bold text-white uppercase">{selected.name}</div>
                  <div className="text-[13px] text-cream/50">{date && time ? `${date} at ${time}` : 'Date & time TBD'}{guests ? ` · ${guests}` : ''}</div>
                </div>
                <div className="font-display text-[48px] text-orange leading-none">${selected.price}</div>
              </div>
              <button
                onClick={handleAdd}
                className={`snipcart-add-item w-full font-ui text-[13px] font-bold tracking-[.2em] uppercase py-4 transition-all duration-200 ${!date || !time || !guests || !name || !email ? 'opacity-40 cursor-not-allowed border border-orange/30 text-orange bg-transparent' : added ? 'bg-orange/20 border border-orange text-orange' : 'bg-orange text-black hover:bg-white'}`}
                disabled={!date || !time || !guests || !name || !email}
                data-item-id={`table-${selected.name.toLowerCase().replace(/\s+/g,'-')}`}
                data-item-price={selected.price}
                data-item-url="/reserve"
                data-item-name={`Table Reservation — ${selected.name}`}
                data-item-description={`${date} at ${time} · ${guests} · ${name} · ${email}${phone ? ` · ${phone}` : ''}`}
              >
                {!date || !time || !guests || !name || !email ? 'Fill in all fields above' : added ? '✓ Added to Cart — Complete Checkout' : `Reserve Now — $${selected.price} Deposit`}
              </button>
              <p className="text-[11px] text-cream/35 text-center mt-3">Deposit is applied to your tab on the day of your visit.</p>
            </div>
          ) : (
            <div className="border border-white/[0.06] p-6 text-center" style={{ background: 'rgba(255,255,255,0.02)' }}>
              <p className="text-cream/35 text-[14px]">Select a package above to continue.</p>
            </div>
          )}
        </motion.div>

      </section>
    </div>
  )
}
