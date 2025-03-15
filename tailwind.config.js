/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-geist-sans)'],
        mono: ['var(--font-geist-mono)'],
        heading: ['var(--font-rethink-sans)'],
      },
      colors: {
        primary: {
          DEFAULT: '#223f47',
          dark: '#1a2f35',
          light: '#2a4c55',
        },
        secondary: '#4a8d9b',
        accent: '#6db0bd',
        background: '#E8E7E7',
      },
    },
  },
  plugins: [],
}; 