import type { Metadata } from "next";
import Link from "next/link";

import { Reveal } from "@/components/ui/Reveal";
import { NextStory, SectionTitle } from "@/components/ui/brand";
import { listBrands } from "@/lib/content";
import { getDict } from "@/lib/i18n";
import { href, type Locale } from "@/lib/i18n/config";

export const dynamic = "force-dynamic";

type Props = { params: Promise<{ locale: Locale }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  return getDict(locale).meta.pages.brand;
}

/** BRAND — 새림 ↔ 전국국밥거래소 ↔ 육식노트 관계를 명확하게 보여준다 (docs/brand-system/02) */
export default async function BrandPage({ params }: Props) {
  const { locale } = await params;
  const t = getDict(locale).brand;
  const brands = listBrands(locale);
  const master = brands.find((b) => b.role === "master");
  const subs = brands.filter((b) => b.role === "sub");

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

      {/* 구조도 */}
      <section className="pb-20 md:pb-32">
        <div className="container-grid">
          <Reveal>
            {master && (
              <div className="rounded-2xl border-2 border-ink-900 p-8 text-center md:p-12">
                <p className="kicker">
                  {master.nameEn} · {t.masterSuffix}
                </p>
                <p className="mt-3 text-h1 text-ink-900">{master.name}</p>
                <p className="mt-3 text-body text-ink-600">{master.tagline}</p>
              </div>
            )}
            <div className="mx-auto h-10 w-px bg-line" aria-hidden />
            <div className="grid gap-6 md:grid-cols-2">
              {subs.map((brand) => (
                <div key={brand.slug} className="rounded-2xl border border-line p-8">
                  <p className="kicker">
                    {brand.nameEn} · {t.subSuffix}
                  </p>
                  <h2 className="mt-3 text-h2 text-ink-900">{brand.name}</h2>
                  <p className="mt-2 text-sm font-medium text-accent">{brand.tagline}</p>
                  <p className="mt-4 text-sm leading-relaxed text-ink-600">{brand.description}</p>
                  <p className="mt-6 text-xs text-ink-400">
                    {t.customerLabel} — {brand.target}
                  </p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* 운영 원칙 */}
      <section className="section hairline-t bg-paper-warm">
        <div className="container-grid">
          <SectionTitle kicker={t.principleKicker} title={t.principleTitle} />
          <div className="grid gap-10 md:grid-cols-3">
            {t.principles.map((item, i) => (
              <Reveal key={item.title} delayMs={i * 80}>
                <h3 className="text-h3 text-ink-900">{item.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-ink-600">{item.body}</p>
              </Reveal>
            ))}
          </div>
          <Reveal>
            <div className="mt-16 text-center">
              <p className="text-h2 text-ink-900">{t.signature}</p>
              <Link href={href(locale, "/oem")} className="cta-secondary mt-8">
                {t.oemCta}
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      <NextStory locale={locale} href="/business" title={t.nextStory} />
    </>
  );
}
