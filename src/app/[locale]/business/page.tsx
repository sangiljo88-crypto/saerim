import type { Metadata } from "next";
import Link from "next/link";

import { Reveal } from "@/components/ui/Reveal";
import { NextStory, SectionTitle } from "@/components/ui/brand";
import { getDict } from "@/lib/i18n";
import { href, type Locale } from "@/lib/i18n/config";

type Props = { params: Promise<{ locale: Locale }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  return getDict(locale).meta.pages.business;
}

/** BUSINESS — 바이어가 3초 안에 이해하는 사업 구조 */
export default async function BusinessPage({ params }: Props) {
  const { locale } = await params;
  const t = getDict(locale).business;

  return (
    <>
      <section className="section">
        <div className="container-text">
          <Reveal>
            <p className="kicker">{t.kicker}</p>
            <h1 className="mt-6 whitespace-pre-line text-display text-ink-900">{t.title}</h1>
            <p className="prose-body mt-8">{t.lead}</p>
          </Reveal>
        </div>
      </section>

      <section className="pb-20 md:pb-32">
        <div className="container-grid">
          <div className="grid gap-px overflow-hidden rounded-2xl border border-line bg-line md:grid-cols-2">
            {t.areas.map((area, i) => (
              <Reveal key={area.no} delayMs={i * 60} className="bg-white">
                <div className="flex h-full flex-col p-8 md:p-12">
                  <p className="kicker">{area.en}</p>
                  <h2 className="mt-4 flex items-baseline gap-3 text-h2 text-ink-900">
                    <span className="text-sm font-bold text-accent">{area.no}</span>
                    {area.name}
                  </h2>
                  <p className="mt-4 flex-1 text-sm leading-relaxed text-ink-600">{area.body}</p>
                  <Link
                    href={href(locale, area.href)}
                    className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-ink-900 transition-colors hover:text-accent"
                  >
                    {area.cta} <span aria-hidden>→</span>
                  </Link>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* 거래 프로세스 */}
      <section className="section hairline-t bg-paper-warm">
        <div className="container-grid">
          <SectionTitle kicker={t.processKicker} title={t.processTitle} lead={t.processLead} />
          <ol className="grid gap-8 md:grid-cols-4">
            {t.steps.map((item, i) => (
              <Reveal key={item.step} delayMs={i * 60}>
                <li>
                  <p className="text-4xl font-bold text-line">{item.step}</p>
                  <h3 className="mt-3 text-h3 text-ink-900">{item.name}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink-600">{item.body}</p>
                </li>
              </Reveal>
            ))}
          </ol>
          <Reveal>
            <div className="mt-14 text-center">
              <Link href={href(locale, "/contact")} className="cta-primary">
                {t.cta}
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      <NextStory locale={locale} href="/products" title={t.nextStory} />
    </>
  );
}
