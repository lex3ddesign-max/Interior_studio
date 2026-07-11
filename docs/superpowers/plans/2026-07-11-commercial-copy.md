# Commercial Copy Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Переписать коммерческие тексты AVENOR в утверждённом quiet luxury tone of voice.

**Architecture:** Контент хранится в data-файлах и небольших локальных массивах страниц/компонентов. Правки выполняются без изменения маршрутов и визуальной структуры: меняется смысл, SEO-copy и тестовые ожидания.

**Tech Stack:** Next.js App Router, TypeScript, Tailwind, Vitest, ESLint.

## Global Constraints

- Тон: quiet luxury / экспертный.
- Не менять цены, сроки и структуру таблиц.
- Не добавлять новые зависимости.
- Не менять изображения и motion-слой.
- После правок выполнить `npm test -- --run`, `npm run lint`, `npm run build`.

---

### Task 1: Core home and listing copy

**Files:**
- Modify: `data/site.ts`
- Modify: `data/homeBanners.ts`
- Modify: `data/listingHeroes.ts`
- Modify: `data/testimonials.ts`
- Modify: `app/page.tsx`

**Interfaces:**
- Consumes: existing exports `site`, `homeBanners`, `listingHeroes`, `testimonials`.
- Produces: same exported names and shapes.

- [ ] Replace generic positioning/process/testimonial copy with client-benefit language.
- [ ] Keep all exported object shapes unchanged.
- [ ] Keep text length close to current layout.

### Task 2: Service and FAQ copy

**Files:**
- Modify: `data/services.ts`
- Modify: `components/ServicePage.tsx`

**Interfaces:**
- Consumes: `Service` type and `services` array.
- Produces: unchanged `Service` type and route-compatible service data.

- [ ] Rewrite service descriptions for interior, exterior, commercial.
- [ ] Rewrite service-specific FAQ answers.
- [ ] Rewrite common process and common FAQ to sound practical and premium.

### Task 3: Pricing copy

**Files:**
- Modify: `data/pricing.ts`
- Modify: `app/pricing/page.tsx`

**Interfaces:**
- Consumes: `pricing`, `pricingPackages`, `pricingServiceSections`, `pricingFactors`.
- Produces: unchanged pricing structures and prices.

- [ ] Rewrite notes, bestFor, package deliverables and factors.
- [ ] Keep exact price values unchanged where tests depend on them.
- [ ] Update pricing page hero/CTA copy.

### Task 4: Case and studio copy

**Files:**
- Modify: `data/cases.ts`
- Modify: `app/about/page.tsx`
- Modify: `components/ContactSection.tsx`
- Modify: `app/contacts/page.tsx`

**Interfaces:**
- Consumes: existing route data and page components.
- Produces: same routes and metadata.

- [ ] Rewrite case descriptions, stories, highlights and technicalDocs.
- [ ] Rewrite about principles without placeholder language.
- [ ] Rewrite contact CTA around calm first step and material review.

### Task 5: Tests and verification

**Files:**
- Modify: `tests/data.test.ts` if exact text expectations change.

**Interfaces:**
- Consumes: Vitest test suite.
- Produces: passing tests.

- [ ] Update exact copy assertions only where required.
- [ ] Run `npm test -- --run`.
- [ ] Run `npm run lint`.
- [ ] Run `npm run build`.
- [ ] Commit, push and deploy the verified version.
