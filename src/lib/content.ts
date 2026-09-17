import { fill, getDict } from "@/lib/i18n";
import type { Locale } from "@/lib/i18n/config";
import * as en from "@/lib/i18n/content-en";
import * as zh from "@/lib/i18n/content-zh";
import * as repo from "@/lib/db/repo";
import type { Brand, Factory, News, Product, QualityStep, Settings, StoreLink } from "@/lib/db/types";

/**
 * 로케일을 반영한 콘텐츠 접근 계층.
 * 페이지는 repo(DB) 대신 이 모듈을 통해 데이터를 읽는다.
 * 한국어는 DB 원문 그대로, 그 외 로케일은 content-{locale} 대역표를 덮어쓴다.
 */

/** content-zh와 content-en은 같은 export 구조를 가진다 */
type Overlay = typeof zh;
const OVERLAYS: Partial<Record<Locale, Overlay>> = { zh, en };

const merge = <T extends object>(base: T, override?: Partial<T>): T =>
  override ? { ...base, ...override } : base;

export function getSettings(locale: Locale): Settings {
  const settings = repo.getSettings();
  const overlay = OVERLAYS[locale];
  if (!overlay) return settings;
  const localized: Settings = { ...settings };
  for (const [key, value] of Object.entries(overlay.settings)) {
    if (localized[key] !== undefined) localized[key] = value;
  }
  return localized;
}

export function listBrands(locale: Locale): Brand[] {
  const brands = repo.listBrands();
  const overlay = OVERLAYS[locale];
  return overlay ? brands.map((b) => merge(b, overlay.brands[b.slug])) : brands;
}

const localizeFactory = (locale: Locale, factory: Factory): Factory =>
  merge(factory, OVERLAYS[locale]?.factories[factory.slug]);

export function listFactories(locale: Locale): Factory[] {
  return repo.listFactories().map((f) => localizeFactory(locale, f));
}

export function getFactory(locale: Locale, slug: string): Factory | null {
  const factory = repo.getFactory(slug);
  return factory ? localizeFactory(locale, factory) : null;
}

/**
 * 규격 값은 관리자가 한국어로 입력한다. 대역표에 번역이 없는 로케일에서는 한국어를 노출하지 않고
 * 비워서 "문의 시 안내"로 보이게 한다. (HS 코드·스펙시트 경로는 언어와 무관하므로 그대로 둔다)
 */
const UNTRANSLATED_SPEC = {
  ingredients: "", origin: "", shelfLife: "", storage: "", netWeight: "", boxQty: "",
} satisfies Partial<Product>;

const localizeProduct = (locale: Locale, product: Product): Product => {
  const overlay = OVERLAYS[locale];
  if (!overlay) return product;
  return { ...product, ...UNTRANSLATED_SPEC, ...overlay.products[product.slug] };
};

export function listProducts(locale: Locale, category?: string): Product[] {
  return repo.listProducts(category).map((p) => localizeProduct(locale, p));
}

export function listFeaturedProducts(locale: Locale): Product[] {
  return repo.listFeaturedProducts().map((p) => localizeProduct(locale, p));
}

export function getProduct(locale: Locale, slug: string): Product | null {
  const product = repo.getProduct(slug);
  return product ? localizeProduct(locale, product) : null;
}

/** 카테고리는 필터 값(한국어 원문 key)과 표시명을 분리한다. */
export function listProductCategories(locale: Locale): { key: string; label: string }[] {
  return repo.listProductCategories().map((key) => ({ key, label: categoryLabel(locale, key) }));
}

export function categoryLabel(locale: Locale, key: string): string {
  return OVERLAYS[locale]?.categories[key] ?? key;
}

export function listQualitySteps(locale: Locale): QualityStep[] {
  const steps = repo.listQualitySteps();
  const overlay = OVERLAYS[locale];
  return overlay ? steps.map((s) => merge(s, overlay.qualitySteps[s.stepNo])) : steps;
}

const localizeNews = (locale: Locale, item: News): News =>
  merge(item, OVERLAYS[locale]?.news[item.slug] as Partial<News> | undefined);

export function listNews(locale: Locale): News[] {
  return repo.listNews().map((n) => localizeNews(locale, n));
}

export function getNews(locale: Locale, slug: string): News | null {
  const item = repo.getNews(slug);
  return item ? localizeNews(locale, item) : null;
}

export function listStoreLinks(locale: Locale): StoreLink[] {
  const links = repo.listStoreLinks();
  const overlay = OVERLAYS[locale];
  return overlay ? links.map((l) => merge(l, overlay.storeLinks[l.id])) : links;
}

/**
 * 이미지 대체 텍스트 — 키워드 하나가 아니라 "대상 + 규격 + 공정 + 장소 + 브랜드" 순으로 만든다.
 * 포장 문구는 " · " 앞의 규격(예: "냉동 1kg 포장")만 쓴다.
 */
export function productImageAlt(locale: Locale, product: Product): string {
  const factory = product.factorySlug ? getFactory(locale, product.factorySlug) : null;
  const brand = listBrands(locale).find((b) => b.slug === product.brandSlug);
  const alt = fill(getDict(locale).common.productImageAlt, {
    name: product.name,
    packaging: product.packaging.split(" · ")[0],
    factory: factory?.name ?? "",
    brand: brand?.name ?? "",
  });
  // 공장·브랜드가 비어 있을 때 남는 구분자를 정리한다
  return alt.replace(/([,，]\s*)+$/u, "").replace(/([,，]\s*){2,}/gu, "$1").trim();
}

export function factoryImageAlt(locale: Locale, factory: Factory): string {
  return fill(getDict(locale).common.factoryImageAlt, { factory: factory.name, role: factory.role });
}
