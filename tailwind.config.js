/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html"],
  theme: {
    extend: {
      backgroundImage: {
        "hero-pattern": "url('../images/day/clear.jpg')",
      },
      fontSize: {
        big: "11rem",
        bigger: "15rem",
      },
    },
    plugins: [],
  },
};
