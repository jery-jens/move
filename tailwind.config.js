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
      "grey": "#F9F8F7",
      "transparent-white": "rgba(255, 255, 255, .4)",
      "transparent-blue": "rgba(41, 52, 64, .06)"
    },
    fontFamily: {
      "openSans": ["Open Sans", "sans-serif"],
      "poppins": ["Poppins", "sans-serif"],
    },
    backgroundImage: {
      "gold-gradient": "linear-gradient(180.2deg, rgba(61, 51, 37, 0.9) 0.17%, rgba(53, 46, 35, 0.747) 99.83%)",
      "blue-gradient": "linear-gradient(0deg, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), linear-gradient(98.96deg, #293440 0%, rgba(41, 52, 64, 0.1) 100%)",
      "blog-gradient": "linear-gradient(180deg, rgba(41, 52, 64, 0) 0%, #293440 100%)",
      "hero-gradient": "linear-gradient(180deg, #293440 0%, rgba(41, 52, 64, 0) 30%)"
    },
    boxShadow: {
      "default": "0px 0px 25px rgba(0, 0, 0, 0.15);",
    },
    extend: {},
  },
  plugins: [],
}
