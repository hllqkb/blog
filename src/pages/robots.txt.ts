import type { APIContext } from 'astro';
import { url } from '../lib/site';

// 项目站点在 /blog/ 下：搜索引擎只读域名根目录的 robots.txt，这份主要给人和工具看，
// sitemap 地址同时写在每页 <link rel="sitemap">。
export function GET(context: APIContext) {
  const sitemap = new URL(url('/sitemap-index.xml'), context.site).href;
  return new Response(`User-agent: *\nAllow: /\n\nSitemap: ${sitemap}\n`, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
}
