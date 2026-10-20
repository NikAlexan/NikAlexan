// @ts-check
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';

import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  site: 'https://nikalexan.com',
  trailingSlash: 'always',
  integrations: [
    mdx(),
    sitemap({
      filter: (page) => !/\/404\/?$/.test(new URL(page).pathname),
      i18n: {
        defaultLocale: 'ru',
        locales: {
          ru: 'ru',
          en: 'en'
        }
      }
    })
  ],
  vite: {
    plugins: [tailwindcss()]
  }
});
