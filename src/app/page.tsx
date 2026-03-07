import Link from "next/link";

import { CategoryCard } from "@/components/catalog/CategoryCard";
import { ProductCard } from "@/components/catalog/ProductCard";
import { Badge } from "@/components/ui/Badge";
import { GradientVisual } from "@/components/ui/GradientVisual";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { getAllCategories, getFeaturedProducts } from "@/lib/catalog";

const processSteps = [
  {
    title: "Catching / Sourcing",
    detail: "남해·동해·완도 중심 원물 네트워크로 안정 수급",
  },
  {
    title: "Drying",
    detail: "제품 특성별 건조 기준으로 풍미와 식감 균형 유지",
  },
  {
    title: "Sorting",
    detail: "규격·이물·색상 기준 선별로 균일한 품질 유지",
  },
  {
    title: "Packaging",
    detail: "용도별 패키징 설계와 물류 대응으로 신뢰도 강화",
  },
];

const trustMetrics = [
  { label: "B2B 파트너", value: "150+" },
  { label: "연간 출고 건수", value: "24K" },
  { label: "정시 출고율", value: "99.2%" },
  { label: "재구매 비율", value: "87%" },
];

export default function HomePage() {
  const categories = getAllCategories();
  const featuredProducts = getFeaturedProducts().slice(0, 6);

  return (
    <div className="pb-14 pt-8 sm:pt-12">
      <section className="landing-section">
        <div className="premium-shell overflow-hidden p-7 sm:p-10 lg:p-12">
          <div className="grid items-center gap-10 lg:grid-cols-[1.1fr_0.9fr]">
            <Reveal>
              <p className="premium-kicker">Premium Dried Seafood Landing</p>
              <h1 className="mt-4 font-display text-[2.2rem] font-extrabold leading-[1.1] text-deep-950 sm:text-5xl lg:text-6xl">
                건해산물 브랜드를
                <br />
                가장 설득력 있게 소개하는 방식
              </h1>
              <p className="mt-6 max-w-2xl text-sm leading-7 text-slate-600 sm:text-base">
                광일건해는 전통 식재료를 현대적인 브랜드 경험으로 재해석합니다. 쇼핑몰형 상품 나열이 아닌,
                카테고리-스토리-제품 상세가 연결된 랜딩 구조로 고객의 신뢰와 전환을 동시에 높입니다.
              </p>
              <div className="mt-6 flex flex-wrap gap-2">
                <Badge>무료배송</Badge>
                <Badge>산지직송</Badge>
                <Badge>도매가능</Badge>
                <Badge tone="dark">인기상품</Badge>
              </div>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link href="/categories" className="cta-primary">
                  카테고리 둘러보기
                </Link>
                <Link href="/wholesale" className="cta-secondary">
                  도매 상담 시작
                </Link>
              </div>
            </Reveal>

            <Reveal delayMs={120}>
              <div className="relative">
                <GradientVisual label="KWANGIL DRIED SEAFOOD" tone="sea" className="min-h-[360px] sm:min-h-[420px]" />
                <div className="absolute -bottom-4 left-4 right-4 grid gap-3 sm:grid-cols-2">
                  {[
                    "카테고리 기반 탐색 구조",
                    "마켓 링크형 구매 확장",
                    "브랜드 신뢰형 상세 페이지",
                    "모바일 우선 랜딩 설계",
                  ].map((line) => (
                    <p key={line} className="rounded-2xl border border-white/60 bg-white/90 px-3 py-2 text-xs font-medium text-slate-700 backdrop-blur">
                      {line}
                    </p>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>

          <Reveal delayMs={220}>
            <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {trustMetrics.map((metric) => (
                <article key={metric.label} className="rounded-2xl border border-slate-200 bg-white/80 p-4">
                  <p className="text-2xl font-bold text-deep-950">{metric.value}</p>
                  <p className="mt-1 text-xs uppercase tracking-[0.14em] text-slate-500">{metric.label}</p>
                </article>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <section className="landing-section mt-14 sm:mt-20">
        <Reveal>
          <div className="grid gap-4 md:grid-cols-3">
            {[
              ["Value Proposition", "산지 소싱부터 포장까지 하나의 품질 기준으로 연결됩니다."],
              ["Landing-first Architecture", "홈-카테고리-제품 상세가 자연스럽게 이어지는 정보 구조입니다."],
              ["Future Marketplace Ready", "스마트스토어/지마켓 링크 기반으로 빠른 판매 확장이 가능합니다."],
            ].map(([title, desc]) => (
              <article key={title} className="glass-card p-6">
                <p className="premium-kicker">{title}</p>
                <p className="mt-3 text-sm leading-7 text-slate-700">{desc}</p>
              </article>
            ))}
          </div>
        </Reveal>
      </section>

      <section className="landing-section mt-16 sm:mt-24">
        <Reveal>
          <SectionHeading
            eyebrow="Main Categories"
            title="고객이 원하는 목적 중심으로 카테고리를 설계"
            description="카테고리별 페이지가 단순 목록이 아니라, 가치 제안과 대표 제품, 전환 CTA를 포함한 세일즈 랜딩 역할을 수행합니다."
          />
          <div className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {categories.map((category) => (
              <CategoryCard key={category.id} category={category} />
            ))}
          </div>
        </Reveal>
      </section>

      <section className="landing-section mt-16 sm:mt-24">
        <Reveal>
          <div className="rounded-[2rem] bg-deep-950 p-7 sm:p-10">
            <p className="premium-kicker text-brand-200">Featured Products</p>
            <h2 className="mt-3 font-display text-3xl font-bold leading-tight text-white sm:text-4xl">대표 제품 랜딩 페이지</h2>
            <p className="mt-4 max-w-3xl text-sm leading-7 text-slate-200 sm:text-base">
              제품 상세에서는 원산지, 공정, 사용처, 배송 정보를 설득형 흐름으로 제시하고 외부 구매 버튼으로 전환합니다.
            </p>
            <div className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {featuredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </Reveal>
      </section>

      <section className="landing-section mt-16 sm:mt-24">
        <Reveal>
          <div className="grid gap-8 rounded-[2rem] border border-slate-200 bg-white p-8 shadow-soft sm:p-10 lg:grid-cols-[1.05fr_0.95fr]">
            <div>
              <p className="premium-kicker">Brand Story Preview</p>
              <h2 className="mt-4 font-display text-3xl font-bold leading-tight text-deep-950 sm:text-4xl">
                바다의 재료를,
                <br />
                지금의 식탁 언어로 번역합니다
              </h2>
              <p className="mt-5 max-w-xl text-sm leading-7 text-slate-600 sm:text-base">
                광일건해는 산지 네트워크와 가공 운영 경험을 기반으로, 전통 식재료를 브랜드 자산으로 전환합니다. 브랜드
                스토리 페이지에서 운영 철학과 신뢰 근거를 확인하세요.
              </p>
              <Link href="/brand" className="cta-primary mt-7">
                브랜드 스토리 보기
              </Link>
            </div>
            <GradientVisual label="Brand Philosophy" tone="night" className="min-h-[300px]" />
          </div>
        </Reveal>
      </section>

      <section className="landing-section mt-16 sm:mt-24">
        <Reveal>
          <SectionHeading
            eyebrow="Process"
            title="Catching → Drying → Sorting → Packaging"
            description="품질 포인트를 공정 단위로 분해해 제품 페이지와 브랜드 페이지에서 일관된 메시지를 유지합니다."
          />
          <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {processSteps.map((step, index) => (
              <article key={step.title} className="glass-card p-6">
                <p className="premium-kicker">Step {index + 1}</p>
                <h3 className="mt-2 font-display text-xl font-bold text-deep-950">{step.title}</h3>
                <p className="mt-3 text-sm leading-7 text-slate-600">{step.detail}</p>
              </article>
            ))}
          </div>
        </Reveal>
      </section>

      <section className="landing-section mt-16 sm:mt-24">
        <Reveal>
          <div className="rounded-[2rem] border border-brand-200 bg-brand-50 p-8 sm:p-10">
            <p className="premium-kicker">Wholesale CTA</p>
            <h2 className="mt-3 font-display text-3xl font-bold text-deep-950 sm:text-4xl">식당, 유통사, 온라인 셀러를 위한 B2B 공급</h2>
            <p className="mt-4 max-w-3xl text-sm leading-7 text-slate-700 sm:text-base">
              업종별 MOQ, 패키지, 납품 일정에 맞춰 커스터마이징 제안을 제공합니다. 샘플 테스트부터 정기 납품까지 한 번에
              상담할 수 있습니다.
            </p>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <Link href="/wholesale" className="cta-primary">
                도매 문의하기
              </Link>
              <Link href="/contact" className="cta-secondary">
                위치 / 연락처 보기
              </Link>
            </div>
          </div>
        </Reveal>
      </section>

      <section className="landing-section mt-16 sm:mt-24">
        <Reveal>
          <div className="grid gap-8 lg:grid-cols-[1fr_1fr]">
            <article className="glass-card p-7 sm:p-8">
              <p className="premium-kicker">Location / Trust</p>
              <h3 className="mt-3 font-display text-2xl font-bold text-deep-950">서울 본사 + 산지 협력 네트워크</h3>
              <p className="mt-4 text-sm leading-7 text-slate-600">
                본사 운영팀과 산지 파트너를 연결한 공급망으로 주문 대응 속도와 품질 안정성을 동시에 확보합니다.
              </p>
              <ul className="mt-6 space-y-2 text-sm text-slate-700">
                <li>주소: 서울시 강서구 식품산업로 100</li>
                <li>대표전화: 02-1234-5678</li>
                <li>이메일: hello@kwangildryfood.co.kr</li>
              </ul>
            </article>
            <article className="glass-card p-7 sm:p-8">
              <p className="premium-kicker">Trusted by Buyers</p>
              <ul className="mt-4 grid gap-3 text-sm text-slate-700 sm:grid-cols-2">
                <li className="rounded-2xl border border-slate-200 bg-white p-4">프랜차이즈 구매팀 정기 납품 대응</li>
                <li className="rounded-2xl border border-slate-200 bg-white p-4">마트 PB 소싱 협업 가능</li>
                <li className="rounded-2xl border border-slate-200 bg-white p-4">온라인몰 입점형 패키지 지원</li>
                <li className="rounded-2xl border border-slate-200 bg-white p-4">명절 선물세트 대량 출고 프로세스</li>
              </ul>
            </article>
          </div>
        </Reveal>
      </section>
    </div>
  );
}
