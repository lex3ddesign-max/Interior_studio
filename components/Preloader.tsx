"use client";

import { useRef, useState } from "react";

import { site } from "@/data/site";
import { gsap, useGSAP } from "@/lib/gsap";

const PRELOADER_KEY = "avenor-preloader-seen";

export function Preloader() {
  const root = useRef<HTMLDivElement>(null);
  const timeline = useRef<gsap.core.Timeline | null>(null);
  const [visible, setVisible] = useState(true);

  useGSAP(
    () => {
      if (!root.current) {
        return;
      }

      const hasPlayed = window.sessionStorage.getItem(PRELOADER_KEY) === "true";
      const reducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;

      const complete = () => {
        document.body.style.removeProperty("overflow");
        window.sessionStorage.setItem(PRELOADER_KEY, "true");
        setVisible(false);
        window.dispatchEvent(new Event("avenor:preloader-complete"));
      };

      if (hasPlayed || reducedMotion) {
        gsap.set(root.current, { display: "none" });
        complete();
        return;
      }

      document.body.style.overflow = "hidden";
      timeline.current = gsap
        .timeline({ defaults: { ease: "power3.out" }, onComplete: complete })
        .from("[data-preloader-mark]", {
          autoAlpha: 0,
          scale: 0.96,
          duration: 0.45,
        })
        .from(
          "[data-preloader-wordmark]",
          { autoAlpha: 0, y: 14, duration: 0.5 },
          "-=0.2",
        )
        .from(
          "[data-preloader-descriptor]",
          { autoAlpha: 0, y: 8, duration: 0.45 },
          "-=0.24",
        )
        .from(
          "[data-preloader-line]",
          { scaleX: 0, transformOrigin: "left center", duration: 0.6 },
          "-=0.22",
        )
        .to("[data-preloader-content]", {
          autoAlpha: 0,
          y: -10,
          duration: 0.34,
          delay: 0.18,
        })
        .to(root.current, {
          clipPath: "inset(0 0 100% 0)",
          duration: 0.72,
          ease: "power4.inOut",
        });

      return () => {
        document.body.style.removeProperty("overflow");
        timeline.current?.kill();
      };
    },
    { scope: root },
  );

  if (!visible) {
    return null;
  }

  return (
    <div
      ref={root}
      className="preloader"
      role="status"
      aria-label="Загрузка AVENOR"
    >
      <div data-preloader-content className="preloader-content">
        <div data-preloader-mark className="preloader-mark" aria-hidden="true">
          <span />
        </div>
        <p
          data-preloader-wordmark
          className="text-sm font-semibold tracking-[0.42em] text-ivory"
        >
          AVENOR
        </p>
        <p
          data-preloader-descriptor
          className="mt-4 text-[0.7rem] uppercase tracking-[0.18em] text-muted-dark"
        >
          {site.descriptor}
        </p>
        <span data-preloader-line className="preloader-line" aria-hidden="true" />
      </div>
      <button
        type="button"
        className="preloader-skip"
        onClick={() => timeline.current?.progress(1)}
      >
        Пропустить
      </button>
    </div>
  );
}

