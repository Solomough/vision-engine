/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/app/**/*.{js,jsx,ts,tsx}",
    "./src/components/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#FFD700", // gold accent used across Navbar, Sidebar, TutorBot, MarketPlanner
      },
    },
  },
  plugins: [],
};
