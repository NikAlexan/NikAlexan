# Рефакторинг проектов на Content Collections + Markdown

## 🎯 Цель

Сделать так, чтобы:
1. ✅ Проекты на главной странице управлялись через `.md` файлы
2. ✅ Case studies (как Nexus) создавались через `.md/.mdx` файлы
3. ✅ Не нужно редактировать код для добавления нового проекта
4. ✅ Динамическая генерация страниц `/project/[slug]`

---

## 📁 Новая структура проекта

```
site/
├── src/
│   ├── content/
│   │   ├── config.ts                    # ← Схемы валидации
│   │   ├── projects/                    # ← Проекты для главной
│   │   │   ├── ru/
│   │   │   │   ├── 01-kazinsys-backend.md
│   │   │   │   ├── 02-kazinsys-fullstack.md
│   │   │   │   └── 03-internship.md
│   │   │   └── en/
│   │   │       ├── 01-kazinsys-backend.md
│   │   │       ├── 02-kazinsys-fullstack.md
│   │   │       └── 03-internship.md
│   │   └── case-studies/                # ← Детальные страницы
│   │       ├── ru/
│   │       │   └── nexus.mdx            # MDX для компонентов
│   │       └── en/
│   │           └── nexus.mdx
│   ├── pages/
│   │   ├── index.astro                  # ← Использует projects
│   │   ├── project/
│   │   │   └── [slug].astro            # ← Динамический роутинг
│   │   └── en/
│   │       ├── index.astro
│   │       └── project/
│   │           └── [slug].astro
│   └── components/
│       ├── ProjectCard.astro            # ← Для главной
│       └── CaseStudyLayout.astro        # ← Для детальных
```

---

## 🔧 Шаг 1: Настроить Content Collections

### src/content/config.ts

```typescript
import { defineCollection, z } from 'astro:content';

// Коллекция для карточек проектов на главной странице
const projectsCollection = defineCollection({
  type: 'content',
  schema: z.object({
    // Основная информация
    title: z.string(),
    company: z.string().optional(),
    role: z.string().optional(),
    
    // Период работы
    period: z.object({
      start: z.string(), // "2025-04"
      end: z.string().nullable(), // null = "настоящее время"
    }),
    
    // Локация и тип
    location: z.string().optional(),
    type: z.enum(['full-time', 'part-time', 'contract', 'internship']),
    workMode: z.enum(['remote', 'hybrid', 'on-site']).optional(),
    
    // Технологии
    stack: z.array(z.string()),
    
    // Для отображения
    order: z.number(), // Порядок на странице
    featured: z.boolean().default(false), // Выделенная карточка
    status: z.enum(['completed', 'ongoing', 'wip']).default('completed'),
    
    // Ссылка на детальную страницу (если есть)
    caseStudySlug: z.string().optional(),
    
    // Внешние ссылки
    links: z.array(z.object({
      label: z.string(),
      href: z.string(),
      icon: z.string().optional(),
    })).optional(),
  }),
});

// Коллекция для детальных case studies
const caseStudiesCollection = defineCollection({
  type: 'content', // можно 'content' или 'data'
  schema: z.object({
    // Основная информация
    title: z.string(),
    subtitle: z.string().optional(),
    tag: z.string(), // "Fintech Architecture"
    version: z.string().optional(), // "v2.0 Beta"
    
    // Метаданные
    role: z.string(),
    timeline: z.string(),
    deliverables: z.string(),
    
    // Метрики
    challengeMetrics: z.array(z.object({
      value: z.string(),
      label: z.string(),
    })).optional(),
    
    // Технологии
    stack: z.array(z.string()),
    
    // Результаты
    outcomes: z.array(z.object({
      title: z.string(),
      text: z.string(),
    })).optional(),
    
    // Изображения
    coverImage: z.string().optional(),
    gallery: z.array(z.string()).optional(),
    
    // Публикация
    published: z.boolean().default(true),
    publishedAt: z.date().optional(),
  }),
});

export const collections = {
  projects: projectsCollection,
  'case-studies': caseStudiesCollection,
};
```

---

## 📝 Шаг 2: Создать Markdown файлы

### Пример: Проект на главной странице

#### src/content/projects/ru/01-kazinsys-backend.md

```markdown
---
title: "KAZINSYS.kz — Back End Developer"
company: "KAZINSYS.kz"
role: "Back End Developer"
period:
  start: "2025-04"
  end: null
location: "Астана, Казахстан"
type: "full-time"
workMode: "on-site"
stack:
  - "Backend"
  - "Full-time"
  - "On-site"
order: 1
featured: false
status: "ongoing"
caseStudySlug: null  # Нет детальной страницы
---

Полный рабочий день · апр. 2025 — настоящее время · Astana, Kazakhstan · работа в офисе.

Разработка и поддержка backend-систем.
```

#### src/content/projects/ru/02-kazinsys-fullstack.md

```markdown
---
title: "KAZINSYS.kz — Full Stack Developer"
company: "KAZINSYS.kz"
role: "Full Stack Developer"
period:
  start: "2023-06"
  end: "2025-04"
location: "Астана, Казахстан"
type: "full-time"
workMode: "on-site"
stack:
  - "Full stack"
  - "Full-time"
  - "On-site"
order: 2
featured: true
status: "completed"
caseStudySlug: "nexus"  # ← Есть детальная страница!
links:
  - label: "Case Study"
    href: "/project/nexus"
---

июнь 2023 — апр. 2025 · 1 г. 11 мес. · работа в офисе.

Разработка full-stack решений для корпоративных клиентов.
```

---

### Пример: Case Study (детальная страница)

#### src/content/case-studies/ru/nexus.mdx

```mdx
---
title: "NEXUS"
subtitle: "PROTOCOL"
tag: "Fintech Architecture"
version: "v2.0 Beta"
role: "Lead Engineer"
timeline: "Q3 2023 — Q1 2024"
deliverables: "System Architecture, Real-time Visualization, Smart Contracts"
challengeMetrics:
  - value: "50k+"
    label: "Points / Sec"
  - value: "<16ms"
    label: "Frame Budget"
stack:
  - "C#"
  - ".NET"
  - "WebSockets"
  - "Kafka"
  - "Redis"
  - "WebGL"
  - "TypeScript"
outcomes:
  - title: "Latency"
    text: "Снижение latency визуализации на 38% при нагрузке."
  - title: "Reliability"
    text: "99.9% устойчивость потока с fallback на локальный кеш."
  - title: "Observability"
    text: "Единая панель мониторинга метрик и алертов."
published: true
---

import { Image } from 'astro:assets';
import Callout from '@/components/Callout.astro';
import CodeBlock from '@/components/CodeBlock.astro';

## 01 // CHALLENGE

### Победа над задержками в HFT-визуализации

Нужно было рендерить **50 000+ точек данных в секунду** без блокировок основного потока. 
Обычные DOM-операции не выдерживали 60Hz.

<Callout type="info">
Мы собрали потоковую архитектуру с агрегацией данных и вынесли тяжелые вычисления в воркеры.
</Callout>

## 02 // TECH_STACK

### Компоненты ядра и визуализации

Микросервисы для агрегации ордеров, слой кэширования и потоковая шина событий, 
поверх — WebGL-визуализация и панель мониторинга.

```csharp
// Пример архитектуры
public class OrderAggregator
{
    private readonly IKafkaConsumer _consumer;
    private readonly IRedisCache _cache;
    
    public async Task ProcessOrders()
    {
        await foreach (var order in _consumer.ConsumeAsync())
        {
            await _cache.SetAsync(order.Id, order);
        }
    }
}
```

## 03 // OUTCOME

### Стабильная визуализация под нагрузкой

Получили устойчивые **60 FPS при пиковой нагрузке**, сохранили точность данных 
и снизили задержки отображения.

<Image 
  src="/images/nexus-dashboard.png" 
  alt="Nexus Dashboard"
  width={1200}
  height={600}
/>
```

---

## 🔨 Шаг 3: Обновить компоненты

### src/components/MainPage.astro (обновленный)

```astro
---
import { getCollection } from 'astro:content';
import Header from './Header.astro';
import Footer from './Footer.astro';

const { site } = Astro.props;

// Получить проекты из Content Collection
const allProjects = await getCollection('projects', ({ data }) => {
  return data.locale === site.locale; // Фильтр по языку
});

// Сортировка по order
const projects = allProjects.sort((a, b) => a.data.order - b.data.order);

const firstName = site.hero.name.split(' ')[0];
const lastName = site.hero.name.split(' ').slice(1).join(' ');
---

<div class="relative z-10 w-full max-w-[1800px] mx-auto min-h-screen">
  <Header {...site.nav} locale={site.locale} />
  
  <main class="flex-1 pt-32 px-6 md:px-16 pb-32 max-w-6xl mx-auto w-full">
    <!-- Hero section остается как есть -->
    <section class="mb-32 relative" id="hero">
      <!-- ... -->
    </section>
    
    <!-- Projects section - теперь из Markdown! -->
    <section class="mb-32 scroll-mt-32" id="works">
      <div class="flex items-end justify-between mb-12 border-b border-soft pb-4">
        <div class="font-mono text-ochre text-xs flex items-center gap-2 uppercase tracking-widest">
          <span class="material-symbols-outlined text-lg">folder_open</span>
          01 // {site.projects.title}
        </div>
      </div>
      
      <div class="grid grid-cols-1 gap-12">
        {projects.map((project, index) => {
          const { data, body } = project;
          const isWIP = data.status === 'wip';
          const hasCaseStudy = data.caseStudySlug;
          
          return (
            <article class={`technical-card p-8 md:p-10 group transition-all duration-500 hover:shadow-[0_0_30px_rgba(217,119,6,0.1)] ${isWIP ? 'opacity-70 hover:opacity-100' : ''}`}>
              
              {/* Badge */}
              <div class="absolute top-0 right-0 p-4 opacity-50">
                <span class={isWIP 
                  ? "font-mono text-[10px] text-ink/40 border border-ink/20 px-2 py-1 uppercase"
                  : "font-mono text-[10px] text-ochre border border-ochre/30 px-2 py-1"
                }>
                  {isWIP ? `WIP_00${index + 1}` : `PROJ_00${index + 1}`}
                </span>
              </div>
              
              <div class="flex flex-col md:flex-row gap-10">
                {/* Left column */}
                <div class="md:w-1/3 space-y-6">
                  <div>
                    <h3 class="text-3xl font-display font-light text-ink mb-2 group-hover:text-ochre transition-colors">
                      {data.title}
                    </h3>
                    <p class="font-mono text-xs text-ink/50 uppercase">
                      {data.stack.join(' / ')}
                    </p>
                  </div>
                  
                  {/* Tech stack tags */}
                  <div class="flex flex-wrap gap-2">
                    {data.stack.map((tech) => (
                      <span class="px-2 py-1 bg-ink/5 text-[10px] font-mono text-ink/70">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
                
                {/* Right column */}
                <div class="md:w-2/3 flex flex-col justify-between">
                  {/* Render markdown content */}
                  <div class="prose prose-sm text-ink/60 mb-8" set:html={body} />
                  
                  <div class="flex items-center justify-between border-t border-soft pt-6">
                    <div class="flex gap-6 text-[10px] font-mono text-ink/50">
                      {data.stack.slice(0, 2).map((tech) => (
                        <span>{tech.toUpperCase()}</span>
                      ))}
                    </div>
                    
                    {/* CTA */}
                    {isWIP ? (
                      <span class="flex items-center gap-2 text-ink/40 font-mono text-xs cursor-not-allowed uppercase">
                        COMING SOON 
                        <span class="material-symbols-outlined text-[14px]">lock</span>
                      </span>
                    ) : hasCaseStudy ? (
                      <a 
                        href={`/project/${data.caseStudySlug}`}
                        class="flex items-center gap-2 text-ochre font-mono text-xs hover:underline decoration-ochre underline-offset-4 uppercase"
                      >
                        VIEW CASE STUDY
                        <span class="material-symbols-outlined text-[14px]">arrow_forward</span>
                      </a>
                    ) : (
                      <div class="flex gap-4">
                        {data.links?.map((link) => (
                          <a 
                            href={link.href}
                            class="text-ochre font-mono text-xs hover:underline"
                          >
                            {link.label}
                          </a>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </section>
    
    <!-- About section остается как есть -->
    <Footer site={site} />
  </main>
</div>
```

---

## 🔨 Шаг 4: Динамический роутинг для case studies

### src/pages/project/[slug].astro

```astro
---
import { getCollection, getEntry } from 'astro:content';
import BaseLayout from '@/layouts/BaseLayout.astro';
import { getSite } from '@/data/site';

// Генерация статических путей для всех case studies
export async function getStaticPaths() {
  const ruCaseStudies = await getCollection('case-studies', ({ id }) => {
    return id.startsWith('ru/');
  });
  
  const enCaseStudies = await getCollection('case-studies', ({ id }) => {
    return id.startsWith('en/');
  });
  
  return [
    ...ruCaseStudies.map((entry) => ({
      params: { slug: entry.slug },
      props: { entry, locale: 'ru' },
    })),
    ...enCaseStudies.map((entry) => ({
      params: { slug: entry.slug },
      props: { entry, locale: 'en' },
    })),
  ];
}

const { entry, locale } = Astro.props;
const { Content } = await entry.render();
const site = getSite(locale);
---

<BaseLayout
  title={`${entry.data.title} — Case Study`}
  description={site.meta.description}
  locale={locale}
  ogImage={entry.data.coverImage || site.meta.ogImage}
  url={`${site.meta.url}/project/${entry.slug}`}
>
  <div class="min-h-screen bg-background-dark text-ink">
    <!-- Header -->
    <header class="border-b border-soft">
      <div class="max-w-6xl mx-auto px-6 py-8">
        <div class="flex items-center justify-between">
          <a href={locale === 'ru' ? '/' : '/en'} class="text-ochre font-mono text-xs hover:underline">
            ← {locale === 'ru' ? 'НАЗАД_К_ГЛАВНОЙ' : 'BACK_TO_INDEX'}
          </a>
          <span class="font-mono text-[10px] text-ink/50 uppercase">
            {entry.data.tag}
          </span>
        </div>
      </div>
    </header>
    
    <!-- Hero -->
    <section class="max-w-6xl mx-auto px-6 py-16">
      <div class="mb-8">
        <span class="text-ochre font-mono text-xs uppercase">{entry.data.tag}</span>
        <h1 class="text-6xl md:text-8xl font-display font-light text-ink mt-4">
          {entry.data.title}
        </h1>
        {entry.data.subtitle && (
          <h2 class="text-4xl md:text-6xl font-display font-light text-ink/40 mt-2">
            {entry.data.subtitle}
          </h2>
        )}
        {entry.data.version && (
          <span class="inline-block mt-4 px-3 py-1 border border-ochre/30 text-ochre font-mono text-[10px] uppercase">
            {entry.data.version}
          </span>
        )}
      </div>
      
      <!-- Meta info grid -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 font-mono text-xs mb-16">
        <div class="bg-surface-dark/40 border-l border-soft pl-4 py-3">
          <span class="text-ink/50 block mb-1 text-[10px] uppercase">Role</span>
          <div class="text-ink">{entry.data.role}</div>
        </div>
        <div class="bg-surface-dark/40 border-l border-soft pl-4 py-3">
          <span class="text-ink/50 block mb-1 text-[10px] uppercase">Timeline</span>
          <div class="text-ink">{entry.data.timeline}</div>
        </div>
        <div class="bg-surface-dark/40 border-l border-soft pl-4 py-3">
          <span class="text-ink/50 block mb-1 text-[10px] uppercase">Deliverables</span>
          <div class="text-ink">{entry.data.deliverables}</div>
        </div>
      </div>
      
      <!-- Metrics (if any) -->
      {entry.data.challengeMetrics && (
        <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
          {entry.data.challengeMetrics.map((metric) => (
            <div class="text-center p-6 border border-ochre/20 bg-ochre/5">
              <div class="text-3xl font-display font-light text-ochre mb-2">
                {metric.value}
              </div>
              <div class="font-mono text-[10px] text-ink/50 uppercase">
                {metric.label}
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
    
    <!-- MDX Content -->
    <article class="max-w-4xl mx-auto px-6 pb-32">
      <div class="prose prose-lg prose-invert max-w-none
        prose-headings:font-display prose-headings:font-light
        prose-h2:text-4xl prose-h2:text-ochre prose-h2:mb-8 prose-h2:mt-16
        prose-h3:text-2xl prose-h3:text-ink prose-h3:mb-4 prose-h3:mt-8
        prose-p:text-ink/70 prose-p:leading-relaxed
        prose-code:text-ochre prose-code:bg-ink/5 prose-code:px-1 prose-code:rounded
        prose-pre:bg-terminal prose-pre:border prose-pre:border-terminal
        prose-a:text-ochre prose-a:no-underline hover:prose-a:underline
        prose-img:rounded prose-img:border prose-img:border-soft
      ">
        <Content />
      </div>
      
      <!-- Outcomes (if any) -->
      {entry.data.outcomes && entry.data.outcomes.length > 0 && (
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16">
          {entry.data.outcomes.map((outcome) => (
            <div class="technical-card p-6">
              <h4 class="font-mono text-ochre text-xs uppercase mb-3">
                {outcome.title}
              </h4>
              <p class="text-ink/70 text-sm leading-relaxed">
                {outcome.text}
              </p>
            </div>
          ))}
        </div>
      )}
    </article>
  </div>
</BaseLayout>
```

---

## 🚀 Шаг 5: Удалить старые файлы

После миграции удалить:
- ❌ `src/data/projects.ts`
- ❌ `src/data/case-studies.ts`
- ❌ `src/pages/project/nexus.astro` (заменен на `[slug].astro`)

---

## ✨ Преимущества новой архитектуры

### 1. Легко добавлять новые проекты

```bash
# Создать новый файл
touch src/content/projects/ru/04-new-project.md
```

```markdown
---
title: "Новый проект"
company: "Company Name"
role: "Role"
period:
  start: "2026-01"
  end: null
type: "full-time"
stack: ["Tech1", "Tech2"]
order: 4
---

Описание проекта...
```

**Всё! Проект автоматически появится на главной.**

---

### 2. Rich content в Markdown

```markdown
## Заголовок

**Жирный текст**, *курсив*, `код`

- Список
- Пунктов

1. Нумерованный
2. Список

[Ссылка](https://example.com)

![Изображение](/images/project.png)
```

---

### 3. MDX для интерактивных компонентов

```mdx
import VideoPlayer from '@/components/VideoPlayer.astro';
import CodeComparison from '@/components/CodeComparison.astro';

## Результаты

<VideoPlayer src="/videos/demo.mp4" />

<CodeComparison 
  before="Старый код"
  after="Новый код"
/>
```

---

### 4. Type-safe с Zod валидацией

```typescript
// Если забыли обязательное поле - ошибка при сборке!
---
title: "Project"
# ❌ Забыли 'order' - будет ошибка
---
```

---

### 5. Автоматическая генерация страниц

Создали `nexus.mdx` → Страница `/project/nexus` появилась автоматически!

---

## 📦 Миграция существующих данных

### Скрипт для автоматической миграции

```typescript
// scripts/migrate-to-content.ts
import fs from 'fs/promises';
import { projectsRu, projectsEn } from '../src/data/projects';

async function migrateProjects() {
  for (const [index, project] of projectsRu.entries()) {
    const filename = `${String(index + 1).padStart(2, '0')}-${project.title.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')}.md`;
    
    const frontmatter = `---
title: "${project.title}"
period:
  start: "2023-06"
  end: ${project.description.includes('настоящее время') ? 'null' : '"2025-04"'}
type: "full-time"
stack:
${project.stack.map(s => `  - "${s}"`).join('\n')}
order: ${index + 1}
featured: ${index === 0}
status: ${project.description.includes('настоящее время') ? '"ongoing"' : '"completed"'}
---

${project.description}
`;
    
    await fs.writeFile(
      `src/content/projects/ru/${filename}`,
      frontmatter,
      'utf-8'
    );
  }
  
  console.log('✅ Migration complete!');
}

migrateProjects();
```

Запустить:
```bash
tsx scripts/migrate-to-content.ts
```

---

## 🎨 Бонус: CMS интеграция

Можно подключить CMS для нетехнических пользователей:

### Вариант 1: Decap CMS (бесплатно)

```yaml
# public/admin/config.yml
backend:
  name: git-gateway
  branch: main

media_folder: "public/images/projects"
public_folder: "/images/projects"

collections:
  - name: "projects_ru"
    label: "Проекты (RU)"
    folder: "src/content/projects/ru"
    create: true
    fields:
      - { label: "Название", name: "title", widget: "string" }
      - { label: "Компания", name: "company", widget: "string" }
      - { label: "Роль", name: "role", widget: "string" }
      - { label: "Технологии", name: "stack", widget: "list" }
      - { label: "Порядок", name: "order", widget: "number" }
      - { label: "Описание", name: "body", widget: "markdown" }
```

Админка доступна на `/admin`

---

### Вариант 2: Tina CMS

```bash
npm install tinacms
```

Визуальный редактор прямо на сайте!

---

## 📝 Итоговый чек-лист миграции

```markdown
### Подготовка
- [ ] Установить зависимости (уже есть в Astro 5)
- [ ] Создать структуру директорий `src/content/`

### Конфигурация
- [ ] Создать `src/content/config.ts` со схемами
- [ ] Настроить Zod валидацию

### Миграция данных
- [ ] Создать Markdown файлы для проектов
- [ ] Создать MDX файлы для case studies
- [ ] Запустить скрипт миграции (опционально)

### Обновление кода
- [ ] Обновить `MainPage.astro` для использования getCollection
- [ ] Создать `[slug].astro` для динамических роутов
- [ ] Обновить типы в компонентах

### Очистка
- [ ] Удалить `src/data/projects.ts`
- [ ] Удалить `src/data/case-studies.ts`
- [ ] Удалить статические страницы проектов

### Тестирование
- [ ] Проверить главную страницу
- [ ] Проверить все `/project/[slug]` страницы
- [ ] Проверить обе локализации (ru/en)
- [ ] Проверить сборку: `npm run build`

### Деплой
- [ ] Задеплоить на production
- [ ] Проверить SEO meta tags
- [ ] Проверить sitemap
```

---

## 🎯 Результат

**Теперь добавление нового проекта:**

### Было (5+ файлов):
1. Отредактировать `projects.ts` ✏️
2. Создать `case-studies.ts` запись ✏️
3. Создать страницу `/project/new.astro` ✏️
4. Обновить типы ✏️
5. Потестировать 🧪

### Стало (1 файл):
1. Создать `.md` файл в `content/` ✏️

**Всё!** 🎉

---

## 💡 Дополнительные возможности

### 1. Фильтры и сортировка

```astro
// Показать только featured проекты
const featured = projects.filter(p => p.data.featured);

// Показать только ongoing проекты
const ongoing = projects.filter(p => p.data.status === 'ongoing');

// Сортировка по дате
const sorted = projects.sort((a, b) => 
  new Date(b.data.period.start) - new Date(a.data.period.start)
);
```

### 2. Поиск

```astro
const searchQuery = "backend";
const results = projects.filter(p => 
  p.data.title.toLowerCase().includes(searchQuery) ||
  p.data.stack.some(s => s.toLowerCase().includes(searchQuery))
);
```

### 3. Теги и категории

```yaml
# Добавить в schema
tags: z.array(z.string()).optional()
category: z.enum(['web', 'mobile', 'backend']).optional()
```

---

**Готово! Теперь проекты максимально гибкие и легко управляемые.** 🚀
