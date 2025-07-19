/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      colors: {
        primary: {
          50: '#eff6ff',
          100: '#dbeafe',
          200: '#bfdbfe',
          300: '#93c5fd',
          400: '#60a5fa',
          500: '#3b82f6',
          600: '#2563eb',
          700: '#1d4ed8',
          800: '#1e40af',
          900: '#1e3a8a',
        },
        accent: {
          50: '#fffbea',
          100: '#fdf6e3',
          200: '#fceabb',
          300: '#f7d774',
          400: '#f6c244',
          500: '#e6b007', // classic gold
          600: '#b48a04',
          700: '#8c6a03',
          800: '#6c5202',
          900: '#4d3a01',
        },
        'classic-bg': {
          50: '#f8fafc', // soft white
          100: '#f1f5f9', // light gray
        },
      },
    },
  },
  plugins: [],
} 