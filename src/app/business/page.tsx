import type { Metadata } from "next";
import Link from "next/link";

import { Reveal } from "@/components/ui/Reveal";
import { NextStory, SectionTitle } from "@/components/ui/brand";

export const metadata: Metadata = {
  title: "BUSINESS — 무엇을 하는 회사인가",
  description: "도매 공급 · 채널 브랜드 운영 · OEM 생산 · HMR 개발. 새림의 B2B 사업 구조.",
};

const BUSINESS_AREAS = [
  {
    no: "01",
    name: "원료 도매 공급",
    en: "WHOLESALE SUPPLY",
    body: "국탕류·뒷고기류 원료를 식당·프랜차이즈·유통사에 직송합니다. 2026 상반기 기준 55개사와 거래하며 월 10~13억 규모를 안정 출고하고 있습니다.",
    href: "/products",
    cta: "제품 보기",
  },
  {
    no: "02",
    name: "채널 브랜드 운영",
    en: "CHANNEL BRANDS",
    body: "전국국밥거래소(국탕류)와 육식노트(뒷고기류)로 각 시장을 전문적으로 만납니다. 브랜드별 상품 구성과 판매 채널을 분리 운영합니다.",
    href: "/brand",
    cta: "브랜드 구조",
  },
  {
    no: "03",
    name: "OEM · PB 생산",
    en: "OEM MANUFACTURING",
    body: "하이포크 특수부위 OEM, 농협 목우촌 생산도급, 대형마트 PB — 까다로운 스펙 관리와 납기를 꾸준히 지켜왔습니다. 레시피 구현부터 표시사항 검토까지 새림 품질 체계 안에서.",
    href: "/oem",
    cta: "OEM 안내",
  },
  {
    no: "04",
    name: "HMR · 국탕 개발",
    en: "HMR DEVELOPMENT",
    body: "우사골·우잡뼈·돈두뼈를 직접 끓인 육수(농축액 무첨가)로 순댓국·곱창전골 등 국탕 HMR을 만듭니다. 숯 로스팅과 상온/냉장 레토르트로 편의점·온라인 채널에 바로 대응합니다.",
    href: "/contact?type=general",
    cta: "개발 상담",
  },
];

/** BUSINESS — 동원홈푸드 원칙: 바이어가 3초 안에 이해하는 사업 구조 */
export default function BusinessPage() {
  return (
    <>
      <section className="section">
        <div className="container-text">
          <Reveal>
            <p className="kicker">Business Structure</p>
            <h1 className="mt-6 text-display text-ink-900">
              네 개의 사업이
              <br />
              서로를 받칩니다.
            </h1>
            <p className="prose-body mt-8">
              도매가 물량을 만들고, 브랜드가 시장을 넓히고, OEM이 설비를 채우고, 개발이 다음을
              준비합니다. 새림의 B2B 구조는 단순합니다.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="pb-20 md:pb-32">
        <div className="container-grid">
          <div className="grid gap-px overflow-hidden rounded-2xl border border-line bg-line md:grid-cols-2">
            {BUSINESS_AREAS.map((area, i) => (
              <Reveal key={area.no} delayMs={i * 60} className="bg-white">
                <div className="flex h-full flex-col p-8 md:p-12">
                  <p className="kicker">{area.en}</p>
                  <h2 className="mt-4 flex items-baseline gap-3 text-h2 text-ink-900">
                    <span className="text-sm font-bold text-accent">{area.no}</span>
                    {area.name}
                  </h2>
                  <p className="mt-4 flex-1 text-sm leading-relaxed text-ink-600">{area.body}</p>
                  <Link
                    href={area.href}
                    className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-ink-900 transition-colors hover:text-accent"
                  >
                    {area.cta} <span aria-hidden>→</span>
                  </Link>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* 거래 프로세스 */}
      <section className="section hairline-t bg-paper-warm">
        <div className="container-grid">
          <SectionTitle
            kicker="How To Start"
            title="거래는 이렇게 시작됩니다"
            lead="문서보다 라인이 정확합니다. 4단계면 정식 공급까지 이어집니다."
          />
          <ol className="grid gap-8 md:grid-cols-4">
            {[
              { step: "1", name: "샘플 요청", body: "규격 협의 후 1주 내 시제품을 보내드립니다." },
              { step: "2", name: "공장 실사", body: "생산 라인·품질 시스템·인증 원본을 전면 공개합니다." },
              { step: "3", name: "시범 물량", body: "소량 발주로 납기·검수·물류를 직접 검증하십시오." },
              { step: "4", name: "정식 공급", body: "연간 단가·물량 계약으로 안정 공급을 시작합니다." },
            ].map((item, i) => (
              <Reveal key={item.step} delayMs={i * 60}>
                <li>
                  <p className="text-4xl font-bold text-line">{item.step}</p>
                  <h3 className="mt-3 text-h3 text-ink-900">{item.name}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink-600">{item.body}</p>
                </li>
              </Reveal>
            ))}
          </ol>
          <Reveal>
            <div className="mt-14 text-center">
              <Link href="/contact" className="cta-primary">
                지금 문의 시작하기
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      <NextStory href="/products" label="PRODUCT" title="무엇을 만들 수 있는가" />
    </>
  );
}
