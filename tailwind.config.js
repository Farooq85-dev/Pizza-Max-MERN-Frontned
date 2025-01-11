/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        navbarColor: "#270800",
        btnColor: "#0F0F0F",
        bodyColor: "#f8f9fa",
        footerColor: "#f3f4f6",
      },
      screens: {
        sm: "480px",
        md: "768px",
        lg: "1280px",
      },
    },
  },
  plugins: [],
};
