import { describe, expect, it } from "vitest";

import { BUTTON_BASE_CLASS } from "@/components/Button";
import {
  canUseCustomCursor,
  resolveMenuState,
  shouldInterceptNavigation,
} from "@/lib/interactions";

describe("resolveMenuState", () => {
  it("toggles explicitly and closes on escape or navigation", () => {
    expect(resolveMenuState(true, "toggle")).toBe(false);
    expect(resolveMenuState(false, "toggle")).toBe(true);
    expect(resolveMenuState(true, "escape")).toBe(false);
    expect(resolveMenuState(true, "navigate")).toBe(false);
  });
});

describe("canUseCustomCursor", () => {
  it("enables the cursor only for desktop fine pointers", () => {
    expect(
      canUseCustomCursor({
        isDesktop: true,
        finePointer: true,
        hoverCapable: true,
        reducedMotion: false,
      }),
    ).toBe(true);
  });

  it("keeps the native cursor for touch and reduced motion", () => {
    expect(
      canUseCustomCursor({
        isDesktop: false,
        finePointer: false,
        hoverCapable: false,
        reducedMotion: false,
      }),
    ).toBe(false);
    expect(
      canUseCustomCursor({
        isDesktop: true,
        finePointer: true,
        hoverCapable: true,
        reducedMotion: true,
      }),
    ).toBe(false);
  });
});

describe("shouldInterceptNavigation", () => {
  const base = {
    currentUrl: "https://avenor.test/",
    targetUrl: "https://avenor.test/cases",
    primaryButton: true,
    modified: false,
    target: "",
    download: false,
    transitionCapable: true,
  };

  it("intercepts an ordinary internal route change", () => {
    expect(shouldInterceptNavigation(base)).toBe(true);
  });

  it("preserves native external, modified, and download navigation", () => {
    expect(
      shouldInterceptNavigation({
        ...base,
        targetUrl: "https://example.com/cases",
      }),
    ).toBe(false);
    expect(shouldInterceptNavigation({ ...base, modified: true })).toBe(false);
    expect(shouldInterceptNavigation({ ...base, download: true })).toBe(false);
  });

  it("preserves same-page hashes and mobile navigation", () => {
    expect(
      shouldInterceptNavigation({
        ...base,
        targetUrl: "https://avenor.test/#pricing",
      }),
    ).toBe(false);
    expect(
      shouldInterceptNavigation({ ...base, transitionCapable: false }),
    ).toBe(false);
  });
});

describe("button visual interaction contract", () => {
  it("uses exact, calm CTA transitions with hover and press feedback", () => {
    expect(BUTTON_BASE_CLASS).toContain("transition-[");
    expect(BUTTON_BASE_CLASS).toContain("duration-300");
    expect(BUTTON_BASE_CLASS).toContain("hover:-translate-y-0.5");
    expect(BUTTON_BASE_CLASS).toContain("active:translate-y-0");
  });
});
