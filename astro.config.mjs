// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// 发布在 GitHub Pages 的项目路径 https://hllqkb.github.io/blog/
// 以后换独立域名：把 site 改成域名、base 改成 '/'，并在 public/ 加 CNAME。
export default defineConfig({
  site: 'https://hllqkb.github.io',
  base: '/blog',
  trailingSlash: 'always',
  integrations: [sitemap()],
  markdown: {
    shikiConfig: { themes: { light: 'github-light', dark: 'github-dark' } },
  },
});
