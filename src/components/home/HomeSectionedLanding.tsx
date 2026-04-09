import Link from "next/link";

import { Badge } from "@/components/ui/Badge";
import { GradientVisual } from "@/components/ui/GradientVisual";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { getCategoryPrimaryImage, getProductPrimaryImage } from "@/lib/visuals";
import type { Category, Product } from "@/types/catalog";

type HomeSectionedLandingProps = {
  categories: Category[];
  products: Product[];
  featuredProducts: Product[];
};

const KAKAO_CHAT_URL = "https://open.kakao.com/o/pRSmEn9h";
const SMARTSTORE_URL = "https://vo.la/RFDWcIg";

const branchCards = [
  {
    title: "새림 본사",
    subtitle: "돼지 부산물",
    description: "돈두·내장류 중심 원료를 세척, 열처리, 포장까지 원스톱으로 생산·공급합니다.",
    tone: "night",
    src: "/images/company/branch-hq-product.jpg",
  },
  {
    title: "새림 용인지점",
    subtitle: "햄 육가공",
    description: "햄·육가공 제품의 OEM/B2B 생산을 담당하며 공정 표준화와 위생 기준을 강화해 운영합니다.",
    tone: "stone",
    src: "/images/company/branch-yongin-product.jpg",
  },
  {
    title: "새림 임피공장",
    subtitle: "즙공장",
    description: "즙·추출 기반 제품 생산 라인을 통해 다양한 식품군으로 확장 가능한 가공 역량을 제공합니다.",
    tone: "sand",
    src: "/images/company/branch-impi-product.jpg",
  },
] as const;

const processSteps = [
  {
    title: "원료 입고·다단계 검수",
    body: "원료육과 부재료를 공정 기준에 맞춰 검수하고 이력 정보를 기록합니다.",
  },
  {
    title: "세척·열처리·가공",
    body: "제품군별로 세척, 열처리, 세절/발골 공정을 분리 운영해 품질 편차를 줄입니다.",
  },
  {
    title: "포장·보관",
    body: "진공/열성형/벌크 포장과 냉장·냉동 보관 기준을 적용해 제품 신선도를 유지합니다.",
  },
  {
    title: "출고·냉동 물류",
    body: "오전 주문 건은 당일 출고를 원칙으로 전국 냉동 물류로 안정 배송합니다.",
  },
] as const;

export function HomeSectionedLanding({ categories, products, featuredProducts }: HomeSectionedLandingProps) {
  const showcaseProducts = (featuredProducts.length > 0 ? featuredProducts : products).slice(0, 6);

  return (
    <div className="landing-section pb-16 pt-10 sm:pb-20 sm:pt-14">
      <section className="grid gap-8 rounded-[2rem] border border-slate-200 bg-white p-7 shadow-soft sm:p-10 lg:grid-cols-[1.08fr_0.92fr]">
        <div>
          <p className="premium-kicker">Saerim Food Company</p>
          <h1 className="mt-3 font-display text-4xl font-extrabold leading-tight text-deep-950 sm:text-5xl">
            식육 포장·가공과
            <br />
            국탕류·뒷고기류 전문 기업
          </h1>
          <p className="mt-5 text-sm leading-7 text-slate-700 sm:text-base">
            유한회사 새림은 식육 포장/가공 및 HMR 식품 개발에 정성을 더해, 품질은 높이고 거품을 뺀 합리적인
            공급 구조를 제공합니다.
          </p>
          <div className="mt-6 flex flex-wrap gap-2">
            <Badge>HACCP 인증 공정</Badge>
            <Badge>공장 직송</Badge>
            <Badge>도매 대응</Badge>
          </div>
          <div className="mt-7 flex flex-col gap-3 sm:flex-row">
            <a href={KAKAO_CHAT_URL} target="_blank" rel="noreferrer" className="cta-primary">
              카카오 상담하기
            </a>
            <a href={SMARTSTORE_URL} target="_blank" rel="noreferrer" className="cta-secondary">
              스마트스토어 주문
            </a>
          </div>
          <div className="mt-8 grid gap-3 sm:grid-cols-3">
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 text-center">
              <p className="font-display text-2xl font-bold text-deep-950">2004</p>
              <p className="mt-1 text-xs text-slate-600">창립</p>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 text-center">
              <p className="font-display text-2xl font-bold text-deep-950">220억</p>
              <p className="mt-1 text-xs text-slate-600">연매출 규모</p>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 text-center">
              <p className="font-display text-2xl font-bold text-deep-950">{products.length}+</p>
              <p className="mt-1 text-xs text-slate-600">핵심 제품군</p>
            </div>
          </div>
        </div>

        <GradientVisual
          label="Saerim Main"
          tone="night"
          src="/images/company/hero-main-photo4.jpg"
          showLabel={false}
          overlay="soft"
          className="min-h-[340px]"
        />
      </section>

      <section className="mt-14 rounded-[2rem] border border-slate-200 bg-white p-7 shadow-soft sm:p-10">
        <SectionHeading
          eyebrow="Brand Structure"
          title="새림 브랜드 소개"
          description="새림은 본사·용인지점·임피공장 3개 축으로 생산 역량을 분리 운영합니다."
        />
        <div className="mt-7 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {branchCards.map((branch) => (
            <article key={branch.title} className="overflow-hidden rounded-3xl border border-slate-200 bg-white">
              <GradientVisual
                label={branch.title}
                tone={branch.tone}
                src={branch.src}
                showLabel={false}
                overlay="soft"
                className="min-h-[180px] rounded-none border-none"
              />
              <div className="p-5">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-700">{branch.subtitle}</p>
                <h3 className="mt-2 font-display text-2xl font-bold text-deep-950">{branch.title}</h3>
                <p className="mt-3 text-sm leading-7 text-slate-600">{branch.description}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="mt-14">
        <SectionHeading
          eyebrow="Product Categories"
          title="국탕류 / 뒷고기류 카테고리"
          description="기존 랜딩 페이지에서 사용한 핵심 품목을 카테고리 중심 구조로 재구성했습니다."
        />
        <div className="mt-8 grid gap-6 md:grid-cols-2">
          {categories.map((category) => (
            <Link
              key={category.id}
              href={`/categories/${category.slug}`}
              className="group block overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-soft transition duration-300 hover:-translate-y-1"
            >
              <GradientVisual
                label={category.name}
                tone={category.tone}
                src={getCategoryPrimaryImage(category)}
                showLabel={false}
                overlay="soft"
                className="min-h-[220px] rounded-none border-none"
              />
              <div className="p-6">
                <p className="text-xs uppercase tracking-[0.18em] text-slate-500">{category.englishName}</p>
                <h3 className="mt-2 font-display text-3xl font-bold text-deep-950">{category.name}</h3>
                <p className="mt-3 text-sm leading-7 text-slate-600">{category.shortDescription}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {category.highlights.map((item) => (
                    <Badge key={item}>{item}</Badge>
                  ))}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="mt-14">
        <SectionHeading
          eyebrow="Featured Products"
          title="대표 품목"
          description="국탕류와 뒷고기류에서 매장 운영에 바로 투입 가능한 핵심 품목을 우선 제안합니다."
        />
        <div className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {showcaseProducts.map((product) => (
            <Link
              key={product.id}
              href={`/products/${product.slug}`}
              className="group block overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-soft transition duration-300 hover:-translate-y-1"
            >
              <GradientVisual
                label={product.name}
                tone={product.image}
                src={getProductPrimaryImage(product)}
                showLabel={false}
                overlay="soft"
                className="min-h-[210px] rounded-none border-none"
              />
              <div className="p-6">
                <h3 className="font-display text-2xl font-bold text-deep-950">{product.name}</h3>
                <p className="mt-3 text-sm leading-7 text-slate-600">{product.shortDescription}</p>
                <p className="mt-4 text-xs text-slate-500">포장: {product.packageInfo}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="mt-14 grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
        <article className="rounded-[2rem] border border-slate-200 bg-white p-7 shadow-soft sm:p-10">
          <SectionHeading
            eyebrow="Production Process"
            title="새림 생산·출고 프로세스"
            description="원료 검수부터 냉동 물류까지 단계별 기준을 지켜 품질을 관리합니다."
          />
          <ol className="mt-6 space-y-3">
            {processSteps.map((step, index) => (
              <li key={step.title} className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-700">STEP {index + 1}</p>
                <p className="mt-1 text-sm font-semibold text-deep-950">{step.title}</p>
                <p className="mt-2 text-sm leading-7 text-slate-600">{step.body}</p>
              </li>
            ))}
          </ol>
        </article>

        <article className="rounded-[2rem] bg-deep-950 p-7 text-white sm:p-10">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-200">Contact</p>
          <h2 className="mt-3 font-display text-3xl font-bold">도매 상담 및 공급 문의</h2>
          <p className="mt-4 text-sm leading-7 text-slate-200">
            품목, 수량, 납기 조건을 알려주시면 새림 담당자가 맞춤형 공급안을 안내해 드립니다.
          </p>
          <ul className="mt-6 space-y-3 text-sm leading-7 text-slate-100">
            <li>유한회사 새림</li>
            <li>대표자: 최인환</li>
            <li>사업자등록번호: 481-86-00066</li>
            <li>주소: 전북특별자치도 군산시 옥산면 산성로 154</li>
            <li>TEL: 063-464-8681 / FAX: 063-464-8683</li>
            <li>E-MAIL: serim6408@naver.com</li>
            <li>카카오 상담: open.kakao.com/o/pRSmEn9h</li>
            <li>스마트스토어: vo.la/RFDWcIg</li>
          </ul>
          <div className="mt-7 grid gap-3 sm:grid-cols-3">
            <a
              href={KAKAO_CHAT_URL}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center rounded-full bg-white px-5 py-3 text-sm font-semibold text-deep-950 transition hover:bg-slate-100"
            >
              카카오 상담
            </a>
            <a
              href={SMARTSTORE_URL}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center rounded-full border border-white/50 bg-transparent px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
            >
              스마트스토어
            </a>
            <Link
              href="/wholesale"
              className="inline-flex items-center justify-center rounded-full border border-brand-300 bg-brand-100 px-5 py-3 text-sm font-semibold text-brand-900 transition hover:bg-brand-200"
            >
              도매 문의
            </Link>
          </div>
        </article>
      </section>
    </div>
  );
}
