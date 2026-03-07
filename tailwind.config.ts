import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/data/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#f8f6f0",
          100: "#efeadb",
          200: "#dfd2b2",
          300: "#cfbb88",
          400: "#be9f5e",
          500: "#a78443",
          600: "#856935",
          700: "#654f2a",
          800: "#45361f",
          900: "#261e13"
        },
        deep: {
          900: "#111827",
          950: "#0b1020"
        }
      },
      boxShadow: {
        soft: "0 12px 32px rgba(11,16,32,0.08)",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" }
        }
      },
      animation: {
        "fade-up": "fade-up 0.7s ease-out forwards"
      }
    }
  },
  plugins: [],
};

export default config;
