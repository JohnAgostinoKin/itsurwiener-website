import { useState } from 'react'
import PageCTA from '@components/PageCTA'
import { motion } from 'framer-motion'

const inView = (delay = 0) => ({
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] }
})

const eventTypes = [
  { icon: '🏢', label: 'Corporate & Company Events' },
  { icon: '🎓', label: 'Alumni Gatherings' },
  { icon: '🎉', label: 'Birthday & Milestone Parties' },
  { icon: '🏈', label: 'Game Day Group Reservations' },
  { icon: '🎸', label: 'Concerts & Live Events' },
  { icon: '🔒', label: 'Full Venue Buyouts' },
]

export default function BookEvent() {
  const [submitted, setSubmitted] = useState(false)
  const [form, setForm] = useState({
    name: '', email: '', phone: '', date: '', guests: '', type: '', message: ''
  })
  const set = (k) => (e) => setForm(f => ({ ...f, [k]: e.target.value }))

  const handleSubmit = (e) => {
    e.preventDefault()
    const body = `
Private Event Inquiry

Name: ${form.name}
Email: ${form.email}
Phone: ${form.phone}
Event Date: ${form.date}
Guest Count: ${form.guests}
Event Type: ${form.type}

Message:
${form.message}
    `.trim()
    window.location.href = `mailto:info@itsurwiener.com?subject=Private Event Inquiry — ${form.type || 'New Inquiry'}&body=${encodeURIComponent(body)}`
    setSubmitted(true)
  }

  return (
    <div className="bg-[#04030A] min-h-screen">
      <div className="relative pt-32 pb-16 px-[5vw] overflow-hidden">
        <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg,#0e0800,#04030A,#0e0800)' }} />
        <div className="absolute inset-0 opacity-5" style={{ backgroundImage: 'repeating-linear-gradient(45deg,transparent,transparent 40px,rgba(245,101,32,0.4) 40px,rgba(245,101,32,0.4) 41px)' }} />
        <div className="relative z-[1]">
          <div className="flex items-center gap-3 font-ui text-[13px] font-bold tracking-[.28em] uppercase text-orange mb-4">
            <span className="w-8 h-0.5 bg-orange" />Private Events
          </div>
          <h1 className="font-display text-[clamp(56px,10vw,130px)] leading-[.85] text-white mb-4">
            Your Night.<br /><span className="text-orange">Our Stage.</span>
          </h1>
          <p className="font-cond text-[clamp(16px,2vw,22px)] text-cream/55 max-w-[600px] tracking-wide">
            From game day group reservations to full venue buyouts — itsurwiener hosts events that need a venue with real range.
          </p>
        </div>
      </div>

      <section className="px-[5vw] py-8 max-w-[1000px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">

          {/* Event types */}
          <motion.div {...inView(0)}>
            <div className="font-ui text-[11px] font-bold tracking-[.22em] uppercase text-orange mb-5">What We Host</div>
            <div className="flex flex-col gap-0 border border-orange/10">
              {eventTypes.map(({ icon, label }) => (
                <div key={label} className="flex items-center gap-4 px-5 py-4 border-b border-orange/[0.06] last:border-b-0 hover:bg-orange/[0.04] transition-colors duration-200 group relative">
                  <div className="absolute left-0 top-0 w-0 h-full bg-orange transition-all duration-300 group-hover:w-[3px]" />
                  <span className="text-[18px]">{icon}</span>
                  <span className="font-cond text-[16px] font-bold uppercase tracking-wide text-cream">{label}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Form */}
          <motion.div {...inView(0.1)}>
            <div className="font-ui text-[11px] font-bold tracking-[.22em] uppercase text-orange mb-5">Start Your Event</div>
            {submitted ? (
              <div className="text-center py-16 border border-orange/20" style={{ background: 'rgba(245,101,32,0.04)' }}>
                <div className="font-display text-[clamp(32px,5vw,56px)] text-orange mb-3">We'll Be In Touch!</div>
                <p className="text-cream/55 text-[14px]">Your inquiry has been sent. We'll get back to you shortly.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-4 border border-orange/15 p-6 md:p-8" style={{ background: 'rgba(245,101,32,0.03)' }}>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="font-ui text-[9px] font-bold tracking-[.22em] uppercase text-orange/60 block mb-2">Name *</label>
                    <input required value={form.name} onChange={set('name')} placeholder="Your name"
                      className="w-full bg-orange/[0.04] border border-orange/12 text-cream font-ui text-[14px] px-4 py-3 outline-none focus:border-orange transition-colors placeholder:text-cream/20" />
                  </div>
                  <div>
                    <label className="font-ui text-[9px] font-bold tracking-[.22em] uppercase text-orange/60 block mb-2">Phone</label>
                    <input value={form.phone} onChange={set('phone')} placeholder="(864) 000-0000" type="tel"
                      className="w-full bg-orange/[0.04] border border-orange/12 text-cream font-ui text-[14px] px-4 py-3 outline-none focus:border-orange transition-colors placeholder:text-cream/20" />
                  </div>
                </div>
                <div>
                  <label className="font-ui text-[9px] font-bold tracking-[.22em] uppercase text-orange/60 block mb-2">Email *</label>
                  <input required type="email" value={form.email} onChange={set('email')} placeholder="your@email.com"
                    className="w-full bg-orange/[0.04] border border-orange/12 text-cream font-ui text-[14px] px-4 py-3 outline-none focus:border-orange transition-colors placeholder:text-cream/20" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="font-ui text-[9px] font-bold tracking-[.22em] uppercase text-orange/60 block mb-2">Event Date</label>
                    <input type="date" value={form.date} onChange={set('date')}
                      className="w-full bg-orange/[0.04] border border-orange/12 text-cream font-ui text-[14px] px-4 py-3 outline-none focus:border-orange transition-colors" />
                  </div>
                  <div>
                    <label className="font-ui text-[9px] font-bold tracking-[.22em] uppercase text-orange/60 block mb-2">Guest Count</label>
                    <select value={form.guests} onChange={set('guests')}
                      className="w-full bg-[#08060F] border border-orange/12 text-cream font-ui text-[14px] px-4 py-3 outline-none focus:border-orange transition-colors">
                      <option value="">Estimate</option>
                      <option>Under 25</option><option>25–75</option><option>75–150</option><option>150–300</option><option>300+</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="font-ui text-[9px] font-bold tracking-[.22em] uppercase text-orange/60 block mb-2">Event Type</label>
                  <select value={form.type} onChange={set('type')}
                    className="w-full bg-[#08060F] border border-orange/12 text-cream font-ui text-[14px] px-4 py-3 outline-none focus:border-orange transition-colors">
                    <option value="">Select type...</option>
                    {eventTypes.map(({ label }) => <option key={label}>{label}</option>)}
                  </select>
                </div>
                <div>
                  <label className="font-ui text-[9px] font-bold tracking-[.22em] uppercase text-orange/60 block mb-2">Tell Us About Your Event</label>
                  <textarea value={form.message} onChange={set('message')} className="w-full bg-orange/[0.04] border border-orange/12 text-cream font-ui text-[14px] px-4 py-3 outline-none focus:border-orange transition-colors placeholder:text-cream/20 h-20 resize-y"
                    placeholder="What are you planning? We'll make it happen." />
                </div>
                <button type="submit"
                  className="w-full bg-orange text-black font-ui text-[13px] font-bold tracking-[.2em] uppercase py-4 border-0 hover:bg-white transition-colors duration-200 clip-angled">
                  Send Inquiry →
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </section>
      <PageCTA />
    </div>
  )
}
