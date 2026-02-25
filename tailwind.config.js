/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'quran-green': '#064e3b',
        'quran-gold': '#d97706',
        'quran-parchment': '#fdfbf7',
      },
      fontFamily: {
        'arabic': ['Amiri Quran', 'serif'],
        'serif': ['Georgia', 'serif'],
      },
    },
  },
  plugins: [],
}
