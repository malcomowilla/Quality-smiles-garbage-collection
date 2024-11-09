

const flowbite = require("flowbite-react/tailwind");

/** @type {import('tailwindcss').Config} */
export default {

  theme: {
    extend: {
      backgroundColor: {
        'native-hover': 'rgba(0,0,0,0.05)',
        'native-active': 'rgba(0,0,0,0.1)',
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      colors: {
        emerald: {
          50: '#ecfdf5',
          100: '#d1fae5',
          200: '#a7f3d0',
          300: '#6ee7b7',
          400: '#34d399',
          500: '#10b981',
          600: '#059669',
          700: '#047857',
          800: '#065f46',
          900: '#064e3b',
        },
      },
    },
  },

  
  darkMode: 'selector',

  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/flowbite/**/*.js",
    flowbite.content(),

  ],


  variants: {
    extend: {
      backdropFilter: ['hover', 'focus'],
    },
  },
  daisyui: {
    themes: [
      "light",
      "dark",
      "cupcake",
      "bumblebee",
      "emerald",
      "corporate",
      "synthwave",
      "retro",
      "cyberpunk",
      "valentine",
      "halloween",
      "garden",
      "forest",
      "aqua",
      "lofi",
      "pastel",
      "fantasy",
      "wireframe",
      "black",
      "luxury",
      "dracula",
      "cmyk",
      "autumn",
      "business",
      "acid",
      "lemonade",
      "night",
      "coffee",
      "winter",
      "dim",
      "nord",
      "sunset",
    ],
  },
  
  plugins: [
    require('daisyui'),
    require('tailwind-scrollbar'),
    require('flowbite/plugin'),
    require('@shrutibalasa/tailwind-grid-auto-fit'),
    flowbite.plugin(),


  ],


}