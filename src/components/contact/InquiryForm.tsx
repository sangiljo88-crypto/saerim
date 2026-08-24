"use client";

import { useState } from "react";

import type { Dictionary } from "@/lib/i18n/ko";
import { useParams } from "next/navigation";

type FieldErrors = Partial<Record<"company" | "name" | "phone" | "email" | "message", string[]>>;

/** 문의 폼 — /api/inquiries 로 접수되어 관리자 문의함에 저장된다 */
export function InquiryForm({
  labels,
  defaultKind = "wholesale",
  defaultProduct = "",
}: {
  labels: Dictionary["inquiryForm"];
  defaultKind?: string;
  defaultProduct?: string;
}) {
  const params = useParams<{ locale?: string }>();
  const locale = params?.locale === "zh" ? "zh" : "ko";
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
      locale,
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
      setErrorMessage(data.error ?? labels.failed);
      setState("error");
    } catch {
      setErrorMessage(labels.networkError);
      setState("error");
    }
  }

  if (state === "done") {
    return (
      <div className="rounded-2xl border border-line bg-white p-10 text-center">
        <p className="text-h2 text-ink-900">{labels.doneTitle}</p>
        <p className="prose-body mx-auto mt-3 whitespace-pre-line">{labels.doneBody}</p>
        <p className="mt-6 text-sm font-medium text-accent">{labels.doneSignature}</p>
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
        <legend className={labelCls}>{labels.kindLegend}</legend>
        <div className="flex flex-wrap gap-2">
          {labels.kinds.map((kind) => (
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
            {labels.company} <span className="text-accent">*</span>
          </label>
          <input id="company" name="company" required className={inputCls} placeholder={labels.companyPlaceholder} />
          {errors.company && <p className={errCls}>{errors.company[0]}</p>}
        </div>
        <div>
          <label htmlFor="name" className={labelCls}>
            {labels.name} <span className="text-accent">*</span>
          </label>
          <input id="name" name="name" required className={inputCls} placeholder={labels.namePlaceholder} />
          {errors.name && <p className={errCls}>{errors.name[0]}</p>}
        </div>
        <div>
          <label htmlFor="phone" className={labelCls}>
            {labels.phone} <span className="text-accent">*</span>
          </label>
          <input id="phone" name="phone" required className={inputCls} placeholder={labels.phonePlaceholder} />
          {errors.phone && <p className={errCls}>{errors.phone[0]}</p>}
        </div>
        <div>
          <label htmlFor="email" className={labelCls}>
            {labels.email}
          </label>
          <input id="email" name="email" type="email" className={inputCls} placeholder={labels.emailPlaceholder} />
          {errors.email && <p className={errCls}>{errors.email[0]}</p>}
        </div>
      </div>

      <div>
        <label htmlFor="message" className={labelCls}>
          {labels.message}
        </label>
        <textarea
          id="message"
          name="message"
          rows={5}
          className={inputCls}
          placeholder={labels.messagePlaceholder}
        />
        {errors.message && <p className={errCls}>{errors.message[0]}</p>}
      </div>

      {errorMessage && <p className="text-sm font-medium text-accent">{errorMessage}</p>}

      <button type="submit" disabled={state === "submitting"} className="cta-primary w-full disabled:opacity-60">
        {state === "submitting" ? labels.submitting : labels.submit}
      </button>
    </form>
  );
}
