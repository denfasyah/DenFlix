/** @type {import('tailwindcss').Config} */
import daisyui from "daisyui"

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "denflix-primary": "#d2f801", 
        "denflix-secondary": "#121212",
        "denflix-accent": "#000000",
        "denflix-midnight": "#080808",
      },
      fontFamily: {
        sans: ["Poppins", "sans-serif"],
      },
    },
  },
  plugins: [daisyui],
}