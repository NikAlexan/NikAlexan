---
tag: "PET_03 / This site"
title: "Migrating nikalexan.com"
description: "Case study by Nikita Vassilenko: upgrading an Astro site from version 5 to 7, fixing 16 npm audit vulnerabilities and moving content to the Content Layer API."
subtitle: "Astro 5 → 7"
version: "October 2026"
roleLabel: "My role"
role: "Dependency audit, Astro and Tailwind upgrade, moving content collections to the new API"
timelineLabel: "Timeline"
timeline: "October 2026, one evening"
deliverablesLabel: "Delivered"
deliverables: "0 npm audit vulnerabilities, the same 6 pages after the build"
challengeLabel: "Problem"
challengeTitle: "npm audit found a critical vulnerability in Astro itself"
challengeBody: "In astro 5.16.15, AVIF image optimization allowed remote code execution (GHSA-26w7-cxv4-gfx2). The fix only shipped in 7.2.8, and Astro 6 removed the legacy content collections API that every project page relied on. A small bump was not enough: I had to jump a major version and rewrite how content loads."
challengeMetrics:
  - value: "16"
    label: "vulnerable packages"
  - value: "1"
    label: "critical"
  - value: "14"
    label: "high"
stackLabel: "Stack"
stackTitle: "A static Astro site"
stackBody: "Astro builds static pages in Russian and English from Markdown collections with Zod schemas. Styles use Tailwind 4, and the site deploys to Netlify. Most findings came from Astro's dependencies rather than Astro itself: sharp, vite, rollup, postcss and svgo."
stack:
  - "Astro"
  - "TypeScript"
  - "Zod"
  - "Tailwind CSS"
  - "Netlify"
outcomeLabel: "Solutions"
outcomes:
  - title: "Straight to 7.x"
    text: "Upgraded astro to 7.4.1 and @astrojs/mdx to 8.1.0, plus Tailwind to 4.3.3. Version 6 alone did not fix the critical issue."
  - title: "Content Layer API"
    text: "Moved src/content/config.ts to src/content.config.ts with a glob() loader and z from astro/zod. entry.slug became entry.id, and getEntryBySlug became a plain lookup in the collection."
  - title: "Checking nothing broke"
    text: "After npm audit fix for the remaining transitive packages, I compared builds: the same 6 pages with the same text, and the /project/* and /en/project/* routes in place."
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
  title: "What I changed after"
  body: "I skipped a major version, so the upgrade grew large. After the migration I turned on Dependabot: it now reports vulnerabilities, and updates arrive while they are still small."
  ctaLabel: "Pull request on GitHub"
  ctaHref: "https://github.com/NikAlexan/NikAlexan/pull/4"
---
