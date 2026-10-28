# 水啊的博客

<https://hllqkb.github.io/blog/> · Astro 静态站，GitHub Actions 构建发布到 GitHub Pages。

## 写文章

- 网页 / 手机：登录 [Pages CMS](https://app.pagescms.org)，选本仓库「文章」新建，保存即发布（约 1 分钟）。
- 本地：在 `src/content/posts/` 新建 `YYYY-MM-DD-<slug>.md`，front matter 见 `src/content.config.ts`；`npm install && npm run dev` 预览 <http://localhost:4321/blog/>。
- 勾选 `draft: true` 的文章不发布（本地 dev 仍可见）。

## 图片

图片放 `public/images/posts/`，正文写 `/blog/images/posts/<文件>`。
发布时若设置了仓库变量 `IMAGE_CDN_BASE`，`deploy.yml` 会把图片同步到 Cloudflare R2 并改写线上地址；不设置则由 Pages 直接提供。需要的 Secrets：`R2_ACCOUNT_ID`、`R2_ACCESS_KEY_ID`、`R2_SECRET_ACCESS_KEY`、`R2_BUCKET`。

## 每日速递

`daily-digest.yml` 每天北京时间 9 点抓 HF Daily Papers / arXiv / Hacker News，用 Gemini 写摘要，开 PR 等人工合并。需要 Secret `GEMINI_API_KEY`，并在 Settings → Actions → General 允许 Actions 创建 PR。未配置时自动跳过。

## 目录

- `src/content/posts/`、`src/content/daily/`：文章与速递
- `src/data/projects.ts`：项目页数据
- `src/pages/`：页面、`rss.xml`、`llms.txt`、`robots.txt`
- `.pages.yml`：Pages CMS 配置
