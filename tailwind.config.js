/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'brand-dark': '#0a0a0a',
        'brand-gold': '#d4af37',
        'brand-red': '#e63946',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        anton: ['Anton', 'sans-serif'], // Added Anton font
      }
    },
  },
  plugins: [],
}
