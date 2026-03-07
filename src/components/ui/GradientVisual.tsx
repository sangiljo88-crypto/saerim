const paletteMap: Record<string, string> = {
  sunset: "from-amber-100 via-orange-100 to-rose-100",
  sea: "from-cyan-100 via-sky-100 to-blue-100",
  forest: "from-emerald-100 via-green-100 to-lime-100",
  night: "from-slate-200 via-indigo-100 to-slate-100",
  sand: "from-amber-100 via-yellow-50 to-stone-100",
  stone: "from-zinc-100 via-stone-100 to-neutral-200",
  "anchovy-gold": "from-amber-100 via-orange-100 to-amber-200",
  "anchovy-blue": "from-sky-100 via-blue-100 to-indigo-100",
  "shrimp-coral": "from-orange-100 via-rose-100 to-amber-100",
  "shrimp-sand": "from-amber-50 via-orange-50 to-yellow-100",
  "kelp-deep": "from-emerald-100 via-green-100 to-teal-100",
  "seaweed-green": "from-lime-100 via-emerald-100 to-green-100",
  "squid-night": "from-slate-300 via-indigo-100 to-slate-200",
  "mix-platter": "from-zinc-100 via-stone-100 to-amber-50",
  "soup-kit": "from-yellow-100 via-amber-100 to-orange-100",
  "gift-elegant": "from-stone-100 via-amber-50 to-zinc-200",
};

type GradientVisualProps = {
  label: string;
  tone?: string;
  className?: string;
};

export function GradientVisual({ label, tone = "sea", className = "" }: GradientVisualProps) {
  const gradient = paletteMap[tone] ?? paletteMap.sea;

  return (
    <div
      className={`relative overflow-hidden rounded-3xl border border-white/70 bg-gradient-to-br ${gradient} ${className}`}
      aria-label={label}
    >
      <div className="absolute -left-8 -top-8 h-28 w-28 rounded-full bg-white/40 blur-xl" />
      <div className="absolute -bottom-8 -right-8 h-32 w-32 rounded-full bg-white/50 blur-xl" />
      <div className="relative flex h-full min-h-[220px] items-end p-6">
        <p className="font-display text-lg font-semibold text-deep-950/80">{label}</p>
      </div>
    </div>
  );
}
