/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: "jit",
  purge: ["./src/**/*.{js,jsx,ts,tsx}"],
  darkMode: 'class',

  theme: {
    extend:{
      colors:{
        'dark-teal':'#00303f'
      }
    }
  },
  variants: {},
  plugins: [],
};
