import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import CartButton from '@components/CartButton'
import { client } from '@/lib/sanity'

export default function ProductDetail() {
  const { id } = useParams()
  const [product, setProduct] = useState(null)
  const [size, setSize] = useState('')
  const [color, setColor] = useState('')
  const [amount, setAmount] = useState(null)
  const [added, setAdded] = useState(false)

  useEffect(() => {
    client.fetch(`*[_type == "product" && _id == $id][0] {
      _id, name, category, price, description,
      "image": image.asset->url,
      sizes, colors, featured, available, denominations, weight
    }`, { id }).then(data => {
      setProduct(data)
      if (data?.sizes?.length) setSize(data.sizes[2] || data.sizes[0])
      if (data?.colors?.length) setColor(data.colors[0])
      if (data?.denominations?.length) {
        const sorted = [...data.denominations].map(Number).sort((a,b) => a-b)
        setAmount(sorted[1] || sorted[0])
      }
    })
  }, [id])

  if (!product) return (
    <div className="bg-[#04030A] min-h-screen flex items-center justify-center">
      <div className="font-ui text-cream/30 text-[13px] tracking-[.2em] uppercase">Loading...</div>
    </div>
  )

  const handleAdd = () => {
    setAdded(true)
    setTimeout(() => setAdded(false), 2000)
  }

  return (
    <div className="bg-[#04030A] min-h-screen pt-28 px-[5vw] pb-20">
      <Link to="/merch" className="inline-flex items-center gap-2 font-ui text-[11px] font-bold tracking-[.15em] uppercase text-cream/40 no-underline hover:text-orange transition-colors duration-200 mb-10">
        ← Back to Shop
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 max-w-[1100px] mx-auto">

        {/* Image */}
        <motion.div initial={{ opacity:0, x:-20 }} animate={{ opacity:1, x:0 }} transition={{ duration:0.6 }}
          className="relative overflow-hidden border border-white/[0.07] aspect-square bg-[#08060F] flex items-center justify-center">
          {product.image
            ? <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
            : <div className="text-[80px]">🛍️</div>
          }
        </motion.div>

        {/* Info */}
        <motion.div initial={{ opacity:0, x:20 }} animate={{ opacity:1, x:0 }} transition={{ duration:0.6, delay:0.1 }}
          className="flex flex-col gap-6 py-4">

          <div>
            <div className="font-ui text-[10px] font-bold tracking-[.2em] uppercase text-orange/60 mb-2">
              itsurwiener Merch
            </div>
            <h1 className="font-display text-[clamp(36px,5vw,64px)] text-white leading-none mb-4">{product.name}</h1>
            <div className="font-display text-[48px] text-orange leading-none">${product.price.toFixed(2)}</div>
          </div>

          {product.description && (
            <p className="text-[15px] text-cream/70 leading-[1.8] border-t border-white/[0.06] pt-6">{product.description}</p>
          )}

          {/* Denomination selector for gift cards */}
          {product.denominations?.length > 0 && (
            <div>
              <div className="font-ui text-[9px] font-bold tracking-[.15em] uppercase text-cream/40 mb-3">Select Amount: <span className="text-orange">${amount}</span></div>
              <div className="flex gap-3 flex-wrap">
                {[...product.denominations].map(Number).sort((a,b) => a-b).map(d => (
                  <button key={d} onClick={() => setAmount(d)}
                    className={`font-display text-[28px] px-5 py-2 border transition-all duration-200 ${Number(amount) === d ? 'border-orange text-orange bg-orange/10' : 'border-white/15 text-white/60 hover:border-orange/50 hover:text-white'}`}>
                    ${d}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Color selector */}
          {product.colors?.length > 0 && (
            <div>
              <div className="font-ui text-[9px] font-bold tracking-[.15em] uppercase text-cream/40 mb-3">Color: <span className="text-cream/70">{color}</span></div>
              <div className="flex gap-2 flex-wrap">
                {product.colors.map(c => (
                  <button key={c} onClick={() => setColor(c)}
                    className={`font-ui text-[11px] font-bold tracking-[.1em] uppercase px-4 py-2 border transition-all duration-150 ${color === c ? 'border-orange text-orange bg-orange/10' : 'border-white/15 text-cream/50 hover:border-white/40'}`}>
                    {c}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Size selector */}
          {product.sizes?.length > 0 && (
            <div>
              <div className="font-ui text-[9px] font-bold tracking-[.15em] uppercase text-cream/40 mb-3">Size: <span className="text-cream/70">{size}</span></div>
              <div className="flex gap-2 flex-wrap">
                {product.sizes.map(s => (
                  <button key={s} onClick={() => setSize(s)}
                    className={`font-ui text-[13px] font-bold tracking-[.08em] uppercase px-4 py-2.5 border transition-all duration-150 ${size === s ? 'border-orange text-orange bg-orange/10' : 'border-white/15 text-cream/50 hover:border-white/40'}`}>
                    {s}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Add to cart */}
          <button onClick={handleAdd}
            className={`snipcart-add-item w-full font-ui text-[13px] font-bold tracking-[.2em] uppercase py-4 border transition-all duration-200 mt-2 ${added ? 'bg-orange/20 border-orange text-orange' : 'bg-orange text-black border-orange hover:bg-white'}`}
            data-item-id={`${product._id}${color ? `-${color.toLowerCase()}` : ''}${size ? `-${size.toLowerCase()}` : ''}${amount ? `-${amount}` : ''}`}
            data-item-price={amount || product.price}
            data-item-url={`/api/products?id=${product._id}&price=${product.price}&name=${encodeURIComponent(product.name)}`}
            data-item-name={`${product.name}${color ? ` — ${color}` : ''}${size ? ` / ${size}` : ''}${amount ? ` — $${amount}` : ''}`}
            data-item-description={product.description || ''}
            data-item-image={product.image || ''}
            data-item-weight={product.weight || 0}
          >
            {added ? '✓ Added to Cart' : 'Add to Cart'}
          </button>

          <CartButton className="w-full font-ui text-[12px] font-bold tracking-[.18em] uppercase border border-orange/40 text-cream py-4 hover:border-orange hover:text-orange transition-all duration-200 bg-transparent cursor-pointer" />
          <Link to="/merch" className="text-center font-ui text-[11px] text-cream/30 no-underline hover:text-cream/60 transition-colors">
            ← Continue Shopping
          </Link>

        </motion.div>
      </div>
    </div>
  )
}
