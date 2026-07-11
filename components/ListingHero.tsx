import Image from "next/image";
import type { CSSProperties, ReactNode } from "react";

import type { ListingHero as ListingHeroData } from "@/data/listingHeroes";

import { SectionLabel } from "./SectionLabel";
import { TextReveal } from "./TextReveal";

export const LISTING_HERO_IMAGE_LAYER_CLASS =
  "absolute inset-0 scale-[1.02] opacity-70 md:opacity-100";
export const LISTING_HERO_IMAGE_CLASS = "object-cover";
export const LISTING_HERO_OVERLAY_CLASS =
  "absolute inset-0 bg-[linear-gradient(90deg,rgba(3,3,2,1)_0%,rgba(3,3,2,1)_34%,rgba(3,3,2,0.86)_44%,rgba(3,3,2,0.38)_64%,rgba(3,3,2,0.7)_100%),linear-gradient(180deg,rgba(3,3,2,0.52),rgba(3,3,2,0.92)),radial-gradient(circle_at_70%_38%,rgba(183,139,85,0.16),transparent_34%)]";

export function ListingHero({
  hero,
  children,
}: {
  hero: ListingHeroData;
  children?: ReactNode;
}) {
  return (
    <section className="relative overflow-hidden border-b border-line">
      <div
        className="absolute inset-0"
        aria-hidden="true"
      >
        <div className={LISTING_HERO_IMAGE_LAYER_CLASS}>
          <Image
            src={hero.image}
            alt=""
            fill
            priority
            fetchPriority="high"
            sizes="100vw"
            className={LISTING_HERO_IMAGE_CLASS}
            style={{ objectPosition: hero.imagePosition } as CSSProperties}
          />
        </div>
        <div className={LISTING_HERO_OVERLAY_CLASS} />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.035)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:120px_120px]" />
      </div>

      <div className="page-shell relative z-10">
        <div className="flex min-h-[640px] items-center py-24 md:min-h-[700px] md:py-32">
          <div className="max-w-6xl md:max-w-[45vw]">
            <SectionLabel>{hero.eyebrow}</SectionLabel>
            <TextReveal>
              <h1 className="mt-10 max-w-6xl text-[clamp(2.55rem,5.2vw,5.35rem)] font-[430] leading-[0.98] tracking-[-0.058em] text-ivory text-balance md:max-w-[45vw]">
                {hero.title}
              </h1>
              <p className="mt-8 max-w-2xl text-lg leading-8 text-muted">
                {hero.description}
              </p>
            </TextReveal>
            {children ? <div className="mt-12">{children}</div> : null}
          </div>
        </div>
      </div>
    </section>
  );
}
