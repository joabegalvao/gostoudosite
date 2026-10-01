#!/usr/bin/env python3
"""Gera as imagens otimizadas do site a partir dos arquivos originais.

Uso (na raiz do projeto):
    python3 tools/optimize-images.py

Requer Pillow (pip install pillow) e a pasta materiais-de-origem/. Os
originais nunca são alterados.

- O logo veio em PNG RGB com um xadrez cinza e branco pintado no fundo (não
  é transparência de verdade). O script apaga o xadrez por cor e devolve a
  transparência, preservando a suavização das bordas.
- As miniaturas dos sites do portfólio vêm de materiais-de-origem/sites/
  (capturas feitas por tools/capture-sites.js) e são reduzidas aqui.
"""
from pathlib import Path

from PIL import Image, ImageChops, ImageFilter

ROOT = Path(__file__).resolve().parent.parent
SOURCES = ROOT / "materiais-de-origem"
LOGO_SRC = SOURCES / "logo" / "gostou_do_site_logo.png"
SHOTS = SOURCES / "sites"
OUT = ROOT / "assets" / "img"

INK = (2, 24, 43)     # #02182b, azul-marinho do logo
BLUE = (7, 108, 253)  # #076cfd, azul vivo do logo


def resize_to_width(im: Image.Image, width: int) -> Image.Image:
    if im.width <= width:
        return im.copy()
    height = round(im.height * width / im.width)
    return im.resize((width, height), Image.LANCZOS)


def build_logo() -> None:
    """Remove o xadrez: pixels neutros e claros viram transparentes; a borda
    das letras (mistura de tinta com fundo) ganha alfa proporcional."""
    im = Image.open(LOGO_SRC).convert("RGB")
    r, g, b = im.split()
    # "tinta" = saturação ou escuridão; o xadrez é cinza claro quase neutro
    sat = Image.merge("RGB", (r, g, b)).convert("HSV").getchannel("S")
    lum = im.convert("L")
    # alfa: cresce com a saturação (azul) e com a escuridão (marinho)
    alpha_sat = sat.point(lambda v: min(255, int(v * 3.2)))
    alpha_dark = lum.point(lambda v: 255 if v < 120 else max(0, int((236 - v) * 2.2)))
    alpha = ImageChops.lighter(alpha_sat, alpha_dark)
    alpha = alpha.filter(ImageFilter.GaussianBlur(0.6))
    out = im.copy()
    out.putalpha(alpha)
    box = alpha.point(lambda v: 255 if v > 20 else 0).getbbox()
    margin = 10
    out = out.crop((max(0, box[0] - margin), max(0, box[1] - margin), min(out.width, box[2] + margin), min(out.height, box[3] + margin)))
    for width in (960, 480, 240):
        o = resize_to_width(out, width)
        o.save(OUT / f"logo-gostou-do-site-{width}.png", optimize=True)
        o.save(OUT / f"logo-gostou-do-site-{width}.webp", "WEBP", quality=92, method=6)
    print(f"logo-gostou-do-site: {out.width}x{out.height} (salvo em 960, 480 e 240)")

    # Versão para fundo escuro: o marinho vira branco, o azul fica igual.
    # Só a cor muda; o desenho é o mesmo.
    # o azul vivo é claro (V alto); o marinho é escuro (V baixo)
    value = out.convert("RGB").convert("HSV").getchannel("V")
    is_blue = value.point(lambda v: 255 if v > 120 else 0)
    white = Image.new("RGBA", out.size, (255, 255, 255, 0))
    white.putalpha(out.getchannel("A"))
    light = Image.composite(out, white, is_blue)
    for width in (960, 480, 240):
        o = resize_to_width(light, width)
        o.save(OUT / f"logo-gostou-do-site-claro-{width}.png", optimize=True)
        o.save(OUT / f"logo-gostou-do-site-claro-{width}.webp", "WEBP", quality=92, method=6)
    print("logo-gostou-do-site-claro: marinho trocado por branco, para fundo escuro")

    # Ícones: a marca sobre o marinho do logo
    for name, size in (("favicon-32", 32), ("apple-touch-icon", 180), ("icon-192", 192)):
        tile = Image.new("RGBA", (512, 512), INK + (255,))
        fitted = resize_to_width(light, 440)
        tile.alpha_composite(fitted, ((512 - fitted.width) // 2, (512 - fitted.height) // 2))
        tile.convert("RGB").resize((size, size), Image.LANCZOS).save(OUT / f"{name}.png", optimize=True)


def build_shots() -> None:
    """Miniaturas do portfólio: desktop (1440 px capturado) em 720 e 1080 px;
    celular (780 px capturado em 2x) em 390 px."""
    if not SHOTS.exists():
        print("materiais-de-origem/sites não existe: miniaturas mantidas como estão")
        return
    for f in sorted(SHOTS.glob("*.png")):
        im = Image.open(f).convert("RGB")
        name = f.stem
        if name.endswith("-m"):
            widths = (390,)
        else:
            widths = (720, 1080)
            # versão pequena e leve para a parede do hero (carrega sem lazy)
            wall = resize_to_width(im, 480).crop((0, 0, 480, 333))
            wall.save(OUT / f"wall-{name}-480.webp", "WEBP", quality=72, method=6)
        for w in widths:
            o = resize_to_width(im, w)
            o.save(OUT / f"site-{name}-{w}.webp", "WEBP", quality=80, method=6)
        o = resize_to_width(im, widths[-1])
        o.save(OUT / f"site-{name}-{widths[-1]}.jpg", "JPEG", quality=80, optimize=True, progressive=True)
        print(f"site-{name}: {o.width}x{o.height}")


if __name__ == "__main__":
    OUT.mkdir(parents=True, exist_ok=True)
    build_logo()
    build_shots()
    total = sum(f.stat().st_size for f in OUT.iterdir())
    print(f"{len(list(OUT.iterdir()))} arquivos, {total / 1024:.0f} KB no total")
