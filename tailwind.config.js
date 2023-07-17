/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
        "poppins-semibold": ["Poppins-semibold", "sans-serif"],
        "poppins-bold": ["Poppins-bold", "sans-serif"],
        "poppins-extra-bold": ["Poppins-extra-bold", "sans-serif"],
        "poppins-black": ["Poppins-black", "sans-serif"],
      },
      colors: {
        color1: "#F97316", //orange-500
        color2: "#FB923C", //orange-400
        color3: "#FFBA74", //orange-300
        color4: "#F3B308", //yellow-500
        color5: "#F7F1E5", //yellow-200
      },
    },
  },
  plugins: [],
};
