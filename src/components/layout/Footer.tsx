import Link from "next/link";

const SITE_MAP = [
  { href: "/why", label: "WHY" },
  { href: "/brand", label: "BRAND" },
  { href: "/business", label: "BUSINESS" },
  { href: "/products", label: "PRODUCT" },
  { href: "/factory", label: "FACTORY" },
  { href: "/quality", label: "QUALITY" },
  { href: "/oem", label: "OEM" },
  { href: "/news", label: "NEWS" },
  { href: "/store", label: "STORE" },
  { href: "/contact", label: "CONTACT" },
];

export function Footer() {
  return (
    <footer className="hairline-t bg-paper-warm">
      <div className="container-grid grid gap-12 py-16 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <p className="text-lg font-bold text-ink-900">유한회사 새림</p>
          <p className="prose-body mt-4 text-sm">
            대한민국 외식 산업을 준비하는 식품 인프라.
            <br />
            군산 본사와 김제·예산·임피·용인 4개 지점에서 원료·가공·물류를 책임집니다.
          </p>
          <p className="mt-6 text-xs leading-6 text-ink-400">
            대표이사 최인환 — 사업자등록번호 481-86-00066
            <br />
            전북특별자치도 군산시 옥산면 산성로 154
            <br />
            TEL 063-464-8681 · FAX 063-464-8683 · serim6408@naver.com
          </p>
        </div>

        <nav aria-label="사이트맵">
          <p className="kicker mb-4">Site Map</p>
          <ul className="grid grid-cols-2 gap-x-6 gap-y-2.5 text-sm text-ink-600">
            {SITE_MAP.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="transition-colors hover:text-ink-900">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <p className="kicker mb-4">Brands</p>
          <ul className="space-y-2.5 text-sm text-ink-600">
            <li>새림 — 식품 인프라</li>
            <li>전국국밥거래소 — 국탕류 공급</li>
            <li>육식노트 — 뒷고기·특수부위</li>
          </ul>
        </div>
      </div>

      <div className="hairline-t">
        <div className="container-grid flex flex-col items-start justify-between gap-2 py-6 text-xs text-ink-400 md:flex-row">
          <p>© {new Date().getFullYear()} SAERIM. All rights reserved.</p>
          <p>평일 09:00–18:00 · 주말/공휴일 휴무</p>
        </div>
      </div>
    </footer>
  );
}
