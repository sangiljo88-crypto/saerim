import type { Metadata } from "next";

import { SectionHeading } from "@/components/ui/SectionHeading";

export const metadata: Metadata = {
  title: "도매 문의",
  description: "식당, 유통사, 마트 바이어, 온라인 셀러를 위한 B2B 문의 페이지",
};

const targetCustomers = ["식당/프랜차이즈", "식자재 유통사", "마트 바이어", "온라인 셀러"];
const strengths = [
  "MOQ와 납기 조건 협의 가능",
  "소용량/대용량 패키지 동시 대응",
  "시즌성 선물세트 대량 출고 가능",
  "외부 마켓 입점형 상품 구조 지원",
];

export default function WholesalePage() {
  return (
    <div className="landing-section py-10 sm:py-14">
      <section className="rounded-[2rem] border border-slate-200 bg-white p-7 shadow-soft sm:p-10">
        <SectionHeading
          eyebrow="Wholesale Inquiry"
          title="비즈니스 성장을 위한 건해산물 B2B 파트너"
          description="레스토랑, 유통사, 마트, 온라인 셀러까지 유통 채널별로 최적화된 제품과 납품 구조를 제안합니다."
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
                placeholder="예: 광일유통"
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
                placeholder="필요 품목, 수량, 납기 등을 작성해주세요"
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
          <ul className="mt-5 space-y-3 text-sm leading-7 text-slate-100">
            <li>KakaoTalk: @광일건해 (placeholder)</li>
            <li>Phone: 02-1234-5678</li>
            <li>Email: b2b@kwangildryfood.co.kr</li>
          </ul>
          <p className="mt-6 text-sm leading-7 text-slate-300">
            실서비스에서는 CRM 연동, 이메일 자동 발송, 카카오 상담 연결 기능을 추가할 수 있습니다.
          </p>
        </article>
      </section>
    </div>
  );
}
