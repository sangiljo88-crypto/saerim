import type { Metadata } from "next";
import Link from "next/link";

import { Faq } from "@/components/ui/Faq";
import { Reveal } from "@/components/ui/Reveal";
import { NextStory, SectionTitle, TrustBadge } from "@/components/ui/brand";
import { factoryImageAlt, listFactories } from "@/lib/content";
import { getDict } from "@/lib/i18n";
import { href, type Locale } from "@/lib/i18n/config";

export const dynamic = "force-dynamic";

type Props = { params: Promise<{ locale: Locale }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  return getDict(locale).meta.pages.oem;
}

/** OEM — "식품 브랜드 뒤에는 새림이 있습니다"가 실제 사업이 되는 페이지 */
export default async function OemPage({ params }: Props) {
  const { locale } = await params;
  const dict = getDict(locale);
  const t = dict.oem;
  const factories = listFactories(locale).filter((f) => f.slug !== "gunsan");

  return (
    <>
      <section className="section">
        <div className="container-text">
          <Reveal>
            <p className="kicker">{t.kicker}</p>
            <h1 className="mt-6 whitespace-pre-line text-display text-ink-900">{t.title}</h1>
            <p className="prose-body mt-8">{t.lead1}</p>
            <p className="prose-body mt-4">{t.lead2}</p>
            <div className="mt-8 flex flex-wrap gap-2">
              {t.badges.map((badge) => (
                <TrustBadge key={badge}>{badge}</TrustBadge>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* 생산 라인 */}
      <section className="section hairline-t bg-paper-warm">
        <div className="container-grid">
          <SectionTitle kicker={t.lineKicker} title={t.lineTitle} lead={t.lineLead} />
          <div className="grid gap-8 md:grid-cols-2">
            {factories.map((factory, i) => (
              <Reveal key={factory.slug} delayMs={i * 80}>
                <Link
                  href={href(locale, `/factory/${factory.slug}`)}
                  className="group block overflow-hidden rounded-2xl border border-line bg-white"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={factory.image}
                    alt={factoryImageAlt(locale, factory)}
                    className="aspect-video w-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                  />
                  <div className="p-8">
                    <p className="kicker">{factory.code}</p>
                    <h3 className="mt-2 text-h2 text-ink-900 group-hover:text-accent">{factory.name}</h3>
                    <p className="mt-2 text-sm text-ink-600">{factory.role}</p>
                    <ul className="mt-5 flex flex-wrap gap-2">
                      {factory.capabilities.slice(0, 3).map((capability) => (
                        <li key={capability} className="rounded-full border border-line px-3 py-1 text-xs text-ink-600">
                          {capability}
                        </li>
                      ))}
                    </ul>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* 진행 절차 */}
      <section className="section hairline-t">
        <div className="container-grid">
          <SectionTitle kicker={t.processKicker} title={t.processTitle} />
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
        </div>
      </section>

      {/* FAQ */}
      <section className="section hairline-t">
        <div className="container-text">
          <SectionTitle kicker={t.faqKicker} title={t.faqTitle} />
          <Faq items={dict.faq.oem} />
        </div>
      </section>

      <section className="section hairline-t bg-paper-warm">
        <div className="container-text text-center">
          <Reveal>
            <p className="text-h1 text-ink-900">{t.signature}</p>
            <p className="prose-body mx-auto mt-5">{t.signatureLead}</p>
            <Link href={href(locale, "/contact?type=oem")} className="cta-primary mt-10">
              {t.cta}
            </Link>
          </Reveal>
        </div>
      </section>

      <NextStory locale={locale} href="/news" title={t.nextStory} />
    </>
  );
}
