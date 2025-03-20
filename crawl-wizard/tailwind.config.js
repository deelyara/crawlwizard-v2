/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#eef2ff',
          100: '#e0e7ff',
          200: '#c7d2fe',
          300: '#a5b4fc',
          400: '#818cf8',
          500: '#6366f1',
          600: '#4f46e5',
          700: '#4338ca',
          800: '#3730a3',
          900: '#312e81',
        },
        'md-background': '#FFFFFF',
        'md-surface': '#F8F9FA',
        'md-on-surface': '#1F1F1F',
        'md-primary': '#1A73E8',
        'md-on-primary': '#FFFFFF',
        'md-secondary': '#E8F0FE',
        'md-on-secondary': '#1A73E8',
        'md-outline': '#DADCE0',
        'md-error': '#B3261E',
        'md-on-error': '#FFFFFF',
      },
      fontFamily: {
        sans: ['Roboto', 'sans-serif'],
      },
      spacing: {
        '4.5': '1.125rem',
      },
      boxShadow: {
        'md-1': '0 1px 2px 0 rgba(60, 64, 67, 0.3), 0 1px 3px 1px rgba(60, 64, 67, 0.15)',
        'md-2': '0 1px 2px 0 rgba(60, 64, 67, 0.3), 0 2px 6px 2px rgba(60, 64, 67, 0.15)',
      },
    },
  },
  plugins: [],
}