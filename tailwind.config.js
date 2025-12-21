/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}", // To mówi: szukaj we wszystkich podfolderach src
  ],
  theme: {
    extend: {
      colors: {
        background: "#fff7ed", // Kremowy
        card: "#ffffff",
        primary: {
          DEFAULT: "#8b5cf6", // Fiolet
          dark: "#7c3aed",
          light: "#ddd6fe",
        },
        success: {
          DEFAULT: "#58cc02", // Zieleń
          dark: "#46a302",
        },
        error: {
          DEFAULT: "#ef4444", // Czerwień
          dark: "#b91c1c",
        },
        gray: {
          border: "#e5e7eb",
          shadow: "#d1d5db",
        }
      },
      animation: {
        'bounce-slow': 'bounce 3s infinite',
      }
    },
  },
  plugins: [],
};