import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function Cart() {
  const [open, setOpen] = useState(false)
  const [items, setItems] = useState([])
  const [checking, setChecking] = useState(false)
  const unsubRef = useRef(null)

  useEffect(() => {
    const setup = () => {
      // Read store state
      const readCart = () => {
        const state = window.Snipcart?.store?.getState()?.cart
        const cartItems = state?.items?.items || state?.items || []
        setItems(Array.isArray(cartItems) ? cartItems : [])
      }

      // Subscribe to store
      if (window.Snipcart?.store?.subscribe) {
        readCart()
        unsubRef.current = window.Snipcart.store.subscribe(readCart)
      }

      // Intercept Snipcart's own cart UI opening — kill the page lock
      // and show our drawer instead
      const observer = new MutationObserver(() => {
        if (document.documentElement.classList.contains('snipcart-cart--opened')) {
          document.documentElement.classList.remove('snipcart-cart--opened')
          readCart()
          setOpen(true)
        }
      })
      observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] })

      return () => {
        unsubRef.current?.()
        observer.disconnect()
      }
    }

    if (window.Snipcart?.ready) {
      window.Snipcart.ready.then(setup)
    } else {
      document.addEventListener('snipcart.ready', setup, { once: true })
    }
  }, [])

  const count = items.reduce((sum, i) => sum + (i.quantity || 1), 0)
  const subtotal = items.reduce((sum, i) => sum + (i.price * (i.quantity || 1)), 0)

  const removeItem = async (uniqueId) => {
    try {
      await window.Snipcart.api.cart.items.remove(uniqueId)
    } catch (e) { console.error(e) }
  }

  const checkout = async () => {
    setChecking(true)
    try {
      await window.Snipcart.api.cart.confirm()
    } catch {
      const token = window.Snipcart?.store?.getState()?.cart?.token
      if (token) window.location.href = `https://app.snipcart.com/checkout`
    }
    setChecking(false)
  }

  return (
    <>
      {/* Floating cart button — always rendered, shows when items exist */}
      <AnimatePresence>
        {count > 0 && !open && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            onClick={() => setOpen(true)}
            className="fixed bottom-6 right-6 z-[800] flex items-center gap-2 bg-orange text-black font-ui text-[11px] font-bold tracking-[.15em] uppercase px-5 py-3 shadow-xl hover:bg-white transition-colors duration-200"
          >
            🛒 {count} {count === 1 ? 'Item' : 'Items'}
          </motion.button>
        )}
      </AnimatePresence>

      {/* Cart drawer */}
      <AnimatePresence>
        {open && (
          <>
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
              className="fixed inset-0 bg-black/70 z-[900]"
            />
            <motion.div
              initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }}
              transition={{ type: 'tween', duration: 0.25 }}
              className="fixed top-0 right-0 h-full w-full max-w-[420px] z-[901] flex flex-col"
              style={{ background: '#08060F', borderLeft: '1px solid rgba(245,101,32,0.2)' }}
            >
              <div className="flex items-center justify-between px-6 py-5 border-b border-white/10">
                <div className="font-display text-[28px] text-white leading-none">Your Cart</div>
                <button onClick={() => setOpen(false)} className="text-cream/40 hover:text-cream text-3xl leading-none transition-colors">&times;</button>
              </div>

              <div className="flex-1 overflow-y-auto px-6 py-4">
                {items.length === 0 ? (
                  <p className="text-cream/40 font-ui text-[13px] mt-8 text-center">Your cart is empty</p>
                ) : (
                  <div className="flex flex-col gap-4">
                    {items.map(item => (
                      <div key={item.uniqueId} className="flex gap-4 py-4 border-b border-white/8">
                        {item.image && <img src={item.image} alt={item.name} className="w-16 h-16 object-cover flex-shrink-0" />}
                        <div className="flex-1 min-w-0">
                          <div className="font-ui text-[13px] font-bold text-white leading-tight">{item.name}</div>
                          {item.customFields?.map(f => (
                            <div key={f.name} className="font-ui text-[10px] text-cream/40 mt-0.5">{f.name}: {f.value}</div>
                          ))}
                          <div className="flex items-center justify-between mt-2">
                            <div className="font-ui text-[11px] text-cream/40">Qty: {item.quantity}</div>
                            <div className="font-display text-[22px] text-orange leading-none">${(item.price * item.quantity).toFixed(2)}</div>
                          </div>
                        </div>
                        <button onClick={() => removeItem(item.uniqueId)} className="text-cream/25 hover:text-orange transition-colors text-sm self-start pt-1">✕</button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {items.length > 0 && (
                <div className="px-6 py-5 border-t border-white/10">
                  <div className="flex items-center justify-between mb-5">
                    <div className="font-ui text-[11px] font-bold tracking-[.15em] uppercase text-cream/50">Subtotal</div>
                    <div className="font-display text-[32px] text-white leading-none">${subtotal.toFixed(2)}</div>
                  </div>
                  <button
                    onClick={checkout}
                    disabled={checking}
                    className="w-full bg-orange text-black font-ui text-[12px] font-bold tracking-[.18em] uppercase py-4 hover:bg-white transition-colors duration-200 disabled:opacity-50"
                  >
                    {checking ? 'Processing...' : 'Proceed to Checkout →'}
                  </button>
                  <button onClick={() => setOpen(false)} className="w-full mt-3 text-cream/40 hover:text-cream font-ui text-[11px] tracking-[.15em] uppercase transition-colors">
                    Continue Shopping
                  </button>
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
