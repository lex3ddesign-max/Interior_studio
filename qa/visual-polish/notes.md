# AVENOR visual polish QA

## Проверенные поверхности

1. Interior service hero — desktop, 1440×900: passed.
2. Exterior service hero — desktop, 1440×900: passed.
3. Commercial service hero — desktop, 1440×900: layout passed; текущий демонстрационный кадр следует заменить реальным коммерческим рендером перед публикацией.
4. Mobile layout — проверен через responsive CSS, component contracts и production build; автоматическая браузерная сессия дважды прервалась при смене viewport, поэтому мобильный скриншот не принят как доказательство.
5. Mobile menu — Escape, navigation close и toggle покрыты unit-тестом; 44px trigger, scroll lock и focus-visible реализованы.

## Layout и accessibility

- Горизонтального переполнения на проверенных desktop service pages нет.
- Hero используют индивидуальные desktop/mobile focal points.
- Тонировка состоит из общего veil и направленного градиента под текстом.
- Hover-motion ограничен fine pointer / hover-capable устройствами.
- Reduced motion отключает positional motion, custom cursor и page transitions, сохраняя короткие opacity/color transitions.

## Motion review

| Before | After | Why |
| --- | --- | --- |
| Scene indicator animated `width` | Scene indicator animates `transform: scaleX()` | Исключает layout/paint на каждом кадре |

Verdict: Approve. Feel-breaking regressions, `transition: all`, `scale(0)`, `ease-in` и негейтированный hover-motion не обнаружены.

## Evidence

- `01-interior-desktop.png`
- `02-exterior-desktop.png`
- `03-commercial-desktop.png`
- Automated checks: 17 tests passed; ESLint passed; Next production build passed.

## Icons and section labels

- Decorative counters in positioning, services and pricing were replaced with thematic inline SVG icons.
- Decorative card icons were increased to 36 px with a calmer 1.6 stroke; compact service-row icons remain 24 px.
- Ordered process, scene and navigation counters remain numeric.
- `SectionLabel` now renders a distinct bronze slash and uses a 12 px minimum label size throughout the site.

## Home editorial banners

- Added two calm cinematic banner pauses after process and trust sections.
- Desktop banners verified at 400 px height; mobile banners verified at 280 px height.
- Evidence: `07-banner-after-process.png`, `08-banner-after-trust.png`.
- Refined banners to full-bleed viewport width, moved copy above the lower edge, and added italic champagne title accents.
- Evidence: `09-banner-fullbleed-after-process.png`, `10-banner-fullbleed-after-trust.png`.

## Listing page split heroes

- Added right-half cinematic image heroes to `/cases` and `/services`.
- Desktop verified: image panel starts near the midpoint, text column remains on the left with a safe gap.
- Evidence: `14-cases-split-hero-final.png`, `14-services-split-hero-final.png`.
- Replaced listing hero images with calmer crops and added a wide cinematic seam fade so bright image edges do not create a vertical stripe at the split.
- Evidence: `17-cases-hero-seam-fixed.png`, `17-services-hero-seam-fixed.png`.
- Added a narrow solid seam cover above the fade for wide desktop viewports where a one-pixel bright photo edge could still appear.
- Evidence: `18-cases-hero-seam-solid-fixed.png`, `18-services-hero-seam-solid-fixed.png`.
- Reworked listing heroes to use a full-bleed background image with a continuous cinematic overlay instead of a right-half image panel, removing the hard vertical seam at the source.
- Evidence: `19-cases-hero-fullbleed-no-seam.png`, `19-services-hero-fullbleed-no-seam.png`.

## Contact and CTA polish

- Contact form now sits inside a calm rounded luxury panel with a subtle top highlight, shadow, and refined input focus states.
- Existing materials link field keeps its text-link role and includes a right-side upload icon/button.
- CTA buttons use explicit transform/color transitions with subtle hover lift and press feedback; contact channel links now share refined bordered states.
- Evidence: `20-contacts-polished-desktop.png`, `20-contacts-polished-mobile.png`.

## SEO metadata pass

- Added a shared SEO metadata helper for canonical URLs, Open Graph and Twitter metadata.
- Added page-level metadata for home, cases, services, service detail pages, contacts and dynamic case pages.
- Added `robots.txt` and `sitemap.xml` App Router metadata routes.
- Added JSON-LD structured data for Organization, WebSite and service detail pages.
- Audited heading hierarchy and set the standalone contacts page to render its primary title as `h1`.
- Verified `robots.txt` and `sitemap.xml` through local production server: both return 200, sitemap includes home, contacts and service URLs.
- Fresh verification passed: 30 Vitest tests, ESLint and Next production build.

## Lighthouse pass

- Replaced raw CSS background images in listing heroes and editorial banners with optimized `next/image` rendering.
- Added explicit `fetchPriority="high"` to critical hero images.
- Final Lighthouse production scores:
  - `/`: Performance 90, Accessibility 95, Best Practices 100, SEO 100.
  - `/cases`: Performance 90, Accessibility 96, Best Practices 100, SEO 100.
  - `/services`: Performance 94, Accessibility 94, Best Practices 100, SEO 100.
  - `/contacts`: Performance 95, Accessibility 96, Best Practices 100, SEO 100.
- Lighthouse CLI reports were generated successfully, but the local Chrome launcher returns `EPERM` while cleaning temporary profile folders on Windows after report generation.

## Prototype conversion and mobile QA pass

- Audited the main conversion path: header CTA, hero CTA, service CTA, contact links and contact form.
- Fixed the home hero heading hierarchy so every checked page has exactly one `h1`.
- Added explicit `label` / `htmlFor` associations for contact form fields.
- Softened mobile `page-title` and `display-title` sizing for calmer readability on 390 px screens.
- Browser regression check passed on desktop and mobile for `/`, `/cases`, `/services`, `/contacts` and all service detail pages: no horizontal overflow, one `h1`, linked form labels.
- Contact form demo submission shows the success state.
- Evidence: `qa/prototype/home-mobile-final.png`, `qa/prototype/contacts-mobile-final.png`, `qa/prototype/cases-mobile-final.png`.

## Deployment preparation pass

- Added env-driven production configuration for public site URL and contact channels.
- Added `.env.example` with the required deployment variables.
- Added `docs/deployment-checklist.md` with preflight commands and release checks.
- Verified `NEXT_PUBLIC_SITE_URL` normalization with a trailing-slash preview URL: generated `robots.txt` and `sitemap.xml` use the configured domain without double slashes.
- Final fallback-domain production build passes.
- Live Sites deployment is not started yet because this folder is not a git repository, while Sites version saving requires a committed source state / commit SHA.
