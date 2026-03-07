import Link from "next/link";
import { Badge } from "@/components/ui/Badge";

export function Footer() {
  return (
    <footer className="mt-20 border-t border-slate-200 bg-white">
      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
        <div className="grid gap-2 rounded-3xl border border-slate-200 bg-slate-50 p-4 text-xs text-slate-700 sm:grid-cols-4 sm:p-5">
          {["HACCP 기준 공정 운영", "산지 협력 네트워크", "전국 물류 대응", "도매/소매 동시 운영"].map((point) => (
            <p key={point} className="rounded-2xl border border-slate-200 bg-white px-3 py-2 text-center font-medium">
              {point}
            </p>
          ))}
        </div>
      </div>

      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-12 sm:px-6 lg:grid-cols-[1.35fr_1fr_1fr]">
        <div>
          <p className="font-display text-2xl font-bold text-deep-950">광일건해</p>
          <p className="mt-3 max-w-md text-sm leading-7 text-slate-600">
            프리미엄 건해산물 브랜드 웹사이트 샘플입니다. 카테고리 중심 탐색과 랜딩형 제품 상세 구조를 통해
            브랜드 신뢰를 전달합니다.
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            <Badge>산지직송</Badge>
            <Badge>무료배송</Badge>
            <Badge>도매가능</Badge>
          </div>
          <dl className="mt-6 space-y-1 text-sm text-slate-600">
            <div>
              <dt className="inline font-medium text-slate-800">사업자등록번호</dt>
              <dd className="ml-2 inline">123-45-67890</dd>
            </div>
            <div>
              <dt className="inline font-medium text-slate-800">통신판매업 신고</dt>
              <dd className="ml-2 inline">제 2026-서울강서-0000호</dd>
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
                카테고리
              </Link>
            </li>
            <li>
              <Link href="/brand" className="hover:text-slate-900">
                브랜드 스토리
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
          <p className="text-sm font-semibold text-slate-900">Trust & Contact</p>
          <ul className="mt-3 space-y-2 text-sm text-slate-600">
            <li>서울시 강서구 식품산업로 100</li>
            <li>02-1234-5678</li>
            <li>hello@kwangildryfood.co.kr</li>
            <li>평일 09:00 - 18:00 / 주말·공휴일 휴무</li>
            <li>고객센터: 1:1 상담 및 도매 전용 응대 가능</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-slate-200 py-5 text-center text-xs text-slate-500">
        © {new Date().getFullYear()} KWANGIL DRIED SEAFOOD. All rights reserved.
      </div>
    </footer>
  );
}
