/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class", // use the “class” strategy for dark mode
  content: [
    // include your HTML entrypoint if you have one
    "./index.html",

    // all of your React/TSX files
    "./src/**/*.{js,jsx,ts,tsx}",

    // Rewind-UI component styles
    "./node_modules/@rewind-ui/core/**/*.js",
    "./node_modules/@rewind-ui/core/dist/theme/styles/*.js",

    // any manual styles or constants you keep in .ts
    "./src/theme/styles/*.{js,ts}",
  ],
  theme: {
    extend: {
      colors: {
        softBeige: "#FAF3E0", // your custom beige
        darkBackground: "#1A202C", // your darker bg for dark mode
      },
    },
  },
  plugins: [
    // add this if you end up using @tailwindcss/forms, typography, etc.
    // require('@tailwindcss/forms'),
    // require('@tailwindcss/typography'),
  ],
};
