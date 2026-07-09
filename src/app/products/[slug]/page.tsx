import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { Reveal } from "@/components/ui/Reveal";
import { NextStory, SectionTitle, TrustBadge } from "@/components/ui/brand";
import { getFactory, getProduct, listBrands, listProducts } from "@/lib/db/repo";

export const dynamic = "force-dynamic";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) return {};
  return { title: product.name, description: product.summary };
}

/**
 * 제품 상세 — 항상 같은 스토리 순서로 노출한다. (docs/brand-system/04 §3)
 * 스토리 → 대표 특징 → 생산공정 → 포장규격 → 활용사례 → OEM → 구매/문의
 */
export default async function ProductDetailPage({ params }: Props) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) notFound();

  const factory = product.factorySlug ? getFactory(product.factorySlug) : null;
  const brand = listBrands().find((b) => b.slug === product.brandSlug);
  const related = listProducts(product.category)
    .filter((p) => p.slug !== product.slug)
    .slice(0, 3);

  return (
    <>
      {/* 헤더 */}
      <section className="section !pb-14">
        <div className="container-grid grid items-center gap-12 lg:grid-cols-2">
          <Reveal>
            <p className="kicker">
              {brand ? `${brand.name} by 새림` : "새림"} · {product.category}
            </p>
            <h1 className="mt-5 text-[clamp(2rem,3.5vw,3rem)] font-bold leading-[1.15] text-ink-900">
              {product.name}
            </h1>
            <p className="prose-body mt-6">{product.summary}</p>
            <div className="mt-8 flex flex-wrap gap-2">
              <TrustBadge>HACCP 공정</TrustBadge>
              {factory && <TrustBadge>{factory.name} 생산</TrustBadge>}
              {product.oemAvailable && <TrustBadge>OEM 가능</TrustBadge>}
            </div>
          </Reveal>
          <Reveal delayMs={100}>
            <div className="overflow-hidden rounded-2xl">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={product.image} alt={product.name} className="aspect-square w-full object-cover" />
            </div>
          </Reveal>
        </div>
      </section>

      {/* 1. 스토리 */}
      <section className="section hairline-t">
        <div className="container-text">
          <SectionTitle kicker="01 · Story" title="이 제품이 존재하는 이유" />
          <Reveal>
            <p className="prose-body text-lg leading-loose">{product.story}</p>
          </Reveal>
        </div>
      </section>

      {/* 2. 대표 특징 */}
      <section className="section hairline-t bg-paper-warm">
        <div className="container-text">
          <SectionTitle kicker="02 · Features" title="대표 특징" />
          <div className="grid gap-6 sm:grid-cols-3">
            {product.features.map((feature, i) => (
              <Reveal key={feature} delayMs={i * 60}>
                <div className="rounded-xl border border-line bg-white p-6">
                  <p className="text-sm font-semibold text-ink-900">{feature}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* 3. 생산공정 */}
      <section className="section hairline-t">
        <div className="container-text">
          <SectionTitle kicker="03 · Process" title="생산 공정" />
          <Reveal>
            <ol className="flex flex-wrap items-center gap-y-3 text-sm font-medium text-ink-600">
              {product.process.split("→").map((step, i, all) => (
                <li key={i} className="flex items-center">
                  <span className="rounded-full border border-line px-4 py-2">{step.trim()}</span>
                  {i < all.length - 1 && (
                    <span aria-hidden className="px-2 text-ink-400">
                      →
                    </span>
                  )}
                </li>
              ))}
            </ol>
            <p className="mt-6 text-sm text-ink-400">
              전 공정은 <Link href="/quality" className="underline hover:text-ink-900">새림 8단계 품질 여정</Link>을 따릅니다.
            </p>
          </Reveal>
        </div>
      </section>

      {/* 4. 포장규격 · 5. 활용사례 */}
      <section className="section hairline-t bg-paper-warm">
        <div className="container-text grid gap-14 md:grid-cols-2">
          <Reveal>
            <SectionTitle kicker="04 · Packaging" title="포장 규격" />
            <p className="prose-body">{product.packaging}</p>
          </Reveal>
          <Reveal delayMs={80}>
            <SectionTitle kicker="05 · Use Cases" title="활용 사례" />
            <ul className="space-y-3">
              {product.useCases.map((useCase) => (
                <li key={useCase} className="flex items-start gap-3 text-body text-ink-600">
                  <span aria-hidden className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                  {useCase}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      {/* 6. OEM · 7. 구매/문의 */}
      <section className="section hairline-t">
        <div className="container-text text-center">
          <Reveal>
            <p className="kicker">06 · OEM {product.oemAvailable ? "Available" : "—"} / 07 · Order</p>
            <h2 className="mt-5 text-h1 text-ink-900">
              {product.oemAvailable
                ? "이 제품, 당신의 브랜드로도 만들 수 있습니다"
                : "지금 바로 주문하거나 상담을 시작하세요"}
            </h2>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
              {product.storeUrl && (
                <a href={product.storeUrl} target="_blank" rel="noreferrer" className="cta-primary">
                  스마트스토어 구매
                </a>
              )}
              <Link href={`/contact?product=${product.slug}`} className="cta-secondary">
                도매 문의
              </Link>
              {product.oemAvailable && (
                <Link href={`/contact?type=oem&product=${product.slug}`} className="cta-secondary">
                  OEM 상담
                </Link>
              )}
            </div>
          </Reveal>
        </div>
      </section>

      {/* 같은 카테고리 */}
      {related.length > 0 && (
        <section className="section hairline-t bg-paper-warm">
          <div className="container-grid">
            <SectionTitle kicker="More" title={`${product.category}의 다른 제품`} />
            <div className="grid gap-8 sm:grid-cols-3">
              {related.map((item) => (
                <Link key={item.slug} href={`/products/${item.slug}`} className="group block">
                  <div className="overflow-hidden rounded-2xl">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={item.image}
                      alt={item.name}
                      className="aspect-square w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                    />
                  </div>
                  <h3 className="mt-4 text-h3 text-ink-900 group-hover:text-accent">{item.name}</h3>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <NextStory href="/factory" label="FACTORY" title="어디서 만드는가" />
    </>
  );
}
