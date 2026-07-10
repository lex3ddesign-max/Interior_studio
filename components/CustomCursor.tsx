"use client";

import { useEffect, useRef, useState } from "react";

import { canUseCustomCursor } from "@/lib/interactions";
import { gsap } from "@/lib/gsap";

type CursorMode = "default" | "case" | "cta";

export function CustomCursor() {
  const root = useRef<HTMLDivElement>(null);
  const [mode, setMode] = useState<CursorMode>("default");
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const element = root.current;
    if (!element) {
      return;
    }

    const queries = {
      desktop: window.matchMedia("(min-width: 1024px)"),
      fine: window.matchMedia("(pointer: fine)"),
      hover: window.matchMedia("(hover: hover)"),
      reduced: window.matchMedia("(prefers-reduced-motion: reduce)"),
    };
    let enabled = false;

    gsap.set(element, { xPercent: -50, yPercent: -50 });
    const moveX = gsap.quickTo(element, "x", {
      duration: 0.18,
      ease: "power3.out",
    });
    const moveY = gsap.quickTo(element, "y", {
      duration: 0.18,
      ease: "power3.out",
    });

    const modeFromTarget = (target: EventTarget | null): CursorMode => {
      if (!(target instanceof Element)) {
        return "default";
      }
      const value = target.closest<HTMLElement>("[data-cursor]")?.dataset.cursor;
      return value === "case" || value === "cta" ? value : "default";
    };

    const usesNativeCursor = (target: EventTarget | null) =>
      target instanceof Element &&
      Boolean(
        target.closest(
          "input, textarea, select, [contenteditable='true'], [data-native-cursor]",
        ),
      );

    const onPointerMove = (event: PointerEvent) => {
      moveX(event.clientX);
      moveY(event.clientY);
      setVisible(!usesNativeCursor(event.target));
    };
    const onPointerOver = (event: PointerEvent) => {
      if (!usesNativeCursor(event.target)) {
        setMode(modeFromTarget(event.target));
      }
    };
    const onPointerOut = (event: PointerEvent) => {
      setMode(modeFromTarget(event.relatedTarget));
    };
    const onPointerLeave = () => setVisible(false);
    const onPointerEnter = () => setVisible(true);

    const attach = () => {
      if (enabled) {
        return;
      }
      enabled = true;
      document.documentElement.classList.add("custom-cursor-enabled");
      window.addEventListener("pointermove", onPointerMove, { passive: true });
      window.addEventListener("pointerover", onPointerOver, { passive: true });
      window.addEventListener("pointerout", onPointerOut, { passive: true });
      document.addEventListener("mouseleave", onPointerLeave);
      document.addEventListener("mouseenter", onPointerEnter);
    };

    const detach = () => {
      if (!enabled) {
        return;
      }
      enabled = false;
      document.documentElement.classList.remove("custom-cursor-enabled");
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerover", onPointerOver);
      window.removeEventListener("pointerout", onPointerOut);
      document.removeEventListener("mouseleave", onPointerLeave);
      document.removeEventListener("mouseenter", onPointerEnter);
      setVisible(false);
      setMode("default");
    };

    const syncCapability = () => {
      const shouldEnable = canUseCustomCursor({
        isDesktop: queries.desktop.matches,
        finePointer: queries.fine.matches,
        hoverCapable: queries.hover.matches,
        reducedMotion: queries.reduced.matches,
      });
      if (shouldEnable) {
        attach();
      } else {
        detach();
      }
    };

    Object.values(queries).forEach((query) =>
      query.addEventListener("change", syncCapability),
    );
    syncCapability();

    return () => {
      Object.values(queries).forEach((query) =>
        query.removeEventListener("change", syncCapability),
      );
      detach();
      gsap.killTweensOf(element);
    };
  }, []);

  return (
    <div
      ref={root}
      className="custom-cursor"
      data-mode={mode}
      data-visible={visible}
      aria-hidden="true"
    >
      <div className="custom-cursor-surface">
        <span>View case</span>
      </div>
    </div>
  );
}

