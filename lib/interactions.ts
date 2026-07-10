export type CursorCapability = {
  isDesktop: boolean;
  finePointer: boolean;
  hoverCapable: boolean;
  reducedMotion: boolean;
};

export type MenuAction = "toggle" | "escape" | "navigate";

export function resolveMenuState(current: boolean, action: MenuAction) {
  return action === "toggle" ? !current : false;
}

export function canUseCustomCursor({
  isDesktop,
  finePointer,
  hoverCapable,
  reducedMotion,
}: CursorCapability) {
  return isDesktop && finePointer && hoverCapable && !reducedMotion;
}

export type NavigationIntent = {
  currentUrl: string;
  targetUrl: string;
  primaryButton: boolean;
  modified: boolean;
  target: string;
  download: boolean;
  transitionCapable: boolean;
};

export function shouldInterceptNavigation({
  currentUrl,
  targetUrl,
  primaryButton,
  modified,
  target,
  download,
  transitionCapable,
}: NavigationIntent) {
  if (
    !transitionCapable ||
    !primaryButton ||
    modified ||
    download ||
    (target && target !== "_self")
  ) {
    return false;
  }

  const current = new URL(currentUrl);
  const destination = new URL(targetUrl, current);

  if (destination.origin !== current.origin) {
    return false;
  }

  if (
    destination.pathname === current.pathname &&
    destination.search === current.search
  ) {
    return false;
  }

  return true;
}
