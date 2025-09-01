/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        tesla: {
          black: '#000000',
          'dark-gray': '#171a20',
          'medium-gray': '#393c41',
          'light-gray': '#5c5e62',
          white: '#ffffff',
          red: '#dc2626',
          'red-hover': '#b91c1c',
        },
        primary: {
          50: '#f8fafc',
          500: '#000000',
          600: '#171a20',
          700: '#0f0f0f',
        },
        danger: {
          500: '#dc2626',
          600: '#b91c1c',
        },
        warning: {
          500: '#f59e0b',
          600: '#d97706',
        },
        success: {
          500: '#22c55e',
          600: '#16a34a',
        }
      },
      backgroundImage: {
        'tesla-gradient': 'linear-gradient(135deg, #000000 0%, #171a20 100%)',
      }
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}