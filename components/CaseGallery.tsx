"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

import { ImageReveal } from "@/components/ImageReveal";
import { cn } from "@/lib/utils";

export const CASE_GALLERY_BUTTON_CLASS =
  "group relative block h-full w-full cursor-none overflow-hidden bg-graphite text-left";

export const CASE_LIGHTBOX_BACKDROP_CLASS =
  "fixed inset-0 z-[90] flex items-center justify-center bg-black/88 px-4 py-6 backdrop-blur-md md:px-8";

export const CASE_LIGHTBOX_IMAGE_CLASS =
  "object-contain";

export function getCaseLightboxLabel(title: string, index: number) {
  return `Открыть ракурс ${index + 1} проекта ${title}`;
}

export function CaseGallery({
  images,
  title,
}: {
  images: string[];
  title: string;
}) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const activeImage = activeIndex === null ? null : images[activeIndex];
  const lightboxIndex = activeIndex ?? 0;

  useEffect(() => {
    if (activeIndex === null) {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setActiveIndex(null);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [activeIndex]);

  return (
    <>
      <div className="grid gap-5 md:grid-cols-2">
        {images.map((image, index) => (
          <ImageReveal
            key={`${image}-${index}`}
            className={
              index === 0 || index === 5
                ? "relative aspect-[16/9] md:col-span-2"
                : "relative aspect-[4/5]"
            }
          >
            <button
              type="button"
              className={CASE_GALLERY_BUTTON_CLASS}
              onClick={() => setActiveIndex(index)}
              aria-label={getCaseLightboxLabel(title, index)}
            >
              <Image
                src={image}
                alt={`${title} — ракурс ${index + 1}`}
                fill
                sizes={
                  index === 0 || index === 5
                    ? "100vw"
                    : "(min-width: 768px) 50vw, 100vw"
                }
                className="object-cover transition duration-700 ease-out group-hover:scale-[1.025] group-hover:brightness-110"
              />
              <span
                className="pointer-events-none absolute inset-0 bg-black/0 transition duration-500 group-hover:bg-black/10"
                aria-hidden="true"
              />
            </button>
          </ImageReveal>
        ))}
      </div>

      {activeImage ? (
        <div
          className={CASE_LIGHTBOX_BACKDROP_CLASS}
          role="dialog"
          aria-modal="true"
          aria-label={`${title} — просмотр изображения`}
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              setActiveIndex(null);
            }
          }}
        >
          <div className="relative h-full w-full max-w-[min(92vw,1500px)]">
            <Image
              src={activeImage}
              alt={`${title} — ракурс ${lightboxIndex + 1}`}
              fill
              sizes="100vw"
              className={CASE_LIGHTBOX_IMAGE_CLASS}
              priority
            />
            <div className="pointer-events-none absolute inset-x-0 bottom-0 flex items-end justify-between gap-6 bg-gradient-to-t from-black/80 via-black/30 to-transparent p-5 text-xs uppercase tracking-[0.18em] text-muted md:p-8">
              <span>{title}</span>
              <span>
                {String(lightboxIndex + 1).padStart(2, "0")} /{" "}
                {String(images.length).padStart(2, "0")}
              </span>
            </div>
            <button
              type="button"
              className={cn(
                "absolute right-4 top-4 grid h-11 w-11 place-items-center rounded-full border border-ivory/20 bg-black/45 text-xl text-ivory transition duration-300",
                "hover:border-bronze/70 hover:text-bronze",
              )}
              onClick={() => setActiveIndex(null)}
              aria-label="Закрыть изображение"
            >
              ×
            </button>
          </div>
        </div>
      ) : null}
    </>
  );
}
