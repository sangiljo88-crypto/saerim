import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

import { createInquiry } from "@/lib/db/repo";

export const runtime = "nodejs";

const inquirySchema = z.object({
  kind: z.enum(["wholesale", "oem", "general"]).default("general"),
  company: z.string().trim().min(1, "업체명을 입력해주세요.").max(100),
  name: z.string().trim().min(1, "담당자명을 입력해주세요.").max(50),
  phone: z
    .string()
    .trim()
    .min(9, "연락처를 확인해주세요.")
    .max(20)
    .regex(/^[0-9+\-() ]+$/, "숫자와 하이픈만 입력해주세요."),
  email: z.string().trim().email("이메일 형식을 확인해주세요.").max(100).or(z.literal("")).default(""),
  message: z.string().trim().max(2000).default(""),
  productSlug: z.string().trim().max(100).default(""),
});

export async function POST(request: NextRequest) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "잘못된 요청입니다." }, { status: 400 });
  }

  const parsed = inquirySchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, error: "입력값을 확인해주세요.", fieldErrors: parsed.error.flatten().fieldErrors },
      { status: 422 },
    );
  }

  const id = createInquiry(parsed.data);
  return NextResponse.json({ ok: true, id }, { status: 201 });
}
