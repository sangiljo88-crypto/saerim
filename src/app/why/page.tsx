import type { Metadata } from "next";

import { Reveal } from "@/components/ui/Reveal";
import { NextStory, SectionTitle } from "@/components/ui/brand";

export const metadata: Metadata = {
  title: "WHY — 우리는 왜 존재하는가",
  description: "새림은 제품을 판매하는 회사가 아니라, 대한민국 외식 산업을 준비하는 식품 인프라입니다.",
};

/** WHY — 브랜드 철학을 한 편의 글처럼 읽는 페이지 (Aesop 원칙) */
export default function WhyPage() {
  return (
    <>
      <section className="section">
        <div className="container-text">
          <Reveal>
            <p className="kicker">Why Saerim Exists</p>
            <h1 className="mt-6 text-display text-ink-900">
              좋은 식당의 뒤에는
              <br />
              보이지 않는 준비가 있습니다.
            </h1>
          </Reveal>
        </div>
      </section>

      <section className="pb-20 md:pb-32">
        <div className="container-text space-y-16">
          <Reveal>
            <p className="prose-body text-xl leading-loose">
              국밥집의 아침은 원료 확인으로 시작됩니다. 머릿고기의 상태, 내장의 신선도, 오늘 쓸
              육수의 베이스. 이 확인이 흔들리면 그날의 장사가 흔들립니다.
            </p>
          </Reveal>

          <Reveal>
            <p className="prose-body text-xl leading-loose">
              새림은 2003년부터 23년째 이 아침의 확인을 공장에서 대신해왔습니다. 입고부터 출고까지
              여덟 단계의 기준을 지키며, 식당이 요리에만 집중할 수 있는 상태로 원료를 준비합니다.
            </p>
          </Reveal>

          <Reveal>
            <p className="prose-body text-xl leading-loose">
              새림은 고기 납품업체가 아닙니다. 삼겹살은 누구나 다룹니다. 새림은 머리·내장·특수부위처럼
              다루기 어려운 부위를 전문 설비와 위생 공정으로 팔리는 상품으로 바꿉니다. 돼지 한 마리의
              마지막 1%까지 상품이 됩니다.
            </p>
          </Reveal>

          <Reveal>
            <div className="hairline-t pt-16">
              <p className="text-h1 leading-snug text-ink-900">
                그래서 새림은 스스로를
                <br />
                제조 회사가 아니라
                <br />
                <span className="text-accent">“외식 산업을 준비하는 인프라”</span>
                라고 부릅니다.
              </p>
            </div>
          </Reveal>

          <Reveal>
            <p className="prose-body text-xl leading-loose">
              인프라는 화려하지 않습니다. 대신 멈추지 않습니다. 매일 같은 품질, 같은 시간의 출고,
              같은 기준의 검수. 새림이 지키는 것은 이 반복의 신뢰입니다.
            </p>
          </Reveal>
        </div>
      </section>

      {/* 약속 3가지 */}
      <section className="section hairline-t bg-paper-warm">
        <div className="container-grid">
          <SectionTitle kicker="Our Promises" title="새림이 지키는 세 가지" />
          <div className="grid gap-10 md:grid-cols-3">
            {[
              {
                no: "01",
                title: "기준은 문서로 존재한다",
                body: "감이 아니라 작업 표준서와 관리 수치로 생산합니다. 사람이 바뀌어도 품질은 바뀌지 않습니다.",
              },
              {
                no: "02",
                title: "모든 로트는 추적된다",
                body: "입고부터 출고까지 로트 번호로 기록됩니다. 어떤 제품이 어디로 갔는지 언제든 답할 수 있습니다.",
              },
              {
                no: "03",
                title: "파트너의 성장이 곧 성장이다",
                body: "새림의 매출은 파트너 매장의 성공에서 나옵니다. 그래서 거품을 빼고 공급 구조를 설계합니다.",
              },
            ].map((item, i) => (
              <Reveal key={item.no} delayMs={i * 80}>
                <p className="text-sm font-bold text-accent">{item.no}</p>
                <h3 className="mt-3 text-h3 text-ink-900">{item.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-ink-600">{item.body}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container-text text-center">
          <Reveal>
            <p className="text-h1 text-ink-900">식품 브랜드 뒤에는 새림이 있습니다.</p>
          </Reveal>
        </div>
      </section>

      <NextStory href="/brand" label="BRAND" title="하나의 인프라, 세 개의 얼굴" />
    </>
  );
}
