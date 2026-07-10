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
    <article className="service-card border-t border-line py-8">
      <Link href={item.href} className="grid min-h-24 gap-6 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-champagne md:grid-cols-[0.5fr_1fr_auto] md:items-start">
        <span className="flex items-center gap-3 text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-muted">
          <FeatureIcon
            name={serviceIcons[item.slug]}
            className={featureIconSizes.compact.className}
            strokeWidth={featureIconSizes.compact.strokeWidth}
          />
          {categoryLabel}
        </span>
        <div>
          <h3 className="text-2xl font-medium tracking-[-0.03em] text-ivory md:text-3xl">
            {item.shortTitle}
          </h3>
          <p className="mt-4 max-w-xl leading-7 text-muted">
            {item.description}
          </p>
        </div>
        <span className="text-lg text-muted" aria-hidden="true">
          ↗
        </span>
      </Link>
    </article>
  );
}
