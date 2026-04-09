"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const STORAGE_KEY = "saerim-sample-popup-hide-date";

const getToday = () => {
  const now = new Date();
  const yyyy = now.getFullYear();
  const mm = String(now.getMonth() + 1).padStart(2, "0");
  const dd = String(now.getDate()).padStart(2, "0");
  return `${yyyy}-${mm}-${dd}`;
};

export function MarchCouponPopup() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    const hiddenDate = window.localStorage.getItem(STORAGE_KEY);
    if (hiddenDate === getToday()) {
      return;
    }

    const timer = window.setTimeout(() => setOpen(true), 300);
    return () => window.clearTimeout(timer);
  }, []);

  const closeToday = () => {
    if (typeof window !== "undefined") {
      window.localStorage.setItem(STORAGE_KEY, getToday());
    }
    setOpen(false);
  };

  if (!open) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-[90] flex items-center justify-center bg-black/45 px-4 backdrop-blur-[2px]">
      <div className="w-full max-w-md overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-2xl">
        <div className="bg-gradient-to-br from-amber-100 via-orange-100 to-rose-100 p-6 sm:p-7">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-700">B2B SAMPLE</p>
          <h3 className="mt-3 font-display text-3xl font-extrabold text-deep-950">새림 도매 샘플 상담</h3>
          <p className="mt-2 text-sm text-slate-700">국탕류·뒷고기류 소량 테스트 지원</p>
        </div>

        <div className="space-y-4 p-6 sm:p-7">
          <p className="text-sm leading-7 text-slate-600">
            필요한 품목과 월 사용량을 남겨주시면 담당자가 확인 후 연락드립니다. 소량 테스트 후 정기 납품 여부를
            결정하실 수 있습니다.
          </p>

          <div className="flex flex-col gap-2 sm:flex-row">
            <Link
              href="/wholesale"
              className="inline-flex flex-1 items-center justify-center rounded-full bg-deep-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
              onClick={() => setOpen(false)}
            >
              상담 페이지 이동
            </Link>
            <button
              type="button"
              className="inline-flex flex-1 items-center justify-center rounded-full border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition hover:border-slate-400"
              onClick={closeToday}
            >
              오늘 하루 닫기
            </button>
          </div>

          <button
            type="button"
            className="w-full text-center text-xs text-slate-500 underline-offset-2 hover:underline"
            onClick={() => setOpen(false)}
          >
            닫기
          </button>
        </div>
      </div>
    </div>
  );
}
