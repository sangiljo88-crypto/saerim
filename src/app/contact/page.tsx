import type { Metadata } from "next";

import { GradientVisual } from "@/components/ui/GradientVisual";
import { SectionHeading } from "@/components/ui/SectionHeading";

export const metadata: Metadata = {
  title: "위치 / 연락처",
  description: "유한회사 새림 본사 주소, 연락처, 사업자 정보를 확인하세요.",
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

        <div className="mt-8 grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
          <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6">
            <ul className="space-y-3 text-sm leading-7 text-slate-700 sm:text-base">
              <li>회사명: 유한회사 새림</li>
              <li>대표자: 최인환</li>
              <li>사업자등록번호: 481-86-00066</li>
              <li>법인등록번호: 211114-0032627</li>
              <li>주소: 전북특별자치도 군산시 옥산면 산성로 154</li>
              <li>전화: 063-464-8681</li>
              <li>팩스: 063-464-8683</li>
              <li>이메일: serim6408@naver.com</li>
              <li>운영시간: 월-금 09:00 - 18:00 (주말/공휴일 휴무)</li>
            </ul>
          </div>

          <div className="rounded-3xl border border-dashed border-slate-300 bg-gradient-to-br from-slate-100 via-slate-50 to-white p-6">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">Map Placeholder</p>
            <div className="relative mt-4 min-h-[260px] overflow-hidden rounded-2xl border border-slate-200">
              <GradientVisual
                label="유한회사 새림 위치 안내"
                tone="stone"
                src="/images/company/photo4.jpg"
                showLabel={false}
                overlay="soft"
                className="h-full min-h-[260px] rounded-none border-none"
              />
              <p className="absolute inset-x-4 bottom-4 rounded-xl bg-white/80 px-4 py-3 text-center text-sm text-slate-600 backdrop-blur">
                지도 API 연동 예정 (Naver Map / Kakao Map)
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
