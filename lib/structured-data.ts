import type { Service } from "@/data/services";
import { site } from "@/data/site";
import { absoluteUrl } from "@/lib/seo";

const context = "https://schema.org";

export function buildOrganizationJsonLd() {
  return {
    "@context": context,
    "@type": "Organization",
    name: site.name,
    url: site.url,
    email: site.email,
    sameAs: [site.telegram, site.whatsapp],
    description: site.descriptor,
  };
}

export function buildWebsiteJsonLd() {
  return {
    "@context": context,
    "@type": "WebSite",
    name: site.name,
    url: site.url,
    description: site.heroSubtitle,
    inLanguage: "ru-RU",
    publisher: {
      "@type": "Organization",
      name: site.name,
      url: site.url,
    },
  };
}

export function buildServiceJsonLd(service: Service) {
  return {
    "@context": context,
    "@type": "Service",
    name: service.title,
    description: service.description,
    url: absoluteUrl(service.href),
    image: absoluteUrl(service.heroImage),
    serviceType: service.shortTitle,
    provider: {
      "@type": "Organization",
      name: site.name,
      url: site.url,
    },
    areaServed: {
      "@type": "Place",
      name: "Worldwide",
    },
  };
}
