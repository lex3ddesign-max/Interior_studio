import Image from "next/image";
import Link from "next/link";

import type { CaseStudy } from "@/data/cases";
import { categoryLabel, cn } from "@/lib/utils";

import { ImageReveal } from "./ImageReveal";

type CaseCardProps = {
  item: CaseStudy;
  featured?: boolean;
  priority?: boolean;
};

export function CaseCard({
  item,
  featured = false,
  priority = false,
}: CaseCardProps) {
  return (
    <article className={cn("case-card group", featured && "lg:col-span-2")}>
      <Link
        href={`/cases/${item.slug}`}
        className="block focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-champagne"
        data-cursor="case"
      >
        <ImageReveal
          className={cn(
            "case-media bg-graphite",
            featured ? "aspect-[16/10]" : "aspect-[4/5]",
          )}
        >
          <Image
            src={item.coverImage}
            alt={`${item.title} — ${categoryLabel(item.category)}`}
            fill
            priority={priority}
            sizes={featured ? "(min-width: 1024px) 70vw, 100vw" : "(min-width: 1024px) 35vw, 100vw"}
            className="case-image object-cover"
          />
          <div className="absolute inset-0 bg-black/10" />
          <span className="case-view-label absolute bottom-5 right-5 border border-ivory/25 bg-black/40 px-3 py-2 text-[0.62rem] uppercase tracking-[0.18em] text-ivory backdrop-blur-md">
            View case
          </span>
        </ImageReveal>
        <div className="flex items-start justify-between gap-5 border-b border-line py-5">
          <div>
            <p className="text-lg text-ivory">{item.title}</p>
            <p className="mt-1 text-sm text-muted-dark">
              {categoryLabel(item.category)}
            </p>
          </div>
          <span className="text-xs tracking-[0.14em] text-muted-dark">
            {item.year}
          </span>
        </div>
      </Link>
    </article>
  );
}
