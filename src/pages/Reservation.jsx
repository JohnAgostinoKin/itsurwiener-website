import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { client } from '@/lib/sanity'
import PageCTA from '@components/PageCTA'

export default function Reservation() {
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
    client.fetch(`*[_type == "tableReservation"][0]`).then(data => {
      if (data) setSettings(data)
    }).catch(() => {})
  }, [])

  const s = settings || {
    title: 'Reserve a Table',
    description: 'Secure your spot. Full payment required to hold your reservation.',
    price: 25,
    quantity: 20,
    notice: '',
    confirmationMessage: "Your table is reserved! We'll see you soon.",
    variables: [],
    availableTimes: ['11:00 AM','12:00 PM','1:00 PM','4:00 PM','5:00 PM','6:00 PM','7:00 PM','8:00 PM','9:00 PM'],
  }

  const addOnTotal = Object.entries(addOns).reduce((sum, [key, checked]) => {
    if (!checked) return sum
    const item = s.variables?.find(v => v.name === key)
    return sum + (item?.price || 0)
  }, 0)

  const total = s.price + addOnTotal
  const canSubmit = date && time && guests && name && email && phone

  // Build Snipcart description from all fields
  const itemDescription = `${date} at ${time} · ${guests} · Name: ${name} · Email: ${email} · Phone: ${phone}${Object.entries(addOns).filter(([,v])=>v).map(([k])=>' · '+k).join('')}${notes ? ' · Notes: '+notes : ''}`

  return (
    <div className="bg-[#04030A] min-h-screen">

      {/* Hero */}
      <div className="relative pt-32 pb-12 px-[5vw] overflow-hidden">
        <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg,#0e0800,#04030A,#0e0800)' }} />
        <div className="relative z-[1]">
          <div className="flex items-center gap-3 font-ui text-[13px] font-bold tracking-[.28em] uppercase text-orange mb-4">
            <span className="w-8 h-0.5 bg-orange" />itsurwiener · Clemson, SC
          </div>
          <h1 className="font-display text-[clamp(56px,10vw,130px)] leading-[.85] text-white mb-3">
            {s.title?.split(' ').slice(0,2).join(' ')}<br />
            <span className="text-orange">{s.title?.split(' ').slice(2).join(' ') || 'a Table'}</span>
          </h1>
          {s.description && <p className="font-cond text-[clamp(16px,2vw,22px)] text-cream/55 max-w-[600px] tracking-wide">{s.description}</p>}
        </div>
      </div>

      {s.notice && (
        <div className="px-[5vw] max-w-[800px] mx-auto pb-4">
          <div className="border border-orange/30 px-5 py-4" style={{ background: 'rgba(245,101,32,0.06)' }}>
            <p className="text-[13px] text-orange font-bold">{s.notice}</p>
          </div>
        </div>
      )}

      <section className="px-[5vw] py-6 max-w-[800px] mx-auto">
        <motion.div initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.6 }}
          className="border border-white/[0.07] p-8 md:p-10" style={{ background: 'rgba(255,255,255,0.03)' }}>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
            <div>
              <label className="font-ui text-[9px] font-bold tracking-[.22em] uppercase text-orange/70 block mb-2">Your Name *</label>
              <input value={name} onChange={e=>setName(e.target.value)} placeholder="Full name"
                className="w-full bg-white/[0.04] border border-white/10 text-cream font-ui text-[14px] px-4 py-3.5 outline-none focus:border-orange transition-colors placeholder:text-cream/20" />
            </div>
            <div>
              <label className="font-ui text-[9px] font-bold tracking-[.22em] uppercase text-orange/70 block mb-2">Email *</label>
              <input type="email" value={email} onChange={e=>setEmail(e.target.value)} placeholder="your@email.com"
                className="w-full bg-white/[0.04] border border-white/10 text-cream font-ui text-[14px] px-4 py-3.5 outline-none focus:border-orange transition-colors placeholder:text-cream/20" />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-5">
            <div>
              <label className="font-ui text-[9px] font-bold tracking-[.22em] uppercase text-orange/70 block mb-2">Phone *</label>
              <input type="tel" value={phone} onChange={e=>setPhone(e.target.value)} placeholder="(000) 000-0000"
                className="w-full bg-white/[0.04] border border-white/10 text-cream font-ui text-[14px] px-4 py-3.5 outline-none focus:border-orange transition-colors placeholder:text-cream/20" />
            </div>
            <div>
              <label className="font-ui text-[9px] font-bold tracking-[.22em] uppercase text-orange/70 block mb-2">Date *</label>
              {s.availableDates?.length > 0 ? (
                <select value={date} onChange={e=>setDate(e.target.value)}
                  className="w-full bg-[#08060F] border border-white/10 text-cream font-ui text-[14px] px-4 py-3.5 outline-none focus:border-orange transition-colors">
                  <option value="">Select date...</option>
                  {s.availableDates.map(d => <option key={d} value={d}>{new Date(d+'T12:00:00').toLocaleDateString('en-US',{weekday:'short',month:'long',day:'numeric',year:'numeric'})}</option>)}
                </select>
              ) : (
                <input type="date" value={date} onChange={e=>setDate(e.target.value)}
                  className="w-full bg-white/[0.04] border border-white/10 text-cream font-ui text-[14px] px-4 py-3.5 outline-none focus:border-orange transition-colors" />
              )}
            </div>
            <div>
              <label className="font-ui text-[9px] font-bold tracking-[.22em] uppercase text-orange/70 block mb-2">Time *</label>
              <select value={time} onChange={e=>setTime(e.target.value)}
                className="w-full bg-[#08060F] border border-white/10 text-cream font-ui text-[14px] px-4 py-3.5 outline-none focus:border-orange transition-colors">
                <option value="">Select...</option>
                {s.availableTimes?.map(t => <option key={t}>{t}</option>)}
              </select>
            </div>
          </div>

          <div className="mb-5">
            <label className="font-ui text-[9px] font-bold tracking-[.22em] uppercase text-orange/70 block mb-2">Party Size *</label>
            <select value={guests} onChange={e=>setGuests(e.target.value)}
              className="w-full bg-[#08060F] border border-white/10 text-cream font-ui text-[14px] px-4 py-3.5 outline-none focus:border-orange transition-colors">
              <option value="">Select guests...</option>
              {Array.from({length:20},(_,i)=>i+1).map(n=><option key={n}>{n} {n===1?'Guest':'Guests'}</option>)}
              <option>20+ Guests</option>
            </select>
          </div>

          {/* Add-ons */}
          {s.variables?.length > 0 && (
            <div className="mb-5">
              <label className="font-ui text-[9px] font-bold tracking-[.22em] uppercase text-orange/70 block mb-3">Add-Ons (Optional)</label>
              <div className="flex flex-col gap-2">
                {s.variables.map(v => (
                  <label key={v.name} className="flex items-center justify-between border border-white/[0.07] px-4 py-3 cursor-pointer hover:border-orange/30 transition-colors" style={{ background: 'rgba(255,255,255,0.03)' }}>
                    <div className="flex items-center gap-3">
                      <input type="checkbox" checked={!!addOns[v.name]} onChange={e=>setAddOns(a=>({...a,[v.name]:e.target.checked}))}
                        className="w-4 h-4 accent-orange" />
                      <div>
                        <div className="font-cond text-[16px] font-bold text-white uppercase">{v.name}</div>
                        {v.description && <div className="text-[11px] text-cream/45">{v.description}</div>}
                      </div>
                    </div>
                    <div className="font-display text-[22px] text-orange">+${v.price}</div>
                  </label>
                ))}
              </div>
            </div>
          )}

          <div className="mb-5">
            <label className="font-ui text-[9px] font-bold tracking-[.22em] uppercase text-orange/70 block mb-2">Special Instructions</label>
            <textarea value={notes} onChange={e=>setNotes(e.target.value)} rows={3}
              placeholder="Allergies, accessibility needs, special occasions, etc."
              className="w-full bg-white/[0.04] border border-white/10 text-cream font-ui text-[14px] px-4 py-3.5 outline-none focus:border-orange transition-colors placeholder:text-cream/20 resize-y" />
          </div>

          {/* Total + pay */}
          <div className="border border-orange/20 px-6 py-5 mb-5 flex items-center justify-between" style={{ background: 'rgba(245,101,32,0.05)' }}>
            <div>
              <div className="font-ui text-[10px] font-bold tracking-[.2em] uppercase text-orange/60 mb-1">Total</div>
              <div className="text-[13px] text-cream/50">
                Base ${s.price}{addOnTotal > 0 && ` + Add-ons $${addOnTotal}`}
              </div>
            </div>
            <div className="font-display text-[48px] text-orange leading-none">${total}</div>
          </div>

          <button
            className={`snipcart-add-item w-full font-ui text-[13px] font-bold tracking-[.2em] uppercase py-4 transition-all duration-200 ${!canSubmit ? 'opacity-40 cursor-not-allowed border border-orange/30 text-orange bg-transparent' : added ? 'bg-orange/20 border border-orange text-orange' : 'bg-orange text-black hover:bg-white'}`}
            disabled={!canSubmit}
            data-item-id={`table-res-${Date.now()}`}
            data-item-price={total}
            data-item-url="/reserve"
            data-item-name="Table Reservation — itsurwiener"
            data-item-description={itemDescription}
            data-item-max-quantity={s.quantity || undefined}
            onClick={() => { if (canSubmit) { setAdded(true); setTimeout(()=>setAdded(false), 3000) } }}
          >
            {!canSubmit ? 'Fill in all required fields' : added ? `✓ Added to Cart — Complete Checkout to Confirm` : `Reserve Now — $${total}`}
          </button>

          {added && s.confirmationMessage && (
            <div className="mt-4 border border-orange/30 px-5 py-4 text-center" style={{ background: 'rgba(245,101,32,0.06)' }}>
              <p className="text-[14px] text-orange font-bold">{s.confirmationMessage}</p>
              <p className="text-[12px] text-cream/45 mt-1">Complete checkout above to finalize your reservation.</p>
            </div>
          )}

        </motion.div>
      </section>
      <PageCTA />
    </div>
  )
}
