import Link from "next/link";

type MobileStickyCtaProps = {
  smartstoreUrl: string;
  gmarketUrl: string;
  wholesaleHref: string;
};

export function MobileStickyCta({ smartstoreUrl, gmarketUrl, wholesaleHref }: MobileStickyCtaProps) {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-slate-200 bg-white/95 p-3 shadow-[0_-8px_24px_rgba(15,23,42,0.12)] backdrop-blur md:hidden">
      <div className="mx-auto flex max-w-6xl items-center gap-2">
        <a
          href={smartstoreUrl}
          target="_blank"
          rel="noreferrer"
          className="flex-1 rounded-full bg-deep-950 px-3 py-3 text-center text-xs font-semibold text-white"
        >
          SmartStore 구매
        </a>
        <a
          href={gmarketUrl}
          target="_blank"
          rel="noreferrer"
          className="flex-1 rounded-full border border-slate-300 bg-white px-3 py-3 text-center text-xs font-semibold text-slate-700"
        >
          카카오 상담
        </a>
        <Link
          href={wholesaleHref}
          className="flex-1 rounded-full border border-brand-600 bg-brand-50 px-3 py-3 text-center text-xs font-semibold text-brand-700"
        >
          도매문의
        </Link>
      </div>
    </div>
  );
}
