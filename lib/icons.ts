export const featureIconNames = [
  "client",
  "designer",
  "architect",
  "interior",
  "exterior",
  "commercial",
  "frame",
  "space",
  "series",
  "detail",
] as const;

export type FeatureIconName = (typeof featureIconNames)[number];

export const featureIconSizes = {
  card: {
    className: "h-9 w-9",
    strokeWidth: 1.6,
  },
  compact: {
    className: "h-6 w-6",
    strokeWidth: 1.4,
  },
} as const;

export function normalizeFeatureIcon(name: string): FeatureIconName {
  return featureIconNames.includes(name as FeatureIconName)
    ? (name as FeatureIconName)
    : "detail";
}
