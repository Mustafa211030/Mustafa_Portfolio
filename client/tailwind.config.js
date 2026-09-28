/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans:  ['DM Sans', 'sans-serif'],
        serif: ['Instrument Serif', 'Georgia', 'serif'],
      },
      colors: {
        dark:  { DEFAULT: '#080c14', 2: '#0d1525', 3: '#111827' },
        light: { DEFAULT: '#e8eaed', 2: '#f0f4f8' },
        blue:  { DEFAULT: '#2563EB', light: '#3B82F6', dim: '#1e3a5f' },
      },
      keyframes: {
        marquee: {
          '0%':   { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        fadeUp: {
          from: { opacity: '0', transform: 'translateY(22px)' },
          to:   { opacity: '1', transform: 'translateY(0)' },
        },
        float: {
          '0%,100%': { transform: 'translateY(0px)' },
          '50%':     { transform: 'translateY(-10px)' },
        },
        blink: {
          '0%,100%': { opacity: '1' },
          '50%':     { opacity: '0' },
        },
      },
      animation: {
        'marquee': 'marquee 28s linear infinite',
        'fade-up': 'fadeUp 0.6s cubic-bezier(0.16,1,0.3,1) forwards',
        'float':   'float 6s ease-in-out infinite',
        'blink':   'blink 0.9s step-end infinite',
      },
    },
  },
  plugins: [],
}
