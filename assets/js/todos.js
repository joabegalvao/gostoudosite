/* Página "todos os sites": lê assets/data/sites.json, desenha os cards,
   filtra pela busca e carrega em lotes (botão "Carregar mais" e, com
   IntersectionObserver, também ao chegar no fim da lista). Sem JavaScript,
   a página mostra a lista completa de links dentro do <noscript>. */
(function () {
  var grid = document.querySelector('[data-all-grid]');
  if (!grid) return;

  var PAGE = 8;
  var input = document.querySelector('[data-search-input]');
  var status = document.querySelector('[data-search-status]');
  var empty = document.querySelector('[data-all-empty]');
  var more = document.querySelector('[data-all-more]');
  var moreBtn = document.querySelector('[data-all-more-btn]');
  var count = document.querySelector('[data-all-count]');
  var WA = 'https://wa.me/5544988094010?text=';

  var all = [];
  var shown = [];
  var limit = PAGE;

  function normalize(text) {
    return String(text).toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '');
  }

  function escapeHtml(text) {
    return String(text).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }

  function card(site) {
    var nome = escapeHtml(site.nome);
    var pasta = escapeHtml(site.pasta);
    var img = escapeHtml(site.imagem);
    var msg = encodeURIComponent('Olá! Gostei do site ' + (site.artigo || 'da') + ' ' + site.nome + ' e quero um parecido para o meu negócio.');
    return '<li class="work">' +
      '<a class="work__preview" href="' + pasta + '/" target="_blank" rel="noopener" aria-label="Abrir o site ' + (site.artigo || 'da') + ' ' + nome + ' (abre em nova aba)">' +
        '<span class="frame"><span class="frame__bar" aria-hidden="true"><i></i><i></i><i></i></span>' +
          '<picture><source type="image/webp" srcset="assets/img/site-' + img + '-720.webp 720w, assets/img/site-' + img + '-1080.webp 1080w" sizes="(min-width: 900px) 360px, (min-width: 600px) 46vw, 240px">' +
          '<img src="assets/img/site-' + img + '-1080.jpg" alt="' + escapeHtml(site.alt) + '" width="1080" height="750" loading="lazy" decoding="async"></picture></span>' +
        '<span class="phone" aria-hidden="true"><img src="assets/img/site-' + img + '-m-390.webp" alt="" width="390" height="780" loading="lazy" decoding="async"></span>' +
      '</a>' +
      '<div class="work__body">' +
        '<p class="work__segment">' + escapeHtml(site.segmento) + '</p>' +
        '<h3 class="work__title">' + nome + '</h3>' +
        '<p class="work__text">' + escapeHtml(site.texto) + '</p>' +
        '<div class="work__actions">' +
          '<a class="work__link" href="' + pasta + '/" target="_blank" rel="noopener">Ver site<span class="sr-only"> ' + (site.artigo || 'da') + ' ' + nome + ' (abre em nova aba)</span> <svg class="icon" aria-hidden="true"><use href="#i-arrow-up"/></svg></a>' +
          '<a class="work__link work__link--wa" href="' + WA + msg + '" target="_blank" rel="noopener"><svg class="icon" aria-hidden="true"><use href="#i-whatsapp"/></svg> Quero um assim<span class="sr-only"> (abre o WhatsApp em nova aba)</span></a>' +
        '</div>' +
      '</div>' +
    '</li>';
  }

  function render() {
    var slice = shown.slice(0, limit);
    grid.innerHTML = slice.map(card).join('');
    empty.hidden = shown.length > 0;
    var rest = shown.length - slice.length;
    more.hidden = rest <= 0;
    if (rest > 0) {
      count.textContent = 'Mostrando ' + slice.length + ' de ' + shown.length;
      moreBtn.firstChild.textContent = 'Carregar mais ' + (rest > PAGE ? PAGE : rest) + ' ';
    }
    if (status) {
      var q = input && input.value.trim();
      status.textContent = q
        ? (shown.length === 1 ? '1 site encontrado' : shown.length + ' sites encontrados') + ' para "' + q + '"'
        : all.length + ' sites publicados';
    }
  }

  function filter() {
    var q = normalize(input ? input.value.trim() : '');
    shown = q
      ? all.filter(function (s) { return normalize(s.nome + ' ' + s.segmento + ' ' + s.texto).indexOf(q) !== -1; })
      : all.slice();
    limit = PAGE;
    render();
  }

  function loadMore() {
    limit += PAGE;
    render();
  }

  moreBtn.addEventListener('click', function () {
    var before = grid.children.length;
    loadMore();
    // foco no primeiro card novo, para quem navega por teclado
    var next = grid.children[before];
    if (next) {
      var link = next.querySelector('a');
      if (link) link.focus({ preventScroll: true });
    }
  });

  if (input) {
    var timer;
    input.addEventListener('input', function () {
      clearTimeout(timer);
      timer = setTimeout(filter, 120);
    });
  }

  // carrega o próximo lote sozinho quando o botão entra na tela
  if ('IntersectionObserver' in window) {
    new IntersectionObserver(function (entries) {
      if (entries[0].isIntersecting && !more.hidden) loadMore();
    }, { rootMargin: '200px 0px' }).observe(more);
  }

  fetch('assets/data/sites.json', { cache: 'no-cache' })
    .then(function (r) { return r.json(); })
    .then(function (data) {
      all = data;
      filter();
    })
    .catch(function () {
      if (status) status.textContent = 'Não foi possível carregar a lista. Recarregue a página.';
    });
})();
