import Image from "next/image";
import type { CSSProperties } from "react";

import { Button } from "@/components/Button";
import { CaseCard } from "@/components/CaseCard";
import { FeatureIcon } from "@/components/FeatureIcon";
import { JsonLd } from "@/components/JsonLd";
import { SectionLabel } from "@/components/SectionLabel";
import { TextReveal } from "@/components/TextReveal";
import { cases } from "@/data/cases";
import type { Service } from "@/data/services";
import { buildServiceJsonLd } from "@/lib/structured-data";

const process = [
  {
    icon: "frame",
    title: "Материалы и бриф",
    text: "Собираем планы, референсы, пожелания по атмосфере и технические ограничения. Если части материалов нет, фиксируем, что нужно уточнить до старта.",
    result: "понятный объём работ",
  },
  {
    icon: "space",
    title: "Сцена и ракурсы",
    text: "Собираем базовую сцену, ищем композицию и выбираем точки камеры. На этом этапе кадр должен стать читаемым ещё до финального света.",
    result: "согласованные кадры",
  },
  {
    icon: "detail",
    title: "Свет и материалы",
    text: "Прорабатываем фактуры, отражения, сценарий освещения и глубину изображения, чтобы пространство выглядело живым, а не плоской моделью.",
    result: "атмосферная визуальная сцена",
  },
  {
    icon: "series",
    title: "Финальная серия",
    text: "Доводим рендеры постобработкой, проверяем детали и готовим изображения в нужных форматах для согласования, сайта или презентации.",
    result: "готовые изображения",
  },
];

const commonServiceFaq = [
  {
    question: "Сколько времени занимает проект?",
    answer:
      "Срок зависит от масштаба, количества ракурсов и готовности исходных материалов. Небольшую интерьерную серию обычно можно спланировать в пределах 5–10 рабочих дней, сложные экстерьеры и коммерческие объекты требуют больше времени.",
  },
  {
    question: "Как проходят правки?",
    answer:
      "Правки лучше собирать одним списком после просмотра промежуточного этапа. Так мы не теряем логику сцены и быстрее доводим изображение до финального качества.",
  },
  {
    question: "Можно ли начать, если проект ещё не полностью готов?",
    answer:
      "Да, если есть понятная задача и визуальные ориентиры. Мы отметим спорные места и предложим, какие решения нужно принять до финального рендера.",
  },
  {
    question: "В каком формате передаются изображения?",
    answer:
      "Финальные кадры передаются в цифровом формате, подходящем для презентаций, сайта, соцсетей или согласования. Нужные размеры лучше обозначить заранее.",
  },
  {
    question: "Что сильнее всего влияет на стоимость?",
    answer:
      "На стоимость влияют детализация сцены, количество ракурсов, сложность материалов, наличие исходной модели и срочность. После брифа можно дать более точную оценку.",
  },
  {
    question: "Можно ли подготовить кадры под сайт или рекламу?",
    answer:
      "Да. Если изображения нужны не только для согласования, но и для продвижения, мы заранее учитываем композицию, свободные зоны под текст и нужные пропорции.",
  },
];

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
  const faqItems = [...service.faq, ...commonServiceFaq].slice(0, 8);

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
          <TextReveal>
            <h2 className="display-title mt-10 max-w-4xl">
              Каждый этап оставляет понятный след
            </h2>
            <p className="mt-7 max-w-2xl text-lg leading-8 text-muted">
              Визуализация движется от исходных материалов к кадру постепенно:
              сначала фиксируем задачу, затем собираем сцену, настраиваем
              атмосферу и только после этого доводим финальную серию.
            </p>
          </TextReveal>
          <div className="mt-14 grid gap-px overflow-hidden border border-line bg-line md:grid-cols-2 lg:grid-cols-4">
            {process.map((item, index) => (
              <article key={item.title} className="bg-black p-6 md:p-7">
                <div className="flex items-start justify-between gap-5">
                  <span className="text-xs text-bronze">0{index + 1}</span>
                  <FeatureIcon name={item.icon} className="h-9 w-9" />
                </div>
                <h3 className="mt-8 text-xl tracking-[-0.03em] text-ivory">
                  {item.title}
                </h3>
                <p className="mt-4 text-sm leading-6 text-muted">
                  {item.text}
                </p>
                <p className="mt-6 border-t border-line pt-4 text-[0.7rem] font-semibold uppercase tracking-[0.16em] text-champagne">
                  {item.result}
                </p>
              </article>
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
              {faqItems.map((item) => (
                <details key={item.question} className="group border-t border-line py-5">
                  <summary className="cursor-pointer list-none text-lg text-ivory">
                    <span className="inline-flex w-full items-center justify-between gap-6">
                      {item.question}
                      <span className="text-bronze transition-transform duration-300 group-open:rotate-45">
                        +
                      </span>
                    </span>
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
