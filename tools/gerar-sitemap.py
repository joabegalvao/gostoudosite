#!/usr/bin/env python3
"""Gera sitemap.xml e robots.txt a partir de assets/data/sites.json.

Uso (na raiz do projeto):
    python3 tools/gerar-sitemap.py

Rode sempre que um site entrar ou sair do sites.json. Os dois arquivos vão
para a imagem Docker (ver Dockerfile) e são servidos na raiz do domínio.
"""
import json
from datetime import date
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
BASE = "https://gostoudosite.com.br"

sites = json.loads((ROOT / "assets/data/sites.json").read_text(encoding="utf-8"))
today = date.today().isoformat()

urls = [(f"{BASE}/", "weekly", "1.0"), (f"{BASE}/todos.html", "weekly", "0.8")]
urls += [(f"{BASE}/{s['pasta']}/", "monthly", "0.7") for s in sites]

xml = ['<?xml version="1.0" encoding="UTF-8"?>', '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">']
for loc, freq, prio in urls:
    xml += ["  <url>", f"    <loc>{loc}</loc>", f"    <lastmod>{today}</lastmod>", f"    <changefreq>{freq}</changefreq>", f"    <priority>{prio}</priority>", "  </url>"]
xml.append("</urlset>")
(ROOT / "sitemap.xml").write_text("\n".join(xml) + "\n", encoding="utf-8")

(ROOT / "robots.txt").write_text(f"User-agent: *\nAllow: /\n\nSitemap: {BASE}/sitemap.xml\n", encoding="utf-8")
print(f"sitemap.xml com {len(urls)} URLs e robots.txt gerados")
