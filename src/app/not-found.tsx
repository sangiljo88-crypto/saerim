import Link from "next/link";

export default function NotFoundPage() {
  return (
    <div className="container-text py-32 text-center">
      <p className="kicker">404</p>
      <h1 className="mt-4 text-h1 text-ink-900">페이지를 찾을 수 없습니다</h1>
      <p className="prose-body mx-auto mt-4">요청하신 페이지가 없거나 이동되었습니다.</p>
      <Link href="/" className="cta-primary mt-10">
        홈으로 이동
      </Link>
    </div>
  );
}
