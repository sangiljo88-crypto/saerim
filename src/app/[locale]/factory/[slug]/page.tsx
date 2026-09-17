import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { Reveal } from "@/components/ui/Reveal";
import { NextStory, SectionTitle, TrustBadge } from "@/components/ui/brand";
import { factoryImageAlt, getFactory, listFactories, listProducts, productImageAlt } from "@/lib/content";
import { fill, getDict } from "@/lib/i18n";
import { href, type Locale } from "@/lib/i18n/config";

export const dynamic = "force-dynamic";

type Props = { params: Promise<{ locale: Locale; slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  const factory = getFactory(locale, slug);
  if (!factory) return {};
  return { title: `${factory.name} — ${factory.role}`, description: factory.description };
}

/** 공장 상세 — 공장 하나가 브랜드 페이지 하나의 완성도를 갖는다 */
export default async function FactoryDetailPage({ params }: Props) {
  const { locale, slug } = await params;
  const factory = getFactory(locale, slug);
  if (!factory) notFound();

  const t = getDict(locale).factoryDetail;
  const products = listProducts(locale).filter((p) => p.factorySlug === factory.slug).slice(0, 3);
  const others = listFactories(locale).filter((f) => f.slug !== factory.slug);

  return (
    <>
      {/* 공장 Hero */}
      <section className="relative flex min-h-[60svh] items-end overflow-hidden bg-ink-950">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={factory.image}
          alt={factoryImageAlt(locale, factory)}
          className="absolute inset-0 h-full w-full object-cover opacity-50"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink-950/80 to-ink-950/20" aria-hidden />
        <div className="container-grid relative z-10 pb-16 pt-40 text-white">
          <p className="kicker !text-white/60">SAERIM FACTORY · {factory.code}</p>
          <h1 className="mt-4 text-display">{factory.name}</h1>
          <p className="mt-4 max-w-xl text-body text-white/80">“{factory.symbolSentence}”</p>
        </div>
      </section>

      <section className="section">
        <div className="container-text">
          <SectionTitle kicker={t.roleKicker} title={factory.role} />
          <Reveal>
            <p className="prose-body text-lg leading-loose">{factory.description}</p>
            <div className="mt-8 flex flex-wrap gap-2">
              {factory.certifications.map((cert) => (
                <TrustBadge key={cert}>{cert}</TrustBadge>
              ))}
            </div>
            {factory.address && <p className="mt-6 text-sm text-ink-400">{factory.address}</p>}
          </Reveal>
        </div>
      </section>

      <section className="section hairline-t bg-paper-warm">
        <div className="container-text">
          <SectionTitle kicker={t.capabilityKicker} title={t.capabilityTitle} />
          <div className="grid gap-4 sm:grid-cols-2">
            {factory.capabilities.map((capability, i) => (
              <Reveal key={capability} delayMs={i * 50}>
                <div className="flex items-center gap-4 rounded-xl border border-line bg-white p-5">
                  <span className="text-sm font-bold text-accent">{String(i + 1).padStart(2, "0")}</span>
                  <p className="text-sm font-semibold text-ink-900">{capability}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {products.length > 0 && (
        <section className="section hairline-t">
          <div className="container-grid">
            <SectionTitle
              kicker={t.madeHereKicker}
              title={fill(t.madeHereTitle, { factory: factory.name })}
            />
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
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 다른 공장 */}
      <section className="section hairline-t bg-paper-warm">
        <div className="container-grid">
          <SectionTitle kicker={t.otherKicker} title={t.otherTitle} />
          <div className="grid gap-6 sm:grid-cols-2">
            {others.map((other) => (
              <Link
                key={other.slug}
                href={href(locale, `/factory/${other.slug}`)}
                className="group rounded-2xl border border-line bg-white p-8 transition-colors hover:border-ink-400"
              >
                <p className="kicker">{other.code}</p>
                <h3 className="mt-2 text-h2 text-ink-900 group-hover:text-accent">{other.name}</h3>
                <p className="mt-2 text-sm text-ink-600">{other.role}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <NextStory locale={locale} href="/quality" title={t.nextStory} />
    </>
  );
}
