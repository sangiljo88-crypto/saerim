import type { Metadata } from "next";

import { CategoryCard } from "@/components/catalog/CategoryCard";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { getAllCategories } from "@/lib/catalog";

export const metadata: Metadata = {
  title: "카테고리",
  description: "멸치, 건새우, 미역·다시마, 오징어·건어물, 국물재료, 선물세트 카테고리를 확인하세요.",
};

export default function CategoriesPage() {
  const categories = getAllCategories();

  return (
    <div className="landing-section py-10 sm:py-14">
      <Reveal>
        <div className="premium-shell p-7 sm:p-10">
          <SectionHeading
            eyebrow="Categories"
            title="카테고리별 랜딩 페이지"
            description="카테고리별 가치와 대표 제품을 분리해 보여주는 구조로, 고객이 원하는 재료를 빠르게 찾을 수 있도록 설계했습니다."
          />
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
