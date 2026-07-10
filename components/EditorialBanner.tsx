import Image from "next/image";
import type { CSSProperties } from "react";

import type { HomeBanner } from "@/data/homeBanners";
import { cn } from "@/lib/utils";

export function EditorialBanner({ banner }: { banner: HomeBanner }) {
  return (
    <section className="relative overflow-hidden" aria-label={`${banner.title} ${banner.titleAccent}`}>
      <div
        className={cn(
          "relative left-1/2 -ml-[50vw] overflow-hidden border-y border-line bg-charcoal",
          banner.bleedClass,
          banner.mobileHeightClass,
          banner.desktopHeightClass,
        )}
      >
        <div className="absolute inset-0 scale-[1.03] opacity-65" aria-hidden="true">
          <Image
            src={banner.image}
            alt=""
            fill
            sizes="100vw"
            className="object-cover"
            style={{ objectPosition: banner.imagePosition } as CSSProperties}
          />
        </div>
        <div
          className="absolute inset-0 bg-[linear-gradient(90deg,rgba(3,3,2,0.9),rgba(3,3,2,0.62)_34%,rgba(3,3,2,0.34)_62%,rgba(3,3,2,0.82)),radial-gradient(circle_at_76%_34%,rgba(183,139,85,0.18),transparent_34%)]"
          aria-hidden="true"
        />
        <div
          className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.035)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:120px_120px]"
          aria-hidden="true"
        />

        <div className="page-shell relative z-10 h-full">
          <div className="flex h-full items-center pt-0 md:-translate-y-3">
            <div className="max-w-3xl px-4 sm:px-6 lg:px-8">
              <p className="text-[0.72rem] font-semibold uppercase tracking-[0.22em] text-bronze">
                {banner.kicker}
              </p>
              <h2 className="mt-5 max-w-4xl text-3xl font-medium leading-[0.98] tracking-[-0.06em] text-ivory md:text-5xl">
                {banner.title}{" "}
                <span className="font-serif italic text-champagne">
                  {banner.titleAccent}
                </span>
              </h2>
              <p className="mt-5 max-w-xl text-sm leading-6 text-muted md:text-base md:leading-7">
                {banner.text}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
