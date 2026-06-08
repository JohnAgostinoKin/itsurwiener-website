import { motion } from 'framer-motion'

const inView = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] }
})

export default function RefundCancellationPolicy() {
  return (
    <div className="bg-[#04030A] min-h-screen px-[5vw] py-32 max-w-[860px] mx-auto">
      <motion.div {...inView(0)}>
        <div className="font-ui text-[11px] font-bold tracking-[.28em] uppercase text-orange mb-4">Legal</div>
        <h1 className="font-display text-[clamp(48px,8vw,96px)] leading-none text-white mb-4">Refund &<br /><span className="text-orange">Cancellation</span></h1>
        <p className="font-ui text-[12px] text-cream/40 mb-12">Last updated: June 2026</p>
      </motion.div>
      <motion.div {...inView(0.1)}>
        {[
          { h: 'Merchandise', p: 'Unused merchandise in original condition may be returned within 30 days of purchase for a full refund or exchange. Items must be unworn, unwashed, and in original packaging. Sale items are final sale and not eligible for return.' },
          { h: 'Gift Cards', p: 'Gift cards are non-refundable and cannot be exchanged for cash. Lost or stolen gift cards cannot be replaced. Gift cards do not expire.' },
          { h: 'Event Tickets', p: 'All ticket sales are final. No refunds will be issued for purchased tickets. In the event that itsurwiener cancels an event, ticket holders will be offered a full refund or credit toward a future event.' },
          { h: 'Event Passes (LineLeap)', p: 'Passes purchased through LineLeap are subject to LineLeap\'s refund and cancellation policy. Please review their terms at lineleap.com.' },
          { h: 'Private Event Deposits', p: 'Deposits for private events and venue bookings are non-refundable. If you cancel a private event booking with more than 14 days notice, remaining payments will be refunded. Cancellations within 14 days of the event date are non-refundable.' },
          { h: 'How to Request a Refund', p: 'To request a refund for eligible merchandise, contact us at info@itsurwiener.com with your order number and reason for return. We will respond within 2 business days.' },
          { h: 'Processing Time', p: 'Approved refunds will be processed to your original payment method within 5-10 business days.' },
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
