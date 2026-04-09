import Link from "next/link";

import { CategoryDropdown } from "@/components/layout/CategoryDropdown";
import { getAllCategories } from "@/lib/catalog";

export function Header() {
  const categories = getAllCategories();

  return (
    <header
      className="sticky z-50 border-b border-slate-200/70 bg-white/92 backdrop-blur-xl"
      style={{ top: "var(--top-promo-height)" }}
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="flex min-h-[68px] items-center justify-between gap-6 py-1">
          <Link href="/" className="group flex flex-col">
            <span className="font-display text-2xl font-extrabold tracking-tight text-deep-950 transition group-hover:text-brand-700">
              유한회사 새림
            </span>
            <span className="text-[10px] font-semibold uppercase tracking-[0.26em] text-slate-500">Saerim Food System</span>
          </Link>

          <nav className="hidden items-center gap-7 text-sm font-semibold tracking-[0.01em] text-slate-700 lg:flex">
            <Link href="/" className="transition hover:text-deep-950">
              홈
            </Link>
            <CategoryDropdown
              categories={categories.map((category) => ({
                id: category.id,
                slug: category.slug,
                name: category.name,
              }))}
            />
            <Link href="/categories" className="transition hover:text-deep-950">
              전체 카테고리
            </Link>
            <Link href="/brand" className="transition hover:text-deep-950">
              브랜드 소개
            </Link>
            <Link href="/contact" className="transition hover:text-deep-950">
              위치/연락처
            </Link>
          </nav>

          <Link
            href="/wholesale"
            className="inline-flex items-center rounded-full bg-gradient-to-r from-brand-700 to-brand-600 px-4 py-2 text-sm font-semibold text-white transition hover:from-brand-800 hover:to-brand-700"
          >
            도매 상담
          </Link>
        </div>

        <div className="-mx-4 overflow-x-auto border-t border-slate-200/70 px-4 py-2 lg:hidden">
          <div className="flex min-w-max items-center gap-2">
            <Link href="/categories" className="rounded-full border border-slate-200 px-3 py-1.5 text-xs font-medium text-slate-700">
              전체
            </Link>
            {categories.map((category) => (
              <Link
                key={category.id}
                href={`/categories/${category.slug}`}
                className="rounded-full border border-slate-200 px-3 py-1.5 text-xs font-medium text-slate-700"
              >
                {category.name}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </header>
  );
}
