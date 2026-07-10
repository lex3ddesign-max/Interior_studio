import type { MetadataRoute } from "next";

import { cases } from "@/data/cases";
import { services } from "@/data/services";
import { absoluteUrl } from "@/lib/seo";

const staticRoutes = ["/", "/cases", "/services", "/contacts"];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const routes = [
    ...staticRoutes,
    ...services.map((service) => service.href),
    ...cases.map((item) => `/cases/${item.slug}`),
  ];

  return routes.map((route) => ({
    url: absoluteUrl(route),
    lastModified: now,
    changeFrequency: route === "/" ? "weekly" : "monthly",
    priority: route === "/" ? 1 : route.includes("/cases/") ? 0.7 : 0.8,
  }));
}
