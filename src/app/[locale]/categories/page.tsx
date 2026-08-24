import { redirect } from "next/navigation";

import { href, type Locale } from "@/lib/i18n/config";

/** 구(舊) 카테고리 경로 — 새 IA의 제품 페이지로 통합되었다. */
export default async function LegacyCategoriesPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  redirect(href(locale, "/products"));
}
