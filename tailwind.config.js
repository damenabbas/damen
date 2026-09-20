/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'saudi-green': {
          DEFAULT: '#006c35',
          dark: '#004d24',
          light: '#0a8f4a',
          50: '#e6f5ec',
          100: '#ccebd8',
          200: '#99d6b1',
          300: '#66c28b',
          400: '#33ad64',
          500: '#006c35',
          600: '#005a2c',
          700: '#004d24',
          800: '#003919',
          900: '#00260f',
        },
        gold: {
          DEFAULT: '#c9a961',
          light: '#e0c97e',
          dark: '#a88a42',
        },
        cream: '#f8f5ef',
      },
      fontFamily: {
        heading: ['Cairo', 'sans-serif'],
        body: ['Tajawal', 'sans-serif'],
      },
      animation: {
        'fade-in-up': 'fadeInUp 0.8s ease-out forwards',
        'fade-in': 'fadeIn 1s ease-out forwards',
        'scale-in': 'scaleIn 0.6s ease-out forwards',
        'float': 'float 4s ease-in-out infinite',
        'pulse-glow': 'pulseGlow 3s ease-in-out infinite',
        'badge-bounce': 'badgeBounce 3s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};
