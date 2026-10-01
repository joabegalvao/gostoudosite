// Gera assets/img/compartilhamento.jpg (1200x630, para WhatsApp e redes): o logo
// claro sobre o marinho, a frase da página e um mosaico de quatro sites feitos.
//
// Uso (na raiz do projeto, depois de python3 tools/optimize-images.py):
//   node tools/render-compartilhamento.js
//
// Requer Node e Playwright com Chromium. Se o Playwright não estiver instalado
// neste projeto, informe os caminhos pelas variáveis de ambiente
// PLAYWRIGHT_MODULE (pasta node_modules/playwright) e CHROMIUM_PATH.
const path = require('path');
const fs = require('fs');
const os = require('os');

const playwrightModule = process.env.PLAYWRIGHT_MODULE || 'playwright';
const { chromium } = require(playwrightModule);

const root = path.resolve(__dirname, '..');
const out = path.join(root, 'assets/img');
const mark = (width) => `<img src="file://${path.join(out, 'logo-gostou-do-site-claro-960.png')}" style="width:${width}px;height:auto;display:block" alt="">`;

const fontFace = (family, file, style = 'normal') => `@font-face { font-family: "${family}"; src: url("file://${path.join(root, 'assets/fonts', file)}") format("woff2"); font-style: ${style}; font-weight: 300 900; }`;
const fonts = [fontFace('Outfit', 'outfit-normal-latin.woff2'), fontFace('Inter', 'inter-normal-latin.woff2')].join('\n');

const shots = ['fialho_barbearia','viva-baby','amigos-autopecas','nanda-bella'].map((n) => 'file://' + path.join(out, `wall-${n}-480.webp`));

const pages = {
  card: {
    w: 1200, h: 630, file: 'compartilhamento.jpg', jpeg: true,
    html: `<div style="width:1200px;height:630px;display:grid;grid-template-columns:640px 560px;background:#02182b;color:#fff;font-family:Inter,sans-serif;overflow:hidden">
      <div style="display:flex;flex-direction:column;justify-content:center;padding:0 64px">
        ${mark(300)}
        <div style="margin-top:36px;font-family:Outfit,sans-serif;font-weight:700;font-size:46px;line-height:1.02;letter-spacing:-0.03em">Gostou do site?<br><span style="color:#4d93ff;white-space:nowrap">O próximo pode ser o seu.</span></div>
        <div style="margin-top:22px;font-size:17px;font-weight:500;letter-spacing:0.14em;text-transform:uppercase;color:#a9b9cf">Sites para negócios de Maringá PR</div>
      </div>
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:16px;align-content:center;padding:40px 48px 40px 0;transform:rotate(-6deg) scale(1.08)">
        ${shots.map((u) => `<img src="${u}" style="width:100%;aspect-ratio:480/333;object-fit:cover;object-position:top;border-radius:10px;box-shadow:0 20px 50px rgba(0,0,0,.45);display:block" alt="">`).join('')}
      </div>
    </div>`,
  },
};

(async () => {
  const browser = await chromium.launch(
    process.env.CHROMIUM_PATH ? { executablePath: process.env.CHROMIUM_PATH } : {}
  );
  const tmp = path.join(os.tmpdir(), 'gostou-render.html');
  for (const p of Object.values(pages)) {
    const page = await browser.newPage({ viewport: { width: p.w, height: p.h }, deviceScaleFactor: 1 });
    // a página é aberta por file:// para o Chromium aceitar as fontes e a foto locais
    fs.writeFileSync(tmp, `<!doctype html><html><head><meta charset="utf-8"><style>${fonts} body{margin:0;background:transparent}</style></head><body>${p.html}</body></html>`);
    await page.goto('file://' + tmp, { waitUntil: 'load' });
    await page.evaluate(() => document.fonts.ready);
    await page.screenshot(p.jpeg
      ? { path: path.join(out, p.file), type: 'jpeg', quality: 86 }
      : { path: path.join(out, p.file) });
    await page.close();
    console.log('assets/img/' + p.file);
  }
  fs.unlinkSync(tmp);
  await browser.close();
})();
