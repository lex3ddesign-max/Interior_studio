"use client";

import { useMemo, useState } from "react";

import { CaseCard } from "@/components/CaseCard";
import type { CaseCategory, CaseStudy } from "@/data/cases";

type CaseFilter = "All" | CaseCategory;

const filters: Array<{ label: string; value: CaseFilter }> = [
  { label: "Все", value: "All" },
  { label: "Интерьеры", value: "Interior" },
  { label: "Экстерьеры", value: "Exterior" },
  { label: "Коммерческие", value: "Commercial" },
];

export function CaseFilterGrid({ items }: { items: CaseStudy[] }) {
  const [activeFilter, setActiveFilter] = useState<CaseFilter>("All");
  const visibleItems = useMemo(
    () =>
      activeFilter === "All"
        ? items
        : items.filter((item) => item.category === activeFilter),
    [activeFilter, items],
  );

  return (
    <div>
      <div className="mb-14 flex flex-col gap-6 border-b border-line pb-8 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-bronze">
            Фильтр проектов
          </p>
          <p className="mt-3 max-w-xl text-sm leading-6 text-muted">
            Выберите тип пространства, чтобы быстро посмотреть релевантные
            визуальные истории.
          </p>
        </div>
        <div
          className="flex flex-wrap gap-3"
          role="tablist"
          aria-label="Фильтр кейсов"
        >
          {filters.map((filter) => {
            const isActive = filter.value === activeFilter;

            return (
              <button
                key={filter.value}
                type="button"
                role="tab"
                aria-selected={isActive}
                className={`min-h-10 border px-4 text-[0.66rem] font-semibold uppercase tracking-[0.16em] transition-[border-color,background-color,color] duration-300 focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-4 focus-visible:outline-bronze ${
                  isActive
                    ? "border-bronze bg-bronze text-black"
                    : "border-line bg-black/20 text-muted hover:border-bronze/60 hover:text-champagne"
                }`}
                onClick={() => setActiveFilter(filter.value)}
              >
                {filter.label}
              </button>
            );
          })}
        </div>
      </div>

      <div className="grid gap-x-6 gap-y-14 lg:grid-cols-2">
        {visibleItems.map((item, index) => (
          <CaseCard
            key={item.slug}
            item={item}
            featured={index === 0 || index === 3}
            priority={index === 0}
          />
        ))}
      </div>
    </div>
  );
}
