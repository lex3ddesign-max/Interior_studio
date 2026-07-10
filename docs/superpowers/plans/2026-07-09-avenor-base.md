# AVENOR Base Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build the static AVENOR marketing site foundation and all requested routes.

**Architecture:** Use Next.js App Router server components around typed static
data. Isolate the two interactive concerns—mobile navigation and contact-form
state—in small client components.

**Tech Stack:** Next.js 16, React 19, TypeScript, Tailwind CSS 4, Vitest.

## Global Constraints

- Visual direction: dark cinematic quiet luxury.
- Primary typeface: Manrope.
- No GSAP, Lenis, preloader, custom cursor, page transitions, or complex motion.
- Content lives in `/data` and is ready for a future CMS adapter.

---

### Task 1: Project foundation and data contracts

**Files:**
- Create: `package.json`
- Create: `app/globals.css`
- Create: `data/site.ts`
- Create: `data/navigation.ts`
- Create: `data/cases.ts`
- Create: `data/services.ts`
- Create: `data/pricing.ts`
- Create: `data/testimonials.ts`
- Test: `tests/data.test.ts`

**Interfaces:**
- Produces typed `site`, `navigation`, `cases`, `services`, `pricing`, and
  `testimonials` exports.

- [ ] Write tests that require five unique cases, three route-backed services,
  three pricing entries, and valid internal navigation targets.
- [ ] Run `npm test -- --run` and confirm failure because the modules do not exist.
- [ ] Add configuration, tokens, and the typed data modules.
- [ ] Run `npm test -- --run` and confirm the data tests pass.

### Task 2: Shared components and form validation

**Files:**
- Create: `components/Header.tsx`
- Create: `components/Footer.tsx`
- Create: `components/Logo.tsx`
- Create: `components/Button.tsx`
- Create: `components/SectionLabel.tsx`
- Create: `components/CaseCard.tsx`
- Create: `components/ServiceCard.tsx`
- Create: `components/PricingCard.tsx`
- Create: `components/ContactForm.tsx`
- Create: `lib/contact.ts`
- Create: `lib/utils.ts`
- Test: `tests/contact.test.ts`

**Interfaces:**
- Consumes typed data records.
- Produces reusable cards, navigation, form UI, and `validateContactForm`.

- [ ] Write validation tests for missing name, missing contact, and valid data.
- [ ] Run the focused test and confirm failure because `lib/contact.ts` is missing.
- [ ] Implement the validation helper and shared components.
- [ ] Run the test suite and confirm it passes.

### Task 3: Routes and homepage composition

**Files:**
- Create: `app/layout.tsx`
- Create: `app/page.tsx`
- Create: `app/cases/page.tsx`
- Create: `app/cases/[slug]/page.tsx`
- Create: `app/services/page.tsx`
- Create: `app/services/interior-visualization/page.tsx`
- Create: `app/services/exterior-visualization/page.tsx`
- Create: `app/services/commercial-spaces/page.tsx`
- Create: `app/contacts/page.tsx`
- Create: `components/ContactSection.tsx`
- Create: `components/ServicePage.tsx`

**Interfaces:**
- Consumes all shared data and components.
- Produces the eight requested route patterns and complete homepage.

- [ ] Compose the shared root layout and homepage sections.
- [ ] Add portfolio, case-detail, service-index, service-detail, and contact pages.
- [ ] Run tests and ESLint.
- [ ] Run `npm run build` and verify all static routes compile.
- [ ] Start production locally and request `/`, `/cases`, a case slug, and a
  service route, expecting HTTP 200.

