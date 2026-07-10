# AVENOR Base Design

## Scope

Build the static foundation of the AVENOR website. Include the requested routes,
typed content modules, shared layout, responsive navigation, contact form states,
and the complete static homepage. Do not include GSAP, Lenis, preloaders, custom
cursors, page transitions, or scroll-driven animation.

## Visual direction

Use the approved Editorial Gallery direction: near-black warm surfaces, large
Manrope typography, restrained bronze accents, hairline separators, generous
spacing, and asymmetric architectural imagery. Avoid rounded SaaS cards,
gradients, bright colors, and decorative noise.

## Architecture

- Next.js App Router with TypeScript and Tailwind CSS 4.
- Server components by default; client components only for the mobile menu and
  contact form.
- CMS-ready typed arrays in `/data`.
- Reusable visual primitives and cards in `/components`.
- Shared service-page renderer backed by `services.ts`.
- Static generation for all five case slugs.

## Responsive behavior

Desktop uses wide editorial grids and oversized typography. Tablet and mobile
collapse to a single reading column, keep media proportions stable, and expose a
compact accessible navigation menu.

## Validation and verification

Use Vitest for content shape and contact-form validation. Run tests, ESLint,
the production build, and a local start smoke check before handoff.

