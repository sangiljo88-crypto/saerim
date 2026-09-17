/** 구조화 데이터(JSON-LD) 출력 — 서버 컴포넌트에서 객체를 그대로 넘긴다 */
export function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      // "<"를 이스케이프해 문자열 값이 스크립트 태그를 닫지 못하게 한다
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}
