import type { Metadata } from "next";
import Image from "next/image";

import { Button } from "@/components/Button";
import { SectionLabel } from "@/components/SectionLabel";
import { TextReveal } from "@/components/TextReveal";
import { aboutMedia } from "@/data/media";
import { buildSeoMetadata } from "@/lib/seo";

export const metadata: Metadata = buildSeoMetadata({
  title: "О нас",
  description:
    "AVENOR — студия фотореалистичной 3D-визуализации интерьеров, экстерьеров и коммерческих пространств с вниманием к атмосфере, свету и деталям.",
  path: "/about",
  image: aboutMedia.heroBackground,
});

const principles = [
  {
    title: "Сначала задача, потом кадр",
    text: "Мы разбираемся, что должен сделать визуал: согласовать ремонт, защитить концепцию, показать объект инвестору или помочь принять решение по материалам.",
  },
  {
    title: "Премиальность без шума",
    text: "Дорогой кадр держится не на эффектах, а на чистой композиции, точном свете, убедительных материалах и ощущении воздуха в пространстве.",
  },
  {
    title: "Процесс без хаоса",
    text: "На каждом этапе понятно, что уже утверждено: ракурсы, материалы, свет или финальная серия. Так проект движется спокойнее и без лишних переделок.",
  },
];

export const ABOUT_PORTRAIT_CARD_CLASS =
  "relative min-h-[680px] overflow-hidden border border-line bg-charcoal lg:min-h-[760px]";

export const ABOUT_PORTRAIT_IMAGE_CLASS =
  "object-cover object-[center_18%] opacity-45";

export default function AboutPage() {
  return (
    <>
      <section className="relative overflow-hidden border-b border-line bg-black">
        <div className="absolute inset-0 opacity-30" aria-hidden="true">
          <Image
            src={aboutMedia.heroBackground}
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(8,8,7,1)_0%,rgba(8,8,7,0.86)_42%,rgba(8,8,7,0.46)_100%)]" />
        </div>
        <div className="page-shell relative z-10 grid min-h-[calc(100svh-5rem)] gap-12 py-16 lg:grid-cols-[0.95fr_1.05fr] lg:items-end lg:py-24">
          <TextReveal className="self-center">
            <SectionLabel>О студии</SectionLabel>
            <h1 className="page-title mt-10 max-w-5xl">
              Визуализация, которая делает решение спокойнее до реализации
            </h1>
            <p className="mt-8 max-w-2xl text-lg leading-8 text-muted">
              AVENOR работает с интерьерами, архитектурой и коммерческими
              пространствами, где важна не только точность модели, но и то,
              насколько уверенно кадр помогает принять решение.
            </p>
          </TextReveal>

          <div className={ABOUT_PORTRAIT_CARD_CLASS}>
            <div className="absolute inset-0">
              <Image
                src={aboutMedia.portraitTarget}
                alt="Авторский визуальный контроль AVENOR"
                fill
                sizes="(min-width: 1024px) 44vw, 100vw"
                className={ABOUT_PORTRAIT_IMAGE_CLASS}
              />
              <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(8,8,7,0.08)_0%,rgba(8,8,7,0.72)_100%)]" />
            </div>
            <div className="absolute inset-x-8 bottom-8">
              <p className="text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-champagne">
                Авторский контроль
              </p>
              <p className="mt-4 max-w-md text-2xl tracking-[-0.04em] text-ivory">
                Каждый кадр проходит через свет, композицию и ощущение материала — чтобы визуализация выглядела не как рендер, а как будущая реальность проекта.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="section-space">
        <div className="page-shell grid gap-14 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <SectionLabel index="01">Подход</SectionLabel>
            <h2 className="display-title mt-10 max-w-2xl">
              Тихая роскошь начинается с ясного решения
            </h2>
          </div>
          <div className="grid gap-px overflow-hidden border border-line bg-line md:grid-cols-3">
            {principles.map((item, index) => (
              <article key={item.title} className="bg-black p-7">
                <span className="text-xs text-bronze">0{index + 1}</span>
                <h3 className="mt-8 text-xl text-ivory">{item.title}</h3>
                <p className="mt-5 text-sm leading-7 text-muted">
                  {item.text}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden border-t border-line bg-charcoal">
        <div className="absolute inset-0" aria-hidden="true">
          <Image
            src="/images/cases/exterior-dusk.jpg"
            alt=""
            fill
            sizes="100vw"
            className="object-cover opacity-35"
          />
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(8,8,7,0.96)_0%,rgba(8,8,7,0.78)_45%,rgba(8,8,7,0.48)_100%),linear-gradient(180deg,rgba(8,8,7,0.2)_0%,rgba(8,8,7,0.92)_100%)]" />
        </div>
        <div className="page-shell relative z-10 grid min-h-[560px] gap-10 py-20 lg:grid-cols-[1fr_0.72fr] lg:items-end lg:py-28">
          <div>
            <SectionLabel index="02">Диалог</SectionLabel>
            <p className="display-title mt-10 max-w-4xl">
              Покажем пространство так, чтобы его было легче утвердить.
            </p>
            <p className="mt-8 max-w-2xl text-lg leading-8 text-muted">
              Иногда одного точного кадра достаточно, чтобы снять спор по материалам,
              увидеть масштаб и спокойно перейти от идеи к реализации.
            </p>
            <Button href="/contacts" className="mt-10">
              Обсудить проект
            </Button>
          </div>

          <aside className="border border-line bg-black/45 p-6 backdrop-blur-md md:p-8">
            <p className="text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-champagne">
              Studio note
            </p>
            <p className="mt-8 text-3xl tracking-[-0.05em] text-ivory">
              Не просто визуализация, а способ заранее договориться с пространством, бюджетом и ожиданиями.
            </p>
            <div className="mt-10 grid grid-cols-3 gap-px bg-line text-center">
              {["свет", "материал", "кадр"].map((item) => (
                <span
                  key={item}
                  className="bg-charcoal px-3 py-4 text-[0.7rem] uppercase tracking-[0.16em] text-muted"
                >
                  {item}
                </span>
              ))}
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
