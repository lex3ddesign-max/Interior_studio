import type { Metadata } from "next";

import { ListingHero } from "@/components/ListingHero";
import { ServiceCard } from "@/components/ServiceCard";
import { getListingHero } from "@/data/listingHeroes";
import { caseImages } from "@/data/media";
import { services } from "@/data/services";
import { buildSeoMetadata } from "@/lib/seo";

export const metadata: Metadata = buildSeoMetadata({
  title: "Услуги",
  description:
    "3D-визуализация интерьеров, экстерьеров и коммерческих пространств: фотореалистичные изображения для презентации, согласования и продаж.",
  path: "/services",
  image: caseImages.exteriorDusk,
});

export default function ServicesPage() {
  const hero = getListingHero("services");

  return (
    <>
      <ListingHero hero={hero!} />
      <section className="py-16 md:py-24">
        <div className="page-shell border-b border-line">
          {services.map((item) => (
            <ServiceCard key={item.slug} item={item} />
          ))}
        </div>
      </section>
    </>
  );
}
