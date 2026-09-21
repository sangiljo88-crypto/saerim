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
import { SITE_IMAGE, SITE_URL } from "@/lib/seo";

import "./globals.css";

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
      title: t.meta.siteTitle,
      description: t.meta.description,
      url: `${SITE_URL}${href(locale, path)}`,
      siteName: t.common.companyShort,
      images: [{ url: SITE_IMAGE, alt: t.common.companyName }],
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
  const naverVerification = process.env.NAVER_SITE_VERIFICATION?.trim();

  // 한국어 페이지는 국내 회사명·주소, 해외 페이지는 영문 주소와 국가번호를 제공한다
  const organization = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${SITE_URL}/#organization`,
    name: "새림",
    legalName: "유한회사 새림",
    alternateName: ["유한회사 새림", "(유)새림", "SAERIM", "SAERIM Co., Ltd.", "SAERIM 有限公司"],
    description: t.common.orgDescription,
    url: SITE_URL,
    logo: `${SITE_URL}/images/logo.svg`,
    foundingDate: "2014",
    address: {
      "@type": "PostalAddress",
      streetAddress: locale === "ko" ? "옥산면 산성로 154" : "154 Sanseong-ro, Oksan-myeon",
      addressLocality: locale === "ko" ? "군산시" : "Gunsan-si",
      addressRegion: locale === "ko" ? "전북특별자치도" : "Jeonbuk State",
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
    knowsAbout: locale === "ko"
      ? ["돼지 부산물", "머릿고기", "돼지 내장", "뒷고기", "국밥 재료", "육가공 OEM"]
      : ["pork by-products", "boiled pork head", "pork offal", "OEM meat processing", "HACCP"],
  };

  return (
    <html lang={LOCALE_META[locale].htmlLang}>
      <head>
        {naverVerification && <meta name="naver-site-verification" content={naverVerification} />}
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
        <JsonLd data={{
          "@context": "https://schema.org",
          "@type": "WebSite",
          "@id": `${SITE_URL}/#website`,
          url: `${SITE_URL}/`,
          name: "새림",
          alternateName: ["유한회사 새림", "SAERIM"],
          inLanguage: ["ko", "en", "zh-Hans"],
          publisher: { "@id": `${SITE_URL}/#organization` },
        }} />
      </body>
    </html>
  );
}
