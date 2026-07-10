import type { Metadata } from "next";

import { site } from "@/data/site";

const defaultOgImage = "/images/cases/interior-warm.jpg";

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
