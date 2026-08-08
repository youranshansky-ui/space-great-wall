/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './components/**/*.{vue,js,ts}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './app.vue',
  ],
  theme: {
    extend: {
      colors: {
        'deep-space': {
          950: '#030614',
          900: '#060b1f',
          800: '#0a122e',
          700: '#0f1a3d',
          600: '#16244d',
        },
        'cosmic': {
          violet: '#1a1040',
          cobalt: '#0d1b3e',
          indigo: '#152055',
          dusk: '#1e1845',
        },
        'stellar': {
          gold: '#d4a853',
          amber: '#c8923a',
          warm: '#e8c97a',
          pale: '#f5e6c8',
        },
        'hologram': {
          cyan: '#88ccdd',
          ice: '#aaccdd',
          frost: 'rgba(160,200,220,0.12)',
        },
      },
      fontFamily: {
        display: ['"Noto Serif SC"', 'serif'],
        body: ['"Inter"', '"PingFang SC"', 'sans-serif'],
        mono: ['"JetBrains Mono"', '"Fira Code"', 'monospace'],
      },
      animation: {
        'nebula-drift': 'nebula-drift 40s ease-in-out infinite',
        'star-twinkle': 'star-twinkle 4s ease-in-out infinite',
        'float-slow': 'float-slow 8s ease-in-out infinite',
        'glow-breathe': 'glow-breathe 3s ease-in-out infinite',
        'orbit': 'orbit 30s linear infinite',
      },
      keyframes: {
        'nebula-drift': {
          '0%, 100%': { transform: 'translate(0, 0) rotate(0deg) scale(1)' },
          '33%': { transform: 'translate(2%, 1%) rotate(1deg) scale(1.02)' },
          '66%': { transform: 'translate(-1%, 2%) rotate(-0.5deg) scale(0.98)' },
        },
        'star-twinkle': {
          '0%, 100%': { opacity: '0.2' },
          '50%': { opacity: '0.9' },
        },
        'float-slow': {
          '0%, 100%': { transform: 'translateY(0) translateX(0)' },
          '50%': { transform: 'translateY(-30px) translateX(10px)' },
        },
        'glow-breathe': {
          '0%, 100%': { textShadow: '0 0 8px rgba(212,168,83,0.2)' },
          '50%': { textShadow: '0 0 20px rgba(212,168,83,0.5)' },
        },
        'orbit': {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
      },
    },
  },
  plugins: [],
}
