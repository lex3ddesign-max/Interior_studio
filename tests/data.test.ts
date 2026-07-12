import { describe, expect, it } from "vitest";
import { existsSync, statSync } from "node:fs";
import path from "node:path";

import { cases, homeCasePreviewImages } from "@/data/cases";
import { homeBanners } from "@/data/homeBanners";
import { listingHeroes } from "@/data/listingHeroes";
import { aboutMedia, caseImages, mediaUploadSlots } from "@/data/media";
import { navigation } from "@/data/navigation";
import { pricing, pricingServiceSections } from "@/data/pricing";
import { services } from "@/data/services";
import {
  ABOUT_PORTRAIT_CARD_CLASS,
  ABOUT_PORTRAIT_IMAGE_CLASS,
} from "@/app/about/page";
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
    expect(firstCase?.coverImage).toBe(
      "/images/cases/cases_1/optimized/Hero.webp",
    );
    expect(firstCase?.gallery).toHaveLength(13);
    expect(
      firstCase?.gallery.every((image) =>
        image.startsWith("/images/cases/cases_1/optimized/") &&
        image.endsWith(".webp"),
      ),
    ).toBe(true);
  });

  it("keeps optimized first case images present and lightweight", () => {
    const firstCase = cases.find((item) => item.slug === "private-residence");
    expect(firstCase).toBeDefined();

    for (const image of firstCase?.gallery ?? []) {
      const filePath = path.join(process.cwd(), "public", image);
      expect(existsSync(filePath), `${image} should exist`).toBe(true);
      expect(statSync(filePath).size, `${image} should be under 650 KB`).toBeLessThan(
        650 * 1024,
      );
    }
  });

  it("connects the second apartment case to the uploaded cases_2 visuals and furniture plan", () => {
    const secondCase = cases.find(
      (item) => item.slug === "warm-minimalism-apartment",
    );

    expect(secondCase?.title).toBe("Graphic City Apartment");
    expect(secondCase?.coverImage).toBe("/images/cases/cases_2/living_4.webp");
    expect(secondCase?.gallery).toHaveLength(10);
    expect(
      secondCase?.gallery.every(
        (image) =>
          image.startsWith("/images/cases/cases_2/") &&
          image.endsWith(".webp"),
      ),
    ).toBe(true);
    expect(secondCase?.description).toContain("кухней-гостиной");
    expect(secondCase?.story).toContain("горчичная");
    expect(secondCase?.story).toContain("тёмная 3D-панель");
    expect(secondCase?.story).toContain("детская");
    expect(secondCase?.technicalDocs[0]?.title).toBe("План расстановки мебели");
    expect(secondCase?.technicalDocs[0]?.text).toContain("диван 2400×900");
    expect(secondCase?.technicalDocs[0]?.text).toContain("детской");
    expect(secondCase?.details).toEqual([
      "Тёмная 3D-панель",
      "Горчичный акцент",
      "Серый текстиль",
      "Медные подвесы",
    ]);
  });

  it("keeps uploaded second case assets present and lightweight", () => {
    const secondCase = cases.find(
      (item) => item.slug === "warm-minimalism-apartment",
    );
    expect(secondCase).toBeDefined();

    for (const image of secondCase?.gallery ?? []) {
      const filePath = path.join(process.cwd(), "public", image);
      expect(existsSync(filePath), `${image} should exist`).toBe(true);
      expect(statSync(filePath).size, `${image} should be under 430 KB`).toBeLessThan(
        430 * 1024,
      );
    }

    expect(
      existsSync(
        path.join(
          process.cwd(),
          "public",
          "images",
          "cases",
          "cases_2",
          "план_мебель2.pdf",
        ),
      ),
    ).toBe(true);
  });

  it("uses optimized shared WebP imagery across site-wide heroes and banners", () => {
    const sharedImages = Object.values(caseImages);

    expect(sharedImages).toEqual([
      "/images/cases/optimized/interior-warm.webp",
      "/images/cases/optimized/interior-stone.webp",
      "/images/cases/optimized/interior-dark.webp",
      "/images/cases/optimized/exterior-villa.webp",
      "/images/cases/optimized/exterior-dusk.webp",
      "/images/cases/optimized/commercial.webp",
    ]);

    for (const image of sharedImages) {
      const filePath = path.join(process.cwd(), "public", image);
      expect(existsSync(filePath), `${image} should exist`).toBe(true);
      expect(statSync(filePath).size, `${image} should be under 320 KB`).toBeLessThan(
        320 * 1024,
      );
    }

    expect(homeBanners.every((item) => item.image.endsWith(".webp"))).toBe(true);
    expect(listingHeroes.every((item) => item.image.endsWith(".webp"))).toBe(true);
    expect(services.every((item) => item.heroImage.endsWith(".webp"))).toBe(true);
  });

  it("describes the first case according to the real apartment visuals", () => {
    const firstCase = cases.find((item) => item.slug === "private-residence");

    expect(firstCase?.description).toContain("семейной квартиры");
    expect(firstCase?.story).toContain("кухню-гостиную");
    expect(firstCase?.story).toContain("бирюзовый");
    expect(firstCase?.story).toContain("детскую");
    expect(firstCase?.details).toEqual([
      "Белая корпусная мебель",
      "Светлое дерево",
      "Бирюзовый текстиль",
      "Зелёный акцент",
    ]);
  });

  it("keeps uploaded case galleries out of the home page case previews", () => {
    expect(homeCasePreviewImages).toHaveLength(cases.length);
    expect(homeCasePreviewImages[0]).toBe(caseImages.interiorWarm);
    expect(homeCasePreviewImages.every((image) => !image.includes("/cases_1/"))).toBe(
      true,
    );
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
      caseImages.interiorDark,
      caseImages.exteriorDusk,
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
    expect(aboutMedia.portraitFallback).toBe(caseImages.interiorDark);
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

  it("keeps the founder portrait tall enough to avoid harsh cropping", () => {
    expect(ABOUT_PORTRAIT_CARD_CLASS).toContain("min-h-[680px]");
    expect(ABOUT_PORTRAIT_CARD_CLASS).toContain("lg:min-h-[760px]");
    expect(ABOUT_PORTRAIT_IMAGE_CLASS).toContain("object-[center_18%]");
  });
});
