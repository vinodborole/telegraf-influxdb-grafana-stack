/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: "jit",
  purge: ["./src/**/*.{js,jsx,ts,tsx}"],
  darkMode: 'class',

  theme: {
    extend:{
      colors:{
        'simnovous-teal':'#00303f',
        'simnovous-orange':'#ec691f',
        'simnovous-dark-teal':"#1f2937",
      }
    }
  },
  variants: {},
  plugins: [
    require('tailwind-scrollbar')
  ],
};
