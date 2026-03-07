import type { Category, Product, VisualAsset } from "@/types/catalog";

type VisualBundle = {
  hero: VisualAsset;
  gallery: VisualAsset[];
};

const clampGallerySlots = (slots: VisualAsset[], fallbackTone: string): VisualAsset[] => {
  const limited = slots.slice(0, 4);

  if (limited.length >= 2) {
    return limited;
  }

  const needed = 2 - limited.length;

  const fillers = Array.from({ length: needed }, (_, index) => ({
    alt: `추가 이미지 슬롯 ${index + 1}`,
    caption: `콘텐츠 이미지 슬롯 ${index + 1}`,
    tone: fallbackTone,
  }));

  return [...limited, ...fillers];
};

export const getProductVisualBundle = (product: Product): VisualBundle => {
  const hero: VisualAsset =
    product.heroVisual ?? {
      alt: `${product.name} 대표 이미지`,
      caption: `${product.name} Hero Image`,
      tone: product.image,
    };

  const defaultGallery: VisualAsset[] = [
    {
      alt: `${product.name} 원물 디테일`,
      caption: "원물과 산지 스토리",
      tone: product.image,
    },
    {
      alt: `${product.name} 가공 공정`,
      caption: "가공 및 품질 관리",
      tone: product.image,
    },
    {
      alt: `${product.name} 활용 예시`,
      caption: "조리/활용 장면",
      tone: product.image,
    },
  ];

  const gallery = clampGallerySlots(product.contentVisuals ?? defaultGallery, product.image);

  return { hero, gallery };
};

export const getCategoryVisualBundle = (category: Category): VisualBundle => {
  const hero: VisualAsset =
    category.heroVisual ?? {
      alt: `${category.name} 카테고리 대표 이미지`,
      caption: `${category.name} Category Hero`,
      tone: category.tone,
    };

  const defaultGallery: VisualAsset[] = [
    {
      alt: `${category.name} 산지 이미지`,
      caption: "산지와 소싱",
      tone: category.tone,
    },
    {
      alt: `${category.name} 선별 이미지`,
      caption: "선별 및 품질 기준",
      tone: category.tone,
    },
    {
      alt: `${category.name} 패키지 이미지`,
      caption: "패키지 및 출고",
      tone: category.tone,
    },
  ];

  const gallery = clampGallerySlots(category.contentVisuals ?? defaultGallery, category.tone);

  return { hero, gallery };
};
