# Color system

Дата: 2026-01-30

## Источник истины
- Тема переключается классом `dark` на `html`.
- Все цветовые токены и базовые стили определены в `src/styles/global.css`.

## Токены (CSS variables)
Файл: `src/styles/global.css`

- `--bg`, `--bg-alt`, `--bg-elev` — фоновые уровни
- `--text`, `--text-strong` — основной текст
- `--accent`, `--accent-2`, `--accent-3` — акценты
- `--line`, `--grid` — разделители/сетка

## Текстовая прозрачность (утилиты)
Единые классы вместо повторяющихся `color-mix`:

- `.text-strong`
- `.text-secondary`
- `.text-muted`
- `.text-disabled`

Использование: применяйте утилиты к текстовым элементам, не дублируйте `color-mix` в компонентах.

## Tailwind
- Tailwind v4, интеграция через `@tailwindcss/vite`.
- `darkMode: "class"` в `tailwind.config.mjs`.

## Рекомендации
- Добавляйте новые цвета только через CSS-переменные.
- Для компонентов — использовать утилиты и токены, не «хардкод».
