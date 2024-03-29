/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./public/**/*.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
       // add a font family from google fonts
    fontFamily: {
      'sans': ['Rubik', 'sans-serif'],

    },

  }

  },
  daisyui: {
    themes: [
      {
        clientTheme: {
          "primary": "#ff7c24",

          "secondary": "#0a2463",

          "accent": "#aaaaaa",

          "neutral": "#ffffff",

          "base-100": "#fff",
          "info": "#789DE3",

          "success": "#34d399",

          "warning": "#F2C121",

          "error": "#dc2626",

          "whity" :"ffff",
        },
        providerTheme: {
          "primary":"#2c5cc5" ,
          "secondary":"#e05823" ,
          "accent": "#aaaaaa",
          "neutral": "#fecdd3",
          "base-100": "#fff",
          "info": "#789DE3",
          "success": "#34d399",
          "warning": "#F2C121",
          "error": "#DA492F",
          "whity" :"ffff",
        },
      },
    ],
  },

  plugins: [require("daisyui",'prettier-plugin-tailwindcss')],
};
