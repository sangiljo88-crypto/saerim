import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import Link from "next/link";

import { Reveal } from "@/components/ui/Reveal";
import { NextStory, SectionTitle } from "@/components/ui/brand";
import { listFeaturedProducts, listStoreLinks, productImageAlt } from "@/lib/content";
import { getDict } from "@/lib/i18n";
import { href, type Locale } from "@/lib/i18n/config";

export const dynamic = "force-dynamic";

type Props = { params: Promise<{ locale: Locale }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  return pageMetadata(locale, "/store", getDict(locale).meta.pages.store);
}

/** STORE — 도매 전 단계: 소량 구매로 품질을 먼저 경험하게 한다 */
export default async function StorePage({ params }: Props) {
  const { locale } = await params;
  const dict = getDict(locale);
  const t = dict.store;
  const links = listStoreLinks(locale);
  const products = listFeaturedProducts(locale).slice(0, 3);

  return (
    <>
      <section className="section">
        <div className="container-text">
          <Reveal>
            <p className="kicker">{t.kicker}</p>
            <h1 className="mt-6 whitespace-pre-line text-display text-ink-900">{t.title}</h1>
            <p className="prose-body mt-8">{t.lead}</p>
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
                <p className="kicker">{dict.storeKind[link.kind] ?? link.kind.toUpperCase()}</p>
                <h2 className="mt-3 text-h2 text-ink-900 transition-colors group-hover:text-accent">
                  {link.name}
                </h2>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-ink-600">{link.description}</p>
                <span className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-ink-900">
                  {dict.common.openLink} <span aria-hidden>↗</span>
                </span>
              </a>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="section hairline-t bg-paper-warm">
        <div className="container-grid">
          <SectionTitle kicker={t.startKicker} title={t.startTitle} />
          <div className="grid gap-8 sm:grid-cols-3">
            {products.map((product) => (
              <Link key={product.slug} href={href(locale, `/products/${product.slug}`)} className="group block">
                <div className="overflow-hidden rounded-2xl">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={product.image}
                    alt={productImageAlt(locale, product)}
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

      <NextStory locale={locale} href="/contact" title={t.nextStory} />
    </>
  );
}
