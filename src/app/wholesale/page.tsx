import { redirect } from "next/navigation";

/** 구(舊) 도매 문의 경로 — CONTACT로 통합되었다. */
export default function LegacyWholesalePage() {
  redirect("/contact?type=wholesale");
}
