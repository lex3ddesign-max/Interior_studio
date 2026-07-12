import { describe, expect, it } from "vitest";

import sitemap from "@/app/sitemap";
import { cases } from "@/data/cases";
import { caseImages } from "@/data/media";
import { services } from "@/data/services";
import { site } from "@/data/site";
import { absoluteUrl, buildSeoMetadata } from "@/lib/seo";
import {
  buildOrganizationJsonLd,
  buildServiceJsonLd,
  buildWebsiteJsonLd,
} from "@/lib/structured-data";

describe("SEO metadata", () => {
  it("normalizes the configured public site URL", () => {
    expect(site.url).not.toMatch(/\/$/);
  });

  it("builds absolute canonical and social metadata", () => {
    const metadata = buildSeoMetadata({
      title: "Кейсы",
      description: "Портфолио AVENOR",
      path: "/cases",
      image: caseImages.interiorDark,
    });

    expect(absoluteUrl("/cases")).toBe(`${site.url}/cases`);
    expect(metadata.alternates?.canonical).toBe(`${site.url}/cases`);
    expect(metadata.openGraph?.url).toBe(`${site.url}/cases`);
    expect(metadata.twitter).toMatchObject({
      title: "Кейсы",
      description: "Портфолио AVENOR",
    });
  });

  it("uses optimized WebP as the default social image", () => {
    const metadata = buildSeoMetadata({
      title: "Главная",
      description: "AVENOR",
    });

    expect(metadata.openGraph?.images).toEqual([
      expect.objectContaining({
        url: `${site.url}${caseImages.interiorWarm}`,
      }),
    ]);
    expect(metadata.twitter).toMatchObject({
      images: [`${site.url}${caseImages.interiorWarm}`],
    });
  });

  it("includes all static, service and case routes in sitemap", () => {
    const entries = sitemap();
    const urls = entries.map((entry) => entry.url);

    expect(urls).toContain(site.url + "/");
    expect(urls).toContain(`${site.url}/cases`);
    expect(urls).toContain(`${site.url}/services`);
    expect(urls).toContain(`${site.url}/about`);
    expect(urls).toContain(`${site.url}/pricing`);
    expect(urls).toContain(`${site.url}/contacts`);

    for (const service of services) {
      expect(urls).toContain(`${site.url}${service.href}`);
    }

    for (const item of cases) {
      expect(urls).toContain(`${site.url}/cases/${item.slug}`);
    }
  });

  it("builds structured data for organization, website and service pages", () => {
    const organization = buildOrganizationJsonLd();
    const website = buildWebsiteJsonLd();
    const service = services[0];
    const serviceJsonLd = buildServiceJsonLd(service);

    expect(organization).toMatchObject({
      "@type": "Organization",
      name: site.name,
      url: site.url,
      email: site.email,
    });
    expect(organization.sameAs).toEqual([site.telegram, site.whatsapp, site.vk]);

    expect(website).toMatchObject({
      "@type": "WebSite",
      name: site.name,
      url: site.url,
      inLanguage: "ru-RU",
      publisher: {
        "@type": "Organization",
        name: site.name,
        url: site.url,
      },
    });

    expect(serviceJsonLd).toMatchObject({
      "@type": "Service",
      name: service.title,
      url: `${site.url}${service.href}`,
      image: `${site.url}${service.heroImage}`,
      provider: {
        "@type": "Organization",
        name: site.name,
        url: site.url,
      },
    });
  });
});
