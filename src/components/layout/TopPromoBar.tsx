export function TopPromoBar() {
  return (
    <aside className="fixed inset-x-0 top-0 z-[70] border-b border-brand-300 bg-gradient-to-r from-brand-700 via-brand-600 to-brand-700 text-white">
      <div className="mx-auto flex h-[var(--top-promo-height)] max-w-6xl items-center justify-center gap-3 px-4 text-xs sm:text-sm">
        <p className="font-medium tracking-[0.01em]">HACCP 공장 직송 · 오전 10시 이전 주문 당일 출고</p>
        <a
          href="https://open.kakao.com/o/pRSmEn9h"
          target="_blank"
          rel="noreferrer"
          className="rounded-full border border-white/50 px-3 py-1 text-[11px] font-semibold transition hover:bg-white/15 sm:text-xs"
        >
          카카오 상담
        </a>
      </div>
    </aside>
  );
}
