import type { Metadata } from "next";

import { getDict } from "@/lib/i18n";
import { href, hreflangMap, LOCALE_META, type Locale } from "@/lib/i18n/config";

export const SITE_URL = "https://www.saerim.kr";
export const SITE_IMAGE = "/images/company/hero-main-photo4.jpg";

/** Keep the page title, search description and social preview about the same content. */
export function pageMetadata(
  locale: Locale,
  path: string,
  page: { title: string; description: string; image?: string },
): Metadata {
  const dict = getDict(locale);
  const title = dict.meta.titleTemplate.replace("%s", page.title);
  const url = `${SITE_URL}${href(locale, path)}`;
  const images = [{ url: new URL(page.image || SITE_IMAGE, SITE_URL).href, alt: page.title }];

  return {
    title: page.title,
    description: page.description,
    alternates: { canonical: url, languages: hreflangMap(SITE_URL, path) },
    openGraph: {
      title,
      description: page.description,
      url,
      siteName: dict.common.companyName,
      type: "website",
      locale: LOCALE_META[locale].ogLocale,
      images,
    },
    twitter: { card: "summary_large_image", title, description: page.description, images },
  };
}
