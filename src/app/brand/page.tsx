import type { Metadata } from "next";
import Link from "next/link";

import { Reveal } from "@/components/ui/Reveal";
import { NextStory, SectionTitle } from "@/components/ui/brand";
import { listBrands } from "@/lib/db/repo";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "BRAND — 하나의 인프라, 세 개의 얼굴",
  description: "새림 · 전국국밥거래소 · 육식노트. 브랜드 아키텍처를 소개합니다.",
};

/** BRAND — 새림 ↔ 전국국밥거래소 ↔ 육식노트 관계를 명확하게 보여준다 (docs/brand-system/02) */
export default function BrandPage() {
  const brands = listBrands();
  const master = brands.find((b) => b.role === "master");
  const subs = brands.filter((b) => b.role === "sub");

  return (
    <>
      <section className="section">
        <div className="container-text">
          <Reveal>
            <p className="kicker">Brand Architecture</p>
            <h1 className="mt-6 text-display text-ink-900">
              하나의 인프라,
              <br />세 개의 얼굴.
            </h1>
            <p className="prose-body mt-8">
              새림은 생산·품질·OEM을 책임지는 마스터 브랜드입니다. 전국국밥거래소와 육식노트는 그
              위에서 각자의 손님을 만나는 채널 브랜드입니다.
            </p>
          </Reveal>
        </div>
      </section>

      {/* 구조도 */}
      <section className="pb-20 md:pb-32">
        <div className="container-grid">
          <Reveal>
            {master && (
              <div className="rounded-2xl border-2 border-ink-900 p-8 text-center md:p-12">
                <p className="kicker">{master.nameEn} · Master Brand</p>
                <p className="mt-3 text-h1 text-ink-900">{master.name}</p>
                <p className="mt-3 text-body text-ink-600">{master.tagline}</p>
              </div>
            )}
            <div className="mx-auto h-10 w-px bg-line" aria-hidden />
            <div className="grid gap-6 md:grid-cols-2">
              {subs.map((brand) => (
                <div key={brand.slug} className="rounded-2xl border border-line p-8">
                  <p className="kicker">{brand.nameEn} · by 새림</p>
                  <h2 className="mt-3 text-h2 text-ink-900">{brand.name}</h2>
                  <p className="mt-2 text-sm font-medium text-accent">{brand.tagline}</p>
                  <p className="mt-4 text-sm leading-relaxed text-ink-600">{brand.description}</p>
                  <p className="mt-6 text-xs text-ink-400">고객 — {brand.target}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* 운영 원칙 */}
      <section className="section hairline-t bg-paper-warm">
        <div className="container-grid">
          <SectionTitle
            kicker="Operating Principles"
            title="브랜드가 늘어나도 바뀌지 않는 것"
          />
          <div className="grid gap-10 md:grid-cols-3">
            {[
              {
                title: "품질의 기준은 하나",
                body: "어느 브랜드로 팔리든 같은 8단계 품질 여정을 통과합니다. 브랜드는 얼굴이고, 품질은 새림입니다.",
              },
              {
                title: "항상 '새림의 브랜드'로",
                body: "모든 접점에서 마스터 브랜드가 함께 보입니다. 전국국밥거래소 by 새림, 새림이 만드는 육식노트.",
              },
              {
                title: "확장은 데이터로",
                body: "새 브랜드·새 공장은 구조 변경 없이 추가됩니다. 이 플랫폼은 10년의 확장을 전제로 설계되었습니다.",
              },
            ].map((item, i) => (
              <Reveal key={item.title} delayMs={i * 80}>
                <h3 className="text-h3 text-ink-900">{item.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-ink-600">{item.body}</p>
              </Reveal>
            ))}
          </div>
          <Reveal>
            <div className="mt-16 text-center">
              <p className="text-h2 text-ink-900">식품 브랜드 뒤에는 새림이 있습니다.</p>
              <Link href="/oem" className="cta-secondary mt-8">
                내 브랜드 만들기 (OEM)
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      <NextStory href="/business" label="BUSINESS" title="무엇을 하는 회사인가" />
    </>
  );
}
