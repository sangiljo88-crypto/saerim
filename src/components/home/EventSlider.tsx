"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

type Slide = {
  id: string;
  badge: string;
  title: string;
  description: string;
  ctaLabel: string;
  href: string;
  gradientClass: string;
};

const slides: Slide[] = [
  {
    id: "sample-kit",
    badge: "B2B SAMPLE",
    title: "첫 거래 고객 샘플 상담",
    description: "국탕류·뒷고기류 핵심 품목을 소량 테스트 후 정기 납품으로 전환할 수 있습니다.",
    ctaLabel: "도매 문의하기",
    href: "/wholesale",
    gradientClass: "from-amber-100 via-orange-100 to-rose-100",
  },
  {
    id: "guktang-line",
    badge: "SOUP LINE",
    title: "국탕류 라인업 확인",
    description: "삶은 돈두, 소창, 염통, 오소리감투 등 국밥 매장용 핵심 원료를 확인하세요.",
    ctaLabel: "국탕류 보기",
    href: "/categories/guktang",
    gradientClass: "from-stone-100 via-amber-50 to-zinc-200",
  },
  {
    id: "dwitgogi-line",
    badge: "SPECIAL CUT",
    title: "뒷고기 특수부위 직송",
    description: "뽈항정·관자살·설하살 특수부위를 공장 직송으로 안정 공급합니다.",
    ctaLabel: "뒷고기류 보기",
    href: "/categories/dwitgogi",
    gradientClass: "from-sky-100 via-cyan-100 to-indigo-100",
  },
];

const AUTO_MS = 4800;

export function EventSlider() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) {
      return;
    }

    const timer = window.setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % slides.length);
    }, AUTO_MS);

    return () => window.clearInterval(timer);
  }, [paused]);

  return (
    <section
      className="relative overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-soft"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div
        className="flex transition-transform duration-700 ease-out"
        style={{ transform: `translateX(-${activeIndex * 100}%)` }}
      >
        {slides.map((slide) => (
          <article key={slide.id} className="w-full shrink-0 p-7 sm:p-10">
            <div className={`rounded-3xl bg-gradient-to-br ${slide.gradientClass} p-6 sm:p-8`}>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-700">{slide.badge}</p>
              <h3 className="mt-3 font-display text-2xl font-bold leading-tight text-deep-950 sm:text-3xl">{slide.title}</h3>
              <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-700 sm:text-base">{slide.description}</p>
              <Link
                href={slide.href}
                className="mt-6 inline-flex items-center rounded-full bg-deep-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
              >
                {slide.ctaLabel}
              </Link>
            </div>
          </article>
        ))}
      </div>

      <div className="absolute bottom-4 right-5 flex items-center gap-2">
        {slides.map((slide, index) => (
          <button
            key={slide.id}
            type="button"
            aria-label={`${index + 1}번 슬라이드 보기`}
            onClick={() => setActiveIndex(index)}
            className={`h-2.5 rounded-full transition ${
              activeIndex === index ? "w-7 bg-deep-950" : "w-2.5 bg-slate-300"
            }`}
          />
        ))}
      </div>
    </section>
  );
}
