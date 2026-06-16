import { Link } from 'react-router-dom'
export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center px-[5vw]">
      <div className="font-display text-[180px] text-orange/10 leading-none select-none">404</div>
      <h1 className="font-display text-[clamp(48px,8vw,96px)] text-white -mt-16 mb-4">Lost?</h1>
      <p className="text-cream/50 mb-8">This page doesn't exist. The Litcher® does.</p>
      <Link to="/" className="font-ui text-[12px] font-bold tracking-[.18em] uppercase bg-orange text-black px-8 py-4 no-underline clip-angled hover:bg-white transition-colors">Back to The Wien</Link>
    </div>
  )
}
