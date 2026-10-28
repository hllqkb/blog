#!/usr/bin/env python3
"""把构建产物里的文章图片地址改写到图床（Cloudflare R2）。

文章里写的是站内路径 /blog/images/posts/<文件>，本地预览直接可用；
发布前把 dist 里这些地址换成 <IMAGE_CDN_BASE>/posts/<文件>，
并删除 dist/images/posts，线上站点不再携带原图。

用法：python3 rewrite_image_urls.py <dist_dir> <cdn_base> <site_url> <base_path>
例：python3 rewrite_image_urls.py dist https://img.hllqk.cn https://hllqkb.github.io /blog
"""
import re
import shutil
import sys
from pathlib import Path

TEXT_SUFFIXES = {".html", ".xml", ".json", ".txt"}


def build_pattern(site_url: str, local_prefix: str) -> re.Pattern[str]:
    # 匹配站点绝对地址（RSS 里用）或站内绝对路径；
    # 站内路径前面不能是字母数字、点、冒号或斜杠，避免改到别的域名下的同名路径。
    return re.compile(
        "(?:" + re.escape(site_url.rstrip("/")) + r"|(?<![\w.:/]))" + re.escape(local_prefix)
    )


def rewrite_file(path: Path, pattern: re.Pattern[str], replacement: str) -> int:
    text = path.read_text(encoding="utf-8")
    new_text, count = pattern.subn(replacement, text)
    if count:
        path.write_text(new_text, encoding="utf-8")
    return count


def main(dist_dir: Path, cdn_base: str, site_url: str, base_path: str) -> None:
    local_prefix = base_path.rstrip("/") + "/images/posts/"
    replacement = cdn_base.rstrip("/") + "/posts/"
    pattern = build_pattern(site_url, local_prefix)
    total = 0
    for path in dist_dir.rglob("*"):
        if path.is_file() and path.suffix in TEXT_SUFFIXES:
            total += rewrite_file(path, pattern, replacement)
    shutil.rmtree(dist_dir / "images" / "posts", ignore_errors=True)
    print(f"rewrote {total} image URL(s) to {replacement}")


if __name__ == "__main__":
    if len(sys.argv) != 5:
        sys.exit(__doc__)
    main(Path(sys.argv[1]), sys.argv[2], sys.argv[3], sys.argv[4])
