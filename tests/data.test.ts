import { describe, expect, it } from "vitest";

import { cases } from "@/data/cases";
import { homeBanners } from "@/data/homeBanners";
import { listingHeroes } from "@/data/listingHeroes";
import { navigation } from "@/data/navigation";
import { pricing } from "@/data/pricing";
import { services } from "@/data/services";
import {
  LISTING_HERO_IMAGE_CLASS,
  LISTING_HERO_IMAGE_LAYER_CLASS,
  LISTING_HERO_OVERLAY_CLASS,
} from "@/components/ListingHero";

describe("AVENOR content model", () => {
  it("provides five uniquely addressable cases", () => {
    expect(cases).toHaveLength(5);
    expect(new Set(cases.map((item) => item.slug)).size).toBe(5);
    expect(cases.every((item) => item.gallery.length >= 3)).toBe(true);
  });

  it("provides three route-backed services", () => {
    expect(services).toHaveLength(3);
    expect(services.every((item) => item.href.startsWith("/services/"))).toBe(
      true,
    );
    expect(
      services.every(
        (item) =>
          item.heroImage.startsWith("/images/") &&
          item.heroAlt.length > 10 &&
          item.heroPosition.desktop.length > 0 &&
          item.heroPosition.mobile.length > 0,
      ),
    ).toBe(true);
  });

  it("provides pricing and internal navigation", () => {
    expect(pricing).toHaveLength(3);
    expect(navigation.every((item) => item.href.startsWith("/"))).toBe(true);
  });

  it("provides two calm home editorial banners after process and trust", () => {
    expect(homeBanners).toHaveLength(2);
    expect(homeBanners.map((item) => item.placement)).toEqual([
      "after-process",
      "after-trust",
    ]);
    expect(
      homeBanners.every(
        (item) =>
          item.image.startsWith("/images/cases/") &&
          item.mobileHeightClass === "h-[280px]" &&
          item.desktopHeightClass === "md:h-[400px]" &&
          item.bleedClass === "w-screen" &&
          item.titleAccent.length > 3 &&
          item.title.length > 10,
      ),
    ).toBe(true);
  });

  it("provides right-half image heroes for cases and services listing pages", () => {
    expect(listingHeroes).toHaveLength(2);
    expect(listingHeroes.map((item) => item.page)).toEqual([
      "cases",
      "services",
    ]);
    expect(listingHeroes.map((item) => item.image)).toEqual([
      "/images/cases/interior-dark.jpg",
      "/images/cases/exterior-dusk.jpg",
    ]);
    expect(
      listingHeroes.every(
        (item) =>
          item.layout === "right-half" &&
          item.image.startsWith("/images/cases/") &&
          item.imageAlt.length > 10 &&
          item.imagePosition.length > 0,
      ),
    ).toBe(true);
  });

  it("uses a full-bleed listing hero image instead of a hard vertical split", () => {
    expect(LISTING_HERO_IMAGE_LAYER_CLASS).toContain("inset-0");
    expect(LISTING_HERO_IMAGE_CLASS).toContain("object-cover");
    expect(LISTING_HERO_IMAGE_LAYER_CLASS).not.toContain("left-1/2");
    expect(LISTING_HERO_OVERLAY_CLASS).toContain("linear-gradient");
    expect(LISTING_HERO_OVERLAY_CLASS).toContain("rgba(3,3,2,1)_0%");
  });
});
