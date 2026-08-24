import { redirect } from "next/navigation";

import { href, type Locale } from "@/lib/i18n/config";

const CATEGORY_MAP: Record<string, string> = {
  guktang: "국탕류",
  dwitgogi: "뒷고기류",
};

/** 구(舊) 카테고리 상세 경로 — 새 제품 페이지의 카테고리 필터로 연결한다. */
export default async function LegacyCategoryPage({
  params,
}: {
  params: Promise<{ locale: Locale; slug: string }>;
}) {
  const { locale, slug } = await params;
  const category = CATEGORY_MAP[slug];
  redirect(
    href(locale, category ? `/products?category=${encodeURIComponent(category)}` : "/products"),
  );
}
