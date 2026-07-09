"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { adminArchive, adminMarkInquiry, adminSaveSettings, adminUpsert } from "@/lib/db/repo";

import { SETTING_FIELDS, TABLE_CONFIGS } from "./fields";

/**
 * 관리자 서버 액션.
 * /admin 전체가 middleware Basic 인증 뒤에 있으므로 여기서는 입력 변환만 담당한다.
 */

function revalidateAll() {
  revalidatePath("/", "layout");
}

export async function saveRecord(tableKey: string, id: number | null, formData: FormData) {
  const config = TABLE_CONFIGS[tableKey];
  if (!config) throw new Error(`알 수 없는 테이블: ${tableKey}`);

  const values: Record<string, string | number> = {};
  for (const field of config.fields) {
    const raw = formData.get(field.column);
    switch (field.type) {
      case "checkbox":
        values[field.column] = raw === "on" ? 1 : 0;
        break;
      case "number":
        values[field.column] = Number(raw ?? 0) || 0;
        break;
      case "list": {
        const lines = String(raw ?? "")
          .split("\n")
          .map((line) => line.trim())
          .filter(Boolean);
        values[field.column] = JSON.stringify(lines);
        break;
      }
      default:
        values[field.column] = String(raw ?? "").trim();
    }
  }

  adminUpsert(config.table, id, values);
  revalidateAll();
  redirect(`/admin/${tableKey}`);
}

export async function archiveRecord(tableKey: string, id: number) {
  const config = TABLE_CONFIGS[tableKey];
  if (!config) throw new Error(`알 수 없는 테이블: ${tableKey}`);

  adminArchive(config.table, id);
  revalidateAll();
  redirect(`/admin/${tableKey}`);
}

export async function markInquiry(id: number, status: "new" | "answered") {
  adminMarkInquiry(id, status);
  revalidatePath("/admin/inquiries");
}

export async function saveSettings(formData: FormData) {
  const entries: Record<string, string> = {};
  for (const field of SETTING_FIELDS) {
    entries[field.key] = String(formData.get(field.key) ?? "").trim();
  }
  adminSaveSettings(entries);
  revalidateAll();
  redirect("/admin/settings");
}
