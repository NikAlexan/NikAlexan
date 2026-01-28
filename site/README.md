# Astro Portfolio (Netlify-ready)

One-page Astro portfolio with Tailwind v4, localized RU/EN pages, and content-driven sections.

## Quick start

```sh
npm install
npm run dev
```

## Build & deploy (Netlify)

- Build command: `npm run build`
- Publish directory: `dist`

## Content editing

All content lives in:

- `src/data/site.ts`
- `src/data/projects.ts`

Update text, links, and lists there. Sections read from those data files.

## Colors & typography

Global styles live in `src/styles/global.css`:

- CSS variables under `:root` control the palette
- Font imports and defaults are defined in `@layer base`

## Add a project

1. Open `src/data/projects.ts`
2. Add a new object to `projectsRu` and `projectsEn`
3. Optional links array will render buttons

## Pages

- `/` — Russian
- `/en` — English

## SEO & social

- Meta tags are populated from `src/data/site.ts`
- `public/robots.txt` and `public/sitemap.xml` included
- `public/og-placeholder.svg` is a placeholder OG image

## Commands

| Command | Action |
| --- | --- |
| `npm run dev` | Run local dev server | 
| `npm run build` | Build static site into `dist/` |
| `npm run preview` | Preview production build |
