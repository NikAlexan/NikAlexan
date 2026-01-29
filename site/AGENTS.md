# Repository Guidelines

## Project Structure & Module Organization
This is an Astro + Tailwind CSS portfolio site. Key paths:
- `src/pages/` for routes (`src/pages/index.astro` is `/`, `src/pages/en/` is `/en`).
- `src/components/` for reusable UI blocks.
- `src/layouts/` for page shells.
- `src/data/` for content (`src/data/site.ts`, `src/data/projects.ts`).
- `src/styles/` for global styling (`src/styles/global.css`).
- `public/` for static assets like `robots.txt`, `sitemap.xml`, and OG images.

## Build, Test, and Development Commands
Use npm scripts from `package.json`:
- `npm run dev` starts the local Astro dev server.
- `npm run build` generates the static site into `dist/` (Netlify publish dir).
- `npm run preview` serves the production build locally.

## Coding Style & Naming Conventions
- Indentation: 2 spaces in Astro/CSS/TS.
- Keep content edits in `src/data/` instead of hardcoding in components.
- Tailwind v4 is configured via `@tailwindcss/vite`; global palette and fonts live in `src/styles/global.css` under `:root` and `@layer base`.
- Component and file naming: use clear, PascalCase for component files (e.g., `Hero.astro`).

## Testing Guidelines
There are no automated tests in this repository at the moment. If you add tests, document the framework and naming conventions here and add an npm script (e.g., `test`).

## Commit & Pull Request Guidelines
Recent commit subjects are short, imperative, and direct (e.g., “Astro site”, “Delete Contact.astro”). Keep commits focused and descriptive.
For pull requests:
- Provide a brief summary of the change.
- Include before/after screenshots for visual changes.
- Link related issues if applicable.

## Security & Configuration Tips
- Content updates should remain in `src/data/` to keep templates stable.
- SEO files live in `public/`; update `public/og-placeholder.svg` if you add a real OG image.
