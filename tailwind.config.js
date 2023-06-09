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
      md: "840px",
      lg: "1240px",
      xl: "1640px",
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
          600: "#546e7a70",
          700: "#455a6470",
          800: "#37474f70",
        },
      },
      fontFamily: {
        "source-sans-3": ['"Source Sans 3"', "sans-serif"],
        quicksand: ['"Quicksand"', "sans-serif"],
        "dancing-script": ['"Dancing Script"', "cursive"],
        arial: ['"Arial"', "sans-serif"],
      },
      keyframes: {
        "fade-in-up": {
          "0%": {
            opacity: "0",
            transform: "translateY(200px)",
          },
          "30%": {
            opacity: "0",
            transform: "translateY(200px)",
          },
          "100%": {
            opacity: "1",
            transform: "translateY(0)",
          },
        },
        "flip-horizontal": {
          "0%": { transform: "rotateY(90deg)" },
          "30%": { transform: "rotateY(60deg)" },
          "60%": { transform: "rotateY(35deg)" },
          "80%": { transform: "rotateY(10deg)" },
          "90%": { transform: "rotateY(0deg)" },
        },
        "enter-from-right": {
          "0%": {
            opacity: "0",
            transform: "translateX(10vw)",
          },
          "15%": {
            opacity: "0.3",
            transform: "translateX(8vw)",
          },
          "30%": {
            opacity: "0.5",
            transform: "translateX(6vw)",
          },
          "45%": {
            opacity: "1",
            transform: "translateX(4vw)",
          },
          "60%": {
            opacity: "1",
            transform: "translateX(2vw)",
          },
          "75%": {
            opacity: "1",
            transform: "translateX(1vw)",
          },
          "90%": {
            opacity: "1",
            transform: "translateX(0vw)",
          },
        },
        heartbeat: {
          "0%": {
            transform: "scale(1)",
          },
          "14%": {
            transform: "scale(1.1)",
          },
          "28%": {
            transform: "scale(1)",
          },
          "42%": {
            transform: "scale(1.1)",
          },
          "70%": {
            transform: "scale(1)",
          },
        },
      },
      animation: {
        "fade-in-up": "fade-in-up 4s ease-out",
        "flip-x": "flip-horizontal 0.5s 1 ease-in",
        "enter-r": "enter-from-right 0.5s ease-in",
        heartbeat: "heartbeat 1s 1s 1",
      },
    },
  },
  plugins: [],
});
