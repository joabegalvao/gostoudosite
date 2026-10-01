# Gostou do site? | gostoudosite.com

Página única, estática, em HTML, CSS e JavaScript puro. Não há etapa de build
nem dependências de execução: basta servir a pasta. É a vitrine dos sites
feitos nesta série e o ponto de contato para novos pedidos.

## Como visualizar

```bash
# na raiz do projeto
python3 -m http.server 4188
# abra http://localhost:4188
```

Qualquer servidor estático funciona (Nginx, Apache, Netlify, Vercel, Hostinger,
GitHub Pages). Publique `index.html` e a pasta `assets/`. A pasta `tools/` não
precisa ir para o servidor.

### Materiais de origem

Os arquivos de origem ficam reunidos na pasta `materiais-de-origem/`, que não
faz parte do repositório: ela existe só na pasta local e é ignorada pelo git.
As imagens que o site usa já estão prontas em `assets/img`.

```
materiais-de-origem/
  logo/    gostou_do_site_logo.png (1570 x 1002, com xadrez de transparência pintado no fundo)
  sites/   30 capturas dos 15 sites publicados (desktop 1440 x 1000 e celular 780 x 1560), feitas por tools/capture-sites.js
```

## Repositório

| Item | Valor |
| --- | --- |
| Endereço | `git@github.com:joabegalvao/gostoudosite.git` |
| Página | https://github.com/joabegalvao/gostoudosite |
| Visibilidade | pública (conferida em 01/10/2026) |
| Branch | `main` |

O repositório guarda só o que o site precisa para funcionar e ser mantido:
`index.html`, `assets/`, `tools/`, `README.md` e `.gitignore`.

```bash
git clone git@github.com:joabegalvao/gostoudosite.git
```

Um clone novo abre e publica o site normalmente. Só não roda os scripts de
imagens, que dependem da pasta `materiais-de-origem/`.

## Dados

| Dado | Valor |
| --- | --- |
| Nome | Gostou do site? |
| Domínio | gostoudosite.com (usado em `canonical` e `og:image`) |
| O que faz | Landing pages para pequenos negócios de Maringá, PR |
| WhatsApp | (44) 98809-4010 |
| Portfólio | Os 15 sites desta série, publicados no GitHub Pages em `joabegalvao.github.io/<repositório>/` |

Não há telefone fixo, endereço, Instagram, preços, prazos ou avaliações: nada
disso foi informado, e a página não inventa.

## Estratégia

| Definição | Decisão |
| --- | --- |
| Proposta de valor | A pergunta do nome vira o argumento: "Gostou do site? O próximo pode ser o seu." A prova é o próprio portfólio, aberto para clicar |
| Principal objeção | "Vai ser mais um site de modelo pronto, igual aos outros" |
| Resposta | 15 sites lado a lado, nenhum parecido com o outro, cada um com link ao vivo |
| Conversão prioritária | WhatsApp, com uma mensagem geral e uma por site ("Gostei do site da X e quero um parecido") |
| Sem formulário | O contato é só pelo WhatsApp, e a página diz isso como vantagem |

## Direção visual

O logo manda: marinho `#02182B` e azul `#076CFD`, com a moldura de navegador
e os três pontos virando elementos da interface. Cabeçalho, hero, "O que vem
no site" e chamada final são marinho; o resto é branco frio. O hero tem uma
**parede de sites**: duas fileiras com as capturas deslizando devagar em
sentidos opostos, que param ao passar o mouse e ficam paradas quando o sistema
pede movimento reduzido. Cada site do portfólio aparece em uma **moldura de
navegador** (barra marinho com os três pontos azuis do logo) com a versão de
celular sobreposta no canto; ao passar o mouse, os dois se levantam.

Tipografia: Outfit (títulos, geométrica arredondada como as letras do logo) e
Inter (textos). Sem gradientes decorativos (a máscara nas bordas da parede é
só o esmaecimento das pontas), sem efeitos de vidro, sem emojis como ícones.

## Seções da página

| Ordem | Seção | Âncora | Conteúdo |
| --- | --- | --- | --- |
| 1 | Cabeçalho | | Logo (versão clara), navegação e CTA "Quero um site". Fixo no topo |
| 2 | Hero | `#inicio` | "Gostou do site? O próximo pode ser o seu.", dois botões, a parede de sites e três fatos (15 sites, 1 identidade por cliente, 0 formulários) |
| 3 | Sites feitos | `#sites` | Os 15 sites, com moldura de navegador, celular, segmento, uma frase, "Ver site" e "Quero um assim" |
| 4 | O que vem no site | `#entrega` | Sete itens que todos os sites da série têm |
| 5 | Como funciona | `#como-funciona` | Três passos pelo WhatsApp: briefing, aprovação, ajustes e publicação |
| 6 | Para quem | | Os 12 segmentos já atendidos |
| 7 | Chamada final | `#contato` | Logo claro, "Então vamos fazer o seu." e o número do WhatsApp |
| 8 | Rodapé | | Direitos, WhatsApp e voltar ao topo |

Componente de apoio: botão flutuante de WhatsApp, no canto inferior direito,
em todas as telas.

## Estrutura de arquivos

```
index.html                       conteúdo e SEO
assets/css/styles.css            estilos (tokens de cor e tipografia no topo)
assets/js/main.js                menu e revelação na rolagem
assets/img/                      imagens otimizadas (geradas pelos scripts)
assets/fonts/                    Outfit e Inter (arquivos locais)
tools/capture-sites.js           captura a primeira tela dos 15 sites publicados (Playwright)
tools/optimize-images.py         logo sem fundo, ícones e miniaturas a partir das capturas
tools/render-compartilhamento.js monta a imagem de compartilhamento pelo Chromium
materiais-de-origem/             logo original e capturas (só na pasta local, fora do git)
```

## Os 15 sites

| Site | Segmento | Endereço |
| --- | --- | --- |
| Fialho Barbearia | Barbearia | https://joabegalvao.github.io/fialho_barbearia/ |
| Viva Baby | Loja de bebê | https://joabegalvao.github.io/viva-baby/ |
| Amigos Auto Peças | Autopeças | https://joabegalvao.github.io/amigos-autopecas/ |
| Nanda Bella Beauty Clinic | Esmaltação em gel | https://joabegalvao.github.io/nanda-bella/ |
| Geral Peças | Autopeças | https://joabegalvao.github.io/geral-pecas/ |
| Bacana Moda Feminina | Moda feminina | https://joabegalvao.github.io/bacana_moda_feminina/ |
| Labuka Restaurante | Restaurante | https://joabegalvao.github.io/labuka/ |
| Ótica Visão | Ótica | https://joabegalvao.github.io/otica-visao/ |
| Vieira Fauna Shopping | Pet shop | https://joabegalvao.github.io/vieira-fauna/ |
| Relojoaria Omega | Relojoaria | https://joabegalvao.github.io/relojoaria_omega/ |
| Modelle | Moda feminina | https://joabegalvao.github.io/modelle/ |
| Angel Cappucho | Piercing e tattoo | https://joabegalvao.github.io/angel-cappucho/ |
| Studio Ratier | Nail designer | https://joabegalvao.github.io/studio-ratier/ |
| Posto Tacs | Posto de combustível | https://joabegalvao.github.io/posto-tacs/ |
| Armazém da Ju Essências | Essências e artesanato | https://joabegalvao.github.io/armazem_da_ju/ |

A ordem na página alterna sites escuros e claros, para a grade ter ritmo. As
frases de cada card descrevem o que a página do cliente tem; nenhuma cita
resultado comercial.

### Como adicionar um site novo

1. Acrescente o nome do repositório à lista `sites` em
   `tools/capture-sites.js` e rode `node tools/capture-sites.js` (captura
   só o que falta se você apagar as outras capturas, ou tudo de novo).
2. Rode `python3 tools/optimize-images.py` para gerar as miniaturas.
3. No `index.html`, copie um bloco `<li class="work">` na seção "SITES
   FEITOS", troque nome, segmento, frase, endereço e os nomes dos arquivos, e
   ajuste a mensagem do link "Quero um assim".
4. Se quiser o site na parede do hero, acrescente um `<li class="wall__item">`
   nas duas cópias da fileira escolhida (cada fileira é duplicada para o
   movimento ser contínuo).
5. Atualize os números: "15" no hero, "Quinze" no título da seção e a
   contagem no teste.

### Logo

O arquivo recebido é PNG RGB com o **xadrez de transparência pintado no
fundo** (não é transparência de verdade). O script separa a tinta do fundo
pela saturação (azul) e pela escuridão (marinho), devolve a transparência e
preserva a suavização das bordas. Como o marinho do logo some sobre o fundo
marinho da página, o script gera também uma **versão clara**, com o marinho
trocado por branco e o azul intacto; é ela que aparece no cabeçalho, na
chamada final, nos ícones e na imagem de compartilhamento. O desenho não
muda, só a cor das partes escuras.

## Como atualizar o conteúdo

| O que mudar | Onde |
| --- | --- |
| Textos | `index.html` (seções comentadas) |
| Número do WhatsApp | `index.html`: procure por `wa.me/` (21 ocorrências: 6 gerais e 15 por site). O texto vem depois de `?text=`, codificado |
| Cores e fontes | `assets/css/styles.css`, bloco `:root` |
| Sites do portfólio | veja "Como adicionar um site novo" |
| Itens de "O que vem no site" | `index.html`, lista `checklist` |
| Passos | `index.html`, lista `steps` |
| Segmentos | `index.html`, lista `segments__list` |
| Velocidade da parede | `styles.css`, `.wall__track { animation: wall-slide 90s ... }` |

Mensagens de WhatsApp:

| Onde | Mensagem |
| --- | --- |
| Cabeçalho, hero, "O que vem no site", chamada final, rodapé e botão flutuante | Olá! Vi o gostoudosite.com e quero um site para o meu negócio. |
| "Quero um assim", em cada card | Olá! Gostei do site da [nome] e quero um parecido para o meu negócio. |

Para gerar as imagens:

```bash
node tools/capture-sites.js             # capturas dos sites (requer Node e Playwright)
python3 tools/optimize-images.py        # logo, ícones e miniaturas (requer Pillow)
node tools/render-compartilhamento.js   # imagem de compartilhamento
```

Se o Playwright não estiver instalado no projeto, informe os caminhos pelas
variáveis `PLAYWRIGHT_MODULE` e `CHROMIUM_PATH`.

### Cache do navegador

Os arquivos de estilo e script são chamados com versão: `styles.css?v=1` e
`main.js?v=1`. Ao alterar um deles, aumente o número no `index.html`.

## Identidade visual

| Token | Cor | Origem |
| --- | --- | --- |
| `--navy` | `#02182B` | letras "Gostou do" e moldura do logo: fundos escuros, títulos |
| `--blue` | `#076CFD` | "site?", pontos e traços do logo: botões, destaques, pontos dos rótulos |
| `--blue-700` | `#0554C9` | azul escurecido: hover e destaques sobre fundo claro |
| `--blue-100` | `#E3EDFF` | azul bem claro: números dos passos |
| `--navy-800`, `--navy-line` | `#0A2440`, `#1A3A5C` | superfícies e linhas sobre o marinho |
| `--paper`, `--mist`, `--white`, `--line` | `#F5F7FB`, `#E9EEF7`, `#FFFFFF`, `#D6DDE9` | fundos claros e linhas |
| `--ink`, `--ink-soft`, `--soft` | `#0B1A2B`, `#4B5A6D`, `#A9B9CF` | textos |
| `--whatsapp` | `#25D366` | verde oficial do WhatsApp, só no botão flutuante e nos links "Quero um assim" |

Sobre o marinho, o destaque dos títulos usa `#4D93FF` (o azul do logo
clareado), porque o azul puro não alcança contraste suficiente para texto.

## Decisões de conteúdo

- Os fatos do hero são verificáveis: 15 sites publicados, cada um com
  identidade própria, nenhum formulário na página.
- Nenhum número de clientes, prazo, preço ou resultado. "Rápido" refere-se ao
  carregamento da página, medido nos testes.
- A lista "O que vem no site" descreve só o que todos os 15 sites têm.
- "Como funciona" descreve o processo pelo WhatsApp sem prometer prazo.
- Os links dos cards abrem os sites no GitHub Pages. Quando um cliente
  publicar o site no próprio domínio, troque o endereço no card.
- Sem avaliações: nenhuma foi fornecida.
- Sem formulário, de propósito; a página apresenta isso como escolha.

## Testes realizados

Executados em 01/10/2026, em Chromium automatizado (Playwright).

- Revisão visual das capturas de tela: página inteira em 390 e 1440 px e
  primeira tela em 320, 768 e 1024 px.
- Sem rolagem horizontal e com o título do hero em duas linhas (três no
  celular) nos tamanhos 320, 390, 768, 1024 e 1440 px.
- Sem erros de console e sem imagens quebradas.
- 38 verificações automáticas aprovadas: menu no celular (toque, Esc, toque
  fora, foco), âncoras, botão flutuante de WhatsApp, imagens sem ampliação
  acima do tamanho real, revelação na rolagem, link de pular para o conteúdo,
  foco visível, destino e atributos de todos os links (30 links para os 15
  sites, 21 de WhatsApp com 16 mensagens diferentes, nenhum destino fora de
  wa.me e joabegalvao.github.io), hierarquia de títulos e atributos das
  imagens, sem travessões, emojis ou textos de exemplo.
- Página utilizável sem JavaScript.
- Animações desligadas quando o sistema pede movimento reduzido (a parede
  fica parada).
- Contraste AA em todos os textos.
- Carga inicial no celular de 670 KB, medida em tela de densidade 3x, sem
  saltos de layout (CLS 0). As 16 capturas da parede entram nessa conta.
  Página inteira: 1,6 MB, por causa das 15 miniaturas de desktop e 15 de
  celular, carregadas só ao rolar.

Não testado: Safari, Firefox e aparelhos físicos. Não foi verificado se o
número responde no WhatsApp.

## Histórico de ajustes

| Ajuste | Arquivos |
| --- | --- |
| Versão inicial da página | todos |

## Créditos e licenças

- Logo: fornecido pelo cliente. Capturas: dos sites desta série, feitos para
  os respectivos clientes.
- Ícones: criados para este projeto. Ícone do WhatsApp: Simple Icons (CC0).
- Outfit e Inter: SIL Open Font License 1.1, obtidas do Google Fonts e
  hospedadas localmente.

## Pendências

- **Publicar no domínio gostoudosite.com.** `canonical` e `og:image` já
  apontam para ele. Se o site for publicado em outro endereço antes, ajuste
  as duas tags no `<head>`.
- Logo em vetor (SVG), se existir, para substituir a versão recortada do PNG.
- Instagram, e-mail ou outro canal, se quiser mais de um contato.
- Depoimentos de clientes dos sites, com autorização, para uma seção de
  avaliações.
- Quando um cliente publicar o site no próprio domínio, atualizar o link do
  card e, se quiser, recapturar a miniatura.
