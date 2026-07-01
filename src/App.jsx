import { useEffect } from 'react'
import { createBrowserRouter, Outlet, ScrollRestoration } from 'react-router-dom'
import Lenis from 'lenis'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SpeedInsights } from '@vercel/speed-insights/react'
import Nav from '@components/Nav'
import Footer from '@components/Footer'
import Cursor from '@components/Cursor'
import Cart from '@components/Cart'
import { CartProvider } from '@components/CartContext'

// Pages
import Home      from '@pages/Home'
import SportsBar from '@pages/SportsBar'
import Venues    from '@pages/Venues'
import GameDay   from '@pages/GameDay'
import Litcher   from '@pages/Litcher'
import Basement  from '@pages/Basement'
import Menu      from '@pages/Menu'
import Merch     from '@pages/Merch'
import Events    from '@pages/Events'
import NotFound  from '@pages/NotFound'

// Legal
import PrivacyPolicy            from './legal/PrivacyPolicy'
import TermsOfUse               from './legal/TermsOfUse'
import RefundCancellationPolicy from './legal/RefundCancellationPolicy'
import VenueEventTerms          from './legal/VenueEventTerms'
import AccessibilityStatement   from './legal/AccessibilityStatement'
import BookingInquiry   from '@pages/BookingInquiry'
import VipReservation   from '@pages/VipReservation'
import Reservation      from '@pages/Reservation'
import FindUs           from '@pages/FindUs'
import BookEvent        from '@pages/BookEvent'
import ProductDetail    from '@pages/ProductDetail'
import ThisWeekend      from '@pages/ThisWeekend'

gsap.registerPlugin(ScrollTrigger)

function RootLayout() {
  useEffect(() => {
    const lenis = new Lenis()
    lenis.on('scroll', ScrollTrigger.update)
    const tick = (time) => lenis.raf(time * 1000)
    gsap.ticker.add(tick)
    gsap.ticker.lagSmoothing(0)
    return () => {
      gsap.ticker.remove(tick)
      lenis.destroy()
    }
  }, [])

  return (
    <CartProvider>
      <Cursor />
      <ScrollRestoration />
      <Nav />
      <Cart />
      <main>
        <Outlet />
      </main>
      <Footer />
      <SpeedInsights />
    </CartProvider>
  )
}

export const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      { index: true,            element: <Home /> },
      { path: 'sports-bar',     element: <SportsBar /> },
      { path: 'venues',         element: <Venues /> },
      { path: 'game-day',       element: <GameDay /> },
      { path: 'the-litcher',    element: <Litcher /> },
      { path: 'the-basement',   element: <Basement /> },
      { path: 'menu',           element: <Menu /> },
      { path: 'merch',          element: <Merch /> },
      { path: 'events',         element: <Events /> },
      { path: 'privacy',        element: <PrivacyPolicy /> },
      { path: 'terms',          element: <TermsOfUse /> },
      { path: 'refund-policy',  element: <RefundCancellationPolicy /> },
      { path: 'venue-terms',    element: <VenueEventTerms /> },
      { path: 'accessibility',  element: <AccessibilityStatement /> },
      { path: 'booking',        element: <BookingInquiry /> },
      { path: 'vip',            element: <VipReservation /> },
      { path: 'reserve',        element: <Reservation /> },
      { path: 'find-us',        element: <FindUs /> },
      { path: 'book-event',     element: <BookEvent /> },
      { path: 'this-weekend',   element: <ThisWeekend /> },
      { path: 'merch/:id',      element: <ProductDetail /> },
      { path: '*',              element: <NotFound /> },
    ],
  },
])
