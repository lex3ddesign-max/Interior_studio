import type { Metadata } from "next";

import { CaseFilterGrid } from "@/components/CaseFilterGrid";
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
      <ListingHero hero={hero!} />
      <section className="bg-charcoal py-16 md:py-24">
        <div className="page-shell">
          <CaseFilterGrid items={cases} />
        </div>
      </section>
    </>
  );
}
