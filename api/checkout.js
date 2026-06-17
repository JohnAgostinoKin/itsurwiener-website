import Stripe from 'stripe'
import { createClient } from '@sanity/client'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

const sanity = createClient({
  projectId: 'dwoifffe',
  dataset: 'production',
  apiVersion: '2024-01-01',
  useCdn: false, // always pull fresh prices for validation
})

// Server-side fallbacks — mirror the hardcoded defaults in your React pages
// so legit orders still validate if Sanity is empty.
const FALLBACK_PRODUCTS = [
  { id: 'tshirt-classic', price: 24.99 }, { id: 'tshirt-litcher', price: 26.99 },
  { id: 'tshirt-gameday', price: 24.99 }, { id: 'hoodie-classic', price: 54.99 },
  { id: 'crewneck-classic', price: 44.99 }, { id: 'hat-snapback', price: 28.99 },
  { id: 'hat-dad', price: 24.99 }, { id: 'sticker-pack', price: 8.99 },
  { id: 'decal-car', price: 6.99 }, { id: 'koozie', price: 7.99 },
  { id: 'pint-glass', price: 14.99 }, { id: 'gift-card-25', price: 25 },
  { id: 'gift-card-50', price: 50 }, { id: 'gift-card-100', price: 100 },
]
const FALLBACK_TABLE = [
  { name: 'Standard Table', price: 25 }, { name: 'Game Day Table', price: 50 },
  { name: 'Large Group Table', price: 100 },
]
const FALLBACK_VIP = [
  { name: 'VIP Small', price: 150 }, { name: 'VIP Large', price: 300 },
  { name: 'Full VIP Section', price: 500 },
]
const GIFT_CARD_AMOUNTS = [10, 25, 50, 100, 500]

const cents = n => Math.round(Number(n) * 100)

function resolveMerch(id, products) {
  let match = null
  for (const p of products) {
    if (!p.id) continue
    if (id === p.id || id.startsWith(p.id + '-')) {
      if (!match || p.id.length > match.id.length) match = p
    }
  }
  if (match) return match.price
  // GiftCardSelector flow: gift-card-<amount>
  const gc = id.match(/^gift-card-(\d+(?:\.\d+)?)$/)
  if (gc) {
    const amt = Number(gc[1])
    const withDenoms = products.find(p => Array.isArray(p.denominations) && p.denominations.map(Number).includes(amt))
    if (withDenoms || GIFT_CARD_AMOUNTS.includes(amt)) return amt
  }
  return null
}

function resolveReservation(item, doc, fallback) {
  const pkgName = String(item.name || '').split('—').slice(1).join('—').trim()
  if (!pkgName)