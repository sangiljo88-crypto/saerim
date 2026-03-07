import type { Metadata } from "next";

import { GradientVisual } from "@/components/ui/GradientVisual";
import { SectionHeading } from "@/components/ui/SectionHeading";

export const metadata: Metadata = {
  title: "브랜드 스토리",
  description: "광일건해의 철학, 생산 공정, 신뢰 포인트, 사업 정보를 확인하세요.",
};

export default function BrandStoryPage() {
  return (
    <div className="landing-section py-10 sm:py-14">
      <section className="grid gap-8 rounded-[2rem] border border-slate-200 bg-white p-7 shadow-soft sm:p-10 lg:grid-cols-[1.1fr_0.9fr]">
        <div>
          <SectionHeading
            eyebrow="Company Introduction"
            title="광일건해 브랜드 소개"
            description="광일건해는 전통 건해산물 유통 방식에 현대적 브랜드 기획과 품질 표준을 결합한 프리미엄 식품 브랜드입니다."
          />
          <p className="mt-5 text-sm leading-7 text-slate-600 sm:text-base">
            우리는 단순히 제품을 판매하는 대신, 카테고리와 용도 중심으로 상품을 재구성해 고객의 선택 시간을 줄이고
            신뢰를 높이는 브랜드 경험을 제공합니다.
          </p>
        </div>
        <GradientVisual label="Brand Story" tone="night" className="min-h-[300px]" />
      </section>

      <section className="mt-14 grid gap-6 lg:grid-cols-2">
        <article className="glass-card p-7 sm:p-8">
          <SectionHeading
            eyebrow="Philosophy"
            title="브랜드 철학"
            description="좋은 건해산물은 원물의 상태, 건조의 기준, 포장의 완성도에서 결정된다는 원칙으로 운영합니다."
          />
        </article>
        <article className="glass-card p-7 sm:p-8">
          <SectionHeading
            eyebrow="Production Process"
            title="생산 및 운영 프로세스"
            description="산지 수급 → 건조/선별 → 품질 검수 → 패키징 → 채널별 출고까지 단계별 기준을 운영합니다."
          />
        </article>
      </section>

      <section className="mt-14 rounded-[2rem] border border-slate-200 bg-white p-7 shadow-soft sm:p-10">
        <SectionHeading eyebrow="Trust Points" title="신뢰 포인트" />
        <div className="mt-7 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {[
            "산지 협력 네트워크 기반 안정 수급",
            "규격화된 선별/가공 기준",
            "채널 맞춤 패키징 및 납기 대응",
            "B2C + B2B 동시 운영 가능한 제품 구조",
          ].map((item) => (
            <div key={item} className="rounded-2xl border border-slate-200 bg-slate-50 p-4 text-sm leading-7 text-slate-700">
              {item}
            </div>
          ))}
        </div>
      </section>

      <section className="mt-14 rounded-[2rem] bg-brand-50 p-7 sm:p-10">
        <SectionHeading
          eyebrow="Location / Business Info"
          title="사업장 정보"
          description="서울 본사 운영팀과 산지 파트너를 중심으로 소매/도매 모두 대응합니다."
        />
        <div className="mt-5 grid gap-3 text-sm text-slate-700 sm:grid-cols-2">
          <p>주소: 서울시 강서구 식품산업로 100</p>
          <p>대표번호: 02-1234-5678</p>
          <p>이메일: hello@kwangildryfood.co.kr</p>
          <p>운영시간: 평일 09:00 - 18:00</p>
        </div>
      </section>
    </div>
  );
}
