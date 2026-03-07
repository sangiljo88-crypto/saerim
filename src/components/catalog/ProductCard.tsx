import Link from "next/link";

import type { Product } from "@/types/catalog";
import { GradientVisual } from "@/components/ui/GradientVisual";
import { Badge } from "@/components/ui/Badge";
import { getProductBadges } from "@/lib/badges";

type ProductCardProps = {
  product: Product;
};

export function ProductCard({ product }: ProductCardProps) {
  const badges = getProductBadges(product).slice(0, 3);

  return (
    <article className="group overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-soft transition duration-300 hover:-translate-y-1 hover:shadow-xl">
      <GradientVisual label={product.name} tone={product.image} className="min-h-[190px] rounded-b-none" />
      <div className="p-6">
        <div className="mb-3 flex flex-wrap gap-1.5">
          {badges.map((badge) => (
            <Badge key={badge} tone={badge === "인기상품" ? "dark" : "accent"}>
              {badge}
            </Badge>
          ))}
        </div>
        <h3 className="font-display text-xl font-bold text-deep-950">{product.name}</h3>
        <p className="mt-3 text-sm leading-7 text-slate-600">{product.shortDescription}</p>
        <Link
          href={`/products/${product.slug}`}
          className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-brand-700 transition group-hover:gap-3"
        >
          제품 상세 보기
          <span aria-hidden>→</span>
        </Link>
      </div>
    </article>
  );
}
