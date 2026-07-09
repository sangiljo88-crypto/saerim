import type { Metadata } from "next";
import Link from "next/link";

import { Reveal } from "@/components/ui/Reveal";
import { NextStory } from "@/components/ui/brand";
import { listProductCategories, listProducts } from "@/lib/db/repo";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "PRODUCT — 제품",
  description: "국탕류·뒷고기류 전 제품. 모든 제품은 스토리·공정·규격·활용을 갖춘 하나의 제안입니다.",
};

/** PRODUCT 목록 — 단순 나열이 아니라 카테고리 필터 + 제안형 카드 */
export default async function ProductsPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>;
}) {
  const { category } = await searchParams;
  const categories = listProductCategories();
  const active = category && categories.includes(category) ? category : undefined;
  const products = listProducts(active);

  return (
    <>
      <section className="section !pb-12">
        <div className="container-grid">
          <Reveal>
            <p className="kicker">Products</p>
            <h1 className="mt-6 text-display text-ink-900">제품</h1>
            <p className="prose-body mt-6">
              새림의 제품은 단순한 품목이 아니라 매장 운영에 대한 제안입니다. 카드를 열면 스토리,
              공정, 규격, 활용, OEM 가능 여부까지 확인할 수 있습니다.
            </p>
          </Reveal>

          <nav className="mt-12 flex flex-wrap gap-2" aria-label="카테고리 필터">
            <Link
              href="/products"
              className={`rounded-full px-5 py-2 text-sm font-semibold transition-colors ${
                !active ? "bg-ink-900 text-white" : "border border-line text-ink-600 hover:border-ink-400"
              }`}
            >
              전체
            </Link>
            {categories.map((cat) => (
              <Link
                key={cat}
                href={`/products?category=${encodeURIComponent(cat)}`}
                className={`rounded-full px-5 py-2 text-sm font-semibold transition-colors ${
                  active === cat
                    ? "bg-ink-900 text-white"
                    : "border border-line text-ink-600 hover:border-ink-400"
                }`}
              >
                {cat}
              </Link>
            ))}
          </nav>
        </div>
      </section>

      <section className="pb-20 md:pb-32">
        <div className="container-grid">
          <div className="grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
            {products.map((product, i) => (
              <Reveal key={product.slug} delayMs={(i % 3) * 60}>
                <Link href={`/products/${product.slug}`} className="group block">
                  <div className="overflow-hidden rounded-2xl">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={product.image}
                      alt={product.name}
                      className="aspect-square w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                    />
                  </div>
                  <div className="mt-5 flex items-center gap-2">
                    <span className="kicker">{product.category}</span>
                    {product.oemAvailable && (
                      <span className="rounded-full bg-trust-soft px-2.5 py-0.5 text-[11px] font-semibold text-trust">
                        OEM 가능
                      </span>
                    )}
                  </div>
                  <h2 className="mt-2 text-h3 text-ink-900 transition-colors group-hover:text-accent">
                    {product.name}
                  </h2>
                  <p className="mt-2 text-sm leading-relaxed text-ink-600">{product.summary}</p>
                </Link>
              </Reveal>
            ))}
          </div>

          {products.length === 0 && (
            <p className="py-20 text-center text-ink-400">해당 카테고리에 등록된 제품이 없습니다.</p>
          )}
        </div>
      </section>

      <NextStory href="/factory" label="FACTORY" title="어디서 만드는가" />
    </>
  );
}
