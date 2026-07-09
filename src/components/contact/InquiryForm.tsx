"use client";

import { useState } from "react";

type FieldErrors = Partial<Record<"company" | "name" | "phone" | "email" | "message", string[]>>;

const KINDS = [
  { value: "wholesale", label: "도매 공급" },
  { value: "oem", label: "OEM 생산" },
  { value: "general", label: "일반 문의" },
] as const;

/** 문의 폼 — /api/inquiries 로 접수되어 관리자 문의함에 저장된다 */
export function InquiryForm({
  defaultKind = "wholesale",
  defaultProduct = "",
}: {
  defaultKind?: string;
  defaultProduct?: string;
}) {
  const [state, setState] = useState<"idle" | "submitting" | "done" | "error">("idle");
  const [errors, setErrors] = useState<FieldErrors>({});
  const [errorMessage, setErrorMessage] = useState("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setState("submitting");
    setErrors({});
    setErrorMessage("");

    const form = new FormData(e.currentTarget);
    const payload = {
      kind: String(form.get("kind") ?? "general"),
      company: String(form.get("company") ?? ""),
      name: String(form.get("name") ?? ""),
      phone: String(form.get("phone") ?? ""),
      email: String(form.get("email") ?? ""),
      message: String(form.get("message") ?? ""),
      productSlug: defaultProduct,
    };

    try {
      const res = await fetch("/api/inquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();

      if (res.ok && data.ok) {
        setState("done");
        return;
      }
      setErrors(data.fieldErrors ?? {});
      setErrorMessage(data.error ?? "접수에 실패했습니다. 잠시 후 다시 시도해주세요.");
      setState("error");
    } catch {
      setErrorMessage("네트워크 오류가 발생했습니다. 잠시 후 다시 시도해주세요.");
      setState("error");
    }
  }

  if (state === "done") {
    return (
      <div className="rounded-2xl border border-line bg-white p-10 text-center">
        <p className="text-h2 text-ink-900">문의가 접수되었습니다.</p>
        <p className="prose-body mx-auto mt-3">
          담당자가 영업일 기준 1일 이내에 연락드립니다.
          <br />
          급하신 경우 063-464-8681로 전화 주세요.
        </p>
        <p className="mt-6 text-sm font-medium text-accent">오늘도 사장님 가게의 완판을 빕니다.</p>
      </div>
    );
  }

  const inputCls =
    "w-full rounded-xl border border-line bg-white px-4 py-3 text-sm text-ink-900 placeholder:text-ink-400 focus:border-ink-900 focus:outline-none";
  const labelCls = "mb-2 block text-sm font-semibold text-ink-900";
  const errCls = "mt-1.5 text-xs font-medium text-accent";

  return (
    <form onSubmit={onSubmit} className="space-y-6" noValidate>
      <fieldset>
        <legend className={labelCls}>문의 유형</legend>
        <div className="flex flex-wrap gap-2">
          {KINDS.map((kind) => (
            <label key={kind.value} className="cursor-pointer">
              <input
                type="radio"
                name="kind"
                value={kind.value}
                defaultChecked={kind.value === defaultKind}
                className="peer sr-only"
              />
              <span className="inline-block rounded-full border border-line px-5 py-2 text-sm font-semibold text-ink-600 transition-colors peer-checked:border-ink-900 peer-checked:bg-ink-900 peer-checked:text-white">
                {kind.label}
              </span>
            </label>
          ))}
        </div>
      </fieldset>

      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <label htmlFor="company" className={labelCls}>
            업체명 <span className="text-accent">*</span>
          </label>
          <input id="company" name="company" required className={inputCls} placeholder="예) 군산옥산국밥" />
          {errors.company && <p className={errCls}>{errors.company[0]}</p>}
        </div>
        <div>
          <label htmlFor="name" className={labelCls}>
            담당자명 <span className="text-accent">*</span>
          </label>
          <input id="name" name="name" required className={inputCls} placeholder="예) 홍길동" />
          {errors.name && <p className={errCls}>{errors.name[0]}</p>}
        </div>
        <div>
          <label htmlFor="phone" className={labelCls}>
            연락처 <span className="text-accent">*</span>
          </label>
          <input id="phone" name="phone" required className={inputCls} placeholder="010-0000-0000" />
          {errors.phone && <p className={errCls}>{errors.phone[0]}</p>}
        </div>
        <div>
          <label htmlFor="email" className={labelCls}>
            이메일
          </label>
          <input id="email" name="email" type="email" className={inputCls} placeholder="선택 입력" />
          {errors.email && <p className={errCls}>{errors.email[0]}</p>}
        </div>
      </div>

      <div>
        <label htmlFor="message" className={labelCls}>
          문의 내용
        </label>
        <textarea
          id="message"
          name="message"
          rows={5}
          className={inputCls}
          placeholder="품목, 수량, 납기 조건을 알려주시면 더 정확한 제안을 드릴 수 있습니다."
        />
        {errors.message && <p className={errCls}>{errors.message[0]}</p>}
      </div>

      {errorMessage && <p className="text-sm font-medium text-accent">{errorMessage}</p>}

      <button type="submit" disabled={state === "submitting"} className="cta-primary w-full disabled:opacity-60">
        {state === "submitting" ? "접수 중…" : "문의 접수하기"}
      </button>
    </form>
  );
}
