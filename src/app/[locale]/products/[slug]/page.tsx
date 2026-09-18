import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import Link from "next/link";
import { notFound } from "next/navigation";

import { JsonLd } from "@/components/seo/JsonLd";
import { Faq } from "@/components/ui/Faq";
import { Reveal } from "@/components/ui/Reveal";
import { NextStory, SectionTitle, TrustBadge } from "@/components/ui/brand";
import { categoryLabel, getFactory, getProduct, listBrands, listProducts, productImageAlt } from "@/lib/content";
import { fill, getDict } from "@/lib/i18n";
import { href, type Locale } from "@/lib/i18n/config";

export const dynamic = "force-dynamic";

type Props = { params: Promise<{ locale: Locale; slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  const product = getProduct(locale, slug);
  if (!product) return {};
  // 영어는 바이어 검색어를 제목에 덧붙인다: "{name} | Korean pork by-product supplier | SAERIM Co., Ltd."
  const suffix = getDict(locale).meta.productTitleSuffix;
  return pageMetadata(locale, `/products/${slug}`, { title: suffix ? `${product.name} | ${suffix}` : product.name, description: product.summary, image: product.image });
}

/**
 * 제품 상세 — 항상 같은 스토리 순서로 노출한다. (docs/brand-system/04 §3)
 * 스토리 → 대표 특징 → 생산공정 → 포장규격 → 활용사례 → OEM → 구매/문의
 */
export default async function ProductDetailPage({ params }: Props) {
  const { locale, slug } = await params;
  const product = getProduct(locale, slug);
  if (!product) notFound();

  const dict = getDict(locale);
  const t = dict.productDetail;
  const factory = product.factorySlug ? getFactory(locale, product.factorySlug) : null;
  const brand = listBrands(locale).find((b) => b.slug === product.brandSlug);
  const category = categoryLabel(locale, product.category);
  const related = listProducts(locale, product.category)
    .filter((p) => p.slug !== product.slug)
    .slice(0, 3);

  // 규격표 — 값이 비어 있으면 빈 칸 대신 "문의 시 안내"를 보여준다
  const specRows = [
    { label: t.specLabels.netWeight, value: product.netWeight },
    { label: t.specLabels.packaging, value: product.packaging },
    { label: t.specLabels.boxQty, value: product.boxQty },
    { label: t.specLabels.storage, value: product.storage },
    { label: t.specLabels.shelfLife, value: product.shelfLife },
    { label: t.specLabels.ingredients, value: product.ingredients },
    { label: t.specLabels.origin, value: product.origin },
    { label: t.specLabels.hsCode, value: product.hsCode },
  ];

  return (
    <>
      {/* 헤더 */}
      <section className="section !pb-14">
        <div className="container-grid grid items-center gap-12 lg:grid-cols-2">
          <Reveal>
            <p className="kicker">
              {brand ? `${brand.name} ${dict.brand.subSuffix}` : dict.common.companyShort} · {category}
            </p>
            <h1 className="mt-5 text-[clamp(2rem,3.5vw,3rem)] font-bold leading-[1.15] text-ink-900">
              {product.name}
            </h1>
            <p className="prose-body mt-6">{product.summary}</p>
            <div className="mt-8 flex flex-wrap gap-2">
              <TrustBadge>{t.haccpBadge}</TrustBadge>
              {factory && <TrustBadge>{fill(t.producedAt, { factory: factory.name })}</TrustBadge>}
              {product.oemAvailable && <TrustBadge>{t.oemBadge}</TrustBadge>}
            </div>
          </Reveal>
          <Reveal delayMs={100}>
            <div className="overflow-hidden rounded-2xl">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={product.image} alt={productImageAlt(locale, product)} className="aspect-square w-full object-cover" />
            </div>
          </Reveal>
        </div>
      </section>

      {/* 1. 스토리 */}
      <section className="section hairline-t">
        <div className="container-text">
          <SectionTitle kicker={t.storyKicker} title={t.storyTitle} />
          <Reveal>
            <p className="prose-body text-lg leading-loose">{product.story}</p>
          </Reveal>
        </div>
      </section>

      {/* 2. 대표 특징 */}
      <section className="section hairline-t bg-paper-warm">
        <div className="container-text">
          <SectionTitle kicker={t.featureKicker} title={t.featureTitle} />
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
          <SectionTitle kicker={t.processKicker} title={t.processTitle} />
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
              {t.processNote.before}
              <Link href={href(locale, "/quality")} className="underline hover:text-ink-900">
                {t.processNote.link}
              </Link>
              {t.processNote.after}
            </p>
          </Reveal>
        </div>
      </section>

      {/* 4. 포장규격 · 5. 활용사례 */}
      <section className="section hairline-t bg-paper-warm">
        <div className="container-text grid gap-14 md:grid-cols-2">
          <Reveal>
            <SectionTitle kicker={t.packagingKicker} title={t.specTitle} />
            <table className="w-full text-left text-sm">
              <tbody className="divide-y divide-line border-y border-line">
                {specRows.map((row) => (
                  <tr key={row.label}>
                    <th scope="row" className="w-32 py-3 pr-4 align-top font-semibold text-ink-900">
                      {row.label}
                    </th>
                    <td className={`py-3 align-top leading-relaxed ${row.value ? "text-ink-600" : "text-ink-400"}`}>
                      {row.value || t.notFilled}
                    </td>
                  </tr>
                ))}
                <tr>
                  <th scope="row" className="w-32 py-3 pr-4 align-top font-semibold text-ink-900">
                    {t.specLabels.specSheet}
                  </th>
                  <td className="py-3 align-top text-ink-400">
                    {product.specSheetUrl ? (
                      <a href={product.specSheetUrl} className="font-semibold text-ink-900 underline hover:text-accent">
                        {t.specSheetCta}
                      </a>
                    ) : (
                      t.notFilled
                    )}
                  </td>
                </tr>
              </tbody>
            </table>
          </Reveal>
          <Reveal delayMs={80}>
            <SectionTitle kicker={t.useCaseKicker} title={t.useCaseTitle} />
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

      {/* FAQ — 모든 제품 공통 */}
      <section className="section hairline-t">
        <div className="container-text">
          <SectionTitle kicker={t.faqKicker} title={t.faqTitle} />
          <Faq items={dict.faq.product} />
        </div>
      </section>

      {/* 6. OEM · 7. 구매/문의 */}
      <section className="section hairline-t">
        <div className="container-text text-center">
          <Reveal>
            <p className="kicker">{fill(t.orderKicker, { oem: product.oemAvailable ? "Available" : "—" })}</p>
            <h2 className="mt-5 text-h1 text-ink-900">
              {product.oemAvailable ? t.orderTitleOem : t.orderTitlePlain}
            </h2>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
              {product.storeUrl && (
                <a href={product.storeUrl} target="_blank" rel="noreferrer" className="cta-primary">
                  {t.storeCta}
                </a>
              )}
              <Link href={href(locale, `/contact?product=${product.slug}`)} className="cta-secondary">
                {t.wholesaleCta}
              </Link>
              {product.oemAvailable && (
                <Link
                  href={href(locale, `/contact?type=oem&product=${product.slug}`)}
                  className="cta-secondary"
                >
                  {t.oemCta}
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
            <SectionTitle kicker={t.relatedKicker} title={fill(t.relatedTitle, { category })} />
            <div className="grid gap-8 sm:grid-cols-3">
              {related.map((item) => (
                <Link key={item.slug} href={href(locale, `/products/${item.slug}`)} className="group block">
                  <div className="overflow-hidden rounded-2xl">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={item.image}
                      alt={productImageAlt(locale, item)}
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

      <NextStory locale={locale} href="/factory" title={t.nextStory} />

      {/* Product 구조화 데이터 — 가격이 확정되지 않아 offers는 싣지 않는다 */}
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Product",
          name: product.name,
          description: product.summary,
          image: `https://www.saerim.kr${product.image}`,
          url: `https://www.saerim.kr${href(locale, `/products/${product.slug}`)}`,
          ...(brand ? { brand: { "@type": "Brand", name: brand.name } } : {}),
          manufacturer: { "@type": "Organization", name: "SAERIM Co., Ltd." },
          category,
          countryOfOrigin: "KR",
          additionalProperty: [
            { "@type": "PropertyValue", name: "Certification", value: "HACCP" },
            ...(product.storage ? [{ "@type": "PropertyValue", name: "Storage", value: product.storage }] : []),
            ...(product.hsCode ? [{ "@type": "PropertyValue", name: "HS code", value: product.hsCode }] : []),
          ],
        }}
      />
    </>
  );
}
