import type { Metadata } from "next";
import Link from "next/link";

import { Downloads } from "@/components/ui/Downloads";
import { Reveal } from "@/components/ui/Reveal";
import { NextStory } from "@/components/ui/brand";
import { categoryLabel, listProductCategories, listProducts, productImageAlt } from "@/lib/content";
import { getDict } from "@/lib/i18n";
import { href, type Locale } from "@/lib/i18n/config";

export const dynamic = "force-dynamic";

type Props = {
  params: Promise<{ locale: Locale }>;
  searchParams: Promise<{ category?: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  return getDict(locale).meta.pages.products;
}

/** PRODUCT 목록 — 단순 나열이 아니라 카테고리 필터 + 제안형 카드 */
export default async function ProductsPage({ params, searchParams }: Props) {
  const { locale } = await params;
  const { category } = await searchParams;
  const t = getDict(locale).products;
  const categories = listProductCategories(locale);
  const active = category && categories.some((c) => c.key === category) ? category : undefined;
  const products = listProducts(locale, active);

  return (
    <>
      <section className="section !pb-12">
        <div className="container-grid">
          <Reveal>
            <p className="kicker">{t.kicker}</p>
            <h1 className="mt-6 text-display text-ink-900">{t.title}</h1>
            <p className="prose-body mt-6">{t.lead}</p>
            <Downloads locale={locale} className="mt-6" />
          </Reveal>

          <nav className="mt-12 flex flex-wrap gap-2" aria-label={t.filterLabel}>
            <Link
              href={href(locale, "/products")}
              className={`rounded-full px-5 py-2 text-sm font-semibold transition-colors ${
                !active ? "bg-ink-900 text-white" : "border border-line text-ink-600 hover:border-ink-400"
              }`}
            >
              {t.all}
            </Link>
            {categories.map((cat) => (
              <Link
                key={cat.key}
                href={href(locale, `/products?category=${encodeURIComponent(cat.key)}`)}
                className={`rounded-full px-5 py-2 text-sm font-semibold transition-colors ${
                  active === cat.key
                    ? "bg-ink-900 text-white"
                    : "border border-line text-ink-600 hover:border-ink-400"
                }`}
              >
                {cat.label}
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
                <Link href={href(locale, `/products/${product.slug}`)} className="group block">
                  <div className="overflow-hidden rounded-2xl">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={product.image}
                      alt={productImageAlt(locale, product)}
                      className="aspect-square w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                    />
                  </div>
                  <div className="mt-5 flex items-center gap-2">
                    <span className="kicker">{categoryLabel(locale, product.category)}</span>
                    {product.oemAvailable && (
                      <span className="rounded-full bg-trust-soft px-2.5 py-0.5 text-[11px] font-semibold text-trust">
                        {t.oemBadge}
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

          {products.length === 0 && <p className="py-20 text-center text-ink-400">{t.empty}</p>}
        </div>
      </section>

      <NextStory locale={locale} href="/factory" title={t.nextStory} />
    </>
  );
}
