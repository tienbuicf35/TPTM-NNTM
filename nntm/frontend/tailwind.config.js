/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      boxShadow: {
        glow: '0 0 0 1px rgba(34,197,94,0.18), 0 18px 50px rgba(16,185,129,0.18)',
      },
    },
  },
  plugins: [],
}

