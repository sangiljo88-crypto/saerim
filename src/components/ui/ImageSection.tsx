import Image from "next/image";

import { Badge } from "@/components/ui/Badge";
import { SectionHeading } from "@/components/ui/SectionHeading";
import type { VisualAsset } from "@/types/catalog";

const toneMap: Record<string, string> = {
  sunset: "from-amber-100 via-orange-100 to-rose-100",
  sea: "from-cyan-100 via-sky-100 to-blue-100",
  forest: "from-emerald-100 via-green-100 to-lime-100",
  night: "from-slate-200 via-indigo-100 to-slate-100",
  sand: "from-amber-100 via-yellow-50 to-stone-100",
  stone: "from-zinc-100 via-stone-100 to-neutral-200",
  "anchovy-gold": "from-amber-100 via-orange-100 to-amber-200",
  "anchovy-blue": "from-sky-100 via-blue-100 to-indigo-100",
  "shrimp-coral": "from-orange-100 via-rose-100 to-amber-100",
  "shrimp-sand": "from-amber-50 via-orange-50 to-yellow-100",
  "kelp-deep": "from-emerald-100 via-green-100 to-teal-100",
  "seaweed-green": "from-lime-100 via-emerald-100 to-green-100",
  "squid-night": "from-slate-300 via-indigo-100 to-slate-200",
  "mix-platter": "from-zinc-100 via-stone-100 to-amber-50",
  "soup-kit": "from-yellow-100 via-amber-100 to-orange-100",
  "gift-elegant": "from-stone-100 via-amber-50 to-zinc-200",
};

type ImageSectionProps = {
  eyebrow: string;
  title: string;
  description?: string;
  hero: VisualAsset;
  gallery: VisualAsset[];
  className?: string;
};

type VisualCardProps = {
  asset: VisualAsset;
  ratioClassName: string;
  priority?: boolean;
};

function VisualCard({ asset, ratioClassName, priority = false }: VisualCardProps) {
  const imageSrc = asset.src;
  const gradient = toneMap[asset.tone ?? "sea"] ?? toneMap.sea;

  return (
    <figure className={`group relative overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-soft ${ratioClassName}`}>
      {imageSrc ? (
        <Image
          src={imageSrc}
          alt={asset.alt}
          fill
          unoptimized
          sizes="(max-width: 1024px) 100vw, 50vw"
          className="object-cover transition duration-500 group-hover:scale-[1.02]"
          loading={priority ? "eager" : "lazy"}
        />
      ) : (
        <div className={`relative h-full w-full bg-gradient-to-br ${gradient}`}>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_18%,rgba(255,255,255,0.65),transparent_35%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_85%_82%,rgba(255,255,255,0.5),transparent_32%)]" />
          <div className="relative flex h-full items-end p-5 sm:p-6">
            <div>
              <Badge tone="light">AI 이미지 슬롯</Badge>
              <p className="mt-2 text-sm font-semibold text-deep-950/85">{asset.alt}</p>
            </div>
          </div>
        </div>
      )}
      <figcaption className="absolute inset-x-0 bottom-0 border-t border-white/30 bg-black/35 px-4 py-3 text-xs text-white backdrop-blur-sm sm:px-5">
        {asset.caption}
      </figcaption>
    </figure>
  );
}

export function ImageSection({
  eyebrow,
  title,
  description,
  hero,
  gallery,
  className = "",
}: ImageSectionProps) {
  const normalizedGallery = gallery.slice(0, 4);

  return (
    <section className={className}>
      <SectionHeading eyebrow={eyebrow} title={title} description={description} />
      <div className="mt-8 grid gap-4 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <VisualCard asset={hero} ratioClassName="aspect-[16/10]" priority />
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:col-span-5">
          {normalizedGallery.map((asset, index) => (
            <VisualCard key={`${asset.alt}-${index}`} asset={asset} ratioClassName="aspect-[4/3]" />
          ))}
        </div>
      </div>
    </section>
  );
}
