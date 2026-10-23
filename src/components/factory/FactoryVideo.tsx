"use client";

import { useEffect, useRef, useState } from "react";
import { factoryVideoText } from "@/lib/factory-videos";
import type { Locale } from "@/lib/i18n/config";

type Props = { id: string; title: string; locale: Locale };

/** Load the external player only after a visitor chooses to watch. */
export function FactoryVideo({ id, title, locale }: Props) {
  const [playing, setPlaying] = useState(false);
  const player = useRef<HTMLIFrameElement>(null);
  const t = factoryVideoText[locale];

  useEffect(() => {
    if (playing) player.current?.focus();
  }, [playing]);

  return (
    <div className="min-w-0">
      <div className="relative aspect-video min-h-[200px] w-full overflow-hidden rounded-2xl bg-deep">
        {playing ? (
          <iframe
            ref={player}
            src={`https://www.youtube-nocookie.com/embed/${id}?autoplay=1&playsinline=1&rel=0&hl=${locale === "zh" ? "zh-Hans" : locale}`}
            title={title}
            className="absolute inset-0 h-full w-full border-0"
            allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          />
        ) : (
          <button
            type="button"
            onClick={() => setPlaying(true)}
            aria-label={`${t.play}: ${title}`}
            className="group absolute inset-0 flex h-full w-full items-center justify-center focus-visible:outline focus-visible:outline-4 focus-visible:-outline-offset-4 focus-visible:outline-white"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={`https://i.ytimg.com/vi/${id}/hqdefault.jpg`}
              alt=""
              loading="lazy"
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 motion-safe:group-hover:scale-[1.03]"
            />
            <span className="absolute inset-0 bg-black/25 transition-colors group-hover:bg-black/35" aria-hidden />
            <span className="relative flex flex-col items-center gap-3 text-white">
              <span className="flex h-16 w-16 items-center justify-center rounded-full border border-white/50 bg-deep/90 transition-transform motion-safe:group-hover:scale-105">
                <svg viewBox="0 0 24 24" className="ml-1 h-7 w-7 fill-current" aria-hidden="true"><path d="M8 5v14l11-7z" /></svg>
              </span>
              <span className="text-sm font-semibold tracking-wide">{t.play}</span>
            </span>
          </button>
        )}
      </div>
      <div className="mt-3 flex flex-wrap items-start justify-between gap-x-4 gap-y-2 text-sm">
        <p className="font-medium text-ink-600">{title}</p>
        <a
          href={`https://www.youtube.com/watch?v=${id}`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-ink-400 underline decoration-line underline-offset-4 transition-colors hover:text-forest"
        >
          {t.watch} <span aria-hidden="true">↗</span>
        </a>
      </div>
    </div>
  );
}
