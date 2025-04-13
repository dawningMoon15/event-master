/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Original theme colors
        primary: {
          DEFAULT: '#6F1D1B',
          light: '#BB9457',
        },
        secondary: {
          DEFAULT: '#432818',
          light: '#99582A',
        },
        accent: '#FFE6A7',
        
        // Theme system colors
        background: 'var(--color-background)',
        text: 'var(--color-text)',
        'text-secondary': 'var(--color-text-secondary)',
        border: 'var(--color-border)',
        'border-light': 'var(--color-border-light)',
        success: 'var(--color-success)',
        error: 'var(--color-error)',
        warning: 'var(--color-warning)',
        info: 'var(--color-info)',
      },
      backdropBlur: {
        xs: '2px',
      },
    },
  },
  plugins: [],
};