"use client";

import { usePathname } from "next/navigation";

import { DEFAULT_LOCALE, LOCALES, LOCALE_META, href, stripLocale, type Locale } from "@/lib/i18n/config";

/**
 * 한국어 ↔ 中文 전환.
 * 현재 보고 있는 경로를 유지한 채 로케일만 바꾼다. (/products ↔ /zh/products)
 * 로케일(html lang · 헤더 · 푸터)은 루트 레이아웃이 요청 헤더로 결정하는데, 루트 레이아웃은
 * next/link 클라이언트 이동에서 다시 렌더되지 않는다. 그래서 전환 링크만 일반 <a>로 두어
 * 전체 문서를 새로 받는다. URL 설계는 그대로다.
 */
export function LocaleSwitcher({ locale, label }: { locale: Locale; label: string }) {
  const pathname = usePathname() ?? "/";
  const basePath = stripLocale(pathname);

  return (
    <div className="flex items-center gap-1.5 text-[12px] font-semibold" aria-label={label}>
      {LOCALES.map((item, i) => {
        const active = item === locale;
        return (
          <span key={item} className="flex items-center gap-1.5">
            {i > 0 && (
              <span aria-hidden className="text-ink-400/50">
                |
              </span>
            )}
            <a
              href={href(item, basePath === "/" && item !== DEFAULT_LOCALE ? "/" : basePath)}
              hrefLang={LOCALE_META[item].htmlLang}
              aria-current={active ? "true" : undefined}
              className={
                active
                  ? "text-ink-900 underline underline-offset-4"
                  : "text-ink-400 transition-colors hover:text-ink-900"
              }
            >
              {LOCALE_META[item].label}
            </a>
          </span>
        );
      })}
    </div>
  );
}
