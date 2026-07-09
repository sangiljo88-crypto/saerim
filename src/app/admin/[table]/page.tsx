import Link from "next/link";
import { notFound } from "next/navigation";

import { adminList } from "@/lib/db/repo";

import { TABLE_CONFIGS } from "../_lib/fields";

export const dynamic = "force-dynamic";

/** 공용 목록 페이지 — /admin/products, /admin/brands, /admin/factories … */
export default async function AdminTablePage({
  params,
}: {
  params: Promise<{ table: string }>;
}) {
  const { table } = await params;
  const config = TABLE_CONFIGS[table];
  if (!config) notFound();

  const rows = adminList(config.table) as unknown as Record<string, unknown>[];

  return (
    <>
      <div className="flex items-center justify-between">
        <h1 className="text-h1 text-ink-900">{config.title}</h1>
        <Link href={`/admin/${table}/new`} className="cta-primary !px-5 !py-2.5 text-sm">
          + 새로 추가
        </Link>
      </div>

      <div className="mt-8 overflow-hidden rounded-xl border border-line">
        <table className="w-full text-left text-sm">
          <thead className="bg-paper-warm text-xs text-ink-400">
            <tr>
              {config.listColumns.map((col) => (
                <th key={col.key} className="px-4 py-3 font-semibold">
                  {col.label}
                </th>
              ))}
              <th className="px-4 py-3" />
            </tr>
          </thead>
          <tbody className="divide-y divide-line">
            {rows.map((row) => (
              <tr key={String(row.id)} className="hover:bg-paper-warm/60">
                {config.listColumns.map((col, i) => (
                  <td key={col.key} className={`px-4 py-3 ${i === 0 ? "font-medium text-ink-900" : "text-ink-600"}`}>
                    {col.key === "status" ? (
                      <span
                        className={`rounded-full px-2.5 py-1 text-xs font-semibold ${
                          row.status === "published" ? "bg-trust-soft text-trust" : "bg-paper-warm text-ink-400"
                        }`}
                      >
                        {String(row.status)}
                      </span>
                    ) : (
                      String(row[col.key] ?? "")
                    )}
                  </td>
                ))}
                <td className="px-4 py-3 text-right">
                  <Link href={`/admin/${table}/${row.id}`} className="text-sm font-semibold text-ink-900 hover:text-accent">
                    편집 →
                  </Link>
                </td>
              </tr>
            ))}
            {rows.length === 0 && (
              <tr>
                <td colSpan={config.listColumns.length + 1} className="px-4 py-10 text-center text-ink-400">
                  등록된 항목이 없습니다.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}
