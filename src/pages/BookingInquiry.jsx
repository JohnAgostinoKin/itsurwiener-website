import { useState } from 'react'
import { motion } from 'framer-motion'

const inView = (delay = 0) => ({
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-60px' },
  transition: { duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] }
})

export default function BookingInquiry() {
  const [submitted, setSubmitted] = useState(false)
  const [form, setForm] = useState({
    name: '', role: '', email: '', phone: '',
    bandName: '', genre: '', pieces: '', links: '', message: ''
  })

  const set = (k) => (e) => setForm(f => ({ ...f, [k]: e.target.value }))

  const handleSubmit = (e) => {
    e.preventDefault()
    const body = `
Name: ${form.name}
Role: ${form.role}
Email: ${form.email}
Phone: ${form.phone}
Band / Artist: ${form.bandName}
Genre: ${form.genre}
Pieces: ${form.pieces}
Website / Social / Streaming: ${form.links}

Message:
${form.message}
    `.trim()

    window.location.href = `mailto:info@itsurwiener.com?subject=Booking Inquiry — ${encodeURIComponent(form.bandName || 'New Inquiry')}&body=${encodeURIComponent(body)}`
    setSubmitted(true)
  }

  return (
    <div className="bg-[#04030A] min-h-screen">

      {/* Hero */}
      <div className="relative pt-32 pb-16 px-[5vw] overflow-hidden">
        <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg,#08002a,#04030A,#08002a)' }} />
        <div className="absolute inset-0 opacity-5" style={{ backgroundImage: 'repeating-linear-gradient(45deg,transparent,transparent 40px,rgba(157,78,221,0.5) 40px,rgba(157,78,221,0.5) 41px)' }} />
        <div className="relative z-[1]">
          <div className="flex items-center gap-3 font-ui text-[13px] font-bold tracking-[.28em] uppercase text-purple-bright mb-4">
            <span className="w-8 h-0.5 bg-purple-bright" />The Basement
          </div>
          <h1 className="font-display text-[clamp(56px,10vw,140px)] leading-[.85] text-white mb-4">
            Booking<br /><span className="text-purple-bright">Inquiry</span>
          </h1>
          <p className="font-cond text-[clamp(16px,2vw,24px)] text-cream/55 max-w-[600px] tracking-wide">
            Interested in performing at The Basement? Fill out the form below and we'll be in touch.
          </p>
        </div>
      </div>

      {/* Form */}
      <section className="px-[5vw] py-16 max-w-[760px] mx-auto">
        {submitted ? (
          <motion.div {...inView(0)} className="text-center py-20 border border-purple-bright/20" style={{ background: 'rgba(157,78,221,0.06)' }}>
            <div className="font-display text-[clamp(40px,6vw,72px)] text-purple-bright mb-4">You're All Set!</div>
            <p className="text-cream/65 text-[15px] max-w-[400px] mx-auto">Your inquiry has been sent to info@itsurwiener.com. We'll get back to you shortly.</p>
          </motion.div>
        ) : (
          <motion.div {...inView(0)} className="border border-white/[0.07] p-8 md:p-12" style={{ background: 'rgba(255,255,255,0.03)' }}>
            <form onSubmit={handleSubmit} className="flex flex-col gap-5">

              {/* Name + Role */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="font-ui text-[9px] font-bold tracking-[.22em] uppercase text-purple-bright/70 block mb-2">Your Name *</label>
                  <input required value={form.name} onChange={set('name')}
                    className="w-full bg-white/[0.04] border border-white/10 text-cream font-ui text-[14px] px-4 py-3.5 outline-none focus:border-purple-bright transition-colors placeholder:text-cream/20"
                    placeholder="Full name" />
                </div>
                <div>
                  <label className="font-ui text-[9px] font-bold tracking-[.22em] uppercase text-purple-bright/70 block mb-2">Role *</label>
                  <select required value={form.role} onChange={set('role')}
                    className="w-full bg-[#08060F] border border-white/10 text-cream font-ui text-[14px] px-4 py-3.5 outline-none focus:border-purple-bright transition-colors">
                    <option value="">Select role...</option>
                    <option value="Artist">Artist</option>
                    <option value="Agent">Agent</option>
                    <option value="Promoter">Promoter</option>
                    <option value="Manager">Manager</option>
                    <option value="Band Member">Band Member</option>
                  </select>
                </div>
              </div>

              {/* Email + Phone */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="font-ui text-[9px] font-bold tracking-[.22em] uppercase text-purple-bright/70 block mb-2">Email *</label>
                  <input required type="email" value={form.email} onChange={set('email')}
                    className="w-full bg-white/[0.04] border border-white/10 text-cream font-ui text-[14px] px-4 py-3.5 outline-none focus:border-purple-bright transition-colors placeholder:text-cream/20"
                    placeholder="your@email.com" />
                </div>
                <div>
                  <label className="font-ui text-[9px] font-bold tracking-[.22em] uppercase text-purple-bright/70 block mb-2">Phone</label>
                  <input type="tel" value={form.phone} onChange={set('phone')}
                    className="w-full bg-white/[0.04] border border-white/10 text-cream font-ui text-[14px] px-4 py-3.5 outline-none focus:border-purple-bright transition-colors placeholder:text-cream/20"
                    placeholder="(000) 000-0000" />
                </div>
              </div>

              {/* Band + Genre */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="font-ui text-[9px] font-bold tracking-[.22em] uppercase text-purple-bright/70 block mb-2">Band / Artist Name *</label>
                  <input required value={form.bandName} onChange={set('bandName')}
                    className="w-full bg-white/[0.04] border border-white/10 text-cream font-ui text-[14px] px-4 py-3.5 outline-none focus:border-purple-bright transition-colors placeholder:text-cream/20"
                    placeholder="Stage name or band name" />
                </div>
                <div>
                  <label className="font-ui text-[9px] font-bold tracking-[.22em] uppercase text-purple-bright/70 block mb-2">Genre</label>
                  <input value={form.genre} onChange={set('genre')}
                    className="w-full bg-white/[0.04] border border-white/10 text-cream font-ui text-[14px] px-4 py-3.5 outline-none focus:border-purple-bright transition-colors placeholder:text-cream/20"
                    placeholder="e.g. Rock, Country, Hip-Hop, DJ" />
                </div>
              </div>

              {/* Pieces + Links */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="font-ui text-[9px] font-bold tracking-[.22em] uppercase text-purple-bright/70 block mb-2">Pieces</label>
                  <input value={form.pieces} onChange={set('pieces')}
                    className="w-full bg-white/[0.04] border border-white/10 text-cream font-ui text-[14px] px-4 py-3.5 outline-none focus:border-purple-bright transition-colors placeholder:text-cream/20"
                    placeholder="e.g. 4-piece band, solo, duo" />
                </div>
                <div>
                  <label className="font-ui text-[9px] font-bold tracking-[.22em] uppercase text-purple-bright/70 block mb-2">Website / Social / Streaming</label>
                  <input value={form.links} onChange={set('links')}
                    className="w-full bg-white/[0.04] border border-white/10 text-cream font-ui text-[14px] px-4 py-3.5 outline-none focus:border-purple-bright transition-colors placeholder:text-cream/20"
                    placeholder="Links to your music" />
                </div>
              </div>

              {/* Message */}
              <div>
                <label className="font-ui text-[9px] font-bold tracking-[.22em] uppercase text-purple-bright/70 block mb-2">Message</label>
                <textarea value={form.message} onChange={set('message')} rows={5}
                  className="w-full bg-white/[0.04] border border-white/10 text-cream font-ui text-[14px] px-4 py-3.5 outline-none focus:border-purple-bright transition-colors placeholder:text-cream/20 resize-y"
                  placeholder="Tell us about yourself, available dates, any additional info..." />
              </div>

              <button type="submit"
                className="w-full font-ui text-[13px] font-bold tracking-[.2em] uppercase py-4 bg-purple-bright text-white hover:bg-orange hover:text-black transition-colors duration-200 clip-angled">
                Send Booking Inquiry →
              </button>

            </form>
          </motion.div>
        )}
      </section>

    </div>
  )
}
