import type { Metadata } from "next";

import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";

import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://kwangil-dryfood.example"),
  title: {
    default: "광일건해 | 프리미엄 건해산물 브랜드",
    template: "%s | 광일건해",
  },
  description:
    "카테고리 중심으로 구성된 프리미엄 건해산물 브랜드 사이트 샘플. 멸치, 건새우, 미역·다시마, 오징어·건어물, 국물재료, 선물세트를 소개합니다.",
  openGraph: {
    title: "광일건해 | 프리미엄 건해산물 브랜드",
    description: "브랜드 소개부터 카테고리, 제품 상세, 도매 문의까지 연결된 멀티페이지 랜딩 사이트",
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
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
