import Link from "next/link";
import { headers } from "next/headers";

import { getDict } from "@/lib/i18n";
import { DEFAULT_LOCALE, LOCALE_HEADER, href, isLocale } from "@/lib/i18n/config";

export default async function NotFoundPage() {
  const value = (await headers()).get(LOCALE_HEADER);
  const locale = isLocale(value) ? value : DEFAULT_LOCALE;
  const t = getDict(locale).common;

  return (
    <div className="container-text py-32 text-center">
      <p className="kicker">404</p>
      <h1 className="mt-4 text-h1 text-ink-900">{t.notFoundTitle}</h1>
      <p className="prose-body mx-auto mt-4">{t.notFoundBody}</p>
      <Link href={href(locale, "/")} className="cta-primary mt-10">
        {t.notFoundCta}
      </Link>
    </div>
  );
}
