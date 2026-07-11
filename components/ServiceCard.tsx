import Link from "next/link";

import type { Service } from "@/data/services";
import { featureIconSizes } from "@/lib/icons";

import { FeatureIcon } from "./FeatureIcon";

const serviceIcons = {
  "interior-visualization": "interior",
  "exterior-visualization": "exterior",
  "commercial-spaces": "commercial",
} as const;

export function ServiceCard({ item }: { item: Service }) {
  const categoryLabel = item.eyebrow.replace(/^\d+\s*\/\s*/, "");

  return (
    <article className="service-card group relative overflow-hidden border-t border-line">
      <Link
        href={item.href}
        className="grid min-h-32 gap-6 py-9 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-champagne md:grid-cols-[0.5fr_1fr_auto] md:items-start md:px-8"
      >
        <span className="absolute left-0 top-0 h-full w-px bg-bronze/0 transition-colors duration-200 group-hover:bg-bronze/70" />
        <span className="flex items-center gap-4 text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-muted transition-colors duration-200 group-hover:text-champagne">
          <span className="grid h-12 w-12 shrink-0 place-items-center border border-line bg-black/35 transition-colors duration-200 group-hover:border-bronze/50 group-hover:bg-bronze/[0.06]">
            <FeatureIcon
              name={serviceIcons[item.slug]}
              className={featureIconSizes.compact.className}
              strokeWidth={featureIconSizes.compact.strokeWidth}
            />
          </span>
          <span>{categoryLabel}</span>
        </span>
        <div className="max-w-2xl">
          <h3 className="text-2xl font-medium tracking-[-0.03em] text-ivory transition-colors duration-200 group-hover:text-champagne md:text-3xl">
            {item.shortTitle}
          </h3>
          <p className="mt-4 max-w-xl leading-7 text-muted">
            {item.description}
          </p>
          <p className="mt-5 text-sm leading-6 text-muted-dark">
            Подходит, когда нужно заранее увидеть пропорции, свет, материалы и настроение пространства до реализации.
          </p>
        </div>
        <span
          className="grid h-12 w-12 place-items-center border border-line text-champagne transition-all duration-200 group-hover:translate-x-1 group-hover:border-bronze/60 group-hover:bg-bronze/[0.08]"
          aria-hidden="true"
        >
          <svg
            viewBox="0 0 28 28"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-6 w-6"
          >
            <path d="M8 20 20 8" />
            <path d="M11 8h9v9" />
          </svg>
        </span>
      </Link>
    </article>
  );
}
