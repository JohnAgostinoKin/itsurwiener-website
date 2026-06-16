export default function CartButton({ className = '' }) {
  return (
    <button
      className={className}
      onClick={() => window.dispatchEvent(new Event('cart:open'))}
      aria-label="View Cart"
    >
      🛒 View Cart & Checkout
    </button>
  )
}
