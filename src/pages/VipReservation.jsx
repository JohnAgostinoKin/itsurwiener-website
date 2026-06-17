import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { client } from '@/lib/sanity'
import { useCart } from '@components/CartContext'
import PageCTA from '@components/PageCTA'

const defaultPackages = [
  { name: 'VIP Small',        description: 'Private section for up to 10. Dedicated bartender included.', price: 150, maxGuests: 10, perks: ['Private Bartender','Reserved Seating','Priority Service'] },
  { name: 'VIP Large',        description: 'Expanded VIP for up to 20. Perfect for birthdays and groups.', price: 300, maxGuests: 20, perks: ['Private Bartender','Reserved Seating','Bottle Service Option'] },
  { name: 'Full VIP Section', description: 'Exclusive access to the entire VIP section.', price: 500, maxGuests: 40, perks: ['Private Bartender','Full Section Exclusive','Bottle Service','Priority Entry'] },
]

export default function VipReservation() {
  const { addItem } = useCart()
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
    client.fetch(`*[_type == "vipReservation"][0]`).then(data => {
      if (data?.packages?.length) setPackages(data.packages)
      if (data) setSettings(data)
    }).catch(() => {})
  }, [])

  const allPackages = packages.length ? packages : defaultPackages
  const displayPackages = date
    ? allPackages.filter(p => !p.effectiveDates?.length || p.effectiveDates.includes(date))
    : allPackages
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
        <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg,#08002a,#04030A,#08002a)' }} />
        <div className="relative z-[1]">
          <div className="flex items-center gap-3 font-ui text-[13px] font-bold tracking-[.28em] uppercase text-purple-bright mb-4">
            <span className="w-8 h-0.5 bg-purple-bright" />The Basement
          </div>
          <h1 className="font-display text-[clamp(56px,10vw,130px)] leading-[.85] text-white mb-3">
            Reserve<br /><span className="text-purple-bright">VIP</span>
          </h1>
          <p className="font-cond text-[clamp(16px,2vw,22px)] text-cream/55 max-w-[600px] tracking-wide">
            {s.description || 'Private bartender, reserved seating, bottle service. Choose your package and book instantly.'}
          </p>
        </div>
      </div>

      {s.notice && (
        <div className="px-[5vw] max-w-[1000px] mx-auto pb-4">
          <div className="border border-purple-bright/30 px-5 py-4" style={{ background: 'rgba(157,78,221,0.06)' }}>
            <p className="text-[13px] text-purple-bright">{s.notice}</p>
          </div>
        </div>
      )}

      <section className="px-[5vw] py-8 max-w-[1000px] mx-auto">

        {/* Step 1 — Packages */}
        <div className="mb-10">
          <div className="font-ui text-[11px] font-bold tracking-[.22em] uppercase text-purple-bright mb-4">Step 1 — Choose a Package ({displayPackages.length} available)</div>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(3, 1fr)', gap:'16px', width:'100%' }}>
            {displayPackages.map((pkg, idx) => (
              <div key={pkg.name || idx} style={{ display:'block' }}>
              <button onClick={() => setSelected(pkg)} style={{ display:'block', width:'100%', textAlign:'left' }}

                className={`text-left p-6 border transition-all duration-200 ${selected?.name === pkg.name ? 'border-purple-bright bg-purple-bright/10' : 'border-white/[0.08] hover:border-purple-bright/40 bg-white/[0.02]'}`}>
                <div className="font-display text-[clamp(36px,4vw,52px)] text-purple-bright leading-none mb-2">${pkg.price}</div>
                <div className="font-cond text-[18px] font-bold text-white uppercase mb-2">{pkg.name}</div>
                <div className="text-[12px] text-cream/50 leading-relaxed mb-3">{pkg.description}</div>
                <div className="font-ui text-[10px] text-cream/30 uppercase tracking-wider mb-3">Up to {pkg.maxGuests} guests</div>
                {pkg.perks?.length > 0 && (
                  <div className="flex flex-col gap-1">
                    {pkg.perks.map(p => (
                      <div key={p} className="flex items-center gap-2 text-[11px] text-cream/50">
                        <span className="w-1 h-1 rounded-full bg-purple-bright flex-shrink-0" />{p}
                      </div>
                    ))}
                  </div>
                )}
                {selected?.name === pkg.name && <div className="mt-3 font-ui text-[10px] font-bold tracking-[.15em] uppercase text-purple-bright">✓ Selected</div>}
              </button>
              </div>
            ))}
          </div>
        </div>

        {/* Step 2 — Details */}
        <motion.div initial={{opacity:0,y:20}} whileInView={{opacity:1,y:0}} viewport={{once:true}} className="mb-10">
          <div className="font-ui text-[11px] font-bold tracking-[.22em] uppercase text-purple-bright mb-4">Step 2 — Your Details</div>
          <div className="border border-purple-bright/10 p-6 md:p-8" style={{ background: 'rgba(157,78,221,0.02)' }}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
              <div>
                <label className="font-ui text-[9px] font-bold tracking-[.22em] uppercase text-purple-bright/60 block mb-2">Your Name *</label>
                <input value={name} onChange={e=>setName(e.target.value)} placeholder="Full name"
                  className="w-full bg-[#1a1520] border border-white/20 text-white font-ui text-[14px] px-4 py-3.5 outline-none focus:border-purple-bright transition-colors placeholder:text-white/30" />
              </div>
              <div>
                <label className="font-ui text-[9px] font-bold tracking-[.22em] uppercase text-purple-bright/60 block mb-2">Email *</label>
                <input type="email" value={email} onChange={e=>setEmail(e.target.value)} placeholder="your@email.com"
                  className="w-full bg-[#1a1520] border border-white/20 text-white font-ui text-[14px] px-4 py-3.5 outline-none focus:border-purple-bright transition-colors placeholder:text-white/30" />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-5">
              <div>
                <label className="font-ui text-[9px] font-bold tracking-[.22em] uppercase text-purple-bright/60 block mb-2">Phone *</label>
                <input type="tel" value={phone} onChange={e=>setPhone(e.target.value)} placeholder="(000) 000-0000"
                  className="w-full bg-[#1a1520] border border-white/20 text-white font-ui text-[14px] px-4 py-3.5 outline-none focus:border-purple-bright transition-colors placeholder:text-white/30" />
              </div>
              <div>
                <label className="font-ui text-[9px] font-bold tracking-[.22em] uppercase text-purple-bright/60 block mb-2">Date *</label>
                {s.availableDates?.length > 0 ? (
                  <select value={date} onChange={e=>setDate(e.target.value)}
                    className="w-full bg-[#1a1520] border border-white/20 text-white font-ui text-[14px] px-4 py-3.5 outline-none focus:border-purple-bright transition-colors">
                    <option value="">Select date...</option>
                    {s.availableDates.map(d=><option key={d} value={d}>{new Date(d+'T12:00:00').toLocaleDateString('en-US',{weekday:'short',month:'long',day:'numeric',year:'numeric'})}</option>)}
                  </select>
                ) : (
                  <input type="date" value={date} onChange={e=>setDate(e.target.value)}
                    className="w-full bg-[#1a1520] border border-white/20 text-white font-ui text-[14px] px-4 py-3.5 outline-none focus:border-purple-bright transition-colors" />
                )}
              </div>
              <div>
                <label className="font-ui text-[9px] font-bold tracking-[.22em] uppercase text-purple-bright/60 block mb-2">Preferred Time *</label>
                <input value={time} onChange={e=>setTime(e.target.value)} placeholder={s.time || 'e.g. 9:00 PM'}
                  className="w-full bg-[#1a1520] border border-white/20 text-white font-ui text-[14px] px-4 py-3.5 outline-none focus:border-purple-bright transition-colors placeholder:text-cream/30" />
              </div>
            </div>
            <div className="mb-5">
              <label className="font-ui text-[9px] font-bold tracking-[.22em] uppercase text-purple-bright/60 block mb-2">Number of People *</label>
              <input type="number" min="1" max={selected?.maxGuests || 40} value={guests} onChange={e=>setGuests(e.target.value)} placeholder="Enter number of guests"
                className="w-full bg-[#1a1520] border border-white/20 text-white font-ui text-[14px] px-4 py-3.5 outline-none focus:border-purple-bright transition-colors placeholder:text-cream/30" />
              {selected?.maxGuests && <p className="text-[11px] text-cream/35 mt-1">Max {selected.maxGuests} people for this package</p>}
            </div>
            {s.variables?.length > 0 && (
              <div className="mb-5">
                <label className="font-ui text-[9px] font-bold tracking-[.22em] uppercase text-purple-bright/60 block mb-3">Add-Ons (Optional)</label>
                <div className="flex flex-col gap-2">
                  {s.variables.map(v => (
                    <label key={v.name} className="flex items-center justify-between border border-white/[0.07] px-4 py-3 cursor-pointer hover:border-purple-bright/30 transition-colors" style={{ background: 'rgba(255,255,255,0.02)' }}>
                      <div className="flex items-center gap-3">
                        <input type="checkbox" checked={!!addOns[v.name]} onChange={e=>setAddOns(a=>({...a,[v.name]:e.target.checked}))} className="w-4 h-4 accent-purple-bright" />
                        <div>
                          <div className="font-cond text-[16px] font-bold text-white uppercase">{v.name}</div>
                          {v.description && <div className="text-[11px] text-cream/40">{v.description}</div>}
                        </div>
                      </div>
                      <div className="font-display text-[22px] text-purple-bright">+${v.price}</div>
                    </label>
                  ))}
                </div>
              </div>
            )}
            <div>
              <label className="font-ui text-[9px] font-bold tracking-[.22em] uppercase text-purple-bright/60 block mb-2">Special Instructions</label>
              <textarea value={notes} onChange={e=>setNotes(e.target.value)} rows={3} placeholder="Occasion, special requests, accessibility needs..."
                className="w-full bg-[#1a1520] border border-white/20 text-white font-ui text-[14px] px-4 py-3.5 outline-none focus:border-purple-bright transition-colors placeholder:text-white/30 resize-y" />
            </div>
          </div>
        </motion.div>

        {/* Step 3 — Checkout */}
        <motion.div initial={{opacity:0,y:20}} whileInView={{opacity:1,y:0}} viewport={{once:true}}>
          <div className="font-ui text-[11px] font-bold tracking-[.22em] uppercase text-purple-bright mb-4">Step 3 — Checkout</div>
          <div className="border border-purple-bright/20 p-6 md:p-8" style={{ background: 'rgba(157,78,221,0.04)' }}>
            {selected ? (
              <div className="flex items-center justify-between flex-wrap gap-4 mb-6">
                <div>
                  <div className="font-cond text-[20px] font-bold text-white uppercase">{selected.name}</div>
                  <div className="text-[13px] text-cream/45">{date && time ? `${date} at ${time}` : 'Date & time not set'}{guests ? ` · ${guests}` : ''}</div>
                </div>
                <div className="font-display text-[52px] text-purple-bright leading-none">${total}</div>
              </div>
            ) : (
              <p className="text-cream/35 text-[14px] mb-6">Select a package above to continue.</p>
            )}
            <button
              className={`w-full font-ui text-[13px] font-bold tracking-[.2em] uppercase py-4 transition-all duration-200 ${!canSubmit ? 'opacity-40 cursor-not-allowed border border-purple-bright/30 text-purple-bright/50 bg-transparent' : added ? 'bg-purple-bright/20 border border-purple-bright text-purple-bright' : 'bg-purple-bright text-white hover:bg-orange hover:text-black'}`}
              disabled={!canSubmit}
              onClick={() => {
                if (!canSubmit) return
                addItem({
                  id: `vip-${(selected?.name || '').toLowerCase().replace(/\s+/g, '-')}-${Date.now()}`,
                  name: `VIP Reservation — ${selected?.name || ''}`,
                  price: total,
                  description: itemDescription,
                  quantity: 1,
                })
                setAdded(true)
                setTimeout(() => setAdded(false), 3000)
              }}
            >
              {!canSubmit ? 'Select a package and fill in all fields' : added ? '✓ Added to Cart — Complete Checkout' : `Book VIP — $${total}`}
            </button>
            {added && s.confirmationMessage && (
              <p className="text-[13px] text-purple-bright text-center mt-4 font-bold">{s.confirmationMessage}</p>
            )}
            <p className="text-[11px] text-cream/30 text-center mt-3">Full payment required to secure your VIP reservation.</p>
          </div>
        </motion.div>

      </section>
      <PageCTA />
    </div>
  )
}
