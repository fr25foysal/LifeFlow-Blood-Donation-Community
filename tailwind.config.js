/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  daisyui: {
    themes: [
      {
        mytheme: {
          primary: "#d90429",

          secondary: "#2b2d42",

          error: "#8d99ae",
          
          accent: "#ef233c", 

          white: "#ffffff",

          neutral: "#edf2f4",
        },
      },
      "dark",
      "cupcake",
    ],
  },
  theme: {

    fontFamily: {
      raleway: "Raleway, sans-serif",
      inter: "'Inter', sans-serif",
    },
    extend: {},
  },
  plugins: [require("daisyui")],
};

