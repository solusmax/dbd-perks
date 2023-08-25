/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {},
    fontFamily: {
      'roboto-condensed': ['"Roboto Condensed"', '"Arial Narrow"', '"Arial"', 'sans-serif'],
    }
  },
  plugins: [],
}

