import { getCollection, type CollectionEntry } from 'astro:content';

export const SITE = {
  title: '水啊的博客',
  description: '软件工程在读，后端开发实习中。记录写代码、做工具和生活里的思考。',
  author: '水啊',
  github: 'https://github.com/hllqkb',
};

/** 站内路径加上 base（/blog），保证结尾斜杠一致。 */
export function url(path = '/'): string {
  const base = import.meta.env.BASE_URL.replace(/\/$/, '');
  const clean = path.startsWith('/') ? path : `/${path}`;
  return `${base}${clean}`;
}

export async function publishedPosts(): Promise<CollectionEntry<'posts'>[]> {
  const all = await getCollection('posts', ({ data }) => import.meta.env.DEV || !data.draft);
  return all.sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());
}

export async function dailyIssues(): Promise<CollectionEntry<'daily'>[]> {
  const all = await getCollection('daily');
  return all.sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());
}

export function formatDate(d: Date): string {
  return d.toLocaleDateString('sv-SE', { timeZone: 'Asia/Shanghai' });
}
