/** @type {import('tailwindcss').Config} */
const colors = require("tailwindcss/colors");
const defaultTheme = require("tailwindcss/defaultTheme");
module.exports = {
  content: ["./src/**/*.{astro,html,js,jsx,mjs,md,mdx,svelte,ts,tsx,vue}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        gray: colors.neutral,
        primary: colors.indigo,
        // Light Mode
        light: {
          background: '#F7F5F0', // Nền chính
          surface: '#B3A795',    // Cấu trúc/Border/Card
          foreground: '#1C1B1A', // Chữ chính
          accent: '#FF5722',     // Nhấn
        },
        // Dark Mode
        dark: {
          background: '#161413', // Nền chính
          surface: '#2D2724',    // Cấu trúc/Card
          foreground: '#E6DFD3', // Chữ chính
          accent: '#00F5D4',     // Nhấn
        },
      },
      // 👇 TÙY CHỈNH BORDER & RING TẠI ĐÂY
      borderColor: theme => ({
        DEFAULT: '#B3A795', // Khi viết class "border", nó sẽ tự lấy màu Taupe này (Light Mode)
      }),
      ringOffsetColor: {
        // Tạo sẵn các khoảng đệm trùng với màu nền để hiệu ứng ring "gầm" lên đẹp hơn
        'light': '#F7F5F0', 
        'dark': '#161413',
      },
      fontFamily: {
        sans: ["Inter Variable", "Inter", ...defaultTheme.fontFamily.sans],
      },
      aspectRatio: {
        "4/3": "4 / 3",
        "3/2": "3 / 2",
        "2/3": "2 / 3",
        "9/16": "9 / 16",
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
