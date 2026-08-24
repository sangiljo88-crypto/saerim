import { NextRequest, NextResponse } from "next/server";

import {
  DEFAULT_LOCALE,
  LOCALES,
  LOCALE_HEADER,
  PATH_HEADER,
  stripLocale,
  type Locale,
} from "@/lib/i18n/config";

/**
 * 1) /admin Basic 인증 (계정: 환경변수 ADMIN_USER / ADMIN_PASSWORD)
 * 2) 로케일 라우팅
 *    - /zh/...  → 그대로 통과 (중국어)
 *    - 그 외 공개 경로 → 내부적으로 /ko/... 로 rewrite (기존 한국어 URL 유지)
 *    현재 로케일은 요청 헤더(x-saerim-locale)로 실어 보낸다.
 */

function adminAuth(request: NextRequest): NextResponse | null {
  const user = process.env.ADMIN_USER;
  const password = process.env.ADMIN_PASSWORD;

  if (!user || !password) {
    return new NextResponse("관리자 계정이 설정되지 않았습니다. (.env: ADMIN_USER / ADMIN_PASSWORD)", {
      status: 503,
    });
  }

  const auth = request.headers.get("authorization");
  if (auth?.startsWith("Basic ")) {
    const decoded = Buffer.from(auth.slice(6), "base64").toString();
    const idx = decoded.indexOf(":");
    if (decoded.slice(0, idx) === user && decoded.slice(idx + 1) === password) {
      return NextResponse.next();
    }
  }

  return new NextResponse("인증이 필요합니다.", {
    status: 401,
    headers: { "WWW-Authenticate": 'Basic realm="Saerim Admin", charset="UTF-8"' },
  });
}

function localeOf(pathname: string): Locale | null {
  for (const locale of LOCALES) {
    if (pathname === `/${locale}` || pathname.startsWith(`/${locale}/`)) return locale;
  }
  return null;
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname === "/admin" || pathname.startsWith("/admin/")) {
    return adminAuth(request) ?? NextResponse.next();
  }

  const prefixed = localeOf(pathname);
  const locale = prefixed ?? DEFAULT_LOCALE;

  const headers = new Headers(request.headers);
  headers.set(LOCALE_HEADER, locale);
  headers.set(PATH_HEADER, stripLocale(pathname));

  // 이미 /ko · /zh 로 들어온 요청은 그대로, 접두사 없는 요청은 /ko 로 내부 rewrite
  if (prefixed) {
    return NextResponse.next({ request: { headers } });
  }

  const url = request.nextUrl.clone();
  url.pathname = `/${DEFAULT_LOCALE}${pathname === "/" ? "" : pathname}`;
  return NextResponse.rewrite(url, { request: { headers } });
}

export const config = {
  matcher: [
    /*
     * 아래를 제외한 모든 경로에 적용:
     * - api (문의 접수 등 API 라우트)
     * - _next (프레임워크 자산)
     * - 파일 확장자가 있는 정적 파일(.jpg, .svg, .xml …)
     */
    "/((?!api|_next|.*\\.[\\w]+$).*)",
  ],
};
