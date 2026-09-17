import { JsonLd } from "@/components/seo/JsonLd";

export type FaqItem = { q: string; a: string };

/**
 * FAQ — 텍스트 아코디언(<details>)과 FAQPage 구조화 데이터를 같은 데이터로 함께 출력한다.
 * 답변은 접혀 있어도 HTML에 그대로 있으므로 검색엔진·AI가 읽을 수 있다.
 */
export function Faq({ items }: { items: FaqItem[] }) {
  if (items.length === 0) return null;

  return (
    <>
      <div className="divide-y divide-line border-y border-line">
        {items.map((item) => (
          <details key={item.q} className="group py-5">
            <summary className="flex cursor-pointer list-none items-start justify-between gap-6 text-body font-semibold text-ink-900 [&::-webkit-details-marker]:hidden">
              {item.q}
              <span aria-hidden className="mt-0.5 shrink-0 text-ink-400 transition-transform group-open:rotate-45">
                +
              </span>
            </summary>
            <p className="prose-body mt-3">{item.a}</p>
          </details>
        ))}
      </div>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: items.map((item) => ({
            "@type": "Question",
            name: item.q,
            acceptedAnswer: { "@type": "Answer", text: item.a },
          })),
        }}
      />
    </>
  );
}
