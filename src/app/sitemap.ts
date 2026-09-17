import type { MetadataRoute } from "next";

import { listFactories, listNews, listProducts } from "@/lib/db/repo";
import { LOCALES, href, hreflangMap } from "@/lib/i18n/config";

const BASE = "https://www.saerim.kr";

export const dynamic = "force-dynamic";

/** 한국어(접두사 없음) · 영어(/en) · 중국어(/zh)를 함께 싣고, 서로를 hreflang로 연결한다. */
export default function sitemap(): MetadataRoute.Sitemap {
  const staticPaths = [
    "", "/why", "/brand", "/business", "/products", "/factory",
    "/quality", "/oem", "/news", "/store", "/contact",
  ];

  const productPaths = listProducts().map((p) => `/products/${p.slug}`);
  const factoryPaths = listFactories().map((f) => `/factory/${f.slug}`);
  const news = listNews();

  const entry = (path: string, changeFrequency: "weekly" | "monthly", lastModified?: string) =>
    LOCALES.map((locale) => ({
      url: `${BASE}${href(locale, path || "/")}`,
      changeFrequency,
      ...(lastModified ? { lastModified } : {}),
      alternates: { languages: hreflangMap(BASE, path || "/") },
    }));

  return [
    ...staticPaths.flatMap((path) => entry(path, "weekly")),
    ...productPaths.flatMap((path) => entry(path, "weekly")),
    ...factoryPaths.flatMap((path) => entry(path, "monthly")),
    ...news.flatMap((n) => entry(`/news/${n.slug}`, "monthly", n.publishedAt)),
  ];
}
