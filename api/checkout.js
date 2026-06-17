import Stripe from 'stripe'

// Server-side fallbacks — mirror the hardcoded defaults in your React pages.
const FALLBACK_PRODUCTS = [
  { id: 'tshirt-classic', price: 24.99 }, { id: 'tshirt-litcher', price: 26.99 },
  { id: 'tshirt-gameday', price: 24.99 }, { id: 'hoodie-classic', price: 54.99 },
  { id: 'crewneck-classic', price: 44.99 }, { id: 'hat-snapback', price: 28.99 },
  { id: 'hat-dad', price: 24.99 }, { id: 'sticker-pack', price: 8.99 },
  { id: 'decal-car', price: 6.99 }, { id: 'koozie', price: 7.99 },
  { id: 'pint-glass', price: 14.99 },
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
  if (!pkgName) return null
  const packages = doc?.packages?.length ? doc.packages : fallback
  const pkg = packages.find(p => p.name === pkgName)
  if (!pkg) return null
  let price = Number(pkg.price) || 0
  const variables = doc?.variables || []
  const addOns = [...String(item.description || '').matchAll(/· Add-on: ([^·]+)/g)].map(m => m[1].trim())
  for (const name of addOns) {
    const v = variables.find(x => x.name === name)
    if (v) price += Number(v.price) || 0
  }
  return price
}

export default async function handler(req, res) {
  try {
    if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' })

    const { items } = req.body || {}
    if (!Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ error: 'No items in cart' })
    }

    for (const item of items) {
      const qty = Number(item.quantity ?? 1)
      if (typeof item.name !== 'string' || !item.name.trim()) {
        return res.status(400).json({ error: 'Invalid item name' })
      }
      if (!Number.isInteger(qty) || qty < 1 || qty > 100) {
        return res.status(400).json({ error: 'Invalid item quantity' })
      }
    }

    // Lazy import so a load failure surfaces as JSON, not a module crash
    const { createClient } = await import('@sanity/client')
    const sanity = createClient({
      projectId: 'dwoifffe',
      dataset: 'production',
      apiVersion: '2024-01-01',
      useCdn: false,
    })

    let products, tableDoc, vipDoc
    try {
      [products, tableDoc, vipDoc] = await Promise.all([
        sanity.fetch(`*[_type == "product"]{ "id": _id, name, price, denominations }`),
        sanity.fetch(`*[_type == "tableReservation"][0]{ packages, variables }`),
        sanity.fetch(`*[_type == "vipReservation"][0]{ packages, variables }`),
      ])
    } catch (e) {
      console.error('Sanity fetch failed:', e.message)
      return res.status(503).json({ error: 'Could not verify pricing. Please try again.' })
    }
    const productList = products?.length ? products : FALLBACK_PRODUCTS

    const lineItems = []
    for (const item of items) {
      const id = String(item.id || '')
      const name = String(item.name || '')

      let expected
      if (id.startsWith('table-') || name.startsWith('Table Reservation')) {
        expected = resolveReservation(item, tableDoc, FALLBACK_TABLE)
      } else if (id.startsWith('vip-') || name.startsWith('VIP Reservation')) {
        expected = resolveReservation(item, vipDoc, FALLBACK_VIP)
      } else {
        expected = resolveMerch(id, productList)
      }

      if (expected === null || !Number.isFinite(expected) || expected <= 0) {
        return res.status(400).json({ error: `Unrecognized item: ${name}` })
      }
      if (cents(item.price) !== cents(expected)) {
        return res.status(400).json({ error: `Price mismatch on ${name}` })
      }

      lineItems.push({
        price_data: {
          currency: 'usd',
          product_data: {
            name,
            ...(typeof item.image === 'string' && /^https?:\/\//.test(item.image) ? { images: [item.image] } : {}),
          },
          unit_amount: cents(expected),
        },
        quantity: Number(item.quantity) || 1,
      })
    }

    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: lineItems,
      mode: 'payment',
      success_url: `${req.headers.origin}/merch?order=success`,
      cancel_url: `${req.headers.origin}/merch`,
      shipping_address_collection: { allowed_countries: ['US'] },
    })
    return res.status(200).json({ url: session.url })
  } catch (err) {
    console.error('Checkout error:', err)
    return res.status(500).json({ error: err.message || 'Checkout failed' })
  }
}