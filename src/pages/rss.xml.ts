import rss from '@astrojs/rss';
import type { APIContext } from 'astro';
import { SITE, url, publishedPosts } from '../lib/site';

export async function GET(context: APIContext) {
  const posts = (await publishedPosts()).slice(0, 30);
  return rss({
    title: SITE.title,
    description: SITE.description,
    site: context.site!,
    items: posts.map((p) => ({
      title: p.data.title,
      pubDate: p.data.date,
      description: p.data.description,
      categories: p.data.tags,
      link: url(`/posts/${p.id}/`),
    })),
    customData: '<language>zh-cn</language>',
  });
}
