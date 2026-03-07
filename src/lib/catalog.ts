import { categories as seedCategories } from "@/data/categories";
import { products as seedProducts } from "@/data/products";
import { loadFileCategories, loadFileProducts } from "@/lib/content/file-store";
import type { Category, Product } from "@/types/catalog";

const mergeBySlug = <T extends { slug: string }>(seedItems: T[], fileItems: T[]): T[] => {
  const map = new Map<string, T>();

  seedItems.forEach((item) => map.set(item.slug, item));
  fileItems.forEach((item) => map.set(item.slug, item));

  return Array.from(map.values());
};

const isPublished = (item: { status?: "draft" | "published" }) => item.status !== "draft";

const getMergedCategories = (): Category[] => {
  const fileCategories = loadFileCategories();
  return mergeBySlug(seedCategories, fileCategories).filter(isPublished);
};

const getMergedProducts = (): Product[] => {
  const categories = getMergedCategories();
  const validCategorySlugs = new Set(categories.map((category) => category.slug));
  const fileProducts = loadFileProducts();

  return mergeBySlug(seedProducts, fileProducts).filter(
    (product) => isPublished(product) && validCategorySlugs.has(product.category),
  );
};

export const getAllCategories = () => getMergedCategories();

export const getAllProducts = () => getMergedProducts();

export const getFeaturedProducts = () =>
  getMergedProducts().filter((product) => product.featured);

export const getCategoryBySlug = (slug: string) =>
  getMergedCategories().find((category) => category.slug === slug);

export const getProductBySlug = (slug: string) =>
  getMergedProducts().find((product) => product.slug === slug);

export const getProductsByCategory = (categorySlug: string) =>
  getMergedProducts().filter((product) => product.category === categorySlug);
