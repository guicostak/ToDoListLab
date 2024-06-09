/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'background-main': 'rgb(30, 28, 40)',
        'main-color': 'rgba(67,76,150,300)',
        'main-color-hover': 'rgba(77,86,160,300)',
        'background-task': 'rgba(231,229,229,255)',
      },
    },
  },
  plugins: [],
};