import { cn } from "@/lib/utils";

type SectionLabelProps = {
  children: string;
  index?: string;
  className?: string;
};

export function SectionLabel({
  children,
  index,
  className,
}: SectionLabelProps) {
  return (
    <div
      className={cn(
        "section-label flex items-center text-xs font-semibold uppercase tracking-[0.18em] text-muted",
        className,
      )}
    >
      {index ? (
        <>
          <span className="section-label-index text-champagne">{index}</span>
          <span
            className="section-label-slash text-bronze"
            aria-hidden="true"
          >
            /
          </span>
        </>
      ) : null}
      <span className="section-label-text">{children}</span>
    </div>
  );
}
