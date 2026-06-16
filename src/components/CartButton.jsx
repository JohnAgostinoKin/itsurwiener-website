export default function CartButton({ className = '' }) {
  return (
    <button
      className={`snipcart-checkout ${className}`}
      aria-label="View Cart"
    >
      🛒 View Cart & Checkout
    </button>
  )
}
