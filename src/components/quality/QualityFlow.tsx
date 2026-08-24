"use client";

import { useState } from "react";

import type { QualityStep } from "@/lib/db/types";

/**
 * 품질 8단계 인터랙티브 스텝퍼.
 * 단계를 클릭하면 상세·관리 기준이 전환된다. 키보드(←/→) 지원.
 */
export function QualityFlow({
  steps,
  labels,
}: {
  steps: QualityStep[];
  labels: { listLabel: string; metricLabel: string; prev: string; next: string };
}) {
  const [activeIndex, setActiveIndex] = useState(0);
  const active = steps[activeIndex];

  if (!active) return null;

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowRight") setActiveIndex((i) => Math.min(i + 1, steps.length - 1));
    if (e.key === "ArrowLeft") setActiveIndex((i) => Math.max(i - 1, 0));
  };

  return (
    <div onKeyDown={onKeyDown}>
      {/* 스텝 트랙 */}
      <ol className="relative flex flex-wrap items-center gap-y-6" role="tablist" aria-label={labels.listLabel}>
        {steps.map((step, i) => {
          const isActive = i === activeIndex;
          const isPassed = i < activeIndex;
          return (
            <li key={step.stepNo} className="flex items-center">
              <button
                type="button"
                role="tab"
                aria-selected={isActive}
                onClick={() => setActiveIndex(i)}
                className="group flex flex-col items-center gap-2 px-1 focus:outline-none"
              >
                <span
                  className={`flex h-11 w-11 items-center justify-center rounded-full border text-sm font-bold transition-all ${
                    isActive
                      ? "scale-110 border-accent bg-accent text-white"
                      : isPassed
                        ? "border-ink-900 bg-ink-900 text-white"
                        : "border-line bg-white text-ink-400 group-hover:border-ink-400"
                  }`}
                >
                  {step.stepNo}
                </span>
                <span
                  className={`text-xs font-semibold ${isActive ? "text-accent" : "text-ink-600"}`}
                >
                  {step.name}
                </span>
              </button>
              {i < steps.length - 1 && (
                <span
                  aria-hidden
                  className={`mx-1 mb-6 hidden h-px w-6 sm:block lg:w-12 ${isPassed ? "bg-ink-900" : "bg-line"}`}
                />
              )}
            </li>
          );
        })}
      </ol>

      {/* 상세 패널 */}
      <div
        key={active.stepNo}
        role="tabpanel"
        className="mt-12 grid gap-10 rounded-2xl border border-line bg-white p-8 md:grid-cols-[1fr_auto] md:p-12"
        style={{ animation: "quality-fade 0.35s ease-out" }}
      >
        <div>
          <p className="kicker">
            STEP {active.stepNo} · {active.nameEn}
          </p>
          <h3 className="mt-3 text-h1 text-ink-900">{active.name}</h3>
          <p className="mt-4 text-lg font-medium text-ink-900">{active.summary}</p>
          <p className="prose-body mt-4">{active.detail}</p>
        </div>
        <div className="flex flex-col justify-end md:w-64">
          <div className="rounded-xl bg-trust-soft p-6">
            <p className="text-label uppercase tracking-[0.14em] text-trust">{labels.metricLabel}</p>
            <p className="mt-2 text-sm font-semibold leading-relaxed text-trust">{active.metric}</p>
          </div>
        </div>
      </div>

      {/* 이전/다음 */}
      <div className="mt-6 flex items-center justify-between text-sm">
        <button
          type="button"
          onClick={() => setActiveIndex((i) => Math.max(i - 1, 0))}
          disabled={activeIndex === 0}
          className="font-semibold text-ink-600 transition-colors hover:text-ink-900 disabled:opacity-30"
        >
          {labels.prev}
        </button>
        <p className="text-ink-400">
          {activeIndex + 1} / {steps.length}
        </p>
        <button
          type="button"
          onClick={() => setActiveIndex((i) => Math.min(i + 1, steps.length - 1))}
          disabled={activeIndex === steps.length - 1}
          className="font-semibold text-ink-600 transition-colors hover:text-ink-900 disabled:opacity-30"
        >
          {labels.next}
        </button>
      </div>

      <style jsx>{`
        @keyframes quality-fade {
          from {
            opacity: 0;
            transform: translateY(8px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}
