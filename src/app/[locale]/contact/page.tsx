import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";

import { InquiryForm } from "@/components/contact/InquiryForm";
import { Reveal } from "@/components/ui/Reveal";
import { getProduct, getSettings } from "@/lib/content";
import { getDict } from "@/lib/i18n";
import type { Locale } from "@/lib/i18n/config";

export const dynamic = "force-dynamic";

type Props = {
  params: Promise<{ locale: Locale }>;
  searchParams: Promise<{ type?: string; product?: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  return pageMetadata(locale, "/contact", getDict(locale).meta.pages.contact);
}

/** CONTACT — 스토리의 종착점. 실제로 접수되는 문의 폼 + 연락처 */
export default async function ContactPage({ params, searchParams }: Props) {
  const { locale } = await params;
  const { type, product: productSlug } = await searchParams;
  const dict = getDict(locale);
  const t = dict.contact;
  const settings = getSettings(locale);
  const product = productSlug ? getProduct(locale, productSlug) : null;
  const defaultKind = type === "oem" ? "oem" : type === "general" ? "general" : "wholesale";

  return (
    <>
      <section className="section !pb-14">
        <div className="container-text">
          <Reveal>
            <p className="kicker">{t.kicker}</p>
            <h1 className="mt-6 whitespace-pre-line text-display text-ink-900">{t.title}</h1>
            <p className="prose-body mt-8">{t.lead}</p>
            {product && (
              <p className="mt-4 inline-block rounded-full bg-paper-warm px-4 py-2 text-sm font-medium text-ink-600">
                {t.productLabel} — <span className="font-semibold text-ink-900">{product.name}</span>
              </p>
            )}
          </Reveal>
        </div>
      </section>

      <section className="pb-20 md:pb-32">
        <div className="container-grid grid gap-14 lg:grid-cols-[1.4fr_1fr]">
          <Reveal>
            <InquiryForm
              labels={dict.inquiryForm}
              defaultKind={defaultKind}
              defaultProduct={productSlug ?? ""}
            />
          </Reveal>

          <Reveal delayMs={100}>
            <aside className="space-y-8">
              <div className="rounded-2xl border border-line p-8">
                <p className="kicker mb-4">{t.directKicker}</p>
                <ul className="space-y-3 text-sm text-ink-600">
                  <li>
                    <span className="font-semibold text-ink-900">{t.tel}</span> · {settings.contact_tel}
                  </li>
                  <li>
                    <span className="font-semibold text-ink-900">{t.fax}</span> · {settings.contact_fax}
                  </li>
                  <li>
                    <span className="font-semibold text-ink-900">{t.email}</span> · {settings.contact_email}
                  </li>
                  <li>
                    <span className="font-semibold text-ink-900">{t.address}</span> · {settings.contact_address}
                  </li>
                </ul>
              </div>

              {settings.contact_kakao && (
                <a
                  href={settings.contact_kakao}
                  target="_blank"
                  rel="noreferrer"
                  className="block rounded-2xl border border-line p-8 transition-colors hover:border-ink-400"
                >
                  <p className="kicker mb-3">{t.kakaoKicker}</p>
                  <p className="text-h3 text-ink-900">{t.kakaoTitle}</p>
                  <p className="mt-2 text-sm text-ink-600">{t.kakaoBody}</p>
                </a>
              )}

              <div className="rounded-2xl bg-paper-warm p-8">
                <p className="kicker mb-3">{t.noticeKicker}</p>
                <p className="text-sm leading-relaxed text-ink-600">{t.noticeBody}</p>
              </div>
            </aside>
          </Reveal>
        </div>
      </section>
    </>
  );
}
