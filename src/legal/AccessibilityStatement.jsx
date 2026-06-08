import { motion } from 'framer-motion'

const inView = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] }
})

export default function AccessibilityStatement() {
  return (
    <div className="bg-[#04030A] min-h-screen px-[5vw] py-32 max-w-[860px] mx-auto">
      <motion.div {...inView(0)}>
        <div className="font-ui text-[11px] font-bold tracking-[.28em] uppercase text-orange mb-4">Legal</div>
        <h1 className="font-display text-[clamp(48px,8vw,96px)] leading-none text-white mb-4">Accessibility<br /><span className="text-orange">Statement</span></h1>
        <p className="font-ui text-[12px] text-cream/40 mb-12">Last updated: June 2026</p>
      </motion.div>
      <motion.div {...inView(0.1)}>
        {[
          { h: 'Our Commitment', p: 'Agostino Industries LLC d/b/a itsurwiener is committed to ensuring digital accessibility for people with disabilities. We continually improve the user experience for everyone and apply relevant accessibility standards.' },
          { h: 'Conformance Status', p: 'We aim to conform to the Web Content Accessibility Guidelines (WCAG) 2.1 Level AA. These guidelines explain how to make web content more accessible to people with disabilities.' },
          { h: 'Physical Accessibility', p: 'Our venue at 101 Keith Street, Clemson SC is accessible to guests with mobility impairments. If you have specific accessibility needs or questions about our physical venue, please contact us in advance so we can best accommodate you.' },
          { h: 'Known Limitations', p: 'While we strive for full accessibility, some areas of our website may not yet fully conform to accessibility standards. We are actively working to identify and resolve these issues.' },
          { h: 'Feedback', p: 'We welcome your feedback on the accessibility of our website and venue. If you experience any barriers, please contact us at info@itsurwiener.com or (864) 722-5001. We aim to respond to accessibility feedback within 2 business days.' },
          { h: 'Formal Complaints', p: 'If you are not satisfied with our response, you may contact the relevant authority in your jurisdiction regarding accessibility complaints.' },
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
