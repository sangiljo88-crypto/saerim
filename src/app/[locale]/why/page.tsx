import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";

import { Reveal } from "@/components/ui/Reveal";
import { NextStory, SectionTitle } from "@/components/ui/brand";
import { getDict } from "@/lib/i18n";
import type { Locale } from "@/lib/i18n/config";

type Props = { params: Promise<{ locale: Locale }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  return pageMetadata(locale, "/why", getDict(locale).meta.pages.why);
}

/** WHY — 브랜드 철학을 한 편의 글처럼 읽는 페이지 (Aesop 원칙) */
export default async function WhyPage({ params }: Props) {
  const { locale } = await params;
  const t = getDict(locale).why;

  return (
    <>
      <section className="section">
        <div className="container-text">
          <Reveal>
            <p className="kicker">{t.kicker}</p>
            <h1 className="mt-6 whitespace-pre-line text-display text-ink-900">{t.title}</h1>
          </Reveal>
        </div>
      </section>

      <section className="pb-20 md:pb-32">
        <div className="container-text space-y-16">
          {t.paragraphs.map((paragraph) => (
            <Reveal key={paragraph.slice(0, 12)}>
              <p className="prose-body text-xl leading-loose">{paragraph}</p>
            </Reveal>
          ))}

          <Reveal>
            <div className="hairline-t pt-16">
              <p className="whitespace-pre-line text-h1 leading-snug text-ink-900">
                {t.pullQuote.lead}
                <br />
                <span className="text-accent">{t.pullQuote.accent}</span>
                {t.pullQuote.tail}
              </p>
            </div>
          </Reveal>

          <Reveal>
            <p className="prose-body text-xl leading-loose">{t.closing}</p>
          </Reveal>
        </div>
      </section>

      {/* 약속 3가지 */}
      <section className="section hairline-t bg-paper-warm">
        <div className="container-grid">
          <SectionTitle kicker={t.promiseKicker} title={t.promiseTitle} />
          <div className="grid gap-10 md:grid-cols-3">
            {t.promises.map((item, i) => (
              <Reveal key={item.no} delayMs={i * 80}>
                <p className="text-sm font-bold text-accent">{item.no}</p>
                <h3 className="mt-3 text-h3 text-ink-900">{item.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-ink-600">{item.body}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* 연혁 */}
      <section className="section hairline-t">
        <div className="container-text">
          <SectionTitle kicker={t.historyKicker} title={t.historyTitle} lead={t.historyLead} />
          <ol className="space-y-0">
            {t.history.map((item, i) => (
              <Reveal key={item.year} delayMs={i * 40}>
                <li className="flex gap-8 border-b border-line py-5">
                  <span className="w-16 shrink-0 text-lg font-bold text-accent">{item.year}</span>
                  <p className="text-body text-ink-600">{item.event}</p>
                </li>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      <section className="section">
        <div className="container-text text-center">
          <Reveal>
            <p className="text-h1 text-ink-900">{t.signature}</p>
          </Reveal>
        </div>
      </section>

      <NextStory locale={locale} href="/brand" title={t.nextStory} />
    </>
  );
}
