"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import { LocaleSwitcher } from "@/components/layout/LocaleSwitcher";
import { getDict } from "@/lib/i18n";
import { href, stripLocale, type Locale } from "@/lib/i18n/config";

/**
 * 스토리 순서 그대로의 글로벌 내비게이션 (docs/brand-system/01 §5)
 * 메뉴 10개 + 언어 3개가 한 줄에 들어가려면 1280px이 필요해, 그 아래에서는 햄버거 메뉴를 쓴다.
 */
export function Header({ locale }: { locale: Locale }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const t = getDict(locale).common;
  const basePath = stripLocale(pathname ?? "/");

  // 경로가 바뀌면 모바일 메뉴를 닫는다 (렌더 중 상태 조정 — effect 불필요)
  const [lastPath, setLastPath] = useState(pathname);
  if (pathname !== lastPath) {
    setLastPath(pathname);
    setOpen(false);
  }

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-paper/90 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        {/* 심벌 + 별도 워드마크 텍스트 (로고 락업을 재조합하지 않는다 — 가이드 §06) */}
        <Link href={href(locale, "/")} className="flex shrink-0 items-center gap-3">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/images/logo/symbol-flat.svg" alt={t.logoAlt} width={36} height={36} className="h-9 w-9" />
          <span className="flex items-baseline gap-2">
            <span className="text-[17px] font-semibold tracking-[0.14em] text-ink-900">SAERIM</span>
            {/* 한글 보조 회사명은 한국어에서만 — 영어·중국어는 워드마크와 중복된다 */}
            {locale === "ko" && (
              <span className="hidden text-sm font-medium text-ink-400 sm:inline">{t.companyShort}</span>
            )}
          </span>
        </Link>

        <div className="flex items-center gap-4">
          <nav className="hidden items-center gap-4 xl:flex" aria-label={t.mainMenuLabel}>
            {t.nav.map((item) => {
              const active = basePath.startsWith(item.href);
              return (
                <Link
                  key={item.href}
                  href={href(locale, item.href)}
                  className={`whitespace-nowrap text-[13px] font-semibold tracking-[0.06em] transition-colors ${
                    active ? "text-ink-900" : "text-ink-600 hover:text-ink-900"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
            <Link href={href(locale, "/contact")} className="cta-primary whitespace-nowrap !px-5 !py-2 text-[13px]">
              {t.contact}
            </Link>
          </nav>

          <LocaleSwitcher locale={locale} label={t.languageLabel} />

          <button
            type="button"
            className="-mr-2 flex h-10 w-10 flex-col items-center justify-center gap-1.5 xl:hidden"
            aria-expanded={open}
            aria-label={t.toggleMenu}
            onClick={() => setOpen((v) => !v)}
          >
            <span className={`h-px w-5 bg-ink-900 transition-transform ${open ? "translate-y-[3.5px] rotate-45" : ""}`} />
            <span className={`h-px w-5 bg-ink-900 transition-transform ${open ? "-translate-y-[3.5px] -rotate-45" : ""}`} />
          </button>
        </div>
      </div>

      {open && (
        <nav
          // sticky 헤더의 backdrop-filter가 containing block이 되어 bottom-0이 헤더 높이에 묶이므로 높이를 뷰포트 기준으로 명시한다
          className="fixed inset-x-0 top-16 z-40 h-[calc(100dvh-4rem)] overflow-y-auto bg-paper px-6 py-8 xl:hidden"
          aria-label={t.mobileMenuLabel}
        >
          <ul className="divide-y divide-line">
            {t.nav.map((item) => (
              <li key={item.href}>
                <Link href={href(locale, item.href)} className="flex items-center justify-between py-4">
                  <span className="text-base font-semibold text-ink-900">{item.label}</span>
                  <span aria-hidden className="text-ink-400">
                    →
                  </span>
                </Link>
              </li>
            ))}
          </ul>
          <Link href={href(locale, "/contact")} className="cta-primary mt-8 w-full">
            {t.contact}
          </Link>
        </nav>
      )}
    </header>
  );
}
