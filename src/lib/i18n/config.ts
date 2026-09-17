/**
 * 다국어 설정 — 한국어(기본)는 접두사 없는 기존 URL을 그대로 쓰고,
 * 영어는 /en, 중국어는 /zh 접두사를 붙인다. (중국 비즈니스용 QR 링크: https://www.saerim.kr/zh)
 * LOCALES 순서가 곧 언어 전환 버튼의 표시 순서다. (한국어 | English | 中文)
 */

export const LOCALES = ["ko", "en", "zh"] as const;
export type Locale = (typeof LOCALES)[number];

export const DEFAULT_LOCALE: Locale = "ko";

/** middleware가 요청 헤더에 심어주는 현재 로케일 키 */
export const LOCALE_HEADER = "x-saerim-locale";

/** middleware가 함께 심어주는, 로케일 접두사를 뗀 현재 경로 */
export const PATH_HEADER = "x-saerim-path";

export const LOCALE_META: Record<Locale, { label: string; htmlLang: string; ogLocale: string }> = {
  ko: { label: "한국어", htmlLang: "ko", ogLocale: "ko_KR" },
  en: { label: "English", htmlLang: "en", ogLocale: "en_US" },
  zh: { label: "中文", htmlLang: "zh-Hans", ogLocale: "zh_CN" },
};

export function isLocale(value: unknown): value is Locale {
  return typeof value === "string" && (LOCALES as readonly string[]).includes(value);
}

/**
 * 로케일에 맞는 내부 링크를 만든다.
 *   href("ko", "/products") → "/products"
 *   href("zh", "/products") → "/zh/products"
 */
export function href(locale: Locale, path: string): string {
  const normalized = path.startsWith("/") ? path : `/${path}`;
  if (locale === DEFAULT_LOCALE) return normalized;
  if (normalized === "/") return `/${locale}`;
  return `/${locale}${normalized}`;
}

/** 로케일 접두사를 떼어낸 경로 (언어 전환 버튼용) */
export function stripLocale(pathname: string): string {
  for (const locale of LOCALES) {
    if (locale === DEFAULT_LOCALE) continue;
    if (pathname === `/${locale}`) return "/";
    if (pathname.startsWith(`/${locale}/`)) return pathname.slice(locale.length + 1);
  }
  return pathname;
}

/** hreflang 대체 URL 맵 (ko · en · zh-Hans · x-default) — layout 메타데이터와 sitemap이 함께 쓴다 */
export function hreflangMap(baseUrl: string, path: string): Record<string, string> {
  const languages: Record<string, string> = {};
  for (const locale of LOCALES) {
    languages[LOCALE_META[locale].htmlLang] = `${baseUrl}${href(locale, path)}`;
  }
  languages["x-default"] = `${baseUrl}${href(DEFAULT_LOCALE, path)}`;
  return languages;
}
