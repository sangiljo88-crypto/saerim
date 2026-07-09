import type { Metadata } from "next";

import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";

import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.saerim.kr"),
  title: {
    default: "유한회사 새림 | 대한민국 외식 산업을 준비하는 식품 인프라",
    template: "%s | 유한회사 새림",
  },
  description:
    "식당은 손님을 맞이합니다. 새림은 식당을 준비합니다. 군산·김제·용인 공장 기반의 B2B 식품 제조 플랫폼 — 국탕류·뒷고기류·OEM.",
  openGraph: {
    title: "유한회사 새림 | 식품 인프라",
    description: "식품 브랜드 뒤에는 새림이 있습니다.",
    type: "website",
    locale: "ko_KR",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <head>
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable-dynamic-subset.min.css"
        />
      </head>
      <body className="min-h-screen antialiased">
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
