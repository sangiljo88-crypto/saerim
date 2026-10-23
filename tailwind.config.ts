import type { Config } from "tailwindcss";

/**
 * 새림 디자인 토큰 — 브랜드 아이덴티티 1.0 (2026-10-24) · docs/brand-system/03-design-system.md 기준.
 * 아이보리로 여백을 만들고, 녹색으로 브랜드를 인식하게 하고, 금색은 구분선·불릿 같은 작은 강조에만 쓴다.
 * 기존 의미 토큰(paper · ink · line · accent · trust)은 이름을 유지하고 값만 브랜드 팔레트로 바꿨다.
 */
const config: Config = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // 브랜드 원색 (로고 원본 추출) + 확장색
        forest: "#1E583A",
        deep: "#123F2E",
        leaf: "#2F684A",
        gold: "#D4AF37",
        ivory: "#F6F3E9",
        mist: "#E8EDE6",
        // 의미 토큰
        paper: {
          DEFAULT: "#F6F3E9", // Ivory — 주 배경
          warm: "#E8EDE6", // Mist — 보조 배경
        },
        ink: {
          400: "#5F6E64", // 캡션·라벨 (아이보리 위 4.9:1)
          600: "#202C25", // 본문
          900: "#123F2E", // Deep — 헤드라인·버튼
          950: "#0D2E22", // Deep 호버
        },
        line: "#D6DBD2",
        accent: {
          DEFAULT: "#1E583A", // Forest — 강조 글자·숫자·호버
          soft: "#E8EDE6",
        },
        trust: {
          DEFAULT: "#1E583A",
          soft: "#E8EDE6",
        },
        // 폼 오류 전용 — 브랜드 팔레트 밖이지만 의미상 유지한다
        danger: "#B42318",
      },
      fontFamily: {
        sans: ["var(--font-pretendard)", "Pretendard Variable", "Pretendard", "Apple SD Gothic Neo", "Noto Sans KR", "sans-serif"],
        // 고운바탕 — 짧은 한국어 브랜드 문장 전용 (한글·라틴 글리프만 있어 중국어에는 쓰지 않는다)
        batang: ["var(--font-batang)", "Gowun Batang", "Apple Myungjo", "Noto Serif KR", "serif"],
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
