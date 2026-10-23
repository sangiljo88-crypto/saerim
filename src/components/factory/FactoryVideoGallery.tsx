import Link from "next/link";
import { FactoryVideo } from "@/components/factory/FactoryVideo";
import { SectionTitle } from "@/components/ui/brand";
import { Reveal } from "@/components/ui/Reveal";
import type { Factory } from "@/lib/db/types";
import { factoryVideoText, getFactoryVideo } from "@/lib/factory-videos";
import { href, type Locale } from "@/lib/i18n/config";

export function FactoryVideoGallery({ locale, factories }: { locale: Locale; factories: Factory[] }) {
  const t = factoryVideoText[locale];
  const films = factories.flatMap((factory) => {
    const video = getFactoryVideo(factory.slug, locale);
    return video ? [{ factory, video }] : [];
  });
  if (!films.length) return null;

  return (
    <section className="section hairline-t bg-paper-warm">
      <div className="container-grid">
        <SectionTitle kicker={t.kicker} title={t.title} lead={t.lead} />
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
          {films.map(({ factory, video }) => (
            <Reveal key={factory.slug} className="min-w-0">
              <div className="mb-5 flex flex-wrap items-baseline justify-between gap-3">
                <h3 className="text-h3 text-ink-900">{factory.name}</h3>
                <Link href={href(locale, `/factory/${factory.slug}`)} className="text-sm font-medium text-forest hover:underline">
                  {t.detail} <span aria-hidden="true">→</span>
                </Link>
              </div>
              <FactoryVideo {...video} locale={locale} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
