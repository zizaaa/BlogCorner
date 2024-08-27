/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/flowbite/**/*.js"
  ],
  theme: {
    extend: {
      fontFamily: {
        nunito: ['"Nunito"', 'sans-serif'],
      },
      colors:{
        "white":"#f3f1f1",
        "semiWhite":"#fefefe",
        "grayishWhite":"#E5E7E9",
        "darkishGray":"#444444",
        "darkCyan":"#4D99BC",
        "black":"#131213",
        "semiBlack":"#1D1D1D"
      }
    },
  },
  plugins: [
    require('flowbite/plugin')
  ],
  darkMode:"class"
}

