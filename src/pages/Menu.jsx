import { useState } from 'react'
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
    items: [
      { name: 'Fried Pickles',          price: 'Sm $8.99 / Lg $12.99', desc: 'Golden-fried dill pickle chips with your choice of dipping sauce.' },
      { name: 'Fried Mozz Sticks',      price: '$9.99', desc: 'Crispy breaded mozzarella sticks, hot and stringy. Served with marinara.' },
      { name: 'Pretzels & Beer Cheese', price: '$9.99', desc: 'Warm soft pretzels served with our house-made beer cheese dip.' },
      { name: 'Pretzel Trio',           price: '$13.99', desc: '3 Soft Pretzels served with Beer Cheese, Queso Cheese, and Hot Honey Mustard.', badge: 'Fan Fave' },
      { name: 'Popcorn Chicken',        price: 'Sm $9.99 / Lg $14.99', desc: 'Bite-sized crispy chicken pieces fried to perfection. Great for sharing.' },
      { name: 'Thin-Cut Onion Rings',   price: '$9.99', desc: 'Light, crispy, perfectly seasoned thin-cut onion rings.' },
      { name: 'Spinach Artichoke Dip',  price: '$10.99', desc: 'Creamy hot spinach and artichoke dip served with tortilla chips.' },
      { name: 'Build Your Own Nachos',  price: '$12.99', desc: 'Loaded nachos your way with 100+ toppings. Add Grilled, Fried, Buffalo, or Blackened Tenders +$4.99' },
    ]
  },
  dogs: {
    label: 'Famous Dogs', icon: '🌭', color: '#9D4EDD',
    note: 'All dogs served with Unlimited Toppings — 100+ to choose from',
    items: [
      { name: 'All Beef Dog',    price: '$4.99',  desc: 'Our classic all-beef frank grilled to order with unlimited toppings your way.' },
      { name: '2 All-Beef Dogs', price: '$9.99',  desc: 'Double up on the classic — two all-beef franks with unlimited toppings.' },
      { name: 'Jumbo Dog',       price: '$6.99',  desc: 'A bigger, bolder all-beef frank for serious dog lovers.' },
      { name: 'Bird Dog',        price: '$4.99',  desc: 'Savory chicken sausage with unlimited toppings.' },
      { name: 'Mild Italian',    price: '$6.99',  desc: 'Juicy mild Italian sausage with all your favorite toppings.' },
      { name: 'Hot Italian',     price: '$6.99',  desc: 'Spicy Italian sausage with a kick. Handle it.' },
      { name: 'Corn Dog',        price: '$5.99',  desc: 'Classic deep-fried corn dog. A timeless favorite.' },
      { name: 'Bratwurst',       price: '$6.99',  desc: 'German-style bratwurst grilled perfectly. Goes great with beer cheese.' },
    ],
    extras: [{ text: 'Make any item a Basket with Fresh-Cut Fries', price: '+$5.99', sub: 'Sub Tots or Sweets for $1' }]
  },
  burgers: {
    label: 'Burgers', icon: '🍔', color: '#F56520',
    note: '100% Fresh Ground Beef · ½ LB Hand-Formed · Unlimited Toppings',
    items: [
      { name: 'Classic Burger',        price: '$9.99',  desc: 'Half-pound of fresh-ground beef your way. Add Cheese +.99 · Bacon +2.99 · Double Meat +3.99' },
      { name: 'Mushroom Swiss Burger', price: '$10.99', desc: 'Juicy burger topped with sautéed mushrooms and melted Swiss cheese.' },
      { name: 'Pub Burger',            price: '$11.99', desc: 'Loaded with crispy thin-cut onion rings and our house beer cheese sauce.' },
      { name: 'Hawaiian Burger',       price: '$10.99', desc: 'Pepper Jack cheese and grilled pineapple for a sweet and spicy combo.' },
      { name: 'Barnyard Burger',       price: '$11.99', desc: 'Our classic burger topped with hand-battered chicken tenders. A crowd favorite.' },
      { name: 'Fried Pickle Burger',   price: '$10.99', desc: 'Stacked high with crispy fried dill pickles and all the fixings.' },
    ],
    extras: [{ text: 'Sub Plant-Based Patty on any burger', price: '+$1' }]
  },
  smashburgers: {
    label: 'SmashBurgers', icon: '💪', color: '#9D4EDD',
    note: '⅓ Pound Fresh Smashed Ground Beef · Unlimited Toppings',
    items: [
      { name: 'Classic Smash',        price: '$9.99',  desc: 'Fresh smash patty with American cheese and unlimited toppings.' },
      { name: 'Bacon Smash',          price: '$11.99', desc: 'Fresh smash patty with American cheese, crispy bacon and unlimited toppings.' },
      { name: 'Spicy Smash',          price: '$12.99', desc: 'Fresh smash patty with Pepper Jack cheese, sliced jalapeños, and spicy mayo. Turn up the heat!' },
      { name: 'Double Smash',         price: '$13.99', desc: 'Two fresh smash patties, American cheese and unlimited toppings.' },
      { name: 'BBQ Smash',            price: '$12.99', desc: 'Fresh smash patty with Cheddar cheese, choice of Reg, Gold, or Sweet BBQ sauce, and unlimited toppings.' },
      { name: 'Mushroom Swiss Smash', price: '$12.99', desc: 'Fresh smash patty with Swiss cheese and unlimited toppings.' },
    ]
  },
  chicken: {
    label: 'Chicken', icon: '🍗', color: '#F56520',
    note: "Clemson's Best · Hand-Battered & Deep Fried to Order",
    showcase: { name: 'Chicken & Waffle', price: '10.99', desc: 'A crispy hand-battered tender on a golden waffle. Clemson comfort food at its finest.' },
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
      { name: 'Fresh-Cut Fries',    price: 'Reg $5.99 / Lg $10.99', desc: 'Hand-cut and fried in 100% peanut oil. Add Toppings Sm $2.99/Lg $5.99 · Add Bacon Sm $2.99/Lg $5.99.' },
      { name: 'Tater Tots',         price: 'Reg $6.99 / Lg $11.99', desc: 'Crispy golden tater tots. Add Toppings Sm $2.99/Lg $5.99 · Add Bacon Sm $2.99/Lg $5.99.' },
      { name: 'Sweet Potato Fries', price: 'Reg $6.99 / Lg $11.99', desc: 'Sweet and crispy sweet potato fries. Add Toppings Sm $2.99/Lg $5.99 · Add Bacon Sm $2.99/Lg $5.99.' },
      { name: 'House Salad',        price: '$9.99',  desc: 'Fresh house salad with unlimited toppings. Add Grilled, Fried, Buffalo, or Blackened Tenders +$4.99.' },
      { name: 'Taco Salad',         price: '$10.99', desc: 'Our signature taco salad with unlimited toppings. Add Grilled, Fried, Buffalo, or Blackened Tenders +$4.99.' },
      { name: 'Side Salad',         price: '$4.99',  desc: 'A simple fresh side salad — the perfect lighter option.' },
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

const categoryOrder = ['starters','dogs','burgers','smashburgers','chicken','frypies','tacos','combos','sides','desserts']
const categories = categoryOrder.map(key => ({ key, label: menu[key].label }))

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
          <span className="font-display text-[26px] flex-shrink-0 leading-none mt-0.5" style={{ color }}>{item.price}</span>
        </div>
        {item.desc && <p className="text-[13px] text-cream/80 leading-[1.65]">{item.desc}</p>}
      </div>
      <div className="h-[2px] w-0 group-hover:w-full transition-all duration-500" style={{ background: color }} />
    </motion.div>
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
          <div className="p-6 flex items-center justify-between gap-6">
            <div>
              <div className="font-ui text-[11px] font-bold tracking-[.2em] uppercase mb-1" style={{ color: data.color }}>Featured Item</div>
              <div className="font-display text-[clamp(32px,4vw,54px)] text-white leading-none">{data.showcase.name}</div>
              <p className="text-[13px] text-cream/80 mt-2 max-w-[460px] leading-relaxed">{data.showcase.desc}</p>
            </div>
            <div className="font-display text-[clamp(52px,7vw,88px)] flex-shrink-0" style={{ color: data.color }}>${data.showcase.price}</div>
          </div>
        </div>
      )}

      {/* Chicken special layout */}
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
    </motion.div>
  )
}

// ── PAGE ─────────────────────────────────────────────────────────
export default function Menu() {
  const [active, setActive] = useState('starters')

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
        {categoryOrder.map(key => <MenuSection key={key} id={key} data={menu[key]} />)}

        <div className="border border-orange/20 p-10 text-center" style={{ background: 'rgba(245,101,32,0.04)' }}>
          <h3 className="font-display text-[clamp(36px,5vw,64px)] text-white mb-3">Ready to Order?</h3>
          <p className="text-cream/80 mb-6 text[15px]">Order online for pickup or come in and we'll take care of you.</p>
          <div className="flex gap-4 justify-center flex-wrap">
            <a href="#" className="font-ui text-[12px] font-bold tracking-[.18em] uppercase bg-orange text-black px-10 py-4 no-underline clip-angled hover:bg-white transition-colors duration-200">Order Online</a>
            <Link to="/#findus" className="font-ui text-[12px] font-bold tracking-[.18em] uppercase border border-orange/40 text-cream px-10 py-4 no-underline hover:border-orange hover:text-orange transition-all duration-200">Find Us</Link>
          </div>
        </div>
      </div>
    </div>
  )
}
