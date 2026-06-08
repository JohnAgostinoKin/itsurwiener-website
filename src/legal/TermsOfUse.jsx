import { motion } from 'framer-motion'

const inView = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] }
})

export default function TermsOfUse() {
  return (
    <div className="bg-[#04030A] min-h-screen px-[5vw] py-32 max-w-[860px] mx-auto">
      <motion.div {...inView(0)}>
        <div className="font-ui text-[11px] font-bold tracking-[.28em] uppercase text-orange mb-4">Legal</div>
        <h1 className="font-display text-[clamp(48px,8vw,96px)] leading-none text-white mb-4">Terms<br /><span className="text-orange">of Use</span></h1>
        <p className="font-ui text-[12px] text-cream/40 mb-12">Last updated: June 2026</p>
      </motion.div>
      <motion.div {...inView(0.1)}>
        {[
          { h: 'Acceptance of Terms', p: 'By accessing and using the itsurwiener website, you accept and agree to be bound by these Terms of Use. If you do not agree, please do not use our website.' },
          { h: 'Use of Website', p: 'You agree to use this website only for lawful purposes. You may not use our site in any way that could damage, disable, or impair the site or interfere with any other party\'s use of the site.' },
          { h: 'Intellectual Property', p: 'All content on this website, including text, graphics, logos, images, and software, is the property of Agostino Industries LLC d/b/a itsurwiener and is protected by applicable intellectual property laws.' },
          { h: 'Online Purchases', p: 'By placing an order through our website, you represent that you are of legal age and that all information you provide is accurate. We reserve the right to refuse or cancel any order at our discretion.' },
          { h: 'Age Requirement', p: 'Our venue serves alcohol. You must be 21 years of age or older to purchase alcoholic beverages. Some events may have additional age requirements as noted in the event description.' },
          { h: 'Disclaimer of Warranties', p: 'This website is provided on an "as is" basis without warranties of any kind. We do not warrant that the site will be uninterrupted or error-free.' },
          { h: 'Limitation of Liability', p: 'Agostino Industries LLC shall not be liable for any indirect, incidental, or consequential damages arising from your use of this website or our services.' },
          { h: 'Governing Law', p: 'These Terms shall be governed by the laws of the State of South Carolina, without regard to its conflict of law provisions.' },
          { h: 'Contact', p: 'Questions about these Terms may be directed to info@itsurwiener.com.' },
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
