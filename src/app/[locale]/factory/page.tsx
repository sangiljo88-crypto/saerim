import type { Metadata } from "next";
import Link from "next/link";

import { Reveal } from "@/components/ui/Reveal";
import { NextStory } from "@/components/ui/brand";
import { factoryImageAlt, listFactories } from "@/lib/content";
import { getDict } from "@/lib/i18n";
import { href, type Locale } from "@/lib/i18n/config";

export const dynamic = "force-dynamic";

type Props = { params: Promise<{ locale: Locale }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  return getDict(locale).meta.pages.factory;
}

/** FACTORY — 각 공장을 하나의 브랜드처럼 (docs/brand-system/02 §4) */
export default async function FactoryPage({ params }: Props) {
  const { locale } = await params;
  const t = getDict(locale).factory;
  const factories = listFactories(locale);

  return (
    <>
      <section className="section !pb-14">
        <div className="container-text">
          <Reveal>
            <p className="kicker">{t.kicker}</p>
            <h1 className="mt-6 whitespace-pre-line text-display text-ink-900">{t.title}</h1>
            <p className="prose-body mt-8">{t.lead}</p>
          </Reveal>
        </div>
      </section>

      <section className="pb-20 md:pb-32">
        <div className="container-grid space-y-20">
          {factories.map((factory, i) => (
            <Reveal key={factory.slug}>
              <Link
                href={href(locale, `/factory/${factory.slug}`)}
                className={`group grid items-center gap-10 lg:grid-cols-2 ${i % 2 === 1 ? "lg:[&>*:first-child]:order-2" : ""}`}
              >
                <div className="overflow-hidden rounded-2xl">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={factory.image}
                    alt={factoryImageAlt(locale, factory)}
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
                    {t.more} <span aria-hidden>→</span>
                  </span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      <NextStory locale={locale} href="/quality" title={t.nextStory} />
    </>
  );
}
