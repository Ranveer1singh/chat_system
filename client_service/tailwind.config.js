/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  important: '#root',
  theme: {
    extend: {
      colors: {
        brand: {
          green: '#2D6936',
          light: '#A5D6A7',
          cream: '#E8F0E8',
        },
      },
    },
  },
  plugins: [],
}

