import { useState, useEffect } from 'react'
import { client } from '@/lib/sanity'
import PageCTA from '@components/PageCTA'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

// ── Category images — drop files into public/images/menu/
const categoryImages = {
  starters:    '/images/menu/starters.jpg',
  dogs:        '/images/menu/dogs.jpg',
  burgers:     '/images/burger.jpg',
  smashburgers:'/images/menu/smashburgers.jpg',
  chicken:     '/images/tenders.jpg',
  frypies:     '/images/menu/frypies.jpg',
  tacos:       '/images/menu/tacos.jpg',
  combos:      '/images/menu/combos.jpg',
  sides:       '/images/fries.jpg',
  desserts:    '/images/menu/desserts.jpg',
}

// ── MENU DATA ────────────────────────────────────────────────────
const menu = {
  starters: {
    label: 'Starters', icon: '⚡', color: '#F56520',
    showcase: {
      name: 'Build Your Own Chips-N-Dip Platter',
      desc: 'Warm Tortilla Chips with your choice of <strong style="color:#9D4EDD">Queso</strong>, <strong style="color:#9D4EDD">Spinach Dip</strong>, or <strong style="color:#9D4EDD">Buffalo Chicken Dip</strong>. All homemade and delicious. Choose one, two, or all three!',
      tiers: [
        { label: 'Choose One',       price: '$10.99' },
        { label: 'Choose Two',       price: '$14.99' },
        { label: 'Choose All Three', price: '$18.99' },
      ]
    },
    items: [
      { name: 'Fried Pickles',          price: 'Sm $8.99 / Lg $12.99', desc: 'Golden-fried dill pickle chips with your choice of dipping sauce.' },
      { name: 'Fried Mozz Sticks',      price: '6 Pc $9.99 / 10 Pc $13.99', desc: 'Crispy breaded mozzarella sticks, hot and stringy. Served with marinara.' },
      { name: 'Pretzels & Beer Cheese', price: '$9.99', desc: 'Warm soft pretzels served with our house-made beer cheese dip.' },
      { name: 'Pretzel Trio',           price: '$14.99', desc: '3 Soft Pretzels served with Beer Cheese, Queso Cheese, and Hot Honey Mustard.', badge: 'Fan Fave' },
      { name: 'Popcorn Chicken',        price: 'Sm $9.99 / Lg $14.99', desc: 'Bite-sized crispy chicken pieces fried to perfection. Great for sharing.' },
      { name: 'Thin-Cut Onion Rings',   price: 'Sm $9.99 / Lg $13.99', desc: 'Light, crispy, perfectly seasoned thin-cut onion rings.' },
      { name: 'Spinach Artichoke Dip',  price: '$11.99', desc: 'Creamy hot spinach and artichoke dip served with tortilla chips.' },
      { name: 'Build Your Own Nachos',  price: '$13.99', desc: 'Loaded nachos your way with 100+ toppings.', addons: [{label:'Add Tenders (Grilled, Fried, Buffalo or Blackened)', price:'+$5.99'},{label:'Add Bacon Bits (Lg)', price:'+$5.99'}] },
    ]
  },
  dogs: {
    label: 'Famous Dogs', icon: '🌭', color: '#9D4EDD',
    note: 'All dogs served with Unlimited Toppings — 100+ to choose from',
    dogsHero: {
      sizes: [
        { label: 'All Beef Dog', price: '$5.49', desc: 'Our classic all-beef frank with unlimited toppings.' },
        { label: '2 Dog Deal',   price: '$9.99', desc: 'Two all-beef franks — best deal on the menu.' },
        { label: 'Jumbo Dog',    price: '$6.99', desc: 'A bigger, bolder frank for serious dog lovers.' },
      ]
    },
    items: [
      { name: 'Bird Dog',        price: '$5.99', desc: 'Savory chicken sausage with unlimited toppings.' },
      { name: 'Italian Sausage', price: '$6.99', desc: 'Grilled Italian sausage — choose Mild or Hot. Goes great with beer cheese and peppers.' },
      { name: 'Corn Dog',        price: '$5.99', desc: 'Classic deep-fried corn dog. A timeless favorite.' },
      { name: 'Bratwurst',       price: '$6.99', desc: 'German-style bratwurst grilled perfectly. Goes great with beer cheese.' },
    ],
    basket: { price: '+$5.99', sub: 'Substitute Tots or Sweet Potato Fries for $1' },
    categoryAddons: [
      { label: 'Sub Gluten Free Bun', price: '+$1.50' },
    ],
    extras: []
  },
  burgers: {
    label: 'Burgers', icon: '🍔', color: '#F56520',
    note: '100% Fresh Ground Beef · ½ LB Hand-Formed · Unlimited Toppings',
    basket: { price: '+$5.99', sub: 'Substitute Tots or Sweet Potato Fries for $1' },
    categoryAddons: [
      { label: 'Sub Gluten Free Bun',   price: '+$1.50' },
      { label: 'Sub Plant-Based Patty', price: '+$1.00' },
      { label: 'Add Cheese',            price: '+$0.99' },
      { label: 'Add Bacon',             price: '+$2.99' },
      { label: 'Double Meat',           price: '+$3.99' },
    ],
    categoryOptions: [
      { groupLabel: 'Cheese Options', options: ['American','Cheddar','Swiss','Pepper Jack','Provolone'] },
    ],
    items: [
      { name: 'Classic Burger',        price: '$9.99',  desc: 'Half-pound of fresh-ground beef your way. Add Cheese +.99 · Bacon +2.99 · Double Meat +3.99' },
      { name: 'Mushroom Swiss Burger', price: '$11.99', desc: 'Juicy burger topped with sautéed mushrooms and melted Swiss cheese.' },
      { name: 'Pub Burger',            price: '$12.99', desc: 'Loaded with crispy thin-cut onion rings and our house beer cheese sauce.' },
      { name: 'Hawaiian Burger',       price: '$11.99', desc: 'Pepper Jack cheese and grilled pineapple for a sweet and spicy combo.' },
      { name: 'Barnyard Burger',       price: '$12.99', desc: 'Our classic burger topped with hand-battered chicken tenders. A crowd favorite.' },
      { name: 'Fried Pickle Burger',   price: '$11.99', desc: 'Stacked high with crispy fried dill pickles and all the fixings.' },
    ],
    extras: []
  },
  smashburgers: {
    label: 'SmashBurgers', icon: '💪', color: '#9D4EDD',
    note: '⅓ Pound Fresh Smashed Ground Beef · Unlimited Toppings',
    basket: { price: '+$5.99', sub: 'Substitute Tots or Sweet Potato Fries for $1' },
    categoryAddons: [
      { label: 'Sub Gluten Free Bun',  price: '+$1.50' },
      { label: 'Add Cheese',           price: '+$0.99' },
      { label: 'Add Bacon',            price: '+$2.99' },
      { label: 'Double Smash Patty',   price: '+$3.99' },
    ],
    categoryOptions: [
      { groupLabel: 'Cheese Options', options: ['American','Cheddar','Swiss','Pepper Jack','Provolone'] },
    ],
    items: [
      { name: 'Classic Smash',        price: '$9.99',  desc: 'Fresh smash patty with American cheese and unlimited toppings.' },
      { name: 'Bacon Smash',          price: '$11.99', desc: 'Fresh smash patty with American cheese, crispy bacon and unlimited toppings.' },
      { name: 'Spicy Smash',          price: '$12.99', desc: 'Fresh smash patty with Pepper Jack cheese, sliced jalapeños, and spicy mayo. Turn up the heat!' },
      { name: 'Double Smash',         price: '$13.99', desc: 'Two fresh smash patties, American cheese and unlimited toppings.' },
      { name: 'BBQ Smash',            price: '$12.99', desc: 'Fresh smash patty with Cheddar cheese, choice of Reg, Gold, or Sweet BBQ sauce, and unlimited toppings.' },
      { name: 'Mushroom Swiss Smash', price: '$12.99', desc: 'Fresh smash patty with Swiss cheese and unlimited toppings.' },
    ]
  },
  melts: {
    label: 'Grilled Melts', icon: '🧀', color: '#F56520',
    note: 'All Melts Served on Grilled Texas Toast',
    basket: { price: '+$5.99', sub: 'Substitute Tots or Sweet Potato Fries for $1' },
    items: [
      { name: 'Classic Melt',        price: '$6.99', desc: 'Yellow and White American Cheese on Texas Toast.' },
      { name: 'Three Cheese Melt',   price: '$7.99', desc: 'Cheddar, White American and Swiss on Texas Toast.' },
      { name: 'Fried Pickle Melt',   price: '$8.99', desc: 'Yellow and White American with crispy fried pickles inside.' },
      { name: 'Bacon Cheddar Melt',  price: '$9.99', desc: 'Loaded with Bacon and Cheddar Cheese.' },
      { name: 'Smashed Tots Melt',   price: '$9.99', desc: 'Yellow and White American with smashed tater tots inside.' },
    ]
  },
  chicken: {
    label: 'Chicken', icon: '🍗', color: '#F56520',
    note: "Clemson's Best · Hand-Battered & Deep Fried to Order",
<<<<<<< HEAD
    showcase: { name: 'Chicken & Waffle', price: '10.99', desc: 'Five crispy hand-battered tenders on a golden waffle. Clemson comfort food at its finest.' },
=======
    showcase: { name: 'Chicken & Waffle', price: '12.99', desc: 'A crispy hand-battered tender on a golden waffle. Clemson comfort food at its finest.' },
>>>>>>> d2ddbf8fc7fe1ce76e27344e08810823083ea83f
    chickenCards: true,
    tenders: {
      title: "Clemson's Best Chicken Tenders",
      desc: 'Hand-battered and deep-fried to golden perfection. The best tenders in Clemson — period.',
      sizes: [
        { label: '5 Tenders',  price: '$7.99' },
        { label: '10 Tenders', price: '$12.99' },
        { label: '20 Tenders', price: '$22.99' },
        { label: '50 Tenders', price: '$52.99' },
      ]
    },
    boneless: {
      title: 'Boneless Wings',
      desc: 'Crispy boneless chicken tossed in your choice of 8 wet sauces or 4 dry rubs. Great for sharing.',
      sizes: [
        { label: '6 Piece',  price: '$7.99' },
        { label: '12 Piece', price: '$12.99' },
        { label: '25 Piece', price: '$24.99' },
        { label: '50 Piece', price: '$49.99' },
      ]
    },
    wings: {
      title: 'Bone-In Wings',
      desc: 'Traditional bone-in wings with crispy skin. Tossed in your choice of sauce or dry rub.',
      sizes: [
        { label: '6 Piece',  price: '$8.99' },
        { label: '12 Piece', price: '$14.99' },
      ]
    },
    flavors: {
      wet: ['Buffalo','Teryaki','Hot Honey Mustard','BBQ','Carolina Heat','Sweet Chili Garlic','Parmesan Peppercorn','Nashville Hot'],
      dry: ['Cajun','Lemon Pepper','Ranch','Old Bay']
    }
  },
  frypies: {
    label: 'Fry Pies', icon: '🥧', color: '#9D4EDD',
    note: 'A Pie Made With Our Famous Fresh-Cut-Fries!',
    items: [
      { name: 'Chili & Cheese Fry Pie',     price: '$12.99', desc: 'Homemade chili piled on fresh-cut fries with Ched-Jack cheese, chopped onion, and hot honey mustard.' },
      { name: 'Pulled Pork Fry Pie',        price: '$13.99', desc: 'Slow-cooked pulled pork over fresh fries, Ched-Jack cheese, and our triple BBQ sauce.' },
      { name: 'Buffalo Chicken Fry Pie',    price: '$14.99', desc: 'Spicy buffalo popcorn chicken over fries with Ched-Jack cheese and garlic aioli.' },
      { name: 'Bacon Cheeseburger Fry Pie', price: '$15.99', desc: 'Burger meat, crispy bacon, Ched-Jack cheese, and pickles piled on our fresh-cut fries.' },
      { name: 'Fried Cheese Fry Pie',       price: '$14.99', desc: 'Fried Mozzarella Sticks and Marinara Sauce over our fresh-cut fries.' },
    ]
  },
  tacos: {
    label: 'Tacos', icon: '🌮', color: '#F56520',
    note: 'With Unlimited Toppings',
    items: [
      { name: 'Build-Your-Own Tacos', price: '3 for $10.99', desc: 'Three tacos loaded with your choice of toppings from our 100+ topping bar.' },
      { name: 'Pulled Pork Tacos',   price: '3 for $15.99', desc: 'Three tacos loaded with slow-cooked pulled pork and fresh toppings.' },
    ]
  },
  combos: {
    label: 'Super Combos', icon: '💥', color: '#9D4EDD',
    note: 'With Unlimited Toppings — Best Deals on the Menu',
    items: [
      { name: 'THE OG',       price: '$16.99', desc: 'Half-pound fresh burger, an all-beef dog, and a full order of loaded fries. The original combo.', badge: 'Best Value' },
      { name: 'THE SMASH OG', price: '$15.99', desc: 'Fresh SmashBurger with American cheese, an all-beef dog, and a full order of loaded fries.' },
      { name: 'THE AP',       price: '$13.99', desc: '3 hand-battered chicken tenders, 3 fried mozz sticks, and a soft pretzel with beer cheese.' },
      { name: 'THE TRIPLE D', price: '$15.99', desc: 'Three dogs — all-beef, corn dog, and bird dog — served with a full order of loaded fries.' },
    ]
  },
  sides: {
    label: 'Sides & Salads', icon: '🥗', color: '#F56520',
    items: [
      { name: 'Fresh-Cut Fries',    price: 'Reg $5.99 / Lg $10.99', desc: 'Hand-cut and fried in 100% peanut oil.', addons: [{label:'Add Toppings (Sm)', price:'+$2.99'},{label:'Add Toppings (Lg)', price:'+$5.99'},{label:'Add Bacon Bits (Sm)', price:'+$2.99'},{label:'Add Bacon Bits (Lg)', price:'+$5.99'}] },
      { name: 'Tater Tots',         price: 'Reg $6.99 / Lg $11.99', desc: 'Crispy golden tater tots.', addons: [{label:'Add Toppings (Sm)', price:'+$2.99'},{label:'Add Toppings (Lg)', price:'+$5.99'},{label:'Add Bacon Bits (Sm)', price:'+$2.99'},{label:'Add Bacon Bits (Lg)', price:'+$5.99'}] },
      { name: 'Sweet Potato Fries', price: 'Reg $6.99 / Lg $11.99', desc: 'Sweet and crispy sweet potato fries.', addons: [{label:'Add Toppings (Sm)', price:'+$2.99'},{label:'Add Toppings (Lg)', price:'+$5.99'},{label:'Add Bacon Bits (Sm)', price:'+$2.99'},{label:'Add Bacon Bits (Lg)', price:'+$5.99'}] },
      { name: 'House Salad',        price: '$9.99',  desc: 'Fresh house salad with unlimited toppings.', addons: [{label:'Add Tenders (Grilled, Fried, Buffalo or Blackened)', price:'+$5.99'},{label:'Add Bacon Bits (Lg)', price:'+$5.99'}] },
      { name: 'Taco Salad',         price: '$10.99', desc: 'Our signature taco salad with unlimited toppings.', addons: [{label:'Add Tenders (Grilled, Fried, Buffalo or Blackened)', price:'+$5.99'},{label:'Add Bacon Bits (Lg)', price:'+$5.99'}] },
      { name: 'Side Salad',         price: '$4.99',  desc: 'A simple fresh side salad — the perfect lighter option.', addons: [{label:'Add Bacon Bits (Sm)', price:'+$2.99'}] },
    ]
  },
  desserts: {
    label: 'Desserts', icon: '🍩', color: '#9D4EDD',
    note: 'Not Available On Game Days',
    items: [
      { name: 'Hot Donuts', price: '$4.99', desc: 'Fresh hot donuts made to order. The perfect sweet finish to your meal. Not available on game days.' },
    ]
  }
}

const categoryOrder = ['starters','dogs','burgers','smashburgers','melts','chicken','frypies','tacos','combos','sides','desserts']
const categories = [
  ...categoryOrder.filter(k => k !== 'toppings').map(key => ({ key, label: menu[key].label })),
  { key: 'toppings', label: 'Toppings' }
]

// ── ITEM CARD ─────────────────────────────────────────────────────
function ItemCard({ item, color, index }) {
  const isEven = index % 2 === 0
  return (
    <motion.div
      className="rounded-sm overflow-hidden border border-white/[0.06] hover:border-orange/25 transition-all duration-300 group"
      style={{ background: isEven ? 'rgba(255,255,255,0.03)' : 'rgba(255,255,255,0.05)' }}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: (index % 4) * 0.05 }}
    >
      <div className="p-5">
        <div className="flex items-start justify-between gap-3 mb-2">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="font-cond text-[22px] font-black text-white uppercase tracking-wide leading-none group-hover:text-orange/90 transition-colors duration-200">{item.name}</span>
            {item.badge && (
              <span className="font-ui text-[9px] font-bold tracking-[.15em] uppercase px-2 py-0.5 rounded-sm" style={{ background: color, color: '#04030A' }}>{item.badge}</span>
            )}
          </div>
          <span className={`flex-shrink-0 leading-none mt-0.5 ${item.price?.includes('/') ? 'font-cond text-[15px] font-bold text-right' : 'font-display text-[26px]'}`} style={{ color }}>{item.price}</span>
        </div>
        {item.desc && <p className="text-[13px] text-cream/80 leading-[1.65]">{item.desc}</p>}
        {item.addons?.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-2">
            {item.addons.map((a,i) => (
              <span key={i} className="font-ui text-[11px] border border-white/10 px-2 py-0.5 text-cream/55">
                {a.label} <span className="text-orange">{a.price}</span>
              </span>
            ))}
          </div>
        )}
      </div>
      <div className="h-[2px] w-0 group-hover:w-full transition-all duration-500" style={{ background: color }} />
    </motion.div>
  )
}

// ── DOGS HERO CARD ────────────────────────────────────────────────
function DogsHeroCard({ data, color }) {
  return (
    <div className="rounded-sm border-2 p-7 mb-4 hover:border-orange/50 transition-all duration-300" style={{ borderColor: color, background: 'rgba(157,78,221,0.06)' }}>
      <div className="text-center mb-6">
        <h3 className="font-display leading-none mb-1" style={{ fontSize: 'clamp(32px,4vw,52px)', color }}>All Beef Dogs</h3>
        <p className="text-[13px] text-cream/65">Our signature all-beef franks — grilled to order with unlimited toppings</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {data.sizes.map(({ label, price, desc }) => (
          <div key={label} className="text-center border border-white/10 px-5 py-5 hover:border-orange/30 transition-colors duration-200" style={{ background: 'rgba(255,255,255,0.03)' }}>
            <div className="font-display text-[clamp(20px,2.5vw,30px)] text-white mb-1 leading-none">{label}</div>
            <div className="font-display text-[clamp(36px,5vw,56px)] leading-none mb-2" style={{ color }}>{price}</div>
            <div className="font-ui text-[11px] text-cream/50 leading-snug">{desc}</div>
          </div>
        ))}
      </div>
      <PageCTA />
    </div>
  )
}

// ── CHICKEN SIZE CARD ─────────────────────────────────────────────
function ChickenCard({ title, desc, sizes, color }) {
  return (
    <div className="rounded-sm border border-white/[0.08] p-6 hover:border-orange/25 transition-all duration-300" style={{ background: 'rgba(255,255,255,0.04)' }}>
      <div className="flex flex-col md:flex-row md:items-start gap-6">
        <div className="flex-1">
          <h3 className="font-display text-[clamp(32px,4vw,56px)] leading-none mb-2" style={{ color }}>{title}</h3>
          <p className="text-[13px] text-cream/80 leading-relaxed max-w-[480px]">{desc}</p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 flex-shrink-0">
          {sizes.map(({ label, price }) => (
            <div key={label} className="text-center border border-white/10 px-4 py-3 hover:border-orange/30 transition-colors duration-200" style={{ background: 'rgba(255,255,255,0.03)' }}>
              <div className="font-ui text-[11px] tracking-[.1em] uppercase text-cream/80 mb-1">{label}</div>
              <div className="font-display text-[28px] leading-none" style={{ color }}>{price}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

// ── SECTION ───────────────────────────────────────────────────────
function MenuSection({ id, data }) {
  const img = categoryImages[id]
  return (
    <motion.div id={id} className="mb-20 scroll-mt-28"
      initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }} transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}>

      {/* Category header with image */}
      <div className="relative overflow-hidden mb-8 rounded-sm" style={{ height: '200px' }}>
        {img && (
          <img src={img} alt={data.label} className="absolute inset-0 w-full h-full object-cover" style={{ filter: 'brightness(0.45) saturate(1.1)' }} />
        )}
        <div className="absolute inset-0" style={{ background: img ? `linear-gradient(90deg, rgba(4,3,10,0.95) 30%, rgba(4,3,10,0.3) 100%)` : `linear-gradient(135deg,${data.color}22,rgba(4,3,10,0.9))` }} />

        <div className="absolute inset-0 flex flex-col justify-center px-8">
          <h2 className="font-display leading-none" style={{ fontSize: 'clamp(44px,6vw,80px)', color: data.color }}>
            {data.label}{data.label === 'Fry Pies' && <sup style={{fontSize:'0.13em',verticalAlign:'top',fontFamily:'Space Grotesk,sans-serif',fontWeight:700,color:'rgba(157,78,221,0.85)'}}>TM</sup>}
          </h2>
          {data.note && <p className="font-ui text-[11px] text-cream/75 tracking-[.12em] uppercase mt-2">{data.note}</p>}
        </div>
        {data.gameday && (
          <div className="absolute top-0 right-0 font-ui text-[9px] font-bold tracking-[.15em] uppercase px-3 py-1.5" style={{ background: '#F56520', color: '#04030A' }}>No Game Days</div>
        )}
      </div>

      {/* Showcase card */}
      {data.showcase && (
        <div className="mb-6 relative overflow-hidden rounded-sm border-2" style={{ borderColor: data.color, background: 'rgba(4,3,10,0.8)' }}>
          {data.showcase.badge && <div className="absolute top-0 right-0 font-ui text-[9px] font-bold tracking-[.15em] uppercase px-3 py-1.5" style={{ background: '#F56520', color: '#04030A' }}>{data.showcase.badge}</div>}
          <div className="p-6">
            <div className="font-ui text-[11px] font-bold tracking-[.2em] uppercase mb-1" style={{ color: data.color }}>Featured Item</div>
            <div className="font-display text-[clamp(28px,3.5vw,48px)] text-white leading-none mb-3">{data.showcase.name}</div>
            <p className="text-[13px] text-cream/80 mb-5 max-w-[600px] leading-relaxed" dangerouslySetInnerHTML={{ __html: data.showcase.desc }} />
            {data.showcase.tiers ? (
              <div className="flex flex-wrap gap-3">
                {data.showcase.tiers.map(t => (
                  <div key={t.label} className="border px-5 py-3 text-center" style={{ borderColor: `${data.color}55`, background: `${data.color}11` }}>
                    <div className="font-ui text-[10px] font-bold tracking-[.12em] uppercase text-cream/60 mb-1">{t.label}</div>
                    <div className="font-display text-[32px] leading-none" style={{ color: data.color }}>{t.price}</div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="font-display text-[clamp(52px,7vw,88px)] flex-shrink-0" style={{ color: data.color }}>${data.showcase.price}</div>
            )}
          </div>
        </div>
      )}

      {/* Dogs hero card */}
      {data.dogsHero && <DogsHeroCard data={data.dogsHero} color={data.color} />}

      {/* Item cards grid */}
      {data.chickenCards ? (
        <div className="flex flex-col gap-4">
          {/* Tenders card */}
          <ChickenCard title={data.tenders.title} desc={data.tenders.desc} sizes={data.tenders.sizes} color={data.color} />
          {/* Boneless Wings card */}
          <ChickenCard title={data.boneless.title} desc={data.boneless.desc} sizes={data.boneless.sizes} color="#9D4EDD" />
          {/* Wings card */}
          <ChickenCard title={data.wings.title} desc={data.wings.desc} sizes={data.wings.sizes} color={data.color} />
          {/* Wing Flavors card */}
          <div className="rounded-sm px-6 py-5" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)' }}>
            <div className="font-ui text-[11px] font-bold tracking-[.2em] uppercase text-cream/40 mb-4">Wing Flavors — Available on Bone-In and Boneless</div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <div className="font-ui text-[10px] tracking-[.18em] uppercase text-orange/60 mb-2">Wet Sauces</div>
                <p className="text-[13px] text-cream/65 leading-relaxed">{data.flavors.wet.join(' · ')}</p>
              </div>
              <div>
                <div className="font-ui text-[10px] tracking-[.18em] uppercase text-cream/40 mb-2">Dry Rubs</div>
                <p className="text-[13px] text-cream/65 leading-relaxed">{data.flavors.dry.join(' · ')}</p>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {data.items.map((item, i) => <ItemCard key={item.name} item={item} color={data.color} index={i} />)}
        </div>
      )}

      {/* Extras */}
      {data.extras?.map((ex, i) => (
        <div key={i} className="mt-3 border border-orange/20 px-5 py-3 flex items-center justify-between gap-4 rounded-sm" style={{ background: 'rgba(245,101,32,0.04)' }}>
          <span className="text-[13px] text-cream/80">{ex.text}</span>
          <div className="text-right flex-shrink-0">
            <span className="font-display text-[22px] text-orange">{ex.price}</span>
            {ex.sub && <div className="text-[11px] text-cream/65">{ex.sub}</div>}
          </div>
        </div>
      ))}

      {/* Basket callout */}
      {data.basket && (
        <div className="mt-4 border-2 border-orange/30 px-6 py-5 rounded-sm flex items-center justify-between gap-6 flex-wrap" style={{ background: 'rgba(245,101,32,0.06)' }}>
          <div>
            <div className="font-display text-[clamp(24px,3vw,40px)] text-white leading-none">Make it a Basket</div>
            <div className="font-ui text-[14px] text-cream/70 mt-1">Add Fresh-Cut Fries to any item</div>
            <div className="font-ui text-[13px] text-orange/80 mt-1 tracking-wide">{data.basket.sub}</div>
          </div>
          <div className="font-display text-[clamp(40px,6vw,72px)] text-orange flex-shrink-0">{data.basket.price}</div>
        </div>
      )}

      {/* Category-wide Add-ons */}
      {data.categoryAddons?.length > 0 && (
        <div className="mt-4 rounded-sm border border-white/[0.06] px-5 py-4" style={{ background: 'rgba(255,255,255,0.03)' }}>
          <div className="font-ui text-[10px] font-bold tracking-[.2em] uppercase text-orange/70 mb-3">Add-ons Available on Any Item</div>
          <div className="flex flex-wrap gap-3">
            {data.categoryAddons.map((a, i) => (
              <div key={i} className="flex items-center gap-2 border border-white/10 px-3 py-2 rounded-sm">
                <span className="font-cond text-[15px] font-bold text-white">{a.label}</span>
                <span className="font-display text-[16px] text-orange">{a.price}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Category-wide Options (e.g. Cheese Choices) */}
      {data.categoryOptions?.length > 0 && data.categoryOptions.map((group, i) => (
        <div key={i} className="mt-3 rounded-sm border border-white/[0.06] px-5 py-4" style={{ background: 'rgba(255,255,255,0.03)' }}>
          <div className="font-ui text-[10px] font-bold tracking-[.2em] uppercase text-cream/40 mb-2">{group.groupLabel}</div>
          <div className="flex flex-wrap gap-2">
            {group.options.map(opt => (
              <span key={opt} className="font-ui text-[12px] border border-white/10 px-3 py-1 text-cream/65">{opt}</span>
            ))}
          </div>
        </div>
      ))}

      {/* Category-wide Variants */}
      {data.categoryVariants?.length > 0 && (
        <div className="mt-3 rounded-sm border border-white/[0.06] px-5 py-3" style={{ background: 'rgba(255,255,255,0.03)' }}>
          <div className="font-ui text-[10px] font-bold tracking-[.2em] uppercase text-cream/40 mb-2">Available Styles</div>
          <p className="text-[13px] text-cream/65">{data.categoryVariants.join(' · ')}</p>
        </div>
      )}
    </motion.div>
  )
}


// ── TOPPINGS SECTION ─────────────────────────────────────────────
function ToppingsSection() {
  const toppings = [
    'Ketchup','Yellow Mustard','Brown Mustard','Dijon Mustard','Honey Mustard','Hot Honey Mustard',
    'Mayo','Spicy Mayo','Old Bay Mayo','Roasted Pepper Mayo','Cilantro Lime Mayo','Garlic Aioli',
    'Horseradish Sauce','Itsurwiener Sauce','BBQ Sauce','Sweet BBQ Sauce','Mustard BBQ Sauce','Buffalo Sauce',
    'Carolina Heat','Nashville Hot','Sriracha','Honey Sriracha','Teriyaki Sauce','Balsamic Glaze',
    'Soy Sauce','Worcestershire Sauce','Tobasco Sauce','Hot Sauce (Asst.)','Cocktail Sauce','Tartar Sauce',
    'Olive Oil','Red Wine Vinegar','Malt Vinegar','Ranch','Spicy Ranch','Avocado Ranch',
    'Parmesan Peppercorn','Italian (Fat Free)','Creamy Italian','Caesar','Greek','French',
    '1000 Island','Blue Cheese Dressing','Balsamic Vinaigrette','Raspberry Vinaigrette (Fat Free)','Honey','Dill Relish',
    'Sweet Relish','Chicago (Neon Green) Relish','Giardiniera','Sport Peppers','Banana Peppers','Fresh Jalapeños',
    'Sliced Jalapeños','Diced Jalapeños','Green Olives','Black Olives','Roasted Red Peppers','Artichoke Hearts',
    'Salsa','Pico de Gallo','Corn Salsa','Black Bean Salsa','Sour Cream','Cole Slaw',
    'Diced Onions','Diced Red Onions','Diced Tomatoes','Dill Pickles','Bread & Butter Pickles','Lettuce',
    'Spinach','Sliced Tomatoes','Onions','Mushrooms','Shredded Cheddar-Jack','Shredded Mozzarella',
    'Feta','Blue Cheese Crumbles','Parmesan','Salt','Black Pepper','Garlic Salt',
    'Crushed Red Pepper','Italian Seasoning','Chili Powder','Blackened Seasoning','Seasoned Salt','Celery Salt',
    'Cinnamon','Brown Sugar','Onion Powder','Steak Seasoning','Homemade Chili','Taco Beef',
    'Taco Chicken','Sauteed Mushrooms','Beer Peppers and Onions','Caramelized Onions','Black Beans','Baked Beans',
    'Sauerkraut','Mac-N-Cheese','Mashed Potatoes','Brown Gravy','Country Gravy','Marinara Sauce','Queso','Guinness Beer Cheese',
  ]

  return (
    <motion.div
      className="mb-16 scroll-mt-28"
      id="toppings"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
    >
      {/* Header */}
      <div className="relative overflow-hidden mb-8 rounded-sm flex items-center px-8" style={{ height: '200px', background: 'linear-gradient(135deg,#1a004d,#04030A)' }}>
        <div>
          <h2 className="font-display leading-none" style={{ fontSize: 'clamp(44px,6vw,80px)', color: '#9D4EDD' }}>
            Unlimited Toppings
          </h2>
          <p className="font-ui text-[12px] text-cream/75 tracking-[.12em] uppercase mt-2">
            Choose from over 100 toppings — included with every dog, burger, nacho, salad & more
          </p>
        </div>
      </div>

      {/* Toppings grid */}
      <div className="rounded-sm border border-white/[0.06] p-6 md:p-8" style={{ background: 'rgba(157,78,221,0.05)' }}>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-2">
          {toppings.map(t => (
            <div key={t} className="flex items-center gap-2 py-1.5 border-b border-white/[0.04]">
              <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: '#9D4EDD' }} />
              <span className="font-ui text-[13px] text-cream/80">{t}</span>
            </div>
          ))}
        </div>
        <p className="font-ui text-[11px] text-cream/35 tracking-[.1em] uppercase mt-6 text-center">
          Toppings subject to change · Ask your server about today's selections
        </p>
      </div>
    </motion.div>
  )
}

// ── PAGE ─────────────────────────────────────────────────────────
export default function Menu() {
  const [active, setActive] = useState('starters')
  const [sanityMenu, setSanityMenu] = useState(null)
  const [loading, setLoading] = useState(true)

  // Slug → hardcoded key mapping
  const slugMap = {
    'starters': 'starters', 'famous-dogs': 'dogs', 'burgers': 'burgers',
    'smashburgers': 'smashburgers', 'chicken': 'chicken', 'fry-pies': 'frypies',
    'tacos': 'tacos', 'super-combos': 'combos', 'sides-salads': 'sides', 'desserts': 'desserts'
  }

  useEffect(() => {
    client.fetch(`*[_type == "menuCategory"] | order(sortOrder asc) {
      title, "slug": slug.current, color, note, showcase, sortOrder,
      categoryVariants, categoryAddons, categoryOptions,
      "items": *[_type == "menuItem" && references(^._id) && available == true] | order(sortOrder asc) {
        name, price, description, badge, sizes, variants, addons, options
      }
    }`).then(data => {
      if (data && data.length > 0) {
        // Merge Sanity content into hardcoded layout structure
        const merged = { ...menu }
        data.forEach(cat => {
          const key = slugMap[cat.slug]
          if (!key || !merged[key]) return
          merged[key] = {
            ...merged[key],                          // keep layout (dogsHero, chickenCards, basket, etc.)
            color: cat.color || merged[key].color,
            note:  cat.note  || merged[key].note,
            showcase: cat.showcase || merged[key].showcase,
            categoryAddons:  cat.categoryAddons?.length  ? cat.categoryAddons  : merged[key].categoryAddons,
            categoryOptions: cat.categoryOptions?.length ? cat.categoryOptions : merged[key].categoryOptions,
            categoryVariants:cat.categoryVariants?.length? cat.categoryVariants: merged[key].categoryVariants,
            items: cat.items?.length
              ? cat.items.map(item => {
                  const hardcoded = merged[key].items?.find(i => i.name === item.name)
                  return {
                    name:   item.name,
                    price:  item.price != null ? (typeof item.price === 'number' ? `$${item.price.toFixed(2)}` : item.price) : hardcoded?.price,
                    desc:   item.description || hardcoded?.desc,
                    badge:  item.badge || hardcoded?.badge,
                    addons: item.addons?.length ? item.addons : hardcoded?.addons || [],
                  }
                })
              : merged[key].items,
          }
        })
        setSanityMenu(merged)
      }
      setLoading(false)
    }).catch(() => setLoading(false))
  }, [])

  const scrollTo = (key) => {
    setActive(key)
    document.getElementById(key)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <div className="bg-[#04030A] min-h-screen">

      {/* Hero */}
      <div className="relative pt-24 pb-14 px-[5vw] overflow-hidden">
        <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg,#0e0800,#08060F,#0e0800)' }} />
        <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'repeating-linear-gradient(45deg,transparent,transparent 40px,rgba(245,101,32,0.06) 40px,rgba(245,101,32,0.06) 41px)' }} />
        <div className="relative z-[1]">
          <div className="flex items-center gap-3 font-ui text-[15px] font-bold tracking-[.28em] uppercase text-orange mb-4">
            <span className="w-8 h-0.5 bg-orange" />Gameday & Everyday
          </div>
          <h1 className="font-display text-[clamp(64px,12vw,160px)] leading-[.85] text-white whitespace-nowrap">
            Best Eats <span className="text-orange">In Town</span>
          </h1>
          <p className="font-cond text-[clamp(16px,2.2vw,26px)] text-cream/80 mt-5 max-w-[800px] tracking-wide">
            All-Beef Dogs · Hand-Formed Burgers · Clemson's Best Chicken Tenders · Fresh-Cut Fries · 100+ Toppings · Kitchen Open Late
          </p>
        </div>
      </div>

      {/* Sticky nav */}
      <div className="sticky top-[72px] z-[100] bg-[#04030A]/97 backdrop-blur-lg border-b border-orange/10 px-[5vw] py-4">
        <div className="flex gap-2.5 overflow-x-auto pb-1">
          {categories.map(({ key, label, icon }) => (
            <button key={key} onClick={() => scrollTo(key)}
              className={`flex-shrink-0 flex items-center gap-2 px-5 py-2.5 font-ui text-[13px] font-bold tracking-[.1em] uppercase border transition-all duration-200 whitespace-nowrap ${
                active === key ? 'bg-orange text-black border-orange' : 'text-cream/70 border-orange/20 hover:border-orange/50 hover:text-white bg-transparent'
              }`}>
{label}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="px-[5vw] py-16 max-w-[1100px] mx-auto">
        {categoryOrder.filter(k => k !== 'toppings').map(key => <MenuSection key={key} id={key} data={(sanityMenu || menu)[key]} />)}
        <ToppingsSection />

        {/* Allergy Warning */}
        <div className="border border-orange/20 p-6 mb-6" style={{ background: 'rgba(245,101,32,0.04)' }}>
          <div className="font-cond text-[18px] font-bold text-orange uppercase tracking-wide mb-3">⚠ Allergy & Dietary Information</div>
          <p className="text-[13px] text-cream/65 leading-[1.8] mb-2">
            <strong className="text-cream/90">Peanut Oil Notice:</strong> Our fresh-cut fries and other fried items are cooked in 100% peanut oil. If you have a peanut allergy, please inform your server before ordering.
          </p>
          <p className="text-[13px] text-cream/65 leading-[1.8]">
            Our kitchen handles common allergens including wheat, dairy, eggs, soy, tree nuts, and shellfish. Cross-contamination is possible. Please notify your server of any food allergies or dietary restrictions. For detailed allergen information, ask a manager.
          </p>
        </div>

        <div className="border border-orange/20 p-10 text-center" style={{ background: 'rgba(245,101,32,0.04)' }}>
          <h3 className="font-display text-[clamp(36px,5vw,64px)] text-white mb-3">Ready to Order?</h3>
          <p className="text-cream/80 mb-6 text[15px]">Order online for pickup or come in and we'll take care of you.</p>
          <div className="flex gap-4 justify-center flex-wrap">
            <a href="https://www.doordash.com/store/itsurwiener-restaurant-and-bar-clemson-475097/12786218/" target="_blank" rel="noreferrer" className="font-ui text-[12px] font-bold tracking-[.18em] uppercase bg-orange text-black px-10 py-4 no-underline clip-angled hover:bg-white transition-colors duration-200">Order Online</a>
            <a href="/find-us" className="font-ui text-[12px] font-bold tracking-[.18em] uppercase border border-orange/40 text-cream px-10 py-4 no-underline hover:border-orange hover:text-orange transition-all duration-200">Find Us</a>
          </div>
        </div>
      </div>
    </div>
  )
}
