import type { SVGProps } from "react";

import {
  featureIconSizes,
  normalizeFeatureIcon,
  type FeatureIconName,
} from "@/lib/icons";
import { cn } from "@/lib/utils";

type FeatureIconProps = SVGProps<SVGSVGElement> & {
  name: FeatureIconName | string;
};

export function FeatureIcon({
  name,
  className,
  ...props
}: FeatureIconProps) {
  const icon = normalizeFeatureIcon(name);

  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={featureIconSizes.card.strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      className={cn(featureIconSizes.card.className, "text-bronze", className)}
      {...props}
    >
      {icon === "client" ? (
        <>
          <circle cx="12" cy="7" r="3" />
          <path d="M5.5 20c.5-4 2.6-6 6.5-6s6 2 6.5 6" />
        </>
      ) : null}
      {icon === "designer" ? (
        <>
          <path d="m4 18 9.8-9.8 2 2L6 20H4v-2Z" />
          <path d="m12.7 9.3 2-2 2 2-2 2" />
          <path d="M5 5h5M5 8h3" />
        </>
      ) : null}
      {icon === "architect" ? (
        <>
          <path d="M4 20 12 4l8 16" />
          <path d="M7 14h10M9.5 9h5M6 20h12" />
        </>
      ) : null}
      {icon === "interior" ? (
        <>
          <path d="M4 20V6h16v14M4 15h16" />
          <path d="M8 15v-4h8v4M7 20v-5M17 20v-5" />
        </>
      ) : null}
      {icon === "exterior" ? (
        <>
          <path d="m3 11 9-7 9 7M5 10v10h14V10" />
          <path d="M9 20v-6h6v6" />
        </>
      ) : null}
      {icon === "commercial" ? (
        <>
          <path d="M4 20V7h16v13M3 7h18M7 7V4h10v3" />
          <path d="M8 11h3v3H8zM14 11h3v3h-3zM10 20v-3h4v3" />
        </>
      ) : null}
      {icon === "frame" ? (
        <>
          <path d="M4 7V4h3M17 4h3v3M20 17v3h-3M7 20H4v-3" />
          <circle cx="12" cy="12" r="3.5" />
        </>
      ) : null}
      {icon === "space" ? (
        <>
          <path d="M4 5h16v14H4zM8 5v14M8 12h12" />
          <path d="m16 8 2 2" />
        </>
      ) : null}
      {icon === "series" ? (
        <>
          <rect x="4" y="6" width="12" height="10" />
          <path d="M8 3h12v10M8 20h12V10" />
        </>
      ) : null}
      {icon === "detail" ? (
        <>
          <circle cx="12" cy="12" r="7" />
          <circle cx="12" cy="12" r="2.5" />
          <path d="M12 3v2M12 19v2M3 12h2M19 12h2" />
        </>
      ) : null}
    </svg>
  );
}
