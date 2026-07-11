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
import { cases } from "@/data/cases";
import { homeBanners } from "@/data/homeBanners";
import { pricing } from "@/data/pricing";
import { services } from "@/data/services";
import { testimonials } from "@/data/testimonials";
import { buildSeoMetadata } from "@/lib/seo";

export const metadata: Metadata = buildSeoMetadata({
  title: "AVENOR — премиальная 3D-визуализация",
  description:
    "Фотореалистичная 3D-визуализация интерьеров, экстерьеров и коммерческих пространств для частных клиентов, дизайнеров и архитекторов.",
});

const positioning = [
  {
    icon: "client" as const,
    title: "Для частных клиентов",
    text: "Увидеть будущий интерьер или экстерьер до ремонта, строительства и закупки материалов.",
  },
  {
    icon: "designer" as const,
    title: "Для дизайнеров",
    text: "Усилить презентацию проекта, показать атмосферу, материалы, свет и детали.",
  },
  {
    icon: "architect" as const,
    title: "Для архитекторов",
    text: "Представить объект выразительно и точно — от фасада до окружения.",
  },
];

const process = [
  {
    icon: "frame",
    title: "Бриф и визуальная основа",
    text: "Разбираем задачу, собираем планы, референсы, материалы и ограничения. На этом этапе важно понять не только размеры, но и настроение будущего пространства.",
    result: "понятная карта проекта и список недостающих материалов",
  },
  {
    icon: "space",
    title: "Сцена, ракурсы и композиция",
    text: "Собираем пространство, ищем выигрышные точки камеры и выстраиваем кадр так, чтобы изображение читалось спокойно, дорого и убедительно.",
    result: "согласованные ракурсы без лишнего визуального шума",
  },
  {
    icon: "detail",
    title: "Свет, фактуры и атмосфера",
    text: "Настраиваем материалы, отражения, текстуры и сценарии освещения. Именно здесь сухая модель превращается в кадр, в который хочется войти.",
    result: "атмосферная сцена с правильной глубиной и светом",
  },
  {
    icon: "series",
    title: "Финальная серия",
    text: "Доводим изображения постобработкой, проверяем чистоту деталей и готовим файлы для презентации, согласования, сайта или продажи объекта.",
    result: "готовая серия фотореалистичных изображений",
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
            <h2 className="display-title max-w-3xl">Пространство начинается с образа</h2>
            <p className="max-w-xl self-end text-lg leading-8 text-muted">
              Мы создаём фотореалистичные 3D-визуализации, которые помогают
              увидеть, согласовать и презентовать пространство до реализации.
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
              <h2 className="display-title mt-10 max-w-4xl">Избранные пространства</h2>
            </div>
            <p className="max-w-md leading-7 text-muted">
              Каждый кейс — не просто галерея рендеров, а визуальная история
              будущего пространства.
            </p>
          </TextReveal>
          <div className="mt-16 grid gap-x-6 gap-y-14 lg:grid-cols-2">
            {cases.map((item, index) => (
              <CaseCard
                key={item.slug}
                item={item}
                featured={index === 0}
                priority={index === 0}
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
              Кадры, которые помогают согласовать, презентовать и продавать пространство
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
              <h2 className="display-title max-w-3xl">От материалов к атмосфере</h2>
              <p className="mt-7 max-w-xl text-lg leading-8 text-muted">
                Мы не начинаем с “рендера ради рендера”. Сначала собираем смысл,
                затем выстраиваем кадр, свет и детали так, чтобы визуализация
                помогала принимать решения, а не просто украшала презентацию.
              </p>
              <div className="mt-10 border-l border-bronze/50 pl-6">
                <p className="text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-champagne">
                  Спокойная продакшн-логика
                </p>
                <p className="mt-4 max-w-md leading-7 text-muted-dark">
                  На каждом этапе есть понятный результат: что согласовываем,
                  что уточняем и какие файлы переходят в следующую стадию.
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
              <h2 className="display-title mt-10 max-w-3xl">Ориентиры бюджета без перегруза</h2>
              <p className="mt-7 max-w-lg text-lg leading-8 text-muted">
                На главной оставляем быстрый обзор пакетов, а подробную структуру
                по видам 3D-услуг, срокам, ракурсам и доплатам вынесли на
                отдельную страницу стоимости.
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
            <h2 className="display-title mt-10 max-w-4xl">Доверие строится на деталях</h2>
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
