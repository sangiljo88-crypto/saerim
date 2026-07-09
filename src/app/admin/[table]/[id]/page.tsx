import Link from "next/link";
import { notFound } from "next/navigation";

import { adminGetRaw } from "@/lib/db/repo";

import { archiveRecord, saveRecord } from "../../_lib/actions";
import { TABLE_CONFIGS, type Field } from "../../_lib/fields";

export const dynamic = "force-dynamic";

const inputCls =
  "w-full rounded-lg border border-line bg-white px-3.5 py-2.5 text-sm text-ink-900 focus:border-ink-900 focus:outline-none";

function FieldInput({ field, value }: { field: Field; value: unknown }) {
  const str = String(value ?? "");

  switch (field.type) {
    case "textarea":
      return <textarea name={field.column} rows={6} defaultValue={str} className={inputCls} />;
    case "list": {
      let lines = "";
      try {
        lines = (JSON.parse(str || "[]") as string[]).join("\n");
      } catch {
        lines = str;
      }
      return <textarea name={field.column} rows={4} defaultValue={lines} className={inputCls} />;
    }
    case "number":
      return <input type="number" name={field.column} defaultValue={Number(value ?? 0)} className={inputCls} />;
    case "checkbox":
      return (
        <input
          type="checkbox"
          name={field.column}
          defaultChecked={Number(value ?? 0) === 1}
          className="h-5 w-5 rounded border-line accent-ink-900"
        />
      );
    case "select":
      return (
        <select name={field.column} defaultValue={str || field.options?.[0]} className={inputCls}>
          {field.options?.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      );
    default:
      return <input type="text" name={field.column} defaultValue={str} required={field.required} className={inputCls} />;
  }
}

/** 공용 편집 페이지 — /admin/{table}/{id} (id가 "new"면 생성) */
export default async function AdminEditPage({
  params,
}: {
  params: Promise<{ table: string; id: string }>;
}) {
  const { table, id } = await params;
  const config = TABLE_CONFIGS[table];
  if (!config) notFound();

  const isNew = id === "new";
  const numericId = isNew ? null : Number(id);
  const row = numericId ? adminGetRaw(config.table, numericId) : null;
  if (!isNew && !row) notFound();

  const save = saveRecord.bind(null, table, numericId);
  const archive = numericId ? archiveRecord.bind(null, table, numericId) : null;

  return (
    <>
      <div className="flex items-center justify-between">
        <div>
          <Link href={`/admin/${table}`} className="text-sm text-ink-400 hover:text-ink-900">
            ← {config.title} 목록
          </Link>
          <h1 className="mt-2 text-h1 text-ink-900">
            {config.title} {isNew ? "추가" : "편집"}
          </h1>
        </div>
        {archive && (
          <form action={archive}>
            <button type="submit" className="text-sm font-semibold text-accent hover:underline">
              보관 처리 (숨김)
            </button>
          </form>
        )}
      </div>

      <form action={save} className="mt-8 max-w-2xl space-y-5 pb-20">
        {config.fields.map((field) => (
          <div key={field.column}>
            <label className="mb-1.5 block text-sm font-semibold text-ink-900">
              {field.label}
              {field.required && <span className="text-accent"> *</span>}
            </label>
            <FieldInput field={field} value={row?.[field.column]} />
            {field.help && <p className="mt-1 text-xs text-ink-400">{field.help}</p>}
          </div>
        ))}
        <div className="flex gap-3 pt-4">
          <button type="submit" className="cta-primary">
            저장
          </button>
          <Link href={`/admin/${table}`} className="cta-secondary">
            취소
          </Link>
        </div>
      </form>
    </>
  );
}
