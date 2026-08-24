import type { Metadata } from "next";
import Link from "next/link";

import { Reveal } from "@/components/ui/Reveal";
import { NextStory } from "@/components/ui/brand";
import { listNews } from "@/lib/content";
import { getDict } from "@/lib/i18n";
import { href, type Locale } from "@/lib/i18n/config";

export const dynamic = "force-dynamic";

type Props = { params: Promise<{ locale: Locale }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  return getDict(locale).meta.pages.news;
}

/** NEWS — 게시판이 아니라 브랜드 스토리 피드 */
export default async function NewsPage({ params }: Props) {
  const { locale } = await params;
  const dict = getDict(locale);
  const t = dict.news;
  const items = listNews(locale);
  const [first, ...rest] = items;

  return (
    <>
      <section className="section !pb-14">
        <div className="container-text">
          <Reveal>
            <p className="kicker">{t.kicker}</p>
            <h1 className="mt-6 whitespace-pre-line text-display text-ink-900">{t.title}</h1>
          </Reveal>
        </div>
      </section>

      <section className="pb-20 md:pb-32">
        <div className="container-grid">
          {first && (
            <Reveal>
              <Link href={href(locale, `/news/${first.slug}`)} className="group grid items-center gap-10 lg:grid-cols-2">
                <div className="overflow-hidden rounded-2xl">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={first.coverImage}
                    alt=""
                    className="aspect-video w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                  />
                </div>
                <div>
                  <p className="kicker">
                    {first.category} · {first.publishedAt}
                  </p>
                  <h2 className="mt-4 text-h1 text-ink-900 transition-colors group-hover:text-accent">
                    {first.title}
                  </h2>
                  <p className="prose-body mt-4">{first.summary}</p>
                  <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-ink-900">
                    {dict.common.readMore} <span aria-hidden>→</span>
                  </span>
                </div>
              </Link>
            </Reveal>
          )}

          {rest.length > 0 && (
            <div className="mt-20 grid gap-x-8 gap-y-14 border-t border-line pt-16 sm:grid-cols-2 lg:grid-cols-3">
              {rest.map((item, i) => (
                <Reveal key={item.slug} delayMs={(i % 3) * 60}>
                  <Link href={href(locale, `/news/${item.slug}`)} className="group block">
                    <div className="overflow-hidden rounded-2xl">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={item.coverImage}
                        alt=""
                        className="aspect-video w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                      />
                    </div>
                    <p className="kicker mt-5">
                      {item.category} · {item.publishedAt}
                    </p>
                    <h3 className="mt-2 text-h3 text-ink-900 transition-colors group-hover:text-accent">
                      {item.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-ink-600">{item.summary}</p>
                  </Link>
                </Reveal>
              ))}
            </div>
          )}

          {items.length === 0 && <p className="py-20 text-center text-ink-400">{t.empty}</p>}
        </div>
      </section>

      <NextStory locale={locale} href="/store" title={t.nextStory} />
    </>
  );
}
