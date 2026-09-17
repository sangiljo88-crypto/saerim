import type { Metadata } from "next";
import Link from "next/link";

import { Downloads } from "@/components/ui/Downloads";
import { Faq } from "@/components/ui/Faq";
import { Reveal } from "@/components/ui/Reveal";
import { NextStory, SectionTitle } from "@/components/ui/brand";
import { getDict } from "@/lib/i18n";
import { href, type Locale } from "@/lib/i18n/config";

type Props = { params: Promise<{ locale: Locale }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  return getDict(locale).meta.pages.export;
}

/**
 * EXPORT — 해외 바이어 안내.
 * 검역시행장 지정 등 과거 이력은 현재 유효 여부를 확인하기 전까지 싣지 않는다.
 */
export default async function ExportPage({ params }: Props) {
  const { locale } = await params;
  const t = getDict(locale).exportPage;

  return (
    <>
      <section className="section">
        <div className="container-text">
          <Reveal>
            <p className="kicker">{t.kicker}</p>
            <h1 className="mt-6 text-display text-ink-900">{t.title}</h1>
            <p className="prose-body mt-8">{t.lead}</p>
            <Downloads locale={locale} className="mt-8" />
          </Reveal>
        </div>
      </section>

      {t.sections.map((section, i) => (
        <section key={section.title} className={`section hairline-t ${i % 2 === 0 ? "bg-paper-warm" : ""}`}>
          <div className="container-text">
            <Reveal>
              <p className="kicker">{String(i + 1).padStart(2, "0")}</p>
              <h2 className="mt-4 text-h1 text-ink-900">{section.title}</h2>
              <ul className="mt-8 space-y-3">
                {section.items.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-body text-ink-600">
                    <span aria-hidden className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                    {item}
                  </li>
                ))}
              </ul>
              {section.note && <p className="prose-body mt-6">{section.note}</p>}
            </Reveal>
          </div>
        </section>
      ))}

      <section className="section hairline-t">
        <div className="container-text">
          <SectionTitle kicker="FAQ" title={t.faqTitle} />
          <Faq items={t.faq} />
          <div className="mt-14 text-center">
            <Link href={href(locale, "/contact?type=general")} className="cta-primary">
              {t.cta}
            </Link>
          </div>
        </div>
      </section>

      <NextStory locale={locale} href="/contact" title={t.nextStory} />
    </>
  );
}
