import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import Link from "next/link";

import { Certifications } from "@/components/quality/Certifications";
import { QualityFlow } from "@/components/quality/QualityFlow";
import { Reveal } from "@/components/ui/Reveal";
import { NextStory, SectionTitle } from "@/components/ui/brand";
import { listQualitySteps } from "@/lib/content";
import { getDict } from "@/lib/i18n";
import { href, type Locale } from "@/lib/i18n/config";

export const dynamic = "force-dynamic";

type Props = { params: Promise<{ locale: Locale }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  return pageMetadata(locale, "/quality", getDict(locale).meta.pages.quality);
}

/** QUALITY — 입고→출고 8단계를 인터랙티브로 경험하는 페이지 */
export default async function QualityPage({ params }: Props) {
  const { locale } = await params;
  const t = getDict(locale).quality;
  const steps = listQualitySteps(locale);

  return (
    <>
      <section className="section !pb-14">
        <div className="container-text">
          <Reveal>
            <p className="kicker">{t.kicker}</p>
            <h1 className="mt-6 whitespace-pre-line text-display text-ink-900">{t.title}</h1>
            <p className="prose-body mt-8">{t.lead}</p>
          </Reveal>
        </div>
      </section>

      <section className="pb-20 md:pb-28">
        <div className="container-grid">
          <Reveal>
            <QualityFlow steps={steps} labels={t.flow} />
          </Reveal>
        </div>
      </section>

      <section className="section hairline-t bg-paper-warm">
        <div className="container-text">
          <SectionTitle kicker={t.whyKicker} title={t.whyTitle} lead={t.whyLead} />
          <div className="grid gap-10 sm:grid-cols-3">
            {t.stats.map((stat, i) => (
              <Reveal key={stat.label} delayMs={i * 60}>
                <p className="text-5xl font-bold tracking-tight text-ink-900">{stat.value}</p>
                <p className="mt-2 text-label text-ink-400">{stat.label}</p>
              </Reveal>
            ))}
          </div>
          <Reveal>
            <p className="prose-body mt-14">
              {t.oemNote.before}
              <Link href={href(locale, "/oem")} className="font-semibold text-ink-900 underline hover:text-accent">
                {t.oemNote.link}
              </Link>
            </p>
          </Reveal>
        </div>
      </section>

      <Certifications t={t.certs} />

      <NextStory locale={locale} href="/oem" title={t.nextStory} />
    </>
  );
}
