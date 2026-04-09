import type { Category } from "@/types/catalog";

export const categories: Category[] = [
  {
    id: "cat-guktang",
    slug: "guktang",
    name: "국탕류",
    englishName: "Soup & Gukbap Ingredients",
    shortDescription: "국밥·순댓국 매장을 위한 내장/탕육 원료를 HACCP 공장에서 직송합니다.",
    intro:
      "새림 국탕류 라인은 삶은 돈두, 소창, 염통, 오소리감투 등 국밥 핵심 재료를 표준화해 공급합니다. 매일 생산한 제품을 냉동 포장으로 전국 출고해 매장 운영 안정성을 높입니다.",
    whyItMatters:
      "국밥 품질은 육수와 고명 원물의 일관성에서 갈립니다. 부위별 전처리 편차를 줄이면 매장 맛 편차를 줄이고 조리 시간을 단축할 수 있습니다.",
    heroTagline: "국밥 한 그릇의 기준이 되는 원료 공급",
    highlights: ["HACCP 공정", "매일 생산·출고", "국밥 전문점 맞춤"],
    tone: "sand",
  },
  {
    id: "cat-dwitgogi",
    slug: "dwitgogi",
    name: "뒷고기류",
    englishName: "Special Pork Cuts",
    shortDescription: "뽈항정·관자살·설하살 특수부위를 공장 직거래로 안정 공급합니다.",
    intro:
      "새림 뒷고기류는 한 마리에서 소량만 나오는 특수부위를 매일 도축·발골해 제공합니다. 한 곳에서 전 부위를 원스톱으로 조달할 수 있어 운영 부담을 줄일 수 있습니다.",
    whyItMatters:
      "특수부위는 물량과 품질 변동이 크기 때문에 공급처 안정성이 핵심입니다. 공장 직송 체계를 통해 중간 유통 마진을 줄이고 품질 기준을 일정하게 유지할 수 있습니다.",
    heroTagline: "희소 부위를 안정적으로 공급하는 새림 특수부위 라인",
    highlights: ["특수부위 전문", "원스톱 공급", "중간유통 최소화"],
    tone: "night",
  },
];
