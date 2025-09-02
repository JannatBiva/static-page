import type { Config } from "tailwindcss";
export default {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          teal: "#0fb9c6",
          dark: "#102a43",
          light: "#f5f7fa",
          gray: "#627d98",
          accent: "#ffd166"
        },
      },
      boxShadow: {
        card: "0 15px 40px rgba(16,42,67,0.08)",
      },
    },
  },
  plugins: [],
} satisfies Config;
