/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  variants: {
    extend: {
      display: ['responsive'], // Enable responsive variants for the display utilities
    },
  },
  plugins: [],
}

