import type { Metadata } from "next";

import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { TopPromoBar } from "@/components/layout/TopPromoBar";

import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://saerim-food.example"),
  title: {
    default: "유한회사 새림 | 식육 포장·가공 및 국탕·뒷고기 전문",
    template: "%s | 유한회사 새림",
  },
  description:
    "유한회사 새림 공식 사이트. 국탕류와 뒷고기류를 중심으로 식육 포장·가공 제품, 도매 공급, 브랜드 사업장을 소개합니다.",
  openGraph: {
    title: "유한회사 새림 | 국탕류·뒷고기류 공장 직송",
    description: "브랜드 소개부터 카테고리, 제품 상세, 도매 문의까지 연결된 멀티페이지 사이트",
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
      <body className="min-h-screen antialiased">
        <TopPromoBar />
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
