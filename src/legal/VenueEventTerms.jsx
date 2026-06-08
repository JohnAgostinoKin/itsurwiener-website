import { motion } from 'framer-motion'

const inView = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] }
})

export default function VenueEventTerms() {
  return (
    <div className="bg-[#04030A] min-h-screen px-[5vw] py-32 max-w-[860px] mx-auto">
      <motion.div {...inView(0)}>
        <div className="font-ui text-[11px] font-bold tracking-[.28em] uppercase text-orange mb-4">Legal</div>
        <h1 className="font-display text-[clamp(48px,8vw,96px)] leading-none text-white mb-4">Venue &<br /><span className="text-orange">Event Terms</span></h1>
        <p className="font-ui text-[12px] text-cream/40 mb-12">Last updated: June 2026</p>
      </motion.div>
      <motion.div {...inView(0.1)}>
        {[
          { h: 'Entry Requirements', p: 'Valid government-issued photo ID is required for entry to all events. Management reserves the right to refuse entry to any person. Dress code is enforced at management\'s discretion. itsurwiener is a 21+ venue after 9PM unless otherwise stated.' },
          { h: 'Age Policy', p: 'You must be 21 years of age or older to consume alcoholic beverages at our venue. Minors may be permitted during daytime hours at management\'s discretion but must be accompanied by a parent or legal guardian.' },
          { h: 'Code of Conduct', p: 'All guests are expected to behave in a respectful manner. Aggressive behavior, harassment, or disruptive conduct will result in immediate removal from the premises without refund. We reserve the right to remove any guest for any reason.' },
          { h: 'Private Events', p: 'Private event bookings require a signed agreement and deposit. The event organizer is responsible for the conduct of all guests during the private event. itsurwiener reserves the right to end any event where conduct violates our policies.' },
          { h: 'Prohibited Items', p: 'Outside food and beverages, weapons of any kind, illegal substances, and professional recording equipment are prohibited without prior written consent from management.' },
          { h: 'Photography & Video', p: 'By entering our venue, you consent to being photographed or recorded for use in our marketing materials. If you do not wish to be photographed, please notify staff upon entry.' },
          { h: 'Noise & Capacity', p: 'Events are subject to venue capacity limits and local noise ordinances. Management reserves the right to adjust programming to comply with applicable regulations.' },
          { h: 'Liability Waiver', p: 'itsurwiener and Agostino Industries LLC are not liable for any loss, damage, injury, or theft that may occur on the premises. Guests attend events at their own risk.' },
          { h: 'Contact', p: 'For venue and event inquiries, contact us at info@itsurwiener.com or (864) 722-5001.' },
        ].map(({ h, p }) => (
          <div key={h} className="mb-8 pb-8 border-b border-white/[0.06]">
            <h2 className="font-display text-[28px] text-orange mb-3">{h}</h2>
            <p className="text-[15px] text-cream/70 leading-[1.85]">{p}</p>
          </div>
        ))}
      </motion.div>
    </div>
  )
}
