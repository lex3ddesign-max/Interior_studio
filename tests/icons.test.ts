import { describe, expect, it } from "vitest";

import {
  featureIconNames,
  featureIconSizes,
  normalizeFeatureIcon,
} from "@/lib/icons";

describe("feature icon contract", () => {
  it("exposes the semantic icons used by AVENOR cards", () => {
    expect(featureIconNames).toEqual([
      "client",
      "designer",
      "architect",
      "interior",
      "exterior",
      "commercial",
      "frame",
      "space",
      "series",
      "detail",
    ]);
  });

  it("uses detail as a safe fallback", () => {
    expect(normalizeFeatureIcon("architect")).toBe("architect");
    expect(normalizeFeatureIcon("unknown")).toBe("detail");
  });

  it("keeps decorative card icons visibly larger than compact row icons", () => {
    expect(featureIconSizes.card).toEqual({
      className: "h-9 w-9",
      strokeWidth: 1.6,
    });
    expect(featureIconSizes.compact).toEqual({
      className: "h-6 w-6",
      strokeWidth: 1.4,
    });
  });
});
