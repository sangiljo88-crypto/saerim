import type { Metadata } from "next";
import Link from "next/link";

import { Reveal } from "@/components/ui/Reveal";
import { NextStory, SectionTitle } from "@/components/ui/brand";
import { listFeaturedProducts, listStoreLinks } from "@/lib/db/repo";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "STORE — 지금 바로 경험할 수 있다",
  description: "새림의 제품을 소량으로 먼저 경험해 보세요. 스마트스토어·카카오 채널 안내.",
};

const KIND_LABEL: Record<string, string> = {
  smartstore: "SMARTSTORE",
  kakao: "KAKAO",
  store: "STORE",
};

/** STORE — 도매 전 단계: 소량 구매로 품질을 먼저 경험하게 한다 */
export default function StorePage() {
  const links = listStoreLinks();
  const products = listFeaturedProducts().slice(0, 3);

  return (
    <>
      <section className="section">
        <div className="container-text">
          <Reveal>
            <p className="kicker">Store</p>
            <h1 className="mt-6 text-display text-ink-900">
              도매 계약 전에,
              <br />
              먼저 드셔보세요.
            </h1>
            <p className="prose-body mt-8">
              새림은 품질을 말로 설명하지 않습니다. 스마트스토어에서 소량으로 주문해 매장 메뉴에
              직접 올려보세요. 그 다음의 대화가 도매 상담입니다.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="pb-20 md:pb-32">
        <div className="container-grid grid gap-6 md:grid-cols-2">
          {links.map((link, i) => (
            <Reveal key={link.id} delayMs={i * 80}>
              <a
                href={link.url}
                target="_blank"
                rel="noreferrer"
                className="group flex h-full flex-col rounded-2xl border border-line p-8 transition-colors hover:border-ink-400 md:p-10"
              >
                <p className="kicker">{KIND_LABEL[link.kind] ?? link.kind.toUpperCase()}</p>
                <h2 className="mt-3 text-h2 text-ink-900 transition-colors group-hover:text-accent">
                  {link.name}
                </h2>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-ink-600">{link.description}</p>
                <span className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-ink-900">
                  바로가기 <span aria-hidden>↗</span>
                </span>
              </a>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="section hairline-t bg-paper-warm">
        <div className="container-grid">
          <SectionTitle kicker="Start With These" title="처음이라면 이 품목부터" />
          <div className="grid gap-8 sm:grid-cols-3">
            {products.map((product) => (
              <Link key={product.slug} href={`/products/${product.slug}`} className="group block">
                <div className="overflow-hidden rounded-2xl">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={product.image}
                    alt={product.name}
                    className="aspect-square w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                  />
                </div>
                <h3 className="mt-4 text-h3 text-ink-900 group-hover:text-accent">{product.name}</h3>
                <p className="mt-1 text-sm text-ink-600">{product.summary}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <NextStory href="/contact" label="CONTACT" title="이제 대화를 시작하자" />
    </>
  );
}
