# Чеклист: Tailwind темы (light/dark) + правки по docs

## 0) Подготовка
- [ ] Определить стратегию: CSS‑tokens + Tailwind colors (рекомендуется).
- [ ] Зафиксировать набор токенов (light/dark) на базе nexus light/dark.

## 1) Tailwind конфигурация
- [ ] Создать `tailwind.config.(js|mjs|ts)` с `darkMode: "class"`.
- [ ] Прописать `content` для `src/**/*.{astro,ts,tsx,js,jsx,md,mdx}`.
- [ ] В `theme.extend.colors` связать цвета с CSS‑переменными (`var(--color-*)`).

## 2) Базовые темы (light/dark)
- [ ] В `src/styles/global.css` задать все **light** токены в `:root`.
- [ ] В `src/styles/global.css` задать все **dark** токены в `html.dark`.
- [ ] Перевести существующие `data-theme` на `html.dark` (или согласовать оба способа).

## 3) Переключение темы
- [ ] Обновить JS: переключать класс `dark` на `<html>`.
- [ ] Сохранение в `localStorage` через safe‑storage.
- [ ] Учет `prefers-color-scheme` без мерцания.

## 4) Удаление hardcoded цветов
- [ ] `text-green-500` → токен терминала.
- [ ] `text-emerald-500` → токен статуса.
- [ ] Любые другие фиксированные Tailwind‑цвета → токены.

## 5) Исправления по color-theme-review
- [ ] Починить `--color-contrast` в dark.
- [ ] Нормализовать дубли цветовых переменных.
- [ ] Стандартизировать opacity‑шкалу.
- [ ] Добавить state‑цвета (success/warn/error/info).
- [ ] Исправить контраст терминала в light и курсор.

## 6) Улучшения по code-review/code-examples
- [ ] Объединить Google Fonts в один запрос + `display=swap`.
- [ ] Safe‑wrapper для `localStorage`.
- [ ] ARIA для меню + skip‑link + focus‑styles.
- [ ] Убрать дубли init‑ивентов в `animations.ts`.
- [ ] Cleanup GSAP timelines и IntersectionObserver.

## 7) Tailwind CSS оптимизации
- [ ] Убрать ручные дублирующие утилиты из CSS.
- [ ] Использовать Tailwind colors или arbitrary values.

## 8) Архитектура контента (flexible-projects-architecture)
- [ ] Подготовить `src/content/config.ts`.
- [ ] Создать `src/content/projects/*` и `src/content/case-studies/*`.
- [ ] Динамические маршруты `/project/[slug]`.
- [ ] Миграция данных из `src/data/*`.
- [ ] Удалить старые статические страницы кейсов.

## 9) Проверка
- [ ] Light/Dark визуальная сверка на всех ключевых страницах.
- [ ] Проверка контрастов (WCAG).
- [ ] Проверка RU/EN.
- [ ] `npm run build`.
