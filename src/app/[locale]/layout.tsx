import { notFound } from "next/navigation";

import { LOCALES, isLocale } from "@/lib/i18n/config";

/** 로케일 세그먼트 검증만 담당한다. 화면 골격(Header/Footer)은 루트 레이아웃에 있다. */
export function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  return <>{children}</>;
}
