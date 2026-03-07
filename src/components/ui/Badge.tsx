type BadgeTone = "light" | "dark" | "accent";

type BadgeProps = {
  children: string;
  tone?: BadgeTone;
};

const toneMap: Record<BadgeTone, string> = {
  light: "border-slate-200 bg-white text-slate-700",
  dark: "border-slate-700 bg-slate-900 text-white",
  accent: "border-brand-200 bg-brand-50 text-brand-700",
};

export function Badge({ children, tone = "accent" }: BadgeProps) {
  return (
    <span className={`inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold tracking-[0.01em] ${toneMap[tone]}`}>
      {children}
    </span>
  );
}
