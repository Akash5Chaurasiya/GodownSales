// module.exports = {
//   plugins: [
//     ["nativewind/babel", { tailwindConfig: "./tailwind.native.config.js" }],
//   ],
// };

// /** @type {import('tailwindcss').Config} */
// module.exports = {
//   content: ["./App.{js,jsx,ts,tsx}", "./src/**/*.{js,jsx,ts,tsx}","./src/**/**/*.{js,jsx,ts,tsx}"],
//   theme: {
//     extend: {},
//   },
//   plugins: ["nativewind/babel"],
// }
// tailwind.config.js

module.exports = {
  //  content: [],
  content: ["./App.{js,jsx,ts,tsx}", "./src/**/*.{js,jsx,ts,tsx}"],
    theme: {
      extend: {},
    },
    plugins: [],
  }