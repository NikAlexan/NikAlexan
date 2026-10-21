---
tag: "PET_03 / Этот сайт"
title: "Миграция nikalexan.com"
description: "Кейс Никиты Василенко: как обновить сайт на Astro с 5 на 7 версию, закрыть 16 уязвимостей из npm audit и перевести контент на Content Layer API."
subtitle: "Astro 5 → 7"
version: "октябрь 2026"
roleLabel: "Моя роль"
role: "Аудит зависимостей, обновление Astro и Tailwind, перевод коллекций контента на новый API"
timelineLabel: "Сроки"
timeline: "Октябрь 2026, один вечер"
deliverablesLabel: "Результат"
deliverables: "0 уязвимостей в npm audit, те же 6 страниц после сборки"
challengeLabel: "Задача"
challengeTitle: "npm audit нашёл критическую уязвимость в самом Astro"
challengeBody: "В astro 5.16.15 оптимизация AVIF-картинок позволяла удалённо выполнить код (GHSA-26w7-cxv4-gfx2). Исправление вышло только в 7.2.8, а Astro 6 удалил старый API коллекций контента, на котором держались все страницы проектов. Обновиться точечно не получалось: пришлось перескочить через мажорную версию и переписать загрузку контента."
challengeMetrics:
  - value: "16"
    label: "уязвимых пакетов"
  - value: "1"
    label: "критическая"
  - value: "14"
    label: "высокого уровня"
stackLabel: "Стек"
stackTitle: "Статический сайт на Astro"
stackBody: "Astro собирает статические страницы на русском и английском, контент лежит в Markdown-коллекциях со схемами на Zod. Стили на Tailwind 4, деплой на Netlify. Большинство уязвимостей сидело не в Astro, а в его зависимостях: sharp, vite, rollup, postcss, svgo."
stack:
  - "Astro"
  - "TypeScript"
  - "Zod"
  - "Tailwind CSS"
  - "Netlify"
outcomeLabel: "Решения"
outcomes:
  - title: "Сразу на 7.x"
    text: "Обновил astro до 7.4.1 и @astrojs/mdx до 8.1.0, заодно Tailwind до 4.3.3. Промежуточная шестая версия не закрывала критическую уязвимость."
  - title: "Content Layer API"
    text: "Перенёс src/content/config.ts в src/content.config.ts с загрузчиком glob(), z теперь из astro/zod. Вместо entry.slug везде entry.id, вместо getEntryBySlug обычный поиск по коллекции."
  - title: "Проверка, что ничего не сломалось"
    text: "После npm audit fix для остальных транзитивных пакетов сравнил сборку: те же 6 страниц с тем же текстом, маршруты /project/* и /en/project/* на месте."
console:
  filename: "site/src/content.config.ts"
  languageTag: "ts"
  code: |
    import { glob } from "astro/loaders";
    import { z } from "astro/zod";

    const projects = defineCollection({
      loader: glob({
        pattern: "**/*.{md,mdx}",
        base: "./src/content/projects"
      }),
      schema: z.object({ /* ... */ })
    });
  statusLabel: "commit 7ec9744"
  statusState: "success"
outcome:
  metric: "16 → 0"
  title: "Что изменил после"
  body: "Я пропустил мажорную версию, и обновление стало большим. После миграции я включил Dependabot: теперь он сам сообщает об уязвимостях, и обновления приходят, пока они ещё небольшие."
  ctaLabel: "Pull request на GitHub"
  ctaHref: "https://github.com/NikAlexan/NikAlexan/pull/4"
---
