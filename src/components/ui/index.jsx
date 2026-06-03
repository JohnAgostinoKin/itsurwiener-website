// ── Button ──────────────────────────────────────────
// variant: 'primary' | 'outline' | 'ghost' | 'purple'
// size:    'sm' | 'md' | 'lg'
export function Button({ children, variant = 'primary', size = 'md', className = '', ...props }) {
  const base = 'inline-flex items-center justify-center font-ui font-bold tracking-[.18em] uppercase transition-all duration-200 no-underline'

  const variants = {
    primary: 'bg-orange text-black clip-angled hover:bg-white hover:-translate-y-0.5',
    outline: 'border border-orange/40 text-cream hover:border-orange hover:text-orange hover:-translate-y-0.5',
    ghost:   'text-orange hover:text-white',
    purple:  'bg-purple-bright text-white hover:bg-[#B85EFF] hover:-translate-y-0.5',
  }

  const sizes = {
    sm: 'text-[10px] px-5 py-2.5',
    md: 'text-[12px] px-8 py-4',
    lg: 'text-[13px] px-10 py-5',
  }

  return (
    <a className={`${base} ${variants[variant]} ${sizes[size]} ${className}`} {...props}>
      {children}
    </a>
  )
}

// ── SectionEyebrow ───────────────────────────────────
export function SectionEyebrow({ children, className = '' }) {
  return (
    <div className={`flex items-center gap-3 font-ui text-[11px] font-bold tracking-[.28em] uppercase text-orange mb-3.5 ${className}`}>
      <span className="w-6 h-0.5 bg-orange flex-shrink-0" />
      {children}
    </div>
  )
}

// ── SectionTitle ─────────────────────────────────────
export function SectionTitle({ children, className = '' }) {
  return (
    <h2 className={`font-display text-display-md text-white mb-5 ${className}`}>
      {children}
    </h2>
  )
}

// ── SectionBody ──────────────────────────────────────
export function SectionBody({ children, className = '' }) {
  return (
    <p className={`text-[15px] text-cream/55 leading-[1.85] max-w-[500px] ${className}`}>
      {children}
    </p>
  )
}

// ── StatCard ─────────────────────────────────────────
export function StatCard({ value, label, className = '' }) {
  return (
    <div className={`bg-black-3 p-8 relative group overflow-hidden border-l-[3px] border-orange/0 hover:border-orange transition-all duration-300 hover:bg-orange/5 ${className}`}>
      <span className="font-display text-[clamp(36px,5vw,72px)] text-orange leading-none block mb-1.5">
        {value}
      </span>
      <span className="font-ui text-[11px] tracking-[.15em] uppercase text-cream/40 leading-snug">
        {label}
      </span>
    </div>
  )
}

// ── Reveal wrapper ────────────────────────────────────
// Wraps children in a motion div that fades/slides in on scroll
import { motion } from 'framer-motion'

export function Reveal({ children, delay = 0, className = '' }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
