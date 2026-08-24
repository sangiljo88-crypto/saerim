import type { MetadataRoute } from "next";

import { listFactories, listNews, listProducts } from "@/lib/db/repo";

const BASE = "https://www.saerim.kr";

export const dynamic = "force-dynamic";

/** 한국어(접두사 없음)와 중국어(/zh)를 함께 싣고, 서로를 hreflang로 연결한다. */
export default function sitemap(): MetadataRoute.Sitemap {
  const staticPaths = [
    "", "/why", "/brand", "/business", "/products", "/factory",
    "/quality", "/oem", "/news", "/store", "/contact",
  ];

  const productPaths = listProducts().map((p) => `/products/${p.slug}`);
  const factoryPaths = listFactories().map((f) => `/factory/${f.slug}`);
  const news = listNews();

  const entry = (path: string, changeFrequency: "weekly" | "monthly", lastModified?: string) => [
    {
      url: `${BASE}${path}`,
      changeFrequency,
      ...(lastModified ? { lastModified } : {}),
      alternates: { languages: { ko: `${BASE}${path}`, "zh-Hans": `${BASE}/zh${path}` } },
    },
    {
      url: `${BASE}/zh${path}`,
      changeFrequency,
      ...(lastModified ? { lastModified } : {}),
      alternates: { languages: { ko: `${BASE}${path}`, "zh-Hans": `${BASE}/zh${path}` } },
    },
  ];

  return [
    ...staticPaths.flatMap((path) => entry(path, "weekly")),
    ...productPaths.flatMap((path) => entry(path, "weekly")),
    ...factoryPaths.flatMap((path) => entry(path, "monthly")),
    ...news.flatMap((n) => entry(`/news/${n.slug}`, "monthly", n.publishedAt)),
  ];
}
