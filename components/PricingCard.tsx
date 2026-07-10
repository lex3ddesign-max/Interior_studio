import type { PricingItem } from "@/data/pricing";

import { FeatureIcon } from "./FeatureIcon";

const pricingIcons = ["frame", "space", "series"] as const;

export function PricingCard({
  item,
  index,
}: {
  item: PricingItem;
  index: number;
}) {
  return (
    <article className="pricing-card border-t border-line py-7">
      <div className="flex items-start justify-between gap-5">
        <h3 className="max-w-xs text-lg text-ivory">{item.title}</h3>
        <FeatureIcon name={pricingIcons[index] ?? "detail"} />
      </div>
      <p className="mt-12 text-3xl font-medium tracking-[-0.04em] text-ivory">
        {item.price}
      </p>
      <p className="mt-2 text-xs uppercase tracking-[0.16em] text-bronze">
        {item.unit}
      </p>
      <p className="mt-6 max-w-sm text-sm leading-6 text-muted-dark">
        {item.note}
      </p>
    </article>
  );
}
