import { describe, expect, it } from "vitest";

import { cases } from "@/data/cases";
import { homeBanners } from "@/data/homeBanners";
import { listingHeroes } from "@/data/listingHeroes";
import { aboutMedia, mediaUploadSlots } from "@/data/media";
import { navigation } from "@/data/navigation";
import { pricing, pricingServiceSections } from "@/data/pricing";
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
    expect(cases.every((item) => item.gallery.length >= 8)).toBe(true);
    expect(cases.every((item) => item.story.length > 120)).toBe(true);
    expect(cases.every((item) => item.highlights.length >= 3)).toBe(true);
    expect(cases.every((item) => item.technicalDocs.length >= 3)).toBe(true);
  });

  it("uses uploaded media for the founder and first case gallery", () => {
    const firstCase = cases.find((item) => item.slug === "private-residence");

    expect(aboutMedia.portraitTarget).toBe("/images/about/founder.webp");
    expect(firstCase?.coverImage).toBe("/images/cases/cases_1/Hero.jpg");
    expect(firstCase?.gallery).toHaveLength(13);
    expect(
      firstCase?.gallery.every((image) =>
        image.startsWith("/images/cases/cases_1/"),
      ),
    ).toBe(true);
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
    expect(pricing.every((item) => item.features.length >= 3)).toBe(true);
    expect(pricing[0].price).toBe("от 800 ₽ / м²");
    expect(pricingServiceSections).toHaveLength(5);
    expect(pricingServiceSections[0].rows[0]).toMatchObject({
      object: "Квартира",
      price: "от 800 ₽ / м² · классика от 1 500 ₽ / м²",
    });
    expect(navigation.every((item) => item.href.startsWith("/"))).toBe(true);
    expect(navigation.map((item) => item.href)).toContain("/about");
    expect(navigation.map((item) => item.href)).toContain("/pricing");
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

  it("documents real media replacement slots for the next content pass", () => {
    expect(aboutMedia.portraitFallback).toBe("/images/cases/interior-dark.jpg");
    expect(aboutMedia.portraitTarget).toBe("/images/about/founder.webp");
    expect(mediaUploadSlots).toHaveLength(5);
    expect(mediaUploadSlots.map((item) => item.slug)).toEqual([
      "founder-portrait",
      "case-private-residence",
      "case-coastal-villa",
      "case-commercial-space",
      "seo-og-images",
    ]);
    expect(
      mediaUploadSlots.every(
        (item) =>
          item.targetPath.startsWith("/public/images/") &&
          item.recommendedSize.length > 8 &&
          item.note.length > 40,
      ),
    ).toBe(true);
  });
});
