/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'light-blue': '#e0f7fa', // Example light blue
        'dark-blue': '#003366', // Example dark blue
        'dark-blue-dark': '#002244', // Darker shade of dark blue
      },
    },
  },
  plugins: [],
};