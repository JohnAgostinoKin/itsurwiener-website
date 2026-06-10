export default function PageCTA() {
  return (
    <section className="px-[5vw] py-12 border-t border-white/[0.06]" style={{ background: '#04030A' }}>
      <div className="flex gap-3 justify-center flex-wrap">
        <a href="/find-us"
          className="font-ui text-[12px] font-bold tracking-[.18em] uppercase border border-orange/40 text-cream px-8 py-3.5 no-underline hover:border-orange hover:text-orange transition-all duration-200">
          Find Us
        </a>
        <a href="/reserve"
          className="font-ui text-[12px] font-bold tracking-[.18em] uppercase bg-purple-bright text-white px-8 py-3.5 no-underline clip-angled hover:bg-[#B85EFF] transition-colors duration-200">
          Reserve a Table
        </a>
        <a href="/book-event"
          className="font-ui text-[12px] font-bold tracking-[.18em] uppercase bg-orange text-black px-8 py-3.5 no-underline clip-angled hover:bg-white transition-colors duration-200">
          Book an Event
        </a>
      </div>
    </section>
  )
}
