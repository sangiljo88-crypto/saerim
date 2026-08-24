import Link from "next/link";

import { Reveal } from "@/components/ui/Reveal";
import { NextStory, SectionTitle, StatBlock, TrustBadge } from "@/components/ui/brand";
import { categoryLabel, getSettings, listFactories, listFeaturedProducts } from "@/lib/content";
import { getDict } from "@/lib/i18n";
import { href, type Locale } from "@/lib/i18n/config";

export const dynamic = "force-dynamic";

type Props = { params: Promise<{ locale: Locale }> };

/**
 * HOME — 첫 화면은 제품이 아니라 신뢰를 보여준다. (docs/brand-system/01)
 * Hero(브랜드 메시지) → 신뢰 지표 → 브랜드 구조 → 공장 → 대표 제품 → 다음 이야기
 */
export default async function HomePage({ params }: Props) {
  const { locale } = await params;
  const t = getDict(locale).home;
  const settings = getSettings(locale);
  const factories = listFactories(locale);
  const products = listFeaturedProducts(locale).slice(0, 3);
  const heroMedia = settings.hero_media ?? "";
  const isVideo = heroMedia.endsWith(".mp4") || heroMedia.endsWith(".webm");

  return (
    <>
      {/* Hero — 풀스크린 미디어 + 브랜드 메시지 */}
      <section className="relative flex min-h-[calc(100svh-4rem)] items-center justify-center overflow-hidden bg-ink-950">
        {isVideo ? (
          <video
            className="absolute inset-0 h-full w-full object-cover opacity-60"
            src={heroMedia}
            autoPlay
            muted
            loop
            playsInline
          />
        ) : (
          heroMedia && (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={heroMedia}
              alt=""
              className="absolute inset-0 h-full w-full animate-slow-zoom object-cover opacity-60"
            />
          )
        )}
        <div className="absolute inset-0 bg-ink-950/55" aria-hidden />

        <div className="relative z-10 px-6 text-center text-white">
          <p className="kicker !text-white/60">Saerim Food Infrastructure</p>
          <h1 className="mt-6 text-display">
            {settings.hero_title_1}
            <br />
            <span className="text-white">{settings.hero_title_2}</span>
          </h1>
          <p className="mx-auto mt-8 max-w-xl text-body text-white/80">{settings.hero_sub}</p>
          <div className="mt-12 flex flex-wrap items-center justify-center gap-3">
            <Link href={href(locale, "/why")} className="cta-primary !bg-white !text-ink-900 hover:!bg-paper-warm">
              {t.heroCtaStory}
            </Link>
            <Link
              href={href(locale, "/contact")}
              className="cta-secondary !border-white/40 !text-white hover:!border-white"
            >
              {t.heroCtaContact}
            </Link>
          </div>
        </div>

        <p className="absolute bottom-8 left-1/2 -translate-x-1/2 text-xs tracking-[0.2em] text-white/50">
          SCROLL
        </p>
      </section>

      {/* 신뢰 지표 — 숫자로 증명 */}
      <section className="section">
        <div className="container-grid">
          <Reveal>
            <div className="flex flex-wrap items-center gap-3">
              {t.badges.map((badge) => (
                <TrustBadge key={badge}>{badge}</TrustBadge>
              ))}
            </div>
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

      {/* 세 공장 */}
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
                      alt={factory.name}
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
                      alt={product.name}
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
