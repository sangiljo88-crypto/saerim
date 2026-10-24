import Link from "next/link";

import { FactoryVideoGallery } from "@/components/factory/FactoryVideoGallery";
import { JsonLd } from "@/components/seo/JsonLd";
import { Downloads } from "@/components/ui/Downloads";
import { Reveal } from "@/components/ui/Reveal";
import { NextStory, SectionTitle, StatBlock, TrustBadge } from "@/components/ui/brand";
import { categoryLabel, factoryImageAlt, getSettings, listFactories, listFeaturedProducts, productImageAlt } from "@/lib/content";
import { getDict } from "@/lib/i18n";
import { href, type Locale } from "@/lib/i18n/config";
import { SITE_URL } from "@/lib/seo";

export const dynamic = "force-dynamic";

type Props = { params: Promise<{ locale: Locale }> };

/**
 * HOME — 첫 화면은 제품이 아니라 신뢰를 보여준다. (docs/brand-system/01)
 * Hero(브랜드 메시지 + 공장 전경) → 신뢰 지표 → 브랜드 구조 → 공장·소개 영상 → 대표 제품 → 다음 이야기
 */
export default async function HomePage({ params }: Props) {
  const { locale } = await params;
  const dict = getDict(locale);
  const t = dict.home;
  const settings = getSettings(locale);
  const factories = listFactories(locale);
  const products = listFeaturedProducts(locale).slice(0, 3);
  const heroMedia = settings.hero_media?.trim() || "/images/company/hero-main-photo4.jpg";
  const isVideo = /\.(mp4|webm)(?:[?#]|$)/i.test(heroMedia);
  const heroAlt = heroMedia === "/images/company/hero-main-photo4.jpg"
    ? t.heroMediaAlt
    : settings.hero_alt || t.heroMediaAlt;

  return (
    <>
      <JsonLd data={{
        "@context": "https://schema.org",
        "@type": "WebPage",
        "@id": `${SITE_URL}${href(locale, "/")}#webpage`,
        url: `${SITE_URL}${href(locale, "/")}`,
        name: t.companyHeading,
        description: t.companyIntro,
        inLanguage: locale === "zh" ? "zh-Hans" : locale,
        isPartOf: { "@id": `${SITE_URL}/#website` },
        about: { "@id": `${SITE_URL}/#organization` },
        mainEntity: { "@id": `${SITE_URL}/#organization` },
      }} />
      {/* Hero — 실제 생산 현장을 화면 가득 보여주고 브랜드의 약속을 전한다 */}
      <section className="relative isolate flex min-h-[calc(100svh-4rem)] items-center overflow-hidden bg-ink-900 text-white">
        {isVideo ? (
          <video
            className="absolute inset-0 -z-20 h-full w-full object-cover object-center"
            src={heroMedia}
            aria-label={heroAlt}
            autoPlay
            loop
            muted
            playsInline
            preload="metadata"
          />
        ) : (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={heroMedia}
            alt={heroAlt}
            width={1984}
            height={1104}
            fetchPriority="high"
            className="absolute inset-0 -z-20 h-full w-full object-cover object-center"
          />
        )}
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-black/50 via-black/55 to-black/70" aria-hidden />
        <div className="container-grid w-full py-20 text-center sm:py-28">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-white/80 sm:text-sm">{t.siteLabel}</p>
          <h1 className="mx-auto mt-8 max-w-6xl break-keep font-sans text-[clamp(2rem,4.6vw,4.5rem)] font-bold leading-[1.22] tracking-tight sm:mt-10">
            {settings.hero_title_1}
            <br />
            {settings.hero_title_2}
          </h1>
          <p className="mx-auto mt-7 max-w-2xl break-keep text-base leading-relaxed text-white/90 sm:mt-10 sm:text-lg">{settings.hero_sub}</p>
          <p className="mt-3 text-sm font-medium tracking-wide text-white/75">{dict.common.tagline}</p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-3 sm:mt-12">
            <Link href={href(locale, "/why")} className="rounded-full bg-white px-7 py-4 text-sm font-bold text-ink-900 transition hover:bg-paper focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white">
              {t.heroCtaStory}
            </Link>
            <Link href={href(locale, "/contact")} className="rounded-full border border-white/60 bg-black/15 px-7 py-4 text-sm font-bold text-white transition hover:bg-white/15 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white">
              {t.heroCtaContact}
            </Link>
          </div>
        </div>
      </section>

      {/* 신뢰 지표 — 숫자로 증명 */}
      <section className="section">
        <div className="container-grid">
          <Reveal>
            <h2 className="text-h2 text-ink-900">{t.companyHeading}</h2>
            <p className="prose-body mt-6 mb-6 max-w-3xl">{t.companyIntro}</p>
            {/* 설명형 한 줄 — 무엇을 하는 회사인지 텍스트로 먼저 밝힌다 */}
            {settings.hero_descriptor && (
              <p className="mb-8 max-w-3xl text-body font-medium leading-relaxed text-ink-600">
                {settings.hero_descriptor}
              </p>
            )}
            <div className="flex flex-wrap items-center gap-3">
              {t.badges.map((badge) => (
                <TrustBadge key={badge}>{badge}</TrustBadge>
              ))}
            </div>
            <Link
              href={href(locale, "/quality#certifications")}
              className="mt-5 inline-block text-sm font-semibold text-ink-900 underline underline-offset-4 hover:text-accent"
            >
              {t.certCta} →
            </Link>
            <Downloads locale={locale} className="mt-4" />
            <div className="mt-12 grid grid-cols-2 gap-10 md:grid-cols-4">
              <StatBlock value={settings.stat_founded ?? "2014"} label={t.stats.founded} />
              <StatBlock value={settings.stat_revenue ?? t.stats.revenueFallback} label={t.stats.revenue} />
              <StatBlock value={settings.stat_partners ?? "55"} label={t.stats.partners} />
              <StatBlock value={settings.stat_daily ?? "1,500"} label={t.stats.daily} />
            </div>
            {settings.partners && (
              <div className="mt-14 border-t border-line pt-8">
                <p className="kicker mb-4">{t.partnersKicker}</p>
                <p className="text-sm leading-relaxed text-ink-400">
                  {settings.partners.split(",").map((partner) => partner.trim()).join(" · ")}
                </p>
              </div>
            )}
          </Reveal>
        </div>
      </section>

      {/* 브랜드 구조 한 줄 요약 */}
      <section className="section hairline-t bg-paper-warm">
        <div className="container-text text-center">
          <Reveal>
            <p className="kicker mb-6">{t.brandKicker}</p>
            <p className="text-h1 leading-snug text-ink-900">
              {t.brandTitle.line1}
              <br />
              <span className="text-accent">{t.brandTitle.accent1}</span>
              {t.brandTitle.middle}
              <span className="text-accent">{t.brandTitle.accent2}</span>
              {t.brandTitle.line2}
            </p>
            <p className="prose-body mx-auto mt-6">{t.brandLead}</p>
            <Link href={href(locale, "/brand")} className="cta-secondary mt-10">
              {t.brandCta}
            </Link>
          </Reveal>
        </div>
      </section>

      {/* 본사와 지점 */}
      <section className="section">
        <div className="container-grid">
          <SectionTitle kicker={t.factoryKicker} title={t.factoryTitle} lead={t.factoryLead} />
          <div className="grid gap-8 md:grid-cols-3">
            {factories.map((factory, i) => (
              <Reveal key={factory.slug} delayMs={i * 80}>
                <Link href={href(locale, `/factory/${factory.slug}`)} className="group block">
                  <div className="overflow-hidden rounded-2xl">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={factory.image}
                      alt={factoryImageAlt(locale, factory)}
                      className="aspect-video w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                    />
                  </div>
                  <p className="kicker mt-6">{factory.code}</p>
                  <h3 className="mt-2 text-h3 text-ink-900">{factory.name}</h3>
                  <p className="mt-1 text-sm text-ink-600">{factory.role}</p>
                  <p className="mt-3 text-sm italic text-ink-400">“{factory.symbolSentence}”</p>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <FactoryVideoGallery locale={locale} factories={factories} />

      {/* 대표 제품 — 신뢰 이후에 등장 */}
      <section className="section hairline-t bg-paper-warm">
        <div className="container-grid">
          <SectionTitle kicker={t.productKicker} title={t.productTitle} lead={t.productLead} />
          <div className="grid gap-8 md:grid-cols-3">
            {products.map((product, i) => (
              <Reveal key={product.slug} delayMs={i * 80}>
                <Link href={href(locale, `/products/${product.slug}`)} className="group block">
                  <div className="overflow-hidden rounded-2xl">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={product.image}
                      alt={productImageAlt(locale, product)}
                      className="aspect-square w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                    />
                  </div>
                  <p className="kicker mt-6">{categoryLabel(locale, product.category)}</p>
                  <h3 className="mt-2 text-h3 text-ink-900">{product.name}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink-600">{product.summary}</p>
                </Link>
              </Reveal>
            ))}
          </div>
          <div className="mt-14 text-center">
            <Link href={href(locale, "/products")} className="cta-secondary">
              {t.productCta}
            </Link>
          </div>
        </div>
      </section>

      <NextStory locale={locale} href="/why" title={t.nextStory} />
    </>
  );
}
