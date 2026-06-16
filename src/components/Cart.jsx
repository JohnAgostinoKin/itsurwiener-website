import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

function getCart() {
  return window.Snipcart?.store?.getState()?.cart || null
}

export default function Cart() {
  const [open, setOpen] = useState(false)
  const [cart, setCart] = useState(null)
  const [checking, setChecking] = useState(false)

  // Subscribe to Snipcart store
  useEffect(() => {
    const init = () => {
      setCart(getCart())
      if (window.Snipcart?.store?.subscribe) {
        return window.Snipcart.store.subscribe(() => setCart(getCart()))
      }
    }

    if (window.Snipcart?.ready) {
      window.Snipcart.ready.then(init)
    } else {
      document.addEventListener('snipcart.ready', init)
    }
    return () => document.removeEventListener('snipcart.ready', init)
  }, [])

  const items = cart?.items?.items || []
  const count = items.reduce((sum, i) => sum + (i.quantity || 1), 0)
  const subtotal = items.reduce((sum, i) => sum + (i.price * (i.quantity || 1)), 0)

  const removeItem = useCallback(async (id) => {
    try {
      await window.Snipcart.api.cart.items.remove(id)
    } catch (e) {
      console.error('Remove error:', e)
    }
  }, [])

  const checkout = useCallback(async () => {
    setChecking(true)
    try {
      await window.Snipcart.api.cart.confirm()
    } catch {
      // Fallback: open hosted checkout
      const token = cart?.token
      if (token) {
        window.open(`https://app.snipcart.com/checkout`, '_blank')
      }
    }
    setChecking(false)
  }, [cart])

  return (
    <>
      {/* Cart trigger button */}
      <button
        onClick={() => setOpen(true)}
        className="fixed bottom-6 right-6 z-[800] flex items-center gap-2 bg-orange text-black font-ui text-[11px] font-bold tracking-[.15em] uppercase px-5 py-3 hover:bg-white transition-colors duration-200 shadow-lg"
        style={{ display: count === 0 ? 'none' : 'flex' }}
      >
        🛒 Cart ({count})
      </button>

      {/* Cart drawer */}
      <AnimatePresence>
        {open && (
          <>
            {/* Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
              className="fixed inset-0 bg-black/70 z-[900]"
            />

            {/* Drawer */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'tween', duration: 0.25 }}
              className="fixed top-0 right-0 h-full w-full max-w-[420px] z-[901] flex flex-col"
              style={{ background: '#08060F', borderLeft: '1px solid rgba(245,101,32,0.2)' }}
            >
              {/* Header */}
              <div className="flex items-center justify-between px-6 py-5 border-b border-white/10">
                <div className="font-display text-[28px] text-white leading-none">Your Cart</div>
                <button onClick={() => setOpen(false)} className="text-cream/40 hover:text-cream text-2xl leading-none transition-colors">&times;</button>
              </div>

              {/* Items */}
              <div className="flex-1 overflow-y-auto px-6 py-4">
                {items.length === 0 ? (
                  <div className="text-cream/40 font-ui text-[13px] mt-8 text-center">Your cart is empty</div>
                ) : (
                  <div className="flex flex-col gap-4">
                    {items.map(item => (
                      <div key={item.uniqueId} className="flex gap-4 py-4 border-b border-white/08">
                        {item.image && (
                          <img src={item.image} alt={item.name} className="w-16 h-16 object-cover flex-shrink-0" style={{ filter: 'brightness(0.9)' }} />
                        )}
                        <div className="flex-1 min-w-0">
                          <div className="font-ui text-[13px] font-bold text-white leading-tight">{item.name}</div>
                          {item.customFields?.map(f => (
                            <div key={f.name} className="font-ui text-[11px] text-cream/40 mt-0.5">{f.name}: {f.value}</div>
                          ))}
                          <div className="flex items-center justify-between mt-2">
                            <div className="font-ui text-[11px] text-cream/40">Qty: {item.quantity}</div>
                            <div className="font-display text-[20px] text-orange leading-none">${(item.price * item.quantity).toFixed(2)}</div>
                          </div>
                        </div>
                        <button
                          onClick={() => removeItem(item.uniqueId)}
                          className="text-cream/25 hover:text-orange transition-colors text-sm leading-none self-start pt-0.5"
                        >✕</button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Footer */}
              {items.length > 0 && (
                <div className="px-6 py-5 border-t border-white/10">
                  <div className="flex items-center justify-between mb-5">
                    <div className="font-ui text-[12px] font-bold tracking-[.15em] uppercase text-cream/50">Subtotal</div>
                    <div className="font-display text-[32px] text-white leading-none">${subtotal.toFixed(2)}</div>
                  </div>
                  <button
                    onClick={checkout}
                    disabled={checking}
                    className="w-full bg-orange text-black font-ui text-[12px] font-bold tracking-[.18em] uppercase py-4 hover:bg-white transition-colors duration-200 disabled:opacity-50"
                  >
                    {checking ? 'Processing...' : 'Proceed to Checkout →'}
                  </button>
                  <button
                    onClick={() => setOpen(false)}
                    className="w-full mt-3 text-cream/40 hover:text-cream font-ui text-[11px] tracking-[.15em] uppercase transition-colors"
                  >
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
