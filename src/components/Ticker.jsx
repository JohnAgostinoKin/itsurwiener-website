// Ticker.jsx — reusable scrolling ticker band
// Props:
//   items    : string[]    — items to repeat
//   variant  : 'orange' | 'dark' | 'hype'
//   reverse  : boolean     — direction
//   speed    : number      — animation duration in seconds (default 22)

export default function Ticker({ items = [], variant = 'orange', reverse = false, speed = 22 }) {
  const doubled = [...items, ...items]   // seamless loop

  const wrapClass = {
    orange:        'bg-orange overflow-hidden py-[18px]',
    'orange-white':'bg-orange overflow-hidden py-[22px]',
    purple:        'bg-purple-bright overflow-hidden py-[22px]',
    dark:          'bg-black-3 border-y border-orange/10 overflow-hidden py-[18px]',
    hype:          'bg-orange overflow-hidden',
  }[variant]

  const itemClass = {
    orange:        'font-display text-[22px] tracking-[.08em] text-black',
    'orange-white':'font-display text-[24px] tracking-[.06em] text-white',
    purple:        'font-display text-[26px] tracking-[.06em] text-white',
    dark:          'font-display text-[22px] tracking-[.08em] text-orange/70',
    hype:          'font-display text-[clamp(60px,10vw,130px)] text-black leading-none',
  }[variant]

  const dot = {
    orange:        <span className="text-[12px] opacity-50 mx-8">✶</span>,
    'orange-white':<span className="text-[12px] opacity-60 mx-8 text-white">✦</span>,
    purple:        <span className="text-[14px] opacity-60 mx-8">✦</span>,
    dark:          <span className="text-[12px] opacity-50 mx-8">✶</span>,
    hype:          <span className="w-4 h-4 rounded-full bg-black flex-shrink-0 mx-10" />,
  }[variant]

  return (
    <div className={wrapClass}>
      <div
        className="inline-flex whitespace-nowrap"
        style={{
          animation: `ticker ${speed}s linear infinite ${reverse ? 'reverse' : ''}`,
        }}
      >
        {doubled.map((item, i) => (
          <span key={i} className={`${itemClass} inline-flex items-center px-10`}>
            {item}
            {dot}
          </span>
        ))}
      </div>
    </div>
  )
}
