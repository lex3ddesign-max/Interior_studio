import type { Metadata } from "next";

import { CaseCard } from "@/components/CaseCard";
import { ListingHero } from "@/components/ListingHero";
import { cases } from "@/data/cases";
import { getListingHero } from "@/data/listingHeroes";
import { buildSeoMetadata } from "@/lib/seo";

export const metadata: Metadata = buildSeoMetadata({
  title: "Кейсы",
  description:
    "Интерьеры, экстерьеры и коммерческие объекты в портфолио AVENOR — фотореалистичная 3D-визуализация пространства до реализации.",
  path: "/cases",
  image: "/images/cases/interior-dark.jpg",
});

export default function CasesPage() {
  const hero = getListingHero("cases");

  return (
    <>
      <ListingHero hero={hero!}>
        <div className="flex flex-wrap gap-3 text-[0.66rem] uppercase tracking-[0.16em] text-muted-dark">
          {["Все", "Интерьеры", "Экстерьеры", "Коммерческие"].map((label) => (
            <span
              key={label}
              className="border border-line bg-black/20 px-4 py-2 backdrop-blur-sm"
            >
              {label}
            </span>
          ))}
        </div>
      </ListingHero>
      <section className="section-space bg-charcoal">
        <div className="page-shell grid gap-x-6 gap-y-14 lg:grid-cols-2">
          {cases.map((item, index) => (
            <CaseCard
              key={item.slug}
              item={item}
              featured={index === 0 || index === 3}
              priority={index === 0}
            />
          ))}
        </div>
      </section>
    </>
  );
}
