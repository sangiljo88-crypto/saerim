import Link from "next/link";

import type { Category } from "@/types/catalog";
import { GradientVisual } from "@/components/ui/GradientVisual";
import { Badge } from "@/components/ui/Badge";

type CategoryCardProps = {
  category: Category;
};

export function CategoryCard({ category }: CategoryCardProps) {
  return (
    <article className="group overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-soft transition duration-300 hover:-translate-y-1 hover:shadow-xl">
      <GradientVisual label={category.name} tone={category.tone} className="min-h-[190px] rounded-b-none" />
      <div className="p-6">
        <p className="text-xs uppercase tracking-[0.18em] text-slate-500">{category.englishName}</p>
        <h3 className="mt-2 font-display text-2xl font-bold text-deep-950">{category.name}</h3>
        <p className="mt-3 text-sm leading-7 text-slate-600">{category.shortDescription}</p>
        <div className="mt-4 flex flex-wrap gap-1.5">
          {category.highlights.slice(0, 2).map((item) => (
            <Badge key={item}>{item}</Badge>
          ))}
        </div>
        <Link
          href={`/categories/${category.slug}`}
          className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-brand-700 transition group-hover:gap-3"
        >
          카테고리 보기
          <span aria-hidden>→</span>
        </Link>
      </div>
    </article>
  );
}
