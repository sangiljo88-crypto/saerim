import type { Product } from "@/types/catalog";

export const getProductBadges = (product: Product): string[] => {
  const badges = ["무료배송", "산지직송"];

  if (product.wholesaleAvailable) {
    badges.push("도매가능");
  }

  if (product.featured) {
    badges.push("인기상품");
  }

  return badges;
};
