import Link from "next/link";

import { Reveal } from "@/components/ui/Reveal";
import { NextStory, SectionTitle, StatBlock, TrustBadge } from "@/components/ui/brand";
import { getSettings, listFactories, listFeaturedProducts } from "@/lib/db/repo";

export const dynamic = "force-dynamic";

/**
 * HOME — 첫 화면은 제품이 아니라 신뢰를 보여준다. (docs/brand-system/01)
 * Hero(브랜드 메시지) → 신뢰 지표 → 브랜드 구조 → 공장 → 대표 제품 → 다음 이야기
 */
export default function HomePage() {
  const settings = getSettings();
  const factories = listFactories();
  const products = listFeaturedProducts().slice(0, 3);
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
            <Link href="/why" className="cta-primary !bg-white !text-ink-900 hover:!bg-paper-warm">
              새림 이야기 보기
            </Link>
            <Link
              href="/contact"
              className="cta-secondary !border-white/40 !text-white hover:!border-white"
            >
              도매·OEM 문의
            </Link>
          </div>
        </div>

        <p className="absolute bottom-8 left-1/2 -translate-x-1/2 text-xs tracking-[0.2em] text-white/50">
          SCROLL
        </p>
      </section>

      {/* 신뢰 지표 — Toyota 원칙: 숫자로 증명 */}
      <section className="section">
        <div className="container-grid">
          <Reveal>
            <div className="flex flex-wrap items-center gap-3">
              <TrustBadge>HACCP 2개 업종 (포장처리 · 축산물가공)</TrustBadge>
              <TrustBadge>ISO 9001 · 14001</TrustBadge>
              <TrustBadge>무항생제 · 유기가공식품</TrustBadge>
              <TrustBadge>INNOBIZ · MAIN-BIZ</TrustBadge>
            </div>
            <div className="mt-12 grid grid-cols-2 gap-10 md:grid-cols-4">
              <StatBlock value={settings.stat_founded ?? "2014"} label="창립 — 군산에서 12년" />
              <StatBlock value={settings.stat_revenue ?? "235.6억"} label="2025년 연 매출" />
              <StatBlock value={settings.stat_partners ?? "55개사"} label="거래 파트너" />
              <StatBlock value={settings.stat_daily ?? "1,500두"} label="일일 돈두·내장 열처리" />
            </div>
            {settings.partners && (
              <div className="mt-14 border-t border-line pt-8">
                <p className="kicker mb-4">Partners</p>
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
            <p className="kicker mb-6">One Infrastructure, Three Brands</p>
            <p className="text-h1 leading-snug text-ink-900">
              하나의 인프라 위에
              <br />
              <span className="text-accent">전국국밥거래소</span>와 <span className="text-accent">육식노트</span>가
              움직입니다
            </p>
            <p className="prose-body mx-auto mt-6">
              새림은 생산과 품질을 책임지고, 두 브랜드는 각자의 손님을 만납니다. 브랜드가 늘어나도
              품질의 기준은 하나입니다.
            </p>
            <Link href="/brand" className="cta-secondary mt-10">
              브랜드 구조 보기
            </Link>
          </Reveal>
        </div>
      </section>

      {/* 세 공장 */}
      <section className="section">
        <div className="container-grid">
          <SectionTitle
            kicker="Factories"
            title="본사와 지점, 하나의 기준"
            lead="군산 본사와 김제·예산·임피·용인 4개 지점 — 그중 핵심 생산 세 축을 소개합니다."
          />
          <div className="grid gap-8 md:grid-cols-3">
            {factories.map((factory, i) => (
              <Reveal key={factory.slug} delayMs={i * 80}>
                <Link href={`/factory/${factory.slug}`} className="group block">
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
          <SectionTitle
            kicker="Featured Products"
            title="매장에 바로 투입되는 품목"
            lead="모든 제품은 스토리·공정·규격·활용까지 갖춘 하나의 제안입니다."
          />
          <div className="grid gap-8 md:grid-cols-3">
            {products.map((product, i) => (
              <Reveal key={product.slug} delayMs={i * 80}>
                <Link href={`/products/${product.slug}`} className="group block">
                  <div className="overflow-hidden rounded-2xl">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={product.image}
                      alt={product.name}
                      className="aspect-square w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                    />
                  </div>
                  <p className="kicker mt-6">{product.category}</p>
                  <h3 className="mt-2 text-h3 text-ink-900">{product.name}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink-600">{product.summary}</p>
                </Link>
              </Reveal>
            ))}
          </div>
          <div className="mt-14 text-center">
            <Link href="/products" className="cta-secondary">
              전체 제품 보기
            </Link>
          </div>
        </div>
      </section>

      <NextStory href="/why" label="WHY" title="우리는 왜 존재하는가" />
    </>
  );
}
