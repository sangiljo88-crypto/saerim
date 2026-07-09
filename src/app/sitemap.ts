import type { MetadataRoute } from "next";

import { listFactories, listNews, listProducts } from "@/lib/db/repo";

const BASE = "https://www.saerim.kr";

export const dynamic = "force-dynamic";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages = [
    "", "/why", "/brand", "/business", "/products", "/factory",
    "/quality", "/oem", "/news", "/store", "/contact",
  ].map((path) => ({ url: `${BASE}${path}`, changeFrequency: "weekly" as const }));

  const products = listProducts().map((p) => ({
    url: `${BASE}/products/${p.slug}`,
    changeFrequency: "weekly" as const,
  }));

  const factories = listFactories().map((f) => ({
    url: `${BASE}/factory/${f.slug}`,
    changeFrequency: "monthly" as const,
  }));

  const news = listNews().map((n) => ({
    url: `${BASE}/news/${n.slug}`,
    lastModified: n.publishedAt,
    changeFrequency: "monthly" as const,
  }));

  return [...staticPages, ...products, ...factories, ...news];
}
