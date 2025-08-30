/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Nunito', 'system-ui', 'sans-serif'],
      },
      keyframes: {
        'fade-in': {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' }
        },
        'fade-out': {
          '0%': { opacity: '1', transform: 'translateY(0)' },
          '100%': { opacity: '0', transform: 'translateY(-20px)' }
        },
        'sway': {
          '0%, 100%': { transform: 'translateX(0px) rotate(0deg)' },
          '50%': { transform: 'translateX(3px) rotate(2deg)' }
        },
        'confetti-fall': {
          '0%': { transform: 'translateY(-100vh) rotate(0deg)', opacity: '1' },
          '100%': { transform: 'translateY(100vh) rotate(720deg)', opacity: '0' }
        },
        'pulse-glow': {
          '0%, 100%': { 
            boxShadow: '0 0 30px rgba(88, 204, 2, 0.7), 0 0 60px rgba(88, 204, 2, 0.4), 0 0 90px rgba(88, 204, 2, 0.2)',
            transform: 'scale(1)'
          },
          '50%': { 
            boxShadow: '0 0 50px rgba(88, 204, 2, 0.9), 0 0 100px rgba(88, 204, 2, 0.6), 0 0 150px rgba(88, 204, 2, 0.3)',
            transform: 'scale(1.08)'
          }
        },
        'typewriter': {
          '0%': { width: '0' },
          '100%': { width: '100%' }
        }
      },
      animation: {
        'fade-in': 'fade-in 0.8s ease forwards',
        'fade-out': 'fade-out 0.8s ease forwards',
        'sway': 'sway 3s ease-in-out infinite',
        'confetti-fall': 'confetti-fall 1.5s ease-out infinite',
        'pulse-glow': 'pulse-glow 1.5s ease-in-out infinite',
        'typewriter': 'typewriter 0.8s steps(20, end) forwards'
      }
    },
  },
  plugins: [],
}