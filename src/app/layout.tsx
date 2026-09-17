import type { Metadata } from "next";
import { headers } from "next/headers";

import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { JsonLd } from "@/components/seo/JsonLd";
import { getSettings } from "@/lib/content";
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
    keywords: t.meta.keywords,
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
  const t = getDict(locale);
  const settings = getSettings(locale);

  // Organization 구조화 데이터 — 주소·전화는 해외에서도 읽히도록 영문/국가번호 표기로 고정한다
  const organization = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "SAERIM Co., Ltd.",
    alternateName: ["유한회사 새림", "SAERIM 有限公司"],
    description: t.common.orgDescription,
    url: SITE_URL,
    logo: `${SITE_URL}/images/logo.svg`,
    foundingDate: "2014",
    address: {
      "@type": "PostalAddress",
      streetAddress: "154 Sanseong-ro, Oksan-myeon",
      addressLocality: "Gunsan-si",
      addressRegion: "Jeonbuk State",
      addressCountry: "KR",
    },
    contactPoint: [
      {
        "@type": "ContactPoint",
        telephone: "+82-63-464-8681",
        email: settings.contact_email ?? "info@saerim.kr",
        contactType: "sales",
        availableLanguage: ["ko", "en", "zh"],
      },
    ],
    // LinkedIn 기업 페이지가 생기면 여기에 추가한다
    sameAs: ["https://vo.la/RFDWcIg"],
    knowsAbout: ["pork by-products", "boiled pork head", "pork offal", "OEM meat processing", "HACCP"],
  };

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
        <JsonLd data={organization} />
      </body>
    </html>
  );
}
