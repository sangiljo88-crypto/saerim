import { redirect } from "next/navigation";

const CATEGORY_MAP: Record<string, string> = {
  guktang: "국탕류",
  dwitgogi: "뒷고기류",
};

/** 구(舊) 카테고리 상세 경로 — 새 제품 페이지의 카테고리 필터로 연결한다. */
export default async function LegacyCategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const category = CATEGORY_MAP[slug];
  redirect(category ? `/products?category=${encodeURIComponent(category)}` : "/products");
}
