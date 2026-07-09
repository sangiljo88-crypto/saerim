import type { Metadata } from "next";
import Link from "next/link";

import { QualityFlow } from "@/components/quality/QualityFlow";
import { Reveal } from "@/components/ui/Reveal";
import { NextStory, SectionTitle } from "@/components/ui/brand";
import { listQualitySteps } from "@/lib/db/repo";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "QUALITY — 어떻게 지키는가",
  description: "입고부터 출고까지, 새림의 8단계 품질 여정을 인터랙티브로 확인하세요.",
};

/** QUALITY — 입고→출고 8단계를 인터랙티브로 경험하는 페이지 */
export default function QualityPage() {
  const steps = listQualitySteps();

  return (
    <>
      <section className="section !pb-14">
        <div className="container-text">
          <Reveal>
            <p className="kicker">Quality Journey</p>
            <h1 className="mt-6 text-display text-ink-900">
              여덟 번의 확인이
              <br />
              한 그릇의 신뢰가 됩니다.
            </h1>
            <p className="prose-body mt-8">
              원료가 공장에 도착하는 순간부터 매장에 도착할 때까지, 새림의 모든 제품은 여덟 단계를
              통과합니다. 각 단계를 눌러 관리 기준을 확인해 보세요.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="pb-20 md:pb-28">
        <div className="container-grid">
          <Reveal>
            <QualityFlow steps={steps} />
          </Reveal>
        </div>
      </section>

      <section className="section hairline-t bg-paper-warm">
        <div className="container-text">
          <SectionTitle
            kicker="Why It Matters"
            title="품질은 약속이 아니라 시스템입니다"
            lead="새림은 사람의 성실함에 기대지 않습니다. 기준과 기록이 품질을 지키게 만듭니다."
          />
          <div className="grid gap-10 sm:grid-cols-3">
            {[
              { value: "100%", label: "전 로트 검수·기록" },
              { value: "-18℃", label: "콜드체인 전 구간 유지" },
              { value: "8단계", label: "모든 제품 공통 적용" },
            ].map((stat, i) => (
              <Reveal key={stat.label} delayMs={i * 60}>
                <p className="text-5xl font-bold tracking-tight text-ink-900">{stat.value}</p>
                <p className="mt-2 text-label text-ink-400">{stat.label}</p>
              </Reveal>
            ))}
          </div>
          <Reveal>
            <p className="prose-body mt-14">
              이 여덟 단계는 새림 제품뿐 아니라 OEM으로 생산되는 파트너 브랜드의 제품에도 동일하게
              적용됩니다.{" "}
              <Link href="/oem" className="font-semibold text-ink-900 underline hover:text-accent">
                OEM 안내 보기
              </Link>
            </p>
          </Reveal>
        </div>
      </section>

      <NextStory href="/oem" label="OEM" title="당신의 브랜드도 만들 수 있다" />
    </>
  );
}
