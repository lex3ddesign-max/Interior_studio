# Home Editorial Banners Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add two calm cinematic 400px banner pauses to the home page after sections 04 and 06.

**Architecture:** Banner content is stored in `data/homeBanners.ts`; rendering is isolated in `components/EditorialBanner.tsx`; `app/page.tsx` only places the two approved banners between existing sections. Existing image assets are reused with dark overlays and gradient treatment.

**Tech Stack:** Next.js App Router, React, TypeScript, Tailwind CSS, Vitest.

## Global Constraints

- Add exactly two home-page editorial banners.
- Place banners after `04 Процесс` and after `06 Доверие`.
- Desktop banner height is 400px; mobile height is lower.
- Reuse existing `/public/images/cases` assets.
- Keep style dark cinematic quiet luxury.
- Do not add noisy effects, new animation systems, or new image dependencies.

---

### Task 1: Banner data contract

**Files:**
- Create: `data/homeBanners.ts`
- Modify: `tests/data.test.ts`

**Interfaces:**
- Produces: `homeBanners` array with two objects: `after-process` and `after-trust`.

- [ ] Write a failing test asserting the banner count, placements, image paths, and `desktopHeightClass: "md:h-[400px]"`.
- [ ] Run `npm test -- --run tests/data.test.ts` and confirm failure.
- [ ] Create `data/homeBanners.ts` with the two approved banner entries.
- [ ] Run `npm test -- --run tests/data.test.ts` and confirm pass.

### Task 2: Banner component and placement

**Files:**
- Create: `components/EditorialBanner.tsx`
- Modify: `app/page.tsx`

**Interfaces:**
- Consumes: `homeBanners`.
- Produces: two visual banner pauses on the home page.

- [ ] Create a responsive image-backed `EditorialBanner` with dark overlays, 280px mobile height and 400px desktop height.
- [ ] Insert `homeBanners[0]` after the process section and `homeBanners[1]` after the trust section.
- [ ] Run `npm test -- --run`.
- [ ] Run `npm run lint`.
- [ ] Run `npm run build`.
- [ ] Restart preview on port 3100 and capture desktop screenshot evidence.
