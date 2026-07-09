import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { Reveal } from "@/components/ui/Reveal";
import { NextStory } from "@/components/ui/brand";
import { getNews, listNews } from "@/lib/db/repo";

export const dynamic = "force-dynamic";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const item = getNews(slug);
  if (!item) return {};
  return { title: item.title, description: item.summary };
}

/** 뉴스 상세 — 한 편의 브랜드 스토리로 읽힌다 */
export default async function NewsDetailPage({ params }: Props) {
  const { slug } = await params;
  const item = getNews(slug);
  if (!item) notFound();

  const others = listNews().filter((n) => n.slug !== item.slug).slice(0, 2);

  return (
    <>
      <article className="section">
        <div className="container-text">
          <Reveal>
            <p className="kicker">
              {item.category} · {item.publishedAt}
            </p>
            <h1 className="mt-6 text-h1 md:text-display text-ink-900">{item.title}</h1>
            <p className="prose-body mt-6 text-lg">{item.summary}</p>
          </Reveal>

          {item.coverImage && (
            <Reveal>
              <div className="mt-12 overflow-hidden rounded-2xl">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={item.coverImage} alt="" className="aspect-video w-full object-cover" />
              </div>
            </Reveal>
          )}

          <Reveal>
            <div className="mt-12 space-y-6">
              {item.body.split("\n\n").map((paragraph, i) => (
                <p key={i} className="prose-body text-lg leading-loose">
                  {paragraph}
                </p>
              ))}
            </div>
          </Reveal>
        </div>
      </article>

      {others.length > 0 && (
        <section className="section hairline-t bg-paper-warm">
          <div className="container-grid">
            <p className="kicker mb-8">다른 이야기</p>
            <div className="grid gap-8 sm:grid-cols-2">
              {others.map((other) => (
                <Link key={other.slug} href={`/news/${other.slug}`} className="group block">
                  <p className="kicker">
                    {other.category} · {other.publishedAt}
                  </p>
                  <h3 className="mt-2 text-h3 text-ink-900 transition-colors group-hover:text-accent">
                    {other.title}
                  </h3>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <NextStory href="/store" label="STORE" title="지금 바로 경험할 수 있다" />
    </>
  );
}
