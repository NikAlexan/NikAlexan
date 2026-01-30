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

Content is split between data files and content collections:

- Site-wide text: `src/data/site.ts`
- Homepage project cards: `src/data/projects.ts`
- Case studies: `src/content/case-studies/{ru,en}/*.mdx`
- Contact links (shared): `src/content/contact/links.mdx`

## Colors & typography

Global styles live in `src/styles/global.css`:

- CSS variables under `:root` control the palette
- Font imports and defaults are defined in `@layer base`

## Add a project (homepage card)

1. Open `src/data/projects.ts`
2. Add a new object to `projectsRu` and `projectsEn`
3. Optional links array will render buttons

## Add a case study page

1. Create `src/content/case-studies/ru/<slug>.mdx` and `src/content/case-studies/en/<slug>.mdx`
2. Set frontmatter fields according to `src/content/config.ts` (title, role, period, tags, outcome, console, etc.)
3. Use MDX components where needed (e.g. `CodeBlock`, `Callout`)
4. Ensure project card `caseStudySlug` matches the case study slug

## Update contact links

1. Edit `src/content/contact/links.mdx`
2. Update the links array (label, href, tone, icon)

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
