type SectionHeadingProps = {
  eyebrow: string;
  title: string;
  description?: string;
  centered?: boolean;
};

export function SectionHeading({
  eyebrow,
  title,
  description,
  centered = false,
}: SectionHeadingProps) {
  return (
    <div className={centered ? "text-center" : "text-left"}>
      <p className="text-xs font-semibold uppercase tracking-[0.22em] text-brand-700">{eyebrow}</p>
      <h2 className="mt-3 font-display text-3xl font-bold leading-tight text-deep-950 sm:text-4xl">
        {title}
      </h2>
      {description ? (
        <p className="mt-4 max-w-3xl text-sm leading-7 text-slate-600 sm:text-base">{description}</p>
      ) : null}
    </div>
  );
}
