import type { Config } from "tailwindcss";

/**
 * 새림 디자인 토큰 — docs/brand-system/03-design-system.md 기준.
 * 여기 정의된 색·타입 스케일 외의 값은 페이지에서 사용하지 않는다.
 */
const config: Config = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        paper: {
          DEFAULT: "#FFFFFF",
          warm: "#FAFAF8",
        },
        ink: {
          400: "#9CA3AF",
          600: "#4B5563",
          900: "#111417",
          950: "#0A0C0E",
        },
        line: "#E5E7EB",
        accent: {
          DEFAULT: "#B42318",
          soft: "#FBEAE8",
        },
        trust: {
          DEFAULT: "#0E4D45",
          soft: "#E7F0EE",
        },
      },
      fontSize: {
        display: ["clamp(2.5rem, 5vw, 4.5rem)", { lineHeight: "1.1", fontWeight: "700" }],
        h1: ["2.25rem", { lineHeight: "1.2", fontWeight: "700" }],
        h2: ["1.75rem", { lineHeight: "1.3", fontWeight: "700" }],
        h3: ["1.125rem", { lineHeight: "1.4", fontWeight: "600" }],
        body: ["1.0625rem", { lineHeight: "1.75" }],
        label: ["0.8125rem", { lineHeight: "1.4", fontWeight: "600" }],
      },
      keyframes: {
        "slow-zoom": {
          "0%": { transform: "scale(1)" },
          "100%": { transform: "scale(1.05)" },
        },
      },
      animation: {
        "slow-zoom": "slow-zoom 12s ease-out forwards",
      },
    },
  },
  plugins: [],
};

export default config;
