# AVENOR Interaction Polish Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a refined desktop cursor and resilient page transitions.

**Architecture:** Pure eligibility helpers protect native browser behavior.
Root-level client components own delegated pointer and navigation listeners,
keeping existing links and server components unchanged.

**Tech Stack:** React, Next.js App Router, TypeScript, GSAP, Vitest, Playwright.

## Global Constraints

- Cursor only on desktop fine pointers without reduced motion.
- Page transitions must not intercept external, modified, download, target, or
  same-page hash navigation.
- Animate only transform, opacity, and clip-path.
- No bounce, overshoot, playful effects, or mobile navigation delay.

---

### Task 1: Interaction contracts

**Files:**
- Create: `lib/interactions.ts`
- Test: `tests/interactions.test.ts`

**Interfaces:**
- Produces `canUseCustomCursor` and `shouldInterceptNavigation`.

- [ ] Write failing tests for cursor capability and native-navigation exclusions.
- [ ] Run the focused test and confirm missing-module failure.
- [ ] Implement pure helpers.
- [ ] Run the focused test and confirm it passes.

### Task 2: Custom cursor

**Files:**
- Create: `components/CustomCursor.tsx`
- Modify: `components/Button.tsx`
- Modify: `components/CaseCard.tsx`
- Modify: `app/layout.tsx`
- Modify: `app/globals.css`

**Interfaces:**
- Consumes delegated `data-cursor` values.
- Produces default, case, and CTA cursor states.

- [ ] Add capability-gated pointer tracking and cleanup.
- [ ] Add case and CTA markers without changing link behavior.
- [ ] Add transform-only state styling and native-cursor fallback.

### Task 3: Page transitions

**Files:**
- Create: `components/PageTransition.tsx`
- Modify: `app/layout.tsx`
- Modify: `app/globals.css`

**Interfaces:**
- Consumes pathname and internal anchor clicks.
- Produces cover, route push, reveal, and safe reset behavior.

- [ ] Add delegated click eligibility using the tested helper.
- [ ] Animate the fixed overlay before desktop route changes.
- [ ] Restore scrolling and hashes after navigation.
- [ ] Keep mobile and reduced-motion navigation native.

### Task 4: Review and verification

**Files:**
- Review: `components/CustomCursor.tsx`
- Review: `components/PageTransition.tsx`
- Review: `app/globals.css`

**Interfaces:**
- Produces reviewed and browser-verified interaction behavior.

- [ ] Run tests, lint, and production build.
- [ ] Review motion against the animation standards.
- [ ] Browser-test desktop cursor and route transition.
- [ ] Browser-test mobile and reduced-motion fallbacks.

