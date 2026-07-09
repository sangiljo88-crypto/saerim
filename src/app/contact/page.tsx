import type { Metadata } from "next";

import { InquiryForm } from "@/components/contact/InquiryForm";
import { Reveal } from "@/components/ui/Reveal";
import { getProduct, getSettings } from "@/lib/db/repo";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "CONTACT — 이제 대화를 시작하자",
  description: "도매·OEM·일반 문의. 품목, 수량, 납기 조건을 알려주시면 맞춤 공급안을 제안합니다.",
};

/** CONTACT — 스토리의 종착점. 실제로 접수되는 문의 폼 + 연락처 */
export default async function ContactPage({
  searchParams,
}: {
  searchParams: Promise<{ type?: string; product?: string }>;
}) {
  const { type, product: productSlug } = await searchParams;
  const settings = getSettings();
  const product = productSlug ? getProduct(productSlug) : null;
  const defaultKind = type === "oem" ? "oem" : type === "general" ? "general" : "wholesale";

  return (
    <>
      <section className="section !pb-14">
        <div className="container-text">
          <Reveal>
            <p className="kicker">Contact</p>
            <h1 className="mt-6 text-display text-ink-900">
              이제 대화를
              <br />
              시작해 보시죠.
            </h1>
            <p className="prose-body mt-8">
              품목, 수량, 납기 조건을 알려주시면 담당자가 맞춤형 공급안을 제안합니다. 모든 문의는
              영업일 기준 1일 이내에 답변드립니다.
            </p>
            {product && (
              <p className="mt-4 inline-block rounded-full bg-paper-warm px-4 py-2 text-sm font-medium text-ink-600">
                문의 제품 — <span className="font-semibold text-ink-900">{product.name}</span>
              </p>
            )}
          </Reveal>
        </div>
      </section>

      <section className="pb-20 md:pb-32">
        <div className="container-grid grid gap-14 lg:grid-cols-[1.4fr_1fr]">
          <Reveal>
            <InquiryForm defaultKind={defaultKind} defaultProduct={productSlug ?? ""} />
          </Reveal>

          <Reveal delayMs={100}>
            <aside className="space-y-8">
              <div className="rounded-2xl border border-line p-8">
                <p className="kicker mb-4">Direct</p>
                <ul className="space-y-3 text-sm text-ink-600">
                  <li>
                    <span className="font-semibold text-ink-900">전화</span> · {settings.contact_tel}
                  </li>
                  <li>
                    <span className="font-semibold text-ink-900">팩스</span> · {settings.contact_fax}
                  </li>
                  <li>
                    <span className="font-semibold text-ink-900">이메일</span> · {settings.contact_email}
                  </li>
                  <li>
                    <span className="font-semibold text-ink-900">주소</span> · {settings.contact_address}
                  </li>
                </ul>
              </div>

              {settings.contact_kakao && (
                <a
                  href={settings.contact_kakao}
                  target="_blank"
                  rel="noreferrer"
                  className="block rounded-2xl border border-line p-8 transition-colors hover:border-ink-400"
                >
                  <p className="kicker mb-3">Kakao</p>
                  <p className="text-h3 text-ink-900">카카오 채널로 빠른 상담 ↗</p>
                  <p className="mt-2 text-sm text-ink-600">
                    평일 09:00–18:00, 실시간으로 답변드립니다.
                  </p>
                </a>
              )}

              <div className="rounded-2xl bg-paper-warm p-8">
                <p className="kicker mb-3">Notice</p>
                <p className="text-sm leading-relaxed text-ink-600">
                  오전 10시 이전 확정된 주문은 당일 출고가 원칙입니다. 대량·정기 납품은 별도 물류
                  일정을 협의합니다.
                </p>
              </div>
            </aside>
          </Reveal>
        </div>
      </section>
    </>
  );
}
