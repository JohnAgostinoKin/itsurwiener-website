import { useEffect, useRef, useState } from 'react'

/**
 * useScrollReveal
 * Returns a ref to attach to a DOM element and a boolean `visible`.
 * When the element enters the viewport, visible becomes true.
 *
 * @param {number} threshold  - 0-1, how much of element must be visible (default 0.1)
 * @param {string} rootMargin - margin around root (default '0px 0px -60px 0px')
 * @param {boolean} once      - if true (default), stops observing after first trigger
 */
export function useScrollReveal(threshold = 0.1, rootMargin = '0px 0px -60px 0px', once = true) {
  const ref     = useRef(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          if (once) obs.unobserve(el)
        } else if (!once) {
          setVisible(false)
        }
      },
      { threshold, rootMargin }
    )

    obs.observe(el)
    return () => obs.disconnect()
  }, [threshold, rootMargin, once])

  return [ref, visible]
}

/**
 * useCounter
 * Animates a number from 0 to `target` over `duration` ms when `trigger` is true.
 */
export function useCounter(target, duration = 2200, trigger = true) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!trigger) return
    const start = performance.now()
    const update = (now) => {
      const progress = Math.min((now - start) / duration, 1)
      const eased    = 1 - Math.pow(1 - progress, 4)
      setCount(Math.floor(eased * target))
      if (progress < 1) requestAnimationFrame(update)
      else setCount(target)
    }
    requestAnimationFrame(update)
  }, [target, duration, trigger])

  return count
}
