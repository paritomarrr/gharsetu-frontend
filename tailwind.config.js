/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        MavenPro: ['Maven Pro', 'sans-serif']
      },
      colors: {
        primary: '#1D4CBE',
        secondary: '#6A6A6A',
        light: '#DDD'
      },
      boxShadow: {
        'custom': '0px 0px 8px 0px rgba(16, 24, 40, 0.04), 0px 12px 16px -4px rgba(16, 24, 40, 0.10), 0px 4px 6px -2px rgba(16, 24, 40, 0.05)',
      }
    },
  },
  plugins: [],
}

