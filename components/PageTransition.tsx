"use client";

import { usePathname, useRouter } from "next/navigation";
import {
  useEffect,
  useRef,
  type ReactNode,
} from "react";

import { gsap } from "@/lib/gsap";
import { shouldInterceptNavigation } from "@/lib/interactions";

export function PageTransition({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const overlay = useRef<HTMLDivElement>(null);
  const content = useRef<HTMLDivElement>(null);
  const transitioning = useRef(false);
  const pendingHash = useRef("");
  const previousPath = useRef(pathname);
  const safetyTimer = useRef<number | null>(null);

  useEffect(() => {
    const layer = overlay.current;
    if (!layer) {
      return;
    }

    const capability = window.matchMedia(
      "(min-width: 1024px) and (hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)",
    );

    const reset = () => {
      if (safetyTimer.current) {
        window.clearTimeout(safetyTimer.current);
        safetyTimer.current = null;
      }
      gsap.set(layer, { clipPath: "inset(100% 0 0 0)" });
      document.body.style.removeProperty("overflow");
      document.documentElement.classList.remove("route-transitioning");
      transitioning.current = false;
      pendingHash.current = "";
    };

    const onClick = (event: MouseEvent) => {
      if (!(event.target instanceof Element)) {
        return;
      }

      const anchor = event.target.closest<HTMLAnchorElement>("a[href]");
      if (!anchor) {
        return;
      }

      const canTransition = shouldInterceptNavigation({
        currentUrl: window.location.href,
        targetUrl: anchor.href,
        primaryButton: event.button === 0,
        modified:
          event.metaKey || event.ctrlKey || event.shiftKey || event.altKey,
        target: anchor.target,
        download: anchor.hasAttribute("download"),
        transitionCapable: capability.matches,
      });

      if (!canTransition) {
        return;
      }

      event.preventDefault();
      if (transitioning.current) {
        return;
      }

      transitioning.current = true;
      const destination = new URL(anchor.href);
      pendingHash.current = destination.hash;
      document.body.style.overflow = "hidden";
      document.documentElement.classList.add("route-transitioning");

      gsap.killTweensOf(layer);
      gsap.fromTo(
        layer,
        { clipPath: "inset(100% 0 0 0)" },
        {
          clipPath: "inset(0% 0 0 0)",
          duration: 0.28,
          ease: "power3.out",
          onComplete: () => {
            router.push(
              `${destination.pathname}${destination.search}${destination.hash}`,
            );
          },
        },
      );

      safetyTimer.current = window.setTimeout(reset, 5000);
    };

    document.addEventListener("click", onClick, true);
    return () => {
      document.removeEventListener("click", onClick, true);
      if (safetyTimer.current) {
        window.clearTimeout(safetyTimer.current);
      }
      gsap.killTweensOf(layer);
      document.body.style.removeProperty("overflow");
      document.documentElement.classList.remove("route-transitioning");
    };
  }, [router]);

  useEffect(() => {
    const layer = overlay.current;
    const page = content.current;
    if (!layer || !page || previousPath.current === pathname) {
      return;
    }

    previousPath.current = pathname;

    if (transitioning.current) {
      const hash = pendingHash.current;
      window.requestAnimationFrame(() => {
        if (hash) {
          document.querySelector(hash)?.scrollIntoView();
        } else {
          window.scrollTo(0, 0);
        }
      });

      gsap.fromTo(
        page,
        { autoAlpha: 0.88 },
        { autoAlpha: 1, duration: 0.22, ease: "power3.out" },
      );
      gsap.to(layer, {
        clipPath: "inset(0 0 100% 0)",
        duration: 0.3,
        delay: 0.04,
        ease: "power4.out",
        onComplete: () => {
          if (safetyTimer.current) {
            window.clearTimeout(safetyTimer.current);
            safetyTimer.current = null;
          }
          gsap.set(layer, { clipPath: "inset(100% 0 0 0)" });
          document.body.style.removeProperty("overflow");
          document.documentElement.classList.remove("route-transitioning");
          transitioning.current = false;
          pendingHash.current = "";
        },
      });
    } else {
      gsap.fromTo(
        page,
        { autoAlpha: 0.88 },
        { autoAlpha: 1, duration: 0.18, ease: "power3.out" },
      );
    }
  }, [pathname]);

  return (
    <>
      <div ref={content}>{children}</div>
      <div ref={overlay} className="page-transition-layer" aria-hidden="true">
        <span>AVENOR</span>
      </div>
    </>
  );
}
