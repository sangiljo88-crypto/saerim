import type { Metadata } from "next";
import Link from "next/link";

import { Reveal } from "@/components/ui/Reveal";
import { NextStory, SectionTitle, TrustBadge } from "@/components/ui/brand";
import { listFactories } from "@/lib/db/repo";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "OEM — 당신의 브랜드도 만들 수 있다",
  description: "레시피 구현부터 표시사항 검토까지, 새림 품질 체계 안에서 파트너 브랜드의 제품을 생산합니다.",
};

const OEM_STEPS = [
  { step: "1", name: "상담", body: "품목·목표 원가·수량을 듣고 생산 가능성을 검토합니다." },
  { step: "2", name: "레시피 구현", body: "파트너의 맛을 공정 표준으로 옮깁니다. 시제품을 함께 검증합니다." },
  { step: "3", name: "규격·표시 설계", body: "포장 규격과 표시사항을 법규에 맞게 설계합니다." },
  { step: "4", name: "생산·납품", body: "8단계 품질 여정을 통과한 제품이 파트너 브랜드로 출고됩니다." },
];

/** OEM — "식품 브랜드 뒤에는 새림이 있습니다"가 실제 사업이 되는 페이지 */
export default function OemPage() {
  const factories = listFactories().filter((f) => f.slug !== "gunsan");

  return (
    <>
      <section className="section">
        <div className="container-text">
          <Reveal>
            <p className="kicker">OEM Partnership</p>
            <h1 className="mt-6 text-display text-ink-900">
              당신의 브랜드 뒤에
              <br />
              새림이 서겠습니다.
            </h1>
            <p className="prose-body mt-8">
              좋은 레시피가 있어도 공장이 없어 시작하지 못하는 브랜드가 많습니다. 새림의 OEM은
              설비를 빌려주는 것이 아니라, 12년의 품질 체계를 통째로 빌려드리는 일입니다.
            </p>
            <p className="prose-body mt-4">
              하이포크 특수부위 OEM, 농협 목우촌 생산도급, 이마트 트레이더스 PB 납품 — 대형 유통의
              검수·물류 기준을 이미 통과한 라인에서 당신의 브랜드가 생산됩니다.
            </p>
            <div className="mt-8 flex flex-wrap gap-2">
              <TrustBadge>HACCP 2개 업종 공정 그대로 적용</TrustBadge>
              <TrustBadge>소량 시생산 가능</TrustBadge>
              <TrustBadge>표시사항 검토 지원</TrustBadge>
            </div>
          </Reveal>
        </div>
      </section>

      {/* 생산 라인 */}
      <section className="section hairline-t bg-paper-warm">
        <div className="container-grid">
          <SectionTitle
            kicker="Production Lines"
            title="두 개의 OEM 라인"
            lead="만들고 싶은 제품에 따라 담당 공장이 정해집니다."
          />
          <div className="grid gap-8 md:grid-cols-2">
            {factories.map((factory, i) => (
              <Reveal key={factory.slug} delayMs={i * 80}>
                <Link
                  href={`/factory/${factory.slug}`}
                  className="group block overflow-hidden rounded-2xl border border-line bg-white"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={factory.image}
                    alt={factory.name}
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
          <SectionTitle kicker="Process" title="OEM은 이렇게 진행됩니다" />
          <ol className="grid gap-8 md:grid-cols-4">
            {OEM_STEPS.map((item, i) => (
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

      <section className="section hairline-t bg-paper-warm">
        <div className="container-text text-center">
          <Reveal>
            <p className="text-h1 text-ink-900">식품 브랜드 뒤에는 새림이 있습니다.</p>
            <p className="prose-body mx-auto mt-5">
              당신의 다음 히트 상품이 새림 라인 위에서 나오기를 기원합니다.
            </p>
            <Link href="/contact?type=oem" className="cta-primary mt-10">
              OEM 상담 시작하기
            </Link>
          </Reveal>
        </div>
      </section>

      <NextStory href="/news" label="NEWS" title="새림은 계속 움직이고 있다" />
    </>
  );
}
