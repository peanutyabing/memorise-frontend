/** @type {import('tailwindcss').Config} */
const withMT = require("@material-tailwind/react/utils/withMT");

module.exports = withMT({
  content: ["./src/**/*.{html,js,jsx,ts,tsx}"],
  darkMode: "class",
  theme: {
    screens: {
      xxs: "320px",
      xs: "460px",
      sm: "632px",
      md: "768px",
      lg: "1140px",
      xl: "1560px",
    },
    fontFamily: {
      sans: ["Quicksand", "sans-serif"],
    },
    extend: {
      colors: {
        white: "#f8f7f3",
        black: "#16181b",
        yellow: "#f8b500",
        sky: {
          50: "#f0f9ff",
          100: "#e0f2fe",
          200: "#bae6fd",
          300: "#7dd3fc",
          400: "#38bdf8",
          500: "#0ea5e9",
          600: "#0284c7",
          700: "#0369a1",
          800: "#075985",
          900: "#0c4a6e",
        },
        pale: {
          50: "#eceff170",
          100: "#cfd8dc70",
          200: "#b0bec570",
          500: "#607d8b70",
          700: "#455a6470",
          800: "#37474f70",
        },
      },
      fontFamily: {
        "source-sans-3": ['"Source Sans 3"', "sans-serif"],
        quicksand: ['"Quicksand"', "sans-serif"],
        "dancing-script": ['"Dancing Script"', "cursive"],
      },
    },
  },
  plugins: [],
});
