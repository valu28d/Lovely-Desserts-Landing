/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/flowbite/**/*.js"
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          "50": "#FFF5F7",
          "100": "#FFE4E8",
          "200": "#FFCCD5",
          "300": "#FFB4C2",
          "400": "#FF9CB0",
          "500": "#FF85A1",
          "600": "#F06292",
          "700": "#E91E63",
          "800": "#C2185B",
          "900": "#880E4F"
        },
        pink: {
          "50": "#FFF5F7",
          "100": "#FFE4E8",
          "200": "#FFCCD5",
          "300": "#FFB4C2",
          "400": "#FF9CB0",
          "500": "#FF85A1",
          "600": "#F06292",
          "700": "#E91E63",
          "800": "#C2185B",
          "900": "#880E4F"
        }
      }
    },
  },
  plugins: [
    require('flowbite/plugin')
  ],
}
