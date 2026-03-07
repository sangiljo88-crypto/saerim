import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { ExternalBuyButtons } from "@/components/catalog/ExternalBuyButtons";
import { MobileStickyCta } from "@/components/catalog/MobileStickyCta";
import { ProductCard } from "@/components/catalog/ProductCard";
import { Badge } from "@/components/ui/Badge";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { GradientVisual } from "@/components/ui/GradientVisual";
import { ImageSection } from "@/components/ui/ImageSection";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { getProductBadges } from "@/lib/badges";
import {
  getAllProducts,
  getCategoryBySlug,
  getProductBySlug,
  getProductsByCategory,
} from "@/lib/catalog";
import { getProductVisualBundle } from "@/lib/visuals";

type ProductDetailPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export function generateStaticParams() {
  return getAllProducts().map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({ params }: ProductDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) {
    return {
      title: "제품 상세",
    };
  }

  return {
    title: product.name,
    description: product.shortDescription,
  };
}

export default async function ProductDetailPage({ params }: ProductDetailPageProps) {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  const category = getCategoryBySlug(product.category);
  const relatedProducts = getProductsByCategory(product.category)
    .filter((item) => item.slug !== product.slug)
    .slice(0, 3);
  const productBadges = getProductBadges(product);
  const visuals = getProductVisualBundle(product);

  return (
    <div className="landing-section pb-28 pt-10 sm:pb-14 sm:pt-14">
      <Breadcrumbs
        items={[
          { label: "홈", href: "/" },
          { label: "카테고리", href: "/categories" },
          category ? { label: category.name, href: `/categories/${category.slug}` } : { label: "카테고리" },
          { label: product.name },
        ]}
      />

      <Reveal>
        <section className="premium-shell grid gap-8 p-7 sm:p-10 lg:grid-cols-[1.08fr_0.92fr]">
          <div>
            <p className="premium-kicker">Product Landing</p>
            <h1 className="mt-3 font-display text-4xl font-extrabold text-deep-950 sm:text-5xl">{product.name}</h1>
            <p className="mt-5 max-w-2xl text-sm leading-7 text-slate-700 sm:text-base">{product.shortDescription}</p>
            <p className="mt-4 text-sm leading-7 text-slate-600">{product.longDescription}</p>

            <div className="mt-6 flex flex-wrap gap-2">
              {productBadges.map((badge) => (
                <Badge key={badge} tone={badge === "인기상품" ? "dark" : "accent"}>
                  {badge}
                </Badge>
              ))}
            </div>

            <ul className="mt-6 grid gap-3 text-sm text-slate-700 sm:grid-cols-2">
              {product.keySellingPoints.map((point) => (
                <li key={point} className="rounded-2xl border border-slate-200 bg-white px-4 py-3">
                  {point}
                </li>
              ))}
            </ul>

            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <a href={product.smartstoreUrl} target="_blank" rel="noreferrer" className="cta-primary">
                Buy on SmartStore
              </a>
              <a href={product.gmarketUrl} target="_blank" rel="noreferrer" className="cta-secondary">
                Buy on Gmarket
              </a>
            </div>
          </div>

          <GradientVisual label={product.name} tone={product.image} className="min-h-[340px]" />
        </section>
      </Reveal>

      <section className="mt-14">
        <Reveal>
          <ImageSection
            eyebrow="Product Image System"
            title="대표 이미지 + 콘텐츠 이미지 슬롯"
            description="각 제품은 히어로 1장과 콘텐츠 2~4장 슬롯을 지원합니다. 현재 이미지가 없어도 플레이스홀더로 프리미엄 레이아웃을 유지합니다."
            hero={visuals.hero}
            gallery={visuals.gallery}
          />
        </Reveal>
      </section>

      <section className="mt-14 grid gap-6 lg:grid-cols-2">
        <Reveal>
          <article className="glass-card p-7 sm:p-8">
            <SectionHeading eyebrow="Origin / Sourcing" title="원산지 · 소싱" description={product.origin} />
            <p className="mt-4 text-sm leading-7 text-slate-700">산지 선정 기준과 수급 안정성을 바탕으로 계절 편차를 최소화합니다.</p>
          </article>
        </Reveal>
        <Reveal delayMs={80}>
          <article className="glass-card p-7 sm:p-8">
            <SectionHeading eyebrow="Processing / Quality" title="가공 · 품질 관리" description={product.processing} />
            <p className="mt-4 text-sm leading-7 text-slate-700">선별-검수-포장 단계를 분리 운영해 제품 오차를 줄이고 출고 품질을 안정화합니다.</p>
          </article>
        </Reveal>
      </section>

      <section className="mt-14">
        <Reveal>
          <SectionHeading
            eyebrow="Why This Product"
            title="왜 이 제품을 선택해야 하는가"
            description="구매 전 핵심 의사결정 포인트를 한 화면에서 확인할 수 있도록 설계했습니다."
          />
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            <article className="glass-card p-6">
              <p className="premium-kicker">Consistency</p>
              <p className="mt-3 text-sm leading-7 text-slate-700">규격화된 선별로 조리 결과의 편차를 줄여 메뉴 운영의 안정성을 높입니다.</p>
            </article>
            <article className="glass-card p-6">
              <p className="premium-kicker">Efficiency</p>
              <p className="mt-3 text-sm leading-7 text-slate-700">사용 목적에 맞는 패키지와 상품 구성으로 조리 및 재고 운영 효율을 개선합니다.</p>
            </article>
            <article className="glass-card p-6">
              <p className="premium-kicker">Scalability</p>
              <p className="mt-3 text-sm leading-7 text-slate-700">소매 판매와 도매 공급을 동시에 고려한 구조로 채널 확장에 유리합니다.</p>
            </article>
          </div>
        </Reveal>
      </section>

      <section className="mt-14 grid gap-6 lg:grid-cols-2">
        <Reveal>
          <article className="glass-card p-7 sm:p-8">
            <SectionHeading eyebrow="Recommended Usage" title="추천 사용처" description={product.usage} />
          </article>
        </Reveal>
        <Reveal delayMs={80}>
          <article className="glass-card p-7 sm:p-8">
            <SectionHeading
              eyebrow="Packaging / Shipping"
              title="포장 · 배송 정보"
              description={`${product.packageInfo} / ${product.shippingInfo}`}
            />
          </article>
        </Reveal>
      </section>

      <section className="mt-14">
        <Reveal>
          <div className="rounded-[2rem] bg-deep-950 p-8 text-white sm:p-10">
            <p className="premium-kicker text-brand-200">CTA Area</p>
            <h2 className="mt-3 font-display text-3xl font-bold sm:text-4xl">지금 구매하거나 도매 상담을 시작해보세요</h2>
            <p className="mt-4 max-w-3xl text-sm leading-7 text-slate-200 sm:text-base">
              외부 마켓 구매와 B2B 문의를 동시에 제공합니다. 향후 결제 연동/API 연동으로 확장하기 쉬운 구조입니다.
            </p>
            <ExternalBuyButtons
              smartstoreUrl={product.smartstoreUrl}
              gmarketUrl={product.gmarketUrl}
              wholesaleHref={`/wholesale?product=${product.slug}`}
              className="mt-7"
            />
          </div>
        </Reveal>
      </section>

      <section className="mt-14">
        <Reveal>
          <SectionHeading eyebrow="More In Category" title="같은 카테고리의 다른 제품" />
          <div className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {relatedProducts.map((item) => (
              <ProductCard key={item.id} product={item} />
            ))}
          </div>
          <div className="mt-8">
            <Link href={category ? `/categories/${category.slug}` : "/categories"} className="cta-secondary">
              카테고리로 돌아가기
            </Link>
          </div>
        </Reveal>
      </section>

      <MobileStickyCta
        smartstoreUrl={product.smartstoreUrl}
        gmarketUrl={product.gmarketUrl}
        wholesaleHref={`/wholesale?product=${product.slug}`}
      />
    </div>
  );
}
