// Captura a primeira tela (desktop 1440 px e celular 390 px em 2x) de cada site publicado
// e salva em materiais-de-origem/sites/. Depois, rode python3 tools/optimize-images.py.
//
// Uso (na raiz do projeto): node tools/capture-sites.js
// Requer Node e Playwright com Chromium (variáveis PLAYWRIGHT_MODULE e CHROMIUM_PATH, se preciso).
const { chromium } = require(process.env.PLAYWRIGHT_MODULE || 'playwright');
const sites = ['bacana_moda_feminina','fialho_barbearia','armazem_da_ju','otica-visao','posto-tacs','labuka','angel-cappucho','studio-ratier','amigos-autopecas','viva-baby','relojoaria_omega','vieira-fauna','nanda-bella','modelle','geral-pecas','area51-burguer','mec-bella','firulabar'];
// decode só das imagens que estão na tela; as lazy fora dela nunca carregam e travariam o decode()
const settle = async (p) => {
  await p.evaluate(() => document.fonts.ready);
  await p.evaluate(() => Promise.race([
    Promise.all([...document.images].filter(i => i.getBoundingClientRect().top < innerHeight && i.loading !== 'lazy').map(i => i.decode().catch(() => {}))),
    new Promise(r => setTimeout(r, 4000)),
  ]));
  await p.waitForTimeout(800);
};
(async () => {
  const b = await chromium.launch(process.env.CHROMIUM_PATH ? { executablePath: process.env.CHROMIUM_PATH } : {});
  for (const s of sites) {
    const url = `https://joabegalvao.github.io/${s}/`; // os sites publicados
    const p = await b.newPage({ viewport: { width: 1440, height: 1000 }, deviceScaleFactor: 1, reducedMotion: 'reduce' });
    await p.goto(url, { waitUntil: 'load', timeout: 45000 }); await settle(p);
    await p.screenshot({ path: `materiais-de-origem/sites/${s}.png` }); await p.close();
    const m = await b.newPage({ viewport: { width: 390, height: 780 }, deviceScaleFactor: 2, reducedMotion: 'reduce' });
    await m.goto(url, { waitUntil: 'load', timeout: 45000 }); await settle(m);
    await m.screenshot({ path: `materiais-de-origem/sites/${s}-m.png` }); await m.close();
    console.log(s);
  }
  await b.close();
})();
