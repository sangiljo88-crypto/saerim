import type { Metadata } from "next";
import { JANGNAL_URL, jangnalCopy } from "@/lib/jangnal";
import { pageMetadata } from "@/lib/seo";
import Link from "next/link";

import { Reveal } from "@/components/ui/Reveal";
import { BrandStatement, NextStory, SectionTitle } from "@/components/ui/brand";
import { listBrands } from "@/lib/content";
import { getDict } from "@/lib/i18n";
import { href, type Locale } from "@/lib/i18n/config";

export const dynamic = "force-dynamic";

type Props = { params: Promise<{ locale: Locale }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  return pageMetadata(locale, "/brand", getDict(locale).meta.pages.brand);
}

/** BRAND — 새림 ↔ 전국국밥거래소 ↔ 육식노트 관계를 명확하게 보여준다 (docs/brand-system/02) */
export default async function BrandPage({ params }: Props) {
  const { locale } = await params;
  const dict = getDict(locale);
  const t = dict.brand;
  const channel = jangnalCopy[locale];
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

      {/* 브랜드의 약속 — 로고와 현장의 일하는 방식을 함께 설명한다 */}
      <section className="section hairline-t bg-paper-warm">
        <div className="container-grid grid items-center gap-12 lg:grid-cols-[0.7fr_1.3fr] lg:gap-20">
          <Reveal>
            <div className="flex justify-center py-4">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/logo/logo-flat.svg"
                alt={dict.common.logoAlt}
                width={624}
                height={566}
                loading="lazy"
                className="w-64 max-w-full"
              />
            </div>
          </Reveal>
          <Reveal>
            <p className="kicker">{t.identity.kicker}</p>
            <BrandStatement locale={locale} as="h2" className="mt-5 whitespace-pre-line text-h1 text-ink-900">
              {t.identity.title}
            </BrandStatement>
            <p className="prose-body mt-6">{t.identity.body}</p>
            <p className="mt-5 max-w-2xl text-sm leading-relaxed text-ink-400">{t.identity.expression}</p>
            <ol className="mt-8 grid gap-4 border-t border-line pt-6 sm:grid-cols-3">
              {t.identity.steps.map((step, i) => (
                <li key={step} className="text-sm font-medium leading-relaxed text-ink-900">
                  <span className="mb-1 block text-xs tracking-widest text-accent" aria-hidden>0{i + 1}</span>
                  {step}
                </li>
              ))}
            </ol>
          </Reveal>
        </div>
      </section>

      {/* 구조도 */}
      <section className="section">
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
              <BrandStatement locale={locale} className="text-h2 text-ink-900">
                {t.signature}
              </BrandStatement>
              <Link href={href(locale, "/oem")} className="cta-secondary mt-8">
                {t.oemCta}
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section hairline-t" aria-labelledby="jangnal-channel-title">
        <div className="container-text">
          <p className="kicker">{channel.label}</p>
          <h2 id="jangnal-channel-title" className="mt-5 text-h1 text-ink-900">{channel.title}</h2>
          <p className="prose-body mt-6">{channel.body}</p>
          <p className="mt-5 text-sm leading-relaxed text-ink-600">{channel.note}</p>
          <a href={JANGNAL_URL} className="cta-secondary mt-8">{channel.cta} ↗</a>
        </div>
      </section>

      <NextStory locale={locale} href="/business" title={t.nextStory} />
    </>
  );
}
