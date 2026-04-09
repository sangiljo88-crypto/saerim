import Link from "next/link";

import type { Product } from "@/types/catalog";
import { GradientVisual } from "@/components/ui/GradientVisual";
import { Badge } from "@/components/ui/Badge";
import { getProductBadges } from "@/lib/badges";
import { getProductPrimaryImage } from "@/lib/visuals";

type ProductCardProps = {
  product: Product;
};

export function ProductCard({ product }: ProductCardProps) {
  const badges = getProductBadges(product).slice(0, 3);
  const primaryImage = getProductPrimaryImage(product);

  return (
    <Link
      href={`/products/${product.slug}`}
      aria-label={`${product.name} 제품 상세 페이지로 이동`}
      className="group block overflow-hidden rounded-3xl border border-slate-200/80 bg-white shadow-soft transition duration-300 hover:-translate-y-1.5 hover:shadow-xl"
    >
      <GradientVisual
        label={product.name}
        tone={product.image}
        src={primaryImage}
        showLabel={false}
        overlay="soft"
        className="min-h-[210px] rounded-b-none"
      />
      <article className="p-6">
        <div className="mb-3 flex flex-wrap gap-1.5">
          {badges.map((badge) => (
            <Badge key={badge} tone={badge === "인기상품" ? "dark" : "accent"}>
              {badge}
            </Badge>
          ))}
        </div>
        <h3 className="font-display text-xl font-bold leading-snug text-deep-950">{product.name}</h3>
        <p className="mt-3 text-sm leading-7 text-slate-600">{product.shortDescription}</p>
        <p className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-brand-700 transition group-hover:gap-3">
          제품 상세 보기
          <span aria-hidden>→</span>
        </p>
      </article>
    </Link>
  );
}
