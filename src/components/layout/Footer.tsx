import Link from "next/link";
import { Badge } from "@/components/ui/Badge";

export function Footer() {
  return (
    <footer className="site-footer mt-20 border-t border-slate-200 bg-white">
      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
        <div className="grid gap-2 rounded-3xl border border-slate-200 bg-slate-50 p-4 text-xs text-slate-700 sm:grid-cols-4 sm:p-5">
          {[
            "새림 본사: 돼지 부산물",
            "새림 용인지점: 햄 육가공",
            "새림 임피공장: 즙공장",
            "HACCP 기반 생산·유통",
          ].map((point) => (
            <p key={point} className="rounded-2xl border border-slate-200 bg-white px-3 py-2 text-center font-medium">
              {point}
            </p>
          ))}
        </div>
      </div>

      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-12 sm:px-6 lg:grid-cols-[1.35fr_1fr_1fr]">
        <div>
          <p className="font-display text-2xl font-bold text-deep-950">유한회사 새림</p>
          <p className="mt-3 max-w-md text-sm leading-7 text-slate-600">
            식육 포장·가공 및 HMR 식품개발 선도업체로서, 국탕류와 뒷고기류를 중심으로 안정적인 품질과
            합리적인 공급 구조를 제공합니다.
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            <Badge>HACCP 공정</Badge>
            <Badge>도매 공급</Badge>
            <Badge>공장 직송</Badge>
          </div>
          <dl className="mt-6 space-y-1 text-sm text-slate-600">
            <div>
              <dt className="inline font-medium text-slate-800">사업자등록번호</dt>
              <dd className="ml-2 inline">481-86-00066</dd>
            </div>
            <div>
              <dt className="inline font-medium text-slate-800">법인등록번호</dt>
              <dd className="ml-2 inline">211114-0032627</dd>
            </div>
            <div>
              <dt className="inline font-medium text-slate-800">대표자</dt>
              <dd className="ml-2 inline">최인환</dd>
            </div>
            <div>
              <dt className="inline font-medium text-slate-800">업태/종목</dt>
              <dd className="ml-2 inline">제조업·소매·서비스 / 식육포장처리업·전자상거래·인력공급업</dd>
            </div>
          </dl>
        </div>

        <div>
          <p className="text-sm font-semibold text-slate-900">Site Map</p>
          <ul className="mt-3 space-y-2 text-sm text-slate-600">
            <li>
              <Link href="/" className="hover:text-slate-900">
                홈
              </Link>
            </li>
            <li>
              <Link href="/categories" className="hover:text-slate-900">
                제품 카테고리
              </Link>
            </li>
            <li>
              <Link href="/brand" className="hover:text-slate-900">
                브랜드 소개
              </Link>
            </li>
            <li>
              <Link href="/wholesale" className="hover:text-slate-900">
                도매 문의
              </Link>
            </li>
            <li>
              <Link href="/contact" className="hover:text-slate-900">
                위치/연락처
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <p className="text-sm font-semibold text-slate-900">Company Info</p>
          <ul className="mt-3 space-y-2 text-sm text-slate-600">
            <li>주소: 전북특별자치도 군산시 옥산면 산성로 154</li>
            <li>TEL: 063-464-8681</li>
            <li>FAX: 063-464-8683</li>
            <li>E-MAIL: serim6408@naver.com</li>
            <li>평일 09:00 - 18:00 / 주말·공휴일 휴무</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-slate-200 py-5 text-center text-xs text-slate-500">
        © {new Date().getFullYear()} SAERIM FOOD. All rights reserved.
      </div>
    </footer>
  );
}
