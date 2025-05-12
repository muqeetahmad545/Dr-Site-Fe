/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}", // This includes your pages, components, etc.
  ],
  theme: {
    extend: {
      colors: {
        primary: '#1e40af',
        secondary: '#2563eb',
      },
      fontFamily: {
        sans: ['Poppins', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
