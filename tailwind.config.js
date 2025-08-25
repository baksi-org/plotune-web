/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#26A69A',
        'primary-dark': '#00796B',
        secondary: '#3f51b5',
        'dark-bg': '#121212',
        'dark-surface': '#1e1e1e',
        'dark-card': '#252525',
        'dark-text': '#e0e0e0',
        'light-text': '#f5f5f5',
        'gray-text': '#9e9e9e',
      },
      boxShadow: {
        custom: '0 4px 12px rgba(0, 0, 0, 0.25)',
      },
      borderRadius: {
        custom: '8px',
      },
    },
  },
  plugins: [],
}