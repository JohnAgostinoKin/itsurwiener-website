import { createContext, useContext, useState, useEffect, useCallback } from 'react'

const CartContext = createContext(null)
const STORAGE_KEY = 'itsurwiener_cart'

function loadCart() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    const parsed = raw ? JSON.parse(raw) : []
    return Array.isArray(parsed) ? parsed : []
  } catch {
    return []
  }
}

export function CartProvider({ children }) {
  const [items, setItems] = useState(loadCart)
  const [isOpen, setIsOpen] = useState(false)

  // Persist to localStorage on every change
  useEffect(() => {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(items)) } catch { /* ignore */ }
  }, [items])

  const openCart = useCallback(() => setIsOpen(true), [])
  const closeCart = useCallback(() => setIsOpen(false), [])

  // Backwards-compatible: any leftover `cart:open` events still open the drawer
  useEffect(() => {
    const handler = () => setIsOpen(true)
    window.addEventListener('cart:open', handler)
    return () => window.removeEventListener('cart:open', handler)
  }, [])

  const addItem = useCallback((item) => {
    setItems(prev => {
      const idx = prev.findIndex(i => i.id === item.id)
      if (idx !== -1) {
        const next = [...prev]
        next[idx] = { ...next[idx], quantity: (next[idx].quantity || 1) + (item.quantity || 1) }
        return next
      }
      const uniqueId = (typeof crypto !== 'undefined' && crypto.randomUUID)
        ? crypto.randomUUID()
        : `${item.id}-${Date.now()}-${Math.random().toString(36).slice(2)}`
      return [...prev, { ...item, quantity: item.quantity || 1, uniqueId }]
    })
    setIsOpen(true)
  }, [])

  const removeItem = useCallback((uniqueId) => {
    setItems(prev => prev.filter(i => i.uniqueId !== uniqueId))
  }, [])

  const updateQty = useCallback((uniqueId, quantity) => {
    setItems(prev => prev.map(i => i.uniqueId === uniqueId ? { ...i, quantity: Math.max(1, quantity) } : i))
  }, [])

  const clear = useCallback(() => setItems([]), [])

  const count = items.reduce((s, i) => s + (i.quantity || 1), 0)
  const subtotal = items.reduce((s, i) => s + (Number(i.price) || 0) * (i.quantity || 1), 0)

  const value = {
    items, count, subtotal,
    isOpen, openCart, closeCart,
    addItem, removeItem, updateQty, clear,
  }

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be used within CartProvider')
  return ctx
}
