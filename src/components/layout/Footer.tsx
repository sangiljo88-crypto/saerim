import Link from "next/link";

import { getSettings } from "@/lib/content";
import { getDict, fill } from "@/lib/i18n";
import { href, type Locale } from "@/lib/i18n/config";

export function Footer({ locale }: { locale: Locale }) {
  const settings = getSettings(locale);
  const dict = getDict(locale);
  const t = dict.footer;
  const siteMap = [...dict.common.nav, { href: "/contact", label: dict.common.contact }];

  return (
    <footer className="hairline-t bg-paper-warm">
      <div className="container-grid grid gap-12 py-16 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <div className="flex items-center gap-3">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/images/logo.svg" alt="" className="h-10 w-10" />
            <p className="text-lg font-bold text-ink-900">{dict.common.companyName}</p>
          </div>
          <p className="prose-body mt-4 whitespace-pre-line text-sm">{t.lead}</p>
          <p className="mt-6 text-xs leading-6 text-ink-400">
            {t.ceo}
            <br />
            {settings.contact_address}
            <br />
            TEL {settings.contact_tel ?? "063-464-8681"} · FAX {settings.contact_fax ?? "063-464-8683"} ·{" "}
            {settings.contact_email ?? "info@saerim.kr"}
          </p>
        </div>

        <nav aria-label={t.siteMapLabel}>
          <p className="kicker mb-4">{t.siteMap}</p>
          <ul className="grid grid-cols-2 gap-x-6 gap-y-2.5 text-sm text-ink-600">
            {siteMap.map((item) => (
              <li key={item.href}>
                <Link href={href(locale, item.href)} className="transition-colors hover:text-ink-900">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <p className="kicker mb-4">{t.brands}</p>
          <ul className="space-y-2.5 text-sm text-ink-600">
            {t.brandList.map((brand) => (
              <li key={brand}>{brand}</li>
            ))}
          </ul>
        </div>
      </div>

      <div className="hairline-t">
        <div className="container-grid flex flex-col items-start justify-between gap-2 py-6 text-xs text-ink-400 md:flex-row">
          <p>{fill(t.rights, { year: new Date().getFullYear() })}</p>
          <p>{t.hours}</p>
        </div>
      </div>
    </footer>
  );
}
