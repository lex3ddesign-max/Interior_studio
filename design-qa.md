# AVENOR Service Hero Design QA

- Source visual truth: `C:/Users/alexb/OneDrive/Documents/ShareX/Screenshots/2026-07/chrome_xmnLdCs9H0.png`
- Implementation screenshot: `C:/tmp/avenor-service-hero-implementation-2560x1175-final.png`
- Combined comparison: `C:/tmp/avenor-service-hero-comparison.png`
- Viewport: `2560 × 1175`
- State: `/services/interior-visualization`, desktop, hero settled after text reveal

## Full-view comparison evidence

The source showed the existing black service hero with the approved typography,
navigation, copy, and CTA. The implementation preserves those interface elements
and replaces the empty black field with a full-bleed, category-specific image
under a uniform dark tint. The hero occupies the full available viewport width
and height below the fixed header.

## Required fidelity surfaces

- Fonts and typography: Manrope, title scale, optical weight, line height, and
  letter spacing are unchanged.
- Spacing and layout rhythm: page-shell alignment and CTA spacing are preserved;
  the content is intentionally anchored lower to expose more of the image.
- Colors and visual tokens: ivory text, bronze CTA, and existing dark palette are
  preserved; the image uses a consistent `black/65` tint.
- Image quality and asset fidelity: local high-resolution category images are
  rendered with `next/image`, `object-cover`, responsive sizing, and no external
  network dependency.
- Copy and content: eyebrow, H1, description, and CTA are unchanged.

## Focused region comparison

No separate crop was needed: the only requested change is the hero background
treatment, and the full-view comparison keeps the complete title, CTA, image
crop, and header legible at the same viewport.

## Findings

No actionable P0, P1, or P2 findings.

## Patches made

- Added `heroImage` and `heroAlt` to each service data record.
- Added a full-bleed `next/image` layer to the shared `ServicePage` hero.
- Added a uniform `bg-black/65` tint for text contrast.
- Preserved separate interior, exterior, and commercial imagery.

## Follow-up polish

- P3: Replace demonstration images with final AVENOR renders when available.

final result: passed

