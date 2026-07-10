import type { Metadata } from "next";

import { Button } from "@/components/Button";
import { FeatureIcon } from "@/components/FeatureIcon";
import { SectionLabel } from "@/components/SectionLabel";
import { TextReveal } from "@/components/TextReveal";
import { pricingFactors, pricingPackages } from "@/data/pricing";
import { buildSeoMetadata } from "@/lib/seo";

export const metadata: Metadata = buildSeoMetadata({
  title: "Стоимость 3D-визуализации",
  description:
    "Пакеты и ориентиры стоимости 3D-визуализации интерьеров, экстерьеров и коммерческих пространств AVENOR.",
  path: "/pricing",
  image: "/images/cases/interior-warm.jpg",
});

export default function PricingPage() {
  return (
    <>
      <section className="relative overflow-hidden border-b border-line bg-black">
        <div className="page-shell min-h-[70svh] py-16 md:py-24">
          <SectionLabel>Стоимость</SectionLabel>
          <TextReveal>
            <h1 className="page-title mt-10 max-w-6xl">
              Пакеты 3D-визуализации под разные задачи
            </h1>
            <p className="mt-8 max-w-3xl text-lg leading-8 text-muted">
              Ниже — структура пакетов, от которой удобно отталкиваться при
              оценке проекта. Точные значения подставим из таблицы “Виды 3D
              услуг”, когда будет доступна ссылка на неё.
            </p>
          </TextReveal>
          <div className="mt-12 flex flex-wrap gap-3">
            <Button href="/contacts">Запросить расчёт</Button>
            <Button href="/services" variant="secondary">
              Посмотреть услуги
            </Button>
          </div>
        </div>
      </section>

      <section className="section-space">
        <div className="page-shell">
          <div className="grid gap-px overflow-hidden border border-line bg-line lg:grid-cols-3">
            {pricingPackages.map((item, index) => (
              <article key={item.title} className="bg-charcoal p-7 md:p-9">
                <div className="flex items-start justify-between gap-6">
                  <div>
                    <p className="text-[0.64rem] font-semibold uppercase tracking-[0.18em] text-bronze">
                      {item.accent}
                    </p>
                    <h2 className="mt-5 text-2xl tracking-[-0.04em] text-ivory">
                      {item.title}
                    </h2>
                  </div>
                  <FeatureIcon
                    name={index === 0 ? "interior" : index === 1 ? "exterior" : "commercial"}
                  />
                </div>

                <p className="mt-10 text-4xl font-medium tracking-[-0.05em] text-ivory">
                  {item.price}
                </p>
                <p className="mt-2 text-xs uppercase tracking-[0.16em] text-champagne">
                  {item.unit} · {item.timeline}
                </p>
                <p className="mt-7 leading-7 text-muted">
                  {item.note}
                </p>

                <div className="mt-8 border-t border-line pt-6">
                  <p className="text-[0.64rem] font-semibold uppercase tracking-[0.16em] text-muted-dark">
                    Что входит
                  </p>
                  <ul className="mt-5 grid gap-3 text-sm leading-6 text-muted">
                    {item.deliverables.map((deliverable) => (
                      <li key={deliverable} className="flex gap-3">
                        <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-bronze" />
                        <span>{deliverable}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section-space border-y border-line bg-graphite">
        <div className="page-shell grid gap-14 lg:grid-cols-[0.75fr_1.25fr]">
          <div>
            <SectionLabel index="01">Расчёт</SectionLabel>
            <h2 className="display-title mt-10 max-w-3xl">
              Цена складывается не только из площади
            </h2>
            <p className="mt-7 max-w-lg leading-7 text-muted">
              Два проекта одинаковой площади могут отличаться по сложности:
              один требует минимальной сцены, другой — десятков материалов,
              сложного света, декора и серии форматов под разные носители.
            </p>
          </div>
          <div className="grid gap-5 md:grid-cols-2">
            {pricingFactors.map((item) => (
              <article key={item.title} className="border border-line bg-black/25 p-6">
                <h3 className="text-xl text-ivory">{item.title}</h3>
                <p className="mt-4 text-sm leading-7 text-muted">
                  {item.text}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section-space">
        <div className="page-shell grid gap-10 lg:grid-cols-[1fr_auto] lg:items-end">
          <div>
            <SectionLabel index="02">Следующий шаг</SectionLabel>
            <p className="display-title mt-10 max-w-4xl">
              Отправьте материалы — соберём точную оценку под ваш проект.
            </p>
          </div>
          <Button href="/contacts" className="shrink-0">
            Обсудить стоимость
          </Button>
        </div>
      </section>
    </>
  );
}
