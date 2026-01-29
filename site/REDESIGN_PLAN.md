# План редизайна (строгое соответствие макетам)

Дата: 2026-01-29

## 1. Принцип

Приоритет — **не отходить от дизайна макетов**. Никакой «адаптации под вкус», «упрощений» или «вариаций»:
- Верстка, размеры, отступы, сетки, типографика, рамки, засечки, stroke‑эффекты, свечения — **повторяются 1:1**.
- Любые отличия допустимы **только** если обусловлены техническими ограничениями Astro/Tailwind и предварительно согласованы.
- Контент может быть подставлен из `src/data/`, но **без изменения визуальной структуры**.

## 2. Что есть в Makets needed (структура макетов)

Папка: `../Makets needed/`

- `1 Main losyah/`
  - `code.html` — главная страница (dark терминальная инженерная стилистика)
  - `screen.png` — референс
- `1 nexus dark/`
  - `code.html` — кейс/проект (dark)
  - `screen.png`
- `1 nexus light/`
  - `code.html` — кейс/проект (light)
  - `screen.png`
- `1 nexus tablet dark/`
  - `code.html` — адаптив кейса (tablet, dark)
  - `screen.png`
- `1 menu light/`
  - `code.html` — мобильное меню (light)
  - `screen.png`
- `1 Preloader dark/`
  - `code.html` — прелоадер (dark)
  - `screen.png`
- `1 preloader ligth/`
  - `code.html` — прелоадер (light)
  - `screen.png`
- `10000 Main old/`
  - `code.html` — старый вариант главной (не использовать)
  - `screen.png`

## 3. Что есть в проекте (текущая структура сайта)

- `src/pages/index.astro` — главная (RU)
- `src/pages/en/index.astro` — главная (EN)
- `src/pages/project/nexus.astro` — кейс (RU)
- `src/pages/en/project/nexus.astro` — кейс (EN)
- `src/components/` — UI блоки
- `src/layouts/BaseLayout.astro` — общий layout
- `src/data/site.ts` — контент RU/EN
- `src/data/projects.ts` — проекты
- `src/styles/global.css` — глобальные стили/тема
- `public/` — статические файлы

## 4. Цели редизайна (строгое соответствие)

- Полное повторение визуала из макетов:
  - `1 Main losyah` → главная RU/EN.
  - `1 nexus dark` + `1 nexus light` → кейс RU/EN.
  - `1 menu light` → мобильное меню.
  - `1 Preloader dark` + `1 preloader ligth` → прелоадер.
  - `1 nexus tablet dark` → адаптив планшета.
- Сохранить переключение RU/EN.
- Сохранить светлую/темную тему (по устройству + manual toggle).
- Переходы между страницами **без видимых скачков** (overlay из макета).
- Все анимации — как в референсах (GSAP + CSS), без упрощений.

## 5. Архитектура страниц

- Главная:
  - RU: `/`
  - EN: `/en`
  - Разметка соответствует `1 Main losyah` **буквально**.
- Кейс:
  - RU: `/project/nexus`
  - EN: `/en/project/nexus`
  - Разметка соответствует `1 nexus dark` и `1 nexus light` **буквально**.

## 6. Темы

- Все переменные темы в `src/styles/global.css`.
- Светлая/темная тема — строго как в макетах.
- Переключение темы хранится в `localStorage`, применяется на `html[data-theme]`.
- По умолчанию — тема устройства.

### 6.1 Цветовые схемы (единая палитра на все макеты)

**Light (база — `../Makets needed/1 nexus light/code.html`):**
- Primary/Bronze: `#A85D3D`
- Background (cream): `#FDFCF0`
- Ink/Charcoal: `#1C1C1C`
- Surface light: `rgba(255, 255, 255, 0.6)`
- Grid: `rgba(168, 93, 61, 0.08)`
- Scrollbar track/thumb: `#FDFCF0` / `#A85D3D`
- Text stroke: `#A85D3D`
- Card border/bg: `rgba(168, 93, 61, 0.2)` / `rgba(255, 255, 255, 0.6)`
- Glow: `rgba(168, 93, 61, 0.2)`

**Dark (база — `../Makets needed/1 nexus dark/code.html`):**
- Background dark: `#221c10`
- Surface dark: `#0f0e0d`
- Ink: `#fafaf9`
- Ochre: `#d97706`
- Primary: `#eca013`
- Amber glow: `#f59e0b`
- Technical grey: `#292524`
- Grid: `rgba(255, 255, 255, 0.03)`
- Scrollbar track/thumb: `#0c0a09` / `#d97706`
- Card border/bg: `rgba(217, 119, 6, 0.15)` / `rgba(12, 10, 9, 0.6)`
- Glow: `rgba(217, 119, 6, 0.3)`

**Preloader (использовать свои макеты, но не смешивать с базой):**
- Dark preloader (из `1 Preloader dark`): ochre `#f59e0b`, amber-dark `#b45309`, amber-light `#fbbf24`, ink `#e5e5e5`, grid `rgba(255, 255, 255, 0.08)`
- Light preloader (из `1 preloader ligth`): amber-accent `#D97706`, bronze `#B45309`, cream `#FDFCF0`, charcoal `#1F2937`, grid `rgba(31, 41, 55, 0.05)`

**Правило нормализации:**
- Одна палитра Light и одна палитра Dark используются **на всех макетах и страницах сайта**.
- Источники палитры: только `1 nexus light` и `1 nexus dark`.
- Никаких смешений между темами и макетами.

## 7. Переходы между страницами (Seamless)

- Overlay слой строго по макету (grid + fade + scanline).
- Перехват внутренних ссылок с GSAP‑анимацией перед `window.location`.
- На загрузке страницы — обратная анимация (fade out).
- Для `prefers-reduced-motion` — fallback без анимаций.

## 8. Прелоадер

- Разметка **идентична** макету `1 Preloader dark` / `1 preloader ligth`.
- Отображается только 1 раз за сессию (или по решению).
- Процент, линия прогресса, декоративные слои — все как в референсе.
- GSAP управляет показом/скрытием.

## 9. План работ (без адаптаций)

### Этап A — База
1. Перенести CSS‑переменные 1:1 с макетов (цвета, границы, grid, glow).
2. Собрать точные утилиты (grid фон, corner markers, stroke text).
3. Проверить типографику (Space Grotesk/Mono) и размеры.

### Этап B — Главная (Main)
1. Перенести DOM‑структуру `1 Main losyah` в Astro.
2. Подставить контент из `src/data/site.ts` **без изменения структуры**.
3. Сверить по `screen.png` в пиксель‑перфект.

### Этап C — Кейс (Nexus)
1. Перенести DOM‑структуру `1 nexus dark`/`light`.
2. Контент подставить из `src/data/` или выделенного `caseStudy`.
3. Адаптив планшета — по `1 nexus tablet dark`.

### Этап D — Меню
1. Мобильное меню строго по `1 menu light`.
2. Поведение открытия/закрытия как в макете.

### Этап E — Прелоадер
1. Компонент `Preloader.astro` по макетам.
2. GSAP timeline соответствует референсу.

### Этап F — Переходы
1. PageTransition overlay строго по макету.
2. Перехват ссылок + GSAP до перехода.

### Этап G — Финальные сверки
1. Сверка light/dark.
2. Сверка RU/EN.
3. Сверка мобильного меню.
4. Проверка `prefers-reduced-motion`.

## 10. Что нужно согласовать заранее

- Нужно ли показывать прелоадер **каждый раз** или только 1 раз за сессию?
  - Показывать
- Любые отклонения от макета (если появятся) — только после явного подтверждения.
  - Да. Но сначала завершить перенос дизайна. Потом остальные вопросы
