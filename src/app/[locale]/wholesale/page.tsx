import { redirect } from "next/navigation";

import { href, type Locale } from "@/lib/i18n/config";

/** 구(舊) 도매 문의 경로 — CONTACT로 통합되었다. */
export default async function LegacyWholesalePage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  redirect(href(locale, "/contact?type=wholesale"));
}
