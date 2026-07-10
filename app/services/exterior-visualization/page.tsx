import type { Metadata } from "next";

import { ServicePage } from "@/components/ServicePage";
import { getServiceBySlug } from "@/data/services";
import { buildSeoMetadata } from "@/lib/seo";

const service = getServiceBySlug("exterior-visualization")!;

export const metadata: Metadata = buildSeoMetadata({
  title: service.title,
  description: service.description,
  path: service.href,
  image: service.heroImage,
});

export default function ExteriorVisualizationPage() {
  return <ServicePage service={service} />;
}
