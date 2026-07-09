import { NextRequest, NextResponse } from "next/server";

/**
 * /admin Basic 인증.
 * 계정은 환경변수 ADMIN_USER / ADMIN_PASSWORD 로 설정한다 (.env 참고).
 */
export function middleware(request: NextRequest) {
  const user = process.env.ADMIN_USER;
  const password = process.env.ADMIN_PASSWORD;

  // 계정이 설정되지 않은 경우 관리자 접근을 전면 차단한다.
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

export const config = {
  matcher: ["/admin/:path*", "/admin"],
};
