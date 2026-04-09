import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { ProductCard } from "@/components/catalog/ProductCard";
import { Badge } from "@/components/ui/Badge";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { GradientVisual } from "@/components/ui/GradientVisual";
import { ImageSection } from "@/components/ui/ImageSection";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import {
  getAllCategories,
  getCategoryBySlug,
  getProductsByCategory,
} from "@/lib/catalog";
import { getCategoryVisualBundle, getProductPrimaryImage } from "@/lib/visuals";

type CategoryDetailPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export function generateStaticParams() {
  return getAllCategories().map((category) => ({ slug: category.slug }));
}

export async function generateMetadata({ params }: CategoryDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const category = getCategoryBySlug(slug);

  if (!category) {
    return {
      title: "카테고리",
    };
  }

  return {
    title: `${category.name} 카테고리`,
    description: category.shortDescription,
  };
}

export default async function CategoryDetailPage({ params }: CategoryDetailPageProps) {
  const { slug } = await params;
  const category = getCategoryBySlug(slug);

  if (!category) {
    notFound();
  }

  const categoryProducts = getProductsByCategory(category.slug);
  const featuredProducts = categoryProducts.filter((product) => product.featured).slice(0, 3);
  const heroProduct = (featuredProducts[0] ?? categoryProducts[0]) || null;
  const heroProductImage = heroProduct ? getProductPrimaryImage(heroProduct) : undefined;
  const visuals = getCategoryVisualBundle(category);

  return (
    <div className="landing-section py-10 sm:py-14">
      <Breadcrumbs
        items={[
          { label: "홈", href: "/" },
          { label: "카테고리", href: "/categories" },
          { label: category.name },
        ]}
      />

      <Reveal>
        <section className="premium-shell grid gap-7 p-7 sm:p-10 lg:grid-cols-[1.12fr_0.88fr]">
          <div>
            <p className="premium-kicker">Category Sales Landing</p>
            <h1 className="mt-3 font-display text-4xl font-extrabold text-deep-950 sm:text-5xl">{category.name}</h1>
            <p className="mt-5 max-w-2xl text-sm leading-7 text-slate-600 sm:text-base">{category.heroTagline}</p>
            <p className="mt-4 text-sm leading-7 text-slate-700">{category.intro}</p>
            <div className="mt-6 flex flex-wrap gap-2">
              {category.highlights.map((item) => (
                <Badge key={item}>{item}</Badge>
              ))}
              <Badge>산지직송</Badge>
              <Badge>도매가능</Badge>
            </div>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <Link href="#category-products" className="cta-primary">
                상품 라인업 보기
              </Link>
              <Link href="/wholesale" className="cta-secondary">
                도매 문의하기
              </Link>
            </div>
          </div>
          <GradientVisual
            label={`${category.name} Category`}
            tone={category.tone}
            src={visuals.hero.src}
            showLabel={false}
            overlay="soft"
            loading="eager"
            className="min-h-[300px]"
          />
        </section>
      </Reveal>

      <section className="mt-14">
        <Reveal>
          <ImageSection
            eyebrow="Category Visual System"
            title={`${category.name} 비주얼 아카이브`}
            description="대표 이미지와 추가 콘텐츠 슬롯은 AI 생성 이미지를 적용해도 비율과 간격이 동일하게 유지되도록 설계했습니다."
            hero={visuals.hero}
            gallery={visuals.gallery}
          />
        </Reveal>
      </section>

      <section className="mt-14 grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
        <Reveal>
          <article className="glass-card p-7 sm:p-8">
            <SectionHeading eyebrow="Why This Category Matters" title={`${category.name} 카테고리가 중요한 이유`} description={category.whyItMatters} />
            <ul className="mt-5 space-y-3 text-sm leading-7 text-slate-700">
              <li className="rounded-2xl border border-slate-200 bg-white p-4">메뉴 품질 편차를 줄이는 표준화된 원물 관리</li>
              <li className="rounded-2xl border border-slate-200 bg-white p-4">소매/도매 채널 동시 운영이 가능한 패키지 구조</li>
              <li className="rounded-2xl border border-slate-200 bg-white p-4">외부 마켓 전개와 B2B 납품을 함께 고려한 상품 구성</li>
            </ul>
          </article>
        </Reveal>
        <Reveal delayMs={90}>
          <article className="glass-card p-7 sm:p-8">
            <p className="premium-kicker">Recommended Buyers</p>
            <ul className="mt-4 space-y-3 text-sm leading-7 text-slate-700">
              <li>식당/프랜차이즈의 정기 소싱 담당</li>
              <li>마트/온라인몰의 카테고리 바이어</li>
              <li>시즌성 프로모션을 운영하는 유통팀</li>
              <li>도매 공급 파트너를 찾는 온라인 셀러</li>
            </ul>
          </article>
        </Reveal>
      </section>

      <section id="category-products" className="mt-14">
        <Reveal>
          <SectionHeading
            eyebrow="Category Product Grid"
            title={`${category.name} 전체 라인업`}
            description="제품별 랜딩 페이지로 연결되는 구조로, 카테고리 단계에서도 구매 전환 동선을 유지합니다."
          />
          <div className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {categoryProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </Reveal>
      </section>

      {heroProduct ? (
        <section className="mt-14">
          <Reveal>
            <div className="rounded-[2rem] bg-deep-950 p-7 text-white sm:p-10">
              <p className="premium-kicker text-brand-200">Featured In Category</p>
              <div className="mt-4 grid gap-6 lg:grid-cols-[1.08fr_0.92fr] lg:items-center">
                <div>
                  <h2 className="font-display text-3xl font-bold sm:text-4xl">{heroProduct.name}</h2>
                  <p className="mt-4 text-sm leading-7 text-slate-200 sm:text-base">{heroProduct.longDescription}</p>
                  <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                    <Link href={`/products/${heroProduct.slug}`} className="cta-primary bg-white text-deep-950 hover:bg-slate-100">
                      상세 페이지 보기
                    </Link>
                    <Link href="/wholesale" className="cta-secondary border-white/50 bg-transparent text-white hover:bg-white/10">
                      도매 상담 연결
                    </Link>
                  </div>
                </div>
                <GradientVisual
                  label={heroProduct.name}
                  tone={heroProduct.image}
                  src={heroProductImage}
                  showLabel={false}
                  overlay="soft"
                  className="min-h-[260px] border-white/20"
                />
              </div>
            </div>
          </Reveal>
        </section>
      ) : null}

      <section className="mt-14">
        <Reveal>
          <div className="rounded-[2rem] border border-brand-200 bg-brand-50 p-8 sm:p-10">
            <p className="premium-kicker">CTA</p>
            <h2 className="mt-3 font-display text-3xl font-bold text-deep-950 sm:text-4xl">{category.name} 도매/입점 문의를 시작해보세요</h2>
            <p className="mt-4 max-w-3xl text-sm leading-7 text-slate-700 sm:text-base">
              MOQ, 납기, 패키지 옵션, 외부 마켓 연동까지 운영 목적에 맞춰 제안해 드립니다.
            </p>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <Link href="/wholesale" className="cta-primary">
                도매 문의하기
              </Link>
              <Link href="/contact" className="cta-secondary">
                위치/연락처 보기
              </Link>
            </div>
          </div>
        </Reveal>
      </section>
    </div>
  );
}
