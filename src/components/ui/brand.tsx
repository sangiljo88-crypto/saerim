import Link from "next/link";

import { getDict } from "@/lib/i18n";
import { href, type Locale } from "@/lib/i18n/config";

/**
 * 새림 디자인 시스템 공통 컴포넌트.
 * 모든 페이지는 이 컴포넌트로만 섹션을 구성한다. (docs/brand-system/03)
 */

/** 섹션 시작을 알리는 영문 라벨 */
export function Kicker({ children }: { children: React.ReactNode }) {
  return <p className="kicker mb-4">{children}</p>;
}

/** 섹션 헤드라인 — 한 섹션에 하나만 */
export function SectionTitle({
  kicker,
  title,
  lead,
  align = "left",
}: {
  kicker?: string;
  title: React.ReactNode;
  lead?: string;
  align?: "left" | "center";
}) {
  const alignCls = align === "center" ? "text-center [&_p.prose-body]:mx-auto" : "";
  return (
    <header className={`mb-12 md:mb-16 ${alignCls}`}>
      {kicker && <Kicker>{kicker}</Kicker>}
      <h2 className="text-h2 md:text-[2rem] text-ink-900">{title}</h2>
      {lead && <p className="prose-body mt-4">{lead}</p>}
    </header>
  );
}

/** 신뢰 증명 전용 숫자 블록 */
export function StatBlock({ value, label }: { value: string; label: string }) {
  return (
    <div>
      <p className="text-4xl md:text-5xl font-bold tracking-tight text-ink-900">{value}</p>
      <p className="mt-2 text-label text-ink-400">{label}</p>
    </div>
  );
}

/**
 * 페이지 하단 고정 패턴 — 다음 스토리로 연결.
 * 라벨은 로케일 내비게이션 사전에서 가져온다(중국어면 중국어 메뉴명).
 */
export function NextStory({
  locale,
  href: path,
  title,
}: {
  locale: Locale;
  href: string;
  title: string;
}) {
  const common = getDict(locale).common;
  const label =
    path === "/contact"
      ? common.contact
      : (common.nav.find((item) => item.href === path)?.label ?? path.replace("/", "").toUpperCase());

  return (
    <section className="hairline-t">
      <Link
        href={href(locale, path)}
        className="container-grid group flex items-center justify-between py-14 md:py-20"
      >
        <div>
          <p className="kicker mb-3">
            {common.nextStory} — {label}
          </p>
          <p className="text-h2 text-ink-900 transition-colors group-hover:text-accent">{title}</p>
        </div>
        <span
          aria-hidden
          className="text-3xl text-ink-400 transition-transform group-hover:translate-x-2 group-hover:text-accent"
        >
          →
        </span>
      </Link>
    </section>
  );
}

/** 인증·품질 뱃지 (trust 컬러 전용 사용처) */
export function TrustBadge({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-full bg-trust-soft px-3.5 py-1.5 text-xs font-semibold text-trust">
      {children}
    </span>
  );
}
