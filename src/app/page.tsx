import { HomeSectionedLanding } from "@/components/home/HomeSectionedLanding";
import { getAllCategories, getAllProducts, getFeaturedProducts } from "@/lib/catalog";

export default function HomePage() {
  const categories = getAllCategories();
  const products = getAllProducts();
  const featuredProducts = getFeaturedProducts();

  return <HomeSectionedLanding categories={categories} products={products} featuredProducts={featuredProducts} />;
}
