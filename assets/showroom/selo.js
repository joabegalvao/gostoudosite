/* Selo do showroom.
   Os sites dos clientes são servidos em gostoudosite.com.br/<pasta>/ só como
   vitrine. O Nginx (nginx.conf) insere este script antes do </body> de cada
   página dessas pastas, e ele desenha um selo fixo no canto inferior esquerdo
   com a marca do Gostou do site?, ligando para a página principal, e uma
   marca d'água grande e quase transparente no centro da tela.

   Nada é alterado nos repositórios dos clientes: no domínio próprio de cada
   um o selo não existe. O canto inferior direito fica livre para o botão de
   WhatsApp que todos os sites têm. O estilo é todo próprio (classe com
   prefixo, cores fixas, fonte do sistema) para não depender do CSS do site. */
(function () {
  if (document.getElementById('gostoudosite-selo')) return;

  var css = [
    '#gostoudosite-selo{position:fixed;left:14px;bottom:14px;z-index:2147483000;display:flex;align-items:center;gap:10px;',
    'height:56px;padding:0 18px 0 14px;border-radius:999px;background:#02182b;color:#fff;border:1px solid rgba(255,255,255,.14);',
    'box-shadow:0 8px 24px rgba(2,24,43,.35);font:500 12px/1.1 system-ui,-apple-system,"Segoe UI",Roboto,sans-serif;',
    'letter-spacing:.02em;text-decoration:none;white-space:nowrap;-webkit-font-smoothing:antialiased;',
    'transition:transform .2s ease,box-shadow .2s ease;transform:translateZ(0)}',
    '#gostoudosite-selo:hover{transform:translateY(-2px);box-shadow:0 12px 30px rgba(2,24,43,.45)}',
    '#gostoudosite-selo:focus-visible{outline:3px solid #076cfd;outline-offset:3px}',
    '#gostoudosite-selo span{display:flex;flex-direction:column;gap:3px;color:rgba(255,255,255,.72)}',
    '#gostoudosite-selo b{font-weight:700;color:#fff;font-size:13px}',
    '#gostoudosite-selo img{display:block;height:38px;width:auto}',
    '@media (max-width:479px){#gostoudosite-selo{height:44px;padding:0 12px 0 10px;left:10px;bottom:10px}',
    '#gostoudosite-selo img{height:28px}#gostoudosite-selo span{font-size:11px}#gostoudosite-selo b{font-size:12px}}',
    '@media (prefers-reduced-motion:reduce){#gostoudosite-selo{transition:none}#gostoudosite-selo:hover{transform:none}}',
    '@media print{#gostoudosite-selo,#gostoudosite-marca{display:none}}',
    /* marca d'água: a silhueta branca do logo, centralizada e quase
       transparente, em modo "difference" para aparecer escura em fundo claro
       e clara em fundo escuro; não recebe cliques */
    '#gostoudosite-marca{position:fixed;left:50%;top:50%;z-index:2147482000;width:min(72vw,900px);height:auto;',
    'transform:translate(-50%,-50%);opacity:.10;mix-blend-mode:difference;pointer-events:none;user-select:none}'
  ].join('');

  var style = document.createElement('style');
  style.textContent = css;
  document.head.appendChild(style);

  var a = document.createElement('a');
  a.id = 'gostoudosite-selo';
  a.href = 'https://gostoudosite.com.br/';
  a.title = 'Site feito por Gostou do site? Veja outros e peça o seu';
  a.setAttribute('aria-label', 'Site feito por Gostou do site? Veja outros e peça o seu');

  var img = document.createElement('img');
  img.src = '/assets/img/logo-gostou-do-site-claro-240.png';
  img.alt = 'Gostou do site?';
  img.width = 240;
  img.height = 125;
  img.decoding = 'async';

  var text = document.createElement('span');
  text.innerHTML = 'Site feito por<b>Peça o seu</b>';

  a.appendChild(img);
  a.appendChild(text);

  var marca = document.createElement('img');
  marca.id = 'gostoudosite-marca';
  marca.src = '/assets/showroom/marca-dagua.webp';
  marca.alt = '';
  marca.width = 960;
  marca.height = 500;
  marca.setAttribute('aria-hidden', 'true');
  marca.decoding = 'async';

  document.body.appendChild(marca);
  document.body.appendChild(a);
})();
