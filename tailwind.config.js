/** @type {import('tailwindcss').Config} */

const defaultTheme = require("tailwindcss/defaultTheme")

module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Merriweather Sans", ...defaultTheme.fontFamily.sans],
      },
    },
  },
  daisyui: {
    themes: ["dracula", "autumn"],
  },
  plugins: [require("daisyui")],
}
