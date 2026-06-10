import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { client } from '@/lib/sanity'
import PageCTA from '@components/PageCTA'

const defaultPackages = [
  { name: 'Standard Table',    description: 'Reserved seating for your group. Deposit applied to your tab.', price: 25,  maxGuests: 6  },
  { name: 'Game Day Table',    description: 'Premium reserved table for game day. Best sightlines guaranteed.', price: 50, maxGuests: 8  },
  { name: 'Large Group Table', description: 'Reserved section for large groups. Great for birthdays and events.', price: 100, maxGuests: 15 },
]

export default function Reservation() {
  const [packages, setPackages] = useState([])
  const [settings, setSettings] = useState(null)
  const [selected, setSelected] = useState(null)
  const [addOns, setAddOns] = useState({})
  const [date, setDate] = useState('')
  const [time, setTime] = useState('')
  const [guests, setGuests] = useState('')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [notes, setNotes] = useState('')
  const [added, setAdded] = useState(false)

  useEffect(() => {
    client.fetch(`*[_type == "tableReservation"][0]`).then(data => {
      if (data?.packages?.length) setPackages(data.packages.filter(p => p.available !== false))
      if (data) setSettings(data)
    }).catch(() => {})
  }, [])

  const displayPackages = packages.length ? packages : defaultPackages
  const s = settings || {}

  const addOnTotal = Object.entries(addOns).reduce((sum, [key, checked]) => {
    if (!checked) return sum
    const item = s.variables?.find(v => v.name === key)
    return sum + (item?.price || 0)
  }, 0)

  const total = selected ? (selected.price + addOnTotal) : 0
  const canSubmit = selected && date && time && guests && name && email && phone
  const itemDescription = selected ? `${selected.name} · ${date} at ${time} · ${guests} · ${name} · ${email} · ${phone}${Object.entries(addOns).filter(([,v])=>v).map(([k])=>' · Add-on: '+k).join('')}${notes ? ' · Notes: '+notes : ''}` : ''

  return (
    <div className="bg-[#04030A] min-h-screen">
      <div className="relative pt-32 pb-12 px-[5vw] overflow-hidden">
        <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg,#0e0800,#04030A,#0e0800)' }} />
        <div className="relative z-[1]">
          <div className="flex items-center gap-3 font-ui text-[13px] font-bold tracking-[.28em] uppercase text-orange mb-4">
            <span className="w-8 h-0.5 bg-orange" />itsurwiener · Clemson, SC
          </div>
          <h1 className="font-display text-[clamp(56px,10vw,130px)] leading-[.85] text-white mb-3">
            Reserve<br /><span className="text-orange">a Table</span>
          </h1>
          <p className="font-cond text-[clamp(16px,2vw,22px)] text-cream/55 max-w-[600px] tracking-wide">
            {s.description || 'Choose your package, pick your date, and secure your spot. Deposit applied to your tab.'}
          </p>
        </div>
      </div>

      {s.notice && (
        <div className="px-[5vw] max-w-[1000px] mx-auto pb-4">
          <div className="border border-orange/30 px-5 py-4" style={{ background: 'rgba(245,101,32,0.06)' }}>
            <p className="text-[13px] text-orange font-bold">{s.notice}</p>
          </div>
        </div>
      )}

      <section className="px-[5vw] py-8 max-w-[1000px] mx-auto">

        {/* Step 1 — Packages */}
        <div className="mb-10">
          <div className="font-ui text-[11px] font-bold tracking-[.22em] uppercase text-orange mb-4">Step 1 — Choose a Package</div>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(3, 1fr)', gap:'16px', width:'100%' }}>
            {displayPackages.map((pkg, idx) => (
              <button key={pkg.name || idx} onClick={() => setSelected(pkg)}
                
                className={`text-left p-6 border transition-all duration-200 ${selected?.name === pkg.name ? 'border-orange bg-orange/10' : 'border-white/[0.08] hover:border-orange/40 bg-white/[0.02]'}`}>
                <div className="font-display text-[clamp(36px,4vw,52px)] text-orange leading-none mb-2">${pkg.price}</div>
                <div className="font-cond text-[18px] font-bold text-white uppercase mb-2">{pkg.name}</div>
                <div className="text-[12px] text-cream/50 leading-relaxed mb-3">{pkg.description}</div>
                <div className="font-ui text-[10px] text-cream/30 uppercase tracking-wider">Up to {pkg.maxGuests} guests</div>
                {selected?.name === pkg.name && <div className="mt-3 font-ui text-[10px] font-bold tracking-[.15em] uppercase text-orange">✓ Selected</div>}
              </button>
            ))}
          </div>
        </div>

        {/* Step 2 — Details */}
        <motion.div initial={{opacity:0,y:20}} whileInView={{opacity:1,y:0}} viewport={{once:true}} className="mb-10">
          <div className="font-ui text-[11px] font-bold tracking-[.22em] uppercase text-orange mb-4">Step 2 — Your Details</div>
          <div className="border border-white/[0.07] p-6 md:p-8" style={{ background: 'rgba(255,255,255,0.02)' }}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
              <div>
                <label className="font-ui text-[9px] font-bold tracking-[.22em] uppercase text-orange/60 block mb-2">Your Name *</label>
                <input value={name} onChange={e=>setName(e.target.value)} placeholder="Full name"
                  className="w-full bg-[#1a1520] border border-white/20 text-white font-ui text-[14px] px-4 py-3.5 outline-none focus:border-orange transition-colors placeholder:text-white/30" />
              </div>
              <div>
                <label className="font-ui text-[9px] font-bold tracking-[.22em] uppercase text-orange/60 block mb-2">Email *</label>
                <input type="email" value={email} onChange={e=>setEmail(e.target.value)} placeholder="your@email.com"
                  className="w-full bg-[#1a1520] border border-white/20 text-white font-ui text-[14px] px-4 py-3.5 outline-none focus:border-orange transition-colors placeholder:text-white/30" />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-5">
              <div>
                <label className="font-ui text-[9px] font-bold tracking-[.22em] uppercase text-orange/60 block mb-2">Phone *</label>
                <input type="tel" value={phone} onChange={e=>setPhone(e.target.value)} placeholder="(000) 000-0000"
                  className="w-full bg-[#1a1520] border border-white/20 text-white font-ui text-[14px] px-4 py-3.5 outline-none focus:border-orange transition-colors placeholder:text-white/30" />
              </div>
              <div>
                <label className="font-ui text-[9px] font-bold tracking-[.22em] uppercase text-orange/60 block mb-2">Date *</label>
                {s.availableDates?.length > 0 ? (
                  <select value={date} onChange={e=>setDate(e.target.value)}
                    className="w-full bg-[#1a1520] border border-white/20 text-white font-ui text-[14px] px-4 py-3.5 outline-none focus:border-orange transition-colors">
                    <option value="">Select date...</option>
                    {s.availableDates.map(d=><option key={d} value={d}>{new Date(d+'T12:00:00').toLocaleDateString('en-US',{weekday:'short',month:'long',day:'numeric',year:'numeric'})}</option>)}
                  </select>
                ) : (
                  <input type="date" value={date} onChange={e=>setDate(e.target.value)}
                    className="w-full bg-[#1a1520] border border-white/20 text-white font-ui text-[14px] px-4 py-3.5 outline-none focus:border-orange transition-colors" />
                )}
              </div>
              <div>
                <label className="font-ui text-[9px] font-bold tracking-[.22em] uppercase text-orange/60 block mb-2">Preferred Time *</label>
                <input value={time} onChange={e=>setTime(e.target.value)} placeholder={s.time || 'e.g. 7:00 PM'}
                  className="w-full bg-[#1a1520] border border-white/20 text-white font-ui text-[14px] px-4 py-3.5 outline-none focus:border-orange transition-colors placeholder:text-cream/30" />
              </div>
            </div>
            <div className="mb-5">
              <label className="font-ui text-[9px] font-bold tracking-[.22em] uppercase text-orange/60 block mb-2">Number of People *</label>
              <input type="number" min="1" max={selected?.maxGuests || 20} value={guests} onChange={e=>setGuests(e.target.value)} placeholder="Enter number of guests"
                className="w-full bg-[#1a1520] border border-white/20 text-white font-ui text-[14px] px-4 py-3.5 outline-none focus:border-orange transition-colors placeholder:text-cream/30" />
              {selected?.maxGuests && <p className="text-[11px] text-cream/35 mt-1">Max {selected.maxGuests} people for this package</p>}
            </div>
            {s.variables?.length > 0 && (
              <div className="mb-5">
                <label className="font-ui text-[9px] font-bold tracking-[.22em] uppercase text-orange/60 block mb-3">Add-Ons (Optional)</label>
                <div className="flex flex-col gap-2">
                  {s.variables.map(v => (
                    <label key={v.name} className="flex items-center justify-between border border-white/[0.07] px-4 py-3 cursor-pointer hover:border-orange/30 transition-colors" style={{ background: 'rgba(255,255,255,0.02)' }}>
                      <div className="flex items-center gap-3">
                        <input type="checkbox" checked={!!addOns[v.name]} onChange={e=>setAddOns(a=>({...a,[v.name]:e.target.checked}))} className="w-4 h-4 accent-orange" />
                        <div>
                          <div className="font-cond text-[16px] font-bold text-white uppercase">{v.name}</div>
                          {v.description && <div className="text-[11px] text-cream/40">{v.description}</div>}
                        </div>
                      </div>
                      <div className="font-display text-[22px] text-orange">+${v.price}</div>
                    </label>
                  ))}
                </div>
              </div>
            )}
            <div>
              <label className="font-ui text-[9px] font-bold tracking-[.22em] uppercase text-orange/60 block mb-2">Special Instructions</label>
              <textarea value={notes} onChange={e=>setNotes(e.target.value)} rows={3} placeholder="Allergies, special occasions, accessibility needs..."
                className="w-full bg-[#1a1520] border border-white/20 text-white font-ui text-[14px] px-4 py-3.5 outline-none focus:border-orange transition-colors placeholder:text-white/30 resize-y" />
            </div>
          </div>
        </motion.div>

        {/* Step 3 — Checkout */}
        <motion.div initial={{opacity:0,y:20}} whileInView={{opacity:1,y:0}} viewport={{once:true}}>
          <div className="font-ui text-[11px] font-bold tracking-[.22em] uppercase text-orange mb-4">Step 3 — Checkout</div>
          <div className="border border-orange/20 p-6 md:p-8" style={{ background: 'rgba(245,101,32,0.04)' }}>
            {selected ? (
              <div className="flex items-center justify-between flex-wrap gap-4 mb-6">
                <div>
                  <div className="font-cond text-[20px] font-bold text-white uppercase">{selected.name}</div>
                  <div className="text-[13px] text-cream/45">{date && time ? `${date} at ${time}` : 'Date & time not set'}{guests ? ` · ${guests}` : ''}</div>
                </div>
                <div className="font-display text-[52px] text-orange leading-none">${total}</div>
              </div>
            ) : (
              <p className="text-cream/35 text-[14px] mb-6">Select a package above to continue.</p>
            )}
            <button
              className={`snipcart-add-item w-full font-ui text-[13px] font-bold tracking-[.2em] uppercase py-4 transition-all duration-200 ${!canSubmit ? 'opacity-40 cursor-not-allowed border border-orange/30 text-orange/50 bg-transparent' : added ? 'bg-orange/20 border border-orange text-orange' : 'bg-orange text-black hover:bg-white'}`}
              disabled={!canSubmit}
              data-item-id={`table-${(selected?.name||'').toLowerCase().replace(/\s+/g,'-')}-${Date.now()}`}
              data-item-price={total || 0}
              data-item-url="/reserve"
              data-item-name={`Table Reservation — ${selected?.name || ''}`}
              data-item-description={itemDescription}
              data-item-max-quantity={s.quantity || undefined}
              onClick={() => { if (canSubmit) { setAdded(true); setTimeout(()=>setAdded(false),3000) }}}
            >
              {!canSubmit ? 'Select a package and fill in all fields' : added ? '✓ Added to Cart — Complete Checkout' : `Reserve Now — $${total}`}
            </button>
            {added && s.confirmationMessage && (
              <p className="text-[13px] text-orange text-center mt-4 font-bold">{s.confirmationMessage}</p>
            )}
            <p className="text-[11px] text-cream/30 text-center mt-3">Deposit applied to your tab on the day of your visit.</p>
          </div>
        </motion.div>

      </section>
      <PageCTA />
    </div>
  )
}
