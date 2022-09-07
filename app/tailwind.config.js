/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    fontFamily: {
      sans: ['Yantramanav', ...defaultTheme.fontFamily.sans],
    },
    extend: {
      colors: {
        'white': '#ffffff',
        'light-green': '#E0EDC5',
        'green': '#92AA83',
        'black': '#272727',
        'orange': '#EBC88C',
        'red': '#EB8C93',
        'light-gray': '#F8F8F8',
        'gray': '#F3F3F3',
      },
    },
  },
  plugins: [],
}
