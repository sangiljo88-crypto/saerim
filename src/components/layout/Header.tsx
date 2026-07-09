"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

/** 스토리 순서 그대로의 글로벌 내비게이션 (docs/brand-system/01 §5) */
const NAV = [
  { href: "/why", label: "WHY" },
  { href: "/brand", label: "BRAND" },
  { href: "/business", label: "BUSINESS" },
  { href: "/products", label: "PRODUCT" },
  { href: "/factory", label: "FACTORY" },
  { href: "/quality", label: "QUALITY" },
  { href: "/oem", label: "OEM" },
  { href: "/news", label: "NEWS" },
  { href: "/store", label: "STORE" },
] as const;

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-white/90 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <Link href="/" className="flex items-baseline gap-2">
          <span className="text-lg font-bold tracking-tight text-ink-900">새림</span>
          <span className="hidden text-[10px] font-semibold uppercase tracking-[0.24em] text-ink-400 sm:inline">
            Saerim Food Infrastructure
          </span>
        </Link>

        <nav className="hidden items-center gap-6 lg:flex" aria-label="주 메뉴">
          {NAV.map((item) => {
            const active = pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`text-[13px] font-semibold tracking-[0.06em] transition-colors ${
                  active ? "text-ink-900" : "text-ink-600 hover:text-ink-900"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
          <Link href="/contact" className="cta-primary !px-5 !py-2 text-[13px]">
            CONTACT
          </Link>
        </nav>

        <button
          type="button"
          className="flex h-10 w-10 flex-col items-center justify-center gap-1.5 lg:hidden"
          aria-expanded={open}
          aria-label="메뉴 열기"
          onClick={() => setOpen((v) => !v)}
        >
          <span className={`h-px w-5 bg-ink-900 transition-transform ${open ? "translate-y-[3.5px] rotate-45" : ""}`} />
          <span className={`h-px w-5 bg-ink-900 transition-transform ${open ? "-translate-y-[3.5px] -rotate-45" : ""}`} />
        </button>
      </div>

      {open && (
        <nav
          className="fixed inset-x-0 bottom-0 top-16 z-40 overflow-y-auto bg-white px-6 py-8 lg:hidden"
          aria-label="모바일 메뉴"
        >
          <ul className="divide-y divide-line">
            {NAV.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="flex items-center justify-between py-4">
                  <span className="text-base font-semibold text-ink-900">{item.label}</span>
                  <span aria-hidden className="text-ink-400">
                    →
                  </span>
                </Link>
              </li>
            ))}
          </ul>
          <Link href="/contact" className="cta-primary mt-8 w-full">
            CONTACT
          </Link>
        </nav>
      )}
    </header>
  );
}
