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
        "white":"#FEFFFE",
        "grayishWhite":"#E5E7E9",
        "darkishGray":"#444444",
        "darkCyan":"#4D99BC"
      }
    },
  },
  plugins: [
    require('flowbite/plugin')
  ],
  darkMode:"class"
}

