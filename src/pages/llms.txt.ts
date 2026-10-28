import type { APIContext } from 'astro';
import { SITE, url, publishedPosts, dailyIssues } from '../lib/site';
import { projects } from '../data/projects';

export async function GET(context: APIContext) {
  const abs = (p: string) => new URL(url(p), context.site).href;
  const posts = await publishedPosts();
  const issues = await dailyIssues();
  const lines = [
    `# ${SITE.title}`,
    '',
    `> ${SITE.description}`,
    '',
    `主页 ${abs('/')} ，文章订阅 ${abs('/rss.xml')} ，速递订阅 ${abs('/daily/rss.xml')} 。原创内容欢迎引用，请附原文链接。`,
    '',
    '## 文章',
    ...posts.map((p) => `- [${p.data.title}](${abs(`/posts/${p.id}/`)})${p.data.description ? `：${p.data.description}` : ''}`),
    '',
    '## 项目',
    ...projects.map((p) => `- [${p.name}](${p.repo})：${p.summary}`),
    '',
    '## 每日速递',
    `AI 整理、人工过目的每日动态，共 ${issues.length} 期：${abs('/daily/')}`,
    '',
  ];
  return new Response(lines.join('\n'), { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
}
