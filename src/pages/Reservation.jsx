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
  const [submitted, setSubmitted] = useState(false)
  const [settings, setSettings] = useState(null)
  const [form, setForm] = useState({
    name: '', email: '', phone: '', date: '', time: '', guests: '', occasion: '', notes: ''
  })
  const set = (k) => (e) => setForm(f => ({ ...f, [k]: e.target.value }))

  useEffect(() => {
    client.fetch(`*[_type == "reservationSettings"][0] {
      depositRequired, depositAmount, depositNote, availableTimes, maxPartySize, note
    }`).then(data => setSettings(data)).catch(() => {})
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault()
    const depositInfo = settings?.depositRequired
      ? `\n\nDEPOSIT REQUIRED: $${settings.depositAmount} — ${settings.depositNote || 'A deposit is required to hold your reservation.'}`
      : ''
    const body = `
Table Reservation Request

Name: ${form.name}
Email: ${form.email}
Phone: ${form.phone}
Date: ${form.date}
Time: ${form.time}
Party Size: ${form.guests}
Occasion: ${form.occasion || 'Not specified'}
Notes: ${form.notes || 'None'}
${depositInfo}
    `.trim()
    window.location.href = `mailto:info@itsurwiener.com?subject=Table Reservation Request — ${form.date}&body=${encodeURIComponent(body)}`
    setSubmitted(true)
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
          <p className="font-cond text-[clamp(16px,2vw,24px)] text-cream/55 max-w-[600px] tracking-wide">
            Secure your spot for game day and special events. Fill out the form and we'll confirm your reservation.
          </p>
        </div>
      </div>

      {settings?.note && (
        <div className="px-[5vw] max-w-[760px] mx-auto pt-4">
          <div className="border border-orange/30 px-5 py-4" style={{ background: 'rgba(245,101,32,0.06)' }}>
            <p className="text-[13px] text-orange font-bold">{settings.note}</p>
          </div>
        </div>
      )}

      {settings?.depositRequired && (
        <div className="px-[5vw] max-w-[760px] mx-auto pt-3">
          <div className="border border-orange/20 px-5 py-4" style={{ background: 'rgba(245,101,32,0.04)' }}>
            <p className="text-[13px] text-cream/70">
              <strong className="text-orange">Deposit Required: ${settings.depositAmount}</strong>
              {settings.depositNote ? ` — ${settings.depositNote}` : ' — A deposit is required to hold your reservation.'}
            </p>
          </div>
        </div>
      )}

      <section className="px-[5vw] py-10 max-w-[760px] mx-auto">
        {submitted ? (
          <motion.div {...inView(0)} className="text-center py-20 border border-orange/20" style={{ background: 'rgba(245,101,32,0.04)' }}>
            <div className="font-display text-[clamp(36px,5vw,64px)] text-orange mb-4">Request Sent!</div>
            <p className="text-cream/65 text-[15px] max-w-[400px] mx-auto">We'll confirm your reservation shortly. See you soon!</p>
          </motion.div>
        ) : (
          <motion.div {...inView(0)} className="border border-orange/15 p-8 md:p-12" style={{ background: 'rgba(245,101,32,0.03)' }}>
            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="font-ui text-[9px] font-bold tracking-[.22em] uppercase text-orange/70 block mb-2">Name *</label>
                  <input required value={form.name} onChange={set('name')} placeholder="Full name"
                    className="w-full bg-white/[0.04] border border-white/10 text-cream font-ui text-[14px] px-4 py-3.5 outline-none focus:border-orange transition-colors placeholder:text-cream/20" />
                </div>
                <div>
                  <label className="font-ui text-[9px] font-bold tracking-[.22em] uppercase text-orange/70 block mb-2">Phone *</label>
                  <input required type="tel" value={form.phone} onChange={set('phone')} placeholder="(000) 000-0000"
                    className="w-full bg-white/[0.04] border border-white/10 text-cream font-ui text-[14px] px-4 py-3.5 outline-none focus:border-orange transition-colors placeholder:text-cream/20" />
                </div>
              </div>
              <div>
                <label className="font-ui text-[9px] font-bold tracking-[.22em] uppercase text-orange/70 block mb-2">Email *</label>
                <input required type="email" value={form.email} onChange={set('email')} placeholder="your@email.com"
                  className="w-full bg-white/[0.04] border border-white/10 text-cream font-ui text-[14px] px-4 py-3.5 outline-none focus:border-orange transition-colors placeholder:text-cream/20" />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="font-ui text-[9px] font-bold tracking-[.22em] uppercase text-orange/70 block mb-2">Date *</label>
                  <input required type="date" value={form.date} onChange={set('date')}
                    className="w-full bg-white/[0.04] border border-white/10 text-cream font-ui text-[14px] px-4 py-3.5 outline-none focus:border-orange transition-colors" />
                </div>
                <div>
                  <label className="font-ui text-[9px] font-bold tracking-[.22em] uppercase text-orange/70 block mb-2">Time *</label>
                  <select required value={form.time} onChange={set('time')}
                    className="w-full bg-[#08060F] border border-white/10 text-cream font-ui text-[14px] px-4 py-3.5 outline-none focus:border-orange transition-colors">
                    <option value="">Select time...</option>
                    {(settings?.availableTimes || ['11:00 AM','12:00 PM','1:00 PM','4:00 PM','5:00 PM','6:00 PM','7:00 PM','8:00 PM']).map(t => (
                      <option key={t}>{t}</option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="font-ui text-[9px] font-bold tracking-[.22em] uppercase text-orange/70 block mb-2">Party Size *</label>
                  <select required value={form.guests} onChange={set('guests')}
                    className="w-full bg-[#08060F] border border-white/10 text-cream font-ui text-[14px] px-4 py-3.5 outline-none focus:border-orange transition-colors">
                    <option value="">Select...</option>
                    {Array.from({length: settings?.maxPartySize || 20}, (_,i) => i+1).map(n => (
                      <option key={n}>{n} {n === 1 ? 'Guest' : 'Guests'}</option>
                    ))}
                    <option>20+ Guests</option>
                  </select>
                </div>
                <div>
                  <label className="font-ui text-[9px] font-bold tracking-[.22em] uppercase text-orange/70 block mb-2">Occasion</label>
                  <select value={form.occasion} onChange={set('occasion')}
                    className="w-full bg-[#08060F] border border-white/10 text-cream font-ui text-[14px] px-4 py-3.5 outline-none focus:border-orange transition-colors">
                    <option value="">Select...</option>
                    <option>Game Day</option><option>Birthday</option><option>Anniversary</option><option>Date Night</option><option>Group Outing</option><option>Other</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="font-ui text-[9px] font-bold tracking-[.22em] uppercase text-orange/70 block mb-2">Notes</label>
                <textarea value={form.notes} onChange={set('notes')} rows={3} placeholder="Special requests, accessibility needs, etc."
                  className="w-full bg-white/[0.04] border border-white/10 text-cream font-ui text-[14px] px-4 py-3.5 outline-none focus:border-orange transition-colors placeholder:text-cream/20 resize-y" />
              </div>
              <button type="submit"
                className="w-full font-ui text-[13px] font-bold tracking-[.2em] uppercase py-4 bg-orange text-black hover:bg-white transition-colors duration-200 clip-angled">
                Request Reservation →
              </button>
            </form>
          </motion.div>
        )}
      </section>
    </div>
  )
}
