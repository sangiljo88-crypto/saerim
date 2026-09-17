import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

import { createInquiry } from "@/lib/db/repo";
import { sendInquiryNotification } from "@/lib/email";
import { DEFAULT_LOCALE, isLocale, type Locale } from "@/lib/i18n/config";

export const runtime = "nodejs";

/** 검증 메시지는 접수자가 보고 있는 언어로 돌려준다. */
const MESSAGES: Record<Locale, Record<string, string>> = {
  ko: {
    company: "업체명을 입력해주세요.",
    name: "담당자명을 입력해주세요.",
    phone: "연락처를 확인해주세요.",
    phoneFormat: "숫자와 하이픈만 입력해주세요.",
    email: "이메일 형식을 확인해주세요.",
    badRequest: "잘못된 요청입니다.",
    invalid: "입력값을 확인해주세요.",
  },
  en: {
    company: "Please enter your company name.",
    name: "Please enter the contact person's name.",
    phone: "Please check the phone number.",
    phoneFormat: "Use digits, plus sign and hyphens only.",
    email: "Please check the email format.",
    badRequest: "Bad request.",
    invalid: "Please check the information you entered.",
  },
  zh: {
    company: "请填写公司名称。",
    name: "请填写联系人姓名。",
    phone: "请确认联系方式。",
    phoneFormat: "只能输入数字、加号与连字符。",
    email: "请确认邮箱格式。",
    badRequest: "请求格式有误。",
    invalid: "请检查填写内容。",
  },
};

const buildSchema = (m: Record<string, string>) =>
  z.object({
    kind: z.enum(["wholesale", "oem", "general"]).default("general"),
    company: z.string().trim().min(1, m.company).max(100),
    name: z.string().trim().min(1, m.name).max(50),
    phone: z
      .string()
      .trim()
      .min(9, m.phone)
      .max(20)
      .regex(/^[0-9+\-() ]+$/, m.phoneFormat),
    email: z.string().trim().email(m.email).max(100).or(z.literal("")).default(""),
    message: z.string().trim().max(2000).default(""),
    productSlug: z.string().trim().max(100).default(""),
    locale: z.string().trim().max(8).optional(),
  });

export async function POST(request: NextRequest) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: MESSAGES[DEFAULT_LOCALE].badRequest }, { status: 400 });
  }

  const rawLocale = (body as { locale?: unknown } | null)?.locale;
  const locale: Locale = isLocale(rawLocale) ? rawLocale : DEFAULT_LOCALE;
  const m = MESSAGES[locale];

  const parsed = buildSchema(m).safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, error: m.invalid, fieldErrors: parsed.error.flatten().fieldErrors },
      { status: 422 },
    );
  }

  const { kind, company, name, phone, email, message, productSlug } = parsed.data;
  const inquiry = { kind, company, name, phone, email, message, productSlug };
  const id = createInquiry(inquiry);

  // 메일 알림은 접수 성공과 무관하게 백그라운드로 발송 (실패해도 접수는 유지)
  sendInquiryNotification({ ...inquiry, locale }).catch((error) => {
    console.error("[inquiries] 메일 알림 발송 실패:", error);
  });

  return NextResponse.json({ ok: true, id }, { status: 201 });
}
