import type { Metadata } from "next";

import { GradientVisual } from "@/components/ui/GradientVisual";
import { SectionHeading } from "@/components/ui/SectionHeading";

export const metadata: Metadata = {
  title: "브랜드 소개",
  description: "유한회사 새림의 기업 개요, 3개 사업장, 생산 역량과 식품안전 시스템을 소개합니다.",
};

const branchCards = [
  {
    name: "새림 본사",
    focus: "돼지 부산물",
    body: "군산 본사를 중심으로 돈두·내장류를 포함한 돼지 부산물 포장/가공 제품을 생산·공급합니다.",
    tone: "night",
    src: "/images/company/branch-hq-product.jpg",
  },
  {
    name: "새림 용인지점",
    focus: "햄 육가공",
    body: "햄·육가공 라인의 OEM 및 B2B 생산을 담당하며, 위생 기준과 표준 공정 중심으로 운영합니다.",
    tone: "stone",
    src: "/images/company/branch-yongin-product.jpg",
  },
  {
    name: "새림 임피공장",
    focus: "즙공장",
    body: "즙·추출 기반 제품 생산 라인을 운영하며, 가공/열처리/포장 공정을 체계적으로 관리합니다.",
    tone: "sand",
    src: "/images/company/branch-impi-product.jpg",
  },
] as const;

export default function BrandStoryPage() {
  return (
    <div className="landing-section py-10 sm:py-14">
      <section className="grid gap-8 rounded-[2rem] border border-slate-200 bg-white p-7 shadow-soft sm:p-10 lg:grid-cols-[1.1fr_0.9fr]">
        <div>
          <SectionHeading
            eyebrow="Company Introduction"
            title="유한회사 새림 브랜드 소개"
            description="식육 포장/가공 및 HMR 식품개발에 정성을 더해, 품질은 높이고 거품을 뺀 합리적 가격을 추구합니다."
          />
          <p className="mt-5 text-sm leading-7 text-slate-600 sm:text-base">
            새림은 2004년부터 축적한 생산 노하우와 HACCP 기반 운영 체계를 바탕으로, 국탕류와 뒷고기류를
            포함한 다양한 식육 제품을 안정적으로 공급하고 있습니다.
          </p>
        </div>
        <GradientVisual
          label="Saerim Brand"
          tone="night"
          src="/images/company/hero-main-photo4.jpg"
          showLabel={false}
          overlay="soft"
          className="min-h-[300px]"
        />
      </section>

      <section className="mt-14 rounded-[2rem] border border-slate-200 bg-white p-7 shadow-soft sm:p-10">
        <SectionHeading
          eyebrow="Business Areas"
          title="새림 3대 사업축"
          description="브랜드 소개의 핵심인 본사·용인지점·임피공장을 중심으로 사업을 운영합니다."
        />
        <div className="mt-7 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {branchCards.map((branch) => (
            <article key={branch.name} className="overflow-hidden rounded-3xl border border-slate-200 bg-white">
              <GradientVisual
                label={branch.name}
                tone={branch.tone}
                src={branch.src}
                showLabel={false}
                overlay="soft"
                className="min-h-[180px] rounded-none border-none"
              />
              <div className="p-5">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-700">{branch.focus}</p>
                <h3 className="mt-2 font-display text-2xl font-bold text-deep-950">{branch.name}</h3>
                <p className="mt-3 text-sm leading-7 text-slate-600">{branch.body}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="mt-14 grid gap-6 lg:grid-cols-2">
        <article className="glass-card p-7 sm:p-8">
          <SectionHeading
            eyebrow="Core Capabilities"
            title="생산 및 운영 역량"
            description="식육 포장, 식육 가공, 식육 추출, HMR 식품 개발을 중심으로 제품 기획부터 생산까지 원스톱으로 대응합니다."
          />
          <ul className="mt-5 space-y-3 text-sm leading-7 text-slate-700">
            <li className="rounded-2xl border border-slate-200 bg-white p-4">전 생산공정 HACCP 기준 운영</li>
            <li className="rounded-2xl border border-slate-200 bg-white p-4">매일 생산/출고 기반의 안정적 납품 구조</li>
            <li className="rounded-2xl border border-slate-200 bg-white p-4">온·오프라인 채널 동시 대응 가능한 생산 체계</li>
          </ul>
        </article>

        <article className="glass-card p-7 sm:p-8">
          <SectionHeading
            eyebrow="Food Safety"
            title="식품안전시스템"
            description="생산, 보관, 유통 전 과정을 엄격한 기준으로 관리하며 품질 추적 시스템으로 이력 관리를 수행합니다."
          />
          <ul className="mt-5 space-y-3 text-sm leading-7 text-slate-700">
            <li className="rounded-2xl border border-slate-200 bg-white p-4">위험요소 원천 차단을 위한 다단계 검수</li>
            <li className="rounded-2xl border border-slate-200 bg-white p-4">배송 전 온도 체크 및 콜드체인 적용</li>
            <li className="rounded-2xl border border-slate-200 bg-white p-4">문제 발생 시 역추적 가능한 기록 관리</li>
          </ul>
        </article>
      </section>

      <section className="mt-14 rounded-[2rem] bg-brand-50 p-7 sm:p-10">
        <SectionHeading
          eyebrow="Company Info"
          title="사업자 정보"
          description="사업자등록증 기준 회사 정보를 안내합니다."
        />
        <div className="mt-5 grid gap-4 text-sm text-slate-700 sm:grid-cols-2">
          <p>법인명: 유한회사 새림</p>
          <p>대표자: 최인환</p>
          <p>사업자등록번호: 481-86-00066</p>
          <p>법인등록번호: 211114-0032627</p>
          <p className="sm:col-span-2">주소: 전북특별자치도 군산시 옥산면 산성로 154</p>
          <p>TEL: 063-464-8681</p>
          <p>FAX: 063-464-8683</p>
          <p className="sm:col-span-2">E-MAIL: serim6408@naver.com</p>
        </div>
      </section>
    </div>
  );
}
