"use client";

import type { ReactNode } from "react";
import { useRef } from "react";

import { gsap, useGSAP } from "@/lib/gsap";
import { cn } from "@/lib/utils";

export function ImageReveal({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const media = gsap.matchMedia();

      media.add("(prefers-reduced-motion: no-preference)", () => {
        const container = root.current;
        const mediaElement = container?.querySelector<HTMLElement>(
          "[data-image-reveal-media]",
        );
        if (!container || !mediaElement) {
          return;
        }
        const timeline = gsap.timeline({
          scrollTrigger: {
            trigger: container,
            start: "top 88%",
            once: true,
          },
        });

        timeline
          .fromTo(
            container,
            { clipPath: "inset(0 0 14% 0)", autoAlpha: 0.7 },
            {
              clipPath: "inset(0 0 0% 0)",
              autoAlpha: 1,
              duration: 1.05,
              ease: "power3.out",
            },
          )
          .fromTo(
            mediaElement,
            { scale: 1.035 },
            { scale: 1, duration: 1.15, ease: "power3.out" },
            0,
          );

        return () => timeline.kill();
      });

      return () => media.revert();
    },
    { scope: root },
  );

  return (
    <div
      ref={root}
      className={cn("image-reveal relative overflow-hidden", className)}
    >
      <div data-image-reveal-media className="absolute inset-0">
        {children}
      </div>
    </div>
  );
}
