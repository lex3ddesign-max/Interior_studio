export type MotionMode = "desktop" | "mobile" | "reduced";

export type MotionEnvironment = {
  reducedMotion: boolean;
  isDesktop: boolean;
};

export function resolveMotionMode({
  reducedMotion,
  isDesktop,
}: MotionEnvironment): MotionMode {
  if (reducedMotion) {
    return "reduced";
  }

  return isDesktop ? "desktop" : "mobile";
}

export const motion = {
  easeOut: "power3.out",
  easeStrong: "power4.out",
  uiEase: "cubic-bezier(0.23, 1, 0.32, 1)",
  uiDuration: 0.18,
  textDuration: 0.85,
  imageDuration: 1.1,
  mobileDuration: 0.7,
  reduced: {
    y: 0,
    scale: 1,
    duration: 0.2,
  },
} as const;
