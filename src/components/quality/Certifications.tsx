import { Reveal } from "@/components/ui/Reveal";
import { SectionTitle } from "@/components/ui/brand";
import type { Dictionary } from "@/lib/i18n";

/**
 * Certifications & Track Record — 선언 대신 증거.
 * 보유하지 않은 인증은 "준비 중"으로만 표기한다. 인증번호는 확인된 항목만 노출한다.
 */
export function Certifications({ t }: { t: Dictionary["quality"]["certs"] }) {
  return (
    <section id="certifications" className="section hairline-t">
      <div className="container-text">
        <SectionTitle kicker={t.kicker} title={t.title} lead={t.lead} />
        <Reveal>
          <ul className="divide-y divide-line border-y border-line">
            {t.items.map((item) => {
              const inProgress = item.status === "in_progress";
              const meta = [item.issuer, item.issued, item.number && `${t.numberLabel} ${item.number}`]
                .filter(Boolean)
                .join(" · ");
              return (
                <li key={item.id} className="flex items-start justify-between gap-6 py-5">
                  <div>
                    <p className="text-body font-semibold text-ink-900">{item.name}</p>
                    {meta && <p className="mt-1 text-sm text-ink-400">{meta}</p>}
                  </div>
                  <span
                    className={`mt-0.5 shrink-0 whitespace-nowrap rounded-full border px-3 py-1 text-xs font-semibold ${
                      inProgress ? "border-line text-ink-400" : "border-ink-900 text-ink-900"
                    }`}
                  >
                    {inProgress ? t.statusInProgress : t.statusValid}
                  </span>
                </li>
              );
            })}
          </ul>
          <p className="mt-5 text-sm text-ink-400">{t.inProgressNote}</p>
        </Reveal>

        <Reveal>
          <div className="mt-16">
            <p className="kicker">{t.trackKicker}</p>
            <h3 className="mt-4 text-h2 text-ink-900">{t.trackTitle}</h3>
            <p className="prose-body mt-5">{t.trackLead}</p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
