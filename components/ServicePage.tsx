import Image from "next/image";
import type { CSSProperties } from "react";

import { Button } from "@/components/Button";
import { CaseCard } from "@/components/CaseCard";
import { JsonLd } from "@/components/JsonLd";
import { SectionLabel } from "@/components/SectionLabel";
import { TextReveal } from "@/components/TextReveal";
import { cases } from "@/data/cases";
import type { Service } from "@/data/services";
import { buildServiceJsonLd } from "@/lib/structured-data";

const process = ["Материалы и бриф", "Сцена и ракурсы", "Свет и материалы", "Финальная серия"];

export function ServicePage({ service }: { service: Service }) {
  const heroStyle = {
    "--hero-position-desktop": service.heroPosition.desktop,
    "--hero-position-mobile": service.heroPosition.mobile,
  } as CSSProperties;
  const category =
    service.slug === "interior-visualization"
      ? "Interior"
      : service.slug === "exterior-visualization"
        ? "Exterior"
        : "Commercial";
  const relatedCases = cases.filter((item) => item.category === category).slice(0, 2);

  return (
    <>
      <JsonLd data={buildServiceJsonLd(service)} />
      <section
        className="service-hero relative min-h-[calc(100svh-5rem)] overflow-hidden border-b border-line bg-black"
        style={heroStyle}
      >
        <Image
          src={service.heroImage}
          alt={service.heroAlt}
          fill
          priority
          fetchPriority="high"
          sizes="100vw"
          className="service-hero-image object-cover"
        />
        <div className="service-hero-veil absolute inset-0" aria-hidden="true" />
        <div className="page-shell relative z-10 flex min-h-[calc(100svh-5rem)] items-end py-10 sm:py-14 md:py-20">
          <div className="w-full">
            <SectionLabel>{service.eyebrow}</SectionLabel>
            <TextReveal>
              <h1 className="page-title mt-10 max-w-6xl">{service.title}</h1>
              <p className="mt-6 max-w-3xl text-base leading-7 text-ivory/75 sm:mt-8 sm:text-lg sm:leading-8">
                {service.description}
              </p>
              <Button href="/contacts" className="mt-10">
                Обсудить проект
              </Button>
            </TextReveal>
          </div>
        </div>
      </section>

      <section className="section-space">
        <div className="page-shell grid gap-14 lg:grid-cols-2">
          <div>
            <SectionLabel index="01">Для кого</SectionLabel>
            <ul className="mt-10 border-b border-line">
              {service.audience.map((item) => (
                <li key={item} className="border-t border-line py-5 text-xl text-ivory">
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <SectionLabel index="02">Что входит</SectionLabel>
            <ol className="mt-10 border-b border-line">
              {service.includes.map((item, index) => (
                <li key={item} className="flex gap-5 border-t border-line py-5">
                  <span className="text-xs text-bronze">0{index + 1}</span>
                  <span className="text-ivory">{item}</span>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {relatedCases.length ? (
        <section className="section-space bg-charcoal">
          <div className="page-shell">
            <SectionLabel index="03">Примеры</SectionLabel>
            <div className="mt-12 grid gap-6 lg:grid-cols-2">
              {relatedCases.map((item) => (
                <CaseCard key={item.slug} item={item} />
              ))}
            </div>
          </div>
        </section>
      ) : null}

      <section className="section-space border-b border-line">
        <div className="page-shell">
          <SectionLabel index="04">Процесс</SectionLabel>
          <div className="mt-12 grid gap-0 border-b border-line md:grid-cols-4">
            {process.map((item, index) => (
              <div key={item} className="border-t border-line py-6 md:px-6 md:first:pl-0 md:not-first:border-l">
                <span className="text-xs text-bronze">0{index + 1}</span>
                <p className="mt-8 text-lg text-ivory">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-space">
        <div className="page-shell grid gap-14 lg:grid-cols-2">
          <div>
            <SectionLabel index="05">Стоимость зависит от</SectionLabel>
            <ul className="mt-10 flex flex-wrap gap-3">
              {service.costFactors.map((item) => (
                <li key={item} className="border border-line px-4 py-3 text-sm text-muted">
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <SectionLabel index="06">FAQ</SectionLabel>
            <div className="mt-10 border-b border-line">
              {service.faq.map((item) => (
                <details key={item.question} className="border-t border-line py-5">
                  <summary className="cursor-pointer list-none text-lg text-ivory">
                    {item.question}
                  </summary>
                  <p className="mt-4 max-w-xl leading-7 text-muted">{item.answer}</p>
                </details>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section-space border-t border-line bg-charcoal text-center">
        <div className="page-shell">
          <p className="display-title">Есть проект для визуализации?</p>
          <Button href="/contacts" className="mt-10">
            Обсудить задачу
          </Button>
        </div>
      </section>
    </>
  );
}
