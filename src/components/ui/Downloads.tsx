import { existsSync } from "node:fs";
import path from "node:path";

import { getDict } from "@/lib/i18n";
import type { Locale } from "@/lib/i18n/config";

/**
 * 회사소개서·제품 카탈로그 PDF 링크.
 * public/downloads/saerim-company-profile-{locale}.pdf · saerim-product-catalog-{locale}.pdf
 * 파일이 실제로 있을 때만 링크를 그린다 — PDF를 올리기 전에는 아무것도 노출되지 않는다(죽은 링크 방지).
 */
export function Downloads({ locale, className = "" }: { locale: Locale; className?: string }) {
  const t = getDict(locale).common;
  const files = [
    { file: `saerim-company-profile-${locale}.pdf`, label: t.profilePdf },
    { file: `saerim-product-catalog-${locale}.pdf`, label: t.catalogPdf },
  ].filter(({ file }) => existsSync(path.join(process.cwd(), "public", "downloads", file)));

  if (files.length === 0) return null;

  return (
    <ul className={`flex flex-wrap gap-x-6 gap-y-2 text-sm ${className}`} aria-label={t.downloadsLabel}>
      {files.map(({ file, label }) => (
        <li key={file}>
          <a
            href={`/downloads/${file}`}
            className="font-semibold text-ink-900 underline underline-offset-4 hover:text-accent"
          >
            {label} ↓
          </a>
        </li>
      ))}
    </ul>
  );
}
