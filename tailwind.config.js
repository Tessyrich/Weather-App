/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html"],
  theme: {
    extend: {
      backgroundImage: {
        "hero-pattern": "url('../images/day/clear.jpg')",
      },
    },
    plugins: [],
  },
};
