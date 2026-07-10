# AVENOR Visual Polish Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Довести изображения, мобильную версию, визуальную систему и motion существующего прототипа AVENOR до согласованного уровня dark cinematic quiet luxury.

**Architecture:** Визуальные настройки изображений хранятся в данных услуг, а компоненты интерпретируют их адаптивно. Интерактивные и motion-решения остаются в существующих изолированных компонентах и чистых функциях `lib`, чтобы критические правила можно было проверить тестами без браузера.

**Tech Stack:** Next.js App Router, TypeScript, Tailwind CSS, GSAP, ScrollTrigger, Lenis, Vitest.

## Global Constraints

- Не добавлять новые визуальные библиотеки.
- Hover-motion включать только при `(hover: hover) and (pointer: fine)`.
- При `prefers-reduced-motion: reduce` исключать pinning, параллакс, масштабирование и перемещение.
- Сохранять dark cinematic quiet luxury, без резких, дешёвых и игровых эффектов.
- Проверить desktop и mobile в браузере; затем выполнить test, lint и production build.

---

### Task 1: Адаптивный art direction для hero

**Files:**
- Modify: `data/services.ts`
- Modify: `components/ServicePage.tsx`
- Test: `tests/data.test.ts`

**Interfaces:**
- Consumes: `Service` и массив `services`.
- Produces: `heroPosition.desktop`, `heroPosition.mobile`, используемые `ServicePage`.

- [ ] **Step 1: Write the failing test**

Добавить проверку, что каждая услуга задаёт непустые desktop/mobile позиции изображения и локальный hero asset.

- [ ] **Step 2: Run test to verify it fails**

Run: `npm test -- --run tests/data.test.ts`
Expected: FAIL из-за отсутствующих `heroPosition`.

- [ ] **Step 3: Write minimal implementation**

Добавить позиции в данные и применить их через CSS variables/адаптивные классы. Заменить плоский слой тонировки на общий veil плюс направленный градиент под текстом.

- [ ] **Step 4: Run test to verify it passes**

Run: `npm test -- --run tests/data.test.ts`
Expected: PASS.

### Task 2: Мобильная навигация и безопасный layout

**Files:**
- Modify: `components/Header.tsx`
- Modify: `app/globals.css`
- Test: `tests/interactions.test.ts`

**Interfaces:**
- Consumes: `navigation`, текущий `Header`.
- Produces: управляемое mobile menu с `aria-expanded`, Escape/route-close и блокировкой scroll.

- [ ] **Step 1: Write the failing test**

Добавить чистую функцию определения следующего состояния меню/доступности и тест на закрытие по Escape/переходу.

- [ ] **Step 2: Run test to verify it fails**

Run: `npm test -- --run tests/interactions.test.ts`
Expected: FAIL из-за отсутствующей функции.

- [ ] **Step 3: Write minimal implementation**

Сделать Header client-компонентом, добавить кнопку меню с 44px hit target, полноэкранную компактную панель и видимые focus styles. Устранить горизонтальное переполнение и скорректировать мобильные отступы/типографику.

- [ ] **Step 4: Run test to verify it passes**

Run: `npm test -- --run tests/interactions.test.ts`
Expected: PASS.

### Task 3: Единая система карточек, кнопок и типографики

**Files:**
- Modify: `app/globals.css`
- Modify: `components/Button.tsx`
- Modify: `components/CaseCard.tsx`
- Modify: `components/ServiceCard.tsx`
- Modify: `components/PricingCard.tsx`

**Interfaces:**
- Consumes: существующие component props без изменения публичного API.
- Produces: согласованные focus, active и hover states.

- [ ] **Step 1: Add static regression assertions**

Расширить существующие тесты проверками чистых interaction-настроек, если требуется новое вычисляемое поведение.

- [ ] **Step 2: Apply minimal visual system**

Выровнять рамки, поверхности, высоты интерактивных областей, responsive typography и вертикальный ритм. Добавить `:focus-visible` и короткий `:active` scale.

- [ ] **Step 3: Run focused tests**

Run: `npm test -- --run tests/interactions.test.ts tests/data.test.ts`
Expected: PASS.

### Task 4: Motion review и reduced-motion

**Files:**
- Modify: `lib/motion.ts`
- Modify: `components/MotionProvider.tsx`
- Modify: `components/HeroRevealSequence.tsx`
- Modify: `components/ImageReveal.tsx`
- Modify: `components/TextReveal.tsx`
- Modify: `app/globals.css`
- Test: `tests/motion.test.ts`

**Interfaces:**
- Consumes: `prefers-reduced-motion`, desktop/mobile media queries.
- Produces: motion presets с GPU-friendly transform/opacity и безопасный reduced path.

- [ ] **Step 1: Write failing motion tests**

Проверить, что reduced preset не содержит movement/pinning, а стандартные UI timings и easing соответствуют принятому набору.

- [ ] **Step 2: Run test to verify it fails**

Run: `npm test -- --run tests/motion.test.ts`
Expected: FAIL на новом контракте motion presets.

- [ ] **Step 3: Implement and review motion**

Убрать `transition: all`, негейтированные hover и лишние layout-анимации; синхронизировать Lenis/ScrollTrigger; оставить в reduced режиме только короткий opacity reveal.

- [ ] **Step 4: Run motion tests**

Run: `npm test -- --run tests/motion.test.ts`
Expected: PASS.

### Task 5: Browser QA и финальная проверка

**Files:**
- Create: `qa/visual-polish/notes.md`
- Create: `qa/visual-polish/*.png`

**Interfaces:**
- Consumes: production preview.
- Produces: desktop/mobile screenshots и список проверенных состояний.

- [ ] **Step 1: Run automated verification**

Run: `npm test -- --run`
Expected: все тесты PASS.

Run: `npm run lint`
Expected: exit 0.

Run: `npm run build`
Expected: exit 0.

- [ ] **Step 2: Capture desktop states**

Проверить `/`, `/services`, три страницы услуг и mobile menu на desktop viewport.

- [ ] **Step 3: Capture mobile states**

Проверить те же ключевые поверхности на узком viewport, включая open/close меню и reduced-motion.

- [ ] **Step 4: Record findings**

Сохранить принятые скриншоты и заметки с результатом по hero, layout, components, motion и accessibility.
