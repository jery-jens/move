/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    colors: {
      "blue": "#293440",
      "gold": "#8C7756",
      "light-gold": "#FFF3E1",
      "white": "#FFFFFF",
      "transparent-white": "rgba(255, 255, 255, .4)",
      "transparent-blue": "rgba(41, 52, 64, .06)"
    },
    extend: {},
  },
  plugins: [],
}
