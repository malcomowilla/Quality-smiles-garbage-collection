const flowbite = require("flowbite-react/tailwind");

/** @type {import('tailwindcss').Config} */
export default {

  theme: {
  extend: {
  backgroundColor: {
  primary: 'var(--color-primary)',
  secondary: 'var(--color-secondary)',
  hover: 'var(--color-hover)',
  light: 'var(--color-light)'
  },
  animation: { 
  'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
  'spin-slow': 'spin 3s linear infinite'
  },
colors: {
emerald: {
  '50': '#ecfdf5',
	'100': '#d1fae5',
  '200': '#a7f3d0',
  '300': '#6ee7b7',
  '400': '#34d399',
  '500': '#10b981',
  '600': '#059669',
	'700': '#047857',
  '800': '#065f46',
  '900': '#064e3b'
	},
  border_focused_orange: 'var(--color-border-focused-orange)',
  border_focused_sky: 'var(--color-border-focused-sky)',
  border_focused_green: 'var(--color-border-focused-green)',
  primary: 'var(--color-primary)',
  warn_primary: 'var(--color-warn-primary)',
  warn_secondary: 'var(--color-warn-secondary)',
  warn_hover: 'var(--color-warn-hover)',
  warn_light: 'var(--color-warn-light)',
  secondary: 'var(--color-secondary)',
  hover: 'var(--color-hover)',
  light: 'var(--color-light)'
  },
  borderColor: {
  primary: 'var(--color-primary)',
  secondary: 'var(--color-secondary)',
  hover: 'var(--color-hover)',
  light: 'var(--color-light)'
  },
  textColor: {
  primary: 'var(--color-primary)',
  secondary: 'var(--color-secondary)',
  hover: 'var(--color-hover)',
  light: 'var(--color-light)'
  },
  borderRadius: {
  lg: 'var(--radius)',
  md: 'calc(var(--radius) - 2px)',
  sm: 'calc(var(--radius) - 4px)'
  }
  }
  },

  // darkMode: ['class', 'class'],

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
      require("tailwindcss-animate")
],
}