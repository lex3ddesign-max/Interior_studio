# AVENOR Icons And Section Labels Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Заменить декоративную нумерацию смысловых карточек тематическими иконками и сделать подписи секций со слэшем читаемыми во всём проекте.

**Architecture:** Семантические имена иконок и fallback определяются чистой функцией в `lib/icons.ts`; визуальный SVG-компонент остаётся в `components/FeatureIcon.tsx`. Общий `SectionLabel` централизованно меняет формат всех подписей.

**Tech Stack:** Next.js, React, TypeScript, Tailwind CSS, Vitest.

## Global Constraints

- Не добавлять библиотеку иконок.
- Иконки декоративные, линейные, бронзовые, 22–24 px и скрыты через `aria-hidden`.
- Нумерацию этапов процесса, сцен и последовательных списков сохранить.
- `SectionLabel` должен показывать индекс, бронзовый слэш и название размером не меньше 12 px.

---

### Task 1: Контракт тематических иконок

**Files:**
- Create: `lib/icons.ts`
- Create: `components/FeatureIcon.tsx`
- Test: `tests/icons.test.ts`

**Interfaces:**
- Produces: `FeatureIconName`, `normalizeFeatureIcon(name)` и `<FeatureIcon name />`.

- [ ] Написать failing tests для разрешённых имён и fallback `detail`.
- [ ] Выполнить `npm test -- --run tests/icons.test.ts` и подтвердить ожидаемый FAIL.
- [ ] Создать union имён, чистую функцию нормализации и SVG-компонент с отдельным path-набором для каждого смысла.
- [ ] Повторить focused test и получить PASS.

### Task 2: Замена декоративных номеров

**Files:**
- Modify: `app/page.tsx`
- Modify: `components/PricingCard.tsx`
- Modify: `components/ServiceCard.tsx`

**Interfaces:**
- Consumes: `<FeatureIcon name />`.
- Preserves: числовые индексы process, hero scenes и ordered lists.

- [ ] Добавить семантическое имя иконки в данные карточек позиционирования.
- [ ] Передать имя иконки в `PricingCard` и заменить декоративный номер.
- [ ] Заменить номер услуги из `eyebrow` на иконку, сохранив название услуги.
- [ ] Поискать оставшиеся `0{index + 1}` и классифицировать каждый как последовательный или декоративный.

### Task 3: Системная подпись секций

**Files:**
- Modify: `components/SectionLabel.tsx`
- Modify: `app/globals.css`

**Interfaces:**
- Preserves: `children`, `index`, `className`.
- Produces: визуальный формат `01 / НАЗВАНИЕ`.

- [ ] Добавить отдельный `aria-hidden` слэш и классы `section-label-*`.
- [ ] Увеличить размер до 12 px, контраст индекса/слэша и межэлементные интервалы.
- [ ] Проверить все использования `SectionLabel` через `rg`.

### Task 4: Verification

**Files:**
- Update: `qa/visual-polish/notes.md`

- [ ] Выполнить `npm test -- --run`.
- [ ] Выполнить `npm run lint`.
- [ ] Выполнить `npm run build`.
- [ ] Перезапустить production preview на порту 3100.
- [ ] Проверить главную и внутреннюю страницу в браузере, сохранить скриншот.
