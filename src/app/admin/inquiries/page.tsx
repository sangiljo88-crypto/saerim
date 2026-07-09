import { adminListInquiries } from "@/lib/db/repo";

import { markInquiry } from "../_lib/actions";

export const dynamic = "force-dynamic";

const KIND_LABEL: Record<string, string> = {
  wholesale: "도매",
  oem: "OEM",
  general: "일반",
};

/** 문의함 — 접수된 문의를 확인하고 답변 완료 처리 */
export default function AdminInquiriesPage() {
  const inquiries = adminListInquiries();

  return (
    <>
      <h1 className="text-h1 text-ink-900">문의함</h1>
      <p className="mt-2 text-sm text-ink-400">전체 {inquiries.length}건</p>

      <div className="mt-8 space-y-4">
        {inquiries.map((item) => {
          const toggle = markInquiry.bind(null, item.id, item.status === "new" ? "answered" : "new");
          return (
            <div key={item.id} className="rounded-xl border border-line p-6">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="flex flex-wrap items-center gap-3">
                  <span
                    className={`rounded-full px-2.5 py-1 text-xs font-semibold ${
                      item.status === "new" ? "bg-accent-soft text-accent" : "bg-trust-soft text-trust"
                    }`}
                  >
                    {item.status === "new" ? "새 문의" : "답변 완료"}
                  </span>
                  <span className="rounded-full bg-paper-warm px-2.5 py-1 text-xs font-semibold text-ink-600">
                    {KIND_LABEL[item.kind] ?? item.kind}
                  </span>
                  <p className="text-sm font-bold text-ink-900">{item.company}</p>
                  <p className="text-sm text-ink-600">
                    {item.name} · {item.phone}
                    {item.email && ` · ${item.email}`}
                  </p>
                </div>
                <p className="text-xs text-ink-400">{item.createdAt}</p>
              </div>
              {item.productSlug && (
                <p className="mt-3 text-xs text-ink-400">문의 제품: {item.productSlug}</p>
              )}
              {item.message && (
                <p className="mt-3 whitespace-pre-wrap rounded-lg bg-paper-warm p-4 text-sm leading-relaxed text-ink-600">
                  {item.message}
                </p>
              )}
              <form action={toggle} className="mt-4">
                <button type="submit" className="text-sm font-semibold text-ink-900 hover:text-accent">
                  {item.status === "new" ? "답변 완료로 표시" : "새 문의로 되돌리기"}
                </button>
              </form>
            </div>
          );
        })}

        {inquiries.length === 0 && (
          <p className="rounded-xl border border-line px-4 py-16 text-center text-ink-400">
            아직 접수된 문의가 없습니다.
          </p>
        )}
      </div>
    </>
  );
}
