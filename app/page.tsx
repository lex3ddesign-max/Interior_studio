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
  ["Бриф и материалы", "Получаем планы, референсы, дизайн-проект или описание задачи."],
  ["Сцена и композиция", "Собираем пространство, выбираем ракурсы и выстраиваем кадр."],
  ["Свет и материалы", "Работаем с фактурами, освещением и настроением пространства."],
  ["Финальные изображения", "Готовим серию фотореалистичных рендеров с постобработкой."],
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
              Визуализация для разных типов пространств
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
          <div className="mt-10 grid gap-12 lg:grid-cols-2">
            <TextReveal>
              <h2 className="display-title max-w-3xl">От материалов к атмосфере</h2>
              <p className="mt-7 max-w-xl leading-7 text-muted">
                Процесс сохраняет идею проекта и усиливает её визуальную подачу —
                от первых материалов до финальной серии изображений.
              </p>
            </TextReveal>
            <div className="border-b border-line">
              {process.map(([title, text], index) => (
                <article key={title} className="grid grid-cols-[3rem_1fr] gap-5 border-t border-line py-6">
                  <span className="text-xs text-bronze">0{index + 1}</span>
                  <div>
                    <h3 className="text-lg text-ivory">{title}</h3>
                    <p className="mt-2 text-sm leading-6 text-muted-dark">{text}</p>
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
          <div className="grid gap-10 lg:grid-cols-[0.75fr_1.25fr]">
            <TextReveal>
              <SectionLabel index="05">Стоимость</SectionLabel>
              <h2 className="display-title mt-10">Ориентиры бюджета</h2>
              <p className="mt-7 max-w-md leading-7 text-muted">
                Финальная стоимость рассчитывается индивидуально после знакомства
                с задачей и материалами проекта.
              </p>
              <Button href="/contacts" variant="secondary" className="mt-9">
                Обсудить проект
              </Button>
            </TextReveal>
            <div className="grid gap-x-7 md:grid-cols-3">
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
