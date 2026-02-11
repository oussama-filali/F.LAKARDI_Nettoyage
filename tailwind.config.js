/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      colors: {
        cream:     '#F0EED2',
        sage:      '#CADBC0',
        'sage-mid':'#9DC08B',
        mint:      '#6DB193',
        'mint-dark':'#4E9A7B',
        dark:      '#2C3E2D',
        'dark-deep':'#1E2B1F',
      }
    },
  },
  plugins: [],
}
