"use client";

import type { ReactNode } from "react";
import { useRef } from "react";

import { gsap, useGSAP } from "@/lib/gsap";
import { cn } from "@/lib/utils";

export function TextReveal({
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
        gsap.fromTo(
          root.current,
          { autoAlpha: 0, y: 24 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.82,
            ease: "power3.out",
            scrollTrigger: {
              trigger: root.current,
              start: "top 88%",
              once: true,
            },
          },
        );
      });

      media.add("(prefers-reduced-motion: reduce)", () => {
        gsap.fromTo(
          root.current,
          { autoAlpha: 0 },
          {
            autoAlpha: 1,
            duration: 0.2,
            scrollTrigger: {
              trigger: root.current,
              start: "top 92%",
              once: true,
            },
          },
        );
      });

      return () => media.revert();
    },
    { scope: root },
  );

  return (
    <div ref={root} className={cn("text-reveal", className)}>
      {children}
    </div>
  );
}

