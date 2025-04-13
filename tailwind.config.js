/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'primary': {
          DEFAULT: '#6F1D1B',
          light: '#BB9457',
        },
        'secondary': {
          DEFAULT: '#432818',
          light: '#99582A',
        },
        'accent': '#FFE6A7',
      }
    },
  },
  plugins: [],
};