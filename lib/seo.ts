import type { Metadata } from "next";

import { caseImages } from "@/data/media";
import { site } from "@/data/site";

const defaultOgImage = caseImages.interiorWarm;

type SeoMetadataInput = {
  title: string;
  description: string;
  path?: string;
  image?: string;
  type?: "website" | "article";
};

export function absoluteUrl(path = "/") {
  return new URL(path, site.url).toString();
}

export function buildSeoMetadata({
  title,
  description,
  path = "/",
  image = defaultOgImage,
  type = "website",
}: SeoMetadataInput): Metadata {
  const url = absoluteUrl(path);
  const imageUrl = absoluteUrl(image);

  return {
    title,
    description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title,
      description,
      url,
      siteName: site.name,
      type,
      locale: "ru_RU",
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 900,
          alt: `${site.name} — ${title}`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [imageUrl],
    },
  };
}
