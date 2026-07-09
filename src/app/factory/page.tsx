import type { Metadata } from "next";
import Link from "next/link";

import { Reveal } from "@/components/ui/Reveal";
import { NextStory } from "@/components/ui/brand";
import { listFactories } from "@/lib/db/repo";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "FACTORY — 어디서 만드는가",
  description: "군산 · 김제 · 용인. 새림의 세 공장은 각각 하나의 브랜드입니다.",
};

/** FACTORY — 각 공장을 하나의 브랜드처럼 (docs/brand-system/02 §4) */
export default function FactoryPage() {
  const factories = listFactories();

  return (
    <>
      <section className="section !pb-14">
        <div className="container-text">
          <Reveal>
            <p className="kicker">Factories</p>
            <h1 className="mt-6 text-display text-ink-900">
              세 개의 공장,
              <br />
              하나의 기준.
            </h1>
            <p className="prose-body mt-8">
              새림의 공장은 생산 역량을 셋으로 나눠 운영합니다. 각 공장은 고유한 역할과 이름을 가진
              하나의 브랜드입니다.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="pb-20 md:pb-32">
        <div className="container-grid space-y-20">
          {factories.map((factory, i) => (
            <Reveal key={factory.slug}>
              <Link
                href={`/factory/${factory.slug}`}
                className={`group grid items-center gap-10 lg:grid-cols-2 ${i % 2 === 1 ? "lg:[&>*:first-child]:order-2" : ""}`}
              >
                <div className="overflow-hidden rounded-2xl">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={factory.image}
                    alt={factory.name}
                    className="aspect-video w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                  />
                </div>
                <div>
                  <p className="kicker">{factory.code}</p>
                  <h2 className="mt-4 text-h1 text-ink-900 transition-colors group-hover:text-accent">
                    {factory.name}
                  </h2>
                  <p className="mt-2 text-body font-medium text-ink-600">{factory.role}</p>
                  <p className="mt-5 text-lg italic leading-relaxed text-ink-400">
                    “{factory.symbolSentence}”
                  </p>
                  <span className="mt-7 inline-flex items-center gap-2 text-sm font-semibold text-ink-900">
                    공장 이야기 보기 <span aria-hidden>→</span>
                  </span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      <NextStory href="/quality" label="QUALITY" title="어떻게 지키는가" />
    </>
  );
}
