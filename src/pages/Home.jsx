// Home.jsx — main landing page
// Built section by section. Start here then extract to components.
import Ticker from '@components/Ticker'

export default function Home() {
  return (
    <div className="bg-[#04030A]">
      {/* Hero placeholder — build next */}
      <section className="min-h-screen flex items-center justify-center text-center px-[5vw]">
        <div>
          <p className="font-ui text-[11px] font-bold tracking-[.28em] uppercase text-orange mb-6">Clemson, SC · The Destination</p>
          <h1 className="font-display text-[clamp(80px,18vw,260px)] leading-[.85] text-white mb-4">
            its<span className="animate-[logoFlash_3s_infinite]">ur</span>wiener
          </h1>
          <p className="font-cond text-[clamp(16px,2.5vw,28px)] italic text-cream/60 tracking-wide">
            Sports Bar · The Basement · Outdoor LED Venues · The Litcher®
          </p>
        </div>
      </section>

      <Ticker
        items={['The Litcher®','60,000 Served','Game Day HQ','The Basement','Outdoor LED Wall','Damn Good Beer','5 Venues','Clemson\'s Night']}
        variant="orange"
      />

      {/* More sections — add one at a time */}
    </div>
  )
}
