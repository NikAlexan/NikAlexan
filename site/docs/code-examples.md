# Примеры кода для исправлений

## 1. Улучшенная загрузка шрифтов

### Текущий подход (проблема)
```html
<!-- BaseLayout.astro -->
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols..." />
```
```css
/* global.css */
@import url("https://fonts.googleapis.com/css2?family=Space+Grotesk...");
```

### Рекомендуемый подход
```html
<!-- BaseLayout.astro -->
<head>
  <!-- Preconnect для ускорения -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  
  <!-- Один объединенный запрос -->
  <link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&family=Space+Mono:ital,wght@0,400;0,700;1,400&family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" rel="stylesheet">
</head>
```

---

## 2. Безопасная работа с localStorage

### Текущий код (проблема)
```typescript
// animations.ts
const stored = localStorage.getItem("theme");
localStorage.setItem("theme", nextTheme);
```

### Исправленный код
```typescript
// src/lib/storage.ts
export class SafeStorage {
  private static isAvailable(): boolean {
    try {
      const test = '__storage_test__';
      localStorage.setItem(test, test);
      localStorage.removeItem(test);
      return true;
    } catch {
      return false;
    }
  }

  static getItem(key: string): string | null {
    if (!this.isAvailable()) return null;
    try {
      return localStorage.getItem(key);
    } catch (error) {
      console.warn(`Failed to get item "${key}":`, error);
      return null;
    }
  }

  static setItem(key: string, value: string): boolean {
    if (!this.isAvailable()) return false;
    try {
      localStorage.setItem(key, value);
      return true;
    } catch (error) {
      console.warn(`Failed to set item "${key}":`, error);
      return false;
    }
  }
}

// Использование
const theme = SafeStorage.getItem("theme");
SafeStorage.setItem("theme", nextTheme);
```

---

## 3. Улучшенная accessibility для кнопок

### Текущий код
```html
<button class="..." data-menu-toggle aria-label="Open menu">
  <span class="material-symbols-outlined">menu</span>
</button>
```

### Исправленный код
```html
<button 
  class="..."
  data-menu-toggle
  aria-label="Open menu"
  aria-expanded="false"
  aria-controls="mobile-menu"
  aria-haspopup="true"
  type="button"
>
  <span class="material-symbols-outlined" aria-hidden="true">menu</span>
  <span class="sr-only">Menu</span>
</button>

<!-- Добавить в CSS -->
<style>
  .sr-only {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border-width: 0;
  }
  
  .sr-only:focus {
    position: static;
    width: auto;
    height: auto;
    padding: inherit;
    margin: inherit;
    overflow: visible;
    clip: auto;
    white-space: normal;
  }
</style>
```

### Обновленный JavaScript
```typescript
// animations.ts
const initMenu = () => {
  const menu = document.querySelector("[data-menu]") as HTMLElement | null;
  const toggles = document.querySelectorAll<HTMLButtonElement>("[data-menu-toggle]");
  const closeBtn = document.querySelector("[data-menu-close]");

  if (!menu || !toggles.length) return;

  const openMenu = () => {
    menu.classList.remove("hidden");
    document.body.style.overflow = "hidden";
    
    // Update ARIA
    toggles.forEach(toggle => {
      toggle.setAttribute("aria-expanded", "true");
    });
  };

  const closeMenu = () => {
    menu.classList.add("hidden");
    document.body.style.overflow = "";
    
    // Update ARIA
    toggles.forEach(toggle => {
      toggle.setAttribute("aria-expanded", "false");
    });
  };

  toggles.forEach((toggle) => {
    toggle.addEventListener("click", (event) => {
      event.preventDefault();
      const isExpanded = toggle.getAttribute("aria-expanded") === "true";
      isExpanded ? closeMenu() : openMenu();
    });
  });

  // Keyboard support
  menu.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeMenu();
      toggles[0]?.focus(); // Return focus to button
    }
  });

  closeBtn?.addEventListener("click", (event) => {
    event.preventDefault();
    closeMenu();
  });

  menu.addEventListener("click", (event) => {
    const target = event.target as HTMLElement;
    if (target.closest("a[href]")) {
      closeMenu();
    }
  });
};
```

---

## 4. Рефакторинг дублирующегося кода

### Текущий код (проблема)
```astro
<!-- MainPage.astro -->
<article
  class={
    index === 2
      ? "technical-card p-8 md:p-10 group transition-all duration-500 hover:shadow-[0_0_30px_rgba(217,119,6,0.1)]"
      : "technical-card p-8 md:p-10 group transition-all duration-500 hover:shadow-[0_0_30px_rgba(217,119,6,0.1)]"
  }
>
```

### Исправленный код
```astro
---
// Вынести логику в helper функции
const getCardClasses = (index: number) => {
  const baseClasses = "technical-card p-8 md:p-10 group transition-all duration-500 hover:shadow-[0_0_30px_rgba(217,119,6,0.1)]";
  const wipClasses = index === 2 ? "opacity-70 hover:opacity-100 transition-opacity" : "";
  return `${baseClasses} ${wipClasses}`.trim();
};

const getCardBadge = (index: number) => {
  if (index === 2) {
    return {
      label: "WIP_003",
      className: "font-mono text-[10px] text-ink/40 border border-ink/20 px-2 py-1 uppercase"
    };
  }
  return {
    label: `CS_00${index + 1}`,
    className: "font-mono text-[10px] text-ochre border border-ochre/30 px-2 py-1"
  };
};

const getCardCTA = (index: number) => {
  if (index === 2) {
    return {
      label: "COMING SOON",
      icon: "lock",
      href: null,
      className: "flex items-center gap-2 text-ink/40 font-mono text-xs cursor-not-allowed uppercase"
    };
  }
  return {
    label: index === 0 && caseStudy?.ctaLabel ? caseStudy.ctaLabel : "VIEW DETAILS",
    icon: "arrow_forward",
    href: index === 0 && caseStudy?.href ? caseStudy.href : "#",
    className: "flex items-center gap-2 text-ochre font-mono text-xs hover:underline decoration-ochre underline-offset-4 uppercase"
  };
};
---

{projects.map((project, index) => {
  const cardClasses = getCardClasses(index);
  const badge = getCardBadge(index);
  const cta = getCardCTA(index);
  
  return (
    <article class={cardClasses}>
      <div class="absolute top-0 right-0 p-4 opacity-50">
        <span class={badge.className}>{badge.label}</span>
      </div>
      
      <div class="flex flex-col md:flex-row gap-10">
        <!-- Content here -->
        
        <div class="flex items-center justify-between border-t border-soft pt-6">
          <div class="flex gap-6 text-[10px] font-mono text-ink/50">
            {project.stack.slice(0, 2).map((stackItem) => (
              <span>{stackItem.toUpperCase()}</span>
            ))}
          </div>
          
          {cta.href ? (
            <a class={cta.className} href={cta.href}>
              {cta.label}
              <span class="material-symbols-outlined text-[14px]">{cta.icon}</span>
            </a>
          ) : (
            <span class={cta.className}>
              {cta.label}
              <span class="material-symbols-outlined text-[14px]">{cta.icon}</span>
            </span>
          )}
        </div>
      </div>
    </article>
  );
})}
```

---

## 5. Оптимизация CSS - убрать дублирование

### Текущий подход
```css
.text-ink { color: var(--color-ink); }
.text-ink\/30 { color: color-mix(in srgb, var(--color-ink) 30%, transparent); }
.text-ink\/40 { color: color-mix(in srgb, var(--color-ink) 40%, transparent); }
/* ... еще 50+ похожих */
```

### Рекомендуемый подход 1: Tailwind Config
```javascript
// tailwind.config.js
export default {
  theme: {
    extend: {
      colors: {
        ink: {
          DEFAULT: 'var(--color-ink)',
          30: 'color-mix(in srgb, var(--color-ink) 30%, transparent)',
          40: 'color-mix(in srgb, var(--color-ink) 40%, transparent)',
          50: 'color-mix(in srgb, var(--color-ink) 50%, transparent)',
          60: 'color-mix(in srgb, var(--color-ink) 60%, transparent)',
          70: 'color-mix(in srgb, var(--color-ink) 70%, transparent)',
        }
      }
    }
  }
}

<!-- Использование -->
<div class="text-ink-50">
```

### Рекомендуемый подход 2: Arbitrary values
```html
<!-- Прямо в HTML без создания классов -->
<div class="text-[color-mix(in_srgb,var(--color-ink)_50%,transparent)]">
```

---

## 6. Улучшенная обработка событий

### Текущий код
```typescript
// animations.ts
window.addEventListener("DOMContentLoaded", () => run("DOMContentLoaded"));
window.addEventListener("load", () => run("load"));
document.addEventListener("astro:page-load", () => run("astro:page-load"));
document.addEventListener("astro:after-swap", () => run("astro:after-swap"));
```

### Исправленный код
```typescript
// animations.ts
type EventConfig = {
  target: Window | Document;
  name: string;
};

const events: EventConfig[] = [
  { target: window, name: "DOMContentLoaded" },
  { target: window, name: "load" },
  { target: document, name: "astro:page-load" },
  { target: document, name: "astro:after-swap" },
];

const controllers: AbortController[] = [];

events.forEach(({ target, name }) => {
  const controller = new AbortController();
  controllers.push(controller);
  
  target.addEventListener(
    name,
    () => {
      if (import.meta.env.DEV) {
        console.log(`[animations] init via ${name}`);
      }
      init();
    },
    { signal: controller.signal }
  );
});

// Cleanup function
export const cleanup = () => {
  controllers.forEach(controller => controller.abort());
};
```

---

## 7. Исправление memory leak в animations

### Текущий код (проблема)
```typescript
// animations.ts - typing animation
const timeline = gsap.timeline({ repeat: -1, delay: startDelay });
// Никогда не очищается!
```

### Исправленный код
```typescript
// animations.ts
const timelines = new Map<HTMLElement, gsap.core.Timeline>();

const initMascotTyping = () => {
  const nodes = document.querySelectorAll<HTMLElement>("[data-typing]");
  if (!nodes.length) return;

  nodes.forEach((node) => {
    // Очистить старый timeline если есть
    const existingTimeline = timelines.get(node);
    if (existingTimeline) {
      existingTimeline.kill();
      timelines.delete(node);
    }

    if (node.dataset.typingInit === "true") return;
    node.dataset.typingInit = "true";

    const textEl = node.querySelector<HTMLElement>("[data-typing-text]");
    if (!textEl) return;

    let items: string[] = [];
    const rawItems = node.getAttribute("data-typing-items");
    if (rawItems) {
      try {
        const parsed = JSON.parse(rawItems);
        if (Array.isArray(parsed)) {
          items = parsed.filter((item) => typeof item === "string" && item.trim().length);
        }
      } catch {
        items = [];
      }
    }

    if (!items.length) return;

    if (prefersReducedMotion) {
      textEl.textContent = items[0];
      return;
    }

    const typeSpeed = 0.045;
    const deleteSpeed = 0.022;
    const pause = 1.2;
    const between = 0.25;
    const startDelay = 0.2;

    const timeline = gsap.timeline({ repeat: -1, delay: startDelay });
    timelines.set(node, timeline); // Сохранить для cleanup

    items.forEach((text, itemIndex) => {
      const state = { count: 0 };
      const length = text.length;

      timeline.to(state, {
        count: length,
        duration: Math.max(length * typeSpeed, 0.2),
        ease: "none",
        snap: { count: 1 },
        onUpdate: () => {
          textEl.textContent = text.slice(0, Math.round(state.count));
        }
      });

      timeline.to({}, { duration: pause });

      timeline.to(state, {
        count: 0,
        duration: Math.max(length * deleteSpeed, 0.15),
        ease: "none",
        snap: { count: 1 },
        onUpdate: () => {
          textEl.textContent = text.slice(0, Math.round(state.count));
        }
      });

      if (itemIndex < items.length - 1) {
        timeline.to({}, { duration: between });
      }
    });
  });
};

// Cleanup function
const cleanupTypingAnimations = () => {
  timelines.forEach(timeline => timeline.kill());
  timelines.clear();
};

// Вызвать при navigation или unmount
window.addEventListener("beforeunload", cleanupTypingAnimations);
document.addEventListener("astro:before-swap", cleanupTypingAnimations);
```

---

## 8. Улучшенная типизация TypeScript

### Текущий код
```typescript
// site.ts
const { title, description, locale, ogImage, url } = Astro.props;
```

### Исправленный код
```typescript
// src/types/props.ts
export interface BaseLayoutProps {
  title: string;
  description: string;
  locale: 'ru' | 'en';
  ogImage: string;
  url: string;
}

export interface ProjectCardProps {
  project: Project;
  index: number;
  caseStudy?: CaseStudy;
}

// BaseLayout.astro
---
import type { BaseLayoutProps } from '../types/props';

interface Props extends BaseLayoutProps {}

const { title, description, locale, ogImage, url } = Astro.props;
---
```

---

## 9. CSP Headers Configuration

### Добавить в astro.config.mjs
```javascript
// astro.config.mjs
import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';

export default defineConfig({
  integrations: [tailwind()],
  vite: {
    build: {
      rollupOptions: {
        output: {
          // Генерируем nonce для inline scripts
          manualChunks: (id) => {
            if (id.includes('node_modules')) {
              return 'vendor';
            }
          }
        }
      }
    }
  },
  // Headers для production
  server: {
    headers: {
      'Content-Security-Policy': [
        "default-src 'self'",
        "script-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
        "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
        "font-src 'self' https://fonts.gstatic.com",
        "img-src 'self' data: https:",
        "connect-src 'self'",
      ].join('; ')
    }
  }
});
```

---

## 10. Focus Management для доступности

### Добавить в global.css
```css
/* Улучшенные focus styles */
*:focus {
  outline: none;
}

*:focus-visible {
  outline: 2px solid var(--color-ochre);
  outline-offset: 2px;
  border-radius: 2px;
}

/* Для интерактивных элементов */
a:focus-visible,
button:focus-visible,
input:focus-visible,
textarea:focus-visible,
select:focus-visible {
  outline: 2px solid var(--color-ochre);
  outline-offset: 2px;
  box-shadow: 0 0 0 4px color-mix(in srgb, var(--color-ochre) 20%, transparent);
}

/* Skip link */
.skip-link {
  position: absolute;
  top: -40px;
  left: 0;
  background: var(--color-ochre);
  color: var(--color-cream);
  padding: 8px 16px;
  text-decoration: none;
  font-weight: bold;
  z-index: 100;
  transition: top 0.2s ease;
}

.skip-link:focus {
  top: 0;
}
```

### Добавить в BaseLayout.astro
```astro
<body>
  <a href="#main-content" class="skip-link">
    Skip to main content
  </a>
  
  <PageTransition />
  <slot />
  
  <div id="main-content" tabindex="-1">
    <!-- Main content -->
  </div>
</body>
```

---

## 11. Error Boundary Component

### Создать новый компонент
```astro
---
// src/components/ErrorBoundary.astro
interface Props {
  fallback?: string;
}

const { fallback = "Something went wrong. Please try again." } = Astro.props;
---

<div class="error-boundary" data-error-boundary>
  <slot />
  <div class="error-message hidden" data-error-message>
    <div class="error-content">
      <span class="material-symbols-outlined text-4xl text-ochre mb-4">
        error
      </span>
      <h2 class="text-xl font-mono mb-2">Oops!</h2>
      <p class="text-ink/70">{fallback}</p>
      <button 
        class="mt-4 btn btn-primary"
        onclick="window.location.reload()"
      >
        Reload page
      </button>
    </div>
  </div>
</div>

<script>
  document.addEventListener('DOMContentLoaded', () => {
    const boundaries = document.querySelectorAll('[data-error-boundary]');
    
    boundaries.forEach(boundary => {
      const content = boundary.querySelector('slot');
      const errorMsg = boundary.querySelector('[data-error-message]');
      
      window.addEventListener('error', (event) => {
        console.error('Error caught by boundary:', event.error);
        if (content) content.classList.add('hidden');
        if (errorMsg) errorMsg.classList.remove('hidden');
      });
    });
  });
</script>

<style>
  .error-message {
    min-height: 400px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  
  .error-content {
    text-align: center;
    max-width: 500px;
    padding: 2rem;
  }
</style>
```

### Использование
```astro
<ErrorBoundary fallback="Failed to load navigation">
  <Header {...props} />
</ErrorBoundary>
```

---

## 12. Utility функции для работы с темой

### Создать utils/theme.ts
```typescript
// src/utils/theme.ts
import { SafeStorage } from './storage';

export type Theme = 'light' | 'dark';

export class ThemeManager {
  private static readonly STORAGE_KEY = 'theme';
  private static root: HTMLElement = document.documentElement;

  static getPreferred(): Theme {
    const stored = SafeStorage.getItem(this.STORAGE_KEY);
    if (stored === 'light' || stored === 'dark') {
      return stored;
    }
    
    return window.matchMedia('(prefers-color-scheme: dark)').matches 
      ? 'dark' 
      : 'light';
  }

  static getCurrent(): Theme {
    const current = this.root.getAttribute('data-theme');
    return current === 'dark' ? 'dark' : 'light';
  }

  static set(theme: Theme): void {
    this.root.setAttribute('data-theme', theme);
    SafeStorage.setItem(this.STORAGE_KEY, theme);
    this.updateToggles(theme);
    this.dispatchEvent(theme);
  }

  static toggle(): void {
    const current = this.getCurrent();
    const next = current === 'dark' ? 'light' : 'dark';
    this.set(next);
  }

  private static updateToggles(theme: Theme): void {
    document.querySelectorAll('[data-theme-label]').forEach((el) => {
      el.textContent = theme === 'dark' ? 'DARK' : 'LIGHT';
    });
  }

  private static dispatchEvent(theme: Theme): void {
    window.dispatchEvent(
      new CustomEvent('themechange', { detail: { theme } })
    );
  }

  static init(): void {
    const theme = this.getPreferred();
    this.set(theme);

    // Listen for toggle clicks
    document.addEventListener('click', (event) => {
      const toggle = (event.target as HTMLElement).closest('[data-theme-toggle]');
      if (toggle) {
        event.preventDefault();
        this.toggle();
      }
    });

    // Listen for system theme changes
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
      if (!SafeStorage.getItem(this.STORAGE_KEY)) {
        this.set(e.matches ? 'dark' : 'light');
      }
    });
  }
}

// Usage in animations.ts
if (typeof window !== 'undefined') {
  ThemeManager.init();
}
```

---

Эти примеры демонстрируют конкретные улучшения кода с фокусом на:
- **Производительность** - оптимизация загрузки ресурсов
- **Безопасность** - защита от ошибок и XSS
- **Доступность** - ARIA, focus management, keyboard navigation
- **Maintainability** - чистый, переиспользуемый код
- **Type Safety** - правильная типизация TypeScript
