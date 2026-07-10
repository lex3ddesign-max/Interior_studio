"use client";

import Image from "next/image";
import { useRef, useState } from "react";

import { Button } from "@/components/Button";
import { heroScenes } from "@/data/hero-scenes";
import { site } from "@/data/site";
import { gsap, useGSAP } from "@/lib/gsap";

export function HeroRevealSequence() {
  const root = useRef<HTMLElement>(null);
  const pin = useRef<HTMLDivElement>(null);
  const [activeScene, setActiveScene] = useState(0);

  useGSAP(
    () => {
      const media = gsap.matchMedia();

      media.add(
        "(min-width: 1024px) and (prefers-reduced-motion: no-preference)",
        () => {
          const scenes = gsap.utils.toArray<HTMLElement>("[data-hero-scene]");
          const images = gsap.utils.toArray<HTMLElement>("[data-hero-image]");

          gsap.set(scenes.slice(1), {
            clipPath: "inset(100% 0 0 0)",
          });
          gsap.set(scenes, { autoAlpha: 1 });
          gsap.set(images, { scale: 1.015 });

          const timeline = gsap.timeline({
            scrollTrigger: {
              trigger: root.current,
              start: "top top+=80",
              end: "+=240%",
              pin: pin.current,
              pinSpacing: true,
              scrub: 0.8,
              anticipatePin: 1,
              invalidateOnRefresh: true,
              onUpdate: (self) => {
                const next = Math.min(
                  heroScenes.length - 1,
                  Math.floor(self.progress * heroScenes.length),
                );
                setActiveScene((current) => (current === next ? current : next));
              },
            },
          });

          timeline
            .to(images[0], { scale: 1.06, duration: 1, ease: "none" }, 0)
            .to(
              scenes[1],
              { clipPath: "inset(0% 0 0 0)", duration: 1, ease: "none" },
              1,
            )
            .to(images[1], { scale: 1.055, duration: 1, ease: "none" }, 1)
            .to(
              scenes[2],
              { clipPath: "inset(0% 0 0 0)", duration: 1, ease: "none" },
              2,
            )
            .to(images[2], { scale: 1.05, duration: 1, ease: "none" }, 2);

          return () => timeline.kill();
        },
      );

      media.add(
        "(max-width: 1023px) and (prefers-reduced-motion: no-preference)",
        () => {
          gsap.utils
            .toArray<HTMLElement>("[data-mobile-hero-scene]")
            .forEach((scene) => {
              const image = scene.querySelector("[data-mobile-hero-image]");
              gsap.fromTo(
                scene,
                { autoAlpha: 0.55, clipPath: "inset(10% 0 0 0)" },
                {
                  autoAlpha: 1,
                  clipPath: "inset(0% 0 0 0)",
                  duration: 0.72,
                  ease: "power3.out",
                  scrollTrigger: {
                    trigger: scene,
                    start: "top 86%",
                    once: true,
                  },
                },
              );
              if (image) {
                gsap.fromTo(
                  image,
                  { scale: 1.035 },
                  {
                    scale: 1,
                    duration: 0.9,
                    ease: "power3.out",
                    scrollTrigger: {
                      trigger: scene,
                      start: "top 86%",
                      once: true,
                    },
                  },
                );
              }
            });
        },
      );

      return () => media.revert();
    },
    { scope: root },
  );

  return (
    <section ref={root} className="hero-sequence border-b border-line">
      <h1 className="sr-only">{site.heroTitle}</h1>
      <div ref={pin} className="hero-desktop hidden lg:block">
        <div className="absolute inset-0">
          {heroScenes.map((scene, index) => (
            <div
              key={scene.id}
              data-hero-scene
              className="hero-scene"
              aria-hidden={index !== activeScene}
            >
              <div data-hero-image className="absolute inset-0">
                <Image
                  src={scene.image}
                  alt={scene.alt}
                  fill
                  priority={index === 0}
                  fetchPriority={index === 0 ? "high" : undefined}
                  sizes="100vw"
                  className="object-cover"
                />
              </div>
              <div className="absolute inset-0 bg-black/50" />
            </div>
          ))}
        </div>
        <HeroCopy />
        <div className="hero-scene-nav">
          {heroScenes.map((scene, index) => (
            <div
              key={scene.id}
              className={index === activeScene ? "is-active" : undefined}
            >
              <span>0{index + 1}</span>
              <span>{scene.label}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="hero-mobile lg:hidden">
        <div className="relative min-h-[calc(100svh-5rem)] overflow-hidden">
          <Image
            src={heroScenes[0].image}
            alt={heroScenes[0].alt}
            fill
            priority
            fetchPriority="high"
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-black/55" />
          <HeroCopy />
        </div>
        <div className="grid gap-px bg-line">
          {heroScenes.slice(1).map((scene, index) => (
            <article
              key={scene.id}
              data-mobile-hero-scene
              className="relative min-h-[70svh] overflow-hidden bg-black"
            >
              <div data-mobile-hero-image className="absolute inset-0">
                <Image
                  src={scene.image}
                  alt={scene.alt}
                  fill
                  sizes="100vw"
                  className="object-cover"
                />
              </div>
              <div className="absolute inset-0 bg-black/35" />
              <p className="absolute bottom-7 left-5 text-[0.66rem] uppercase tracking-[0.18em] text-ivory">
                0{index + 2} / {scene.label}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function HeroCopy() {
  return (
    <div className="page-shell relative z-10 flex h-full items-end py-12 md:py-16">
      <div className="grid w-full gap-10 lg:grid-cols-[1fr_18rem] lg:items-end">
        <div>
          <p className="mb-6 text-[0.66rem] uppercase tracking-[0.22em] text-champagne">
            {site.descriptor}
          </p>
          <div className="page-title max-w-5xl" aria-hidden="true">
            {site.heroTitle}
          </div>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button href="/contacts">{site.ctaPrimary}</Button>
            <Button href="/cases" variant="secondary">
              {site.ctaSecondary}
            </Button>
          </div>
        </div>
        <p className="border-l border-line pl-5 text-sm leading-6 text-muted">
          {site.heroSubtitle}
        </p>
      </div>
    </div>
  );
}
