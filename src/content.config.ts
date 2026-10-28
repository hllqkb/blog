import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

// 文章：Pages CMS 写在 src/content/posts/，front matter 的 slug 决定网址 /posts/<slug>/
const posts = defineCollection({
  loader: glob({ base: './src/content/posts', pattern: '**/*.md' }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    description: z.string().optional(),
    tags: z.array(z.string()).default([]),
    cover: z.string().optional(),
    draft: z.boolean().default(false),
    // 转载文章填原文地址，页面会声明 canonical
    source_url: z.string().url().optional(),
  }),
});

// 每日速递：.github/workflows/daily-digest.yml 生成，人工合并
const daily = defineCollection({
  loader: glob({ base: './src/content/daily', pattern: '**/*.md' }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    subtitle: z.string().optional(),
  }),
});

export const collections = { posts, daily };
