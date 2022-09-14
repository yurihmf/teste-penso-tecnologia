/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'sans': ['Poppins', ...defaultTheme.fontFamily.sans],
      },
      keyframes: {
        fadeDown: {
          '0%': {
            opacity: 0,
            transform: 'translateY(-20px)'
         },
         '100%': {
            opacity: 1,
            transform: 'translateY(0)'
         }
        }
      },
      animation: {
        'fadeDown': 'fadeDown 3s linear infinite',
      }
    },
  },
  plugins: [],
}
