import Link from "next/link";

type ExternalBuyButtonsProps = {
  smartstoreUrl: string;
  gmarketUrl: string;
  wholesaleHref: string;
  className?: string;
};

export function ExternalBuyButtons({
  smartstoreUrl,
  gmarketUrl,
  wholesaleHref,
  className = "",
}: ExternalBuyButtonsProps) {
  return (
    <div className={`grid gap-3 sm:grid-cols-3 ${className}`}>
      <a
        href={smartstoreUrl}
        target="_blank"
        rel="noreferrer"
        className="inline-flex items-center justify-center rounded-full bg-white px-5 py-3 text-sm font-semibold text-deep-950 transition hover:-translate-y-0.5 hover:bg-slate-100"
      >
        Buy on SmartStore
      </a>
      <a
        href={gmarketUrl}
        target="_blank"
        rel="noreferrer"
        className="inline-flex items-center justify-center rounded-full border border-white/60 bg-transparent px-5 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-white/10"
      >
        Buy on Gmarket
      </a>
      <Link
        href={wholesaleHref}
        className="inline-flex items-center justify-center rounded-full border border-brand-300 bg-brand-100 px-5 py-3 text-sm font-semibold text-brand-900 transition hover:-translate-y-0.5 hover:bg-brand-200"
      >
        Request Wholesale
      </Link>
    </div>
  );
}
