"use client";

import Lenis from "lenis";
import { usePathname } from "next/navigation";
import { useEffect, type ReactNode } from "react";

import { gsap, ScrollTrigger } from "@/lib/gsap";

export function MotionProvider({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  useEffect(() => {
    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    );
    let lenis: Lenis | null = null;
    let raf: ((time: number) => void) | null = null;

    const stopLenis = () => {
      if (raf) {
        gsap.ticker.remove(raf);
        raf = null;
      }
      lenis?.destroy();
      lenis = null;
      gsap.ticker.lagSmoothing(500, 33);
      document.documentElement.classList.remove("lenis", "lenis-smooth");
    };

    const startLenis = () => {
      if (lenis || reducedMotion.matches) {
        return;
      }

      lenis = new Lenis({
        duration: 1.05,
        smoothWheel: true,
        wheelMultiplier: 0.9,
        touchMultiplier: 1,
        syncTouch: false,
      });
      lenis.on("scroll", ScrollTrigger.update);
      raf = (time: number) => lenis?.raf(time * 1000);
      gsap.ticker.add(raf);
      gsap.ticker.lagSmoothing(0);
      document.documentElement.classList.add("lenis", "lenis-smooth");
    };

    const syncPreference = () => {
      if (reducedMotion.matches) {
        stopLenis();
      } else {
        startLenis();
      }
      ScrollTrigger.refresh();
    };

    const refresh = () => ScrollTrigger.refresh();

    syncPreference();
    reducedMotion.addEventListener("change", syncPreference);
    window.addEventListener("avenor:preloader-complete", refresh);

    return () => {
      reducedMotion.removeEventListener("change", syncPreference);
      window.removeEventListener("avenor:preloader-complete", refresh);
      stopLenis();
    };
  }, []);

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => ScrollTrigger.refresh());
    return () => window.cancelAnimationFrame(frame);
  }, [pathname]);

  return children;
}
