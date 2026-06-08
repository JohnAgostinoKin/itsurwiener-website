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

// ── Root layout wraps every page ──
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

// ── Router ──
export const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      { index: true,          element: <Home /> },
      { path: 'venues',       element: <Venues /> },
      { path: 'game-day',     element: <GameDay /> },
      { path: 'the-litcher',  element: <Litcher /> },
      { path: 'the-basement', element: <Basement /> },
      { path: 'menu',         element: <Menu /> },
      { path: 'merch',        element: <Merch /> },
      { path: 'events',       element: <Events /> },
      { path: '*',            element: <NotFound /> },
    ],
  },
])
