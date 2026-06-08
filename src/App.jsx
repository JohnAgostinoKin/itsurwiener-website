import { createBrowserRouter, Outlet, ScrollRestoration } from 'react-router-dom'
import Nav from '@components/Nav'
import Footer from '@components/Footer'
import Cursor from '@components/Cursor'

// Pages
import Home     from '@pages/Home'
import Venues   from '@pages/Venues'
import GameDay  from '@pages/GameDay'
import Litcher  from '@pages/Litcher'
import Basement from '@pages/Basement'
import Menu     from '@pages/Menu'
import Merch    from '@pages/Merch'
import Events   from '@pages/Events'
import NotFound from '@pages/NotFound'

// Legal
import PrivacyPolicy           from './legal/PrivacyPolicy'
import TermsOfUse              from './legal/TermsOfUse'
import RefundCancellationPolicy from './legal/RefundCancellationPolicy'
import VenueEventTerms         from './legal/VenueEventTerms'
import AccessibilityStatement  from './legal/AccessibilityStatement'
import BookingInquiry          from '@pages/BookingInquiry'

function RootLayout() {
  return (
    <>
      <Cursor />
      <ScrollRestoration />
      <Nav />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  )
}

export const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      { index: true,           element: <Home /> },
      { path: 'venues',        element: <Venues /> },
      { path: 'game-day',      element: <GameDay /> },
      { path: 'the-litcher',   element: <Litcher /> },
      { path: 'the-basement',  element: <Basement /> },
      { path: 'menu',          element: <Menu /> },
      { path: 'merch',         element: <Merch /> },
      { path: 'events',        element: <Events /> },
      { path: 'privacy',       element: <PrivacyPolicy /> },
      { path: 'terms',         element: <TermsOfUse /> },
      { path: 'refund-policy', element: <RefundCancellationPolicy /> },
      { path: 'venue-terms',   element: <VenueEventTerms /> },
      { path: 'accessibility', element: <AccessibilityStatement /> },
      { path: 'booking',        element: <BookingInquiry /> },
      { path: '*',             element: <NotFound /> },
    ],
  },
])
