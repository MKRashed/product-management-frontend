/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        "noto-bangla": ["Noto Sans Bengali", "sans-serif"],
        lily: ["Courgette"],
      },
    },
  },
  plugins: [],
};
