import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "새림 관리자",
  robots: { index: false, follow: false },
};

const MENU = [
  { href: "/admin", label: "대시보드" },
  { href: "/admin/products", label: "제품" },
  { href: "/admin/brands", label: "브랜드" },
  { href: "/admin/factories", label: "공장" },
  { href: "/admin/quality", label: "품질 단계" },
  { href: "/admin/news", label: "뉴스" },
  { href: "/admin/store-links", label: "스토어 링크" },
  { href: "/admin/inquiries", label: "문의함" },
  { href: "/admin/settings", label: "사이트 설정" },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="mx-auto flex min-h-screen w-full max-w-7xl gap-10 px-6 py-10">
      <aside className="w-44 shrink-0">
        <p className="text-lg font-bold text-ink-900">새림 CMS</p>
        <nav className="mt-6" aria-label="관리자 메뉴">
          <ul className="space-y-1">
            {MENU.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="block rounded-lg px-3 py-2 text-sm font-medium text-ink-600 transition-colors hover:bg-paper-warm hover:text-ink-900"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <Link href="/" className="mt-8 block px-3 text-xs text-ink-400 hover:text-ink-900">
          ← 사이트 보기
        </Link>
      </aside>
      <div className="min-w-0 flex-1">{children}</div>
    </div>
  );
}
