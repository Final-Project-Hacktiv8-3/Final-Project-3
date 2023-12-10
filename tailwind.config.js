/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./App.{js,jsx,ts,tsx}",
    "./Screens/**/*.{js,jsx,ts,tsx}",
    "./Components/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Add your custom colors here
        primary: "#3490dc", // Example color
        secondary: "#ffed4a", // Another example color
        "semi-transparent": "rgba(0, 0, 0, 0.5)",
      },
    },
  },
  plugins: [],
};
