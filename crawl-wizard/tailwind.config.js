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
          50: '#e3f2fd',
          100: '#bbdefb',
          200: '#90caf9',
          300: '#64b5f6',
          400: '#42a5f5',
          500: '#2196f3',
          600: '#1e88e5',
          700: '#1976d2',
          800: '#1565c0',
          900: '#0d47a1',
        },
        'md-background': '#FFFFFF',
        'md-surface': '#F8F9FA',
        'md-surface-variant': '#F3F4F6',
        'md-on-surface': '#1F1F1F',
        'md-primary': '#1976d2',
        'md-primary-container': '#e3f2fd',
        'md-on-primary': '#FFFFFF',
        'md-on-primary-container': '#0d47a1',
        'md-secondary': '#E8F0FE',
        'md-secondary-container': '#d7e3fc',
        'md-on-secondary': '#1976d2',
        'md-on-secondary-container': '#0d47a1',
        'md-outline': '#DADCE0',
        'md-outline-variant': '#E0E3E7',
        'md-error': '#B3261E',
        'md-on-error': '#FFFFFF',
        'md-success': '#2e7d32',
        'md-on-success': '#FFFFFF',
      },
      fontFamily: {
        sans: ['Roboto', 'sans-serif'],
      },
      spacing: {
        '4.5': '1.125rem',
      },
      boxShadow: {
        'md-1': '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
        'md-2': '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
        'md-3': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        'md-4': '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
        'md-card': '0 1px 3px rgba(0, 0, 0, 0.05), 0 1px 2px rgba(0, 0, 0, 0.06)',
        'md-card-hover': '0 4px 6px -1px rgba(0, 0, 0, 0.08), 0 2px 4px -1px rgba(0, 0, 0, 0.04)',
        'md-dropdown': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        'md-button': '0 1px 2px rgba(0, 0, 0, 0.06)',
        'md-button-hover': '0 2px 4px rgba(0, 0, 0, 0.06)',
      },
      borderRadius: {
        'md': '0.5rem',
        'md-sm': '0.375rem',
        'md-lg': '0.75rem',
      },
      transitionProperty: {
        'height': 'height',
        'spacing': 'margin, padding',
      },
      animation: {
        'ripple': 'ripple 0.6s linear forwards',
      },
      keyframes: {
        ripple: {
          '0%': { transform: 'scale(0)', opacity: 0.7 },
          '100%': { transform: 'scale(2)', opacity: 0 },
        },
      },
    },
  },
  plugins: [],
}