import { useState } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

const inView = (delay = 0) => ({
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-60px' },
  transition: { duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] }
})

const sections = [
  {
    title: 'Popular Litchers', price: '$12', color: '#F56520', badge: null,
    items: [
      { name: 'Electric Lemonade',    desc: 'Vodka, Sprite, Sour, Blue' },
      { name: 'Blue Motorcycle',      desc: 'Vodka, Gin, Rum, Tequila, Triple Sec, Sour, Sprite, Blue' },
      { name: 'John Daly',            desc: 'Vodka, Lemonade, Iced Tea' },
      { name: 'Long Island Iced Tea', desc: 'Vodka, Gin, Rum, Tequila, Triple Sec, Sour, Coke' },
      { name: 'Georgia Peach',        desc: 'Whiskey, Peach, OJ, Grenadine' },
      { name: 'Dirty Shirley',        desc: 'Vodka, Sprite, Grenadine' },
      { name: 'Blue Hawaiian',        desc: 'Rum, Pineapple, Blue' },
      { name: 'Sex on the Beach',     desc: 'Vodka, Peach, OJ, Cranberry' },
      { name: 'Long Beach Iced Tea',  desc: 'Vodka, Gin, Rum, Tequila, Triple Sec, Sour, Cranberry' },
      { name: 'Green Tea',            desc: 'Whiskey, Peach, Sprite, Sour' },
      { name: 'Tequila Sunrise',      desc: 'Tequila, OJ, Grenadine' },
      { name: 'Cosmo',                desc: 'Vodka, Triple Sec, Lime, Cranberry' },
      { name: 'Fuzzy Navel',          desc: 'Vodka, Peach, OJ' },
      { name: 'Melon Ball',           desc: 'Vodka, Melon, OJ' },
      { name: 'Blue Lagoon',          desc: 'Vodka, Lemonade, Blue' },
      { name: 'Purple Gatorade',      desc: 'Vodka, Sprite, Grenadine, Blue' },
      { name: 'Kansas City Ice Water',desc: 'Vodka, Gin, Triple Sec, Lime, Sprite' },
      { name: 'Bay Breeze',           desc: 'Vodka, Cranberry, Pineapple' },
      { name: 'Madras',               desc: 'Vodka, OJ, Cranberry' },
    ]
  },
  {
    title: 'Red Bull Litchers', price: '$15', color: '#9D4EDD', badge: null,
    items: [
      { name: 'The Electric Bull',    desc: 'Vodka, Red Bull, Sour, Blue' },
      { name: 'The Bull Breeze',      desc: 'Vodka, Red Bull, Pineapple, Cran' },
      { name: 'The Bull Rush',        desc: 'Gin, Red Bull, Tonic' },
      { name: 'The Yellow Bull',      desc: 'Tequila, Yellow Bull, OJ, Lime' },
      { name: 'The Daisy Bull',       desc: 'Vodka, Red Bull, Sprite, Grenadine' },
      { name: 'The Tequila Bull-Rise',desc: 'Tequila, Red Bull, OJ, Grenadine' },
      { name: 'The L.I.T. Bull',      desc: 'Vodka, Gin, Rum, Tequila, Triple Sec, Red Bull, Coke' },
      { name: 'The Strawberry Bull',  desc: 'Vodka, Red Bull, Strawberry, Sprite' },
      { name: 'The Mango Bull',       desc: 'Vodka, Red Bull, Mango, Sprite' },
    ]
  },
  {
    title: 'Premium Red Bull Litchers', price: '$18', color: '#F56520', badge: null,
    items: [
      { name: 'Sweet Tart Bull',        desc: 'Citrus Vodka, Sprite, Sour, Red Bull' },
      { name: 'Vitamin C Bull',         desc: "Deep Eddy's Orange Vodka, OJ, Yellow Bull" },
      { name: 'Johnny Vegas Bull',      desc: 'Tequila, Watermelon Schnapps, Red Bull' },
      { name: 'Kitchen Sink Bull',      desc: 'Vodka, Gin, Rum, Peach, Red Bull' },
      { name: 'Spiked Watermelon Bull', desc: 'Malibu Watermelon Rum, Watermelon Red Bull' },
      { name: 'Cherry Bomb Bull',       desc: 'Cherry Vodka, Grenadine, Red Bull' },
      { name: 'Colt 45 Bull',           desc: 'Gin, Jager, Watermelon Red Bull' },
      { name: 'Peachy Keen Bull',       desc: 'Whisky, Peach Schnapps, Red Bull' },
    ]
  },
]

const pitcherSections = [
  { title: 'Lemonade Litchers',      price: '$12', color: '#F56520', flavors: ['Classic','Strawberry','Mango','Passion Fruit'] },
  { title: 'Mojito Litchers',        price: '$12', color: '#9D4EDD', flavors: ['Classic','Strawberry','Mango','Passion Fruit'] },
  { title: 'Margarita Litchers',     price: '$12', color: '#F56520', flavors: ['Classic','Strawberry','Mango','Passion Fruit'] },
  { title: 'Jolly Rancher Litchers', price: '$12', color: '#9D4EDD', flavors: ['Sour Apple','Watermelon'] },
]

const specialties = [
  { name: 'Specialty Litchers', price: '$13', desc: 'Cosmic Litcher · Clemson Sleeptight', badge: 'Ask Your Server' },
  { name: 'Corona-Rita Litcher', price: '$16', desc: 'Classic Margarita Litcher with Corona Light Float', badge: 'Fan Fave' },
]

export default function Litcher() {
  return (
    <div className="bg-[#04030A] min-h-screen overflow-hidden">

      {/* Hero */}
      <div className="relative min-h-[90vh] flex items-end pb-20 overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
          <img src="/images/four-litchers.png" alt="" className="w-full object-cover opacity-40" style={{ minHeight: '100%' }} />
        </div>
        <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse 100% 60% at 50% 100%, rgba(4,3,10,1) 20%, transparent 80%), radial-gradient(ellipse 100% 60% at 50% 0%, rgba(4,3,10,0.9) 20%, transparent 80%), radial-gradient(ellipse 60% 40% at 50% 50%, rgba(82,45,128,0.25) 0%, transparent 100%)' }} />
        <div className="relative z-[1] px-[5vw] w-full pt-32">
          <motion.div {...inView(0)}>
            <div className="flex items-center gap-3 font-ui text-[13px] font-bold tracking-[.28em] uppercase text-purple-bright mb-5">
              <span className="w-8 h-0.5 bg-purple-bright" />Itsurwiener · Clemson, SC
            </div>
            <h1 className="font-display leading-[.82] text-white mb-6" style={{ fontSize: 'clamp(72px,16vw,200px)' }}>
              Home of<br />The<br /><span className="text-purple-bright">Litcher</span><sup style={{ fontSize: '0.15em', verticalAlign: 'top', fontFamily: 'Space Grotesk,sans-serif', fontWeight: 700, color: 'rgba(157,78,221,0.8)' }}>®</sup>
            </h1>
            <p className="font-cond text-[clamp(18px,2.5vw,28px)] text-cream/60 max-w-[620px] mb-10 tracking-wide">
              Clemson's most iconic drink. Built right here. Served right here. Over 60,000 sold each year.
            </p>
            <div className="flex gap-4 flex-wrap">
              <a href="#menu" className="font-ui text-[12px] font-bold tracking-[.18em] uppercase bg-purple-bright text-white px-10 py-4 no-underline clip-angled hover:bg-orange hover:text-black transition-all duration-300">
                See Litcher Menu
              </a>
              <a href="/find-us" className="font-ui text-[12px] font-bold tracking-[.18em] uppercase border border-purple-bright/40 text-cream px-10 py-4 no-underline hover:border-purple-bright hover:text-purple-bright transition-all duration-200">
                Find Us
              </a>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Litcher Image Ticker */}
      <div className="overflow-hidden py-6 border-y border-purple-bright/10" style={{ background: '#04030A' }}>
        <div className="flex gap-6 w-max" style={{ animation: 'ticker 40s linear infinite' }}>
          {[
            { src: '/images/red-litcher.png',          label: 'Strawberry Litcher' },
            { src: '/images/blue-litcher.png',          label: 'Blue Litcher' },
            { src: '/images/yellow-marg-litcher.png',   label: 'Margarita Litcher' },
            { src: '/images/iced-tea-rb-litcher.png',   label: 'Iced Tea Red Bull Litcher' },
            { src: '/images/mojito-litcher.png',        label: 'Mojito Litcher' },
            { src: '/images/watermelon-litcher.png',    label: 'Watermelon Litcher' },
            { src: '/images/cosmic-litcher.png',        label: 'Cosmic Litcher' },
            { src: '/images/orange-litcher.png',        label: 'Orange Litcher' },
            { src: '/images/purple-litcher.png',        label: 'Purple Litcher' },
            { src: '/images/blue-rb-litcher.png',       label: 'Blue Red Bull Litcher' },
            { src: '/images/watermelon-rb-litcher.png', label: 'Watermelon Red Bull Litcher' },
            { src: '/images/marg-litcher.png',          label: 'Margarita Litcher' },
            { src: '/images/clear-litcher.png',         label: 'Classic Litcher' },
            { src: '/images/green-apple-litcher.png',   label: 'Green Apple Litcher' },
            { src: '/images/corona-litcher.png',        label: 'Corona-Rita Litcher' },
            { src: '/images/red-litcher.png',          label: 'Strawberry Litcher' },
            { src: '/images/blue-litcher.png',          label: 'Blue Litcher' },
            { src: '/images/yellow-marg-litcher.png',   label: 'Margarita Litcher' },
            { src: '/images/iced-tea-rb-litcher.png',   label: 'Iced Tea Red Bull Litcher' },
            { src: '/images/mojito-litcher.png',        label: 'Mojito Litcher' },
            { src: '/images/watermelon-litcher.png',    label: 'Watermelon Litcher' },
            { src: '/images/cosmic-litcher.png',        label: 'Cosmic Litcher' },
            { src: '/images/orange-litcher.png',        label: 'Orange Litcher' },
            { src: '/images/purple-litcher.png',        label: 'Purple Litcher' },
            { src: '/images/blue-rb-litcher.png',       label: 'Blue Red Bull Litcher' },
            { src: '/images/watermelon-rb-litcher.png', label: 'Watermelon Red Bull Litcher' },
            { src: '/images/marg-litcher.png',          label: 'Margarita Litcher' },
            { src: '/images/clear-litcher.png',         label: 'Classic Litcher' },
            { src: '/images/green-apple-litcher.png',   label: 'Green Apple Litcher' },
            { src: '/images/corona-litcher.png',        label: 'Corona-Rita Litcher' },
          ].map((img, i) => (
            <div key={i} className="flex-shrink-0 relative group" style={{ width: '240px', height: '320px' }}>
              <img src={img.src} alt={img.label} className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300" />
              <div className="absolute bottom-0 left-0 right-0 text-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                <span className="font-ui text-[10px] font-bold tracking-[.12em] uppercase text-purple-bright">{img.label}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* What is a Litcher */}
      <section className="px-[5vw] py-[100px]" style={{ background: 'linear-gradient(180deg,#04030A,#08060F)' }}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center max-w-[1200px] mx-auto">
          <motion.div {...inView(0)}>
            <div className="flex items-center gap-3 font-ui text-[11px] font-bold tracking-[.28em] uppercase text-orange mb-4">
              <span className="w-6 h-0.5 bg-orange" />The Legend
            </div>
            <h2 className="font-display text-[clamp(44px,6vw,80px)] leading-none text-white mb-6">
              What Is A<br /><span className="text-orange">Litcher?</span>
            </h2>
            <p className="text-[15px] text-cream/75 leading-[1.9] mb-6">
              The Litcher® is Itsurwiener's signature house cocktail — invented right here in Clemson and served nowhere else on earth. It's our most popular drink by a mile and has become a Clemson tradition.
            </p>
            <p className="text-[15px] text-cream/75 leading-[1.9] mb-8">
              Choose from dozens of flavors — from classic Popular Litchers to Red Bull Litchers, Margarita Litchers, Mojito Litchers, and more. One sip and you'll know why people drive to Clemson just for these.
            </p>
            <div className="border border-purple-bright/20 px-6 py-5" style={{ background: 'rgba(157,78,221,0.06)' }}>
              <div className="font-display text-[clamp(48px,7vw,88px)] text-purple-bright leading-none">60,000<span className="text-orange">+</span></div>
              <div className="font-ui text-[12px] font-bold tracking-[.2em] uppercase text-cream/50 mt-1">Litchers Sold Every Year</div>
            </div>
          </motion.div>
          <motion.div {...inView(0.15)} className="relative overflow-hidden" style={{ aspectRatio: '4/3' }}>
            <img src="/images/litchers.jpg" alt="The Litcher" className="w-full h-full object-cover" />
            <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg,rgba(82,45,128,0.2),transparent 60%)' }} />
            <div className="absolute bottom-6 left-6">
              <div className="font-display text-[clamp(28px,4vw,48px)] text-white leading-none">The Litcher<sup style={{ fontSize: '0.2em', verticalAlign: 'super', fontFamily: 'Space Grotesk,sans-serif', fontWeight: 700 }}>®</sup></div>
              <div className="font-ui text-[11px] tracking-[.2em] uppercase text-purple-bright mt-1">Clemson's Original · Since Day One</div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Ticker */}
      <div className="overflow-hidden py-5 border-y border-purple-bright/20" style={{ background: '#522D80' }}>
        <div className="inline-flex whitespace-nowrap" style={{ animation: 'ticker 25s linear infinite' }}>
          {Array(3).fill(['The Home of The Litcher®','Popular Litchers','Red Bull Litchers','Premium Red Bull Litchers','Lemonade Litchers','Mojito Litchers','Margarita Litchers','Corona-Rita Litcher','60,000+ Sold Every Year']).flat().map((item, i) => (
            <span key={i} className="font-display text-[22px] tracking-[.06em] text-white inline-flex items-center px-8">
              {item}<span className="ml-8 opacity-50">✦</span>
            </span>
          ))}
        </div>
      </div>

      {/* Litcher Menu */}
      <section id="menu" className="px-[5vw] py-[100px]" style={{ background: 'linear-gradient(180deg,#08060F,#04030A)' }}>
        <motion.div {...inView(0)} className="mb-12">
          <div className="flex items-center gap-3 font-ui text-[11px] font-bold tracking-[.28em] uppercase text-purple-bright mb-4">
            <span className="w-6 h-0.5 bg-purple-bright" />The Lineup
          </div>
          <h2 className="font-display text-[clamp(44px,6vw,80px)] leading-none text-white">
            Famous<br /><span className="text-purple-bright">Litchers</span>
          </h2>
        </motion.div>

        {sections.map((section, si) => (
          <motion.div key={section.title} {...inView(0)} className="mb-14">
            <div className="flex items-baseline gap-4 mb-6 pb-4 border-b-2" style={{ borderColor: section.color }}>
              {section.badge && (
                <span className="font-ui text-[9px] font-bold tracking-[.15em] uppercase px-2 py-1" style={{ background: section.color, color: '#04030A' }}>{section.badge}</span>
              )}
              <h3 className="font-display text-[clamp(32px,4vw,60px)] leading-none" style={{ color: section.color }}>
                {section.title}<sup style={{ fontSize: '0.2em', fontFamily: 'Space Grotesk,sans-serif', fontWeight: 700 }}>®</sup>
              </h3>
              <div className="font-display text-[clamp(28px,4vw,52px)] text-white/60 ml-auto flex-shrink-0">{section.price}</div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {section.items.map((item, i) => (
                <motion.div key={item.name}
                  className="group border border-white/[0.06] p-4 hover:border-purple-bright/25 transition-all duration-200"
                  style={{ background: i % 2 === 0 ? 'rgba(255,255,255,0.03)' : 'rgba(255,255,255,0.05)' }}
                  initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: (i % 6) * 0.04 }}>
                  <div className="font-cond text-[20px] font-black text-white uppercase tracking-wide leading-none mb-1 group-hover:text-purple-bright transition-colors duration-200">{item.name}</div>
                  <div className="text-[12px] text-cream/55 leading-snug">{item.desc}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        ))}

        {/* Flavorful Litchers */}
        <motion.div {...inView(0)} className="mb-14">
          <div className="flex items-baseline gap-4 mb-6 pb-4 border-b-2 border-orange">
            <h3 className="font-display text-[clamp(32px,4vw,60px)] leading-none text-orange">
              Flavorful Litchers<sup style={{ fontSize: '0.2em', fontFamily: 'Space Grotesk,sans-serif', fontWeight: 700 }}>®</sup>
            </h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {pitcherSections.map((ps) => (
              <div key={ps.title} className="border border-white/[0.06] p-5" style={{ background: 'rgba(255,255,255,0.03)' }}>
                <div className="flex items-baseline justify-between mb-3">
                  <div className="font-display text-[clamp(22px,3vw,36px)] leading-none" style={{ color: ps.color }}>{ps.title}<sup style={{ fontSize: '0.2em', fontFamily: 'Space Grotesk,sans-serif', fontWeight: 700 }}>®</sup></div>
                  <div className="font-display text-[28px] text-white/60">{ps.price}</div>
                </div>
                <div className="flex flex-wrap gap-2">
                  {ps.flavors.map(f => <span key={f} className="font-ui text-[12px] border border-white/10 px-3 py-1 text-cream/65">{f}</span>)}
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Specialties */}
        <motion.div {...inView(0)}>
          <div className="flex items-baseline gap-4 mb-6 pb-4 border-b-2 border-purple-bright">
            <h3 className="font-display text-[clamp(32px,4vw,60px)] leading-none text-purple-bright">Specialties</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {specialties.map(s => (
              <div key={s.name} className="relative border-2 border-purple-bright/30 p-6" style={{ background: 'rgba(157,78,221,0.07)' }}>
                <div className="absolute top-0 right-0 font-ui text-[9px] font-bold tracking-[.15em] uppercase px-3 py-1.5" style={{ background: '#9D4EDD', color: 'white' }}>{s.badge}</div>
                <div className="flex items-baseline justify-between gap-4 mb-2">
                  <div className="font-display text-[clamp(22px,3vw,38px)] leading-none text-white">{s.name}<sup style={{ fontSize: '0.2em', fontFamily: 'Space Grotesk,sans-serif', fontWeight: 700 }}>®</sup></div>
                  <div className="font-display text-[32px] text-orange flex-shrink-0">{s.price}</div>
                </div>
                <p className="text-[13px] text-cream/65">{s.desc}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Bottom CTA */}
      <section className="px-[5vw] py-[100px] text-center relative overflow-hidden" style={{ background: 'linear-gradient(135deg,#1a0035,#04030A,#1a0035)' }}>
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'repeating-linear-gradient(45deg,transparent,transparent 40px,rgba(157,78,221,0.4) 40px,rgba(157,78,221,0.4) 41px)' }} />
        <motion.div {...inView(0)} className="relative z-[1]">
          <h2 className="font-display text-[clamp(52px,10vw,130px)] leading-[.88] text-white mb-10">
            You Have To<br />Try <span className="text-purple-bright">One.</span>
          </h2>
          <div className="flex gap-4 justify-center flex-wrap">
            <a href="/find-us" className="font-ui text-[12px] font-bold tracking-[.18em] uppercase bg-purple-bright text-white px-10 py-4 no-underline clip-angled hover:bg-orange hover:text-black transition-all duration-300">
              Find Us
            </a>
            <Link to="/menu" className="font-ui text-[12px] font-bold tracking-[.18em] uppercase border border-purple-bright/40 text-cream px-10 py-4 no-underline hover:border-purple-bright hover:text-purple-bright transition-all duration-200">
              See Food Menu
            </Link>
          </div>
        </motion.div>
      </section>

    </div>
  )
}
