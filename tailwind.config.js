const {nextui} = require("@nextui-org/react");

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      transitionProperty: {
        "none": "none !important",
      },
    },
    fontFamily: {
      "sans": ["Montserrat", "sans-serif"],
      "serif": ["serif"],
      "mono": ["JetBrains Mono", "monospace"],
    }
  },
  variants: {
    extend: {
      transitionProperty: ["children"],
    }
  },
  darkMode: "class",
  plugins: [
    function ({ addVariant }) {
      addVariant("children", "& *");
    },
    nextui()
  ],
}
