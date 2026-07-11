import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";

import { Button } from "@/components/Button";
import { FeatureIcon } from "@/components/FeatureIcon";
import { ImageReveal } from "@/components/ImageReveal";
import { SectionLabel } from "@/components/SectionLabel";
import { TextReveal } from "@/components/TextReveal";
import { cases, getCaseBySlug } from "@/data/cases";
import { buildSeoMetadata } from "@/lib/seo";
import { categoryLabel } from "@/lib/utils";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return cases.map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const item = getCaseBySlug(slug);

  return item
    ? buildSeoMetadata({
        title: item.title,
        description: item.subtitle,
        path: `/cases/${item.slug}`,
        image: item.coverImage,
        type: "article",
      })
    : { title: "Кейс не найден" };
}

export default async function CasePage({ params }: PageProps) {
  const { slug } = await params;
  const item = getCaseBySlug(slug);

  if (!item) {
    notFound();
  }

  return (
    <>
      <section className="page-shell py-12 md:py-16">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <SectionLabel>{categoryLabel(item.category)}</SectionLabel>
          <span className="text-xs uppercase tracking-[0.16em] text-muted-dark">
            {item.year} {item.location ? `· ${item.location}` : ""}
          </span>
        </div>
        <TextReveal>
          <h1 className="page-title mt-10">{item.title}</h1>
          <p className="mt-7 max-w-2xl text-lg leading-8 text-muted">
            {item.subtitle}
          </p>
        </TextReveal>
        <ImageReveal className="mt-12 aspect-[16/9] bg-graphite">
          <Image
            src={item.coverImage}
            alt={`${item.title} — обложка проекта`}
            fill
            priority
            fetchPriority="high"
            sizes="100vw"
            className="object-cover"
          />
        </ImageReveal>
      </section>

      <section className="border-t border-line pt-20 pb-10 md:pt-28 md:pb-12">
        <div className="page-shell">
          <div className="grid items-start gap-10 lg:grid-cols-[0.42fr_1fr]">
            <SectionLabel index="01" className="self-start">Задача</SectionLabel>
            <div>
              <p className="max-w-4xl text-2xl leading-10 tracking-[-0.025em] text-ivory">
                {item.description}
              </p>
              <p className="mt-8 max-w-3xl text-lg leading-8 text-muted">
                {item.story}
              </p>
              <dl className="mt-10 grid gap-4 border-y border-line py-6 text-sm md:grid-cols-3">
                <div>
                  <dt className="text-[0.7rem] font-semibold uppercase tracking-[0.16em] text-muted-dark">
                    Тип объекта
                  </dt>
                  <dd className="mt-2 text-ivory">{categoryLabel(item.category)}</dd>
                </div>
                <div>
                  <dt className="text-[0.7rem] font-semibold uppercase tracking-[0.16em] text-muted-dark">
                    Локация
                  </dt>
                  <dd className="mt-2 text-ivory">{item.location ?? "—"}</dd>
                </div>
                <div>
                  <dt className="text-[0.7rem] font-semibold uppercase tracking-[0.16em] text-muted-dark">
                    Услуги
                  </dt>
                  <dd className="mt-2 text-ivory">{item.services.join(", ")}</dd>
                </div>
              </dl>
            </div>
          </div>

          <div className="mt-14 grid overflow-hidden border border-line bg-line md:grid-cols-3">
            {item.highlights.map((highlight) => (
              <article key={highlight.label} className="bg-black p-6 md:p-8">
                <div className="flex items-start justify-between gap-6">
                  <div>
                    <p className="text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-bronze">
                      {highlight.label}
                    </p>
                    <h2 className="mt-5 text-2xl tracking-[-0.04em] text-ivory">
                      {highlight.value}
                    </h2>
                  </div>
                  <FeatureIcon name={highlight.icon} className="h-10 w-10" />
                </div>
                <p className="mt-7 text-sm leading-7 text-muted">
                  {highlight.text}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-line bg-charcoal pt-14 pb-20 md:pt-16 md:pb-28">
        <div className="page-shell grid gap-12 lg:grid-cols-[0.42fr_1fr]">
          <div>
            <SectionLabel index="02">Техническая документация</SectionLabel>
            <h2 className="mt-10 max-w-lg text-4xl tracking-[-0.05em] text-ivory md:text-5xl">
              Документы, материалы и логика кадра — всё, что делает визуализацию убедительной
            </h2>
          </div>

          <div className="grid gap-4">
            {item.technicalDocs.map((doc, index) => (
              <article
                key={doc.title}
                className="group relative overflow-hidden border border-line bg-black/25 p-6 transition-colors duration-200 hover:border-bronze/45 hover:bg-bronze/[0.035] md:p-8"
              >
                <div className="absolute left-0 top-0 h-full w-px bg-bronze/0 transition-colors duration-200 group-hover:bg-bronze/70" />
                <div className="flex gap-5">
                  <span className="mt-1 text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-bronze">
                    0{index + 1}
                  </span>
                  <div>
                    <h3 className="text-2xl tracking-[-0.04em] text-ivory">
                      {doc.title}
                    </h3>
                    <p className="mt-4 max-w-2xl leading-7 text-muted">
                      {doc.text}
                    </p>
                  </div>
                </div>
              </article>
            ))}
            <article className="border border-bronze/30 bg-bronze/[0.04] p-6 md:p-8">
              <p className="text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-bronze">
                Материальная палитра
              </p>
              <div className="mt-5 flex flex-wrap gap-2">
                {item.details.map((detail) => (
                  <span
                    key={detail}
                    className="border border-line px-3 py-2 text-sm text-ivory"
                  >
                    {detail}
                  </span>
                ))}
              </div>
              <p className="mt-6 max-w-2xl leading-7 text-muted">
                Эти акценты отдельно проверяются в сцене: на них держится ощущение стоимости, глубины и правдоподобия будущего пространства.
              </p>
            </article>
          </div>
        </div>
      </section>

      <section className="page-shell py-24 md:py-36">
        <div className="mb-12 flex flex-wrap items-end justify-between gap-6">
          <div>
            <SectionLabel index="03">Визуальная серия</SectionLabel>
            <h2 className="mt-8 max-w-3xl text-5xl tracking-[-0.055em] text-ivory md:text-7xl">
              Серия кадров, которая помогает клиенту захотеть это пространство
            </h2>
          </div>
          <p className="max-w-md leading-7 text-muted">
            Мы показываем не количество картинок, а путь внимания: первый общий образ, важные детали, свет, фактуры и кадры, которые удобно использовать в презентации.
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          {item.gallery.map((image, index) => (
            <ImageReveal
              key={`${image}-${index}`}
              className={
                index === 0 || index === 5
                  ? "relative aspect-[16/9] md:col-span-2"
                  : "relative aspect-[4/5]"
              }
            >
              <Image
                src={image}
                alt={`${item.title} — ракурс ${index + 1}`}
                fill
                sizes={index === 0 || index === 5 ? "100vw" : "(min-width: 768px) 50vw, 100vw"}
                className="object-cover"
              />
            </ImageReveal>
          ))}
        </div>
      </section>

      <section className="section-space text-center">
        <div className="page-shell">
          <p className="display-title">Покажем ваш проект так, чтобы его было легче согласовать и продать.</p>
          <Button href="/contacts" className="mt-10">
            Обсудить проект
          </Button>
        </div>
      </section>
    </>
  );
}
