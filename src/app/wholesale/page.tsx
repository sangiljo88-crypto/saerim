import type { Metadata } from "next";

import { GradientVisual } from "@/components/ui/GradientVisual";
import { SectionHeading } from "@/components/ui/SectionHeading";

export const metadata: Metadata = {
  title: "도매 문의",
  description: "국탕류·뒷고기류 및 식육 가공 제품의 B2B 납품 문의 페이지",
};

const targetCustomers = ["국밥/순댓국 매장", "뒷고기·특수부위 전문점", "식자재 유통사", "프랜차이즈 본사"];
const strengths = [
  "국탕류/뒷고기류 원스톱 공급",
  "소량 테스트부터 대량 납품까지 대응",
  "오전 10시 이전 주문 당일 출고 체계",
  "정기 납품 및 전용 사양 협의 가능",
];

export default function WholesalePage() {
  return (
    <div className="landing-section py-10 sm:py-14">
      <section className="grid gap-6 rounded-[2rem] border border-slate-200 bg-white p-7 shadow-soft sm:p-10 lg:grid-cols-[1.15fr_0.85fr]">
        <div>
          <SectionHeading
            eyebrow="Wholesale Inquiry"
            title="국탕류·뒷고기류 B2B 납품 파트너"
            description="새림은 국밥 매장과 뒷고기 전문점을 위한 핵심 원료를 공장 직송 기반으로 안정 공급합니다."
          />
        </div>
        <GradientVisual
          label="Wholesale Hero"
          tone="night"
          src="/images/company/branch-yongin-product.jpg"
          showLabel={false}
          overlay="soft"
          className="min-h-[260px]"
        />
      </section>

      <section className="mt-14 grid gap-6 lg:grid-cols-2">
        <article className="glass-card p-7 sm:p-8">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-700">Target Customers</p>
          <ul className="mt-4 grid gap-3 text-sm text-slate-700 sm:grid-cols-2">
            {targetCustomers.map((item) => (
              <li key={item} className="rounded-2xl border border-slate-200 bg-white p-4">
                {item}
              </li>
            ))}
          </ul>
        </article>

        <article className="glass-card p-7 sm:p-8">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-700">B2B Strengths</p>
          <ul className="mt-4 space-y-3 text-sm leading-7 text-slate-700">
            {strengths.map((item) => (
              <li key={item} className="rounded-2xl border border-slate-200 bg-white p-4">
                {item}
              </li>
            ))}
          </ul>
        </article>
      </section>

      <section className="mt-14 grid gap-6 lg:grid-cols-[1fr_0.9fr]">
        <article className="rounded-[2rem] border border-slate-200 bg-white p-7 shadow-soft sm:p-10">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-700">Inquiry Form (UI Only)</p>
          <form className="mt-5 grid gap-4">
            <label className="grid gap-2 text-sm font-medium text-slate-700">
              회사명
              <input
                type="text"
                className="rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm outline-none transition focus:border-brand-500"
                placeholder="예: ○○국밥 본점"
              />
            </label>
            <label className="grid gap-2 text-sm font-medium text-slate-700">
              담당자명
              <input
                type="text"
                className="rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm outline-none transition focus:border-brand-500"
                placeholder="예: 김담당"
              />
            </label>
            <label className="grid gap-2 text-sm font-medium text-slate-700">
              연락처
              <input
                type="text"
                className="rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm outline-none transition focus:border-brand-500"
                placeholder="예: 010-1234-5678"
              />
            </label>
            <label className="grid gap-2 text-sm font-medium text-slate-700">
              문의 내용
              <textarea
                rows={5}
                className="rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm outline-none transition focus:border-brand-500"
                placeholder="필요 품목, 월 사용량, 희망 납기, 배송 권역 등을 작성해주세요"
              />
            </label>
            <button
              type="submit"
              className="inline-flex items-center justify-center rounded-full bg-deep-950 px-6 py-3 text-sm font-semibold text-white"
            >
              문의 접수 (UI)
            </button>
          </form>
        </article>

        <article className="rounded-[2rem] bg-deep-950 p-7 text-white sm:p-10">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-200">Quick Contact</p>
          <GradientVisual
            label="Quick Contact"
            tone="sea"
            src="/images/products/ppolhangjeong-500g.jpg"
            showLabel={false}
            overlay="soft"
            className="mt-5 min-h-[180px] border-white/20"
          />
          <ul className="mt-5 space-y-3 text-sm leading-7 text-slate-100">
            <li>회사명: 유한회사 새림</li>
            <li>
              Kakao:{" "}
              <a href="https://open.kakao.com/o/pRSmEn9h" target="_blank" rel="noreferrer" className="underline">
                카카오 상담 바로가기
              </a>
            </li>
            <li>
              SmartStore:{" "}
              <a href="https://vo.la/RFDWcIg" target="_blank" rel="noreferrer" className="underline">
                스마트스토어 바로가기
              </a>
            </li>
            <li>Phone: 063-464-8681</li>
            <li>Fax: 063-464-8683</li>
            <li>Email: serim6408@naver.com</li>
          </ul>
          <p className="mt-6 text-sm leading-7 text-slate-300">
            실서비스에서는 CRM 연동, 이메일 자동 발송, 카카오 상담 연결 기능을 추가할 수 있습니다.
          </p>
        </article>
      </section>
    </div>
  );
}
