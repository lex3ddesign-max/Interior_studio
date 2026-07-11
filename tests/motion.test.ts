import { describe, expect, it } from "vitest";

import { heroScenes } from "@/data/hero-scenes";
import { caseImages } from "@/data/media";
import { motion, resolveMotionMode } from "@/lib/motion";

describe("resolveMotionMode", () => {
  it("prioritizes reduced motion", () => {
    expect(resolveMotionMode({ reducedMotion: true, isDesktop: true })).toBe(
      "reduced",
    );
  });

  it("selects the pinned desktop experience", () => {
    expect(resolveMotionMode({ reducedMotion: false, isDesktop: true })).toBe(
      "desktop",
    );
  });

  it("selects the normal-flow mobile experience", () => {
    expect(resolveMotionMode({ reducedMotion: false, isDesktop: false })).toBe(
      "mobile",
    );
  });
});

describe("motion presets", () => {
  it("keeps UI motion concise and reduced motion stationary", () => {
    expect(motion.uiDuration).toBeLessThanOrEqual(0.24);
    expect(motion.uiEase).toBe("cubic-bezier(0.23, 1, 0.32, 1)");
    expect(motion.reduced).toEqual({
      y: 0,
      scale: 1,
      duration: 0.2,
    });
  });
});

describe("heroScenes", () => {
  it("contains one interior, exterior, and commercial scene", () => {
    expect(heroScenes).toHaveLength(3);
    expect(heroScenes.map((scene) => scene.category)).toEqual([
      "Interior",
      "Exterior",
      "Commercial",
    ]);
  });

  it("keeps the home hero on editorial studio images, not uploaded case galleries", () => {
    expect(heroScenes.map((scene) => scene.image)).toEqual([
      caseImages.interiorWarm,
      caseImages.exteriorVilla,
      caseImages.commercial,
    ]);
    expect(
      heroScenes.every((scene) => !scene.image.includes("/cases_1/")),
    ).toBe(true);
  });
});
