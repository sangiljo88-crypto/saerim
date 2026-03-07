import type { Metadata } from "next";

import { SectionHeading } from "@/components/ui/SectionHeading";

export const metadata: Metadata = {
  title: "위치 / 연락처",
  description: "광일건해 본사 주소, 연락처, 운영시간, 지도 정보를 확인하세요.",
};

export default function ContactPage() {
  return (
    <div className="landing-section py-10 sm:py-14">
      <section className="rounded-[2rem] border border-slate-200 bg-white p-7 shadow-soft sm:p-10">
        <SectionHeading
          eyebrow="Contact / Location"
          title="위치 및 연락처 안내"
          description="도매 상담, 제품 문의, 제휴 제안은 아래 채널로 문의해 주세요."
        />

        <div className="mt-8 grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6">
            <ul className="space-y-3 text-sm leading-7 text-slate-700 sm:text-base">
              <li>회사명: 광일건해</li>
              <li>주소: 서울시 강서구 식품산업로 100</li>
              <li>전화: 02-1234-5678</li>
              <li>이메일: hello@kwangildryfood.co.kr</li>
              <li>운영시간: 월-금 09:00 - 18:00 (주말/공휴일 휴무)</li>
            </ul>
          </div>

          <div className="rounded-3xl border border-dashed border-slate-300 bg-gradient-to-br from-slate-100 via-slate-50 to-white p-6">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">Map Placeholder</p>
            <div className="mt-4 flex min-h-[260px] items-center justify-center rounded-2xl border border-slate-200 bg-white text-sm text-slate-500">
              지도 연동 영역 (Naver Map / Kakao Map API 예정)
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
