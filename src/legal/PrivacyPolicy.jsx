import { motion } from 'framer-motion'

const inView = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] }
})

export default function PrivacyPolicy() {
  return (
    <div className="bg-[#04030A] min-h-screen px-[5vw] py-32 max-w-[860px] mx-auto">
      <motion.div {...inView(0)}>
        <div className="font-ui text-[11px] font-bold tracking-[.28em] uppercase text-orange mb-4">Legal</div>
        <h1 className="font-display text-[clamp(48px,8vw,96px)] leading-none text-white mb-4">Privacy<br /><span className="text-orange">Policy</span></h1>
        <p className="font-ui text-[12px] text-cream/40 mb-12">Last updated: June 2026</p>
      </motion.div>
      <motion.div {...inView(0.1)} className="prose prose-invert max-w-none">
        {[
          { h: 'Information We Collect', p: 'We collect information you provide directly to us, such as when you place an order, make a reservation, sign up for our mailing list, or contact us. This may include your name, email address, phone number, and payment information. We also collect information automatically when you visit our website, including your IP address, browser type, and pages visited.' },
          { h: 'How We Use Your Information', p: 'We use the information we collect to process orders and payments, send transactional and promotional communications, improve our website and services, comply with legal obligations, and respond to your inquiries.' },
          { h: 'Sharing of Information', p: 'We do not sell your personal information. We may share your information with third-party service providers who assist us in operating our website and conducting our business (such as payment processors and email service providers), subject to confidentiality agreements.' },
          { h: 'Payment Information', p: 'All payment transactions are processed through Stripe and Snipcart. We do not store your full credit card information on our servers. Please review their privacy policies for more information.' },
          { h: 'Cookies', p: 'Our website uses cookies to enhance your browsing experience. You may disable cookies through your browser settings, though some features of the site may not function properly as a result.' },
          { h: 'Data Retention', p: 'We retain your personal information for as long as necessary to fulfill the purposes outlined in this policy, unless a longer retention period is required by law.' },
          { h: 'Your Rights', p: 'You have the right to access, correct, or delete your personal information. To make a request, contact us at info@itsurwiener.com.' },
          { h: 'Changes to This Policy', p: 'We may update this Privacy Policy from time to time. We will notify you of significant changes by posting the new policy on this page with an updated date.' },
          { h: 'Contact Us', p: 'If you have questions about this Privacy Policy, contact us at info@itsurwiener.com or (864) 722-5001.' },
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
