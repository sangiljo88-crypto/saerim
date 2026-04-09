import { Badge } from "@/components/ui/Badge";
import { GradientVisual } from "@/components/ui/GradientVisual";
import { SectionHeading } from "@/components/ui/SectionHeading";
import type { VisualAsset } from "@/types/catalog";

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
  return (
    <figure className={`group relative overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-soft ${ratioClassName}`}>
      <GradientVisual
        label={asset.alt}
        tone={asset.tone}
        src={asset.src}
        overlay="strong"
        loading={priority ? "eager" : "lazy"}
        showLabel={false}
        className="h-full rounded-none border-none"
      />
      <figcaption className="absolute inset-x-0 bottom-0 border-t border-white/25 bg-black/40 px-4 py-3 text-xs text-white backdrop-blur-sm sm:px-5">
        {!asset.src ? <Badge tone="light">AI 이미지 슬롯</Badge> : null}
        <p className={!asset.src ? "mt-2" : ""}>{asset.caption}</p>
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
