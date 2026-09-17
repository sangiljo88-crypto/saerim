"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import { LocaleSwitcher } from "@/components/layout/LocaleSwitcher";
import { getDict } from "@/lib/i18n";
import { href, stripLocale, type Locale } from "@/lib/i18n/config";

/** 스토리 순서 그대로의 글로벌 내비게이션 (docs/brand-system/01 §5) */
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
    <header className="sticky top-0 z-50 border-b border-line bg-white/90 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <Link href={href(locale, "/")} className="flex shrink-0 items-center gap-2.5">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/images/logo.svg" alt="" className="h-8 w-8" />
          <span className="flex items-baseline gap-2">
            <span className="text-lg font-bold tracking-tight text-ink-900">{t.companyShort}</span>
            <span className="hidden text-[10px] font-semibold uppercase tracking-[0.24em] text-ink-400 sm:inline lg:hidden xl:inline">
              {t.latin}
            </span>
          </span>
        </Link>

        <div className="flex items-center gap-4 xl:gap-5">
          <nav className="hidden items-center gap-3 lg:flex xl:gap-6" aria-label={t.mainMenuLabel}>
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
            className="-mr-2 flex h-10 w-10 flex-col items-center justify-center gap-1.5 lg:hidden"
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
          className="fixed inset-x-0 bottom-0 top-16 z-40 overflow-y-auto bg-white px-6 py-8 lg:hidden"
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
