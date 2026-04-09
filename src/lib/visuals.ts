import type { Category, Product, VisualAsset } from "@/types/catalog";

type VisualBundle = {
  hero: VisualAsset;
  gallery: VisualAsset[];
};

type VisualPreset = {
  hero: VisualAsset;
  gallery: VisualAsset[];
};

const productImage = (slug: string) => `/images/products/${slug}.jpg`;

const categoryVisualPresets: Record<string, VisualPreset> = {
  guktang: {
    hero: {
      src: productImage("boiled-pork-head-slice"),
      alt: "국탕류 대표 이미지",
      caption: "국밥·순댓국 원료 공급",
      tone: "soup-kit",
    },
    gallery: [
      {
        src: productImage("boiled-pork-head-slice"),
        alt: "삶은 돈두 슬라이스",
        caption: "국밥 메인 원료",
        tone: "sand",
      },
      {
        src: productImage("boiled-small-intestine-slice"),
        alt: "삶은 소창 슬라이스",
        caption: "국밥 토핑 핵심",
        tone: "stone",
      },
      {
        src: productImage("boiled-heart-slice"),
        alt: "삶은 염통 슬라이스",
        caption: "담백한 식감",
        tone: "forest",
      },
      {
        src: productImage("boiled-osori-gamtu"),
        alt: "삶은 오소리감투",
        caption: "특수 내장 라인",
        tone: "sea",
      },
    ],
  },
  dwitgogi: {
    hero: {
      src: productImage("ppolhangjeong-500g"),
      alt: "뒷고기류 대표 이미지",
      caption: "특수부위 전문 라인",
      tone: "night",
    },
    gallery: [
      {
        src: productImage("ppolhangjeong-500g"),
        alt: "뽈항정",
        caption: "대표 특수부위",
        tone: "night",
      },
      {
        src: productImage("gwanjasal-300g"),
        alt: "관자살",
        caption: "쫀득한 희소부위",
        tone: "sunset",
      },
      {
        src: productImage("seolhasal-300g"),
        alt: "설하살",
        caption: "특수부위 라인",
        tone: "stone",
      },
    ],
  },
};

const productVisualPresets: Record<string, VisualPreset> = {
  "boiled-pork-head-slice": {
    hero: {
      src: productImage("boiled-pork-head-slice"),
      alt: "삶은 돈두 슬라이스",
      caption: "국탕 메인 원료",
      tone: "sand",
    },
    gallery: [
      {
        src: productImage("boiled-small-intestine-slice"),
        alt: "삶은 소창 슬라이스",
        caption: "국밥 토핑 구성",
        tone: "stone",
      },
      {
        src: productImage("boiled-osori-gamtu"),
        alt: "삶은 오소리감투",
        caption: "내장류 확장 라인",
        tone: "sea",
      },
    ],
  },
  "boiled-small-intestine-slice": {
    hero: {
      src: productImage("boiled-small-intestine-slice"),
      alt: "삶은 소창 슬라이스",
      caption: "국밥 토핑 핵심",
      tone: "stone",
    },
    gallery: [
      {
        src: productImage("boiled-pork-head-slice"),
        alt: "삶은 돈두 슬라이스",
        caption: "메인 원료 조합",
        tone: "sand",
      },
      {
        src: productImage("boiled-heart-slice"),
        alt: "삶은 염통 슬라이스",
        caption: "부재료 라인",
        tone: "forest",
      },
    ],
  },
  "boiled-heart-slice": {
    hero: {
      src: productImage("boiled-heart-slice"),
      alt: "삶은 염통 슬라이스",
      caption: "담백한 식감",
      tone: "forest",
    },
    gallery: [
      {
        src: productImage("boiled-small-intestine-slice"),
        alt: "삶은 소창 슬라이스",
        caption: "국밥 토핑 구성",
        tone: "stone",
      },
      {
        src: productImage("boiled-osori-gamtu"),
        alt: "삶은 오소리감투",
        caption: "특수 내장 라인",
        tone: "sea",
      },
    ],
  },
  "boiled-osori-gamtu": {
    hero: {
      src: productImage("boiled-osori-gamtu"),
      alt: "삶은 오소리감투",
      caption: "쫄깃한 특수 내장",
      tone: "sea",
    },
    gallery: [
      {
        src: productImage("boiled-pork-head-slice"),
        alt: "삶은 돈두 슬라이스",
        caption: "국탕 메인 원료",
        tone: "sand",
      },
      {
        src: productImage("boiled-heart-slice"),
        alt: "삶은 염통 슬라이스",
        caption: "국밥 부재료",
        tone: "forest",
      },
    ],
  },
  "ppolhangjeong-500g": {
    hero: {
      src: productImage("ppolhangjeong-500g"),
      alt: "뽈항정 500g",
      caption: "대표 뒷고기 특수부위",
      tone: "night",
    },
    gallery: [
      {
        src: productImage("gwanjasal-300g"),
        alt: "관자살 300g",
        caption: "희소 부위 조합",
        tone: "sunset",
      },
      {
        src: productImage("seolhasal-300g"),
        alt: "설하살 300g",
        caption: "특수부위 라인",
        tone: "stone",
      },
    ],
  },
  "gwanjasal-300g": {
    hero: {
      src: productImage("gwanjasal-300g"),
      alt: "관자살 300g",
      caption: "쫀득한 희소부위",
      tone: "sunset",
    },
    gallery: [
      {
        src: productImage("ppolhangjeong-500g"),
        alt: "뽈항정 500g",
        caption: "대표 특수부위",
        tone: "night",
      },
      {
        src: productImage("seolhasal-300g"),
        alt: "설하살 300g",
        caption: "식감 차별 라인",
        tone: "stone",
      },
    ],
  },
  "seolhasal-300g": {
    hero: {
      src: productImage("seolhasal-300g"),
      alt: "설하살 300g",
      caption: "특수부위 라인",
      tone: "stone",
    },
    gallery: [
      {
        src: productImage("ppolhangjeong-500g"),
        alt: "뽈항정 500g",
        caption: "대표 특수부위",
        tone: "night",
      },
      {
        src: productImage("gwanjasal-300g"),
        alt: "관자살 300g",
        caption: "희소 부위 조합",
        tone: "sunset",
      },
    ],
  },
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

const normalizeAsset = (asset: VisualAsset, fallbackTone: string): VisualAsset => ({
  ...asset,
  tone: asset.tone ?? fallbackTone,
});

export const getProductPrimaryImage = (product: Product): string | undefined => {
  if (product.heroVisual?.src) {
    return product.heroVisual.src;
  }

  return productVisualPresets[product.slug]?.hero.src;
};

export const getCategoryPrimaryImage = (category: Category): string | undefined => {
  if (category.heroVisual?.src) {
    return category.heroVisual.src;
  }

  return categoryVisualPresets[category.slug]?.hero.src;
};

export const getProductVisualBundle = (product: Product): VisualBundle => {
  const preset = productVisualPresets[product.slug];
  const hero = normalizeAsset(
    product.heroVisual ??
      preset?.hero ?? {
        alt: `${product.name} 대표 이미지`,
        caption: `${product.name} Hero Image`,
        tone: product.image,
      },
    product.image,
  );

  const gallery = clampGallerySlots(
    (product.contentVisuals && product.contentVisuals.length > 0 ? product.contentVisuals : preset?.gallery ?? []).map(
      (asset) => normalizeAsset(asset, product.image),
    ),
    product.image,
  );

  return {
    hero,
    gallery,
  };
};

export const getCategoryVisualBundle = (category: Category): VisualBundle => {
  const preset = categoryVisualPresets[category.slug];
  const hero = normalizeAsset(
    category.heroVisual ??
      preset?.hero ?? {
        alt: `${category.name} 대표 이미지`,
        caption: `${category.name} Hero Image`,
        tone: category.tone,
      },
    category.tone,
  );

  const gallery = clampGallerySlots(
    (category.contentVisuals && category.contentVisuals.length > 0 ? category.contentVisuals : preset?.gallery ?? []).map(
      (asset) => normalizeAsset(asset, category.tone),
    ),
    category.tone,
  );

  return {
    hero,
    gallery,
  };
};
