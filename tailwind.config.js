/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
theme: {
    extend: {
      colors: {
        saffron: { 50: '#FFF3E0', 100: '#FFE0B2', 500: '#FF9933' },
        maroon: { 800: '#5C0000', 900: '#800000' },
        gold: { 500: '#FFD700', 600: '#E6C200' },
      },
      fontFamily: {
        hind: ['Hind', 'sans-serif'],
        manrope: ['Manrope', 'sans-serif'],
      },
    },
  },
  plugins: [],
  // darkMode: 'class',
};