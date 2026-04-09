import type { Metadata } from "next";

import { CategoryCard } from "@/components/catalog/CategoryCard";
import { GradientVisual } from "@/components/ui/GradientVisual";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { getAllCategories } from "@/lib/catalog";

export const metadata: Metadata = {
  title: "카테고리",
  description: "유한회사 새림의 국탕류, 뒷고기류 카테고리를 확인하세요.",
};

export default function CategoriesPage() {
  const categories = getAllCategories();
  const heroVisual = "/images/company/photo3.jpg";

  return (
    <div className="landing-section py-10 sm:py-14">
      <Reveal>
        <div className="premium-shell p-7 sm:p-10">
          <div className="grid gap-6 lg:grid-cols-[1.12fr_0.88fr] lg:items-center">
            <SectionHeading
              eyebrow="Categories"
              title="새림 제품 카테고리"
              description="국탕류와 뒷고기류 중심으로 품목을 구성해 매장 목적에 맞는 제품을 빠르게 확인할 수 있도록 설계했습니다."
            />
            <GradientVisual
              label="Category Hero"
              tone="sea"
              src={heroVisual}
              showLabel={false}
              overlay="soft"
              className="min-h-[240px]"
            />
          </div>
          <div className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {categories.map((category) => (
              <CategoryCard key={category.id} category={category} />
            ))}
          </div>
        </div>
      </Reveal>
    </div>
  );
}
