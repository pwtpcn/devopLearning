import type { Config } from "tailwindcss";

export default {
  content: ["./app/**/{**,.client,.server}/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: [
          '"Inter"',
          "ui-sans-serif",
          "system-ui",
          "sans-serif",
          '"Apple Color Emoji"',
          '"Segoe UI Emoji"',
          '"Segoe UI Symbol"',
          '"Noto Color Emoji"',
        ],
        Sarabun: [
          "Sarabun",
          "ui-sans-serif"
        ],
        Poppins: [
          "Poppins",
          "ui-sans-serif"
        ]
      },
    },
  },
  plugins: [],
} satisfies Config;
