import Link from "next/link";

import { adminCountInquiries, adminList, adminListInquiries } from "@/lib/db/repo";

export const dynamic = "force-dynamic";

/** 관리자 대시보드 — 콘텐츠 현황과 새 문의를 한눈에 */
export default function AdminDashboardPage() {
  const counts = [
    { label: "제품", value: adminList("products").length, href: "/admin/products" },
    { label: "브랜드", value: adminList("brands").length, href: "/admin/brands" },
    { label: "공장", value: adminList("factories").length, href: "/admin/factories" },
    { label: "뉴스", value: adminList("news").length, href: "/admin/news" },
  ];
  const inquiry = adminCountInquiries();
  const recent = adminListInquiries().slice(0, 5);

  return (
    <>
      <h1 className="text-h1 text-ink-900">대시보드</h1>

      <div className="mt-8 grid grid-cols-2 gap-4 lg:grid-cols-5">
        {counts.map((item) => (
          <Link key={item.label} href={item.href} className="rounded-xl border border-line p-5 transition-colors hover:border-ink-400">
            <p className="text-3xl font-bold text-ink-900">{item.value}</p>
            <p className="mt-1 text-sm text-ink-600">{item.label}</p>
          </Link>
        ))}
        <Link href="/admin/inquiries" className="rounded-xl border border-line bg-accent-soft p-5 transition-colors hover:border-accent">
          <p className="text-3xl font-bold text-accent">{inquiry.unread}</p>
          <p className="mt-1 text-sm text-ink-600">새 문의 (전체 {inquiry.total})</p>
        </Link>
      </div>

      <h2 className="mt-12 text-h3 text-ink-900">최근 문의</h2>
      <div className="mt-4 overflow-hidden rounded-xl border border-line">
        <table className="w-full text-left text-sm">
          <thead className="bg-paper-warm text-xs text-ink-400">
            <tr>
              <th className="px-4 py-3 font-semibold">일시</th>
              <th className="px-4 py-3 font-semibold">유형</th>
              <th className="px-4 py-3 font-semibold">업체명</th>
              <th className="px-4 py-3 font-semibold">담당자</th>
              <th className="px-4 py-3 font-semibold">상태</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-line">
            {recent.map((item) => (
              <tr key={item.id}>
                <td className="px-4 py-3 text-ink-600">{item.createdAt}</td>
                <td className="px-4 py-3 text-ink-600">{item.kind}</td>
                <td className="px-4 py-3 font-medium text-ink-900">{item.company}</td>
                <td className="px-4 py-3 text-ink-600">{item.name}</td>
                <td className="px-4 py-3">
                  <span
                    className={`rounded-full px-2.5 py-1 text-xs font-semibold ${
                      item.status === "new" ? "bg-accent-soft text-accent" : "bg-trust-soft text-trust"
                    }`}
                  >
                    {item.status === "new" ? "새 문의" : "답변 완료"}
                  </span>
                </td>
              </tr>
            ))}
            {recent.length === 0 && (
              <tr>
                <td colSpan={5} className="px-4 py-10 text-center text-ink-400">
                  아직 접수된 문의가 없습니다.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}
