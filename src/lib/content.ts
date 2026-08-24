import type { Locale } from "@/lib/i18n/config";
import {
  brandsZh,
  categoriesZh,
  factoriesZh,
  newsZh,
  productsZh,
  qualityStepsZh,
  settingsZh,
  storeLinksZh,
} from "@/lib/i18n/content-zh";
import * as repo from "@/lib/db/repo";
import type { Brand, Factory, News, Product, QualityStep, Settings, StoreLink } from "@/lib/db/types";

/**
 * 로케일을 반영한 콘텐츠 접근 계층.
 * 페이지는 repo(DB) 대신 이 모듈을 통해 데이터를 읽는다.
 * 한국어는 DB 원문 그대로, 중국어는 content-zh 대역표를 덮어쓴다.
 */

const merge = <T extends object>(base: T, override?: Partial<T>): T =>
  override ? { ...base, ...override } : base;

export function getSettings(locale: Locale): Settings {
  const settings = repo.getSettings();
  if (locale !== "zh") return settings;
  const localized: Settings = { ...settings };
  for (const [key, value] of Object.entries(settingsZh)) {
    if (localized[key] !== undefined) localized[key] = value;
  }
  return localized;
}

export function listBrands(locale: Locale): Brand[] {
  const brands = repo.listBrands();
  return locale === "zh" ? brands.map((b) => merge(b, brandsZh[b.slug])) : brands;
}

const localizeFactory = (locale: Locale, factory: Factory): Factory =>
  locale === "zh" ? merge(factory, factoriesZh[factory.slug]) : factory;

export function listFactories(locale: Locale): Factory[] {
  return repo.listFactories().map((f) => localizeFactory(locale, f));
}

export function getFactory(locale: Locale, slug: string): Factory | null {
  const factory = repo.getFactory(slug);
  return factory ? localizeFactory(locale, factory) : null;
}

const localizeProduct = (locale: Locale, product: Product): Product =>
  locale === "zh" ? merge(product, productsZh[product.slug]) : product;

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
  return locale === "zh" ? (categoriesZh[key] ?? key) : key;
}

export function listQualitySteps(locale: Locale): QualityStep[] {
  const steps = repo.listQualitySteps();
  return locale === "zh" ? steps.map((s) => merge(s, qualityStepsZh[s.stepNo])) : steps;
}

const localizeNews = (locale: Locale, item: News): News =>
  locale === "zh" ? merge(item, newsZh[item.slug] as Partial<News> | undefined) : item;

export function listNews(locale: Locale): News[] {
  return repo.listNews().map((n) => localizeNews(locale, n));
}

export function getNews(locale: Locale, slug: string): News | null {
  const item = repo.getNews(slug);
  return item ? localizeNews(locale, item) : null;
}

export function listStoreLinks(locale: Locale): StoreLink[] {
  const links = repo.listStoreLinks();
  return locale === "zh" ? links.map((l) => merge(l, storeLinksZh[l.id])) : links;
}
