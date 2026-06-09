import { useState } from 'react'
import { motion } from 'framer-motion'

const inView = (delay = 0) => ({
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] }
})

export default function VipReservation() {
  const [submitted, setSubmitted] = useState(false)
  const [form, setForm] = useState({
    name: '', email: '', phone: '', date: '', guests: '', occasion: '', message: ''
  })
  const set = (k) => (e) => setForm(f => ({ ...f, [k]: e.target.value }))

  const handleSubmit = (e) => {
    e.preventDefault()
    const body = `
VIP Reservation Request

Name: ${form.name}
Email: ${form.email}
Phone: ${form.phone}
Event Date: ${form.date}
Guest Count: ${form.guests}
Occasion: ${form.occasion}

Message:
${form.message}
    `.trim()
    window.location.href = `mailto:info@itsurwiener.com?subject=VIP Section Reservation Request&body=${encodeURIComponent(body)}`
    setSubmitted(true)
  }

  return (
    <div className="bg-[#04030A] min-h-screen">
      <div className="relative pt-32 pb-16 px-[5vw] overflow-hidden">
        <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg,#08002a,#04030A,#08002a)' }} />
        <div className="absolute inset-0 opacity-5" style={{ backgroundImage: 'repeating-linear-gradient(45deg,transparent,transparent 40px,rgba(157,78,221,0.5) 40px,rgba(157,78,221,0.5) 41px)' }} />
        <div className="relative z-[1]">
          <div className="flex items-center gap-3 font-ui text-[13px] font-bold tracking-[.28em] uppercase text-purple-bright mb-4">
            <span className="w-8 h-0.5 bg-purple-bright" />The Basement
          </div>
          <h1 className="font-display text-[clamp(56px,10vw,130px)] leading-[.85] text-white mb-4">
            Reserve<br /><span className="text-purple-bright">VIP</span>
          </h1>
          <p className="font-cond text-[clamp(16px,2vw,24px)] text-cream/55 max-w-[600px] tracking-wide">
            Private bartender, reserved seating, bottle service. Fill out the form and we'll be in touch to confirm your reservation.
          </p>
        </div>
      </div>

      <section className="px-[5vw] py-16 max-w-[760px] mx-auto">
        {submitted ? (
          <motion.div {...inView(0)} className="text-center py-20 border border-purple-bright/20" style={{ background: 'rgba(157,78,221,0.06)' }}>
            <div className="font-display text-[clamp(36px,5vw,64px)] text-purple-bright mb-4">Request Sent!</div>
            <p className="text-cream/65 text-[15px] max-w-[400px] mx-auto">We'll reach out shortly to confirm your VIP reservation.</p>
          </motion.div>
        ) : (
          <motion.div {...inView(0)} className="border border-purple-bright/15 p-8 md:p-12" style={{ background: 'rgba(157,78,221,0.04)' }}>
            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="font-ui text-[9px] font-bold tracking-[.22em] uppercase text-purple-bright/70 block mb-2">Name *</label>
                  <input required value={form.name} onChange={set('name')} placeholder="Full name"
                    className="w-full bg-white/[0.04] border border-white/10 text-cream font-ui text-[14px] px-4 py-3.5 outline-none focus:border-purple-bright transition-colors placeholder:text-cream/20" />
                </div>
                <div>
                  <label className="font-ui text-[9px] font-bold tracking-[.22em] uppercase text-purple-bright/70 block mb-2">Email *</label>
                  <input required type="email" value={form.email} onChange={set('email')} placeholder="your@email.com"
                    className="w-full bg-white/[0.04] border border-white/10 text-cream font-ui text-[14px] px-4 py-3.5 outline-none focus:border-purple-bright transition-colors placeholder:text-cream/20" />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="font-ui text-[9px] font-bold tracking-[.22em] uppercase text-purple-bright/70 block mb-2">Phone *</label>
                  <input required type="tel" value={form.phone} onChange={set('phone')} placeholder="(000) 000-0000"
                    className="w-full bg-white/[0.04] border border-white/10 text-cream font-ui text-[14px] px-4 py-3.5 outline-none focus:border-purple-bright transition-colors placeholder:text-cream/20" />
                </div>
                <div>
                  <label className="font-ui text-[9px] font-bold tracking-[.22em] uppercase text-purple-bright/70 block mb-2">Date *</label>
                  <input required type="date" value={form.date} onChange={set('date')}
                    className="w-full bg-white/[0.04] border border-white/10 text-cream font-ui text-[14px] px-4 py-3.5 outline-none focus:border-purple-bright transition-colors" />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="font-ui text-[9px] font-bold tracking-[.22em] uppercase text-purple-bright/70 block mb-2">Guest Count *</label>
                  <select required value={form.guests} onChange={set('guests')}
                    className="w-full bg-[#08060F] border border-white/10 text-cream font-ui text-[14px] px-4 py-3.5 outline-none focus:border-purple-bright transition-colors">
                    <option value="">Select...</option>
                    <option>Up to 10</option><option>10–20</option><option>20–30</option><option>30+</option>
                  </select>
                </div>
                <div>
                  <label className="font-ui text-[9px] font-bold tracking-[.22em] uppercase text-purple-bright/70 block mb-2">Occasion</label>
                  <select value={form.occasion} onChange={set('occasion')}
                    className="w-full bg-[#08060F] border border-white/10 text-cream font-ui text-[14px] px-4 py-3.5 outline-none focus:border-purple-bright transition-colors">
                    <option value="">Select...</option>
                    <option>Birthday Party</option><option>Bachelor/Bachelorette</option><option>Corporate Event</option><option>Anniversary</option><option>Other</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="font-ui text-[9px] font-bold tracking-[.22em] uppercase text-purple-bright/70 block mb-2">Additional Info</label>
                <textarea value={form.message} onChange={set('message')} rows={4} placeholder="Anything else we should know?"
                  className="w-full bg-white/[0.04] border border-white/10 text-cream font-ui text-[14px] px-4 py-3.5 outline-none focus:border-purple-bright transition-colors placeholder:text-cream/20 resize-y" />
              </div>
              <button type="submit"
                className="w-full font-ui text-[13px] font-bold tracking-[.2em] uppercase py-4 bg-purple-bright text-white hover:bg-orange hover:text-black transition-colors duration-200 clip-angled">
                Submit Reservation Request →
              </button>
            </form>
          </motion.div>
        )}
      </section>
    </div>
  )
}
