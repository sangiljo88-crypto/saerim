import type { Metadata } from "next";
import { headers } from "next/headers";

import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import {
  DEFAULT_LOCALE,
  LOCALE_HEADER,
  LOCALE_META,
  PATH_HEADER,
  LOCALES,
  href,
  hreflangMap,
  isLocale,
} from "@/lib/i18n/config";
import { getDict } from "@/lib/i18n";

import "./globals.css";

const SITE_URL = "https://www.saerim.kr";

export async function generateMetadata(): Promise<Metadata> {
  const headerList = await headers();
  const headerLocale = headerList.get(LOCALE_HEADER);
  const locale = isLocale(headerLocale) ? headerLocale : DEFAULT_LOCALE;
  const path = headerList.get(PATH_HEADER) ?? "/";
  const t = getDict(locale);
  const meta = LOCALE_META[locale];

  return {
    metadataBase: new URL(SITE_URL),
    title: { default: t.meta.siteTitle, template: t.meta.titleTemplate },
    description: t.meta.description,
    alternates: {
      canonical: `${SITE_URL}${href(locale, path)}`,
      languages: hreflangMap(SITE_URL, path),
    },
    openGraph: {
      title: t.meta.ogTitle,
      description: t.meta.ogDescription,
      type: "website",
      locale: meta.ogLocale,
      alternateLocale: LOCALES.filter((l) => l !== locale).map((l) => LOCALE_META[l].ogLocale),
    },
  };
}

/** middleware가 심어준 로케일을 읽는다 (없으면 한국어) */
async function currentLocale() {
  const value = (await headers()).get(LOCALE_HEADER);
  return isLocale(value) ? value : DEFAULT_LOCALE;
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = await currentLocale();

  return (
    <html lang={LOCALE_META[locale].htmlLang}>
      <head>
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable-dynamic-subset.min.css"
        />
      </head>
      <body className="min-h-screen antialiased">
        <Header locale={locale} />
        <main>{children}</main>
        <Footer locale={locale} />
      </body>
    </html>
  );
}
