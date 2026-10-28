import rss from '@astrojs/rss';
import type { APIContext } from 'astro';
import { SITE, url, dailyIssues } from '../../lib/site';

export async function GET(context: APIContext) {
  const issues = (await dailyIssues()).slice(0, 30);
  return rss({
    title: `${SITE.title} · 每日速递`,
    description: '搜索、推荐、3D 生成和 Agent 方向的每日动态，AI 整理、人工过目。',
    site: context.site!,
    items: issues.map((d) => ({
      title: d.data.title,
      pubDate: d.data.date,
      description: d.data.subtitle,
      link: url(`/daily/${d.id}/`),
    })),
    customData: '<language>zh-cn</language>',
  });
}
