import type { Metadata } from "next";
import Image from "next/image";

import { Button } from "@/components/Button";
import { FeatureIcon } from "@/components/FeatureIcon";
import { SectionLabel } from "@/components/SectionLabel";
import { TextReveal } from "@/components/TextReveal";
import {
  pricingFactors,
  pricingPackages,
  pricingServiceSections,
} from "@/data/pricing";
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
        <div className="absolute inset-0 opacity-30" aria-hidden="true">
          <Image
            src="/images/cases/interior-warm.jpg"
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_78%_30%,rgba(176,138,90,0.28),transparent_32%),linear-gradient(90deg,rgba(8,8,7,1)_0%,rgba(8,8,7,0.9)_45%,rgba(8,8,7,0.62)_100%)]" />
        </div>

        <div className="page-shell relative z-10 grid min-h-[calc(100svh-5rem)] gap-12 py-16 lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:py-24">
          <div>
            <SectionLabel>Стоимость</SectionLabel>
            <TextReveal>
              <h1 className="page-title mt-10 max-w-5xl">
                Пакеты 3D-визуализации под разные задачи
              </h1>
              <p className="mt-8 max-w-2xl text-lg leading-8 text-muted">
                Ниже — реальные ориентиры из таблицы “Виды 3D услуг”: пакеты,
                сроки, количество ракурсов, условия по площади и отдельные виды
                работ. Финальная смета всё равно уточняется после брифа.
              </p>
            </TextReveal>
            <div className="mt-12 flex flex-wrap gap-3">
              <Button href="/contacts">Запросить расчёт</Button>
              <Button href="/services" variant="secondary">
                Посмотреть услуги
              </Button>
            </div>
          </div>

          <div className="relative min-h-[520px] overflow-hidden border border-line bg-charcoal/80 shadow-[0_40px_120px_rgba(0,0,0,0.45)]">
            <Image
              src="/images/cases/interior-dark.jpg"
              alt="Проекция будущего проекта в 3D"
              fill
              sizes="(min-width: 1024px) 48vw, 100vw"
              className="object-cover opacity-45"
            />
            <div className="pricing-projection-grid absolute inset-0" aria-hidden="true" />
            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(8,8,7,0.05)_0%,rgba(8,8,7,0.75)_100%),linear-gradient(90deg,rgba(8,8,7,0.74)_0%,rgba(8,8,7,0.15)_64%)]" />

            <div className="absolute left-6 top-6 right-6 flex items-center justify-between gap-4 border-b border-line pb-5">
              <p className="text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-champagne">
                Projection estimate
              </p>
              <span className="h-2 w-2 rounded-full bg-bronze shadow-[0_0_24px_rgba(176,138,90,0.8)]" />
            </div>

            <div className="absolute inset-x-6 bottom-6 grid gap-3 md:grid-cols-3">
              {[
                ["01", "Площадь", "20–300 м²"],
                ["02", "Ракурсы", "2–8 кадров"],
                ["03", "Срок", "3–14 дней"],
              ].map(([index, label, value]) => (
                <div key={label} className="border border-line bg-black/45 p-4 backdrop-blur-md">
                  <p className="text-[0.7rem] uppercase tracking-[0.16em] text-bronze">
                    {index}
                  </p>
                  <p className="mt-5 text-[0.7rem] uppercase tracking-[0.16em] text-muted-dark">
                    {label}
                  </p>
                  <p className="mt-2 text-xl tracking-[-0.04em] text-ivory">
                    {value}
                  </p>
                </div>
              ))}
            </div>

            <div
              className="absolute left-1/2 top-1/2 hidden h-56 w-56 -translate-x-1/2 -translate-y-1/2 rotate-45 border border-bronze/45 md:block"
              aria-hidden="true"
            >
              <div className="absolute inset-8 border border-ivory/15" />
              <div className="absolute left-1/2 top-0 h-full w-px bg-bronze/30" />
              <div className="absolute left-0 top-1/2 h-px w-full bg-bronze/30" />
            </div>
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
                    <p className="text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-bronze">
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
                  <p className="text-[0.7rem] font-semibold uppercase tracking-[0.16em] text-muted-dark">
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

      <section className="section-space border-y border-line bg-charcoal">
        <div className="page-shell">
          <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
            <div>
              <SectionLabel index="01">Виды 3D услуг</SectionLabel>
              <h2 className="display-title mt-10 max-w-4xl">
                Подробная стоимость по категориям
              </h2>
            </div>
            <p className="max-w-2xl text-lg leading-8 text-muted">
              Этот блок перенесён из таблицы: он помогает быстро понять, какие
              задачи считаются по площади, какие — по проекту, где есть
              минимальный объём и какие доплаты нужно учитывать заранее.
            </p>
          </div>

          <div className="mt-16 grid gap-10">
            {pricingServiceSections.map((section, sectionIndex) => (
              <section
                key={section.title}
                className="overflow-hidden border border-line bg-black/20"
              >
                <div className="grid gap-6 border-b border-line p-6 md:grid-cols-[0.8fr_1.2fr] md:p-8">
                  <div>
                    <p className="text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-bronze">
                      0{sectionIndex + 1}
                    </p>
                    <h3 className="mt-4 text-3xl tracking-[-0.05em] text-ivory">
                      {section.title}
                    </h3>
                  </div>
                  <p className="max-w-2xl leading-7 text-muted">
                    {section.lead}
                  </p>
                </div>

                <div className="divide-y divide-line">
                  {section.rows.map((row) => (
                    <article
                      key={`${section.title}-${row.object}`}
                      className="grid gap-6 p-6 md:grid-cols-[0.9fr_1.4fr_0.9fr] md:p-8"
                    >
                      <div>
                        <h4 className="text-xl text-ivory">{row.object}</h4>
                        {row.area ? (
                          <p className="mt-3 text-sm uppercase tracking-[0.14em] text-champagne">
                            {row.area}
                          </p>
                        ) : null}
                      </div>

                      <div>
                        <ul className="grid gap-2 text-sm leading-6 text-muted">
                          {row.description.map((item) => (
                            <li key={item} className="flex gap-3">
                              <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-bronze" />
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                        {row.note ? (
                          <p className="mt-5 max-w-2xl text-sm leading-6 text-muted-dark">
                            {row.note}
                          </p>
                        ) : null}
                      </div>

                      <dl className="grid gap-4 text-sm">
                        {row.angles ? (
                          <div>
                            <dt className="text-[0.7rem] uppercase tracking-[0.16em] text-muted-dark">
                              Ракурсы
                            </dt>
                            <dd className="mt-1 text-ivory">{row.angles}</dd>
                          </div>
                        ) : null}
                        <div>
                          <dt className="text-[0.7rem] uppercase tracking-[0.16em] text-muted-dark">
                            Сроки
                          </dt>
                          <dd className="mt-1 text-ivory">{row.timeline}</dd>
                        </div>
                        <div>
                          <dt className="text-[0.7rem] uppercase tracking-[0.16em] text-muted-dark">
                            Стоимость
                          </dt>
                          <dd className="mt-1 text-lg text-champagne">{row.price}</dd>
                        </div>
                      </dl>
                    </article>
                  ))}
                </div>
              </section>
            ))}
          </div>
        </div>
      </section>

      <section className="section-space border-y border-line bg-graphite">
        <div className="page-shell grid gap-14 lg:grid-cols-[0.75fr_1.25fr]">
          <div>
            <SectionLabel index="02">Расчёт</SectionLabel>
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
            <SectionLabel index="03">Следующий шаг</SectionLabel>
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
