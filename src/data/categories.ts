import type { Category } from "@/types/catalog";

export const categories: Category[] = [
  {
    id: "cat-anchovy",
    slug: "anchovy",
    name: "멸치",
    englishName: "Anchovy",
    shortDescription: "볶음용부터 육수용까지, 규격별로 정리된 대표 멸치 라인",
    intro:
      "남해와 동해 연안에서 수급한 멸치를 용도에 맞춰 선별했습니다. 가정용 소포장부터 업소용 대용량까지 폭넓게 대응합니다.",
    whyItMatters:
      "멸치는 한식의 기본 풍미를 결정하는 핵심 재료입니다. 입자 크기와 건조 상태가 일정해야 요리의 맛이 안정적으로 유지됩니다.",
    heroTagline: "한식의 기준이 되는 기본 재료",
    highlights: ["규격별 선별", "깔끔한 염도", "대용량 공급 가능"],
    tone: "sea",
  },
  {
    id: "cat-shrimp",
    slug: "dried-shrimp",
    name: "건새우",
    englishName: "Dried Shrimp",
    shortDescription: "감칠맛을 끌어올리는 건새우와 분말형 새우 소재",
    intro:
      "통영권 새우 원물을 중심으로 크기와 용도별 라인업을 구성했습니다. 국물, 볶음, 토핑 등 활용 범위가 넓습니다.",
    whyItMatters:
      "건새우는 적은 양으로도 감칠맛을 강화할 수 있어 식당 메뉴의 맛 편차를 줄이는 데 유리합니다.",
    heroTagline: "진한 감칠맛의 핵심 포인트",
    highlights: ["통영권 원물", "분말/원형 옵션", "업소 맞춤 규격"],
    tone: "sunset",
  },
  {
    id: "cat-seaweed",
    slug: "seaweed-kelp",
    name: "미역 · 다시마",
    englishName: "Seaweed / Kelp",
    shortDescription: "청정 해역에서 채취한 미역·다시마 기반 해조류 라인",
    intro:
      "완도 중심의 해조류 원물을 원형, 컷팅, 건조 형태로 제공합니다. 조리 공정에 맞춰 손질 단계를 선택할 수 있습니다.",
    whyItMatters:
      "해조류는 식감과 향을 동시에 담당합니다. 선별과 건조 품질이 좋을수록 재수화 후의 식감이 안정적입니다.",
    heroTagline: "청정 해역의 풍미를 담다",
    highlights: ["완도 원물 중심", "손질 옵션", "재수화 식감 안정"],
    tone: "forest",
  },
  {
    id: "cat-squid",
    slug: "squid-dried-seafood",
    name: "오징어 · 건어물",
    englishName: "Squid / Dried Seafood",
    shortDescription: "간식/안주/식자재에 모두 대응하는 오징어·건어물 라인",
    intro:
      "직화 반건조 오징어, 버터구이 오징어, 건어물 모둠 등 다양한 소비 채널에 맞춘 제품군입니다.",
    whyItMatters:
      "건어물은 원물 상태와 수분 조절이 품질을 좌우합니다. 균일한 건조 관리가 식감과 향 유지에 핵심입니다.",
    heroTagline: "식감과 향의 균형을 설계하다",
    highlights: ["균일 건조", "스낵/안주용 라인", "소매·도매 동시 대응"],
    tone: "night",
  },
  {
    id: "cat-soup",
    slug: "soup-ingredients",
    name: "국물재료",
    englishName: "Soup Ingredients",
    shortDescription: "멸치, 다시마, 새우를 조합한 간편 국물 솔루션",
    intro:
      "식당 운영자와 가정 고객 모두 빠르게 사용할 수 있도록 베이스 재료를 조합한 키트형 제품을 제공합니다.",
    whyItMatters:
      "국물 베이스는 메뉴 전체의 기준 맛을 만듭니다. 계량이 쉬운 키트형은 조리 시간을 줄이고 품질 편차를 낮춥니다.",
    heroTagline: "빠르고 일정한 국물 베이스",
    highlights: ["혼합 키트", "조리시간 단축", "맛 표준화"],
    tone: "sand",
  },
  {
    id: "cat-gift",
    slug: "gift-set",
    name: "선물세트",
    englishName: "Gift Set",
    shortDescription: "명절과 기업 선물용으로 기획된 프리미엄 건해산물 세트",
    intro:
      "고급 포장과 구성 옵션으로 선물 목적에 맞춰 커스터마이징할 수 있는 세트 라인입니다.",
    whyItMatters:
      "선물세트는 품질뿐 아니라 패키징 완성도가 중요합니다. 정돈된 구성과 안정 배송이 브랜드 인상을 좌우합니다.",
    heroTagline: "선물의 품격을 완성하는 구성",
    highlights: ["프리미엄 패키지", "기업 대량 주문", "명절 시즌 대응"],
    tone: "stone",
  },
];
