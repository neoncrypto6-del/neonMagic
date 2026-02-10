
/** @type {import('tailwindcss').Config} */
export default {
  content: [
  './index.html',
  './src/**/*.{js,ts,jsx,tsx}'
],
  theme: {
    extend: {
      colors: {
        neon: {
          cyan: '#00f0ff',
          purple: '#b000ff',
          green: '#00ff88',
          pink: '#ff00aa',
          blue: '#0066ff',
        },
        dark: {
          bg: '#0a0a1a',
          card: '#0f0f2a',
          surface: '#1a1a3e',
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        display: ['Inter', 'sans-serif'], // Using Inter for display too as requested, but with heavier weights
      },
      boxShadow: {
        'neon-cyan': '0 0 10px #00f0ff, 0 0 20px #00f0ff40',
        'neon-purple': '0 0 10px #b000ff, 0 0 20px #b000ff40',
        'neon-green': '0 0 10px #00ff88, 0 0 20px #00ff8840',
        'neon-pink': '0 0 10px #ff00aa, 0 0 20px #ff00aa40',
        'glass': '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        glow: {
          'from': { boxShadow: '0 0 10px #00f0ff, 0 0 20px #00f0ff40' },
          'to': { boxShadow: '0 0 20px #00f0ff, 0 0 30px #00f0ff60' },
        }
      }
    },
  },
  plugins: [],
}
