import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { client } from '@/lib/sanity'
import PageCTA from '@components/PageCTA'

export default function VipReservation() {
  const [settings, setSettings] = useState(null)
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
      if (data) setSettings(data)
    }).catch(() => {})
  }, [])

  const s = settings || {
    title: 'Reserve VIP',
    description: 'Private bartender, reserved seating, bottle service. Full payment required.',
    price: 150,
    quantity: 5,
    notice: '',
    confirmationMessage: "Your VIP section is reserved! We'll be in touch to confirm details.",
    variables: [],
    availableTimes: ['8:00 PM','9:00 PM','10:00 PM'],
    perks: ['Private Bartender','Reserved Seating','Priority Service'],
  }

  const addOnTotal = Object.entries(addOns).reduce((sum, [key, checked]) => {
    if (!checked) return sum
    const item = s.variables?.find(v => v.name === key)
    return sum + (item?.price || 0)
  }, 0)

  const total = s.price + addOnTotal
  const canSubmit = date && time && guests && name && email && phone
  const itemDescription = `${date} at ${time} · ${guests} · Name: ${name} · Email: ${email} · Phone: ${phone}${Object.entries(addOns).filter(([,v])=>v).map(([k])=>' · '+k).join('')}${notes ? ' · Notes: '+notes : ''}`

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
          {s.description && <p className="font-cond text-[clamp(16px,2vw,22px)] text-cream/55 max-w-[600px] tracking-wide">{s.description}</p>}
        </div>
      </div>

      {s.perks?.length > 0 && (
        <div className="px-[5vw] max-w-[800px] mx-auto pb-2">
          <div className="flex flex-wrap gap-2">
            {s.perks.map(p => (
              <span key={p} className="font-ui text-[10px] font-bold tracking-[.15em] uppercase border border-purple-bright/30 text-purple-bright px-3 py-1.5">
                ✓ {p}
              </span>
            ))}
          </div>
        </div>
      )}

      {s.notice && (
        <div className="px-[5vw] max-w-[800px] mx-auto py-3">
          <div className="border border-purple-bright/30 px-5 py-4" style={{ background: 'rgba(157,78,221,0.06)' }}>
            <p className="text-[13px] text-purple-bright font-bold">{s.notice}</p>
          </div>
        </div>
      )}

      <section className="px-[5vw] py-6 max-w-[800px] mx-auto">
        <motion.div initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.6 }}
          className="border border-purple-bright/15 p-8 md:p-10" style={{ background: 'rgba(157,78,221,0.03)' }}>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
            <div>
              <label className="font-ui text-[9px] font-bold tracking-[.22em] uppercase text-purple-bright/70 block mb-2">Your Name *</label>
              <input value={name} onChange={e=>setName(e.target.value)} placeholder="Full name"
                className="w-full bg-white/[0.04] border border-white/10 text-cream font-ui text-[14px] px-4 py-3.5 outline-none focus:border-purple-bright transition-colors placeholder:text-cream/20" />
            </div>
            <div>
              <label className="font-ui text-[9px] font-bold tracking-[.22em] uppercase text-purple-bright/70 block mb-2">Email *</label>
              <input type="email" value={email} onChange={e=>setEmail(e.target.value)} placeholder="your@email.com"
                className="w-full bg-white/[0.04] border border-white/10 text-cream font-ui text-[14px] px-4 py-3.5 outline-none focus:border-purple-bright transition-colors placeholder:text-cream/20" />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-5">
            <div>
              <label className="font-ui text-[9px] font-bold tracking-[.22em] uppercase text-purple-bright/70 block mb-2">Phone *</label>
              <input type="tel" value={phone} onChange={e=>setPhone(e.target.value)} placeholder="(000) 000-0000"
                className="w-full bg-white/[0.04] border border-white/10 text-cream font-ui text-[14px] px-4 py-3.5 outline-none focus:border-purple-bright transition-colors placeholder:text-cream/20" />
            </div>
            <div>
              <label className="font-ui text-[9px] font-bold tracking-[.22em] uppercase text-purple-bright/70 block mb-2">Date *</label>
              {s.availableDates?.length > 0 ? (
                <select value={date} onChange={e=>setDate(e.target.value)}
                  className="w-full bg-[#08060F] border border-white/10 text-cream font-ui text-[14px] px-4 py-3.5 outline-none focus:border-purple-bright transition-colors">
                  <option value="">Select date...</option>
                  {s.availableDates.map(d => <option key={d} value={d}>{new Date(d+'T12:00:00').toLocaleDateString('en-US',{weekday:'short',month:'long',day:'numeric',year:'numeric'})}</option>)}
                </select>
              ) : (
                <input type="date" value={date} onChange={e=>setDate(e.target.value)}
                  className="w-full bg-white/[0.04] border border-white/10 text-cream font-ui text-[14px] px-4 py-3.5 outline-none focus:border-purple-bright transition-colors" />
              )}
            </div>
            <div>
              <label className="font-ui text-[9px] font-bold tracking-[.22em] uppercase text-purple-bright/70 block mb-2">Time *</label>
              <select value={time} onChange={e=>setTime(e.target.value)}
                className="w-full bg-[#08060F] border border-white/10 text-cream font-ui text-[14px] px-4 py-3.5 outline-none focus:border-purple-bright transition-colors">
                <option value="">Select...</option>
                {s.availableTimes?.map(t => <option key={t}>{t}</option>)}
              </select>
            </div>
          </div>

          <div className="mb-5">
            <label className="font-ui text-[9px] font-bold tracking-[.22em] uppercase text-purple-bright/70 block mb-2">Guest Count *</label>
            <select value={guests} onChange={e=>setGuests(e.target.value)}
              className="w-full bg-[#08060F] border border-white/10 text-cream font-ui text-[14px] px-4 py-3.5 outline-none focus:border-purple-bright transition-colors">
              <option value="">Select guests...</option>
              {Array.from({length:40},(_,i)=>i+1).map(n=><option key={n}>{n} {n===1?'Guest':'Guests'}</option>)}
              <option>40+ Guests</option>
            </select>
          </div>

          {s.variables?.length > 0 && (
            <div className="mb-5">
              <label className="font-ui text-[9px] font-bold tracking-[.22em] uppercase text-purple-bright/70 block mb-3">Add-Ons (Optional)</label>
              <div className="flex flex-col gap-2">
                {s.variables.map(v => (
                  <label key={v.name} className="flex items-center justify-between border border-white/[0.07] px-4 py-3 cursor-pointer hover:border-purple-bright/30 transition-colors" style={{ background: 'rgba(255,255,255,0.03)' }}>
                    <div className="flex items-center gap-3">
                      <input type="checkbox" checked={!!addOns[v.name]} onChange={e=>setAddOns(a=>({...a,[v.name]:e.target.checked}))}
                        className="w-4 h-4 accent-purple-bright" />
                      <div>
                        <div className="font-cond text-[16px] font-bold text-white uppercase">{v.name}</div>
                        {v.description && <div className="text-[11px] text-cream/45">{v.description}</div>}
                      </div>
                    </div>
                    <div className="font-display text-[22px] text-purple-bright">+${v.price}</div>
                  </label>
                ))}
              </div>
            </div>
          )}

          <div className="mb-5">
            <label className="font-ui text-[9px] font-bold tracking-[.22em] uppercase text-purple-bright/70 block mb-2">Special Instructions</label>
            <textarea value={notes} onChange={e=>setNotes(e.target.value)} rows={3}
              placeholder="Occasion, special requests, accessibility needs, etc."
              className="w-full bg-white/[0.04] border border-white/10 text-cream font-ui text-[14px] px-4 py-3.5 outline-none focus:border-purple-bright transition-colors placeholder:text-cream/20 resize-y" />
          </div>

          <div className="border border-purple-bright/20 px-6 py-5 mb-5 flex items-center justify-between" style={{ background: 'rgba(157,78,221,0.05)' }}>
            <div>
              <div className="font-ui text-[10px] font-bold tracking-[.2em] uppercase text-purple-bright/60 mb-1">Total</div>
              <div className="text-[13px] text-cream/50">Base ${s.price}{addOnTotal > 0 && ` + Add-ons $${addOnTotal}`}</div>
            </div>
            <div className="font-display text-[48px] text-purple-bright leading-none">${total}</div>
          </div>

          <button
            className={`snipcart-add-item w-full font-ui text-[13px] font-bold tracking-[.2em] uppercase py-4 transition-all duration-200 ${!canSubmit ? 'opacity-40 cursor-not-allowed border border-purple-bright/30 text-purple-bright bg-transparent' : added ? 'bg-purple-bright/20 border border-purple-bright text-purple-bright' : 'bg-purple-bright text-white hover:bg-orange hover:text-black'}`}
            disabled={!canSubmit}
            data-item-id={`vip-res-${Date.now()}`}
            data-item-price={total}
            data-item-url="/vip"
            data-item-name="VIP Reservation — The Basement"
            data-item-description={itemDescription}
            data-item-max-quantity={s.quantity || 99}
            onClick={() => { if (canSubmit) { setAdded(true); setTimeout(()=>setAdded(false), 3000) } }}
          >
            {!canSubmit ? 'Fill in all required fields' : added ? '✓ Added to Cart — Complete Checkout to Confirm' : `Book VIP — $${total}`}
          </button>

          {added && s.confirmationMessage && (
            <div className="mt-4 border border-purple-bright/30 px-5 py-4 text-center" style={{ background: 'rgba(157,78,221,0.06)' }}>
              <p className="text-[14px] text-purple-bright font-bold">{s.confirmationMessage}</p>
              <p className="text-[12px] text-cream/45 mt-1">Complete checkout above to finalize your VIP reservation.</p>
            </div>
          )}

        </motion.div>
      </section>
      <PageCTA />
    </div>
  )
}
