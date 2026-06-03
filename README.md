# itsurwiener Website

**Clemson's Destination Entertainment Complex**
Built with Vite + React + Tailwind CSS + Framer Motion

---

## Stack

| Layer       | Tool                          |
|-------------|-------------------------------|
| Build       | Vite 5                        |
| Framework   | React 18                      |
| Routing     | React Router v6               |
| Styling     | Tailwind CSS v3               |
| Animation   | Framer Motion                 |
| CMS         | Sanity.io (add when ready)    |
| Ecommerce   | Snipcart (add when ready)     |
| Payments    | Stripe (add when ready)       |

---

## Quick Start

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

---

## Project Structure

```
src/
├── components/
│   ├── Nav.jsx           # Sticky navigation + mobile menu
│   ├── Footer.jsx        # Site footer
│   ├── Ticker.jsx        # Scrolling text bands
│   ├── Cursor.jsx        # Custom cursor
│   └── ui/
│       └── index.jsx     # Button, SectionEyebrow, Reveal, StatCard, etc.
├── pages/
│   ├── Home.jsx          # Landing page (built section by section)
│   ├── Venues.jsx        # All 5 venues
│   ├── GameDay.jsx       # Football season page
│   ├── Litcher.jsx       # The Litcher® brand page
│   ├── Basement.jsx      # The Basement nightclub
│   ├── Menu.jsx          # Food & drinks menu
│   ├── Merch.jsx         # Merch shop (Snipcart)
│   ├── Events.jsx        # Private events + booking form
│   └── NotFound.jsx      # 404
├── hooks/
│   └── useScrollReveal.js  # Intersection observer + counter hooks
├── data/
│   ├── menu.js           # Menu items (replace with Sanity when ready)
│   ├── merch.js          # Merch items
│   └── venues.js         # Venue details
├── assets/               # Images, icons, fonts
├── App.jsx               # Router config
├── main.jsx              # React entry point
└── index.css             # Global styles + Tailwind directives
```

---

## Brand Colors

| Name     | Hex       | Tailwind class   |
|----------|-----------|------------------|
| Orange   | `#F56520` | `text-orange`    |
| Purple   | `#522D80` | `text-purple`    |
| Purple B | `#9D4EDD` | `text-purple-bright` |
| Black    | `#04030A` | `bg-black`       |
| Cream    | `#F0EAD6` | `text-cream`     |

---

## Adding Snipcart (Merch/Ecommerce)

1. Sign up at [snipcart.com](https://snipcart.com)
2. Add your API key to `.env.local`:
   ```
   VITE_SNIPCART_KEY=your_public_api_key
   ```
3. Add the Snipcart script to `index.html`
4. Add `data-item-*` attributes to product buttons in `Merch.jsx`

---

## Adding Sanity (CMS)

1. `npm create sanity@latest` in a `/studio` subdirectory
2. Add schemas for: `menuItem`, `merchandise`, `venue`, `event`, `photo`
3. Replace static data in `/src/data/` with Sanity queries

---

## Deployment

Recommended: **Vercel** (zero config for Vite/React)
```bash
npx vercel
```

Or **Netlify**:
```bash
npx netlify deploy --prod --dir=dist
```
