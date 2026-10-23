import Link from "next/link";

import { Downloads } from "@/components/ui/Downloads";
import { getSettings } from "@/lib/content";
import { getDict, fill } from "@/lib/i18n";
import { href, type Locale } from "@/lib/i18n/config";

/**
 * 푸터 — Deep 녹색 면 위에 역상 로고 락업.
 * 전체 락업은 256px 이상에서만 쓰고(가이드 §06), 작은 화면에서는 심벌 + 회사명 텍스트로 대신한다.
 */
export function Footer({ locale }: { locale: Locale }) {
  const settings = getSettings(locale);
  const dict = getDict(locale);
  const t = dict.footer;
  const siteMap = [...dict.common.nav, { href: "/contact", label: dict.common.contact }];

  return (
    <footer className="bg-ink-900 text-white">
      <div className="container-grid grid gap-12 py-16 md:grid-cols-[1.4fr_1fr_1fr] md:py-20">
        <div>
          {/* 전체 락업 (md 이상, 가로 256px) */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/logo/logo-reverse.svg"
            alt={dict.common.logoAlt}
            width={256}
            height={232}
            className="hidden w-64 md:block"
          />
          {/* 심벌 + 회사명 (작은 화면) */}
          <div className="flex items-center gap-3 md:hidden">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/images/logo/symbol-reverse.svg" alt={dict.common.logoAlt} width={44} height={44} className="h-11 w-11" />
            <p className="text-lg font-semibold tracking-[0.12em]">SAERIM</p>
          </div>
          <p className="mt-6 text-base text-white/90">{dict.common.tagline}</p>
          <p className="mt-5 whitespace-pre-line text-sm leading-relaxed text-white/75">{t.lead}</p>
          <p className="mt-6 text-xs leading-6 text-white/60">
            {dict.common.companyName} · {t.ceo}
            <br />
            {settings.contact_address}
            <br />
            TEL {settings.contact_tel ?? "063-464-8681"} · FAX {settings.contact_fax ?? "063-464-8683"} ·{" "}
            {settings.contact_email ?? "info@saerim.kr"}
          </p>
          <Downloads locale={locale} inverse className="mt-5 !text-xs" />
        </div>

        <nav aria-label={t.siteMapLabel}>
          <p className="kicker mb-4 !text-white/50">{t.siteMap}</p>
          <ul className="grid grid-cols-2 gap-x-6 gap-y-2.5 text-sm text-white/80">
            {siteMap.map((item) => (
              <li key={item.href}>
                <Link href={href(locale, item.href)} className="transition-colors hover:text-white">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <p className="kicker mb-4 !text-white/50">{t.brands}</p>
          <ul className="space-y-2.5 text-sm text-white/80">
            {t.brandList.map((brand) => (
              <li key={brand}>{brand}</li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-t border-white/15">
        <div className="container-grid flex flex-col items-start justify-between gap-2 py-6 text-xs text-white/60 md:flex-row">
          <p>{fill(t.rights, { year: new Date().getFullYear() })}</p>
          <p>{t.hours}</p>
        </div>
      </div>
    </footer>
  );
}
