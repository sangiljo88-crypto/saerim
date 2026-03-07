import Link from "next/link";

export default function NotFoundPage() {
  return (
    <div className="landing-section py-20 text-center">
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-700">404</p>
      <h1 className="mt-3 font-display text-4xl font-bold text-deep-950">페이지를 찾을 수 없습니다</h1>
      <p className="mt-4 text-sm text-slate-600">요청하신 페이지가 없거나 이동되었습니다.</p>
      <Link
        href="/"
        className="mt-8 inline-flex items-center justify-center rounded-full bg-deep-950 px-6 py-3 text-sm font-semibold text-white"
      >
        홈으로 이동
      </Link>
    </div>
  );
}
