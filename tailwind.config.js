/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        // ── Brand ──
        orange:  { DEFAULT: '#F56520', dim: '#B84D10', light: '#FF8C42', glow: 'rgba(245,101,32,0.12)' },
        purple:  { DEFAULT: '#522D80', bright: '#9D4EDD', glow: 'rgba(157,78,221,0.15)' },
        // ── Neutrals ──
        black:   { DEFAULT: '#04030A', 2: '#08060F', 3: '#0E0B18' },
        cream:   { DEFAULT: '#F0EAD6', dim: 'rgba(240,234,214,0.55)' },
        warm:    { grey: '#6A5E52' },
      },
      fontFamily: {
        display:  ['"Bebas Neue"', 'sans-serif'],
        bold:     ['"Black Han Sans"', 'sans-serif'],
        ui:       ['"Space Grotesk"', 'sans-serif'],
        cond:     ['"Barlow Condensed"', 'sans-serif'],
      },
      fontSize: {
        'display-sm':  ['clamp(48px,7vw,80px)',  { lineHeight: '0.88' }],
        'display-md':  ['clamp(64px,10vw,120px)', { lineHeight: '0.88' }],
        'display-lg':  ['clamp(80px,14vw,180px)', { lineHeight: '0.85' }],
        'display-xl':  ['clamp(100px,18vw,260px)',{ lineHeight: '0.85' }],
      },
      animation: {
        'ticker':      'ticker 22s linear infinite',
        'ticker-rev':  'ticker 28s linear infinite reverse',
        'hype':        'ticker 20s linear infinite',
        'beam-sweep':  'beamSweep 4s ease-in-out infinite',
        'particle':    'particleFloat linear infinite',
        'pin-bounce':  'pinBounce 2s ease-in-out infinite',
        'neon-pulse':  'neonPulse 2.5s ease-in-out infinite',
        'logo-flash':  'logoFlash 3s infinite',
        'led-wall':    'ledAnimate 3s ease-in-out infinite',
        'can-wobble':  'canWobble 5s ease-in-out infinite',
        'scroll-bar':  'scrollBar 1.8s ease-in-out infinite',
        'line-glow':   'lineGlow 2s ease-in-out infinite',
        'glitch-1':    'glitch1 4s infinite',
        'glitch-2':    'glitch2 4s infinite',
        'blink':       'blink 1.5s ease-in-out infinite',
      },
      keyframes: {
        ticker:        { '0%': { transform: 'translateX(0)' }, '100%': { transform: 'translateX(-50%)' } },
        beamSweep:     { '0%,100%': { transform: 'rotate(-20deg)', opacity: '.4' }, '50%': { transform: 'rotate(20deg)', opacity: '1' } },
        particleFloat: { '0%': { transform: 'translateY(100vh) scale(0)', opacity: '0' }, '10%,90%': { opacity: '1' }, '100%': { transform: 'translateY(-20px) scale(1)', opacity: '0' } },
        pinBounce:     { '0%,100%': { transform: 'rotate(-45deg) translateY(0)' }, '50%': { transform: 'rotate(-45deg) translateY(-8px)' } },
        neonPulse:     { '0%,100%': { textShadow: '0 0 20px #9D4EDD, 0 0 40px rgba(157,78,221,0.3)' }, '50%': { textShadow: '0 0 8px #9D4EDD' } },
        logoFlash:     { '0%,28%': { color: '#F56520' }, '33%,58%': { color: '#FDFCF8' }, '63%,88%': { color: '#9D4EDD' }, '93%,100%': { color: '#F56520' } },
        ledAnimate:    { '0%,100%': { backgroundPosition: '0% 50%' }, '50%': { backgroundPosition: '100% 50%' } },
        canWobble:     { '0%,100%': { transform: 'rotate(-2deg) translateY(0)' }, '25%': { transform: 'rotate(1deg) translateY(-8px)' }, '50%': { transform: 'rotate(-1deg) translateY(-4px)' }, '75%': { transform: 'rotate(2deg) translateY(-10px)' } },
        scrollBar:     { '0%': { height: '0', opacity: '1' }, '100%': { height: '48px', opacity: '0' } },
        lineGlow:      { '0%,100%': { boxShadow: '0 0 8px #9D4EDD', width: '80px' }, '50%': { boxShadow: '0 0 24px #9D4EDD', width: '120px' } },
        glitch1:       { '0%,90%,100%': { transform: 'translateX(0)', opacity: '0' }, '91%,93%': { transform: 'translateX(-6px)', opacity: '1' }, '92%,94%': { transform: 'translateX(6px)', opacity: '1' } },
        glitch2:       { '0%,88%,100%': { transform: 'translateX(0)', opacity: '0' }, '89%,91%': { transform: 'translateX(6px)', opacity: '1' }, '90%,92%': { transform: 'translateX(-6px)', opacity: '1' } },
        blink:         { '0%,100%': { opacity: '1' }, '50%': { opacity: '0.3' } },
      },
      backgroundImage: {
        'led-wall': 'linear-gradient(45deg, #F56520, #9D4EDD, #00F5D4, #9D4EDD, #F56520)',
      },
      backgroundSize: {
        '400': '400% 400%',
      },
    },
  },
  plugins: [],
}
