import { redirect } from "next/navigation";

/** 구(舊) 카테고리 경로 — 새 IA의 제품 페이지로 통합되었다. */
export default function LegacyCategoriesPage() {
  redirect("/products");
}
