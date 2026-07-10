# AVENOR Cinematic Motion Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a responsive, accessible cinematic motion system to AVENOR.

**Architecture:** A root client provider coordinates Lenis and ScrollTrigger.
Feature components own scoped GSAP contexts and select desktop, mobile, or reduced
motion behavior through media queries.

**Tech Stack:** Next.js, React, TypeScript, Lenis, GSAP, ScrollTrigger, `@gsap/react`, Vitest.

## Global Constraints

- Keep the dark cinematic quiet luxury direction.
- No bounce, overshoot, playful motion, or layout-property animation.
- Desktop hero may pin; mobile hero must remain in normal document flow.
- Respect `prefers-reduced-motion`.

---

### Task 1: Motion contracts and root provider

**Files:**
- Create: `lib/motion.ts`
- Create: `data/hero-scenes.ts`
- Create: `components/MotionProvider.tsx`
- Modify: `app/layout.tsx`
- Test: `tests/motion.test.ts`

**Interfaces:**
- Produces `resolveMotionMode`, `motion`, `heroScenes`, and `MotionProvider`.

- [ ] Write tests for desktop, mobile, reduced motion, and exactly three scene categories.
- [ ] Run the focused tests and confirm missing-module failure.
- [ ] Add dependencies and implement the tested contracts.
- [ ] Synchronize Lenis with GSAP ticker and clean up on unmount.
- [ ] Run the focused tests and confirm they pass.

### Task 2: Preloader and hero sequence

**Files:**
- Create: `components/Preloader.tsx`
- Create: `components/HeroRevealSequence.tsx`
- Modify: `app/page.tsx`
- Modify: `app/globals.css`

**Interfaces:**
- Consumes `heroScenes`, `site`, GSAP, and ScrollTrigger.
- Produces first-visit preloader and responsive three-scene hero.

- [ ] Build a once-per-tab preloader with a deterministic skip path.
- [ ] Build the desktop pinned clip-path timeline.
- [ ] Build the mobile normal-flow reveal sequence.
- [ ] Add reduced-motion styles and refresh ScrollTrigger after the preloader.

### Task 3: Reusable reveals and case hover

**Files:**
- Create: `components/ImageReveal.tsx`
- Create: `components/TextReveal.tsx`
- Modify: `components/CaseCard.tsx`
- Modify: `app/page.tsx`
- Modify: `app/cases/[slug]/page.tsx`
- Modify: `app/globals.css`

**Interfaces:**
- Produces scoped, once-only image and text reveal primitives.

- [ ] Add clip-path image reveals without changing intrinsic aspect ratios.
- [ ] Add short fade-up reveals to section headings and introductions.
- [ ] Refine case hover with pointer-gated image, border, and label feedback.

### Task 4: Verification and motion review

**Files:**
- Review: `components/*.tsx`
- Review: `app/globals.css`

**Interfaces:**
- Produces verified desktop, mobile, and reduced-motion behavior.

- [ ] Run tests, lint, and production build.
- [ ] Run the animation standards scan and fix all blocking findings.
- [ ] Browser-test desktop, tablet, mobile, and reduced-motion viewports.
- [ ] Confirm no horizontal overflow, console errors, or broken routes.

