import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { client } from '@/lib/sanity'
import PageCTA from '@components/PageCTA'
import { motion } from 'framer-motion'

const inView = (delay = 0) => ({
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-60px' },
  transition: { duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] }
})

const products = [
  // T-Shirts
  {
    id: 'tshirt-classic', category: 'tees',
    name: 'Classic Tee', desc: 'The original itsurwiener tee. Comfort Colors 100% cotton.',
    price: 24.99, image: null,
    sizes: ['S','M','L','XL','2XL'], colors: ['Black','Orange','Purple'],
  },
  {
    id: 'tshirt-litcher', category: 'tees',
    name: 'Home of The Litcher® Tee', desc: 'Rep the most iconic drink in Clemson. Comfort Colors.',
    price: 26.99, image: null,
    sizes: ['S','M','L','XL','2XL'], colors: ['Black','Purple'],
  },
  {
    id: 'tshirt-gameday', category: 'tees',
    name: 'Game Day Tee', desc: 'The official itsurwiener game day shirt. Go Tigers.',
    price: 24.99, image: null,
    sizes: ['S','M','L','XL','2XL'], colors: ['Orange','Black'],
  },

  // Sweatshirts
  {
    id: 'hoodie-classic', category: 'hoodies',
    name: 'Classic Hoodie', desc: 'Heavyweight Comfort Colors hoodie. Built for Clemson winters.',
    price: 54.99, image: null,
    sizes: ['S','M','L','XL','2XL'], colors: ['Black','Grey','Purple'],
  },
  {
    id: 'crewneck-classic', category: 'hoodies',
    name: 'Classic Crewneck', desc: 'Premium Comfort Colors crewneck sweatshirt.',
    price: 44.99, image: null,
    sizes: ['S','M','L','XL','2XL'], colors: ['Black','Orange','Purple'],
  },

  // Hats
  {
    id: 'hat-snapback', category: 'hats',
    name: 'itsurwiener Snapback', desc: 'Structured snapback hat. One size fits most.',
    price: 28.99, image: null,
    sizes: null, colors: ['Black','Orange'],
  },
  {
    id: 'hat-dad', category: 'hats',
    name: 'Wien Dad Hat', desc: 'Unstructured cotton dad hat with embroidered logo.',
    price: 24.99, image: null,
    sizes: null, colors: ['Black','Khaki'],
  },

  // Souvenirs & Stickers
  {
    id: 'sticker-pack', category: 'souvenirs',
    name: 'Sticker Pack', desc: '5 premium vinyl stickers. Waterproof, weatherproof.',
    price: 8.99, image: null,
    sizes: null, colors: null,
  },
  {
    id: 'decal-car', category: 'souvenirs',
    name: 'Car Decal', desc: 'Large vinyl car decal. Makes the tailgate official.',
    price: 6.99, image: null,
    sizes: null, colors: null,
  },
  {
    id: 'koozie', category: 'souvenirs',
    name: 'Wien Koozie', desc: 'Keep your Tall Boy cold. Neoprene can cooler.',
    price: 7.99, image: null,
    sizes: null, colors: ['Black','Orange'],
  },
  {
    id: 'pint-glass', category: 'souvenirs',
    name: 'Pint Glass', desc: 'Etched itsurwiener pint glass. 16oz.',
    price: 14.99, image: null,
    sizes: null, colors: null,
  },

  // Gift Cards
  {
    id: 'gift-card-25', category: 'giftcards',
    name: 'Gift Card — $25', desc: 'The perfect gift for any Clemson fan.',
    price: 25.00, image: null,
    sizes: null, colors: null,
  },
  {
    id: 'gift-card-50', category: 'giftcards',
    name: 'Gift Card — $50', desc: 'Good for food, drinks, merch — anything.',
    price: 50.00, image: null,
    sizes: null, colors: null,
  },
  {
    id: 'gift-card-100', category: 'giftcards',
    name: 'Gift Card — $100', desc: 'Go big. They deserve it.',
    price: 100.00, image: null,
    sizes: null, colors: null,
  },
]

const categories = [
  { key: 'all',       label: 'All Items' },
  { key: 'tees',      label: 'T-Shirts' },
  { key: 'hoodies',   label: 'Sweatshirts' },
  { key: 'hats',      label: 'Hats' },
  { key: 'souvenirs', label: 'Souvenirs' },
  { key: 'giftcards', label: 'Gift Cards' },
]

function ProductCard({ product }) {
  const [size, setSize] = useState(product.sizes?.[2] || '')
  const [color, setColor] = useState(product.colors?.[0] || '')
  const [added, setAdded] = useState(false)

  const handleAdd = () => {
    setAdded(true)
    setTimeout(() => setAdded(false), 2000)
  }

  return (
    <motion.div
      className="group border border-white/[0.07] overflow-hidden hover:border-orange/30 transition-all duration-300"
      style={{ background: 'rgba(255,255,255,0.03)' }}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
    >
      {/* Product image — only show if real image exists */}
      <Link to={`/merch/${product.id || product._id}`} className="block no-underline">
        {product.image ? (
          <div className="relative overflow-hidden aspect-square bg-[#08060F]">
            <img src={product.image} alt={product.name}
              className="w-full h-full object-cover group-hover:scale-[1.04] transition-transform duration-500 opacity-80" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            <div className="absolute bottom-3 left-3">
              <span className="font-display text-[28px] text-orange leading-none">${product.price.toFixed(2)}</span>
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-between px-5 pt-5">
            <span className="font-display text-[32px] text-orange leading-none">${product.price.toFixed(2)}</span>
            <span className="font-ui text-[10px] font-bold tracking-[.15em] uppercase text-cream/25 border border-white/10 px-2 py-1">Photo Coming Soon</span>
          </div>
        )}
      </Link>

      {/* Info */}
      <div className="p-5">
        <Link to={`/merch/${product.id || product._id}`} className="no-underline"><h3 className="font-cond text-[20px] font-black text-white uppercase tracking-wide leading-none mb-1 group-hover:text-orange transition-colors duration-200 cursor-pointer">{product.name}</h3></Link>
        <p className="text-[12px] text-cream/55 mb-4 leading-snug">{product.desc}</p>

        {/* Color selector */}
        {product.colors && (
          <div className="mb-3">
            <div className="font-ui text-[9px] font-bold tracking-[.15em] uppercase text-cream/40 mb-2">Color: <span className="text-cream/70">{color}</span></div>
            <div className="flex gap-2 flex-wrap">
              {product.colors.map(c => (
                <button key={c} onClick={() => setColor(c)}
                  className={`font-ui text-[10px] font-bold tracking-[.1em] uppercase px-3 py-1 border transition-all duration-150 ${color === c ? 'border-orange text-orange bg-orange/10' : 'border-white/15 text-cream/50 hover:border-white/40'}`}>
                  {c}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Size selector */}
        {product.sizes && (
          <div className="mb-4">
            <div className="font-ui text-[9px] font-bold tracking-[.15em] uppercase text-cream/40 mb-2">Size: <span className="text-cream/70">{size}</span></div>
            <div className="flex gap-2 flex-wrap">
              {product.sizes.map(s => (
                <button key={s} onClick={() => setSize(s)}
                  className={`font-ui text-[11px] font-bold tracking-[.08em] uppercase px-3 py-1.5 border transition-all duration-150 ${size === s ? 'border-orange text-orange bg-orange/10' : 'border-white/15 text-cream/50 hover:border-white/40'}`}>
                  {s}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Snipcart button */}
        <button
          onClick={handleAdd}
          className={`snipcart-add-item w-full font-ui text-[11px] font-bold tracking-[.18em] uppercase py-3 border transition-all duration-200 ${added ? 'bg-orange/20 border-orange text-orange' : 'border-orange/40 text-cream hover:bg-orange hover:text-black hover:border-orange'}`}
          data-item-id={product.id + (color ? `-${color.toLowerCase()}` : '') + (size ? `-${size.toLowerCase()}` : '')}
          data-item-price={product.price}
          data-item-url={`/api/products?id=${product.id}&price=${product.price}&name=${encodeURIComponent(product.name)}`}
          data-item-description={product.desc}
          data-item-image={product.image}
          data-item-name={product.name + (color ? ` — ${color}` : '') + (size ? ` / ${size}` : '')}
          data-item-custom1-name={product.sizes ? 'Size' : undefined}
          data-item-custom1-value={product.sizes ? size : undefined}
          data-item-custom2-name={product.colors ? 'Color' : undefined}
          data-item-custom2-value={product.colors ? color : undefined}
        >
          {added ? '✓ Added to Cart' : 'Add to Cart'}
        </button>
      </div>
    </motion.div>
  )
}


function GiftCardSelector({ products }) {
  const giftCard = products[0]
  if (!giftCard) return null
  const amounts = (giftCard.denominations?.length
    ? [...giftCard.denominations]
    : [10, 25, 50, 100, 500]).map(Number).sort((a,b) => a - b)
  const [amount, setAmount] = useState(amounts[1] || amounts[0])

  return (
    <motion.div
      className="border border-orange/30 overflow-hidden group transition-all duration-300 md:col-span-2 lg:col-span-3"
      style={{ background: 'rgba(245,101,32,0.04)' }}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
    >
      <div className="flex flex-col md:flex-row items-stretch">
        {/* Left — visual */}
        <div className="md:w-[280px] flex-shrink-0 flex flex-col items-center justify-center p-10 border-b md:border-b-0 md:border-r border-orange/15"
          style={{ background: 'linear-gradient(135deg,rgba(245,101,32,0.12),rgba(82,45,128,0.12))' }}>
          <div className="font-display text-[80px] leading-none text-orange mb-2">🎁</div>
          <div className="font-display text-[clamp(32px,4vw,52px)] text-white leading-none text-center">
            itsurwiener<br /><span className="text-orange">Gift Card</span>
          </div>
          <div className="font-ui text-[11px] tracking-[.15em] uppercase text-cream/40 mt-3 text-center">
            Good for food, drinks & merch
          </div>
        </div>

        {/* Right — selector */}
        <div className="flex-1 p-8 flex flex-col justify-between gap-6">
          <div>
            <div className="font-ui text-[11px] font-bold tracking-[.2em] uppercase text-orange/70 mb-4">Select Amount</div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '8px' }}>
              {amounts.map(p => (
                <button key={p} onClick={(e) => { e.stopPropagation(); setAmount(Number(p)); }}
                  style={{ display: 'block', width: '100%' }}
                  className={`font-display text-[24px] py-3 border transition-all duration-200 text-center ${
                    Number(amount) === Number(p)
                      ? 'border-orange text-orange bg-orange/10'
                      : 'border-white/15 text-white/60 hover:border-orange/50 hover:text-white'
                  }`}>
                  ${p}
                </button>
              ))}
            </div>
          </div>

          <div>
            <p className="text-[13px] text-cream/55 mb-6 leading-relaxed">
              {giftCard.description || 'The perfect gift for any Clemson fan. Redeemable for food, drinks, and merch at itsurwiener.'}
            </p>
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div className="font-display text-[48px] text-orange leading-none">${amount}</div>
              <button
                className="snipcart-add-item font-ui text-[12px] font-bold tracking-[.18em] uppercase bg-orange text-black px-10 py-4 hover:bg-white transition-colors duration-200"
                data-item-shippable="false"
                data-item-id={`gift-card-${amount}`}
                data-item-price={amount}
                data-item-url={`/api/products?id=${`gift-card-${amount}`}&price=${amount}&name=${encodeURIComponent(`itsurwiener Gift Card — $${amount}`)}`}
                data-item-name={`itsurwiener Gift Card — $${amount}`}
                data-item-description={`itsurwiener Gift Card - $${amount} value`}
                data-item-image={giftCard.image || ''}
              >
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default function Merch() {
  const [activeCategory, setActiveCategory] = useState('all')
  const [sanityProducts, setSanityProducts] = useState(null)

  useEffect(() => {
    client.fetch(`*[_type == "product" && available == true] | order(category asc, sortOrder asc) {
      "id": _id,
      name, category, price, description,
      "image": image.asset->url,
      sizes, colors, featured, denominations, weight
    }`).then(data => {
      if (data && data.length > 0) setSanityProducts(data)
    }).catch(() => {})
  }, [])

  const activeProducts = (sanityProducts || products).map(p => ({
    ...p,
    desc: p.desc || p.description,
    image: p.image || null,
      weight: p.weight || 0,
  }))

  const filtered = activeCategory === 'all'
    ? activeProducts
    : activeProducts.filter(p => p.category === activeCategory)

  return (
    <div className="bg-[#04030A] min-h-screen">

      {/* Hero */}
      <div className="relative pt-32 pb-16 px-[5vw] overflow-hidden">
        <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg,#0e0800,#08060F,#0e0800)' }} />
        <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'repeating-linear-gradient(45deg,transparent,transparent 40px,rgba(245,101,32,0.06) 40px,rgba(245,101,32,0.06) 41px)' }} />
        <div className="relative z-[1] flex items-start justify-between flex-wrap gap-6">
          <div>
            <div className="flex items-center gap-3 font-ui text-[13px] font-bold tracking-[.28em] uppercase text-orange mb-4">
              <span className="w-8 h-0.5 bg-orange" />Rep The Wien
            </div>
            <h1 className="font-display text-[clamp(64px,12vw,160px)] leading-[.85] text-white">
              Shop<br /><span className="text-orange">Wien Merch</span>
            </h1>
            <p className="font-cond text-[clamp(16px,2vw,22px)] text-cream/55 mt-4 max-w-[600px] tracking-wide">
              Official itsurwiener apparel and souvenirs. Quality Comfort Colors gear — make a statement in Clemson.
            </p>
          </div>

          {/* Cart button */}
          <div className="pt-2">
            <button className="snipcart-checkout font-ui text-[12px] font-bold tracking-[.18em] uppercase border border-orange/40 text-cream px-6 py-3 bg-transparent hover:bg-orange hover:text-black hover:border-orange transition-all duration-200 flex items-center gap-3">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/></svg>
              Cart (<span className="snipcart-items-count">0</span>)
            </button>
          </div>
        </div>
      </div>

      {/* Category filter */}
      <div className="sticky top-[72px] z-[100] bg-[#04030A]/97 backdrop-blur-lg border-b border-orange/10 px-[5vw] py-4">
        <div className="flex gap-2.5 overflow-x-auto pb-1">
          {categories.map(({ key, label }) => (
            <button key={key} onClick={() => setActiveCategory(key)}
              className={`flex-shrink-0 px-5 py-2.5 font-ui text-[13px] font-bold tracking-[.1em] uppercase border transition-all duration-200 whitespace-nowrap ${
                activeCategory === key ? 'bg-orange text-black border-orange' : 'text-cream/70 border-orange/20 hover:border-orange/50 hover:text-white bg-transparent'
              }`}>
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* Product grid */}
      <div className="px-[5vw] py-16 max-w-[1200px] mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map(product => <ProductCard key={product.id} product={product} />)}
        </div>


      </div>
      <PageCTA />
    </div>
  )
}
