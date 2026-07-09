import { getSettings } from "@/lib/db/repo";

import { saveSettings } from "../_lib/actions";
import { SETTING_FIELDS } from "../_lib/fields";

export const dynamic = "force-dynamic";

const inputCls =
  "w-full rounded-lg border border-line bg-white px-3.5 py-2.5 text-sm text-ink-900 focus:border-ink-900 focus:outline-none";

/** 사이트 설정 — Hero 문구·통계·연락처를 즉시 반영 */
export default function AdminSettingsPage() {
  const settings = getSettings();

  return (
    <>
      <h1 className="text-h1 text-ink-900">사이트 설정</h1>
      <p className="mt-2 text-sm text-ink-400">
        저장 즉시 사이트에 반영됩니다. Hero 미디어에 .mp4 경로를 넣으면 풀스크린 영상이 재생됩니다.
      </p>

      <form action={saveSettings} className="mt-8 max-w-2xl space-y-5 pb-20">
        {SETTING_FIELDS.map((field) => (
          <div key={field.key}>
            <label className="mb-1.5 block text-sm font-semibold text-ink-900">{field.label}</label>
            {field.type === "textarea" ? (
              <textarea name={field.key} rows={4} defaultValue={settings[field.key] ?? ""} className={inputCls} />
            ) : (
              <input type="text" name={field.key} defaultValue={settings[field.key] ?? ""} className={inputCls} />
            )}
          </div>
        ))}
        <button type="submit" className="cta-primary">
          저장
        </button>
      </form>
    </>
  );
}
