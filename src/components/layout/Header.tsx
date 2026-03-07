import Link from "next/link";

import { getAllCategories } from "@/lib/catalog";

export function Header() {
  const categories = getAllCategories();

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/95 backdrop-blur">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="flex min-h-[68px] items-center justify-between gap-6">
          <Link href="/" className="font-display text-xl font-extrabold tracking-tight text-deep-950">
            광일건해
          </Link>

          <nav className="hidden items-center gap-6 text-sm font-medium text-slate-700 lg:flex">
            <Link href="/" className="hover:text-deep-950">
              홈
            </Link>
            <details className="group relative">
              <summary className="list-none cursor-pointer hover:text-deep-950">카테고리</summary>
              <div className="absolute left-0 top-8 w-72 rounded-2xl border border-slate-200 bg-white p-3 shadow-soft">
                <ul className="space-y-1">
                  {categories.map((category) => (
                    <li key={category.id}>
                      <Link
                        href={`/categories/${category.slug}`}
                        className="block rounded-xl px-3 py-2 text-sm text-slate-700 hover:bg-brand-50 hover:text-brand-800"
                      >
                        {category.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </details>
            <Link href="/categories" className="hover:text-deep-950">
              전체 카테고리
            </Link>
            <Link href="/brand" className="hover:text-deep-950">
              브랜드 스토리
            </Link>
            <Link href="/contact" className="hover:text-deep-950">
              위치/연락처
            </Link>
          </nav>

          <Link
            href="/wholesale"
            className="inline-flex items-center rounded-full bg-brand-700 px-4 py-2 text-sm font-semibold text-white transition hover:bg-brand-800"
          >
            도매 문의
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
