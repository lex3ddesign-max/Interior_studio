import { Button } from "@/components/Button";
import type { Metadata } from "next";

import { CaseCard } from "@/components/CaseCard";
import { ContactSection } from "@/components/ContactSection";
import { EditorialBanner } from "@/components/EditorialBanner";
import { FeatureIcon } from "@/components/FeatureIcon";
import { HeroRevealSequence } from "@/components/HeroRevealSequence";
import { PricingCard } from "@/components/PricingCard";
import { SectionLabel } from "@/components/SectionLabel";
import { ServiceCard } from "@/components/ServiceCard";
import { TextReveal } from "@/components/TextReveal";
import { cases, homeCasePreviewImages } from "@/data/cases";
import { homeBanners } from "@/data/homeBanners";
import { pricing } from "@/data/pricing";
import { services } from "@/data/services";
import { testimonials } from "@/data/testimonials";
import { buildSeoMetadata } from "@/lib/seo";

export const metadata: Metadata = buildSeoMetadata({
  title: "AVENOR — премиальная 3D-визуализация",
  description:
    "Фотореалистичная 3D-визуализация интерьеров, экстерьеров и коммерческих пространств для спокойного согласования, презентаций и продаж.",
});

const positioning = [
  {
    icon: "client" as const,
    title: "Для частных клиентов",
    text: "Понять будущий дом до ремонта и закупок: увидеть свет, масштаб, материалы и заранее убрать сомнения.",
  },
  {
    icon: "designer" as const,
    title: "Для дизайнеров",
    text: "Защитить концепцию перед клиентом: показать не набор решений, а цельную атмосферу с понятной логикой.",
  },
  {
    icon: "architect" as const,
    title: "Для архитекторов",
    text: "Показать объект в среде — с посадкой, фасадными материалами, светом и ощущением масштаба.",
  },
];

const process = [
  {
    icon: "frame",
    title: "Бриф и точка решения",
    text: "Разбираем задачу, материалы, планы и референсы. Сразу отделяем то, что уже можно визуализировать, от вопросов, которые нужно уточнить до старта.",
    result: "ясный объём работ и спокойная основа для оценки",
  },
  {
    icon: "space",
    title: "Сцена и ракурсы без случайности",
    text: "Собираем пространство и выбираем точки камеры, которые объясняют проект: общий масштаб, ключевые зоны, материалы и настроение.",
    result: "ракурсы, которые помогают согласовывать, а не спорить",
  },
  {
    icon: "detail",
    title: "Свет, фактуры и ощущение стоимости",
    text: "Настраиваем материалы, отражения, текстуры и освещение так, чтобы пространство выглядело убедительно — без пластика, шума и случайной декоративности.",
    result: "визуальный образ, которому проще доверять",
  },
  {
    icon: "series",
    title: "Финальная серия под задачу",
    text: "Доводим изображения и готовим файлы для согласования, презентации, сайта или продажи — с нужным форматом, композицией и уровнем чистоты.",
    result: "серия кадров, которую можно сразу показывать",
  },
];

export default function HomePage() {
  return (
    <>
      <HeroRevealSequence />

      <section className="section-space">
        <div className="page-shell">
          <SectionLabel index="01">Позиционирование</SectionLabel>
          <TextReveal className="mt-10 grid gap-12 lg:grid-cols-[1.2fr_0.8fr]">
            <h2 className="display-title max-w-3xl">Сильный проект легче согласовать, когда его уже видно</h2>
            <p className="max-w-xl self-end text-lg leading-8 text-muted">
              Мы превращаем чертежи, референсы и идеи в спокойную визуальную аргументацию:
              чтобы клиент видел не абстрактный проект, а будущую среду с понятным светом,
              материалами и настроением.
            </p>
          </TextReveal>
          <div className="mt-20 grid gap-0 border-b border-line md:grid-cols-3">
            {positioning.map((item) => (
              <article
                key={item.title}
                className="border-t border-line py-7 md:px-7 md:first:pl-0 md:not-first:border-l"
              >
                <div className="flex min-h-12 items-start">
                  <FeatureIcon name={item.icon} />
                </div>
                <h3 className="mt-6 text-xl text-ivory">{item.title}</h3>
                <p className="mt-4 max-w-sm text-sm leading-6 text-muted-dark">
                  {item.text}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section-space bg-charcoal">
        <div className="page-shell">
          <TextReveal className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
            <div>
              <SectionLabel index="02">Избранные кейсы</SectionLabel>
              <h2 className="display-title mt-10 max-w-4xl">Кейсы, которые работают как аргумент</h2>
            </div>
            <p className="max-w-md leading-7 text-muted">
              В каждом проекте важен не только красивый финальный кадр, но и то,
              как серия помогает принять решения по материалам, свету и масштабу.
            </p>
          </TextReveal>
          <div className="mt-16 grid gap-x-6 gap-y-14 lg:grid-cols-2">
            {cases.map((item, index) => (
              <CaseCard
                key={item.slug}
                item={item}
                featured={index === 0}
                priority={index === 0}
                imageOverride={homeCasePreviewImages[index]}
              />
            ))}
          </div>
          <Button href="/cases" variant="secondary" className="mt-14">
            Все кейсы
          </Button>
        </div>
      </section>

      <section className="section-space">
        <div className="page-shell">
          <SectionLabel index="03">Услуги</SectionLabel>
          <TextReveal>
            <h2 className="display-title mt-10 max-w-5xl">
              Визуализация для решений, которые нужно утвердить уверенно
            </h2>
          </TextReveal>
          <div className="mt-16 border-b border-line">
            {services.map((item) => (
              <ServiceCard key={item.slug} item={item} />
            ))}
          </div>
        </div>
      </section>

      <section id="process" className="section-space border-y border-line bg-graphite">
        <div className="page-shell">
          <SectionLabel index="04">Процесс</SectionLabel>
          <div className="mt-10 grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
            <TextReveal>
              <h2 className="display-title max-w-3xl">Процесс, в котором нет лишнего шума</h2>
              <p className="mt-7 max-w-xl text-lg leading-8 text-muted">
                Мы не начинаем с рендера ради рендера. Сначала фиксируем задачу,
                затем выстраиваем кадр, свет и детали так, чтобы визуализация
                снижала неопределённость и помогала двигаться к реализации.
              </p>
              <div className="mt-10 border-l border-bronze/50 pl-6">
                <p className="text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-champagne">
                  Спокойная продакшн-логика
                </p>
                <p className="mt-4 max-w-md leading-7 text-muted-dark">
                  На каждом этапе понятно, что уже утверждено, что требует решения
                  и как это влияет на сроки, бюджет и финальную серию изображений.
                </p>
              </div>
            </TextReveal>
            <div className="grid gap-px overflow-hidden border border-line bg-line md:grid-cols-2">
              {process.map((item, index) => (
                <article
                  key={item.title}
                  className="group bg-charcoal p-6 transition-colors duration-300 hover:bg-black/40 md:p-8"
                >
                  <div className="flex items-start justify-between gap-6">
                    <span className="text-[0.7rem] font-semibold uppercase tracking-[0.16em] text-bronze">
                      0{index + 1}
                    </span>
                    <FeatureIcon
                      name={item.icon}
                      className="transition-transform duration-300 group-hover:scale-110"
                    />
                  </div>
                  <h3 className="mt-10 max-w-sm text-2xl tracking-[-0.04em] text-ivory">
                    {item.title}
                  </h3>
                  <p className="mt-5 text-sm leading-7 text-muted">
                    {item.text}
                  </p>
                  <div className="mt-8 border-t border-line pt-5">
                    <p className="text-[0.7rem] font-semibold uppercase tracking-[0.16em] text-muted-dark">
                      Результат этапа
                    </p>
                    <p className="mt-2 text-sm leading-6 text-champagne">
                      {item.result}
                    </p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <EditorialBanner banner={homeBanners[0]} />

      <section id="pricing" className="section-space">
        <div className="page-shell">
          <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr]">
            <TextReveal>
              <SectionLabel index="05">Стоимость</SectionLabel>
              <h2 className="display-title mt-10 max-w-3xl">Стоимость без тумана и лишних обещаний</h2>
              <p className="mt-7 max-w-lg text-lg leading-8 text-muted">
                На главной — быстрый ориентир по форматам. Подробная страница
                показывает, из чего складывается цена: площадь, ракурсы, детализация,
                срочность и объём исходных материалов.
              </p>
              <div className="mt-9 flex flex-wrap gap-3">
                <Button href="/pricing" variant="secondary">
                  Смотреть пакеты
                </Button>
                <Button href="/contacts" variant="secondary">
                  Обсудить проект
                </Button>
              </div>
            </TextReveal>
            <div className="grid gap-6 lg:grid-cols-3">
              {pricing.map((item, index) => (
                <PricingCard key={item.title} item={item} index={index} />
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section-space border-t border-line">
        <div className="page-shell">
          <SectionLabel index="06">Доверие</SectionLabel>
          <TextReveal>
            <h2 className="display-title mt-10 max-w-4xl">Доверие появляется там, где проект становится понятным</h2>
          </TextReveal>
          <div className="mt-16 grid gap-8 lg:grid-cols-2">
            {testimonials.map((item) => (
              <figure key={item.author} className="border-t border-line py-8">
                <blockquote className="max-w-xl text-xl leading-8 text-ivory">
                  «{item.quote}»
                </blockquote>
                <figcaption className="mt-8 text-xs uppercase tracking-[0.16em] text-muted-dark">
                  {item.author} · {item.role}
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      <EditorialBanner banner={homeBanners[1]} />

      <ContactSection />
    </>
  );
}
