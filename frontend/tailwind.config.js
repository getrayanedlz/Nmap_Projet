/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  mode: "jit",
  theme: {
    extend: {
      colors: {
        primary: "#1e293b",
        green: "#1FC77E",
        "green-50": "#f0fdf4",
        "green-700": "#15803d",
        black: "#000000",
        white: "#FFFFFF",
      },
    },
  },
  plugins: [],
};
